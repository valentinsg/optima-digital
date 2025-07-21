import { MetricType } from '@/types/political';

export interface CharacterWeakness {
  id: string;
  name: string;
  description: string;
  affectedMetrics: {
    metric: MetricType;
    modifier: number; // Cambio negativo en la métrica
    description: string;
  }[];
  triggerConditions?: {
    metricThreshold?: {
      metric: MetricType;
      value: number;
      operator: 'below' | 'above';
    };
    timeThreshold?: number; // Días en el poder
    eventTrigger?: string; // ID de evento específico
  };
  mitigationOptions?: {
    id: string;
    name: string;
    description: string;
    cost: Partial<Record<MetricType, number>>;
    effect: Partial<Record<MetricType, number>>;
  }[];
}

export const CHARACTER_WEAKNESSES: Record<string, CharacterWeakness[]> = {
  // Perfil: Populista Carismático
  'populista_carismatico': [
    {
      id: 'promesas_vacias',
      name: 'Promesas Vacías',
      description: 'Tu carisma te permite hacer promesas grandiosas, pero la realidad siempre te alcanza.',
      affectedMetrics: [
        {
          metric: MetricType.POPULARIDAD,
          modifier: -2,
          description: 'Descontento por promesas incumplidas'
        },
        {
          metric: MetricType.ECONOMIA,
          modifier: -1,
          description: 'Gastos populistas sin planificación'
        }
      ],
      triggerConditions: {
        timeThreshold: 30 // Se activa después de 30 días
      },
      mitigationOptions: [
        {
          id: 'cumplir_promesa',
          name: 'Cumplir una Promesa Importante',
          description: 'Cumple una promesa clave para recuperar confianza',
          cost: { economia: 5 },
          effect: { popularidad: 3 }
        }
      ]
    },
    {
      id: 'dependencia_medios',
      name: 'Dependencia de Medios',
      description: 'Tu popularidad depende demasiado de la exposición mediática.',
      affectedMetrics: [
        {
          metric: MetricType.CONTROL_MEDIOS,
          modifier: -3,
          description: 'Necesidad constante de atención mediática'
        }
      ],
      triggerConditions: {
        metricThreshold: {
          metric: MetricType.CONTROL_MEDIOS,
          value: 30,
          operator: 'below'
        }
      }
    }
  ],

  // Perfil: Liberal Pragmático
  'liberal_pragmatico': [
    {
      id: 'impopularidad_reformas',
      name: 'Impopularidad de Reformas',
      description: 'Las reformas necesarias son impopulares a corto plazo.',
      affectedMetrics: [
        {
          metric: MetricType.POPULARIDAD,
          modifier: -3,
          description: 'Resistencia a reformas impopulares'
        },
        {
          metric: MetricType.SEGURIDAD,
          modifier: -1,
          description: 'Protestas contra las reformas'
        }
      ],
      triggerConditions: {
        metricThreshold: {
          metric: MetricType.ECONOMIA,
          value: 70,
          operator: 'above'
        }
      },
      mitigationOptions: [
        {
          id: 'comunicacion_reformas',
          name: 'Mejorar Comunicación de Reformas',
          description: 'Explica mejor los beneficios de las reformas',
          cost: { controlMedios: 3 },
          effect: { popularidad: 2 }
        }
      ]
    },
    {
      id: 'presion_mercados',
      name: 'Presión de Mercados',
      description: 'Los mercados financieros te presionan constantemente.',
      affectedMetrics: [
        {
          metric: MetricType.RELACIONES_INTERNACIONALES,
          modifier: -2,
          description: 'Presión de mercados internacionales'
        }
      ],
      triggerConditions: {
        metricThreshold: {
          metric: MetricType.ECONOMIA,
          value: 40,
          operator: 'below'
        }
      }
    }
  ],

  // Perfil: Conservador Autoritario
  'conservador_autoritario': [
    {
      id: 'represion_creciente',
      name: 'Represión Creciente',
      description: 'Tu estilo autoritario genera más resistencia que control.',
      affectedMetrics: [
        {
          metric: MetricType.SEGURIDAD,
          modifier: -2,
          description: 'Resistencia a medidas autoritarias'
        },
        {
          metric: MetricType.POPULARIDAD,
          modifier: -3,
          description: 'Descontento por represión'
        }
      ],
      triggerConditions: {
        timeThreshold: 45
      },
      mitigationOptions: [
        {
          id: 'flexibilizar_medidas',
          name: 'Flexibilizar Medidas',
          description: 'Suaviza algunas medidas autoritarias',
          cost: { seguridad: 2 },
          effect: { popularidad: 2 }
        }
      ]
    },
    {
      id: 'aislamiento_internacional',
      name: 'Aislamiento Internacional',
      description: 'Tu estilo autoritario te aísla de la comunidad internacional.',
      affectedMetrics: [
        {
          metric: MetricType.RELACIONES_INTERNACIONALES,
          modifier: -3,
          description: 'Condena internacional por autoritarismo'
        }
      ],
      triggerConditions: {
        metricThreshold: {
          metric: MetricType.SEGURIDAD,
          value: 80,
          operator: 'above'
        }
      }
    }
  ],

  // Perfil: Progresista Idealista
  'progresista_idealista': [
    {
      id: 'realidad_vs_idealismo',
      name: 'Realidad vs Idealismo',
      description: 'Tus ideales chocan con la realidad política y económica.',
      affectedMetrics: [
        {
          metric: MetricType.ECONOMIA,
          modifier: -2,
          description: 'Costos de políticas idealistas'
        },
        {
          metric: MetricType.CORRUPCION,
          modifier: 2,
          description: 'Necesidad de compromisos políticos'
        }
      ],
      triggerConditions: {
        timeThreshold: 60
      },
      mitigationOptions: [
        {
          id: 'pragmatismo_progresista',
          name: 'Adoptar Pragmatismo Progresista',
          description: 'Equilibra ideales con realidad política',
          cost: { popularidad: 2 },
          effect: { economia: 2, corrupcion: -1 }
        }
      ]
    },
    {
      id: 'resistencia_establecimiento',
      name: 'Resistencia del Establecimiento',
      description: 'El establishment político se resiste a tus reformas progresistas.',
      affectedMetrics: [
        {
          metric: MetricType.CORRUPCION,
          modifier: 3,
          description: 'Resistencia del establishment'
        }
      ],
      triggerConditions: {
        metricThreshold: {
          metric: MetricType.POPULARIDAD,
          value: 60,
          operator: 'above'
        }
      }
    }
  ],

  // Perfil: Anarquista Caótico
  'anarquista_caotico': [
    {
      id: 'caos_creciente',
      name: 'Caos Creciente',
      description: 'Tu estilo caótico genera más caos del que puedes controlar.',
      affectedMetrics: [
        {
          metric: MetricType.SEGURIDAD,
          modifier: -4,
          description: 'Caos generalizado'
        },
        {
          metric: MetricType.ECONOMIA,
          modifier: -3,
          description: 'Inestabilidad económica'
        }
      ],
      triggerConditions: {
        timeThreshold: 20
      },
      mitigationOptions: [
        {
          id: 'control_caos',
          name: 'Intentar Controlar el Caos',
          description: 'Aplica algo de orden al caos',
          cost: { popularidad: 3 },
          effect: { seguridad: 2, economia: 1 }
        }
      ]
    },
    {
      id: 'rechazo_sistema',
      name: 'Rechazo del Sistema',
      description: 'El sistema político te rechaza por tu naturaleza anarquista.',
      affectedMetrics: [
        {
          metric: MetricType.CORRUPCION,
          modifier: 4,
          description: 'Rechazo total del sistema'
        },
        {
          metric: MetricType.RELACIONES_INTERNACIONALES,
          modifier: -3,
          description: 'Aislamiento internacional'
        }
      ],
      triggerConditions: {
        metricThreshold: {
          metric: MetricType.SEGURIDAD,
          value: 20,
          operator: 'below'
        }
      }
    }
  ]
};

