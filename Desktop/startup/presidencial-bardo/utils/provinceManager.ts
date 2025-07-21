/**
 * PRESIDENCIAL BARDO - Province Manager Simplificado
 * Sistema simplificado de provincias basado en percepción del gobierno
 */

import { DecisionResult, PoliticalMetrics, ProvinceId } from "@/types/political";

/**
 * Estado simplificado de provincia enfocado en percepción
 */
export interface SimpleProvinceState {
  id: ProvinceId;
  name: string;
  /** Percepción del gobierno: -100 (muy negativa) a +100 (muy positiva) */
  governmentPerception: number;
  /** Población de la provincia (para calcular impacto) */
  population: number;
  /** Ideología dominante que afecta cómo reaccionan a las decisiones */
  ideology: "populista" | "liberal" | "conservadora" | "progresista";
  /** Recursos principales que pueden dar bonos */
  mainResources: string[];
  /** Eventos únicos activos */
  activeEvents: string[];
}

/**
 * Efecto regional simple
 */
export interface RegionalEffect {
  provinceId: ProvinceId;
  /** Cambio en percepción del gobierno */
  perceptionChange: number;
  /** Descripción del efecto */
  description: string;
  /** Duración en días */
  duration?: number;
}

/**
 * Manager simplificado de provincias
 */
export class ProvinceManager {
  private provinces: Map<ProvinceId, SimpleProvinceState> = new Map();

  // Agrego mapa de vecinos para propagación
  private neighbors: Record<ProvinceId, ProvinceId[]> = {
    [ProvinceId.BUENOS_AIRES]: [ProvinceId.CABA, ProvinceId.LA_PAMPA, ProvinceId.ENTRE_RIOS, ProvinceId.CORDOBA, ProvinceId.SANTA_FE, ProvinceId.RIO_NEGRO],
    [ProvinceId.CABA]: [ProvinceId.BUENOS_AIRES],
    [ProvinceId.CATAMARCA]: [ProvinceId.TUCUMAN, ProvinceId.SALTA, ProvinceId.LA_RIOJA, ProvinceId.CORDOBA, ProvinceId.SANTIAGO_DEL_ESTERO],
    [ProvinceId.CHACO]: [ProvinceId.FORMOSA, ProvinceId.SALTA, ProvinceId.SANTIAGO_DEL_ESTERO, ProvinceId.SANTA_FE, ProvinceId.CORRIENTES],
    [ProvinceId.CHUBUT]: [ProvinceId.RIO_NEGRO, ProvinceId.SANTA_CRUZ],
    [ProvinceId.CORDOBA]: [ProvinceId.BUENOS_AIRES, ProvinceId.LA_PAMPA, ProvinceId.SAN_LUIS, ProvinceId.SANTA_FE, ProvinceId.SANTIAGO_DEL_ESTERO, ProvinceId.CATAMARCA, ProvinceId.LA_RIOJA],
    [ProvinceId.CORRIENTES]: [ProvinceId.CHACO, ProvinceId.MISIONES, ProvinceId.ENTRE_RIOS, ProvinceId.SANTA_FE],
    [ProvinceId.ENTRE_RIOS]: [ProvinceId.BUENOS_AIRES, ProvinceId.SANTA_FE, ProvinceId.CORRIENTES],
    [ProvinceId.FORMOSA]: [ProvinceId.CHACO, ProvinceId.SALTA],
    [ProvinceId.JUJUY]: [ProvinceId.SALTA],
    [ProvinceId.LA_PAMPA]: [ProvinceId.BUENOS_AIRES, ProvinceId.CORDOBA, ProvinceId.SAN_LUIS, ProvinceId.MENDOZA, ProvinceId.RIO_NEGRO, ProvinceId.NEUQUEN],
    [ProvinceId.LA_RIOJA]: [ProvinceId.CATAMARCA, ProvinceId.CORDOBA, ProvinceId.SAN_LUIS, ProvinceId.SAN_JUAN],
    [ProvinceId.MENDOZA]: [ProvinceId.LA_PAMPA, ProvinceId.SAN_LUIS, ProvinceId.SAN_JUAN, ProvinceId.NEUQUEN],
    [ProvinceId.MISIONES]: [ProvinceId.CORRIENTES],
    [ProvinceId.NEUQUEN]: [ProvinceId.LA_PAMPA, ProvinceId.MENDOZA, ProvinceId.RIO_NEGRO],
    [ProvinceId.RIO_NEGRO]: [ProvinceId.BUENOS_AIRES, ProvinceId.LA_PAMPA, ProvinceId.NEUQUEN, ProvinceId.CHUBUT],
    [ProvinceId.SALTA]: [ProvinceId.JUJUY, ProvinceId.FORMOSA, ProvinceId.CHACO, ProvinceId.SANTIAGO_DEL_ESTERO, ProvinceId.TUCUMAN, ProvinceId.CATAMARCA],
    [ProvinceId.SAN_JUAN]: [ProvinceId.LA_RIOJA, ProvinceId.SAN_LUIS, ProvinceId.MENDOZA],
    [ProvinceId.SAN_LUIS]: [ProvinceId.CORDOBA, ProvinceId.LA_PAMPA, ProvinceId.MENDOZA, ProvinceId.SAN_JUAN, ProvinceId.LA_RIOJA],
    [ProvinceId.SANTA_CRUZ]: [ProvinceId.CHUBUT, ProvinceId.TIERRA_DEL_FUEGO],
    [ProvinceId.SANTA_FE]: [ProvinceId.BUENOS_AIRES, ProvinceId.CORDOBA, ProvinceId.SANTIAGO_DEL_ESTERO, ProvinceId.CHACO, ProvinceId.CORRIENTES, ProvinceId.ENTRE_RIOS],
    [ProvinceId.SANTIAGO_DEL_ESTERO]: [ProvinceId.SALTA, ProvinceId.CHACO, ProvinceId.SANTA_FE, ProvinceId.CORDOBA, ProvinceId.CATAMARCA, ProvinceId.TUCUMAN],
    [ProvinceId.TIERRA_DEL_FUEGO]: [ProvinceId.SANTA_CRUZ],
    [ProvinceId.TUCUMAN]: [ProvinceId.SALTA, ProvinceId.SANTIAGO_DEL_ESTERO, ProvinceId.CATAMARCA],
  };

