import { getCharacterWeaknesses, shouldActivateWeakness } from '@/data/characterWeaknesses';
import { MetricType } from '@/types/political';
import React, { useState } from 'react';

interface CharacterWeaknessesHUDProps {
  characterId: string;
  metrics: Record<MetricType, number>;
  daysInPower: number;
  completedEvents: string[];
  onMitigateWeakness: (weaknessId: string, mitigationId: string) => void;
}

const getMetricIcon = (metric: MetricType) => {
  switch (metric) {
    case MetricType.POPULARIDAD: return '👥';
    case MetricType.ECONOMIA: return '💰';
    case MetricType.SEGURIDAD: return '🛡️';
    case MetricType.RELACIONES_INTERNACIONALES: return '🌍';
    case MetricType.CORRUPCION: return '🤐';
    case MetricType.CONTROL_MEDIOS: return '📺';
    case MetricType.SALUD: return '🏥';
    case MetricType.TECNOLOGIA: return '💻';
    default: return '📊';
  }
};

const getMetricName = (metric: MetricType) => {
  switch (metric) {
    case MetricType.POPULARIDAD: return 'Popularidad';
    case MetricType.ECONOMIA: return 'Economía';
    case MetricType.SEGURIDAD: return 'Seguridad';
    case MetricType.RELACIONES_INTERNACIONALES: return 'Relaciones Internacionales';
    case MetricType.CORRUPCION: return 'Corrupción';
    case MetricType.CONTROL_MEDIOS: return 'Control de Medios';
    case MetricType.SALUD: return 'Salud';
    case MetricType.TECNOLOGIA: return 'Tecnología';
    default: return 'Desconocida';
  }
};

export const CharacterWeaknessesHUD: React.FC<CharacterWeaknessesHUDProps> = ({
  characterId,
  metrics,
  daysInPower,
  completedEvents,
  onMitigateWeakness
}) => {
  const [expandedWeakness, setExpandedWeakness] = useState<string | null>(null);
  const [showMitigationModal, setShowMitigationModal] = useState<string | null>(null);

  const allWeaknesses = getCharacterWeaknesses(characterId);
  const activeWeaknesses = allWeaknesses.filter(weakness =>
    shouldActivateWeakness(weakness, metrics, daysInPower, completedEvents)
  );

  if (activeWeaknesses.length === 0) {
    return null;
  }

  const handleMitigationClick = (weaknessId: string) => {
    setShowMitigationModal(weaknessId);
  };

  const handleMitigationConfirm = (weaknessId: string, mitigationId: string) => {
    onMitigateWeakness(weaknessId, mitigationId);
    setShowMitigationModal(null);
  };

  return (
    <div className="fixed top-4 right-4 z-40">
      {/* Botón de debilidades */}
      <div className="relative">
        <button
          onClick={() => setExpandedWeakness(expandedWeakness ? null : 'weaknesses')}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors flex items-center gap-2"
          aria-label="Ver debilidades del personaje"
        >
          <span className="text-lg">⚠️</span>
          <span className="font-semibold">Debilidades</span>
          <span className="bg-red-800 text-white text-xs px-2 py-1 rounded-full">
            {activeWeaknesses.length}
          </span>
        </button>

        {/* Panel de debilidades */}
        {expandedWeakness && (
          <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-red-200">
            <div className="p-4">
              <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center gap-2">
                <span>⚠️</span>
                Debilidades Activas
              </h3>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {activeWeaknesses.map(weakness => (
                  <div key={weakness.id} className="border border-red-200 rounded-lg p-3 bg-red-50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-red-900 text-sm">
                        {weakness.name}
                      </h4>
                      <button
                        onClick={() => setExpandedWeakness(expandedWeakness === weakness.id ? null : weakness.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        aria-label="Expandir detalles"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    <p className="text-red-700 text-xs mb-2">
                      {weakness.description}
                    </p>

                    {/* Efectos en métricas */}
                    <div className="mb-2">
                      <p className="text-xs font-medium text-red-800 mb-1">Efectos:</p>
                      <div className="flex flex-wrap gap-1">
                        {weakness.affectedMetrics.map(({ metric, modifier, description }) => (
                          <span
                            key={metric}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded text-xs"
                            title={description}
                          >
                            {getMetricIcon(metric)} {getMetricName(metric)} {modifier > 0 ? '+' : ''}{modifier}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Opciones de mitigación */}
                    {weakness.mitigationOptions && weakness.mitigationOptions.length > 0 && (
                      <div>
                        <button
                          onClick={() => handleMitigationClick(weakness.id)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded transition-colors"
                        >
                          Ver Opciones de Mitigación
                        </button>
                      </div>
                    )}

                    {/* Detalles expandidos */}
                    {expandedWeakness === weakness.id && (
                      <div className="mt-3 pt-3 border-t border-red-200">
                        <div className="text-xs text-red-700">
                          <p><strong>Condiciones de activación:</strong></p>
                          {weakness.triggerConditions?.timeThreshold && (
                            <p>• Se activa después de {weakness.triggerConditions.timeThreshold} días en el poder</p>
                          )}
                          {weakness.triggerConditions?.metricThreshold && (
                            <p>• Se activa cuando {getMetricName(weakness.triggerConditions.metricThreshold.metric)} está {weakness.triggerConditions.metricThreshold.operator === 'below' ? 'por debajo' : 'por encima'} de {weakness.triggerConditions.metricThreshold.value}</p>
                          )}
                          {weakness.triggerConditions?.eventTrigger && (
                            <p>• Se activa después del evento: {weakness.triggerConditions.eventTrigger}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de mitigación */}
      {showMitigationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Opciones de Mitigación
              </h3>

              {(() => {
                const weakness = activeWeaknesses.find(w => w.id === showMitigationModal);
                if (!weakness?.mitigationOptions) return null;

                return (
                  <div className="space-y-3">
                    {weakness.mitigationOptions.map(option => (
                      <div key={option.id} className="border border-gray-200 rounded-lg p-3">
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">
                          {option.name}
                        </h4>
                        <p className="text-gray-600 text-xs mb-3">
                          {option.description}
                        </p>

                        <div className="space-y-2">
                          {Object.entries(option.cost).length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-red-700 mb-1">Costo:</p>
                              <div className="flex flex-wrap gap-1">
                                {Object.entries(option.cost).map(([metric, value]) => (
                                  <span key={metric} className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                                    {getMetricIcon(metric as MetricType)} {getMetricName(metric as MetricType)} -{value}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {Object.entries(option.effect).length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-green-700 mb-1">Beneficio:</p>
                              <div className="flex flex-wrap gap-1">
                                {Object.entries(option.effect).map(([metric, value]) => (
                                  <span key={metric} className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                    {getMetricIcon(metric as MetricType)} {getMetricName(metric as MetricType)} {value > 0 ? '+' : ''}{value}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => handleMitigationConfirm(weakness.id, option.id)}
                          className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition-colors"
                        >
                          Aplicar Mitigación
                        </button>
                      </div>
                    ))}
                  </div>
                );
              })()}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowMitigationModal(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
