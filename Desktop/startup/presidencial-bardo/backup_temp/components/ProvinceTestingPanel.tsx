"use client";

import { DecisionResult, PoliticalMetrics } from "@/types/political";
import { ProvinceManager, RegionalEffect, SimpleProvinceState } from "@/utils/provinceManager";
import { AlertTriangle, Heart, MapPin, TrendingDown, TrendingUp, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export function ProvinceTestingPanel() {
  const [provinceManager] = useState(() => new ProvinceManager());
  const [provinces, setProvinces] = useState<SimpleProvinceState[]>([]);
  const [nationalImpact, setNationalImpact] = useState({
    averagePerception: 0,
    populationWeightedPerception: 0,
    criticalProvincesCount: 0,
    loyalProvincesCount: 0
  });
  const [recentEffects, setRecentEffects] = useState<RegionalEffect[]>([]);
  const [testLog, setTestLog] = useState<string[]>([
    "🏛️ Sistema Provincial Simplificado iniciado",
    "📊 Basado en percepción del gobierno por provincia"
  ]);

  // Mock de métricas políticas para testing
  const [mockMetrics, setMockMetrics] = useState<PoliticalMetrics>({
    popularidad: 50,
    economia: 50,
    seguridad: 50,
    relacionesInternacionales: 50,
    corrupcion: 50,
    controlMedios: 50,
    salud: 50,
    tecnologia: 50
  });

  const addToLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setTestLog(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const updateData = () => {
    setProvinces(provinceManager.getAllProvinces());
    setNationalImpact(provinceManager.getNationalImpact());
  };

  useEffect(() => {
    updateData();
  }, []);

  // Decisiones de prueba
  const testDecisions = [
    {
      id: "subsidio-social",
      title: "Aumentar subsidios sociales",
      description: "Incremento del 30% en planes sociales"
    },
    {
      id: "reforma-mercado",
      title: "Reforma pro-mercado",
      description: "Flexibilización laboral y reducción de impuestos"
    },
    {
      id: "seguridad-mano-dura",
      title: "Mano dura en seguridad",
      description: "Operativos policiales masivos"
    },
    {
      id: "crisis-economica",
      title: "Simular crisis económica",
      description: "Caída drástica de métricas económicas"
    }
  ];

  const applyTestDecision = (decisionId: string, title: string) => {
    // Crear decisión mock
    const mockDecision: DecisionResult = {
      eventId: `test-${decisionId}`,
      eventTitle: "Evento de prueba",
      choiceId: decisionId,
      choiceTitle: title,
      appliedEffects: [],
      appliedFactionEffects: [],
      appliedRegionalEffects: [],
      triggeredEvents: [],
      timestamp: Date.now(),
      description: `Decisión de prueba: ${title}`
    };

    // Simular efectos en métricas
    let newMetrics = { ...mockMetrics };

    switch (decisionId) {
      case "subsidio-social":
        newMetrics.economia -= 10;
        newMetrics.popularidad += 15;
        break;
      case "reforma-mercado":
        newMetrics.economia += 10;
        newMetrics.popularidad -= 10;
        break;
      case "seguridad-mano-dura":
        newMetrics.seguridad += 15;
        newMetrics.popularidad += 5;
        break;
      case "crisis-economica":
        newMetrics.economia = 20;
        newMetrics.popularidad -= 20;
        break;
    }

    setMockMetrics(newMetrics);

    // Aplicar efectos provinciales
    const effects = provinceManager.applyDecisionEffects(mockDecision, newMetrics);
    setRecentEffects(effects.slice(0, 8)); // Mostrar solo los primeros 8

    addToLog(`🎯 Decisión aplicada: ${title}`);
    addToLog(`📊 Efectos en ${effects.length} provincias`);

    updateData();
  };

  const simulateProvinceEvent = (provinceId: string, description: string, impact: number) => {
    provinceManager.triggerProvinceEvent(provinceId as any, description, impact);
    addToLog(`🗺️ Evento en ${provinceId}: ${description} (${impact > 0 ? '+' : ''}${impact})`);
    updateData();
  };

  const resetSystem = () => {
    provinceManager.reset();
    setMockMetrics({
      popularidad: 50,
      economia: 50,
      seguridad: 50,
      relacionesInternacionales: 50,
      corrupcion: 50,
      controlMedios: 50,
      salud: 50,
      tecnologia: 50
    });
    setRecentEffects([]);
    setTestLog([
      "🔄 Sistema reiniciado",
      "📊 Métricas y provincias restauradas"
    ]);
    updateData();
  };

  const getPerceptionColor = (perception: number) => {
    if (perception >= 30) return "text-green-400";
    if (perception >= 0) return "text-yellow-400";
    if (perception >= -30) return "text-orange-400";
    return "text-red-400";
  };

  const getPerceptionIcon = (perception: number) => {
    if (perception >= 30) return <Heart className="w-4 h-4" />;
    if (perception >= 0) return <Users className="w-4 h-4" />;
    if (perception >= -30) return <TrendingDown className="w-4 h-4" />;
    return <AlertTriangle className="w-4 h-4" />;
  };

  const criticalProvinces = provinceManager.getCriticalProvinces();
  const loyalProvinces = provinceManager.getLoyalProvinces();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
            <MapPin className="w-10 h-10 text-purple-400" />
            Testing Sistema Provincial Simplificado
          </h1>
          <p className="text-purple-300 text-lg">
            Percepción del gobierno por provincia e impacto de decisiones
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel de Control */}
          <div className="lg:col-span-1 space-y-6">
            {/* Métricas Nacionales Mock */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Zap className="w-6 h-6 text-purple-400" />
                Métricas Nacionales
              </h2>
              <div className="space-y-3">
                {Object.entries(mockMetrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm capitalize">{key}:</span>
                    <span className={`font-bold ${value >= 50 ? 'text-green-400' : value >= 30 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {Math.round(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decisiones de Prueba */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <h2 className="text-xl font-bold mb-4">Decisiones de Prueba</h2>
              <div className="space-y-3">
                {testDecisions.map(decision => (
                  <button
                    key={decision.id}
                    onClick={() => applyTestDecision(decision.id, decision.title)}
                    className="w-full text-left p-3 bg-purple-900/30 hover:bg-purple-800/50 border border-purple-500/30 hover:border-purple-400/50 rounded-lg transition-all"
                  >
                    <div className="font-medium text-purple-200">{decision.title}</div>
                    <div className="text-xs text-gray-400">{decision.description}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={resetSystem}
                className="w-full mt-4 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                🔄 Reiniciar Sistema
              </button>
            </div>

            {/* Eventos Provinciales Rápidos */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <h3 className="text-lg font-bold mb-3">Eventos Provinciales</h3>
              <div className="space-y-2">
                <button
                  onClick={() => simulateProvinceEvent("BUENOS_AIRES", "Protesta masiva", -15)}
                  className="w-full text-xs bg-red-900/30 hover:bg-red-800/50 px-3 py-2 rounded transition-colors"
                >
                  💥 Protesta en Buenos Aires
                </button>
                <button
                  onClick={() => simulateProvinceEvent("CABA", "Inversión extranjera", 20)}
                  className="w-full text-xs bg-green-900/30 hover:bg-green-800/50 px-3 py-2 rounded transition-colors"
                >
                  💰 Inversión en CABA
                </button>
                <button
                  onClick={() => simulateProvinceEvent("FORMOSA", "Obra pública inaugurada", 12)}
                  className="w-full text-xs bg-blue-900/30 hover:bg-blue-800/50 px-3 py-2 rounded transition-colors"
                >
                  🏗️ Obra en Formosa
                </button>
              </div>
            </div>
          </div>

          {/* Área Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resumen Nacional */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <h2 className="text-2xl font-bold mb-4">📊 Impacto Nacional</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-300">
                    {nationalImpact.averagePerception.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-400">Percepción Promedio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-300">
                    {nationalImpact.populationWeightedPerception.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-400">Ponderada por Población</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {nationalImpact.criticalProvincesCount}
                  </div>
                  <div className="text-sm text-gray-400">Provincias Críticas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {nationalImpact.loyalProvincesCount}
                  </div>
                  <div className="text-sm text-gray-400">Provincias Leales</div>
                </div>
              </div>
            </div>

            {/* Lista de Provincias */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <h2 className="text-xl font-bold mb-4">🗺️ Estado Provincial</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                {provinces
                  .sort((a, b) => b.governmentPerception - a.governmentPerception)
                  .map(province => (
                    <div key={province.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className={getPerceptionColor(province.governmentPerception)}>
                          {getPerceptionIcon(province.governmentPerception)}
                        </span>
                        <div>
                          <div className="font-medium">{province.name}</div>
                          <div className="text-xs text-gray-400">{province.ideology}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${getPerceptionColor(province.governmentPerception)}`}>
                          {province.governmentPerception > 0 ? '+' : ''}{province.governmentPerception.toFixed(0)}
                        </div>
                        <div className="text-xs text-gray-400">
                          {(province.population / 1000000).toFixed(1)}M hab
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Efectos Recientes */}
            {recentEffects.length > 0 && (
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-lg font-bold mb-3">⚡ Efectos Recientes</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {recentEffects.map((effect, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-900/30 rounded text-sm">
                      <span className={effect.perceptionChange > 0 ? 'text-green-400' : 'text-red-400'}>
                        {effect.perceptionChange > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      </span>
                      <span className="flex-1">{effect.description}</span>
                      <span className={`font-bold ${effect.perceptionChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {effect.perceptionChange > 0 ? '+' : ''}{effect.perceptionChange}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Log del Sistema */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
              <h3 className="text-lg font-bold mb-3">📋 Log del Sistema</h3>
              <div className="bg-gray-900/50 rounded-lg p-4 h-32 overflow-y-auto font-mono text-sm">
                {testLog.slice(-10).map((log, index) => (
                  <div key={index} className="text-green-400 mb-1">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
