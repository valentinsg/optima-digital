"use client";

import { PoliticalMetrics } from '@/types/political';
import { useCallback, useState } from 'react';

interface ExtremeCasesProps {
  currentMetrics: PoliticalMetrics;
  onForceMetricAction: (metric: keyof PoliticalMetrics, value: number) => void;
  onTriggerCrisisAction: (crisisType: string) => void;
  onStressTestAction: (intensity: 'low' | 'medium' | 'high' | 'extreme') => void;
}

export const ExtremeCasesTester: React.FC<ExtremeCasesProps> = ({
  currentMetrics,
  onForceMetricAction,
  onTriggerCrisisAction,
  onStressTestAction
}) => {
  const [selectedMetric, setSelectedMetric] = useState<keyof PoliticalMetrics>('economia');
  const [targetValue, setTargetValue] = useState(0);
  const [stressTestRunning, setStressTestRunning] = useState(false);

  // TESTS DE LÍMITES DE MÉTRICAS
  const handleForceMetricToLimit = useCallback((metric: keyof PoliticalMetrics, limit: 'min' | 'max') => {
    const value = limit === 'min' ? 0 : 100;
    console.log(`🔥 Forzando ${metric} a ${value}%`);
    onForceMetricAction(metric, value);
  }, [onForceMetricAction]);

  // TESTS DE MÚLTIPLES CRISIS SIMULTÁNEAS
  const handleMultipleCrisis = useCallback(() => {
    console.log(`💥 Iniciando crisis múltiples simultáneas`);

    // Simular crisis en cascada
    const crisisTypes = [
      'economic-collapse',
      'social-unrest',
      'security-breakdown',
      'international-isolation',
      'corruption-scandal'
    ];

    crisisTypes.forEach((crisis, index) => {
      setTimeout(() => {
        onTriggerCrisisAction(crisis);
      }, index * 500); // 500ms entre cada crisis
    });
  }, [onTriggerCrisisAction]);

  // STRESS TEST CON DIFERENTES INTENSIDADES
  const handleStressTest = useCallback(async (intensity: 'low' | 'medium' | 'high' | 'extreme') => {
    console.log(`⚡ Iniciando stress test: ${intensity}`);
    setStressTestRunning(true);

    const intensityConfig = {
      low: { events: 10, interval: 1000, duration: 10000 },
      medium: { events: 25, interval: 500, duration: 15000 },
      high: { events: 50, interval: 200, duration: 20000 },
      extreme: { events: 100, interval: 100, duration: 30000 }
    };

    const config = intensityConfig[intensity];

    try {
      await onStressTestAction(intensity);

      // Simular ejecución del stress test
      setTimeout(() => {
        setStressTestRunning(false);
        console.log(`✅ Stress test ${intensity} completado`);
      }, config.duration);

    } catch (error) {
      console.error(`❌ Error en stress test:`, error);
      setStressTestRunning(false);
    }
  }, [onStressTestAction]);

  // TESTS DE CASCADA
  const handleCascadeTest = useCallback(() => {
    console.log(`🌊 Iniciando test de efectos en cascada`);

    // Forzar una secuencia que debería generar efectos en cascada
    onForceMetricAction('economia', 5); // Crisis económica

    setTimeout(() => {
      onTriggerCrisisAction('social-unrest'); // Esto debería amplificar la crisis
    }, 1000);

    setTimeout(() => {
      onTriggerCrisisAction('security-breakdown'); // Esto debería crear más inestabilidad
    }, 2000);

    setTimeout(() => {
      onForceMetricAction('popularidad', 5); // Crisis de legitimidad
    }, 3000);
  }, [onForceMetricAction, onTriggerCrisisAction]);

  // VALIDACIÓN DE CONSISTENCIA
  const handleConsistencyTest = useCallback(() => {
    console.log(`✅ Iniciando test de consistencia`);

    // Test 1: Valores fuera de rango
    onForceMetricAction('economia', -10); // Debería ser clampeado a 0

    setTimeout(() => {
      onForceMetricAction('popularidad', 150); // Debería ser clampeado a 100
    }, 500);

    // Test 2: Cambios extremos súbitos
    setTimeout(() => {
      onForceMetricAction('seguridad', 100);
    }, 1000);

    setTimeout(() => {
      onForceMetricAction('seguridad', 0);
    }, 1500);

    setTimeout(() => {
      onForceMetricAction('seguridad', 50);
    }, 2000);

  }, [onForceMetricAction]);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-purple-400">💥 Testing de Casos Extremos</h3>
      <p className="text-gray-300">
        Herramientas especializadas para probar los límites y la robustez del sistema político.
      </p>

      {/* Tests de límites de métricas */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h4 className="text-lg font-bold text-white mb-4">🎯 Tests de Límites de Métricas</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Control manual */}
          <div className="space-y-4">
            <h5 className="font-medium text-white">Control Manual</h5>

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Métrica a modificar:</label>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value as keyof PoliticalMetrics)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                >
                  {Object.keys(currentMetrics).map(metric => (
                    <option key={metric} value={metric} className="capitalize">
                      {metric}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Valor objetivo (0-100):</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={targetValue}
                  onChange={(e) => setTargetValue(Number(e.target.value))}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                />
              </div>

              <button
                onClick={() => onForceMetricAction(selectedMetric, targetValue)}
                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors"
              >
                🎯 Forzar Valor
              </button>
            </div>
          </div>

          {/* Tests automáticos */}
          <div className="space-y-4">
            <h5 className="font-medium text-white">Tests Automáticos de Límites</h5>

            <div className="grid grid-cols-2 gap-2">
              {Object.keys(currentMetrics).map(metric => (
                <div key={metric} className="space-y-2">
                  <div className="text-sm text-gray-300 capitalize">{metric}</div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleForceMetricToLimit(metric as keyof PoliticalMetrics, 'min')}
                      className="flex-1 px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs transition-colors"
                    >
                      Min (0)
                    </button>
                    <button
                      onClick={() => handleForceMetricToLimit(metric as keyof PoliticalMetrics, 'max')}
                      className="flex-1 px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs transition-colors"
                    >
                      Max (100)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Métricas actuales para referencia */}
        <div className="mt-6 p-4 bg-gray-900 rounded">
          <h6 className="font-medium text-white mb-2">📊 Estado Actual</h6>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {Object.entries(currentMetrics).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-gray-400 capitalize">{key}:</span>
                <span className={`font-bold ${
                  value < 10 ? 'text-red-400' :
                  value < 25 ? 'text-orange-400' :
                  value < 50 ? 'text-yellow-400' :
                  value < 75 ? 'text-green-400' : 'text-blue-400'
                }`}>
                  {value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tests de crisis múltiples */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h4 className="text-lg font-bold text-white mb-4">🌪️ Tests de Crisis Múltiples</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900 rounded p-4">
            <h5 className="font-medium text-white mb-2">Crisis en Cascada</h5>
            <p className="text-gray-300 text-sm mb-3">
              Desencadena múltiples crisis simultáneamente para probar la propagación de efectos.
            </p>
            <button
              onClick={handleMultipleCrisis}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
            >
              💥 Iniciar Crisis Múltiples
            </button>
          </div>

          <div className="bg-gray-900 rounded p-4">
            <h5 className="font-medium text-white mb-2">Test de Cascada</h5>
            <p className="text-gray-300 text-sm mb-3">
              Secuencia diseñada para generar efectos en cascada entre métricas y provincias.
            </p>
            <button
              onClick={handleCascadeTest}
              className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded transition-colors"
            >
              🌊 Test de Cascada
            </button>
          </div>

          <div className="bg-gray-900 rounded p-4">
            <h5 className="font-medium text-white mb-2">Test de Consistencia</h5>
            <p className="text-gray-300 text-sm mb-3">
              Prueba valores fuera de rango y cambios extremos para validar la robustez.
            </p>
            <button
              onClick={handleConsistencyTest}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              ✅ Test de Consistencia
            </button>
          </div>
        </div>
      </div>

      {/* Stress tests */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h4 className="text-lg font-bold text-white mb-4">⚡ Stress Tests del Sistema</h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              level: 'low' as const,
              label: 'Básico',
              description: '10 eventos en 10s',
              color: 'bg-green-600 hover:bg-green-700',
              icon: '🟢'
            },
            {
              level: 'medium' as const,
              label: 'Medio',
              description: '25 eventos en 15s',
              color: 'bg-yellow-600 hover:bg-yellow-700',
              icon: '🟡'
            },
            {
              level: 'high' as const,
              label: 'Alto',
              description: '50 eventos en 20s',
              color: 'bg-orange-600 hover:bg-orange-700',
              icon: '🟠'
            },
            {
              level: 'extreme' as const,
              label: 'Extremo',
              description: '100 eventos en 30s',
              color: 'bg-red-600 hover:bg-red-700',
              icon: '🔴'
            }
          ].map(test => (
            <div key={test.level} className="bg-gray-900 rounded p-4 text-center">
              <div className="text-2xl mb-2">{test.icon}</div>
              <h5 className="font-medium text-white mb-1">{test.label}</h5>
              <p className="text-gray-300 text-xs mb-3">{test.description}</p>
              <button
                onClick={() => handleStressTest(test.level)}
                disabled={stressTestRunning}
                className={`w-full px-3 py-2 rounded text-sm transition-colors ${
                  stressTestRunning
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : test.color
                }`}
              >
                {stressTestRunning ? '⏳ Ejecutando...' : `⚡ ${test.label}`}
              </button>
            </div>
          ))}
        </div>

        {stressTestRunning && (
          <div className="mt-4 p-4 bg-orange-900/20 border border-orange-500 rounded">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-orange-400 font-medium">Stress Test en Progreso</span>
            </div>
            <p className="text-orange-300 text-sm">
              El sistema está siendo bombardeado con eventos. Monitorea las métricas de performance.
            </p>
          </div>
        )}
      </div>

      {/* Escenarios de recuperación */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h4 className="text-lg font-bold text-white mb-4">🔄 Tests de Recuperación</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded p-4">
            <h5 className="font-medium text-white mb-2">Recuperación Rápida</h5>
            <p className="text-gray-300 text-sm mb-3">
              Restaura todas las métricas a valores estables después de una crisis.
            </p>
            <button
              onClick={() => {
                Object.keys(currentMetrics).forEach(metric => {
                  onForceMetricAction(metric as keyof PoliticalMetrics, 50);
                });
              }}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
            >
              🔄 Recuperación Total
            </button>
          </div>

          <div className="bg-gray-900 rounded p-4">
            <h5 className="font-medium text-white mb-2">Estado Óptimo</h5>
            <p className="text-gray-300 text-sm mb-3">
              Establece todas las métricas en valores altos para probar el estado ideal.
            </p>
            <button
              onClick={() => {
                Object.keys(currentMetrics).forEach(metric => {
                  onForceMetricAction(metric as keyof PoliticalMetrics, 85);
                });
              }}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              ⭐ Estado Óptimo
            </button>
          </div>
        </div>
      </div>

      {/* Información de testing */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h4 className="text-lg font-bold text-white mb-4">📋 Guía de Testing de Casos Extremos</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-white mb-2">🎯 Objetivos del Testing</h5>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Validar comportamiento en límites (0% y 100%)</li>
              <li>• Probar propagación de efectos extremos</li>
              <li>• Verificar estabilidad bajo stress</li>
              <li>• Detectar puntos de falla del sistema</li>
              <li>• Validar recuperación tras crisis</li>
            </ul>
          </div>

          <div>
            <h5 className="font-medium text-white mb-2">⚠️ Casos a Probar</h5>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Métricas en 0% (colapso total)</li>
              <li>• Múltiples crisis simultáneas</li>
              <li>• Cambios extremos súbitos</li>
              <li>• Efectos en cascada descontrolados</li>
              <li>• Sobrecarga de eventos (&gt;50/min)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
