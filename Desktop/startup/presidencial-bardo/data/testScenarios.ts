import { AutomatedTestBatch, TestScenario } from '@/types/political';
import { ALL_POLITICAL_EVENTS } from './events/politicalEvents';

// ESCENARIOS PREDEFINIDOS SIMPLIFICADOS
export const testScenarios: TestScenario[] = [
  {
    id: 'crisis-total',
    name: '🔥 Crisis Total',
    description: 'Todas las métricas en estado crítico. El país está al borde del colapso.',
    initialMetrics: {
      popularidad: 15,
      economia: 10,
      seguridad: 20,
      relacionesInternacionales: 25,
      corrupcion: 85,
      controlMedios: 30,
      salud: 25,
      tecnologia: 20
    },
    initialProvinceStates: {},
    initialFactionStates: {},
    expectedOutcomes: [
      'Múltiples provincias en rebelión',
      'Posible golpe de estado',
      'Violencia de barras descontrolada',
      'Hiperinflación económica',
      'Aislamiento internacional'
    ],
    testEvents: ALL_POLITICAL_EVENTS.slice(0, 10)
  },

  {
    id: 'presidente-popular',
    name: '⭐ Presidente Popular',
    description: 'Alta popularidad pero economía frágil. El pueblo te ama pero las cuentas no cierran.',
    initialMetrics: {
      popularidad: 85,
      economia: 25,
      seguridad: 70,
      relacionesInternacionales: 60,
      corrupcion: 40,
      controlMedios: 75,
      salud: 65,
      tecnologia: 55
    },
    initialProvinceStates: {},
    initialFactionStates: {},
    expectedOutcomes: [
      'Presión empresarial por medidas económicas',
      'Riesgo de crisis financiera',
      'Apoyo masivo en protestas',
      'Tensión con organismos internacionales',
      'Posible populismo extremo'
    ],
    testEvents: ALL_POLITICAL_EVENTS.slice(5, 15)
  },

  {
    id: 'guerra-civil',
    name: '⚔️ Guerra Civil',
    description: 'Provincias en conflicto abierto. El país se fragmenta territorialmente.',
    initialMetrics: {
      popularidad: 40,
      economia: 35,
      seguridad: 15,
      relacionesInternacionales: 30,
      corrupcion: 70,
      controlMedios: 45,
      salud: 30,
      tecnologia: 35
    },
    initialProvinceStates: {},
    initialFactionStates: {},
    expectedOutcomes: [
      'Secesión de provincias',
      'Intervención militar federal',
      'Guerra entre barras de diferentes provincias',
      'Colapso del sistema democrático',
      'Posible partición del país'
    ],
    testEvents: ALL_POLITICAL_EVENTS.slice(10, 20)
  },

  {
    id: 'hiperinflacion',
    name: '💸 Hiperinflación',
    description: 'La economía colapsó completamente. El dinero no vale nada.',
    initialMetrics: {
      popularidad: 20,
      economia: 5,
      seguridad: 30,
      relacionesInternacionales: 15,
      corrupcion: 90,
      controlMedios: 25,
      salud: 20,
      tecnologia: 25
    },
    initialProvinceStates: {},
    initialFactionStates: {},
    expectedOutcomes: [
      'Saqueos masivos',
      'Trueque como sistema económico',
      'Dolarización forzosa',
      'Éxodo de capitales',
      'Posible dolarización o nueva moneda'
    ],
    testEvents: ALL_POLITICAL_EVENTS.slice(15, 25)
  },

  {
    id: 'messi-presidente',
    name: '⚽ Era Messi',
    description: 'Argentina ganó el Mundial y Messi es más popular que vos. El fútbol domina todo.',
    initialMetrics: {
      popularidad: 60,
      economia: 40,
      seguridad: 55,
      relacionesInternacionales: 80,
      corrupcion: 60,
      controlMedios: 50,
      salud: 55,
      tecnologia: 45
    },
    initialProvinceStates: {},
    initialFactionStates: {},
    expectedOutcomes: [
      'El fútbol influye en todas las decisiones políticas',
      'Las barras bravas tienen poder de veto',
      'Crisis si Argentina pierde partidos importantes',
      'Messi puede influir en la política nacional',
      'AFA se vuelve un poder del estado'
    ],
    testEvents: ALL_POLITICAL_EVENTS.slice(20, 30)
  }
];

