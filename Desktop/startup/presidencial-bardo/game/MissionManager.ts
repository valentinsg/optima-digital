/**
 * PRESIDENCIAL BARDO - Manager de Misiones
 * Sistema de misiones dinámicas con facciones y provincias
 */

import { ALL_MISSIONS, Mission } from '../data/missions';
import { GameState } from '../types/game';
import { FactionId, MetricType, ProvinceId } from '../types/political';

export interface MissionChoice {
  missionId: string;
  choiceId: string;
}

export class MissionManager {
  private availableMissions: Mission[] = [];
  private completedMissions: Set<string> = new Set();

  /**
   * Actualiza las misiones disponibles basado en el estado del juego
   */
  updateMissions(gameState: GameState): Mission[] {
    const newMissions: Mission[] = [];
    const currentTime = gameState.gameTime || 0;

    for (const mission of ALL_MISSIONS) {
      // No procesar misiones ya completadas o activas
      if (this.completedMissions.has(mission.id) ||
          gameState.activeMissions?.some(m => m.id === mission.id)) {
        continue;
      }

      // Verificar triggers
      if (this.checkMissionTrigger(mission, gameState, currentTime)) {
        // Verificar probabilidad
        if (!mission.trigger.probability || Math.random() < mission.trigger.probability) {
          newMissions.push(mission);
        }
      }
    }

    // Añadir nuevas misiones al estado
    if (newMissions.length > 0) {
      if (!gameState.activeMissions) {
        gameState.activeMissions = [];
      }
      gameState.activeMissions.push(...newMissions);
    }

    return newMissions;
  }