  constructor() {
    this.initializeProvinces();
  }

  /**
   * Inicializar provincias con datos básicos
   */
  private initializeProvinces() {
    const provincesData: Array<Omit<SimpleProvinceState, 'activeEvents'>> = [
      // Provincias clave
      {
        id: ProvinceId.BUENOS_AIRES,
        name: "Buenos Aires",
        governmentPerception: 0,
        population: 17500000,
        ideology: "populista",
        mainResources: ["Agricultura", "Industria"]
      },
      {
        id: ProvinceId.CABA,
        name: "CABA",
        governmentPerception: -10,
        population: 3000000,
        ideology: "liberal",
        mainResources: ["Servicios", "Finanzas"]
      },
      {
        id: ProvinceId.CORDOBA,
        name: "Córdoba",
        governmentPerception: 5,
        population: 3800000,
        ideology: "progresista",
        mainResources: ["Automotriz", "Universidad"]
      },
      {
        id: ProvinceId.SANTA_FE,
        name: "Santa Fe",
        governmentPerception: 0,
        population: 3400000,
        ideology: "progresista",
        mainResources: ["Agricultura", "Puerto"]
      },
      {
        id: ProvinceId.MENDOZA,
        name: "Mendoza",
        governmentPerception: 10,
        population: 2000000,
        ideology: "conservadora",
        mainResources: ["Vino", "Turismo"]
      },
      // Norte (tradicionalmente peronista)
      {
        id: ProvinceId.FORMOSA,
        name: "Formosa",
        governmentPerception: 25,
        population: 600000,
        ideology: "populista",
        mainResources: ["Algodón"]
      },
      {
        id: ProvinceId.CHACO,
        name: "Chaco",
        governmentPerception: 15,
        population: 1200000,
        ideology: "populista",
        mainResources: ["Algodón", "Ganadería"]
      },
      {
        id: ProvinceId.SANTIAGO_DEL_ESTERO,
        name: "Santiago del Estero",
        governmentPerception: 20,
        population: 900000,
        ideology: "conservadora",
        mainResources: ["Ganadería"]
      },
      // Patagonia (más independientes)
      {
        id: ProvinceId.NEUQUEN,
        name: "Neuquén",
        governmentPerception: -5,
        population: 650000,
        ideology: "progresista",
        mainResources: ["Petróleo", "Energía"]
      },
      {
        id: ProvinceId.SANTA_CRUZ,
        name: "Santa Cruz",
        governmentPerception: 10,
        population: 330000,
        ideology: "populista",
        mainResources: ["Petróleo", "Minería"]
      },
      // Resto simplificado
      {
        id: ProvinceId.TUCUMAN,
        name: "Tucumán",
        governmentPerception: 5,
        population: 1700000,
        ideology: "conservadora",
        mainResources: ["Azúcar", "Limón"]
      },
      {
        id: ProvinceId.SALTA,
        name: "Salta",
        governmentPerception: 0,
        population: 1400000,
        ideology: "conservadora",
        mainResources: ["Minería", "Turismo"]
      }
    ];

    // Agregar las demás provincias con valores neutros
    const allProvinces = Object.values(ProvinceId);
    const definedProvinces = new Set(provincesData.map(p => p.id));

    for (const provinceId of allProvinces) {
      if (!definedProvinces.has(provinceId)) {
        provincesData.push({
          id: provinceId,
          name: this.getProvinceName(provinceId),
          governmentPerception: 0,
          population: 500000, // Población promedio
          ideology: "conservadora",
          mainResources: ["Agricultura"]
        });
      }
    }

    // Inicializar el mapa
    for (const provinceData of provincesData) {
      this.provinces.set(provinceData.id, {
        ...provinceData,
        activeEvents: []
      });
    }
  }

