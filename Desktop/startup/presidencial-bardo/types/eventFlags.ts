import { FactionId, MetricType, ProvinceId } from './political';

/**
 * Tipos de banderas del sistema
 */
export enum FlagType {
  DECISION = 'decision',           // Banderas de decisiones tomadas
  EVENT = 'event',                 // Banderas de eventos completados
  METRIC = 'metric',               // Banderas de umbrales de métricas
  TIME = 'time',                   // Banderas de tiempo transcurrido
  FACTION = 'faction',             // Banderas de relaciones con facciones
  PROVINCE = 'province',           // Banderas de estados provinciales
  ACHIEVEMENT = 'achievement',     // Banderas de logros
  CRISIS = 'crisis'                // Banderas de crisis
}

/**
 * Banderas del sistema de eventos
 */
export interface GameFlag {
  id: string;
  type: FlagType;
  name: string;
  description: string;
  isActive: boolean;
  timestamp: number;
  metadata?: Record<string, any>;
  conditions?: FlagCondition[];
  effects?: FlagEffect[];
}

/**
 * Condiciones para activar una bandera
 */
export interface FlagCondition {
  type: 'metric_threshold' | 'time_elapsed' | 'event_completed' | 'decision_made' | 'faction_relation' | 'province_state';
  data: {
    // Para metric_threshold
    metric?: MetricType;
    value?: number;
    operator?: 'above' | 'below' | 'equals';

    // Para time_elapsed
    days?: number;

    // Para event_completed
    eventId?: string;

    // Para decision_made
    decisionId?: string;

    // Para faction_relation
    factionId?: FactionId;
    relationValue?: number;
    relationOperator?: 'above' | 'below';

    // Para province_state
    provinceId?: ProvinceId;
    stateValue?: string;
  };
}

/**
 * Efectos de una bandera activa
 */
export interface FlagEffect {
  type: 'unlock_event' | 'modify_metric' | 'change_probability' | 'trigger_crisis' | 'unlock_achievement';
  data: {
    // Para unlock_event
    eventId?: string;

    // Para modify_metric
    metric?: MetricType;
    modifier?: number;

    // Para change_probability
    eventCategory?: string;
    probabilityMultiplier?: number;

    // Para trigger_crisis
    crisisType?: string;
    intensity?: number;

    // Para unlock_achievement
    achievementId?: string;
  };
}

/**
 * Cadenas de eventos predefinidas
 */
export interface EventChain {
  id: string;
  name: string;
  description: string;
  flags: GameFlag[];
  events: string[]; // IDs de eventos en orden
  currentStep: number;
  isActive: boolean;
  isCompleted: boolean;
  requirements: {
    minFlags?: string[];
    maxFlags?: string[];
    minMetrics?: Partial<Record<MetricType, number>>;
    maxMetrics?: Partial<Record<MetricType, number>>;
  };
}

/**
 * Banderas predefinidas del sistema
 */