  /**
   * Verifica si una misión puede ser activada
   */
  private checkMissionTrigger(mission: Mission, gameState: GameState, currentTime: number): boolean {
    const trigger = mission.trigger;

    // Verificar tiempo mínimo
    if (currentTime < trigger.timeMin) {
      return false;
    }

    // Verificar soporte con facción (si es requerido)
    if (mission.assigningFaction && trigger.minSupportWithFaction) {
      const faction = gameState.factions?.find(f => f.id === mission.assigningFaction);
      if (!faction || faction.support < trigger.minSupportWithFaction) {
        return false;
      }
    }

    // Verificar estado de provincia
    if (trigger.requiredProvinceState) {
      const province = gameState.provinces?.find(p => p.id === mission.targetProvince);
      if (!province) return false;

      const { minDiscontent, minLoyalty } = trigger.requiredProvinceState;
      if (minDiscontent && province.discontent < minDiscontent) return false;
      if (minLoyalty && province.loyalty < minLoyalty) return false;
    }

    // Verificar métricas requeridas
    if (trigger.requiredMetrics) {
      for (const [metricKey, requirement] of Object.entries(trigger.requiredMetrics)) {
        const metricType = metricKey as MetricType;
        const currentValue = gameState.metrics?.[metricType] || 0;

        if (requirement.min && currentValue < requirement.min) return false;
        if (requirement.max && currentValue > requirement.max) return false;
      }
    }

    // Verificar eventos requeridos
    if (trigger.requiredEvents) {
      for (const eventId of trigger.requiredEvents) {
        if (!gameState.completedMissions?.includes(eventId)) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Inicia una misión específica (principalmente para misiones de combate)
   */
  playMission(mission: Mission, gameState: GameState): void {
    switch (mission.type) {
      case 'combate':
        this.setupCombatMission(mission, gameState);
        break;
      case 'negociacion':
        this.setupNegotiationMission(mission, gameState);
        break;
      case 'diplomatica':
        this.setupDiplomaticMission(mission, gameState);
        break;
      case 'espionaje':
        this.setupEspionageMission(mission, gameState);
        break;
    }
  }

  /**
   * Configura misión de combate (aumenta enemigos basado en discontent de provincia)
   */
  private setupCombatMission(mission: Mission, gameState: GameState): void {
    const province = gameState.provinces?.find(p => p.id === mission.targetProvince);
    if (!province) return;

    // Aumentar spawn de enemigos basado en discontent
    const difficultyMultiplier = 1 + (province.discontent * 0.01);

    // Aplicar multiplicador temporal para la misión
    if (gameState.player) {
      // Este multiplicador será usado por Creatures.ts
      gameState.missionDifficulty = difficultyMultiplier;
      gameState.activeMissionType = 'combate';
    }
  }

  /**
   * Configura misión de negociación
   */
  private setupNegotiationMission(mission: Mission, gameState: GameState): void {
    // Preparar contexto para mini-juego de negociación
    gameState.activeMissionType = 'negociacion';
    gameState.negotiationContext = {
      faction: mission.assigningFaction,
      province: mission.targetProvince,
      objectives: mission.objectives
    };
  }

  /**
   * Configura misión diplomática
   */
  private setupDiplomaticMission(mission: Mission, gameState: GameState): void {
    gameState.activeMissionType = 'diplomatica';
    gameState.diplomaticContext = {
      faction: mission.assigningFaction,
      province: mission.targetProvince,
      choices: mission.choices
    };
  }

  /**
   * Configura misión de espionaje
   */
  private setupEspionageMission(mission: Mission, gameState: GameState): void {
    gameState.activeMissionType = 'espionaje';
    // Configurar contexto específico de espionaje
  }

  /**
   * Procesa la elección de una misión y aplica efectos
   */
  processMissionChoice(missionChoice: MissionChoice, gameState: GameState): void {
    const mission = gameState.activeMissions?.find(m => m.id === missionChoice.missionId);
    if (!mission || !mission.choices) return;

    const choice = mission.choices.find(c => c.id === missionChoice.choiceId);
    if (!choice) return;

    // Aplicar impactos en facciones
    if (choice.factionImpact) {
      const faction = gameState.factions?.find(f => f.id === choice.factionImpact!.factionId);
      if (faction) {
        faction.support = Math.max(-100, Math.min(100,
          faction.support + choice.factionImpact.supportChange
        ));
      }
    }

    // Aplicar impactos en provincias
    if (choice.provinceImpact) {
      const province = gameState.provinces?.find(p => p.id === mission.targetProvince);
      if (province) {
        province.discontent = Math.max(0, Math.min(100,
          province.discontent + choice.provinceImpact.discontentChange
        ));
        province.loyalty = Math.max(0, Math.min(100,
          province.loyalty + choice.provinceImpact.loyaltyChange
        ));
      }
    }

    // Aplicar efectos en métricas
    if (choice.outcomes.effects) {
      this.applyMetricEffects(choice.outcomes.effects, gameState);
    }

    // Otorgar XP
    const totalXP = mission.rewards.xpBase + choice.xpReward;
    this.gainXP(totalXP, gameState);

    // Propagar efectos a provincias vecinas
    this.propagateEffectsToNeighbors(mission.targetProvince, choice, gameState);

    // Desbloquear próximas misiones
    if (choice.outcomes.nextMissions) {
      this.unlockMissions(choice.outcomes.nextMissions, gameState);
    }

    // Aplicar bonus de facción
    if (mission.rewards.factionBonus) {
      const faction = gameState.factions?.find(f => f.id === mission.rewards.factionBonus!.factionId);
      if (faction) {
        faction.support = Math.max(-100, Math.min(100,
          faction.support + mission.rewards.factionBonus.supportBonus
        ));
      }
    }

    // Marcar misión como completada
    this.completeMission(mission.id, gameState);
  }

  /**
   * Aplica efectos en métricas
   */
  private applyMetricEffects(effects: any[], gameState: GameState): void {
    if (!gameState.metrics) return;

    for (const effect of effects) {
      const currentValue = gameState.metrics[effect.type as MetricType] || 0;
      gameState.metrics[effect.type as MetricType] = Math.max(0, Math.min(100,
        currentValue + effect.change
      ));
    }
  }

  /**
   * Otorga XP al jugador
   */
  private gainXP(amount: number, gameState: GameState): void {
    if (!gameState.player) return;

    gameState.player.xp += amount;

    // Verificar level ups
    while (gameState.player.xp >= gameState.player.xpToNextLevel) {
      gameState.player.level++;
      gameState.player.xp -= gameState.player.xpToNextLevel;
      gameState.player.xpToNextLevel = Math.floor(1000 * Math.pow(gameState.player.level, 1.5));
      gameState.player.skillPoints += 2;

      // Bonos base por level
      gameState.player.maxHealth += 10;
      gameState.player.health = gameState.player.maxHealth; // Curar al subir nivel

      // Disparar notificación de level up
      if (gameState.notifications) {
        gameState.notifications.push({
          id: `levelup-${Date.now()}`,
          type: 'success',
          message: `¡Subiste a nivel ${gameState.player.level}!`,
          timestamp: Date.now()
        });
      }
    }
  }

  /**
   * Propaga efectos a provincias vecinas
   */
  private propagateEffectsToNeighbors(targetProvince: ProvinceId, choice: any, gameState: GameState): void {
    // Lógica de propagación basada en la decisión
    // Por ahora implementación básica - puede expandirse
    if (!choice.provinceImpact || !gameState.provinces) return;

    const impactStrength = Math.abs(choice.provinceImpact.discontentChange) * 0.3; // 30% del impacto original

    for (const province of gameState.provinces) {
      if (province.id !== targetProvince) {
        // Efecto menor en provincias adyacentes (simplificado)
        if (choice.provinceImpact.discontentChange > 0) {
          province.discontent = Math.min(100, province.discontent + impactStrength);
        } else {
          province.discontent = Math.max(0, province.discontent - impactStrength);
        }
      }
    }
  }

  /**
   * Desbloquea nuevas misiones
   */
  private unlockMissions(missionIds: string[], gameState: GameState): void {
    // Las misiones se desbloquearán en la próxima actualización de updateMissions
    // Por ahora solo agregamos a un registro de misiones desbloqueadas
    if (!gameState.unlockedMissions) {
      gameState.unlockedMissions = [];
    }
    gameState.unlockedMissions.push(...missionIds);
  }

  /**
   * Marca una misión como completada
   */
  private completeMission(missionId: string, gameState: GameState): void {
    this.completedMissions.add(missionId);

    // Remover de misiones activas
    if (gameState.activeMissions) {
      gameState.activeMissions = gameState.activeMissions.filter(m => m.id !== missionId);
    }

    // Añadir a completadas
    if (!gameState.completedMissions) {
      gameState.completedMissions = [];
    }
    gameState.completedMissions.push(missionId);
  }

  /**
   * Obtiene misiones disponibles para una facción específica
   */
  getMissionsForFaction(factionId: FactionId): Mission[] {
    return ALL_MISSIONS.filter(mission => mission.assigningFaction === factionId);
  }

  /**
   * Obtiene misiones para una provincia específica
   */
  getMissionsForProvince(provinceId: ProvinceId): Mission[] {
    return ALL_MISSIONS.filter(mission => mission.targetProvince === provinceId);
  }

  /**
   * Reinicia el estado del manager (útil para testing)
   */
  reset(): void {
    this.availableMissions = [];
    this.completedMissions.clear();
  }
}
