'use client';

import { DNU, DNUManager as DNUManagerClass, DNUStatus, DNUType, DNUUrgency } from '@/types/dnuSystem';
import { MetricType } from '@/types/political';
import React, { useState } from 'react';

interface DNUManagerProps {
  currentMetrics: Record<MetricType, number>;
  crisisLevel: number;
  onEmitDNU: (dnu: DNU) => void;
  onRevokeDNU: (dnuId: string) => void;
  onRespondToDNU: (dnuId: string, responseId: string) => void;
  activeDNUs: DNU[];
  dnuHistory: DNU[];
}

const DNUManager: React.FC<DNUManagerProps> = ({
  currentMetrics,
  crisisLevel,
  onEmitDNU,
  onRevokeDNU,
  onRespondToDNU,
  activeDNUs,
  dnuHistory
}) => {
  const [selectedTab, setSelectedTab] = useState<'available' | 'active' | 'history'>('available');
  const [selectedDNU, setSelectedDNU] = useState<DNU | null>(null);
  const [showEmitModal, setShowEmitModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [dnuManager] = useState(() => new DNUManagerClass());

  const availableDNUs = dnuManager.getAvailableDNUs(currentMetrics, crisisLevel);

  const getDNUTypeColor = (type: DNUType): string => {
    const colors = {
      [DNUType.ECONOMICO]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      [DNUType.SOCIAL]: 'bg-blue-100 text-blue-800 border-blue-300',
      [DNUType.SEGURIDAD]: 'bg-red-100 text-red-800 border-red-300',
      [DNUType.SALUD]: 'bg-green-100 text-green-800 border-green-300',
      [DNUType.TECNOLOGIA]: 'bg-purple-100 text-purple-800 border-purple-300',
      [DNUType.INTERNACIONAL]: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      [DNUType.EMERGENCIA]: 'bg-orange-100 text-orange-800 border-orange-300'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getUrgencyColor = (urgency: DNUUrgency): string => {
    const colors = {
      [DNUUrgency.BAJA]: 'bg-green-500',
      [DNUUrgency.MEDIA]: 'bg-yellow-500',
      [DNUUrgency.ALTA]: 'bg-orange-500',
      [DNUUrgency.CRITICA]: 'bg-red-500'
    };
    return colors[urgency] || 'bg-gray-500';
  };

  const getStatusColor = (status: DNUStatus): string => {
    const colors = {
      [DNUStatus.ACTIVO]: 'bg-green-100 text-green-800',
      [DNUStatus.SUSPENDIDO]: 'bg-yellow-100 text-yellow-800',
      [DNUStatus.REVOCADO]: 'bg-red-100 text-red-800',
      [DNUStatus.EXPIRADO]: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleEmitDNU = (dnuId: string) => {
    const dnu = dnuManager.emitDNU(dnuId, currentMetrics);
    if (dnu) {
      onEmitDNU(dnu);
      setShowEmitModal(false);
    }
  };

  const handleRevokeDNU = (dnuId: string) => {
    if (confirm('¿Estás seguro de que quieres revocar este DNU? Esto tendrá consecuencias políticas.')) {
      onRevokeDNU(dnuId);
    }
  };

  const handleRespondToDNU = (dnuId: string, responseId: string) => {
    onRespondToDNU(dnuId, responseId);
    setShowResponseModal(false);
    setSelectedDNU(null);
  };

  const formatDuration = (duration: number): string => {
    if (duration === 1) return '1 día';
    if (duration < 30) return `${duration} días`;
    if (duration < 365) return `${Math.floor(duration / 30)} meses`;
    return `${Math.floor(duration / 365)} años`;
  };

  const formatTimeRemaining = (expiresAt: number): string => {
    const now = Date.now();
    const remaining = expiresAt - now;
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h`;
    return 'Expira pronto';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🏛️ Gestor de Decretos de Necesidad y Urgencia</h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">DNUs Activos:</span> {activeDNUs.length}
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold">Nivel de Crisis:</span> {crisisLevel}/5
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setSelectedTab('available')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            selectedTab === 'available'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          📋 Disponibles ({availableDNUs.length})
        </button>
        <button
          onClick={() => setSelectedTab('active')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            selectedTab === 'active'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          ⚡ Activos ({activeDNUs.length})
        </button>
        <button
          onClick={() => setSelectedTab('history')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            selectedTab === 'history'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          📚 Historial ({dnuHistory.length})
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {selectedTab === 'available' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableDNUs.map((dnu) => (
              <div
                key={dnu.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedDNU(dnu);
                  setShowEmitModal(true);
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 text-sm">{dnu.title}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDNUTypeColor(dnu.type)}`}>
                    {dnu.type}
                  </div>
                </div>

                <p className="text-gray-600 text-xs mb-3 line-clamp-3">{dnu.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getUrgencyColor(dnu.urgency)}`}></div>
                    <span>{dnu.urgency}</span>
                  </div>
                  <span>{formatDuration(dnu.duration)}</span>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-xs">
                    <span className="text-red-600">💔 -{dnu.costs.politicalCost} popularidad</span>
                    <span className="text-yellow-600">💰 -{dnu.costs.economicCost} economía</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'active' && (
          <div className="space-y-4">
            {activeDNUs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📋</div>
                <p>No hay DNUs activos</p>
              </div>
            ) : (
              activeDNUs.map((dnu) => (
                <div key={dnu.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">{dnu.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{dnu.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDNUTypeColor(dnu.type)}`}>
                        {dnu.type}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dnu.status)}`}>
                        {dnu.status}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600">
                        {formatTimeRemaining(dnu.expiresAt)}
                      </div>
                      <div className="text-xs text-gray-500">Tiempo restante</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-red-600">
                        {dnu.costs.legalRisk}%
                      </div>
                      <div className="text-xs text-gray-500">Riesgo legal</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">
                        {Object.values(dnu.effects.nationalMetrics).reduce((sum, val) => sum + (val || 0), 0)}
                      </div>
                      <div className="text-xs text-gray-500">Impacto total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-purple-600">
                        {dnu.effects.factionEffects.length}
                      </div>
                      <div className="text-xs text-gray-500">Facciones afectadas</div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedDNU(dnu);
                        setShowResponseModal(true);
                      }}
                      className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                    >
                      Responder
                    </button>
                    <button
                      onClick={() => handleRevokeDNU(dnu.id)}
                      className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                    >
                      Revocar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {selectedTab === 'history' && (
          <div className="space-y-4">
            {dnuHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📚</div>
                <p>No hay historial de DNUs</p>
              </div>
            ) : (
              dnuHistory.map((dnu) => (
                <div key={dnu.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{dnu.title}</h3>
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDNUTypeColor(dnu.type)}`}>
                        {dnu.type}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dnu.status)}`}>
                        {dnu.status}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{dnu.description}</p>
                  <div className="text-xs text-gray-500">
                    Emitido: {new Date(dnu.createdAt).toLocaleDateString()}
                    {dnu.status !== DNUStatus.ACTIVO && (
                      <span className="ml-4">
                        {dnu.status === DNUStatus.EXPIRADO ? 'Expirado' : 'Finalizado'}: {new Date(dnu.expiresAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Emit DNU Modal */}
      {showEmitModal && selectedDNU && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Emitir DNU</h3>
              <button
                onClick={() => setShowEmitModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">{selectedDNU.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{selectedDNU.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">Efectos Nacionales:</h5>
                  <div className="space-y-1">
                    {Object.entries(selectedDNU.effects.nationalMetrics).map(([metric, value]) => (
                      <div key={metric} className="flex justify-between text-sm">
                        <span className="text-gray-600">{metric}:</span>
                        <span className={value > 0 ? 'text-green-600' : 'text-red-600'}>
                          {value > 0 ? '+' : ''}{value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">Efectos en Facciones:</h5>
                  <div className="space-y-1">
                    {selectedDNU.effects.factionEffects.map((effect, index) => (
                      <div key={index} className="text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{effect.factionId}:</span>
                          <span className={effect.supportChange > 0 ? 'text-green-600' : 'text-red-600'}>
                            {effect.supportChange > 0 ? '+' : ''}{effect.supportChange}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">{effect.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h5 className="font-semibold text-gray-700 mb-2">Costos:</h5>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-red-600 font-semibold">-{selectedDNU.costs.politicalCost}</div>
                    <div className="text-gray-500">Popularidad</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-600 font-semibold">-{selectedDNU.costs.economicCost}</div>
                    <div className="text-gray-500">Economía</div>
                  </div>
                  <div className="text-center">
                    <div className="text-orange-600 font-semibold">{selectedDNU.costs.legalRisk}%</div>
                    <div className="text-gray-500">Riesgo Legal</div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => handleEmitDNU(selectedDNU.id)}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                  Emitir DNU
                </button>
                <button
                  onClick={() => setShowEmitModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Response Modal */}
      {showResponseModal && selectedDNU && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Responder a DNU</h3>
              <button
                onClick={() => setShowResponseModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">{selectedDNU.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{selectedDNU.description}</p>
              </div>

              <div className="space-y-3">
                <h5 className="font-semibold text-gray-700">Opciones de respuesta:</h5>
                {selectedDNU.responseOptions.map((option) => (
                  <div
                    key={option.id}
                    className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRespondToDNU(selectedDNU.id, option.id)}
                  >
                    <h6 className="font-semibold text-gray-800 mb-1">{option.name}</h6>
                    <p className="text-gray-600 text-sm mb-2">{option.description}</p>
                    <div className="text-xs text-gray-500">
                      {Object.entries(option.effects.nationalMetrics).map(([metric, value]) => (
                        <span key={metric} className="mr-3">
                          {metric}: {value > 0 ? '+' : ''}{value}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setShowResponseModal(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
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

export default DNUManager;
