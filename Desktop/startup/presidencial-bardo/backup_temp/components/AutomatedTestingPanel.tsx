"use client";

import { automatedTestBatches, extremeTestEvents, testScenarios } from '@/data/testScenarios';
import { AcceleratedSimulation, AutomatedTestBatch, MetricSnapshot, PoliticalMetrics, SimulationConfig, TestResult, TestScenario } from '@/types/political';
import { useCallback, useState } from 'react';

interface AutomatedTestingPanelProps {
  currentMetrics: PoliticalMetrics;
  onApplyScenario: (scenario: TestScenario) => void;
  onTriggerEvent: (eventId: string) => void;
}

export const AutomatedTestingPanel: React.FC<AutomatedTestingPanelProps> = ({
  currentMetrics,
  onApplyScenario,
  onTriggerEvent
}) => {
  const [activeTab, setActiveTab] = useState<'scenarios' | 'batches' | 'simulation' | 'extreme'>('scenarios');
  const [runningTests, setRunningTests] = useState<Set<string>>(new Set());
  const [testResults, setTestResults] = useState<Record<string, TestResult>>({});
  const [simulationConfig, setSimulationConfig] = useState<SimulationConfig>({
    speedMultiplier: 10,
    duration: 5,
    autoDecisions: true,
    logLevel: 'detailed',
    breakOnError: false,
    stressTest: false
  });
  const [activeSimulation, setActiveSimulation] = useState<AcceleratedSimulation | null>(null);

  // APLICAR ESCENARIO PREDEFINIDO
  const handleApplyScenario = useCallback((scenario: TestScenario) => {
    console.log(`🎭 Aplicando escenario: ${scenario.name}`);
    onApplyScenario(scenario);
  }, [onApplyScenario]);

  // EJECUTAR BATCH DE TESTING
  const handleRunBatch = useCallback(async (batch: AutomatedTestBatch) => {
    const batchId = batch.id;
    console.log(`⚡ Iniciando batch de testing: ${batch.name}`);

    setRunningTests(prev => new Set(prev).add(batchId));

    const startTime = Date.now();
    const testResult: TestResult = {
      testId: batchId,
      startTime,
      endTime: 0,
      totalEvents: 0,
      decisionsForced: 0,
      systemStability: 'stable',
      finalMetrics: { ...currentMetrics },
      criticalErrors: [],
      warnings: [],
      performanceMetrics: {
        avgEventProcessingTime: 0,
        maxEventProcessingTime: 0,
        memoryUsage: 0
      }
    };

    try {
      // Simular ejecución de eventos en batch
      for (let i = 0; i < batch.events.length; i++) {
        const event = batch.events[i];
        const eventStartTime = performance.now();

        // Simular procesamiento del evento
        await new Promise(resolve => setTimeout(resolve, batch.intervalMs));

        onTriggerEvent(event.id);
        testResult.totalEvents++;

        const eventEndTime = performance.now();
        const processingTime = eventEndTime - eventStartTime;
        testResult.performanceMetrics.maxEventProcessingTime = Math.max(
          testResult.performanceMetrics.maxEventProcessingTime,
          processingTime
        );

        // Simular decisión automática si está habilitada
        if (simulationConfig.autoDecisions) {
          testResult.decisionsForced++;
        }

        // Verificar si debemos parar el test
        if (Date.now() - startTime > batch.durationMinutes * 60 * 1000) {
          break;
        }
      }

      testResult.systemStability = testResult.criticalErrors.length > 0 ? 'unstable' : 'stable';

    } catch (error) {
      console.error(`❌ Error en batch ${batchId}:`, error);
      testResult.systemStability = 'crashed';
      testResult.criticalErrors.push(error instanceof Error ? error.message : 'Error desconocido');
    }

    testResult.endTime = Date.now();
    testResult.performanceMetrics.avgEventProcessingTime =
      testResult.performanceMetrics.maxEventProcessingTime / Math.max(testResult.totalEvents, 1);

    setTestResults(prev => ({ ...prev, [batchId]: testResult }));
    setRunningTests(prev => {
      const newSet = new Set(prev);
      newSet.delete(batchId);
      return newSet;
    });

    console.log(`✅ Batch completado: ${batch.name}`, testResult);
  }, [currentMetrics, onTriggerEvent, simulationConfig.autoDecisions]);

  // EJECUTAR SIMULACIÓN ACELERADA
  const handleRunSimulation = useCallback(async () => {
    console.log(`🚀 Iniciando simulación acelerada (${simulationConfig.speedMultiplier}x)`);

    const simulationId = `sim-${Date.now()}`;
    const startState: MetricSnapshot = {
      timestamp: Date.now(),
      metrics: { ...currentMetrics },
      provinces: {},
      factions: {},
      activeEvents: []
    };

    const simulation: AcceleratedSimulation = {
      id: simulationId,
      config: simulationConfig,
      startState,
      snapshots: [startState],
      effectLogs: [],
      result: {
        testId: simulationId,
        startTime: Date.now(),
        endTime: 0,
        totalEvents: 0,
        decisionsForced: 0,
        systemStability: 'stable',
        finalMetrics: { ...currentMetrics },
        criticalErrors: [],
        warnings: [],
        performanceMetrics: {
          avgEventProcessingTime: 0,
          maxEventProcessingTime: 0,
          memoryUsage: 0
        }
      },
      isRunning: true,
      progress: 0
    };

    setActiveSimulation(simulation);

    try {
      const totalDuration = simulationConfig.duration * 60 * 1000; // convertir a ms
      const intervalMs = 1000 / simulationConfig.speedMultiplier; // acelerar tiempo

      for (let elapsed = 0; elapsed < totalDuration; elapsed += intervalMs) {
        // Simular paso de tiempo
        await new Promise(resolve => setTimeout(resolve, 50)); // 50ms real por cada paso

        simulation.progress = (elapsed / totalDuration) * 100;
        setActiveSimulation({ ...simulation });

        // Triggerear eventos aleatorios
        if (Math.random() < 0.3) { // 30% chance por interval
          const randomEvent = automatedTestBatches[0].events[
            Math.floor(Math.random() * automatedTestBatches[0].events.length)
          ];

          if (randomEvent) {
            onTriggerEvent(randomEvent.id);
            simulation.result.totalEvents++;
          }
        }

        // Tomar snapshot cada cierto tiempo
        if (elapsed % (5000 / simulationConfig.speedMultiplier) === 0) {
          const snapshot: MetricSnapshot = {
            timestamp: Date.now(),
            metrics: { ...currentMetrics },
            provinces: {},
            factions: {},
            activeEvents: []
          };
          simulation.snapshots.push(snapshot);
        }
      }

      simulation.result.endTime = Date.now();
      simulation.isRunning = false;
      simulation.progress = 100;

      console.log(`✅ Simulación completada:`, simulation.result);

    } catch (error) {
      console.error(`❌ Error en simulación:`, error);
      simulation.result.systemStability = 'crashed';
      simulation.result.criticalErrors.push(error instanceof Error ? error.message : 'Error desconocido');
      simulation.isRunning = false;
    }

    setActiveSimulation(simulation);
  }, [currentMetrics, onTriggerEvent, simulationConfig]);

  // EJECUTAR TEST EXTREMO
  const handleRunExtremeTest = useCallback((testType: 'zero' | 'hundred' | 'cascade' | 'stress') => {
    console.log(`💥 Ejecutando test extremo: ${testType}`);

    switch (testType) {
      case 'zero':
        onTriggerEvent('metric-zero-test');
        break;
      case 'hundred':
        onTriggerEvent('metric-hundred-test');
        break;
      case 'cascade':
        // Trigger múltiples eventos seguidos para generar cascada
        extremeTestEvents.forEach((event, index) => {
          setTimeout(() => onTriggerEvent(event.id), index * 1000);
        });
        break;
      case 'stress':
        // Stress test: muchos eventos muy rápido
        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            const randomEvent = automatedTestBatches[2].events[
              Math.floor(Math.random() * automatedTestBatches[2].events.length)
            ];
            if (randomEvent) onTriggerEvent(randomEvent.id);
          }, i * 200); // evento cada 200ms
        }
        break;
    }
  }, [onTriggerEvent]);

  return (
    <div className="space-y-6">
      {/* Header con tabs */}
      <div className="flex border-b border-gray-700">
        {[
          { id: 'scenarios', label: '🎭 Escenarios', icon: '🎭' },
          { id: 'batches', label: '⚡ Batches', icon: '⚡' },
          { id: 'simulation', label: '🚀 Simulación', icon: '🚀' },
          { id: 'extreme', label: '💥 Extremos', icon: '💥' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido según tab activo */}
      {activeTab === 'scenarios' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-purple-400">🎭 Escenarios Predefinidos</h3>
          <p className="text-gray-300">
            Aplica condiciones iniciales específicas para probar diferentes situaciones políticas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testScenarios.map(scenario => (
              <div key={scenario.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-white">{scenario.name}</h4>
                  <button
                    onClick={() => handleApplyScenario(scenario)}
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
                <p className="text-gray-300 text-sm mb-3">{scenario.description}</p>

                {/* Métricas del escenario */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>Popularidad: <span className="text-purple-400">{scenario.initialMetrics.popularidad}%</span></div>
                  <div>Economía: <span className="text-blue-400">{scenario.initialMetrics.economia}%</span></div>
                  <div>Seguridad: <span className="text-red-400">{scenario.initialMetrics.seguridad}%</span></div>
                  <div>Corrupción: <span className="text-yellow-400">{scenario.initialMetrics.corrupcion}%</span></div>
                </div>

                {/* Resultados esperados */}
                <div className="mt-3">
                  <p className="text-xs text-gray-400 mb-1">Resultados esperados:</p>
                  <ul className="text-xs text-gray-300 space-y-1">
                    {scenario.expectedOutcomes.slice(0, 3).map((outcome, index) => (
                      <li key={index}>• {outcome}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'batches' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-purple-400">⚡ Batches de Testing Automatizado</h3>
          <p className="text-gray-300">
            Ejecuta secuencias automáticas de eventos para probar la estabilidad del sistema.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {automatedTestBatches.map(batch => {
              const isRunning = runningTests.has(batch.id);
              const result = testResults[batch.id];

              return (
                <div key={batch.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white">{batch.name}</h4>
                    <button
                      onClick={() => handleRunBatch(batch)}
                      disabled={isRunning}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        isRunning
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-purple-600 hover:bg-purple-700'
                      }`}
                    >
                      {isRunning ? '⏳ Ejecutando...' : '▶️ Ejecutar'}
                    </button>
                  </div>

                  <p className="text-gray-300 text-sm mb-3">{batch.description}</p>

                  {/* Configuración del batch */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div>Eventos: <span className="text-blue-400">{batch.events.length}</span></div>
                    <div>Duración: <span className="text-green-400">{batch.durationMinutes}min</span></div>
                    <div>Intervalo: <span className="text-yellow-400">{batch.intervalMs/1000}s</span></div>
                    <div>Stress: <span className={`${
                      batch.stressLevel === 'extreme' ? 'text-red-400' :
                      batch.stressLevel === 'high' ? 'text-orange-400' :
                      batch.stressLevel === 'medium' ? 'text-yellow-400' : 'text-green-400'
                    }`}>{batch.stressLevel}</span></div>
                  </div>

                  {/* Resultados del test */}
                  {result && (
                    <div className="mt-3 p-2 bg-gray-900 rounded text-xs">
                      <div className="grid grid-cols-2 gap-2">
                        <div>Eventos: <span className="text-blue-400">{result.totalEvents}</span></div>
                        <div>Estabilidad: <span className={`${
                          result.systemStability === 'stable' ? 'text-green-400' :
                          result.systemStability === 'unstable' ? 'text-yellow-400' : 'text-red-400'
                        }`}>{result.systemStability}</span></div>
                        <div>Errores: <span className="text-red-400">{result.criticalErrors.length}</span></div>
                        <div>Tiempo: <span className="text-purple-400">
                          {((result.endTime - result.startTime) / 1000).toFixed(1)}s
                        </span></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'simulation' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-purple-400">🚀 Simulación Acelerada</h3>
          <p className="text-gray-300">
            Simula días o semanas de juego en segundos para probar evolución del sistema.
          </p>

          {/* Configuración de simulación */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h4 className="font-bold text-white mb-3">⚙️ Configuración</h4>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Velocidad (x)</label>
                <select
                  value={simulationConfig.speedMultiplier}
                  onChange={(e) => setSimulationConfig(prev => ({
                    ...prev,
                    speedMultiplier: Number(e.target.value)
                  }))}
                  className="w-full bg-gray-700 rounded px-2 py-1 text-white"
                >
                  <option value={1}>1x (Normal)</option>
                  <option value={10}>10x (Rápido)</option>
                  <option value={50}>50x (Muy Rápido)</option>
                  <option value={100}>100x (Extremo)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Duración (min)</label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={simulationConfig.duration}
                  onChange={(e) => setSimulationConfig(prev => ({
                    ...prev,
                    duration: Number(e.target.value)
                  }))}
                  className="w-full bg-gray-700 rounded px-2 py-1 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Nivel de Log</label>
                <select
                  value={simulationConfig.logLevel}
                  onChange={(e) => setSimulationConfig(prev => ({
                    ...prev,
                    logLevel: e.target.value as any
                  }))}
                  className="w-full bg-gray-700 rounded px-2 py-1 text-white"
                >
                  <option value="minimal">Mínimo</option>
                  <option value="detailed">Detallado</option>
                  <option value="verbose">Verbose</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={simulationConfig.autoDecisions}
                  onChange={(e) => setSimulationConfig(prev => ({
                    ...prev,
                    autoDecisions: e.target.checked
                  }))}
                  className="rounded"
                />
                <span className="text-sm text-gray-300">Decisiones automáticas</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={simulationConfig.stressTest}
                  onChange={(e) => setSimulationConfig(prev => ({
                    ...prev,
                    stressTest: e.target.checked
                  }))}
                  className="rounded"
                />
                <span className="text-sm text-gray-300">Test de stress</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={simulationConfig.breakOnError}
                  onChange={(e) => setSimulationConfig(prev => ({
                    ...prev,
                    breakOnError: e.target.checked
                  }))}
                  className="rounded"
                />
                <span className="text-sm text-gray-300">Parar en error</span>
              </label>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={activeSimulation?.isRunning}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                activeSimulation?.isRunning
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {activeSimulation?.isRunning ? '⏳ Simulando...' : '🚀 Iniciar Simulación'}
            </button>
          </div>

          {/* Estado de simulación activa */}
          {activeSimulation && (
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h4 className="font-bold text-white mb-3">📊 Estado de Simulación</h4>

              {/* Barra de progreso */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>Progreso</span>
                  <span>{activeSimulation.progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${activeSimulation.progress}%` }}
                  />
                </div>
              </div>

              {/* Métricas de la simulación */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Eventos:</span>
                  <span className="text-blue-400 ml-2">{activeSimulation.result.totalEvents}</span>
                </div>
                <div>
                  <span className="text-gray-400">Decisiones:</span>
                  <span className="text-green-400 ml-2">{activeSimulation.result.decisionsForced}</span>
                </div>
                <div>
                  <span className="text-gray-400">Snapshots:</span>
                  <span className="text-purple-400 ml-2">{activeSimulation.snapshots.length}</span>
                </div>
                <div>
                  <span className="text-gray-400">Estabilidad:</span>
                  <span className={`ml-2 ${
                    activeSimulation.result.systemStability === 'stable' ? 'text-green-400' :
                    activeSimulation.result.systemStability === 'unstable' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {activeSimulation.result.systemStability}
                  </span>
                </div>
              </div>

              {/* Errores y warnings */}
              {activeSimulation.result.criticalErrors.length > 0 && (
                <div className="mt-4 p-2 bg-red-900/20 border border-red-500 rounded">
                  <p className="text-red-400 font-medium mb-1">❌ Errores Críticos:</p>
                  {activeSimulation.result.criticalErrors.map((error, index) => (
                    <p key={index} className="text-red-300 text-sm">• {error}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'extreme' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-purple-400">💥 Tests de Casos Extremos</h3>
          <p className="text-gray-300">
            Prueba situaciones límite para validar la robustez del sistema.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Test de métrica en 0 */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h4 className="font-bold text-white mb-2">🔴 Métrica en Cero</h4>
              <p className="text-gray-300 text-sm mb-3">
                Fuerza una métrica a 0 para probar el comportamiento del sistema en límites mínimos.
              </p>
              <button
                onClick={() => handleRunExtremeTest('zero')}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
              >
                💥 Forzar Economía a 0
              </button>
            </div>

            {/* Test de métrica en 100 */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h4 className="font-bold text-white mb-2">🟢 Métrica en 100</h4>
              <p className="text-gray-300 text-sm mb-3">
                Fuerza una métrica a 100 para probar el comportamiento del sistema en límites máximos.
              </p>
              <button
                onClick={() => handleRunExtremeTest('hundred')}
                className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors"
              >
                💚 Forzar Popularidad a 100
              </button>
            </div>

            {/* Test de efectos en cascada */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h4 className="font-bold text-white mb-2">🌊 Efectos en Cascada</h4>
              <p className="text-gray-300 text-sm mb-3">
                Trigerea múltiples eventos seguidos para probar propagación de efectos.
              </p>
              <button
                onClick={() => handleRunExtremeTest('cascade')}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
              >
                🌊 Generar Cascada
              </button>
            </div>

            {/* Test de stress extremo */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h4 className="font-bold text-white mb-2">⚡ Stress Extremo</h4>
              <p className="text-gray-300 text-sm mb-3">
                Dispara 20 eventos en 4 segundos para probar límites de performance.
              </p>
              <button
                onClick={() => handleRunExtremeTest('stress')}
                className="px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded text-sm transition-colors"
              >
                ⚡ Bombardeo de Eventos
              </button>
            </div>
          </div>

          {/* Métricas actuales para referencia */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h4 className="font-bold text-white mb-3">📊 Métricas Actuales (para referencia)</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              {Object.entries(currentMetrics).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-400 capitalize">{key}:</span>
                  <span className={`font-medium ${
                    value < 20 ? 'text-red-400' :
                    value < 40 ? 'text-orange-400' :
                    value < 60 ? 'text-yellow-400' :
                    value < 80 ? 'text-green-400' : 'text-blue-400'
                  }`}>
                    {value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
