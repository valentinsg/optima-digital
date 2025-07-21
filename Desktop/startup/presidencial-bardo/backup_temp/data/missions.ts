import { FactionId, MetricType, ProvinceId } from "@/types/political";

import type { MetricEffect, RegionalEffect } from "@/types/political";

export interface Mission {
  id: string;
  title: string;
  description: string;
  assigningFaction?: FactionId; // Nueva: Facción que asigna la misión
  targetProvince: ProvinceId; // Nueva: Provincia donde ocurre
  type: 'combate' | 'negociacion' | 'diplomatica' | 'espionaje'; // Nueva: Tipo de misión
  trigger: {
    timeMin: number; // Días mínimos de mandato
    minSupportWithFaction?: number; // Nueva: Support mínimo con facción
    requiredProvinceState?: { minDiscontent?: number; minLoyalty?: number }; // Nueva
    requiredEvents?: string[];
    requiredMetrics?: Partial<Record<MetricType, { min?: number; max?: number }>>;
    provinceId?: ProvinceId; // Deprecated: usar targetProvince
    probability?: number;
  };
  objectives: string[]; // e.g., ['Extermina 50 aliens', 'Protege la base']
  rewards: {
    metrics: MetricEffect[];
    regional: RegionalEffect[];
    factionBonus?: { factionId: FactionId; supportBonus: number }; // Nueva
    xpBase: number; // Nueva: XP base por completar
    unlocks: string[]; // IDs de misiones siguientes
  };
  choices?: Array<{
    id: string;
    text: string;
    factionImpact?: { factionId: FactionId; supportChange: number }; // Nueva
    provinceImpact?: { discontentChange: number; loyaltyChange: number }; // Nueva
    xpReward: number; // Nueva: XP por esta choice
    outcomes: {
      successChance: number;
      effects: MetricEffect[];
      nextMissions: string[];
    };
  }>;
  isArcStarter: boolean; // Indica si inicia un arco
}