export const SYSTEM_FLAGS: GameFlag[] = [
  // Banderas de decisiones importantes
  {
    id: 'decision_austerity_measures',
    type: FlagType.DECISION,
    name: 'Medidas de Austeridad',
    description: 'Se implementaron medidas de austeridad económica',
    isActive: false,
    timestamp: 0,
    conditions: [
      {
        type: 'decision_made',
        data: { decisionId: 'austerity_package' }
      }
    ],
    effects: [
      {
        type: 'modify_metric',
        data: { metric: MetricType.ECONOMIA, modifier: 5 }
      },
      {
        type: 'modify_metric',
        data: { metric: MetricType.POPULARIDAD, modifier: -3 }
      }
    ]
  },
  {
    id: 'decision_social_spending',
    type: FlagType.DECISION,
    name: 'Gasto Social',
    description: 'Se aumentó el gasto social',
    isActive: false,
    timestamp: 0,
    conditions: [
      {
        type: 'decision_made',
        data: { decisionId: 'social_package' }
      }
    ],
    effects: [
      {
        type: 'modify_metric',
        data: { metric: MetricType.POPULARIDAD, modifier: 3 }
      },
      {
        type: 'modify_metric',
        data: { metric: MetricType.ECONOMIA, modifier: -2 }
      }
    ]
  },
  {
    id: 'decision_military_intervention',
    type: FlagType.DECISION,
    name: 'Intervención Militar',
    description: 'Se ordenó una intervención militar',
    isActive: false,
    timestamp: 0,
    conditions: [
      {
        type: 'decision_made',
        data: { decisionId: 'military_action' }
      }
    ],
    effects: [
      {
        type: 'modify_metric',
        data: { metric: MetricType.SEGURIDAD, modifier: 4 }
      },
      {
        type: 'modify_metric',
        data: { metric: MetricType.POPULARIDAD, modifier: -2 }
      },
      {
        type: 'modify_metric',
        data: { metric: MetricType.RELACIONES_INTERNACIONALES, modifier: -1 }
      }
    ]
  },

  // Banderas de eventos críticos
  {
    id: 'event_economic_crisis',
    type: FlagType.EVENT,
    name: 'Crisis Económica',
    description: 'Se desató una crisis económica',
    isActive: false,
    timestamp: 0,
    conditions: [
      {
        type: 'event_completed',
        data: { eventId: 'economic_collapse' }
      }
    ],
    effects: [
      {
        type: 'modify_metric',
        data: { metric: MetricType.ECONOMIA, modifier: -10 }
      },
      {
        type: 'modify_metric',
        data: { metric: MetricType.POPULARIDAD, modifier: -5 }
      },
      {
        type: 'change_probability',
        data: { eventCategory: 'crisis', probabilityMultiplier: 2.0 }
      }
    ]
  },
  {
    id: 'event_social_unrest',
    type: FlagType.EVENT,
    name: 'Agitación Social',
    description: 'Hay agitación social generalizada',
    isActive: false,
    timestamp: 0,
    conditions: [
      {
        type: 'event_completed',
        data: { eventId: 'mass_protests' }
      }
    ],
    effects: [
      {
        type: 'modify_metric',
        data: { metric: MetricType.SEGURIDAD, modifier: -3 }
      },
      {
        type: 'modify_metric',
        data: { metric: MetricType.POPULARIDAD, modifier: -2 }
      }
    ]
  },

  // Banderas de métricas críticas
  {
    id: 'metric_economy_critical',
    type: FlagType.METRIC,
    name: 'Economía Crítica',
    description: 'La economía está en estado crítico',
    isActive: false,
    timestamp: 0,
    conditions: [
      {
        type: 'metric_threshold',
        data: { metric: MetricType.ECONOMIA, value: 20, operator: 'below' }
      }
    ],
    effects: [
      {
        type: 'change_probability',
        data: { eventCategory: 'crisis', probabilityMultiplier: 1.5 }
      },
      {
        type: 'unlock_event',
        data: { eventId: 'emergency_economic_measures' }
      }
    ]
  },
  {
    id: 'metric_popularity_high',
    type: FlagType.METRIC,
    name: 'Alta Popularidad',
    description: 'La popularidad está en niveles altos',
    isActive: false,
    timestamp: 0,
    conditions: [
      {
        type: 'metric_threshold',
        data: { metric: MetricType.POPULARIDAD, value: 80, operator: 'above' }
      }
    ],
    effects: [
      {
        type: 'modify_metric',
        data: { metric: MetricType.SEGURIDAD, modifier: 1 }
      },
      {
        type: 'unlock_event',
        data: { eventId: 'popularity_celebration' }
      }
    ]
  },

  // Banderas de tiempo
  {
    id: 'time_first_month',
    type: FlagType.TIME,
    name: 'Primer Mes',
    description: 'Ha pasado el primer mes en el poder',
    isActive: false,
    timestamp: 0,
    conditions: [
      {
        type: 'time_elapsed',
        data: { days: 30 }
      }
    ],
    effects: [
      {
        type: 'unlock_event',
        data: { eventId: 'first_month_review' }
      }
    ]
  },
  {
    id: 'time_first_year',
    type: FlagType.TIME,
    name: 'Primer Año',
    description: 'Ha pasado el primer año en el poder',
    isActive: false,
    timestamp: 0,
    conditions: [
      {
        type: 'time_elapsed',
        data: { days: 365 }
      }
    ],
    effects: [
      {
        type: 'unlock_event',
        data: { eventId: 'annual_review' }
      },
      {
        type: 'unlock_achievement',
        data: { achievementId: 'survived_first_year' }
      }
    ]
  },

  // Banderas de facciones
  {
    id: 'faction_military_support',
    type: FlagType.FACTION,
    name: 'Apoyo Militar',
    description: 'Los militares apoyan al gobierno',
    isActive: false,
    timestamp: 0,
    conditions: [
      {
        type: 'faction_relation',
        data: { factionId: FactionId.MILITARES, relationValue: 50, relationOperator: 'above' }
      }
    ],
    effects: [
      {
        type: 'modify_metric',
        data: { metric: MetricType.SEGURIDAD, modifier: 2 }
      }
    ]
  },
  {
    id: 'faction_business_opposition',
    type: FlagType.FACTION,
    name: 'Oposición Empresarial',
    description: 'Los empresarios se oponen al gobierno',
    isActive: false,
    timestamp: 0,
    conditions: [
      {
        type: 'faction_relation',
        data: { factionId: FactionId.EMPRESARIOS, relationValue: -30, relationOperator: 'below' }
      }
    ],
    effects: [
      {
        type: 'modify_metric',
        data: { metric: MetricType.ECONOMIA, modifier: -2 }
      },
      {
        type: 'change_probability',
        data: { eventCategory: 'economic', probabilityMultiplier: 1.3 }
      }
    ]
  }
];

