"use client";

import { EffectLog, PoliticalMetrics, SystemDebugInfo } from '@/types/political';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface SystemDebugConsoleProps {
  currentMetrics: PoliticalMetrics;
  effectLogs: EffectLog[];
  onSystemCheck: () => SystemDebugInfo;
}

export const SystemDebugConsole: React.FC<SystemDebugConsoleProps> = ({
  currentMetrics,
  effectLogs,
  onSystemCheck
}) => {
  const [activeTab, setActiveTab] = useState<'logs' | 'inspector' | 'consistency' | 'performance'>('logs');
  const [debugInfo, setDebugInfo] = useState<SystemDebugInfo | null>(null);
  const [logFilter, setLogFilter] = useState<'all' | 'errors' | 'warnings' | 'info'>('all');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(5000);

  // AUTO REFRESH DEL SISTEMA
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setDebugInfo(onSystemCheck());
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, onSystemCheck]);

  // REFRESH MANUAL
  const handleRefresh = useCallback(() => {
    setDebugInfo(onSystemCheck());
  }, [onSystemCheck]);

  // FILTRAR LOGS POR TIPO
  const filteredLogs = useMemo(() => {
    if (logFilter === 'all') return effectLogs;

    // Simular diferentes tipos de logs basados en datos de effectLogs
    return effectLogs.filter(log => {
      if (logFilter === 'errors') {
        return log.change < -20 || log.afterValue <= 5 || log.cascadeLevel && log.cascadeLevel > 3;
      }
      if (logFilter === 'warnings') {
        return Math.abs(log.change) > 10 && Math.abs(log.change) <= 20;
      }
      if (logFilter === 'info') {
        return Math.abs(log.change) <= 10;
      }
      return true;
    });
  }, [effectLogs, logFilter]);

  // DETECTAR PROBLEMAS DEL SISTEMA
  const systemIssues = useMemo(() => {
    const issues: Array<{type: 'error' | 'warning' | 'info', message: string}> = [];

    // Verificar métricas críticas
    Object.entries(currentMetrics).forEach(([key, value]) => {
      if (value <= 5) {
        issues.push({
          type: 'error',
          message: `Métrica ${key} está en nivel crítico (${value}%)`
        });
      } else if (value <= 15) {
        issues.push({
          type: 'warning',
          message: `Métrica ${key} está en nivel bajo (${value}%)`
        });
      }
    });

    // Verificar cambios extremos recientes
    const recentLogs = effectLogs.slice(-10);
    const extremeChanges = recentLogs.filter(log => Math.abs(log.change) > 25);
    if (extremeChanges.length > 0) {
      issues.push({
        type: 'warning',
        message: `Detectados ${extremeChanges.length} cambios extremos recientes (>25 puntos)`
      });
    }

    // Verificar efectos en cascada problemáticos
    const cascadeEffects = recentLogs.filter(log => log.cascadeLevel && log.cascadeLevel > 2);
    if (cascadeEffects.length > 3) {
      issues.push({
        type: 'error',
        message: `Múltiples efectos en cascada detectados (${cascadeEffects.length}). Posible inestabilidad.`
      });
    }

    // Verificar performance
    const recentTimestamps = recentLogs.map(log => log.timestamp);
    if (recentTimestamps.length > 1) {
      const intervals = recentTimestamps.slice(1).map((timestamp, index) =>
        timestamp - recentTimestamps[index]
      );
      const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;

      if (avgInterval < 100) { // Menos de 100ms entre efectos
        issues.push({
          type: 'warning',
          message: `Alta frecuencia de efectos detectada (${avgInterval.toFixed(0)}ms promedio). Posible sobrecarga.`
        });
      }
    }

    return issues;
  }, [currentMetrics, effectLogs]);

  // CALCULAR MÉTRICAS DE PERFORMANCE
  const performanceMetrics = useMemo(() => {
    if (effectLogs.length < 2) return null;

    const recentLogs = effectLogs.slice(-50); // Últimos 50 logs
    const timestamps = recentLogs.map(log => log.timestamp);
    const intervals = timestamps.slice(1).map((timestamp, index) =>
      timestamp - timestamps[index]
    );

    const totalTime = timestamps[timestamps.length - 1] - timestamps[0];
    const avgProcessingTime = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
    const maxProcessingTime = Math.max(...intervals);
    const minProcessingTime = Math.min(...intervals);
    const throughput = (recentLogs.length / (totalTime / 1000)) * 60; // eventos por minuto

    return {
      avgProcessingTime,
      maxProcessingTime,
      minProcessingTime,
      throughput,
      totalEvents: recentLogs.length,
      timeSpan: totalTime
    };
  }, [effectLogs]);

  // FORMATEAR TIEMPO
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3
    });
  };

  // FORMATEAR TAMAÑO DE MEMORIA
  const formatMemorySize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  return (
    <div className="space-y-6">
      {/* Header con controles */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-purple-400">🔧 Consola de Debug del Sistema</h3>

        <div className="flex items-center space-x-4">
          {/* Auto refresh */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-300">Auto-refresh</span>
          </label>

          {/* Intervalo de refresh */}
          <select
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
            disabled={!autoRefresh}
            className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white disabled:opacity-50"
          >
            <option value={1000}>1s</option>
            <option value={5000}>5s</option>
            <option value={10000}>10s</option>
            <option value={30000}>30s</option>
          </select>

          {/* Refresh manual */}
          <button
            onClick={handleRefresh}
            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm transition-colors"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Indicadores de salud del sistema */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Estado general */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-white">Estado General</h4>
            <div className={`w-3 h-3 rounded-full ${
              systemIssues.filter(i => i.type === 'error').length > 0 ? 'bg-red-500' :
              systemIssues.filter(i => i.type === 'warning').length > 0 ? 'bg-yellow-500' : 'bg-green-500'
            }`} />
          </div>
          <div className="text-sm text-gray-300">
            {systemIssues.filter(i => i.type === 'error').length === 0 ?
              'Sistema Estable' :
              `${systemIssues.filter(i => i.type === 'error').length} Error(es)`
            }
          </div>
        </div>

        {/* Métricas críticas */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-white">Métricas Críticas</h4>
            <span className="text-red-400 font-bold">
              {Object.values(currentMetrics).filter(v => v <= 15).length}
            </span>
          </div>
          <div className="text-sm text-gray-300">
            Métricas bajo 15%
          </div>
        </div>

        {/* Efectos recientes */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-white">Efectos Recientes</h4>
            <span className="text-blue-400 font-bold">
              {effectLogs.slice(-10).length}
            </span>
          </div>
          <div className="text-sm text-gray-300">
            Últimos 10 efectos
          </div>
        </div>

        {/* Performance */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-white">Performance</h4>
            <span className="text-green-400 font-bold">
              {performanceMetrics ? `${performanceMetrics.throughput.toFixed(1)}/min` : 'N/A'}
            </span>
          </div>
          <div className="text-sm text-gray-300">
            Eventos por minuto
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        {[
          { id: 'logs', label: '📝 Logs', icon: '📝' },
          { id: 'inspector', label: '🔍 Inspector', icon: '🔍' },
          { id: 'consistency', label: '✅ Consistencia', icon: '✅' },
          { id: 'performance', label: '⚡ Performance', icon: '⚡' }
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

      {/* Contenido según tab */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-bold text-white">📝 Logs Detallados del Sistema</h4>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Filtrar:</span>
              <select
                value={logFilter}
                onChange={(e) => setLogFilter(e.target.value as any)}
                className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white"
              >
                <option value="all">Todos ({effectLogs.length})</option>
                <option value="errors">
                  Errores ({effectLogs.filter(log =>
                    log.change < -20 || log.afterValue <= 5 || log.cascadeLevel && log.cascadeLevel > 3
                  ).length})
                </option>
                <option value="warnings">
                  Warnings ({effectLogs.filter(log =>
                    Math.abs(log.change) > 10 && Math.abs(log.change) <= 20
                  ).length})
                </option>
                <option value="info">
                  Info ({effectLogs.filter(log => Math.abs(log.change) <= 10).length})
                </option>
              </select>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto font-mono text-sm">
            {filteredLogs.length > 0 ? (
              <div className="space-y-1">
                {filteredLogs.slice(-50).reverse().map(log => {
                  const logLevel = log.change < -20 || log.afterValue <= 5 || (log.cascadeLevel && log.cascadeLevel > 3) ? 'error' :
                                  Math.abs(log.change) > 10 ? 'warning' : 'info';

                  return (
                    <div key={log.id} className={`p-2 rounded ${
                      logLevel === 'error' ? 'bg-red-900/20 border-l-4 border-red-500' :
                      logLevel === 'warning' ? 'bg-yellow-900/20 border-l-4 border-yellow-500' :
                      'bg-gray-800/50 border-l-4 border-gray-600'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-gray-400">{formatTime(log.timestamp)}</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              logLevel === 'error' ? 'bg-red-600' :
                              logLevel === 'warning' ? 'bg-yellow-600' : 'bg-gray-600'
                            }`}>
                              {logLevel.toUpperCase()}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              log.effectType === 'decision' ? 'bg-purple-600' :
                              log.effectType === 'event' ? 'bg-blue-600' :
                              log.effectType === 'cascade' ? 'bg-orange-600' :
                              log.effectType === 'faction' ? 'bg-red-600' : 'bg-gray-600'
                            }`}>
                              {log.effectType}
                            </span>
                            {log.cascadeLevel && (
                              <span className="px-2 py-1 rounded text-xs bg-orange-600">
                                CASCADE-{log.cascadeLevel}
                              </span>
                            )}
                          </div>

                          <div className="text-white">
                            <strong>{log.source}</strong> → <span className="text-blue-400">{log.target}</span>
                          </div>

                          <div className="text-sm text-gray-300 mt-1">
                            {log.calculation}
                          </div>
                        </div>

                        <div className="text-right ml-4">
                          <div className="text-gray-400 text-xs">
                            {log.beforeValue}% → {log.afterValue}%
                          </div>
                          <div className={`font-bold ${
                            log.change > 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {log.change > 0 ? '+' : ''}{log.change.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                No hay logs que coincidan con el filtro seleccionado.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'inspector' && (
        <div className="space-y-6">
          <h4 className="text-lg font-bold text-white">🔍 Inspector de Estado en Tiempo Real</h4>

          {/* Estado de métricas */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h5 className="font-bold text-white mb-3">📊 Estado de Métricas</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(currentMetrics).map(([key, value]) => (
                <div key={key} className="bg-gray-900 rounded p-3">
                  <div className="text-sm text-gray-400 capitalize">{key}</div>
                  <div className={`text-lg font-bold ${
                    value < 20 ? 'text-red-400' :
                    value < 40 ? 'text-orange-400' :
                    value < 60 ? 'text-yellow-400' :
                    value < 80 ? 'text-green-400' : 'text-blue-400'
                  }`}>
                    {value}%
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div
                      className={`h-2 rounded-full ${
                        value < 20 ? 'bg-red-500' :
                        value < 40 ? 'bg-orange-500' :
                        value < 60 ? 'bg-yellow-500' :
                        value < 80 ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estado del sistema */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h5 className="font-bold text-white mb-3">⚙️ Estado del Sistema</h5>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Último Update:</span>
                <div className="text-white">{formatTime(Date.now())}</div>
              </div>
              <div>
                <span className="text-gray-400">Efectos en Cola:</span>
                <div className="text-blue-400 font-bold">0</div>
              </div>
              <div>
                <span className="text-gray-400">Eventos Activos:</span>
                <div className="text-green-400 font-bold">0</div>
              </div>
              <div>
                <span className="text-gray-400">Errores:</span>
                <div className="text-red-400 font-bold">
                  {systemIssues.filter(i => i.type === 'error').length}
                </div>
              </div>
              <div>
                <span className="text-gray-400">Warnings:</span>
                <div className="text-yellow-400 font-bold">
                  {systemIssues.filter(i => i.type === 'warning').length}
                </div>
              </div>
              <div>
                <span className="text-gray-400">Memoria:</span>
                <div className="text-purple-400 font-bold">
                  {formatMemorySize(effectLogs.length * 200)} {/* Estimación */}
                </div>
              </div>
            </div>
          </div>

          {/* Propagación de efectos */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h5 className="font-bold text-white mb-3">🌊 Visualización de Propagación de Efectos</h5>

            {effectLogs.filter(log => log.cascadeLevel).length > 0 ? (
              <div className="space-y-2">
                {effectLogs.filter(log => log.cascadeLevel).slice(-5).map(log => (
                  <div key={log.id} className="flex items-center space-x-2 p-2 bg-gray-900 rounded">
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: log.cascadeLevel! }, (_, i) => (
                        <div key={i} className="w-2 h-2 bg-orange-500 rounded-full" />
                      ))}
                    </div>
                    <span className="text-white">{log.source}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-blue-400">{log.target}</span>
                    <span className={`ml-auto font-bold ${
                      log.change > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {log.change > 0 ? '+' : ''}{log.change.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-4">
                No hay efectos en cascada recientes para mostrar.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'consistency' && (
        <div className="space-y-6">
          <h4 className="text-lg font-bold text-white">✅ Verificador de Consistencia</h4>

          {/* Issues del sistema */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h5 className="font-bold text-white mb-3">🚨 Issues Detectados</h5>

            {systemIssues.length > 0 ? (
              <div className="space-y-2">
                {systemIssues.map((issue, index) => (
                  <div key={index} className={`p-3 rounded border-l-4 ${
                    issue.type === 'error' ? 'bg-red-900/20 border-red-500' :
                    issue.type === 'warning' ? 'bg-yellow-900/20 border-yellow-500' :
                    'bg-blue-900/20 border-blue-500'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${
                        issue.type === 'error' ? 'bg-red-500' :
                        issue.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <span className={`font-bold uppercase text-xs ${
                        issue.type === 'error' ? 'text-red-400' :
                        issue.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                      }`}>
                        {issue.type}
                      </span>
                    </div>
                    <div className="text-white mt-1">{issue.message}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-green-400 py-6">
                ✅ No se detectaron problemas de consistencia.
                <br />
                <span className="text-sm text-gray-400">El sistema está funcionando correctamente.</span>
              </div>
            )}
          </div>

          {/* Validaciones de datos */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h5 className="font-bold text-white mb-3">🔍 Validaciones de Datos</h5>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Validación de métricas */}
              <div className="bg-gray-900 rounded p-3">
                <h6 className="font-medium text-white mb-2">Rango de Métricas</h6>
                <div className="space-y-1 text-sm">
                  {Object.entries(currentMetrics).map(([key, value]) => {
                    const isValid = value >= 0 && value <= 100;
                    return (
                      <div key={key} className={`flex justify-between ${
                        isValid ? 'text-green-400' : 'text-red-400'
                      }`}>
                        <span className="capitalize">{key}:</span>
                        <span>{isValid ? '✅' : '❌'} {value}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Validación de efectos */}
              <div className="bg-gray-900 rounded p-3">
                <h6 className="font-medium text-white mb-2">Consistencia de Efectos</h6>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-green-400">
                    <span>Efectos válidos:</span>
                    <span>✅ {effectLogs.filter(log => log.beforeValue >= 0 && log.afterValue >= 0).length}</span>
                  </div>
                  <div className="flex justify-between text-red-400">
                    <span>Efectos inválidos:</span>
                    <span>❌ {effectLogs.filter(log => log.beforeValue < 0 || log.afterValue < 0).length}</span>
                  </div>
                  <div className="flex justify-between text-yellow-400">
                    <span>Efectos extremos:</span>
                    <span>⚠️ {effectLogs.filter(log => Math.abs(log.change) > 30).length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-6">
          <h4 className="text-lg font-bold text-white">⚡ Métricas de Performance</h4>

          {performanceMetrics ? (
            <>
              {/* Métricas principales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h5 className="font-bold text-white mb-2">Throughput</h5>
                  <div className="text-2xl font-bold text-green-400">
                    {performanceMetrics.throughput.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-400">eventos/minuto</div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h5 className="font-bold text-white mb-2">Tiempo Promedio</h5>
                  <div className="text-2xl font-bold text-blue-400">
                    {performanceMetrics.avgProcessingTime.toFixed(0)}ms
                  </div>
                  <div className="text-sm text-gray-400">por evento</div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h5 className="font-bold text-white mb-2">Tiempo Máximo</h5>
                  <div className="text-2xl font-bold text-red-400">
                    {performanceMetrics.maxProcessingTime.toFixed(0)}ms
                  </div>
                  <div className="text-sm text-gray-400">pico más alto</div>
                </div>
              </div>

              {/* Detalles de performance */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h5 className="font-bold text-white mb-3">📊 Estadísticas Detalladas</h5>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Total de Eventos:</span>
                    <div className="text-white font-bold">{performanceMetrics.totalEvents}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Tiempo Mínimo:</span>
                    <div className="text-green-400 font-bold">{performanceMetrics.minProcessingTime.toFixed(0)}ms</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Span de Tiempo:</span>
                    <div className="text-purple-400 font-bold">{(performanceMetrics.timeSpan / 1000).toFixed(1)}s</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Memoria Estimada:</span>
                    <div className="text-orange-400 font-bold">{formatMemorySize(effectLogs.length * 200)}</div>
                  </div>
                </div>
              </div>

              {/* Recomendaciones */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h5 className="font-bold text-white mb-3">💡 Recomendaciones</h5>

                <div className="space-y-2">
                  {performanceMetrics.avgProcessingTime > 1000 && (
                    <div className="p-2 bg-yellow-900/20 border border-yellow-500 rounded text-yellow-300">
                      ⚠️ Tiempo promedio de procesamiento alto. Considera optimizar los cálculos de efectos.
                    </div>
                  )}

                  {performanceMetrics.throughput > 60 && (
                    <div className="p-2 bg-orange-900/20 border border-orange-500 rounded text-orange-300">
                      🔥 Alto throughput detectado. Monitorea la estabilidad del sistema.
                    </div>
                  )}

                  {effectLogs.length > 1000 && (
                    <div className="p-2 bg-blue-900/20 border border-blue-500 rounded text-blue-300">
                      📊 Gran cantidad de logs acumulados. Considera implementar rotación de logs.
                    </div>
                  )}

                  {performanceMetrics.maxProcessingTime > 5000 && (
                    <div className="p-2 bg-red-900/20 border border-red-500 rounded text-red-300">
                      🚨 Pico de procesamiento muy alto detectado. Revisa eventos problemáticos.
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-400 py-8">
              No hay suficientes datos para calcular métricas de performance.
              <br />
              <span className="text-sm">Ejecuta algunos eventos para generar datos.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