export const ALL_MISSIONS: Mission[] = [
  {
    id: "aliens_first_contact",
    title: "Contacto en el Fin del Mundo",
    description: "Reportes de ovnis en Ushuaia. ¡Es hora de decidir el destino alienígena! (Misión clave: Determina el arco de invasión o alianza).",
    targetProvince: ProvinceId.TIERRA_DEL_FUEGO,
    type: 'diplomatica',
    trigger: {
      timeMin: 730, // Año 2
      provinceId: ProvinceId.TIERRA_DEL_FUEGO,
      probability: 1.0, // Siempre ocurre al llegar al tiempo
    },
    objectives: ["Investiga la zona de aterrizaje", "Interactúa con los aliens", "Toma una decisión diplomática"],
    rewards: {
      metrics: [{ type: MetricType.TECNOLOGIA, change: 10, description: "Descubrimiento inicial", isImmediate: true }],
      regional: [{ provinceId: ProvinceId.TIERRA_DEL_FUEGO, effect: { loyalty: 5 } }],
      xpBase: 1500,
      unlocks: [], // Se llenan por choices
    },
    choices: [
      {
        id: "aliar",
        text: "Aliarse con los aliens",
        xpReward: 800,
        outcomes: {
          successChance: 0.8,
          effects: [{ type: MetricType.TECNOLOGIA, change: 30, description: "Tecnología alienígena", isImmediate: true }],
          nextMissions: ["aliens_alliance_tech", "aliens_alliance_defense"],
        },
      },
      {
        id: "expulsar",
        text: "Expulsar y exterminar",
        xpReward: 600,
        outcomes: {
          successChance: 0.7,
          effects: [{ type: MetricType.SEGURIDAD, change: 20, description: "Victoria inicial", isImmediate: true }, { type: MetricType.RELACIONES_INTERNACIONALES, change: -15, description: "Tensión cósmica", isImmediate: true }],
          nextMissions: ["aliens_invasion_wave1", "aliens_invasion_counterattack"],
        },
      },
    ],
    isArcStarter: true,
  },
  // Misiones de Rama Alianza
  {
    id: "aliens_alliance_tech",
    title: "Tecnología Extraterrestre",
    description: "Integra tecnología alien para mejorar el país, pero con riesgos de dependencia.",
    targetProvince: ProvinceId.TIERRA_DEL_FUEGO,
    type: 'espionaje',
    trigger: { timeMin: 750, requiredEvents: ["aliens_first_contact"] },
    objectives: ["Recopila muestras alienígenas", "Integra en infraestructura"],
    rewards: {
      metrics: [{ type: MetricType.TECNOLOGIA, change: 40, description: "Avance tecnológico", isImmediate: true }],
      regional: [],
      xpBase: 1200,
      unlocks: ["aliens_alliance_final"],
    },
    isArcStarter: false,
  },
  // Misiones de Rama Invasión
  {
    id: "aliens_invasion_wave1",
    title: "Primera Ola de Invasión",
    description: "Extermina aliens invasores en el sur, al estilo Saints Row: caos y explosiones.",
    targetProvince: ProvinceId.TIERRA_DEL_FUEGO,
    type: 'combate',
    trigger: { timeMin: 750, requiredEvents: ["aliens_first_contact"] },
    objectives: ["Extermina 100 aliens", "Destruye naves madre"],
    rewards: {
      metrics: [{ type: MetricType.SEGURIDAD, change: 30, description: "Defensa exitosa", isImmediate: true }],
      regional: [{ provinceId: ProvinceId.TIERRA_DEL_FUEGO, effect: { discontent: -20 } }],
      xpBase: 2000,
      unlocks: ["aliens_invasion_final"],
    },
    isArcStarter: false,
  },

  // ===== NUEVAS MISIONES CON FACCIONES =====

  {
    id: "barras-conflicto-estadio",
    title: "Guerra de Barras en el Estadio",
    description: "Las Barras Bravas te piden ayuda para controlar un motín en el estadio de Buenos Aires. El poder del fútbol está en juego.",
    assigningFaction: FactionId.BARRAS_BRAVAS,
    targetProvince: ProvinceId.BUENOS_AIRES,
    type: 'combate',
    trigger: {
      timeMin: 100,
      minSupportWithFaction: 20,
      requiredProvinceState: { minDiscontent: 50 },
      probability: 0.7
    },
    objectives: ['Derrota 50 enemigos en el estadio', 'Protege al capo de la barra', 'Controla la situación sin escalada'],
    rewards: {
      metrics: [{ type: MetricType.SEGURIDAD, change: 10, description: "Control del estadio", isImmediate: true }],
      regional: [{ provinceId: ProvinceId.BUENOS_AIRES, effect: { discontent: -5 } }],
      factionBonus: { factionId: FactionId.BARRAS_BRAVAS, supportBonus: 10 },
      xpBase: 1000,
      unlocks: ["barras-expansion-interior"]
    },
    choices: [
      {
        id: 'apoyar-barra',
        text: 'Apoyar completamente a la barra',
        factionImpact: { factionId: FactionId.BARRAS_BRAVAS, supportChange: 20 },
        provinceImpact: { discontentChange: -10, loyaltyChange: 5 },
        xpReward: 500,
        outcomes: {
          successChance: 0.8,
          effects: [{ type: MetricType.POPULARIDAD, change: -5, description: "Controversia pública", isImmediate: true }],
          nextMissions: ["barras-alianza-total"]
        }
      },
      {
        id: 'reprimir-todos',
        text: 'Reprimir a todos por igual',
        factionImpact: { factionId: FactionId.BARRAS_BRAVAS, supportChange: -30 },
        provinceImpact: { discontentChange: 5, loyaltyChange: 15 },
        xpReward: 300,
        outcomes: {
          successChance: 0.6,
          effects: [{ type: MetricType.SEGURIDAD, change: 15, description: "Orden restaurado", isImmediate: true }],
          nextMissions: ["barras-venganza"]
        }
      }
    ],
    isArcStarter: true
  },

  {
    id: "sindicatos-huelga-general",
    title: "Huelga General Masiva",
    description: "Los sindicatos convocan a paro nacional. Tu respuesta definirá el futuro laboral del país.",
    assigningFaction: FactionId.SINDICALISTAS,
    targetProvince: ProvinceId.BUENOS_AIRES,
    type: 'negociacion',
    trigger: {
      timeMin: 200,
      minSupportWithFaction: 15,
      requiredProvinceState: { minDiscontent: 60 },
      probability: 0.8
    },
    objectives: ['Negocia con líderes sindicales', 'Resuelve demandas laborales', 'Evita escalada nacional'],
    rewards: {
      metrics: [{ type: MetricType.ECONOMIA, change: -10, description: "Costo de negociación", isImmediate: true }],
      regional: [{ provinceId: ProvinceId.BUENOS_AIRES, effect: { discontent: -15 } }],
      factionBonus: { factionId: FactionId.SINDICALISTAS, supportBonus: 15 },
      xpBase: 1200,
      unlocks: ["sindicatos-reforma-laboral"]
    },
    choices: [
      {
        id: 'ceder-demandas',
        text: 'Ceder a todas las demandas',
        factionImpact: { factionId: FactionId.SINDICALISTAS, supportChange: 35 },
        provinceImpact: { discontentChange: -20, loyaltyChange: 10 },
        xpReward: 600,
        outcomes: {
          successChance: 0.9,
          effects: [{ type: MetricType.ECONOMIA, change: -20, description: "Costo económico alto", isImmediate: true }],
          nextMissions: ["sindicatos-poder-total"]
        }
      },
      {
        id: 'negociacion-equilibrada',
        text: 'Negociar punto medio',
        factionImpact: { factionId: FactionId.SINDICALISTAS, supportChange: 10 },
        provinceImpact: { discontentChange: -5, loyaltyChange: 5 },
        xpReward: 800,
        outcomes: {
          successChance: 0.7,
          effects: [{ type: MetricType.POPULARIDAD, change: 10, description: "Equilibrio logrado", isImmediate: true }],
          nextMissions: ["sindicatos-alianza-estable"]
        }
      }
    ],
    isArcStarter: true
  },

  {
    id: "empresarios-crisis-economica",
    title: "Rescate Empresarial de Emergencia",
    description: "Los grandes empresarios piden ayuda estatal para evitar el colapso. ¿Socializar pérdidas otra vez?",
    assigningFaction: FactionId.EMPRESARIOS,
    targetProvince: ProvinceId.BUENOS_AIRES,
    type: 'diplomatica',
    trigger: {
      timeMin: 300,
      minSupportWithFaction: 25,
      requiredMetrics: { economia: { max: 40 } },
      probability: 0.9
    },
    objectives: ['Evalúa propuestas empresariales', 'Decide sobre rescates', 'Maneja impacto público'],
    rewards: {
      metrics: [{ type: MetricType.ECONOMIA, change: 20, description: "Estabilización empresarial", isImmediate: true }],
      regional: [{ provinceId: ProvinceId.BUENOS_AIRES, effect: { loyalty: 10 } }],
      factionBonus: { factionId: FactionId.EMPRESARIOS, supportBonus: 20 },
      xpBase: 1400,
      unlocks: ["empresarios-oligopolio"]
    },
    choices: [
      {
        id: 'rescate-total',
        text: 'Rescate completo con fondos públicos',
        factionImpact: { factionId: FactionId.EMPRESARIOS, supportChange: 40 },
        provinceImpact: { discontentChange: 10, loyaltyChange: -5 },
        xpReward: 700,
        outcomes: {
          successChance: 0.8,
          effects: [{ type: MetricType.POPULARIDAD, change: -15, description: "Indignación popular", isImmediate: true }],
          nextMissions: ["empresarios-control-total"]
        }
      },
      {
        id: 'rescate-condicionado',
        text: 'Ayuda condicionada a reformas',
        factionImpact: { factionId: FactionId.EMPRESARIOS, supportChange: 15 },
        provinceImpact: { discontentChange: 0, loyaltyChange: 5 },
        xpReward: 900,
        outcomes: {
          successChance: 0.6,
          effects: [{ type: MetricType.ECONOMIA, change: 10, description: "Reformas estructurales", isImmediate: true }],
          nextMissions: ["empresarios-reforma-transparente"]
        }
      }
    ],
    isArcStarter: true
  }
];
