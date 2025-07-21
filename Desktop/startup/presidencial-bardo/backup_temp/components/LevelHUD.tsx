/**
 * PRESIDENCIAL BARDO - HUD de Niveles RPG
 * Muestra level, XP bar y árbol de habilidades del presidente
 */

'use client';

import { canUnlockSkill, getSkillById, getSkillsByBranch } from '@/data/skills';
import { GameState } from '@/types/game';
import { Skill } from '@/types/political';
import React from 'react';

interface LevelHUDProps {
  gameState: GameState;
  onUnlockSkill: (skillId: string) => void;
}

const BRANCH_COLORS = {
  combate: 'border-red-500 bg-red-500/10',
  politica: 'border-purple-500 bg-purple-500/10',
  economia: 'border-yellow-500 bg-yellow-500/10',
};

const BRANCH_ICONS = {
  combate: '⚔️',
  politica: '🏛️',
  economia: '💰',
};

const BRANCH_NAMES = {
  combate: 'Combate',
  politica: 'Política',
  economia: 'Economía',
};

export const LevelHUD: React.FC<LevelHUDProps> = ({ gameState, onUnlockSkill }) => {
  const [showSkillTree, setShowSkillTree] = React.useState(false);
  const [selectedBranch, setSelectedBranch] = React.useState<'combate' | 'politica' | 'economia' | null>(null);

  const player = gameState.player;
  if (!player) return null;

  const xpPercentage = (player.xp / player.xpToNextLevel) * 100;

  return (
    <>
      {/* HUD Principal */}
      <div className="fixed top-4 left-4 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-4 min-w-64">
        {/* Información del Presidente */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">🇦🇷</span>
          </div>
          <div>
            <h3 className="text-white font-bold">Presidente</h3>
            <p className="text-gray-400 text-sm">Nivel {player.level}</p>
          </div>
        </div>

        {/* Barra de XP */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-yellow-400 text-sm font-medium">⭐ XP</span>
            <span className="text-gray-300 text-xs">
              {player.xp.toLocaleString()} / {player.xpToNextLevel.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(xpPercentage, 100)}%` }}
            />
          </div>
          {xpPercentage >= 100 && (
            <p className="text-green-400 text-xs mt-1 font-medium">¡Listo para subir de nivel!</p>
          )}
        </div>

        {/* Skill Points */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-purple-400 font-medium">🔮 Puntos de Habilidad</span>
          <span className="text-white font-bold text-lg">{player.skillPoints}</span>
        </div>

        {/* Botón del Árbol de Habilidades */}
        <button
          onClick={() => setShowSkillTree(!showSkillTree)}
          className={`w-full py-2 px-4 rounded transition-colors ${
            player.skillPoints > 0
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
          }`}
          aria-label="Abrir árbol de habilidades"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setShowSkillTree(!showSkillTree);
            }
          }}
        >
          🌳 Árbol de Habilidades
          {player.skillPoints > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {player.skillPoints}
            </span>
          )}
        </button>

        {/* Stats Básicos */}
        <div className="mt-3 pt-3 border-t border-gray-600">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">❤️ Vida:</span>
              <span className="text-white">{player.health}/{player.maxHealth}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">💨 Velocidad:</span>
              <span className="text-white">{player.speed}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal del Árbol de Habilidades */}
      {showSkillTree && (
        <SkillTreeModal
          player={player}
          selectedBranch={selectedBranch}
          onSelectBranch={setSelectedBranch}
          onUnlockSkill={onUnlockSkill}
          onClose={() => {
            setShowSkillTree(false);
            setSelectedBranch(null);
          }}
        />
      )}
    </>
  );
};

interface SkillTreeModalProps {
  player: GameState['player'];
  selectedBranch: 'combate' | 'politica' | 'economia' | null;
  onSelectBranch: (branch: 'combate' | 'politica' | 'economia' | null) => void;
  onUnlockSkill: (skillId: string) => void;
  onClose: () => void;
}

const SkillTreeModal: React.FC<SkillTreeModalProps> = ({
  player,
  selectedBranch,
  onSelectBranch,
  onUnlockSkill,
  onClose,
}) => {
  if (!player) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">🌳 Árbol de Habilidades Presidencial</h2>
          <div className="flex items-center gap-4">
            <span className="text-purple-400 font-medium">
              🔮 {player.skillPoints} Puntos Disponibles
            </span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-xl"
              aria-label="Cerrar árbol de habilidades"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex h-[600px]">
          {/* Selector de Ramas */}
          <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
            <h3 className="text-white font-bold mb-4">Especialidades</h3>
            <div className="space-y-2">
              {(['combate', 'politica', 'economia'] as const).map((branch) => {
                const skills = getSkillsByBranch(branch);
                const unlockedCount = skills.filter(skill => player.skills[skill.id] > 0).length;

                return (
                  <button
                    key={branch}
                    onClick={() => onSelectBranch(selectedBranch === branch ? null : branch)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      selectedBranch === branch
                        ? BRANCH_COLORS[branch] + ' border-2'
                        : 'bg-gray-700 hover:bg-gray-600 border-2 border-transparent'
                    }`}
                    aria-label={`Seleccionar rama ${BRANCH_NAMES[branch]}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{BRANCH_ICONS[branch]}</span>
                      <span className="text-white font-medium">{BRANCH_NAMES[branch]}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {unlockedCount}/{skills.length} desbloqueadas
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Resumen de Habilidades Activas */}
            <div className="mt-6">
              <h4 className="text-white font-medium mb-2">🔥 Activas</h4>
              <div className="space-y-1">
                {Object.entries(player.skills)
                  .filter(([_, level]) => level > 0)
                  .map(([skillId, level]) => {
                    const skill = getSkillById(skillId);
                    if (!skill) return null;

                    return (
                      <div key={skillId} className="text-xs p-2 bg-gray-700 rounded">
                        <div className="text-white font-medium">{skill.name}</div>
                        <div className="text-gray-400">Nivel {level}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Árbol de Habilidades */}
          <div className="flex-1 p-4 overflow-y-auto">
            {selectedBranch ? (
              <SkillBranchView
                branch={selectedBranch}
                player={player}
                onUnlockSkill={onUnlockSkill}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-4">🌳</div>
                  <p className="text-lg">Selecciona una especialidad</p>
                  <p className="text-sm">para ver las habilidades disponibles</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface SkillBranchViewProps {
  branch: 'combate' | 'politica' | 'economia';
  player: GameState['player'];
  onUnlockSkill: (skillId: string) => void;
}

const SkillBranchView: React.FC<SkillBranchViewProps> = ({ branch, player, onUnlockSkill }) => {
  if (!player) return null;

  const skills = getSkillsByBranch(branch);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">{BRANCH_ICONS[branch]}</span>
        <h3 className="text-xl font-bold text-white">{BRANCH_NAMES[branch]}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => {
          const currentLevel = player.skills[skill.id] || 0;
          const canUnlock = canUnlockSkill(skill, player.level, player.skills);
          const hasPoints = player.skillPoints > 0;
          const isMaxLevel = currentLevel >= skill.level;

          return (
            <SkillCard
              key={skill.id}
              skill={skill}
              currentLevel={currentLevel}
              canUnlock={canUnlock && hasPoints && !isMaxLevel}
              onUnlock={() => onUnlockSkill(skill.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

interface SkillCardProps {
  skill: Skill;
  currentLevel: number;
  canUnlock: boolean;
  onUnlock: () => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, currentLevel, canUnlock, onUnlock }) => {
  const isUnlocked = currentLevel > 0;
  const isMaxLevel = currentLevel >= skill.level;

  return (
    <div className={`p-4 rounded-lg border-2 transition-all ${
      isUnlocked
        ? BRANCH_COLORS[skill.branch]
        : 'border-gray-600 bg-gray-800/50'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className={`font-bold text-sm ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
            {skill.name}
          </h4>
          <div className="flex items-center gap-2 text-xs mt-1">
            <span className={isUnlocked ? 'text-purple-400' : 'text-gray-500'}>
              Nivel {currentLevel}/{skill.level}
            </span>
            <span className={isUnlocked ? 'text-yellow-400' : 'text-gray-500'}>
              💰 {skill.cost} pts
            </span>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <p className={`text-xs mb-3 ${isUnlocked ? 'text-gray-300' : 'text-gray-500'}`}>
        {skill.description}
      </p>

      {/* Efectos */}
      <div className="mb-3">
        <h5 className={`text-xs font-medium mb-1 ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
          📊 Efectos:
        </h5>
        <div className="space-y-1">
          {skill.effects.map((effect, index) => (
            <div key={index} className={`text-xs ${isUnlocked ? 'text-green-400' : 'text-gray-500'}`}>
              • {effect.description}
            </div>
          ))}
        </div>
      </div>

      {/* Requisitos */}
      <div className="mb-3">
        <h5 className={`text-xs font-medium mb-1 ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
          🔓 Requisitos:
        </h5>
        <div className="text-xs text-gray-500">
          • Nivel {skill.unlockRequirement.minLevel}
          {skill.unlockRequirement.requiredSkills && skill.unlockRequirement.requiredSkills.length > 0 && (
            <div>• Habilidades previas requeridas</div>
          )}
        </div>
      </div>

      {/* Botón de desbloqueo */}
      <button
        onClick={onUnlock}
        disabled={!canUnlock}
        className={`w-full py-2 px-3 rounded text-xs font-medium transition-colors ${
          canUnlock
            ? 'bg-purple-600 hover:bg-purple-700 text-white'
            : isMaxLevel
            ? 'bg-green-600 text-white cursor-not-allowed'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
        aria-label={`${canUnlock ? 'Desbloquear' : isMaxLevel ? 'Máximo nivel' : 'No disponible'} ${skill.name}`}
      >
        {isMaxLevel ? '✓ Máximo' : canUnlock ? `🔓 Desbloquear (${skill.cost} pts)` : '🔒 Bloqueado'}
      </button>
    </div>
  );
};

export default LevelHUD;
