/**
 * PRESIDENCIAL BARDO - HUD de Misiones
 * Muestra misiones activas con facción, provincia y objetivos
 */

'use client';

import { Mission } from '@/data/missions';
import { GameState } from '@/types/game';
import { FactionId, ProvinceId } from '@/types/political';
import React from 'react';

interface MissionHUDProps {
  gameState: GameState;
  onPlayMission: (missionId: string) => void;
  onMissionChoice: (missionId: string, choiceId: string) => void;
}

const FACTION_COLORS: Record<FactionId, string> = {
  [FactionId.BARRAS_BRAVAS]: 'bg-red-600',
  [FactionId.SINDICALISTAS]: 'bg-yellow-600',
  [FactionId.EMPRESARIOS]: 'bg-blue-600',
  [FactionId.LA_CAMPORA]: 'bg-purple-600',
  [FactionId.MILITARES]: 'bg-green-600',
  [FactionId.ALIENS]: 'bg-cyan-600',
  [FactionId.OPOSICION]: 'bg-orange-600',
  [FactionId.TACHEROS]: 'bg-gray-600',
};

const FACTION_NAMES: Record<FactionId, string> = {
  [FactionId.BARRAS_BRAVAS]: 'Barras Bravas',
  [FactionId.SINDICALISTAS]: 'Sindicalistas',
  [FactionId.EMPRESARIOS]: 'Empresarios',
  [FactionId.LA_CAMPORA]: 'La Cámpora',
  [FactionId.MILITARES]: 'Militares',
  [FactionId.ALIENS]: 'Aliens',
  [FactionId.OPOSICION]: 'Oposición',
  [FactionId.TACHEROS]: 'Tacheros',
};

const PROVINCE_NAMES: Record<ProvinceId, string> = {
  [ProvinceId.BUENOS_AIRES]: 'Buenos Aires',
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
  [ProvinceId.CABA]: 'CABA',
};

const MISSION_TYPE_ICONS: Record<Mission['type'], string> = {
  combate: '⚔️',
  negociacion: '🤝',
  diplomatica: '🎭',
  espionaje: '🕵️',
};

const MISSION_TYPE_NAMES: Record<Mission['type'], string> = {
  combate: 'Combate',
  negociacion: 'Negociación',
  diplomatica: 'Diplomática',
  espionaje: 'Espionaje',
};

export const MissionHUD: React.FC<MissionHUDProps> = ({
  gameState,
  onPlayMission,
  onMissionChoice,
}) => {
  const activeMissions = gameState.activeMissions || [];

  if (activeMissions.length === 0) {
    return (
      <div className="fixed top-4 right-4 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-4 max-w-md">
        <h3 className="text-lg font-bold text-white mb-2">📋 Misiones</h3>
        <p className="text-gray-400 text-sm">No hay misiones disponibles</p>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-4 max-w-md max-h-96 overflow-y-auto">
      <h3 className="text-lg font-bold text-white mb-3">📋 Misiones Activas ({activeMissions.length})</h3>

      <div className="space-y-3">
        {activeMissions.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            onPlay={() => onPlayMission(mission.id)}
            onChoice={(choiceId) => onMissionChoice(mission.id, choiceId)}
          />
        ))}
      </div>
    </div>
  );
};

interface MissionCardProps {
  mission: Mission;
  onPlay: () => void;
  onChoice: (choiceId: string) => void;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission, onPlay, onChoice }) => {
  const [showDetails, setShowDetails] = React.useState(false);
  const [showChoices, setShowChoices] = React.useState(false);

  const factionColor = mission.assigningFaction ? FACTION_COLORS[mission.assigningFaction] : 'bg-gray-600';
  const factionName = mission.assigningFaction ? FACTION_NAMES[mission.assigningFaction] : 'Sistema';
  const provinceName = PROVINCE_NAMES[mission.targetProvince];
  const typeIcon = MISSION_TYPE_ICONS[mission.type];
  const typeName = MISSION_TYPE_NAMES[mission.type];

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-lg p-3">
      {/* Header de la misión */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{typeIcon}</span>
            <h4 className="font-semibold text-white text-sm">{mission.title}</h4>
          </div>
          <div className="flex items-center gap-2 text-xs">
            {mission.assigningFaction && (
              <span className={`px-2 py-1 rounded text-white ${factionColor}`}>
                {factionName}
              </span>
            )}
            <span className="px-2 py-1 bg-indigo-600 text-white rounded">
              {provinceName}
            </span>
            <span className="text-gray-400">{typeName}</span>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <p className="text-gray-300 text-xs mb-2 line-clamp-2">{mission.description}</p>

      {/* Recompensas */}
      <div className="flex items-center gap-2 mb-2 text-xs">
        <span className="text-yellow-400">⭐ {mission.rewards.xpBase} XP</span>
        {mission.rewards.factionBonus && (
          <span className="text-green-400">
            +{mission.rewards.factionBonus.supportBonus} Support
          </span>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex gap-2">
        {mission.type === 'combate' && (
          <button
            onClick={onPlay}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs py-2 px-3 rounded transition-colors"
            aria-label={`Jugar misión de combate ${mission.title}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPlay();
              }
            }}
          >
            ⚔️ Jugar
          </button>
        )}

        {mission.choices && mission.choices.length > 0 && (
          <button
            onClick={() => setShowChoices(!showChoices)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded transition-colors"
            aria-label={`Ver opciones de ${mission.title}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setShowChoices(!showChoices);
              }
            }}
          >
            🎯 Decidir
          </button>
        )}

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="bg-gray-600 hover:bg-gray-700 text-white text-xs py-2 px-3 rounded transition-colors"
          aria-label={`Ver detalles de ${mission.title}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setShowDetails(!showDetails);
            }
          }}
        >
          {showDetails ? '👁️' : '👁️'}
        </button>
      </div>

      {/* Detalles expandidos */}
      {showDetails && (
        <div className="mt-3 pt-3 border-t border-gray-600">
          <h5 className="text-sm font-medium text-white mb-2">🎯 Objetivos:</h5>
          <ul className="text-xs text-gray-300 space-y-1">
            {mission.objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-gray-500 mt-0.5">•</span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Opciones de decisión */}
      {showChoices && mission.choices && (
        <div className="mt-3 pt-3 border-t border-gray-600">
          <h5 className="text-sm font-medium text-white mb-2">⚖️ Opciones:</h5>
          <div className="space-y-2">
            {mission.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => {
                  onChoice(choice.id);
                  setShowChoices(false);
                }}
                className="w-full text-left bg-gray-700 hover:bg-gray-600 text-white text-xs p-2 rounded transition-colors"
                aria-label={`Elegir: ${choice.text}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onChoice(choice.id);
                    setShowChoices(false);
                  }
                }}
              >
                <div className="font-medium mb-1">{choice.text}</div>
                <div className="flex gap-2 text-xs text-gray-400">
                  <span className="text-yellow-400">+{choice.xpReward} XP</span>
                  {choice.factionImpact && (
                    <span className={choice.factionImpact.supportChange > 0 ? 'text-green-400' : 'text-red-400'}>
                      {choice.factionImpact.supportChange > 0 ? '+' : ''}{choice.factionImpact.supportChange} Support
                    </span>
                  )}
                  <span className="text-blue-400">{Math.floor(choice.outcomes.successChance * 100)}% éxito</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionHUD;