// BATCHES DE TESTING AUTOMATIZADO
export const automatedTestBatches: AutomatedTestBatch[] = [
  {
    id: 'stress-test-basic',
    name: '⚡ Test de Stress Básico',
    description: 'Eventos cada 30 segundos durante 5 minutos para probar estabilidad',
    events: ALL_POLITICAL_EVENTS.slice(0, 20),
    intervalMs: 30000, // 30 segundos
    durationMinutes: 5,
    stressLevel: 'low'
  },

  {
    id: 'stress-test-medium',
    name: '🔥 Test de Stress Medio',
    description: 'Eventos cada 15 segundos durante 10 minutos con decisiones automáticas',
    events: ALL_POLITICAL_EVENTS.slice(0, 40),
    intervalMs: 15000, // 15 segundos
    durationMinutes: 10,
    stressLevel: 'medium'
  },

  {
    id: 'stress-test-extreme',
    name: '💥 Test de Stress Extremo',
    description: 'Eventos cada 5 segundos durante 15 minutos para romper el sistema',
    events: ALL_POLITICAL_EVENTS,
    intervalMs: 5000, // 5 segundos
    durationMinutes: 15,
    stressLevel: 'extreme'
  },

    {
    id: 'cascade-effect-test',
    name: '🌊 Test de Efectos en Cascada',
    description: 'Eventos diseñados para provocar efectos en cadena entre provincias',
    events: ALL_POLITICAL_EVENTS.slice(25, 40),
    intervalMs: 45000, // 45 segundos
    durationMinutes: 8,
    stressLevel: 'medium'
  },

  {
    id: 'faction-conflict-test',
    name: '⚔️ Test de Conflictos entre Facciones',
    description: 'Eventos que generan tensión entre diferentes facciones',
    events: ALL_POLITICAL_EVENTS.slice(30, 45),
    intervalMs: 60000, // 1 minuto
    durationMinutes: 12,
    stressLevel: 'medium'
  },

  {
    id: 'economic-crisis-spiral',
    name: '📉 Espiral de Crisis Económica',
    description: 'Eventos económicos negativos consecutivos para probar límites',
    events: ALL_POLITICAL_EVENTS.slice(35, 50),
    intervalMs: 20000, // 20 segundos
    durationMinutes: 6,
    stressLevel: 'high'
  }
];

// EVENTOS ESPECÍFICOS PARA CASOS EXTREMOS
export const extremeTestEvents = [
  {
    id: 'metric-zero-test',
    title: 'Test: Métrica en Cero',
    description: 'Evento diseñado para llevar una métrica a 0',
    type: 'crisis' as const,
    category: 'economic' as const,
    trigger: {
      requiredMetrics: {},
      probability: 1.0
    },
    choices: [
      {
        id: 'force-zero-economy',
        text: 'Forzar economía a 0',
        effects: [
          {
            type: 'metrica' as const,
            target: 'economia',
            value: -100,
            duration: 0,
            description: 'Colapso económico total'
          }
        ]
      }
    ],
    timeLimit: 60
  },

  {
    id: 'metric-hundred-test',
    title: 'Test: Métrica en 100',
    description: 'Evento diseñado para llevar una métrica a 100',
    type: 'opportunity' as const,
    category: 'social' as const,
    trigger: {
      requiredMetrics: {},
      probability: 1.0
    },
    choices: [
      {
        id: 'force-hundred-popularity',
        text: 'Forzar popularidad a 100',
        effects: [
          {
            type: 'metrica' as const,
            target: 'popularidad',
            value: 100,
            duration: 0,
            description: 'Popularidad máxima artificial'
          }
        ]
      }
    ],
    timeLimit: 60
  }
];
