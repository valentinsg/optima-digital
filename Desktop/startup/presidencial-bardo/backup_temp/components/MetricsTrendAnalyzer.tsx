"use client";

import { CorrelationAnalysis, EffectLog, MetricSnapshot, MetricTrend, PoliticalMetrics } from '@/types/political';
import { useMemo, useState } from 'react';

interface MetricsTrendAnalyzerProps {
  currentMetrics: PoliticalMetrics;
  snapshots: MetricSnapshot[];
  effectLogs: EffectLog[];
}

export const MetricsTrendAnalyzer: React.FC<MetricsTrendAnalyzerProps> = ({
  currentMetrics,
  snapshots,
  effectLogs
}) => {
  const [selectedMetric, setSelectedMetric] = useState<keyof PoliticalMetrics>('popularidad');
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h' | 'all'>('6h');
  const [showCorrelations, setShowCorrelations] = useState(false);

  // CALCULAR TENDENCIAS DE MÉTRICAS
  const metricTrends = useMemo((): Record<keyof PoliticalMetrics, MetricTrend> => {
    const trends: Partial<Record<keyof PoliticalMetrics, MetricTrend>> = {};

    Object.keys(currentMetrics).forEach(metricKey => {
      const key = metricKey as keyof PoliticalMetrics;

      // Filtrar snapshots por rango de tiempo
      const now = Date.now();
      const timeRangeMs = timeRange === '1h' ? 60 * 60 * 1000 :
                          timeRange === '6h' ? 6 * 60 * 60 * 1000 :
                          timeRange === '24h' ? 24 * 60 * 60 * 1000 :
                          Infinity;

      const filteredSnapshots = snapshots.filter(s =>
        timeRange === 'all' || (now - s.timestamp) <= timeRangeMs
      );

      if (filteredSnapshots.length < 2) {
        trends[key] = {
          metricType: key,
          values: [],
          trend: 'stable',
          averageChange: 0,
          volatility: 0
        };
        return;
      }

      // Crear valores con cambios
      const values = filteredSnapshots.map((snapshot, index) => {
        const previousValue = index > 0 ? filteredSnapshots[index - 1].metrics[key] : snapshot.metrics[key];
        const change = snapshot.metrics[key] - previousValue;

        // Buscar el trigger que causó este cambio
        const relevantEffect = effectLogs.find(log =>
          Math.abs(log.timestamp - snapshot.timestamp) < 5000 && // 5 segundos de tolerancia
          log.target.includes(key)
        );

        return {
          timestamp: snapshot.timestamp,
          value: snapshot.metrics[key],
          change,
          trigger: relevantEffect?.source || snapshot.lastDecision
        };
      });

      // Calcular tendencia general
      const changes = values.slice(1).map(v => v.change);
      const averageChange = changes.reduce((sum, change) => sum + change, 0) / changes.length;

      // Calcular volatilidad (desviación estándar de cambios)
      const volatility = Math.sqrt(
        changes.reduce((sum, change) => sum + Math.pow(change - averageChange, 2), 0) / changes.length
      );

      // Determinar tipo de tendencia
      let trendType: MetricTrend['trend'];
      if (Math.abs(averageChange) < 1) {
        trendType = 'stable';
      } else if (volatility > Math.abs(averageChange) * 2) {
        trendType = 'volatile';
      } else if (averageChange > 0) {
        trendType = 'ascending';
      } else {
        trendType = 'descending';
      }

      trends[key] = {
        metricType: key,
        values,
        trend: trendType,
        averageChange,
        volatility
      };
    });

    return trends as Record<keyof PoliticalMetrics, MetricTrend>;
  }, [currentMetrics, snapshots, effectLogs, timeRange]);

  // ANÁLISIS DE CORRELACIONES
  const correlationAnalysis = useMemo((): CorrelationAnalysis[] => {
    if (!showCorrelations || effectLogs.length < 10) return [];

    const decisionTypes = Array.from(new Set(effectLogs.map(log => log.source)));

    return decisionTypes.map(decisionType => {
      const relevantEffects = effectLogs.filter(log => log.source === decisionType);

      if (relevantEffects.length < 3) {
        return {
          decisionType,
          expectedEffects: {},
          actualEffects: {},
          accuracy: 0,
          variance: 0,
          consistency: 'low' as const
        };
      }

      // Calcular efectos promedio y esperados
      const metricKeys = Object.keys(currentMetrics) as Array<keyof PoliticalMetrics>;
      const expectedEffects: Record<string, number> = {};
      const actualEffects: Record<string, number> = {};

      metricKeys.forEach(metric => {
        const effects = relevantEffects.filter(log => log.target.includes(metric));
        if (effects.length > 0) {
          const avgChange = effects.reduce((sum, eff) => sum + eff.change, 0) / effects.length;
          actualEffects[metric] = avgChange;

          // Para "expectedEffects", usaríamos datos de configuración de eventos
          // Por ahora, usamos el promedio como "esperado"
          expectedEffects[metric] = avgChange;
        }
      });

      // Calcular precisión y consistencia
      const accuracy = Object.keys(actualEffects).length > 0 ?
        Object.keys(actualEffects).reduce((sum, key) => {
          const expected = expectedEffects[key] || 0;
          const actual = actualEffects[key] || 0;
          return sum + (1 - Math.abs(expected - actual) / Math.max(Math.abs(expected), Math.abs(actual), 1));
        }, 0) / Object.keys(actualEffects).length : 0;

      const variance = Object.values(actualEffects).reduce((sum, value) => {
        const mean = Object.values(actualEffects).reduce((s, v) => s + v, 0) / Object.values(actualEffects).length;
        return sum + Math.pow(value - mean, 2);
      }, 0) / Object.values(actualEffects).length;

      const consistency: 'high' | 'medium' | 'low' = variance < 5 ? 'high' : variance < 15 ? 'medium' : 'low';

      return {
        decisionType,
        expectedEffects,
        actualEffects,
        accuracy,
        variance,
        consistency
      };
    }).filter(analysis => Object.keys(analysis.actualEffects).length > 0);
  }, [effectLogs, currentMetrics, showCorrelations]);

  // RENDERIZAR MINI-GRÁFICO
  const renderMiniChart = (trend: MetricTrend) => {
    if (trend.values.length < 2) return null;

    const width = 120;
    const height = 40;
    const maxValue = Math.max(...trend.values.map(v => v.value));
    const minValue = Math.min(...trend.values.map(v => v.value));
    const range = maxValue - minValue || 1;

    const points = trend.values.map((value, index) => {
      const x = (index / (trend.values.length - 1)) * width;
      const y = height - ((value.value - minValue) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    const trendColor = trend.trend === 'ascending' ? '#10b981' :
                      trend.trend === 'descending' ? '#ef4444' :
                      trend.trend === 'volatile' ? '#f59e0b' : '#6b7280';

    return (
      <svg width={width} height={height} className="ml-2">
        <polyline
          points={points}
          fill="none"
          stroke={trendColor}
          strokeWidth="2"
          className="opacity-70"
        />
        {trend.values.map((value, index) => {
          const x = (index / (trend.values.length - 1)) * width;
          const y = height - ((value.value - minValue) / range) * height;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill={trendColor}
              className="opacity-90"
            />
          );
        })}
      </svg>
    );
  };

  // FORMATEAR TIEMPO
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header con controles */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-purple-400">📈 Análisis de Tendencias de Métricas</h3>

        <div className="flex items-center space-x-4">
          {/* Selector de rango de tiempo */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Rango:</span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white"
            >
              <option value="1h">Última Hora</option>
              <option value="6h">Últimas 6 Horas</option>
              <option value="24h">Últimas 24 Horas</option>
              <option value="all">Todo el Tiempo</option>
            </select>
          </div>

          {/* Toggle correlaciones */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showCorrelations}
              onChange={(e) => setShowCorrelations(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-300">Mostrar Correlaciones</span>
          </label>
        </div>
      </div>

      {/* Resumen de métricas con tendencias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(metricTrends).map(([metricKey, trend]) => {
          const key = metricKey as keyof PoliticalMetrics;
          const currentValue = currentMetrics[key];

          return (
            <div
              key={key}
              onClick={() => setSelectedMetric(key)}
              className={`bg-gray-800 rounded-lg p-4 border cursor-pointer transition-all ${
                selectedMetric === key
                  ? 'border-purple-500 bg-purple-900/20'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white capitalize">{key}</h4>
                <span className={`text-lg font-bold ${
                  currentValue < 20 ? 'text-red-400' :
                  currentValue < 40 ? 'text-orange-400' :
                  currentValue < 60 ? 'text-yellow-400' :
                  currentValue < 80 ? 'text-green-400' : 'text-blue-400'
                }`}>
                  {currentValue}%
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <span className={`inline-block w-3 h-3 rounded-full ${
                    trend.trend === 'ascending' ? 'bg-green-500' :
                    trend.trend === 'descending' ? 'bg-red-500' :
                    trend.trend === 'volatile' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`} />
                  <span className="text-gray-300 capitalize">{trend.trend}</span>
                </div>

                <div className="text-gray-400">
                  {trend.averageChange > 0 ? '+' : ''}{trend.averageChange.toFixed(1)}/h
                </div>
              </div>

              {/* Mini gráfico */}
              <div className="mt-2 flex justify-center">
                {renderMiniChart(trend)}
              </div>

              <div className="mt-2 text-xs text-gray-400">
                Volatilidad: {trend.volatility.toFixed(1)} |
                Puntos: {trend.values.length}
              </div>
            </div>
          );
        })}
      </div>

      {/* Gráfico detallado de la métrica seleccionada */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h4 className="text-lg font-bold text-white mb-4 capitalize">
          📊 Evolución Detallada: {selectedMetric}
        </h4>

        {metricTrends[selectedMetric] && metricTrends[selectedMetric].values.length > 0 ? (
          <div className="space-y-4">
            {/* Gráfico principal */}
            <div className="bg-gray-900 rounded p-4 overflow-x-auto">
              <svg width="800" height="200" className="min-w-full">
                {/* Grid de fondo */}
                <defs>
                  <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="1" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="800" height="200" fill="url(#grid)" />

                {/* Línea de la métrica */}
                {(() => {
                  const values = metricTrends[selectedMetric].values;
                  const width = 800;
                  const height = 200;
                  const padding = 40;
                  const chartWidth = width - padding * 2;
                  const chartHeight = height - padding * 2;

                  const maxValue = 100; // Las métricas van de 0 a 100
                  const minValue = 0;

                  const points = values.map((value, index) => {
                    const x = padding + (index / Math.max(values.length - 1, 1)) * chartWidth;
                    const y = padding + (1 - (value.value - minValue) / (maxValue - minValue)) * chartHeight;
                    return { x, y, value, index };
                  });

                  const pathData = points.map((point, index) =>
                    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
                  ).join(' ');

                  return (
                    <>
                      {/* Área bajo la curva */}
                      <path
                        d={`${pathData} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`}
                        fill="url(#gradient)"
                        opacity="0.2"
                      />

                      {/* Línea principal */}
                      <path
                        d={pathData}
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="3"
                      />

                      {/* Puntos */}
                      {points.map((point, index) => (
                        <g key={index}>
                          <circle
                            cx={point.x}
                            cy={point.y}
                            r="4"
                            fill="#8b5cf6"
                            stroke="#1f2937"
                            strokeWidth="2"
                          />

                          {/* Tooltip al hacer hover */}
                          <circle
                            cx={point.x}
                            cy={point.y}
                            r="8"
                            fill="transparent"
                            className="hover:fill-purple-500 hover:fill-opacity-20 cursor-pointer"
                          >
                            <title>{`${formatTime(point.value.timestamp)}: ${point.value.value}% (${point.value.change > 0 ? '+' : ''}${point.value.change.toFixed(1)})`}</title>
                          </circle>
                        </g>
                      ))}

                      {/* Gradient definition */}
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
                        </linearGradient>
                      </defs>

                      {/* Ejes */}
                      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#6b7280" strokeWidth="1" />
                      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#6b7280" strokeWidth="1" />

                      {/* Labels de escala Y */}
                      {[0, 25, 50, 75, 100].map(value => {
                        const y = padding + (1 - value / 100) * chartHeight;
                        return (
                          <g key={value}>
                            <line x1={padding - 5} y1={y} x2={padding} y2={y} stroke="#6b7280" strokeWidth="1" />
                            <text x={padding - 10} y={y + 4} textAnchor="end" fill="#9ca3af" fontSize="12">
                              {value}%
                            </text>
                          </g>
                        );
                      })}
                    </>
                  );
                })()}
              </svg>
            </div>

            {/* Estadísticas de la métrica */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div className="text-center">
                <div className="text-gray-400">Valor Actual</div>
                <div className="text-purple-400 font-bold text-lg">{currentMetrics[selectedMetric]}%</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Tendencia</div>
                <div className={`font-bold text-lg capitalize ${
                  metricTrends[selectedMetric].trend === 'ascending' ? 'text-green-400' :
                  metricTrends[selectedMetric].trend === 'descending' ? 'text-red-400' :
                  metricTrends[selectedMetric].trend === 'volatile' ? 'text-yellow-400' : 'text-gray-400'
                }`}>
                  {metricTrends[selectedMetric].trend}
                </div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Cambio Promedio</div>
                <div className={`font-bold text-lg ${
                  metricTrends[selectedMetric].averageChange > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metricTrends[selectedMetric].averageChange > 0 ? '+' : ''}
                  {metricTrends[selectedMetric].averageChange.toFixed(2)}/h
                </div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Volatilidad</div>
                <div className={`font-bold text-lg ${
                  metricTrends[selectedMetric].volatility < 5 ? 'text-green-400' :
                  metricTrends[selectedMetric].volatility < 15 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {metricTrends[selectedMetric].volatility.toFixed(1)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Puntos de Datos</div>
                <div className="text-blue-400 font-bold text-lg">
                  {metricTrends[selectedMetric].values.length}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            No hay suficientes datos para mostrar la evolución de esta métrica.
            <br />
            <span className="text-sm">Ejecuta algunos eventos o tests para generar datos.</span>
          </div>
        )}
      </div>

      {/* Historial de efectos recientes */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h4 className="text-lg font-bold text-white mb-4">📝 Historial de Efectos Recientes</h4>

        {effectLogs.length > 0 ? (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {effectLogs.slice(-10).reverse().map(log => (
              <div key={log.id} className="flex items-center justify-between p-2 bg-gray-900 rounded text-sm">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">{formatTime(log.timestamp)}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    log.effectType === 'decision' ? 'bg-purple-600' :
                    log.effectType === 'event' ? 'bg-blue-600' :
                    log.effectType === 'cascade' ? 'bg-orange-600' :
                    log.effectType === 'faction' ? 'bg-red-600' : 'bg-gray-600'
                  }`}>
                    {log.effectType}
                  </span>
                  <span className="text-white">{log.source}</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-gray-300">{log.target}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">{log.beforeValue}%</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-white">{log.afterValue}%</span>
                  <span className={`font-bold ${
                    log.change > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    ({log.change > 0 ? '+' : ''}{log.change.toFixed(1)})
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-4">
            No hay efectos registrados aún.
            <br />
            <span className="text-sm">Los efectos aparecerán aquí cuando se ejecuten eventos o decisiones.</span>
          </div>
        )}
      </div>

      {/* Análisis de correlaciones */}
      {showCorrelations && correlationAnalysis.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h4 className="text-lg font-bold text-white mb-4">🔗 Análisis de Correlaciones</h4>

          <div className="space-y-4">
            {correlationAnalysis.map(analysis => (
              <div key={analysis.decisionType} className="bg-gray-900 rounded p-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-white">{analysis.decisionType}</h5>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className={`px-2 py-1 rounded ${
                      analysis.consistency === 'high' ? 'bg-green-600' :
                      analysis.consistency === 'medium' ? 'bg-yellow-600' : 'bg-red-600'
                    }`}>
                      Consistencia: {analysis.consistency}
                    </span>
                    <span className="text-gray-400">
                      Precisión: {(analysis.accuracy * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  {Object.entries(analysis.actualEffects).map(([metric, effect]) => (
                    <div key={metric} className="flex justify-between">
                      <span className="text-gray-400 capitalize">{metric}:</span>
                      <span className={`font-medium ${
                        effect > 0 ? 'text-green-400' : effect < 0 ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {effect > 0 ? '+' : ''}{effect.toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