/**
 * Cadenas de eventos predefinidas
 */
export const EVENT_CHAINS: EventChain[] = [
  {
    id: 'economic_crisis_chain',
    name: 'Cadena de Crisis Económica',
    description: 'Una serie de eventos que desencadenan una crisis económica',
    flags: [],
    events: [
      'market_crash',
      'banking_crisis',
      'currency_devaluation',
      'hyperinflation',
      'economic_collapse'
    ],
    currentStep: 0,
    isActive: false,
    isCompleted: false,
    requirements: {
      minMetrics: { economia: 40 }
    }
  },
  {
    id: 'social_revolution_chain',
    name: 'Cadena de Revolución Social',
    description: 'Una serie de eventos que desencadenan una revolución social',
    flags: [],
    events: [
      'mass_protests',
      'general_strike',
      'government_building_occupation',
      'military_defection',
      'revolution'
    ],
    currentStep: 0,
    isActive: false,
    isCompleted: false,
    requirements: {
      minMetrics: { popularidad: 20 }
    }
  },
  {
    id: 'corruption_scandal_chain',
    name: 'Cadena de Escándalo de Corrupción',
    description: 'Una serie de eventos relacionados con corrupción',
    flags: [],
    events: [
      'corruption_allegations',
      'investigation_launched',
      'evidence_found',
      'resignations_begin',
      'full_scandal_exposed'
    ],
    currentStep: 0,
    isActive: false,
    isCompleted: false,
    requirements: {
      minMetrics: { corrupcion: 60 }
    }
  }
];

/**
 * Gestor de banderas del sistema
 */
export class FlagManager {
  private flags: Map<string, GameFlag> = new Map();
  private eventChains: Map<string, EventChain> = new Map();

  constructor() {
    // Inicializar banderas del sistema
    SYSTEM_FLAGS.forEach(flag => {
      this.flags.set(flag.id, { ...flag });
    });

    // Inicializar cadenas de eventos
    EVENT_CHAINS.forEach(chain => {
      this.eventChains.set(chain.id, { ...chain });
    });
  }

  /**
   * Activa una bandera
   */
  activateFlag(flagId: string, metadata?: Record<string, any>): boolean {
    const flag = this.flags.get(flagId);
    if (!flag || flag.isActive) return false;

    flag.isActive = true;
    flag.timestamp = Date.now();
    if (metadata) {
      flag.metadata = { ...flag.metadata, ...metadata };
    }

    return true;
  }

  /**
   * Desactiva una bandera
   */
  deactivateFlag(flagId: string): boolean {
    const flag = this.flags.get(flagId);
    if (!flag || !flag.isActive) return false;

    flag.isActive = false;
    return true;
  }

  /**
   * Verifica si una bandera está activa
   */
  isFlagActive(flagId: string): boolean {
    const flag = this.flags.get(flagId);
    return flag?.isActive || false;
  }

