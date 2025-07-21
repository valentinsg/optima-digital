/**
 * PRESIDENCIAL BARDO - Tester de Misiones y Sistema RPG
 * Panel de testing para el sistema de misiones con facciones y niveles RPG
 */

'use client';

import { ALL_MISSIONS } from '@/data/missions';
import { ALL_SKILLS, canUnlockSkill, getSkillsByBranch } from '@/data/skills';
import { Player } from '@/types/game';
import { FactionId, ProvinceId } from '@/types/political';
import React, { useState } from 'react';

export const MissionsRPGTester: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'missions' | 'rpg' | 'integration'>('missions');
  const [testPlayer, setTestPlayer] = useState<Partial<Player>>({
    level: 1,
    xp: 0,
    xpToNextLevel: 1000,
    skillPoints: 5,
    skills: {},
    health: 100,
    maxHealth: 100,
  });

  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const [missionFilters, setMissionFilters] = useState({
    faction: 'ALL' as FactionId | 'ALL',
    province: 'ALL' as ProvinceId | 'ALL',
    type: 'ALL' as 'combate' | 'negociacion' | 'diplomatica' | 'espionaje' | 'ALL',
  });

  // Simular ganar XP
  const handleGainXP = (amount: number) => {
    setTestPlayer(prev => {
      const newXP = (prev.xp || 0) + amount;
      let newLevel = prev.level || 1;
      let remainingXP = newXP;
      let newSkillPoints = prev.skillPoints || 0;
      let newXPToNext = prev.xpToNextLevel || 1000;

      // Calcular level ups
      while (remainingXP >= newXPToNext) {
        newLevel++;
        remainingXP -= newXPToNext;
        newXPToNext = Math.floor(1000 * Math.pow(newLevel, 1.5));
        newSkillPoints += 2;
      }

      return {
        ...prev,
        level: newLevel,
        xp: remainingXP,
        xpToNextLevel: newXPToNext,
        skillPoints: newSkillPoints,
        maxHealth: 100 + (newLevel - 1) * 10,
        health: 100 + (newLevel - 1) * 10,
      };
    });
  };

  // Simular desbloquear habilidad
  const handleUnlockSkill = (skillId: string) => {
    setTestPlayer(prev => {
      if ((prev.skillPoints || 0) <= 0) return prev;

      return {
        ...prev,
        skillPoints: (prev.skillPoints || 0) - 1,
        skills: {
          ...prev.skills,
          [skillId]: ((prev.skills?.[skillId] || 0) + 1),
        },
      };
    });
  };

  // Resetear jugador
  const handleResetPlayer = () => {
    setTestPlayer({
      level: 1,
      xp: 0,
      xpToNextLevel: 1000,
      skillPoints: 5,
      skills: {},
      health: 100,
      maxHealth: 100,
    });
  };

  // Filtrar misiones
  const filteredMissions = ALL_MISSIONS.filter(mission => {
    if (missionFilters.faction !== 'ALL' && mission.assigningFaction !== missionFilters.faction) {
      return false;
    }
    if (missionFilters.province !== 'ALL' && mission.targetProvince !== missionFilters.province) {
      return false;
    }
    if (missionFilters.type !== 'ALL' && mission.type !== missionFilters.type) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">🎯 Tester de Misiones & Sistema RPG</h2>
        <div className="text-sm text-gray-400">
          Misiones: {ALL_MISSIONS.length} | Habilidades: {ALL_SKILLS.length}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-600 mb-6">
        {[
          { id: 'missions', label: '🎯 Misiones', icon: '🎯' },
          { id: 'rpg', label: '⚔️ Sistema RPG', icon: '⚔️' },
          { id: 'integration', label: '🔗 Integración', icon: '🔗' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as any)}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              selectedTab === tab.id
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido */}
      {selectedTab === 'missions' && (
        <MissionsTestPanel
          missions={filteredMissions}
          filters={missionFilters}
          onFiltersChange={setMissionFilters}
          selectedMission={selectedMission}
          onMissionSelect={setSelectedMission}
        />
      )}

      {selectedTab === 'rpg' && (
        <RPGTestPanel
          player={testPlayer}
          onGainXP={handleGainXP}
          onUnlockSkill={handleUnlockSkill}
          onReset={handleResetPlayer}
        />
      )}

      {selectedTab === 'integration' && (
        <IntegrationTestPanel
          player={testPlayer}
          missions={filteredMissions}
          onGainXP={handleGainXP}
        />
      )}
    </div>
  );
};