  /**
   * Obtener nombre de provincia
   */
  private getProvinceName(provinceId: ProvinceId): string {
    const names: Record<ProvinceId, string> = {
      [ProvinceId.BUENOS_AIRES]: "Buenos Aires",
      [ProvinceId.CABA]: "CABA",
      [ProvinceId.CATAMARCA]: "Catamarca",
      [ProvinceId.CHACO]: "Chaco",
      [ProvinceId.CHUBUT]: "Chubut",
      [ProvinceId.CORDOBA]: "Córdoba",
      [ProvinceId.CORRIENTES]: "Corrientes",
      [ProvinceId.ENTRE_RIOS]: "Entre Ríos",
      [ProvinceId.FORMOSA]: "Formosa",
      [ProvinceId.JUJUY]: "Jujuy",
      [ProvinceId.LA_PAMPA]: "La Pampa",
      [ProvinceId.LA_RIOJA]: "La Rioja",
      [ProvinceId.MENDOZA]: "Mendoza",
      [ProvinceId.MISIONES]: "Misiones",
      [ProvinceId.NEUQUEN]: "Neuquén",
      [ProvinceId.RIO_NEGRO]: "Río Negro",
      [ProvinceId.SALTA]: "Salta",
      [ProvinceId.SAN_JUAN]: "San Juan",
      [ProvinceId.SAN_LUIS]: "San Luis",
      [ProvinceId.SANTA_CRUZ]: "Santa Cruz",
      [ProvinceId.SANTA_FE]: "Santa Fe",
      [ProvinceId.SANTIAGO_DEL_ESTERO]: "Santiago del Estero",
      [ProvinceId.TIERRA_DEL_FUEGO]: "Tierra del Fuego",
      [ProvinceId.TUCUMAN]: "Tucumán",
    };
    return names[provinceId] || provinceId;
  }

