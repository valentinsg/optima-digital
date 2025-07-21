import { MetricType, ProvinceId } from './political';

/**
 * Estados sociales de las provincias
 */
export enum SocialState {
  CALM = 'calm',           // Calma - Estado normal
  TENSE = 'tense',         // Tensión - Primer nivel de descontento
  AGITATED = 'agitated',   // Agitación - Segundo nivel de descontento
  REBELLIOUS = 'rebellious', // Rebelión - Tercer nivel de descontento
  REVOLUTIONARY = 'revolutionary' // Revolucionario - Estado crítico
}

/**
 * Tipos de eventos sociales
 */
export enum SocialEventType {
  PROTEST = 'protest',           // Protesta pacífica
  STRIKE = 'strike',             // Huelga
  RIOT = 'riot',                 // Disturbios
  BLOCKADE = 'blockade',         // Bloqueo de rutas
  OCCUPATION = 'occupation',     // Ocupación de edificios
  REBELLION = 'rebellion',       // Rebelión armada
  SECESSION = 'secession'        // Intento de secesión
}

/**
 * Evento social en una provincia
 */
export interface SocialEvent {
  id: string;
  type: SocialEventType;
  title: string;
  description: string;
  provinceId: ProvinceId;
  intensity: number; // 1-10
  duration: number; // Días que dura
  effects: {
    nationalMetrics: Partial<Record<MetricType, number>>;
    provincialEffects: {
      loyalty: number;
      discontent: number;
      economicLevel: number;
    };
  };
  requirements: {
    minDiscontent: number;
    maxLoyalty: number;
    minSocialState: SocialState;
  };
  resolutionOptions: {
    id: string;
    name: string;
    description: string;
    effects: {
      nationalMetrics: Partial<Record<MetricType, number>>;
      provincialEffects: {
        loyalty: number;
        discontent: number;
      };
    };
    requirements?: {
      minMetrics?: Partial<Record<MetricType, number>>;
      maxMetrics?: Partial<Record<MetricType, number>>;
    };
  }[];
}

/**
 * Estado social de una provincia
 */
export interface ProvinceSocialState {
  provinceId: ProvinceId;
  currentState: SocialState;
  discontent: number; // 0-100
  loyalty: number; // 0-100
  activeEvents: SocialEvent[];
  lastMajorEvent?: {
    type: SocialEventType;
    timestamp: number;
    resolved: boolean;
  };
  socialHistory: {
    state: SocialState;
    timestamp: number;
    trigger?: string;
  }[];
  rebellionLevel: number; // 0-100, aumenta con eventos sociales
  economicImpact: number; // -100 a +100, impacto en la economía provincial
}

/**
 * Condiciones para cambios de estado social
 */
export const SOCIAL_STATE_TRANSITIONS: Record<SocialState, {
  nextStates: SocialState[];
  conditions: {
    discontent: { min: number; max?: number };
    loyalty: { min?: number; max: number };
    rebellionLevel: { min?: number; max?: number };
  };
  effects: {
    nationalMetrics: Partial<Record<MetricType, number>>;
    provincialEffects: {
      loyalty: number;
      discontent: number;
      economicLevel: number;
    };
  };
}> = {
  [SocialState.CALM]: {
    nextStates: [SocialState.TENSE],
    conditions: {
      discontent: { min: 30 },
      loyalty: { max: 70 },
      rebellionLevel: { max: 20 }
    },
    effects: {
      nationalMetrics: {},
      provincialEffects: { loyalty: 0, discontent: 0, economicLevel: 0 }
    }
  },
  [SocialState.TENSE]: {
    nextStates: [SocialState.CALM, SocialState.AGITATED],
    conditions: {
      discontent: { min: 50, max: 70 },
      loyalty: { max: 50 },
      rebellionLevel: { min: 20, max: 40 }
    },
    effects: {
      nationalMetrics: { popularidad: -1, seguridad: -1 },
      provincialEffects: { loyalty: -2, discontent: 1, economicLevel: -1 }
    }
  },
  [SocialState.AGITATED]: {
    nextStates: [SocialState.TENSE, SocialState.REBELLIOUS],
    conditions: {
      discontent: { min: 70, max: 85 },
      loyalty: { max: 30 },
      rebellionLevel: { min: 40, max: 70 }
    },
    effects: {
      nationalMetrics: { popularidad: -2, seguridad: -2, economia: -1 },
      provincialEffects: { loyalty: -3, discontent: 2, economicLevel: -2 }
    }
  },
  [SocialState.REBELLIOUS]: {
    nextStates: [SocialState.AGITATED, SocialState.REVOLUTIONARY],
    conditions: {
      discontent: { min: 85, max: 95 },
      loyalty: { max: 15 },
      rebellionLevel: { min: 70, max: 90 }
    },
    effects: {
      nationalMetrics: { popularidad: -3, seguridad: -4, economia: -2 },
      provincialEffects: { loyalty: -5, discontent: 3, economicLevel: -3 }
    }
  },
  [SocialState.REVOLUTIONARY]: {
    nextStates: [SocialState.REBELLIOUS],
    conditions: {
      discontent: { min: 95 },
      loyalty: { max: 5 },
      rebellionLevel: { min: 90 }
    },
    effects: {
      nationalMetrics: { popularidad: -5, seguridad: -6, economia: -3 },
      provincialEffects: { loyalty: -8, discontent: 5, economicLevel: -5 }
    }
  }
};

