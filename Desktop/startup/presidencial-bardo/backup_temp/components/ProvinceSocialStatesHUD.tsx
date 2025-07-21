import { ProvinceId } from '@/types/political';
import { ProvinceSocialState, SocialEvent, SocialEventType, SocialState } from '@/types/provinceStates';
import React, { useState } from 'react';

interface ProvinceSocialStatesHUDProps {
  provinceStates: Record<ProvinceId, ProvinceSocialState>;
  onResolveSocialEvent: (provinceId: ProvinceId, eventId: string, resolutionId: string) => void;
}

const getSocialStateColor = (state: SocialState) => {
  switch (state) {
    case SocialState.CALM: return 'bg-green-100 text-green-800 border-green-200';
    case SocialState.TENSE: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case SocialState.AGITATED: return 'bg-orange-100 text-orange-800 border-orange-200';
    case SocialState.REBELLIOUS: return 'bg-red-100 text-red-800 border-red-200';
    case SocialState.REVOLUTIONARY: return 'bg-purple-100 text-purple-800 border-purple-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getSocialStateIcon = (state: SocialState) => {
  switch (state) {
    case SocialState.CALM: return '😌';
    case SocialState.TENSE: return '😐';
    case SocialState.AGITATED: return '😤';
    case SocialState.REBELLIOUS: return '😠';
    case SocialState.REVOLUTIONARY: return '🤬';
    default: return '😐';
  }
};

const getSocialEventIcon = (type: SocialEventType) => {
  switch (type) {
    case SocialEventType.PROTEST: return '📢';
    case SocialEventType.STRIKE: return '🚫';
    case SocialEventType.RIOT: return '🔥';
    case SocialEventType.BLOCKADE: return '🚧';
    case SocialEventType.OCCUPATION: return '🏢';
    case SocialEventType.REBELLION: return '⚔️';
    case SocialEventType.SECESSION: return '🏴';
    default: return '📋';
  }
};

const getProvinceName = (provinceId: ProvinceId) => {
  const names: Record<ProvinceId, string> = {
    [ProvinceId.BUENOS_AIRES]: 'Buenos Aires',
    [ProvinceId.CABA]: 'CABA',
    [ProvinceId.CATAMARCA]: 'Catamarca',
    [ProvinceId.CHACO]: 'Chaco',
    [ProvinceId.CHUBUT]: 'Chubut',
    [ProvinceId.CORDOBA]: 'Córdoba',
    [ProvinceId.CORRIENTES]: 'Corrientes',
    [ProvinceId.ENTRE_RIOS]: 'Entre Ríos',
    [ProvinceId.FORMOSA]: 'Formosa',
    [ProvinceId.JUJUY]: 'Jujuy',
    [ProvinceId.LA_PAMPA]: 'La Pampa',
    [ProvinceId.LA_RIOJA]: 'La Rioja',
    [ProvinceId.MENDOZA]: 'Mendoza',
    [ProvinceId.MISIONES]: 'Misiones',
    [ProvinceId.NEUQUEN]: 'Neuquén',
    [ProvinceId.RIO_NEGRO]: 'Río Negro',
    [ProvinceId.SALTA]: 'Salta',
    [ProvinceId.SAN_JUAN]: 'San Juan',
    [ProvinceId.SAN_LUIS]: 'San Luis',
    [ProvinceId.SANTA_CRUZ]: 'Santa Cruz',
    [ProvinceId.SANTA_FE]: 'Santa Fe',
    [ProvinceId.SANTIAGO_DEL_ESTERO]: 'Santiago del Estero',
    [ProvinceId.TIERRA_DEL_FUEGO]: 'Tierra del Fuego',
    [ProvinceId.TUCUMAN]: 'Tucumán',
  };
  return names[provinceId] || provinceId;
};

export const ProvinceSocialStatesHUD: React.FC<ProvinceSocialStatesHUDProps> = ({
  provinceStates,
  onResolveSocialEvent
}) => {
  const [expandedProvince, setExpandedProvince] = useState<ProvinceId | 'overview' | null>(null);
  const [showEventModal, setShowEventModal] = useState<{ provinceId: ProvinceId; event: SocialEvent } | null>(null);

  const provincesWithIssues = Object.entries(provinceStates).filter(([_, state]) =>
    state.currentState !== SocialState.CALM || state.activeEvents.length > 0
  );

  const handleEventResolution = (provinceId: ProvinceId, eventId: string, resolutionId: string) => {
    onResolveSocialEvent(provinceId, eventId, resolutionId);
    setShowEventModal(null);
  };

  if (provincesWithIssues.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-40">
      {/* Botón principal */}
      <div className="relative">
        <button
          onClick={() => setExpandedProvince(expandedProvince ? null : 'overview')}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors flex items-center gap-2"
          aria-label="Ver estados sociales de provincias"
        >
          <span className="text-lg">🏛️</span>
          <span className="font-semibold">Provincias</span>
          <span className="bg-orange-800 text-white text-xs px-2 py-1 rounded-full">
            {provincesWithIssues.length}
          </span>
        </button>

        {/* Panel de provincias */}
        {expandedProvince && (
          <div className="absolute bottom-full left-0 mb-2 w-96 bg-white rounded-lg shadow-xl border border-orange-200 max-h-[80vh] overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-bold text-orange-800 mb-3 flex items-center gap-2">
                <span>🏛️</span>
                Estados Sociales
              </h3>

              <div className="space-y-3">
                {provincesWithIssues.map(([provinceId, state]) => (
                  <div key={provinceId} className="border border-orange-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {getProvinceName(provinceId as ProvinceId)}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSocialStateColor(state.currentState)}`}>
                          {getSocialStateIcon(state.currentState)} {state.currentState}
                        </span>
                      </div>
                      <button
                        onClick={() => setExpandedProvince(expandedProvince === provinceId ? null : provinceId as ProvinceId)}
                        className="text-orange-600 hover:text-orange-800 transition-colors"
                        aria-label="Expandir detalles"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    {/* Métricas básicas */}
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="text-xs">
                        <span className="text-gray-600">Lealtad:</span>
                        <span className={`ml-1 font-medium ${state.loyalty < 30 ? 'text-red-600' : state.loyalty < 60 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {state.loyalty}%
                        </span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-600">Descontento:</span>
                        <span className={`ml-1 font-medium ${state.discontent > 70 ? 'text-red-600' : state.discontent > 40 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {state.discontent}%
                        </span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-600">Rebelión:</span>
                        <span className={`ml-1 font-medium ${state.rebellionLevel > 70 ? 'text-red-600' : state.rebellionLevel > 40 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {state.rebellionLevel}%
                        </span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-600">Impacto Econ.:</span>
                        <span className={`ml-1 font-medium ${state.economicImpact < -20 ? 'text-red-600' : state.economicImpact > 20 ? 'text-green-600' : 'text-yellow-600'}`}>
                          {state.economicImpact > 0 ? '+' : ''}{state.economicImpact}%
                        </span>
                      </div>
                    </div>

                    {/* Eventos activos */}
                    {state.activeEvents.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs font-medium text-orange-800 mb-1">Eventos Activos:</p>
                        <div className="space-y-1">
                          {state.activeEvents.map(event => (
                            <div key={event.id} className="flex items-center justify-between bg-orange-50 rounded p-2">
                              <div className="flex items-center gap-1">
                                <span>{getSocialEventIcon(event.type)}</span>
                                <span className="text-xs text-orange-900">{event.title}</span>
                              </div>
                              <button
                                onClick={() => setShowEventModal({ provinceId: provinceId as ProvinceId, event })}
                                className="text-xs bg-orange-600 hover:bg-orange-700 text-white px-2 py-1 rounded transition-colors"
                              >
                                Resolver
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Detalles expandidos */}
                    {expandedProvince === provinceId && (
                      <div className="mt-3 pt-3 border-t border-orange-200">
                        <div className="text-xs text-gray-700 space-y-1">
                          <p><strong>Último evento importante:</strong></p>
                          {state.lastMajorEvent ? (
                            <p>• {getSocialEventIcon(state.lastMajorEvent.type)} {state.lastMajorEvent.type} - {state.lastMajorEvent.resolved ? 'Resuelto' : 'Pendiente'}</p>
                          ) : (
                            <p>• Ninguno registrado</p>
                          )}

                          <p><strong>Historial de estados:</strong></p>
                          {state.socialHistory.slice(-3).map((entry, index) => (
                            <p key={index}>• {getSocialStateIcon(entry.state)} {entry.state} - {new Date(entry.timestamp).toLocaleDateString()}</p>
                          ))}
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

      {/* Modal de resolución de eventos */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {getSocialEventIcon(showEventModal.event.type)} {showEventModal.event.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                {showEventModal.event.description}
              </p>

              <div className="mb-4">
                <p className="text-xs font-medium text-gray-700 mb-2">Efectos actuales:</p>
                <div className="text-xs text-gray-600">
                  {Object.entries(showEventModal.event.effects.nationalMetrics).map(([metric, value]) => (
                    <p key={metric}>• {metric}: {value > 0 ? '+' : ''}{value}</p>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-900">Opciones de resolución:</p>
                {showEventModal.event.resolutionOptions.map(option => (
                  <div key={option.id} className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      {option.name}
                    </h4>
                    <p className="text-gray-600 text-xs mb-3">
                      {option.description}
                    </p>

                    <div className="space-y-2">
                      {Object.entries(option.effects.nationalMetrics).length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-gray-700 mb-1">Efectos nacionales:</p>
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(option.effects.nationalMetrics).map(([metric, value]) => (
                              <span key={metric} className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                                value > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {metric} {value > 0 ? '+' : ''}{value}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleEventResolution(showEventModal.provinceId, showEventModal.event.id, option.id)}
                      className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition-colors"
                    >
                      Aplicar Resolución
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowEventModal(null)}
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
