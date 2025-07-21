import { EventCategory, EventType, MetricType, PoliticalEvent, ProvinceId } from "@/types/political";


export const PROVINCE_EVENTS: PoliticalEvent[] = [
  {
    id: "chaco_pobreza_extrema",
    title: "Crisis de Pobreza en Chaco",
    description: "Una ola de pobreza extrema azota Chaco, con toques de humor negro: la gente vende memes de su propia miseria en Mercado Libre.",
    type: EventType.CRISIS,
    category: EventCategory.SOCIAL,
    urgency: 4,
    provinceId: ProvinceId.CHACO,
    trigger: { requiredMetrics: { [MetricType.ECONOMIA]: { max: 30 } } },
    choices: [
      {
        id: "subsidios",
        text: "Enviar subsidios nucleares",
        description: "Envía ayuda masiva, pero con riesgo de corrupción.",
        regionalEffects: [{ provinceId: ProvinceId.CHACO, effect: { discontent: -20, loyalty: 15 } }],
        effects: [{ type: MetricType.ECONOMIA, change: -10, description: "Gasto en subsidios", isImmediate: true }]
      },
      {
        id: "ignorar",
        text: "Ignorar y culpar al clima",
        description: "Niega el problema, baja popularidad.",
        regionalEffects: [{ provinceId: ProvinceId.CHACO, effect: { discontent: 30, loyalty: -20 } }],
        effects: [{ type: MetricType.POPULARIDAD, change: -15, description: "Rechazo público", isImmediate: true }]
      }
    ]
  },
  {
    id: "cordoba_universidad",
    title: "Protestas Universitarias en Córdoba",
    description: "Estudiantes de Córdoba protestan por recortes, inventando nuevos insultos en verso.",
    type: EventType.CONFLICTO_FACCIONES,
    category: EventCategory.SOCIAL,
    urgency: 3,
    provinceId: ProvinceId.CORDOBA,
    trigger: { requiredMetrics: { [MetricType.ECONOMIA]: { min: 40 } } },
    choices: [
      {
        id: "financiar",
        text: "Aumentar financiamiento",
        description: "Mejora educación, cuesta dinero.",
        regionalEffects: [{ provinceId: ProvinceId.CORDOBA, effect: { discontent: -15, loyalty: 20 } }],
        effects: [{ type: MetricType.ECONOMIA, change: -5, description: "Inversión en educación", isImmediate: true }]
      },
      {
        id: "reprimir",
        text: "Enviar fuerzas de seguridad",
        description: "Controla protestas, baja popularidad.",
        regionalEffects: [{ provinceId: ProvinceId.CORDOBA, effect: { discontent: 25, loyalty: -15 } }],
        effects: [{ type: MetricType.SEGURIDAD, change: 10, description: "Mejor control", isImmediate: true }]
      }
    ]
  },
  {
    id: "mendoza_vino",
    title: "Crisis Vinícola en Mendoza",
    description: "Sequía afecta viñedos, los mendocinos proponen vino de lágrimas de turistas.",
    type: EventType.CRISIS,
    category: EventCategory.ECONOMICO,
    urgency: 3,
    provinceId: ProvinceId.MENDOZA,
    trigger: { requiredMetrics: { [MetricType.ECONOMIA]: { max: 50 } } },
    choices: [
      {
        id: "ayuda",
        text: "Proveer irrigación subsidiada",
        description: "Ayuda a la industria, cuesta recursos.",
        regionalEffects: [{ provinceId: ProvinceId.MENDOZA, effect: { discontent: -10, loyalty: 10 } }],
        effects: [{ type: MetricType.ECONOMIA, change: -8, description: "Subsidios", isImmediate: true }]
      },
      {
        id: "diversificar",
        text: "Promover diversificación turística",
        description: "Cambia enfoque, posible boom.",
        regionalEffects: [{ provinceId: ProvinceId.MENDOZA, effect: { economicLevel: 15 } }],
        effects: [{ type: MetricType.ECONOMIA, change: 5, description: "Nuevos ingresos", isImmediate: true }]
      }
    ]
  },
  {
    id: "tierra_del_fuego_aliens",
    title: "Invasión Alienígena en Tierra del Fuego",
    description: "Aliens aterrizan en el fin del mundo, pidiendo asilo político y pingüinos.",
    type: EventType.HUMOR_NEGRO,
    category: EventCategory.PROVINCIAL,
    urgency: 5,
    provinceId: ProvinceId.TIERRA_DEL_FUEGO,
    trigger: { probability: 0.1 },
    choices: [
      {
        id: "aliar",
        text: "Aliarse con aliens",
        description: "Gana tecnología, riesgo internacional.",
        regionalEffects: [{ provinceId: ProvinceId.TIERRA_DEL_FUEGO, effect: { discontent: -30, loyalty: 25 } }],
        effects: [{ type: MetricType.TECNOLOGIA, change: 20, description: "Tecnología alien", isImmediate: true }]
      },
      {
        id: "expulsar",
        text: "Expulsar a los aliens",
        description: "Mantiene status quo, pierde oportunidad.",
        regionalEffects: [{ provinceId: ProvinceId.TIERRA_DEL_FUEGO, effect: { discontent: 20 } }],
        effects: [{ type: MetricType.RELACIONES_INTERNACIONALES, change: -10, description: "Incidente diplomático", isImmediate: true }]
      }
    ]
  },
  {
    id: "caba_vs_buenos_aires",
    title: "Conflicto CABA vs Buenos Aires",
    description: "Disputa por fondos coparticipables, con piquetes de taxis y subtes voladores.",
    type: EventType.CONFLICTO_FACCIONES,
    category: EventCategory.PROVINCIAL,
    urgency: 4,
    provinceId: ProvinceId.CABA,
    trigger: { requiredMetrics: { [MetricType.ECONOMIA]: { min: 60 } } },
    choices: [
      {
        id: "negociar",
        text: "Negociar acuerdo",
        description: "Equilibra fondos, mejora lealtad en ambas.",
        regionalEffects: [
          { provinceId: ProvinceId.CABA, effect: { loyalty: 10 } },
          { provinceId: ProvinceId.BUENOS_AIRES, effect: { loyalty: 10 } }
        ],
        effects: [{ type: MetricType.POPULARIDAD, change: 5, description: "Acuerdo pacífico", isImmediate: true }]
      },
      {
        id: "favor_caba",
        text: "Favorecer CABA",
        description: "Mejora CABA, enoja Buenos Aires.",
        regionalEffects: [
          { provinceId: ProvinceId.CABA, effect: { loyalty: 20, discontent: -15 } },
          { provinceId: ProvinceId.BUENOS_AIRES, effect: { loyalty: -20, discontent: 25 } }
        ],
        effects: [{ type: MetricType.ECONOMIA, change: 10, description: "Apoyo urbano", isImmediate: true }]
      }
    ]
  }
];