  /**
   * Aplicar efectos de una decisión política a las provincias
   */
  applyDecisionEffects(decision: DecisionResult, metrics: PoliticalMetrics): RegionalEffect[] {
    const effects: RegionalEffect[] = [];

    // Efectos base según métricas nacionales
    if (decision.choiceTitle?.includes("subsidio") || decision.choiceTitle?.includes("plan")) {
      // Decisiones de gasto social - mejor recepción en provincias populistas/pobres
      effects.push(...this.applyIdeologyBasedEffect("populista", 10, "Apoyo a planes sociales"));
      effects.push(...this.applyIdeologyBasedEffect("conservadora", -5, "Descontento por gasto público"));
    }

    if (decision.choiceTitle?.includes("mercado") || decision.choiceTitle?.includes("empresa")) {
      // Decisiones pro-mercado - mejor recepción en provincias liberales/ricas
      effects.push(...this.applyIdeologyBasedEffect("liberal", 8, "Apoyo a medidas pro-mercado"));
      effects.push(...this.applyIdeologyBasedEffect("populista", -8, "Rechazo a políticas neoliberales"));
    }

    if (decision.choiceTitle?.includes("seguridad") || decision.choiceTitle?.includes("policia")) {
      // Decisiones de seguridad - generalmente bien recibidas
      effects.push(...this.applyGeneralEffect(5, "Apoyo a medidas de seguridad", ["conservadora", "liberal"]));
    }

    // Efectos por crisis económica
    if (metrics.economia < 30) {
      effects.push(...this.applyGeneralEffect(-5, "Crisis económica afecta percepción"));
    }

    // Efectos por popularidad nacional
    if (metrics.popularidad > 70) {
      effects.push(...this.applyGeneralEffect(3, "Alta popularidad nacional"));
    } else if (metrics.popularidad < 30) {
      effects.push(...this.applyGeneralEffect(-3, "Baja popularidad nacional"));
    }

    // Aplicar efectos con propagación si son significativos
    for (const effect of effects) {
      if (Math.abs(effect.perceptionChange) > 10) {
        this.applyRegionalEffect(effect, true);
      } else {
        this.applyRegionalEffect(effect);
      }
    }

    return effects;
  }

  /**
   * Aplicar efecto basado en ideología
   */
  private applyIdeologyBasedEffect(targetIdeology: string, perceptionChange: number, description: string): RegionalEffect[] {
    const effects: RegionalEffect[] = [];

    for (const [provinceId, province] of this.provinces) {
      if (province.ideology === targetIdeology) {
        effects.push({
          provinceId,
          perceptionChange,
          description: `${description} (${province.name})`
        });
      }
    }

    return effects;
  }

  /**
   * Aplicar efecto general a ciertas ideologías
   */
  private applyGeneralEffect(
    perceptionChange: number,
    description: string,
    targetIdeologies?: string[]
  ): RegionalEffect[] {
    const effects: RegionalEffect[] = [];

    for (const [provinceId, province] of this.provinces) {
      if (!targetIdeologies || targetIdeologies.includes(province.ideology)) {
        effects.push({
          provinceId,
          perceptionChange,
          description: `${description} (${province.name})`
        });
      }
    }

    return effects;
  }

  /**
   * Aplicar un efecto regional específico
   */
  private applyRegionalEffect(effect: RegionalEffect, propagate: boolean = false) {
    const province = this.provinces.get(effect.provinceId);
    if (province) {
      province.governmentPerception += effect.perceptionChange;
      province.governmentPerception = Math.max(-100, Math.min(100, province.governmentPerception));
      if (propagate) {
        this.propagateEffects(effect.provinceId, effect.perceptionChange, effect.description);
      }
    }
  }

