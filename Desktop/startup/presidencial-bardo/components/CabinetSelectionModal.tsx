import { MetricType } from '@/types/political';
import React, { useState } from 'react';

interface Minister {
  id: string;
  name: string;
  position: string;
  description: string;
  ideology: 'populista' | 'liberal' | 'conservadora' | 'progresista' | 'anarquista';
  strengths: MetricType[];
  weaknesses: MetricType[];
  image?: string;
}

interface CabinetSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedMinisters: Record<string, Minister>) => void;
}

const AVAILABLE_MINISTERS: Minister[] = [
  {
    id: 'economia_1',
    name: 'Dr. Carlos "El Contador" González',
    position: 'Ministro de Economía',
    description: 'Ex CEO de una empresa de contabilidad creativa. Especialista en hacer que los números canten.',
    ideology: 'liberal',
    strengths: [MetricType.ECONOMIA, MetricType.RELACIONES_INTERNACIONALES],
    weaknesses: [MetricType.POPULARIDAD, MetricType.CORRUPCION],
  },
  {
    id: 'economia_2',
    name: 'Prof. María "La Keynesiana" Rodríguez',
    position: 'Ministra de Economía',
    description: 'Doctora en economía heterodoxa. Cree que imprimir billetes es la solución a todo.',
    ideology: 'populista',
    strengths: [MetricType.POPULARIDAD, MetricType.SALUD],
    weaknesses: [MetricType.ECONOMIA, MetricType.RELACIONES_INTERNACIONALES],
  },
  {
    id: 'seguridad_1',
    name: 'Gral. Juan "El Duro" Martínez',
    position: 'Ministro de Seguridad',
    description: 'Ex militar con experiencia en "pacificación" de conflictos sociales.',
    ideology: 'conservadora',
    strengths: [MetricType.SEGURIDAD, MetricType.CORRUPCION],
    weaknesses: [MetricType.POPULARIDAD, MetricType.RELACIONES_INTERNACIONALES],
  },
  {
    id: 'seguridad_2',
    name: 'Lic. Ana "La Progre" Fernández',
    position: 'Ministra de Seguridad',
    description: 'Activista de derechos humanos. Cree en la seguridad comunitaria y el diálogo.',
    ideology: 'progresista',
    strengths: [MetricType.POPULARIDAD, MetricType.RELACIONES_INTERNACIONALES],
    weaknesses: [MetricType.SEGURIDAD, MetricType.CORRUPCION],
  },
  {
    id: 'salud_1',
    name: 'Dr. Roberto "El Cirujano" López',
    position: 'Ministro de Salud',
    description: 'Cirujano cardiovascular. Especialista en operaciones de emergencia y parches temporales.',
    ideology: 'conservadora',
    strengths: [MetricType.SALUD, MetricType.TECNOLOGIA],
    weaknesses: [MetricType.ECONOMIA, MetricType.POPULARIDAD],
  },
  {
    id: 'salud_2',
    name: 'Dra. Laura "La Comunitaria" Silva',
    position: 'Ministra de Salud',
    description: 'Médica comunitaria. Experta en medicina preventiva y atención primaria.',
    ideology: 'progresista',
    strengths: [MetricType.SALUD, MetricType.POPULARIDAD],
    weaknesses: [MetricType.TECNOLOGIA, MetricType.ECONOMIA],
  },
  {
    id: 'tecnologia_1',
    name: 'Ing. Pablo "El Hacker" Torres',
    position: 'Ministro de Tecnología',
    description: 'Ex programador de Silicon Valley. Quiere hacer de Argentina la próxima startup nation.',
    ideology: 'liberal',
    strengths: [MetricType.TECNOLOGIA, MetricType.ECONOMIA],
    weaknesses: [MetricType.POPULARIDAD, MetricType.SALUD],
  },
  {
    id: 'tecnologia_2',
    name: 'Lic. Carmen "La Digital" Morales',
    position: 'Ministra de Tecnología',
    description: 'Especialista en inclusión digital. Cree que la tecnología debe servir al pueblo.',
    ideology: 'populista',
    strengths: [MetricType.TECNOLOGIA, MetricType.POPULARIDAD],
    weaknesses: [MetricType.ECONOMIA, MetricType.RELACIONES_INTERNACIONALES],
  },
];

const POSITIONS = [
  'Ministro de Economía',
  'Ministro de Seguridad',
  'Ministro de Salud',
  'Ministro de Tecnología'
];

const getIdeologyColor = (ideology: Minister['ideology']) => {
  switch (ideology) {
    case 'populista': return 'bg-red-100 text-red-800 border-red-200';
    case 'liberal': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'conservadora': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'progresista': return 'bg-green-100 text-green-800 border-green-200';
    case 'anarquista': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

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

export const CabinetSelectionModal: React.FC<CabinetSelectionModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  const [selectedMinisters, setSelectedMinisters] = useState<Record<string, Minister>>({});

  const handleMinisterSelect = (position: string, minister: Minister) => {
    setSelectedMinisters(prev => ({
      ...prev,
      [position]: minister
    }));
  };

  const handleConfirm = () => {
    if (Object.keys(selectedMinisters).length === POSITIONS.length) {
      onConfirm(selectedMinisters);
      onClose();
    }
  };

  const isPositionFilled = (position: string) => selectedMinisters[position];

  const getAvailableMinistersForPosition = (position: string) => {
    return AVAILABLE_MINISTERS.filter(minister => minister.position === position);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              🏛️ Selección de Gabinete
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Selecciona tu gabinete ministerial. Cada ministro tiene fortalezas y debilidades que afectarán tus métricas.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid gap-6">
            {POSITIONS.map(position => (
              <div key={position} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {position}
                </h3>

                {isPositionFilled(position) ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-green-900">
                          {selectedMinisters[position].name}
                        </h4>
                        <p className="text-green-700 text-sm mt-1">
                          {selectedMinisters[position].description}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getIdeologyColor(selectedMinisters[position].ideology)}`}>
                            {selectedMinisters[position].ideology}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedMinisters(prev => {
                          const newState = { ...prev };
                          delete newState[position];
                          return newState;
                        })}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        aria-label="Cambiar ministro"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getAvailableMinistersForPosition(position).map(minister => (
                      <div
                        key={minister.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                        onClick={() => handleMinisterSelect(position, minister)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleMinisterSelect(position, minister);
                          }
                        }}
                        aria-label={`Seleccionar ${minister.name} como ${minister.position}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900 text-sm">
                            {minister.name}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getIdeologyColor(minister.ideology)}`}>
                            {minister.ideology}
                          </span>
                        </div>

                        <p className="text-gray-600 text-xs mb-3">
                          {minister.description}
                        </p>

                        <div className="space-y-2">
                          <div>
                            <p className="text-xs font-medium text-green-700 mb-1">Fortalezas:</p>
                            <div className="flex flex-wrap gap-1">
                              {minister.strengths.map(metric => (
                                <span key={metric} className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                  {getMetricIcon(metric)} {getMetricName(metric)}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-medium text-red-700 mb-1">Debilidades:</p>
                            <div className="flex flex-wrap gap-1">
                              {minister.weaknesses.map(metric => (
                                <span key={metric} className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                                  {getMetricIcon(metric)} {getMetricName(metric)}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {Object.keys(selectedMinisters).length} de {POSITIONS.length} posiciones cubiertas
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                disabled={Object.keys(selectedMinisters).length !== POSITIONS.length}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Confirmar Gabinete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