/**
 * Eventos sociales predefinidos
 */
export const SOCIAL_EVENTS: SocialEvent[] = [
  {
    id: 'protesta_economica',
    type: SocialEventType.PROTEST,
    title: 'Protesta Económica',
    description: 'Manifestantes protestan contra la situación económica en la provincia.',
    provinceId: ProvinceId.BUENOS_AIRES,
    intensity: 3,
    duration: 2,
    effects: {
      nationalMetrics: { popularidad: -1, economia: -1 },
      provincialEffects: { loyalty: -2, discontent: 3, economicLevel: -1 }
    },
    requirements: {
      minDiscontent: 40,
      maxLoyalty: 60,
      minSocialState: SocialState.TENSE
    },
    resolutionOptions: [
      {
        id: 'dialogo_manifestantes',
        name: 'Diálogo con Manifestantes',
        description: 'Abrir canales de diálogo con los manifestantes',
        effects: {
          nationalMetrics: { popularidad: 1 },
          provincialEffects: { loyalty: 1, discontent: -2 }
        }
      },
      {
        id: 'represion_policial',
        name: 'Represión Policial',
        description: 'Usar la fuerza policial para dispersar la protesta',
        effects: {
          nationalMetrics: { seguridad: 1, popularidad: -2 },
          provincialEffects: { loyalty: -3, discontent: 2 }
        }
      }
    ]
  },
  {
    id: 'huelga_general',
    type: SocialEventType.STRIKE,
    title: 'Huelga General',
    description: 'Los sindicatos convocan una huelga general en la provincia.',
    provinceId: ProvinceId.CORDOBA,
    intensity: 6,
    duration: 3,
    effects: {
      nationalMetrics: { economia: -2, popularidad: -1 },
      provincialEffects: { loyalty: -3, discontent: 4, economicLevel: -2 }
    },
    requirements: {
      minDiscontent: 60,
      maxLoyalty: 40,
      minSocialState: SocialState.AGITATED
    },
    resolutionOptions: [
      {
        id: 'negociacion_sindical',
        name: 'Negociación Sindical',
        description: 'Negociar con los sindicatos para resolver la huelga',
        effects: {
          nationalMetrics: { popularidad: 2, economia: 1 },
          provincialEffects: { loyalty: 2, discontent: -3 }
        },
        requirements: { minMetrics: { economia: 30 } }
      },
      {
        id: 'decreto_emergencia',
        name: 'Decreto de Emergencia',
        description: 'Declarar estado de emergencia y forzar el fin de la huelga',
        effects: {
          nationalMetrics: { seguridad: 2, popularidad: -3 },
          provincialEffects: { loyalty: -5, discontent: 3 }
        }
      }
    ]
  },
  {
    id: 'disturbios_urbanos',
    type: SocialEventType.RIOT,
    title: 'Disturbios Urbanos',
    description: 'Violentos disturbios estallan en las calles de la provincia.',
    provinceId: ProvinceId.SANTA_FE,
    intensity: 8,
    duration: 1,
    effects: {
      nationalMetrics: { seguridad: -3, popularidad: -2, economia: -1 },
      provincialEffects: { loyalty: -4, discontent: 5, economicLevel: -2 }
    },
    requirements: {
      minDiscontent: 80,
      maxLoyalty: 20,
      minSocialState: SocialState.REBELLIOUS
    },
    resolutionOptions: [
      {
        id: 'intervencion_militar',
        name: 'Intervención Militar',
        description: 'Enviar fuerzas militares para restaurar el orden',
        effects: {
          nationalMetrics: { seguridad: 3, popularidad: -4 },
          provincialEffects: { loyalty: -6, discontent: 2 }
        }
      },
      {
        id: 'amnistia_general',
        name: 'Amnistía General',
        description: 'Declarar amnistía para calmar los ánimos',
        effects: {
          nationalMetrics: { popularidad: 3, seguridad: -2 },
          provincialEffects: { loyalty: 3, discontent: -4 }
        }
      }
    ]
  },
  {
    id: 'bloqueo_rutas',
    type: SocialEventType.BLOCKADE,
    title: 'Bloqueo de Rutas',
    description: 'Manifestantes bloquean las principales rutas de la provincia.',
    provinceId: ProvinceId.MENDOZA,
    intensity: 5,
    duration: 2,
    effects: {
      nationalMetrics: { economia: -2, seguridad: -1 },
      provincialEffects: { loyalty: -2, discontent: 3, economicLevel: -3 }
    },
    requirements: {
      minDiscontent: 50,
      maxLoyalty: 50,
      minSocialState: SocialState.AGITATED
    },
    resolutionOptions: [
      {
        id: 'desbloqueo_policial',
        name: 'Desbloqueo Policial',
        description: 'Usar la policía para desbloquear las rutas',
        effects: {
          nationalMetrics: { seguridad: 2, popularidad: -1 },
          provincialEffects: { loyalty: -2, discontent: 1 }
        }
      },
      {
        id: 'concesiones_economicas',
        name: 'Concesiones Económicas',
        description: 'Hacer concesiones económicas para levantar el bloqueo',
        effects: {
          nationalMetrics: { popularidad: 2, economia: -2 },
          provincialEffects: { loyalty: 2, discontent: -2 }
        }
      }
    ]
  },
  {
    id: 'ocupacion_edificios',
    type: SocialEventType.OCCUPATION,
    title: 'Ocupación de Edificios Públicos',
    description: 'Manifestantes ocupan edificios gubernamentales en la provincia.',
    provinceId: ProvinceId.TUCUMAN,
    intensity: 7,
    duration: 2,
    effects: {
      nationalMetrics: { seguridad: -2, popularidad: -2 },
      provincialEffects: { loyalty: -3, discontent: 4, economicLevel: -1 }
    },
    requirements: {
      minDiscontent: 70,
      maxLoyalty: 30,
      minSocialState: SocialState.REBELLIOUS
    },
    resolutionOptions: [
      {
        id: 'desalojo_fuerza',
        name: 'Desalojo por la Fuerza',
        description: 'Desalojar los edificios usando la fuerza',
        effects: {
          nationalMetrics: { seguridad: 3, popularidad: -3 },
          provincialEffects: { loyalty: -4, discontent: 2 }
        }
      },
      {
        id: 'negociacion_ocupantes',
        name: 'Negociación con Ocupantes',
        description: 'Negociar con los ocupantes para que se retiren pacíficamente',
        effects: {
          nationalMetrics: { popularidad: 2, seguridad: -1 },
          provincialEffects: { loyalty: 2, discontent: -3 }
        }
      }
    ]
  }
];