/**
 * Obtiene las debilidades inherentes de un personaje
 */
export const getCharacterWeaknesses = (characterId: string): CharacterWeakness[] => {
  return CHARACTER_WEAKNESSES[characterId] || [];
};

/**
 * Verifica si una debilidad se debe activar
 */
export const shouldActivateWeakness = (
  weakness: CharacterWeakness,
  metrics: Record<MetricType, number>,
  daysInPower: number,
  completedEvents: string[]
): boolean => {
  if (!weakness.triggerConditions) return true;

  const { metricThreshold, timeThreshold, eventTrigger } = weakness.triggerConditions;

  if (metricThreshold) {
    const currentValue = metrics[metricThreshold.metric];
    if (metricThreshold.operator === 'below' && currentValue >= metricThreshold.value) {
      return false;
    }
    if (metricThreshold.operator === 'above' && currentValue <= metricThreshold.value) {
      return false;
    }
  }

  if (timeThreshold && daysInPower < timeThreshold) {
    return false;
  }

  if (eventTrigger && !completedEvents.includes(eventTrigger)) {
    return false;
  }

  return true;
};

/**
 * Aplica los efectos de una debilidad activa
 */
export const applyWeaknessEffects = (
  weakness: CharacterWeakness,
  metrics: Record<MetricType, number>
): Record<MetricType, number> => {
  const newMetrics = { ...metrics };

  weakness.affectedMetrics.forEach(({ metric, modifier }) => {
    newMetrics[metric] = Math.max(0, Math.min(100, newMetrics[metric] + modifier));
  });

  return newMetrics;
};