  /**
   * Método para propagar efectos entre provincias vecinas
   */
  private propagateEffects(provinceId: ProvinceId, baseChange: number, description: string, depth: number = 1) {
    if (depth > 3) return; // Limitar profundidad de propagación
    const neighbors = this.neighbors[provinceId] || [];
    neighbors.forEach(neighborId => {
      const effect = {
        provinceId: neighborId,
        perceptionChange: baseChange * 0.5, // 50% del efecto original
        description: `${description} (propagado desde ${provinceId})`
      };
      this.applyRegionalEffect(effect);
      // Propagación recursiva con profundidad limitada
      this.propagateEffects(neighborId, effect.perceptionChange, description, depth + 1);
    });
  }

  /**
   * Obtener provincias con percepción negativa crítica
   */
  getCriticalProvinces(): SimpleProvinceState[] {
    return Array.from(this.provinces.values())
      .filter(province => province.governmentPerception < -50)
      .sort((a, b) => a.governmentPerception - b.governmentPerception);
  }

  /**
   * Obtener provincias más leales
   */
  getLoyalProvinces(): SimpleProvinceState[] {
    return Array.from(this.provinces.values())
      .filter(province => province.governmentPerception > 30)
      .sort((a, b) => b.governmentPerception - a.governmentPerception);
  }

  /**
   * Calcular impacto nacional de las provincias
   */
  getNationalImpact(): {
    averagePerception: number;
    populationWeightedPerception: number;
    criticalProvincesCount: number;
    loyalProvincesCount: number;
  } {
    const provinces = Array.from(this.provinces.values());
    const totalPopulation = provinces.reduce((sum, p) => sum + p.population, 0);

    const averagePerception = provinces.reduce((sum, p) => sum + p.governmentPerception, 0) / provinces.length;

    const populationWeightedPerception = provinces.reduce(
      (sum, p) => sum + (p.governmentPerception * p.population), 0
    ) / totalPopulation;

    const criticalProvincesCount = provinces.filter(p => p.governmentPerception < -50).length;
    const loyalProvincesCount = provinces.filter(p => p.governmentPerception > 30).length;

    return {
      averagePerception,
      populationWeightedPerception,
      criticalProvincesCount,
      loyalProvincesCount
    };
  }

  /**
   * Obtener todas las provincias
   */
  getAllProvinces(): SimpleProvinceState[] {
    return Array.from(this.provinces.values());
  }

  /**
   * Obtener provincia específica
   */
  getProvince(provinceId: ProvinceId): SimpleProvinceState | undefined {
    return this.provinces.get(provinceId);
  }

  /**
   * Simular evento provincial específico
   */
  triggerProvinceEvent(provinceId: ProvinceId, eventDescription: string, perceptionChange: number) {
    const province = this.provinces.get(provinceId);
    if (province) {
      province.governmentPerception += perceptionChange;
      province.governmentPerception = Math.max(-100, Math.min(100, province.governmentPerception));
      province.activeEvents.push(eventDescription);

      // Limpiar eventos viejos (máximo 3)
      if (province.activeEvents.length > 3) {
        province.activeEvents = province.activeEvents.slice(-3);
      }
    }
  }

  /**
   * Reset del sistema
   */
  reset() {
    this.provinces.clear();
    this.initializeProvinces();
  }

  /**
   * Exportar estado actual para persistencia
   */
  exportState(): Record<string, SimpleProvinceState> {
    const state: Record<string, SimpleProvinceState> = {};
    for (const [key, value] of this.provinces) {
      state[key] = { ...value };
    }
    return state;
  }

  /**
   * Importar estado desde persistencia
   */
  importState(state: Record<string, SimpleProvinceState>) {
    this.provinces.clear();
    for (const [key, value] of Object.entries(state)) {
      this.provinces.set(key as ProvinceId, value);
    }
  }
}