/**
 * Obtiene eventos sociales disponibles para una provincia
 */
export const getAvailableSocialEvents = (
  provinceId: ProvinceId,
  socialState: ProvinceSocialState
): SocialEvent[] => {
  return SOCIAL_EVENTS.filter(event =>
    event.provinceId === provinceId &&
    event.requirements.minDiscontent <= socialState.discontent &&
    event.requirements.maxLoyalty >= socialState.loyalty &&
    event.requirements.minSocialState <= socialState.currentState
  );
};

/**
 * Calcula el próximo estado social basado en las condiciones actuales
 */
export const calculateNextSocialState = (
  currentState: SocialState,
  discontent: number,
  loyalty: number,
  rebellionLevel: number
): SocialState | null => {
  const transitions = SOCIAL_STATE_TRANSITIONS[currentState];

  for (const nextState of transitions.nextStates) {
    const nextTransitions = SOCIAL_STATE_TRANSITIONS[nextState];
    const conditions = nextTransitions.conditions;

    if (
      discontent >= conditions.discontent.min &&
      (!conditions.discontent.max || discontent <= conditions.discontent.max) &&
      (!conditions.loyalty.min || loyalty >= conditions.loyalty.min) &&
      loyalty <= conditions.loyalty.max &&
      (!conditions.rebellionLevel.min || rebellionLevel >= conditions.rebellionLevel.min) &&
      (!conditions.rebellionLevel.max || rebellionLevel <= conditions.rebellionLevel.max)
    ) {
      return nextState;
    }
  }

  return null;
};
