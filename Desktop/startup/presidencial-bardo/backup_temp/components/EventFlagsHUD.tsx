import { EventChain, FlagType, GameFlag } from '@/types/eventFlags';
import React, { useState } from 'react';

interface EventFlagsHUDProps {
  activeFlags: GameFlag[];
  activeEventChains: EventChain[];
  onFlagClick?: (flag: GameFlag) => void;
  onChainClick?: (chain: EventChain) => void;
}

const getFlagTypeIcon = (type: FlagType) => {
  switch (type) {
    case FlagType.DECISION: return '🎯';
    case FlagType.EVENT: return '📅';
    case FlagType.METRIC: return '📊';
    case FlagType.TIME: return '⏰';
    case FlagType.FACTION: return '👥';
    case FlagType.PROVINCE: return '🏛️';
    case FlagType.ACHIEVEMENT: return '🏆';
    case FlagType.CRISIS: return '🚨';
    default: return '🏷️';
  }
};

const getFlagTypeColor = (type: FlagType) => {
  switch (type) {
    case FlagType.DECISION: return 'bg-blue-100 text-blue-800 border-blue-200';
    case FlagType.EVENT: return 'bg-green-100 text-green-800 border-green-200';
    case FlagType.METRIC: return 'bg-purple-100 text-purple-800 border-purple-200';
    case FlagType.TIME: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case FlagType.FACTION: return 'bg-orange-100 text-orange-800 border-orange-200';
    case FlagType.PROVINCE: return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case FlagType.ACHIEVEMENT: return 'bg-pink-100 text-pink-800 border-pink-200';
    case FlagType.CRISIS: return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getChainProgressColor = (progress: number) => {
  if (progress >= 80) return 'bg-green-500';
  if (progress >= 60) return 'bg-yellow-500';
  if (progress >= 40) return 'bg-orange-500';
  return 'bg-red-500';
};

export const EventFlagsHUD: React.FC<EventFlagsHUDProps> = ({
  activeFlags,
  activeEventChains,
  onFlagClick,
  onChainClick
}) => {
  const [expandedSection, setExpandedSection] = useState<'flags' | 'chains' | 'overview' | null>(null);
  const [selectedFlag, setSelectedFlag] = useState<GameFlag | null>(null);

  const hasActiveFlags = activeFlags.length > 0;
  const hasActiveChains = activeEventChains.length > 0;

  if (!hasActiveFlags && !hasActiveChains) {
    return null;
  }

  const handleFlagClick = (flag: GameFlag) => {
    setSelectedFlag(selectedFlag?.id === flag.id ? null : flag);
    onFlagClick?.(flag);
  };

  const handleChainClick = (chain: EventChain) => {
    onChainClick?.(chain);
  };

  return (
    <div className="fixed top-4 left-4 z-40">
      {/* Botón principal */}
      <div className="relative">
        <button
          onClick={() => setExpandedSection(expandedSection ? null : 'overview')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors flex items-center gap-2"
          aria-label="Ver banderas y cadenas de eventos"
        >
          <span className="text-lg">🏷️</span>
          <span className="font-semibold">Banderas</span>
          <span className="bg-purple-800 text-white text-xs px-2 py-1 rounded-full">
            {activeFlags.length + activeEventChains.length}
          </span>
        </button>

        {/* Panel principal */}
        {expandedSection && (
          <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-purple-200 max-h-[80vh] overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center gap-2">
                <span>🏷️</span>
                Sistema de Banderas
              </h3>

              {/* Banderas activas */}
              {hasActiveFlags && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">Banderas Activas</h4>
                    <button
                      onClick={() => setExpandedSection(expandedSection === 'flags' ? null : 'flags')}
                      className="text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {activeFlags.slice(0, expandedSection === 'flags' ? undefined : 3).map(flag => (
                      <div
                        key={flag.id}
                        className="border border-purple-200 rounded-lg p-2 cursor-pointer hover:bg-purple-50 transition-colors"
                        onClick={() => handleFlagClick(flag)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{getFlagTypeIcon(flag.type)}</span>
                          <span className="text-xs font-medium text-gray-900 flex-1">
                            {flag.name}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getFlagTypeColor(flag.type)}`}>
                            {flag.type}
                          </span>
                        </div>

                        {expandedSection === 'flags' && (
                          <p className="text-xs text-gray-600 mt-1">
                            {flag.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {activeFlags.length > 3 && expandedSection !== 'flags' && (
                    <button
                      onClick={() => setExpandedSection('flags')}
                      className="text-xs text-purple-600 hover:text-purple-800 mt-2"
                    >
                      Ver todas las banderas ({activeFlags.length})
                    </button>
                  )}
                </div>
              )}

              {/* Cadenas de eventos activas */}
              {hasActiveChains && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">Cadenas de Eventos</h4>
                    <button
                      onClick={() => setExpandedSection(expandedSection === 'chains' ? null : 'chains')}
                      className="text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {activeEventChains.slice(0, expandedSection === 'chains' ? undefined : 2).map(chain => {
                      const progress = (chain.currentStep / chain.events.length) * 100;
                      return (
                        <div
                          key={chain.id}
                          className="border border-purple-200 rounded-lg p-2 cursor-pointer hover:bg-purple-50 transition-colors"
                          onClick={() => handleChainClick(chain)}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm">🔗</span>
                            <span className="text-xs font-medium text-gray-900 flex-1">
                              {chain.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {chain.currentStep + 1}/{chain.events.length}
                            </span>
                          </div>

                          {/* Barra de progreso */}
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                            <div
                              className={`h-1.5 rounded-full ${getChainProgressColor(progress)}`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>

                          {expandedSection === 'chains' && (
                            <div className="text-xs text-gray-600">
                              <p className="mb-1">{chain.description}</p>
                              <p className="text-purple-600">
                                Próximo evento: {chain.events[chain.currentStep]}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {activeEventChains.length > 2 && expandedSection !== 'chains' && (
                    <button
                      onClick={() => setExpandedSection('chains')}
                      className="text-xs text-purple-600 hover:text-purple-800 mt-2"
                    >
                      Ver todas las cadenas ({activeEventChains.length})
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal de detalles de bandera */}
      {selectedFlag && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{getFlagTypeIcon(selectedFlag.type)}</span>
                <h3 className="text-lg font-bold text-gray-900">
                  {selectedFlag.name}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getFlagTypeColor(selectedFlag.type)}`}>
                  {selectedFlag.type}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                {selectedFlag.description}
              </p>

              <div className="space-y-3">
                {selectedFlag.effects && selectedFlag.effects.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Efectos:</p>
                    <div className="space-y-1">
                      {selectedFlag.effects.map((effect, index) => (
                        <div key={index} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                          <span className="font-medium">{effect.type}:</span>
                          <pre className="mt-1 text-xs">
                            {JSON.stringify(effect.data, null, 2)}
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedFlag.metadata && Object.keys(selectedFlag.metadata).length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Metadatos:</p>
                    <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                      <pre className="text-xs">
                        {JSON.stringify(selectedFlag.metadata, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  Activada: {new Date(selectedFlag.timestamp).toLocaleString()}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedFlag(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