  /**
   * Obtiene todas las banderas activas
   */
  getActiveFlags(): GameFlag[] {
    return Array.from(this.flags.values()).filter(flag => flag.isActive);
  }

  /**
   * Obtiene banderas por tipo
   */
  getFlagsByType(type: FlagType): GameFlag[] {
    return Array.from(this.flags.values()).filter(flag => flag.type === type);
  }

  /**
   * Inicia una cadena de eventos
   */
  startEventChain(chainId: string): boolean {
    const chain = this.eventChains.get(chainId);
    if (!chain || chain.isActive) return false;

    chain.isActive = true;
    chain.currentStep = 0;
    return true;
  }

  /**
   * Avanza una cadena de eventos
   */
  advanceEventChain(chainId: string): string | null {
    const chain = this.eventChains.get(chainId);
    if (!chain || !chain.isActive || chain.isCompleted) return null;

    chain.currentStep++;
    if (chain.currentStep >= chain.events.length) {
      chain.isCompleted = true;
      chain.isActive = false;
      return null;
    }

    return chain.events[chain.currentStep];
  }

  /**
   * Obtiene las cadenas de eventos activas
   */
  getActiveEventChains(): EventChain[] {
    return Array.from(this.eventChains.values()).filter(chain => chain.isActive);
  }

  /**
   * Verifica condiciones de banderas basadas en el estado actual del juego
   */
  checkFlagConditions(
    metrics: Record<MetricType, number>,
    daysInPower: number,
    completedEvents: string[],
    decisions: string[],
    factionRelations: Record<FactionId, number>
  ): void {
    this.flags.forEach(flag => {
      if (flag.isActive || !flag.conditions) return;

      const shouldActivate = flag.conditions.every(condition => {
        switch (condition.type) {
          case 'metric_threshold':
            if (!condition.data.metric || condition.data.value === undefined) return false;
            const metricValue = metrics[condition.data.metric];
            switch (condition.data.operator) {
              case 'above': return metricValue > condition.data.value;
              case 'below': return metricValue < condition.data.value;
              case 'equals': return metricValue === condition.data.value;
              default: return false;
            }

          case 'time_elapsed':
            if (!condition.data.days) return false;
            return daysInPower >= condition.data.days;

          case 'event_completed':
            if (!condition.data.eventId) return false;
            return completedEvents.includes(condition.data.eventId);

          case 'decision_made':
            if (!condition.data.decisionId) return false;
            return decisions.includes(condition.data.decisionId);

          case 'faction_relation':
            if (!condition.data.factionId || condition.data.relationValue === undefined) return false;
            const relationValue = factionRelations[condition.data.factionId];
            switch (condition.data.relationOperator) {
              case 'above': return relationValue > condition.data.relationValue;
              case 'below': return relationValue < condition.data.relationValue;
              default: return false;
            }

          default:
            return false;
        }
      });

      if (shouldActivate) {
        this.activateFlag(flag.id);
      }
    });
  }

  /**
   * Aplica los efectos de las banderas activas
   */
  applyFlagEffects(): {
    metricModifiers: Partial<Record<MetricType, number>>;
    unlockedEvents: string[];
    probabilityModifiers: Record<string, number>;
  } {
    const metricModifiers: Partial<Record<MetricType, number>> = {};
    const unlockedEvents: string[] = [];
    const probabilityModifiers: Record<string, number> = {};

    this.getActiveFlags().forEach(flag => {
      flag.effects?.forEach(effect => {
        switch (effect.type) {
          case 'modify_metric':
            if (effect.data.metric && effect.data.modifier) {
              metricModifiers[effect.data.metric] = (metricModifiers[effect.data.metric] || 0) + effect.data.modifier;
            }
            break;

          case 'unlock_event':
            if (effect.data.eventId) {
              unlockedEvents.push(effect.data.eventId);
            }
            break;

          case 'change_probability':
            if (effect.data.eventCategory && effect.data.probabilityMultiplier) {
              probabilityModifiers[effect.data.eventCategory] = effect.data.probabilityMultiplier;
            }
            break;
        }
      });
    });

    return { metricModifiers, unlockedEvents, probabilityModifiers };
  }
}
