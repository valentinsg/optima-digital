import { ProvinceId, ProvinceState } from "@/types/political";

/**
 * Efectos de gameplay basados en el estado de las provincias
 */

export interface RegionalGameplayEffects {
  /** Multiplicador de spawn de enemigos basado en descontento */
  enemySpawnMultiplier: number;
  /** Probabilidad de power-ups regionales */
  regionalPowerUpChance: number;
  /** Eventos de migración activos */
  migrationEvents: MigrationEvent[];
  /** Bonos de recursos naturales */
  resourceBonuses: ResourceBonus[];
}

export interface MigrationEvent {
  fromProvince: ProvinceId;
  toProvince: ProvinceId;
  populationMoved: number;
  reason: string;
  duration: number;
}

export interface ResourceBonus {
  provinceId: ProvinceId;
  resource: string;
  bonus: number;
  description: string;
}

/**
 * Calcular efectos de gameplay basados en el estado de las provincias
 */
export const calculateRegionalGameplayEffects = (
  provinceStates: Record<ProvinceId, ProvinceState>
): RegionalGameplayEffects => {
  const provinces = Object.values(provinceStates);

  // Calcular multiplicador de enemigos basado en descontento
  const averageDiscontent = provinces.reduce((sum, p) => sum + p.discontent, 0) / provinces.length;
  const criticalProvinces = provinces.filter(p => p.discontent > 75).length;

  let enemySpawnMultiplier = 1.0;
  if (averageDiscontent > 50) {
    enemySpawnMultiplier += (averageDiscontent - 50) * 0.01; // +1% por cada punto de descontento >50
  }
  if (criticalProvinces > 0) {
    enemySpawnMultiplier += criticalProvinces * 0.1; // +10% por cada provincia crítica
  }

  // Calcular probabilidad de power-ups regionales
  const loyalProvinces = provinces.filter(p => p.loyalty > 70).length;
  const regionalPowerUpChance = Math.min(0.3, loyalProvinces * 0.05); // Máximo 30%

  // Generar eventos de migración
  const migrationEvents: MigrationEvent[] = [];
  provinces.forEach(province => {
    if (province.discontent > 60) {
      // Buscar provincia más leal para migrar
      const targetProvince = provinces
        .filter(p => p.id !== province.id && p.loyalty > 60)
        .sort((a, b) => b.loyalty - a.loyalty)[0];

      if (targetProvince) {
        migrationEvents.push({
          fromProvince: province.id,
          toProvince: targetProvince.id,
          populationMoved: Math.floor(province.population * 0.01), // 1% de la población
          reason: `Migración por descontento en ${province.name}`,
          duration: 30 // 30 días
        });
      }
    }
  });

  // Calcular bonos de recursos naturales
  const resourceBonuses: ResourceBonus[] = [];
  provinces.forEach(province => {
    if (province.loyalty > 60 && province.economicLevel > 50) {
      province.resources.forEach(resource => {
        const bonus = calculateResourceBonus(resource, province);
        if (bonus > 0) {
          resourceBonuses.push({
            provinceId: province.id,
            resource,
            bonus,
            description: `Bono de ${resource} en ${province.name}`
          });
        }
      });
    }
  });

  return {
    enemySpawnMultiplier,
    regionalPowerUpChance,
    migrationEvents,
    resourceBonuses
  };
};

/**
 * Calcular bono específico para un recurso
 */
const calculateResourceBonus = (resource: string, province: ProvinceState): number => {
  const baseBonus = 5; // Bono base

  switch (resource.toLowerCase()) {
    case 'vino':
    case 'vitivinicultura':
      return province.loyalty > 70 ? baseBonus * 2 : baseBonus;
    case 'petróleo':
    case 'gas':
      return province.economicLevel > 60 ? baseBonus * 1.5 : baseBonus;
    case 'turismo':
      return province.loyalty > 65 ? baseBonus * 1.3 : baseBonus;
    case 'agricultura':
      return province.loyalty > 50 ? baseBonus : baseBonus * 0.5;
    default:
      return baseBonus;
  }
};

/**
 * Obtener power-ups regionales disponibles
 */
export const getRegionalPowerUps = (provinceStates: Record<ProvinceId, ProvinceState>) => {
  const powerUps: Array<{
    id: string;
    name: string;
    effect: string;
    provinceId: ProvinceId;
    condition: boolean;
  }> = [];

  Object.values(provinceStates).forEach(province => {
    if (province.loyalty > 70) {
      // Power-ups basados en recursos de la provincia
      if (province.resources.includes('Vino') || province.resources.includes('Vitivinicultura')) {
        powerUps.push({
          id: `vino_${province.id}`,
          name: 'Vino Mendocino',
          effect: '+50 HP, +20% daño por 30s',
          provinceId: province.id,
          condition: province.id === ProvinceId.MENDOZA
        });
      }

      if (province.resources.includes('Empanadas') || province.id === ProvinceId.CORDOBA) {
        powerUps.push({
          id: `empanadas_${province.id}`,
          name: 'Empanadas Cordobesas',
          effect: '+100 HP, regeneración rápida',
          provinceId: province.id,
          condition: true
        });
      }

      if (province.resources.includes('Yerba Mate')) {
        powerUps.push({
          id: `mate_${province.id}`,
          name: 'Mate Energético',
          effect: '+30% velocidad de movimiento, +15% daño',
          provinceId: province.id,
          condition: true
        });
      }

      if (province.id === ProvinceId.TIERRA_DEL_FUEGO) {
        powerUps.push({
          id: `alien_tech_${province.id}`,
          name: 'Tecnología Alien',
          effect: 'Proyectiles explosivos, +50% daño',
          provinceId: province.id,
          condition: true
        });
      }
    }
  });

  return powerUps;
};

/**
 * Aplicar efectos de migración a las provincias
 */
export const applyMigrationEffects = (
  migrationEvents: MigrationEvent[],
  provinceStates: Record<ProvinceId, ProvinceState>
): Record<ProvinceId, ProvinceState> => {
  const updatedStates = { ...provinceStates };

  migrationEvents.forEach(migration => {
    const fromProvince = updatedStates[migration.fromProvince];
    const toProvince = updatedStates[migration.toProvince];

    if (fromProvince && toProvince) {
      // Reducir población y aumentar descontento en provincia origen
      fromProvince.population -= migration.populationMoved;
      fromProvince.discontent += 5;

      // Aumentar población y lealtad en provincia destino
      toProvince.population += migration.populationMoved;
      toProvince.loyalty += 3;

      // Clampear valores
      fromProvince.discontent = Math.min(100, Math.max(0, fromProvince.discontent));
      toProvince.loyalty = Math.min(100, Math.max(0, toProvince.loyalty));
    }
  });

  return updatedStates;
};