interface MissionsTestPanelProps {
  missions: any[];
  filters: any;
  onFiltersChange: (filters: any) => void;
  selectedMission: string | null;
  onMissionSelect: (id: string | null) => void;
}

const MissionsTestPanel: React.FC<MissionsTestPanelProps> = ({
  missions,
  filters,
  onFiltersChange,
  selectedMission,
  onMissionSelect,
}) => {
  const selectedMissionData = missions.find(m => m.id === selectedMission);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Filtros y Lista */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">📋 Lista de Misiones ({missions.length})</h3>

        {/* Filtros */}
        <div className="bg-gray-700 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-medium text-white mb-2">🔍 Filtros</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <select
              value={filters.faction}
              onChange={(e) => onFiltersChange({ ...filters, faction: e.target.value })}
              className="bg-gray-600 text-white text-xs rounded p-2"
            >
              <option value="ALL">Todas las Facciones</option>
              {Object.values(FactionId).map(faction => (
                <option key={faction} value={faction}>{faction}</option>
              ))}
            </select>

            <select
              value={filters.type}
              onChange={(e) => onFiltersChange({ ...filters, type: e.target.value })}
              className="bg-gray-600 text-white text-xs rounded p-2"
            >
              <option value="ALL">Todos los Tipos</option>
              <option value="combate">⚔️ Combate</option>
              <option value="negociacion">🤝 Negociación</option>
              <option value="diplomatica">🎭 Diplomática</option>
              <option value="espionaje">🕵️ Espionaje</option>
            </select>

            <button
              onClick={() => onFiltersChange({ faction: 'ALL', province: 'ALL', type: 'ALL' })}
              className="bg-gray-600 hover:bg-gray-500 text-white text-xs rounded p-2 transition-colors"
            >
              🗑️ Limpiar
            </button>
          </div>
        </div>

        {/* Lista de Misiones */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {missions.map((mission) => (
            <div
              key={mission.id}
              onClick={() => onMissionSelect(mission.id)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedMission === mission.id
                  ? 'bg-purple-600/30 border border-purple-500'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">
                  {mission.type === 'combate' ? '⚔️' : mission.type === 'negociacion' ? '🤝' : mission.type === 'diplomatica' ? '🎭' : '🕵️'}
                </span>
                <span className="text-white font-medium text-sm">{mission.title}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                {mission.assigningFaction && (
                  <span className="bg-gray-600 px-2 py-1 rounded">{mission.assigningFaction}</span>
                )}
                <span>⭐ {mission.rewards.xpBase} XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detalles de Misión */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">📄 Detalles de Misión</h3>

        {selectedMissionData ? (
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">
                {selectedMissionData.type === 'combate' ? '⚔️' : selectedMissionData.type === 'negociacion' ? '🤝' : selectedMissionData.type === 'diplomatica' ? '🎭' : '🕵️'}
              </span>
              <h4 className="text-white font-bold">{selectedMissionData.title}</h4>
            </div>

            <p className="text-gray-300 text-sm mb-4">{selectedMissionData.description}</p>

            <div className="space-y-3">
              <div>
                <h5 className="text-white font-medium text-sm mb-1">🎯 Objetivos:</h5>
                <ul className="text-gray-300 text-xs space-y-1">
                  {selectedMissionData.objectives.map((obj: string, i: number) => (
                    <li key={i}>• {obj}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-white font-medium text-sm mb-1">⚙️ Triggers:</h5>
                <div className="text-gray-300 text-xs space-y-1">
                  <div>• Tiempo mínimo: {selectedMissionData.trigger.timeMin} días</div>
                  {selectedMissionData.trigger.minSupportWithFaction && (
                    <div>• Support mínimo: {selectedMissionData.trigger.minSupportWithFaction}%</div>
                  )}
                  <div>• Probabilidad: {Math.floor((selectedMissionData.trigger.probability || 1) * 100)}%</div>
                </div>
              </div>

              <div>
                <h5 className="text-white font-medium text-sm mb-1">🏆 Recompensas:</h5>
                <div className="text-gray-300 text-xs space-y-1">
                  <div>• XP Base: {selectedMissionData.rewards.xpBase}</div>
                  {selectedMissionData.rewards.factionBonus && (
                    <div>• Bonus Facción: +{selectedMissionData.rewards.factionBonus.supportBonus}</div>
                  )}
                </div>
              </div>

              {selectedMissionData.choices && (
                <div>
                  <h5 className="text-white font-medium text-sm mb-1">⚖️ Opciones ({selectedMissionData.choices.length}):</h5>
                  <div className="space-y-2">
                    {selectedMissionData.choices.map((choice: any, i: number) => (
                      <div key={i} className="bg-gray-600 rounded p-2">
                        <div className="text-white text-xs font-medium">{choice.text}</div>
                        <div className="text-gray-400 text-xs">
                          +{choice.xpReward} XP | {Math.floor(choice.outcomes.successChance * 100)}% éxito
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gray-700 rounded-lg p-4 text-center text-gray-400">
            Selecciona una misión para ver los detalles
          </div>
        )}
      </div>
    </div>
  );
};

interface RPGTestPanelProps {
  player: Partial<Player>;
  onGainXP: (amount: number) => void;
  onUnlockSkill: (skillId: string) => void;
  onReset: () => void;
}

const RPGTestPanel: React.FC<RPGTestPanelProps> = ({
  player,
  onGainXP,
  onUnlockSkill,
  onReset,
}) => {
  const [selectedBranch, setSelectedBranch] = useState<'combate' | 'politica' | 'economia'>('combate');
  const branchSkills = getSkillsByBranch(selectedBranch);

  const xpPercentage = ((player.xp || 0) / (player.xpToNextLevel || 1)) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Estado del Jugador */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">👤 Estado del Presidente</h3>

        <div className="bg-gray-700 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-bold">Nivel {player.level}</h4>
            <button
              onClick={onReset}
              className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded transition-colors"
            >
              🔄 Reset
            </button>
          </div>

          {/* Barra de XP */}
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-yellow-400">⭐ XP</span>
              <span className="text-gray-300">
                {player.xp?.toLocaleString()} / {player.xpToNextLevel?.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(xpPercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">🔮 Skill Points:</span>
              <span className="text-white font-bold ml-2">{player.skillPoints}</span>
            </div>
            <div>
              <span className="text-gray-400">❤️ Vida:</span>
              <span className="text-white font-bold ml-2">{player.health}/{player.maxHealth}</span>
            </div>
          </div>

          {/* Botones de XP */}
          <div className="mt-4">
            <h5 className="text-white font-medium text-sm mb-2">⚡ Ganar XP:</h5>
            <div className="grid grid-cols-3 gap-2">
              {[100, 500, 1000, 2000, 5000, 10000].map(amount => (
                <button
                  key={amount}
                  onClick={() => onGainXP(amount)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs py-1 px-2 rounded transition-colors"
                >
                  +{amount}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Habilidades Activas */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-white font-bold mb-2">🔥 Habilidades Activas</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {Object.entries(player.skills || {})
              .filter(([_, level]) => level > 0)
              .map(([skillId, level]) => {
                const skill = ALL_SKILLS.find(s => s.id === skillId);
                return skill ? (
                  <div key={skillId} className="flex justify-between items-center text-xs">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-purple-400">Nivel {level}</span>
                  </div>
                ) : null;
              })}
            {Object.keys(player.skills || {}).length === 0 && (
              <div className="text-gray-400 text-xs">No hay habilidades desbloqueadas</div>
            )}
          </div>
        </div>
      </div>

      {/* Árbol de Habilidades */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">🌳 Árbol de Habilidades</h3>

        {/* Selector de Rama */}
        <div className="flex gap-2 mb-4">
          {(['combate', 'politica', 'economia'] as const).map(branch => (
            <button
              key={branch}
              onClick={() => setSelectedBranch(branch)}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                selectedBranch === branch
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              {branch === 'combate' ? '⚔️' : branch === 'politica' ? '🏛️' : '💰'} {branch}
            </button>
          ))}
        </div>

        {/* Lista de Habilidades */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {branchSkills.map(skill => {
            const currentLevel = player.skills?.[skill.id] || 0;
            const canUnlock = canUnlockSkill(skill, player.level || 1, player.skills || {}) && (player.skillPoints || 0) > 0;
            const isMaxLevel = currentLevel >= skill.level;

            return (
              <div key={skill.id} className="bg-gray-600 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="text-white font-medium text-sm">{skill.name}</h5>
                    <p className="text-gray-400 text-xs">{skill.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-purple-400 text-xs">Nivel {currentLevel}/{skill.level}</div>
                    <div className="text-gray-400 text-xs">💰 {skill.cost} pts</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-400">
                    Min. Nivel: {skill.unlockRequirement.minLevel}
                  </div>
                  <button
                    onClick={() => onUnlockSkill(skill.id)}
                    disabled={!canUnlock}
                    className={`text-xs py-1 px-2 rounded transition-colors ${
                      canUnlock
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : isMaxLevel
                        ? 'bg-green-600 text-white cursor-not-allowed'
                        : 'bg-gray-500 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isMaxLevel ? '✓ Máximo' : canUnlock ? '🔓 Desbloquear' : '🔒 Bloqueado'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface IntegrationTestPanelProps {
  player: Partial<Player>;
  missions: any[];
  onGainXP: (amount: number) => void;
}

const IntegrationTestPanel: React.FC<IntegrationTestPanelProps> = ({
  player,
  missions,
  onGainXP,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-white">🔗 Pruebas de Integración</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Simulador de Combate */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-white font-bold mb-3">⚔️ Simulador de Combate</h4>
          <p className="text-gray-300 text-sm mb-4">
            Simula ganar XP matando enemigos con diferentes multiplicadores de dificultad.
          </p>

          <div className="space-y-2">
            {[
              { name: 'Enemigo Normal', xp: 10, multiplier: 1 },
              { name: 'Enemigo Rápido', xp: 12, multiplier: 1.2 },
              { name: 'Enemigo Tank', xp: 25, multiplier: 1.5 },
              { name: 'Boss', xp: 100, multiplier: 2 },
            ].map(enemy => (
              <button
                key={enemy.name}
                onClick={() => onGainXP(Math.floor(enemy.xp * enemy.multiplier))}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-3 rounded transition-colors"
              >
                💀 {enemy.name} (+{Math.floor(enemy.xp * enemy.multiplier)} XP)
              </button>
            ))}
          </div>
        </div>

        {/* Simulador de Misiones */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-white font-bold mb-3">🎯 Simulador de Misiones</h4>
          <p className="text-gray-300 text-sm mb-4">
            Simula completar misiones con diferentes recompensas de XP.
          </p>

          <div className="space-y-2">
            {missions.slice(0, 4).map(mission => (
              <button
                key={mission.id}
                onClick={() => onGainXP(mission.rewards.xpBase)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded transition-colors text-left"
              >
                <div className="flex justify-between items-center">
                  <span>{mission.title}</span>
                  <span>+{mission.rewards.xpBase} XP</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Estado de Integración */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h4 className="text-white font-bold mb-3">📊 Estado de Integración</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-600 rounded p-3">
            <div className="text-gray-400 mb-1">Nivel del Presidente</div>
            <div className="text-white font-bold text-lg">{player.level}</div>
          </div>
          <div className="bg-gray-600 rounded p-3">
            <div className="text-gray-400 mb-1">Habilidades Desbloqueadas</div>
            <div className="text-white font-bold text-lg">
              {Object.values(player.skills || {}).filter(level => level > 0).length}
            </div>
          </div>
          <div className="bg-gray-600 rounded p-3">
            <div className="text-gray-400 mb-1">Misiones Disponibles</div>
            <div className="text-white font-bold text-lg">{missions.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionsRPGTester;
