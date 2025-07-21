import { EventCategory, EventType, FactionId, MetricType, PoliticalEvent } from '@/types/political';
import { createImmediateEffect } from '@/utils/metricEffects';

/**
 * EVENTOS DE CONSECUENCIA
 *
 * Estos eventos se desencadenan como consecuencia de decisiones previas
 * del jugador, creando narrativas complejas y consecuencias a largo plazo.
 */

// ===== CONSECUENCIAS ECONÓMICAS =====

export const CONSECUENCIA_AUSTERIDAD: PoliticalEvent = {
	id: "consecuencia-austeridad",
	title: "📉 Consecuencias de la Austeridad",
	description: "Las medidas de austeridad implementadas meses atrás están mostrando sus efectos. La economía se contrajo, el desempleo aumentó y la gente está descontenta. Los expertos dicen que fue demasiado drástico.",
	type: EventType.CONSECUENCIA,
	category: EventCategory.ECONOMICO,
	urgency: 4,
	timeLimit: 60,
	trigger: {
		requiredChoices: [
			{ eventId: "crisis-economica", choiceId: "medidas-austeridad" }
		],
		probability: 0.8
	},
	choices: [
		{
			id: "mantener-austeridad",
			text: "💪 Mantener el rumbo de austeridad",
			description: "Insistir en que la austeridad es necesaria y que los beneficios se verán a largo plazo. Es arriesgado pero mantiene la disciplina fiscal.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, 5, "Disciplina fiscal mantenida"),
				createImmediateEffect(MetricType.POPULARIDAD, -15, "La gente sufre más"),
				createImmediateEffect(MetricType.SEGURIDAD, -5, "Tensión social crece")
			],
			factionEffects: [
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: 10,
					description: "Los empresarios valoran la disciplina fiscal"
				},
				{
					factionId: FactionId.SINDICALISTAS,
					supportChange: -20,
					description: "Los sindicatos se oponen ferozmente"
				}
			]
		},
		{
			id: "flexibilizar-medidas",
			text: "🔄 Flexibilizar las medidas",
			description: "Suavizar algunas medidas de austeridad para aliviar el sufrimiento de la gente. Es más popular pero menos disciplinado.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, -5, "Disciplina fiscal relajada"),
				createImmediateEffect(MetricType.POPULARIDAD, 10, "Alivio para la gente"),
				createImmediateEffect(MetricType.SEGURIDAD, 3, "Tensión social se reduce")
			],
			factionEffects: [
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: -5,
					description: "Los empresarios ven falta de disciplina"
				},
				{
					factionId: FactionId.SINDICALISTAS,
					supportChange: 15,
					description: "Los sindicatos celebran el cambio"
				}
			]
		}
	],
	defaultChoice: "flexibilizar-medidas",
	icon: "📉",
	sound: "consecuencia-austeridad"
};

export const CONSECUENCIA_GASTO_SOCIAL: PoliticalEvent = {
	id: "consecuencia-gasto-social",
	title: "💰 Consecuencias del Gasto Social",
	description: "El aumento del gasto social implementado meses atrás está mostrando sus efectos. La inflación subió, el déficit fiscal se agravó y los mercados están nerviosos. Pero la gente está más contenta.",
	type: EventType.CONSECUENCIA,
	category: EventCategory.ECONOMICO,
	urgency: 3,
	timeLimit: 90,
	trigger: {
		requiredChoices: [
			{ eventId: "crisis-social", choiceId: "aumentar-gasto-social" }
		],
		probability: 0.7
	},
	choices: [
		{
			id: "mantener-gasto",
			text: "💸 Mantener el gasto social",
			description: "Defender el gasto social diciendo que es necesario para el bienestar de la gente. Es popular pero costoso.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 15, "La gente está agradecida"),
				createImmediateEffect(MetricType.ECONOMIA, -10, "Déficit fiscal se agrava"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -5, "Mercados internacionales preocupados")
			],
			factionEffects: [
				{
					factionId: FactionId.SINDICALISTAS,
					supportChange: 20,
					description: "Los sindicatos celebran el gasto social"
				},
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: -15,
					description: "Los empresarios ven irresponsabilidad fiscal"
				}
			]
		},
		{
			id: "reducir-gasto",
			text: "📊 Reducir el gasto social",
			description: "Reducir el gasto social para controlar el déficit fiscal. Es necesario pero impopular.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -20, "La gente se enoja"),
				createImmediateEffect(MetricType.ECONOMIA, 8, "Déficit fiscal se reduce"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, 5, "Mercados internacionales se calman")
			],
			factionEffects: [
				{
					factionId: FactionId.SINDICALISTAS,
					supportChange: -25,
					description: "Los sindicatos se oponen ferozmente"
				},
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: 15,
					description: "Los empresarios valoran la responsabilidad fiscal"
				}
			]
		}
	],
	defaultChoice: "mantener-gasto",
	icon: "💰",
	sound: "consecuencia-gasto-social"
};

// ===== CONSECUENCIAS DE SEGURIDAD =====

export const CONSECUENCIA_REPRESION: PoliticalEvent = {
	id: "consecuencia-represion",
	title: "🛡️ Consecuencias de la Represión",
	description: "Las medidas represivas implementadas meses atrás están mostrando sus efectos. La violencia aumentó, hay más protestas y la imagen internacional del país se deterioró. Pero el orden se mantiene.",
	type: EventType.CONSECUENCIA,
	category: EventCategory.SEGURIDAD,
	urgency: 4,
	timeLimit: 45,
	trigger: {
		requiredChoices: [
			{ eventId: "protestas-masivas", choiceId: "represion-policial" }
		],
		probability: 0.9
	},
	choices: [
		{
			id: "intensificar-represion",
			text: "⚔️ Intensificar la represión",
			description: "Aumentar la represión para mantener el orden a toda costa. Es efectivo pero muy impopular.",
			effects: [
				createImmediateEffect(MetricType.SEGURIDAD, 10, "Orden mantenido por la fuerza"),
				createImmediateEffect(MetricType.POPULARIDAD, -25, "La gente se rebela más"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -15, "Condena internacional")
			],
			factionEffects: [
				{
					factionId: FactionId.MILITARES,
					supportChange: 20,
					description: "Los militares ganan más poder"
				},
				{
					factionId: FactionId.OPOSICION,
					supportChange: 30,
					description: "La oposición gana apoyo masivo"
				}
			]
		},
		{
			id: "suavizar-represion",
			text: "🤝 Suavizar la represión",
			description: "Reducir la represión y buscar el diálogo. Es más popular pero puede llevar a más desorden.",
			effects: [
				createImmediateEffect(MetricType.SEGURIDAD, -5, "Menos control del orden"),
				createImmediateEffect(MetricType.POPULARIDAD, 15, "La gente respira aliviada"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, 10, "Imagen internacional mejora")
			],
			factionEffects: [
				{
					factionId: FactionId.MILITARES,
					supportChange: -10,
					description: "Los militares ven debilidad"
				},
				{
					factionId: FactionId.OPOSICION,
					supportChange: -5,
					description: "La oposición pierde algo de apoyo"
				}
			]
		}
	],
	defaultChoice: "suavizar-represion",
	icon: "🛡️",
	sound: "consecuencia-represion"
};

// ===== CONSECUENCIAS DE SALUD =====

export const CONSECUENCIA_PRIVATIZACION_SALUD: PoliticalEvent = {
	id: "consecuencia-privatizacion-salud",
	title: "🏥 Consecuencias de la Privatización de la Salud",
	description: "La privatización de la salud implementada meses atrás está mostrando sus efectos. Los hospitales privados están llenos, los precios subieron y la gente pobre no puede atenderse. Pero hay más tecnología.",
	type: EventType.CONSECUENCIA,
	category: EventCategory.SOCIAL,
	urgency: 4,
	timeLimit: 60,
	trigger: {
		requiredChoices: [
			{ eventId: "crisis-hospitalaria", choiceId: "privatizar-salud" }
		],
		probability: 0.8
	},
	choices: [
		{
			id: "mantener-privatizacion",
			text: "💼 Mantener la privatización",
			description: "Defender la privatización diciendo que mejora la eficiencia y la tecnología. Es costoso pero moderno.",
			effects: [
				createImmediateEffect(MetricType.SALUD, 10, "Mejor tecnología médica"),
				createImmediateEffect(MetricType.POPULARIDAD, -20, "La gente pobre sufre"),
				createImmediateEffect(MetricType.ECONOMIA, -5, "Costos de salud suben")
			],
			factionEffects: [
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: 25,
					description: "Los empresarios del sector salud prosperan"
				},
				{
					factionId: FactionId.SINDICALISTAS,
					supportChange: -30,
					description: "Los sindicatos de salud se oponen ferozmente"
				}
			]
		},
		{
			id: "revertir-privatizacion",
			text: "🔄 Revertir la privatización",
			description: "Reestatizar algunos servicios de salud para que la gente pobre pueda atenderse. Es popular pero costoso.",
			effects: [
				createImmediateEffect(MetricType.SALUD, -5, "Menos tecnología pero más acceso"),
				createImmediateEffect(MetricType.POPULARIDAD, 20, "La gente pobre puede atenderse"),
				createImmediateEffect(MetricType.ECONOMIA, -15, "Costo de reestatización")
			],
			factionEffects: [
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: -20,
					description: "Los empresarios del sector salud se enojan"
				},
				{
					factionId: FactionId.SINDICALISTAS,
					supportChange: 25,
					description: "Los sindicatos de salud celebran"
				}
			]
		}
	],
	defaultChoice: "revertir-privatizacion",
	icon: "🏥",
	sound: "consecuencia-privatizacion-salud"
};

// ===== CONSECUENCIAS DE TECNOLOGÍA =====

export const CONSECUENCIA_PLAN_DIGITAL: PoliticalEvent = {
	id: "consecuencia-plan-digital",
	title: "💻 Consecuencias del Plan Digital",
	description: "El Plan Digital Nacional implementado meses atrás está mostrando sus efectos. Hay más conectividad, las escuelas tienen computadoras y el gobierno está más digitalizado. Pero costó mucho dinero.",
	type: EventType.CONSECUENCIA,
	category: EventCategory.ECONOMICO,
	urgency: 2,
	timeLimit: 120,
	trigger: {
		requiredChoices: [
			{ eventId: "crisis-tecnologica", choiceId: "plan-digital-nacional" }
		],
		probability: 0.6
	},
	choices: [
		{
			id: "expandir-plan-digital",
			text: "🚀 Expandir el Plan Digital",
			description: "Expandir el Plan Digital a más áreas y sectores. Es costoso pero moderniza el país.",
			effects: [
				createImmediateEffect(MetricType.TECNOLOGIA, 15, "Mayor modernización tecnológica"),
				createImmediateEffect(MetricType.ECONOMIA, -20, "Costo adicional del plan"),
				createImmediateEffect(MetricType.POPULARIDAD, 10, "La gente ve progreso tecnológico"),
				createImmediateEffect(MetricType.CORRUPCION, 8, "Más oportunidades de corrupción")
			],
			factionEffects: [
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: 15,
					description: "Los empresarios tecnológicos prosperan"
				}
			]
		},
		{
			id: "consolidar-plan-digital",
			text: "📊 Consolidar el Plan Digital",
			description: "Consolidar lo que ya se implementó sin expandir más. Es más barato y controlado.",
			effects: [
				createImmediateEffect(MetricType.TECNOLOGIA, 5, "Consolidación tecnológica"),
				createImmediateEffect(MetricType.ECONOMIA, 5, "Ahorro en gastos"),
				createImmediateEffect(MetricType.CORRUPCION, -5, "Menos oportunidades de corrupción")
			]
		}
	],
	defaultChoice: "consolidar-plan-digital",
	icon: "💻",
	sound: "consecuencia-plan-digital"
};

// ===== CONSECUENCIAS DE CORRUPCIÓN =====

export const CONSECUENCIA_ESCANDALO_CORRUPCION: PoliticalEvent = {
	id: "consecuencia-escandalo-corrupcion",
	title: "📰 Consecuencias del Escándalo de Corrupción",
	description: "El escándalo de corrupción que estalló meses atrás está mostrando sus efectos. La confianza en el gobierno se deterioró, la oposición gana terreno y los medios están como locos. Pero algunos funcionarios ya renunciaron.",
	type: EventType.CONSECUENCIA,
	category: EventCategory.CORRUPCION,
	urgency: 5,
	timeLimit: 30,
	trigger: {
		requiredChoices: [
			{ eventId: "escandalo-corrupcion", choiceId: "encubrir-escandalo" }
		],
		probability: 0.9
	},
	choices: [
		{
			id: "investigacion-profunda",
			text: "🔍 Investigación profunda y transparente",
			description: "Ordenar una investigación profunda y transparente del escándalo. Es lo correcto pero puede implicar a más gente.",
			effects: [
				createImmediateEffect(MetricType.CORRUPCION, -20, "Se combate la corrupción"),
				createImmediateEffect(MetricType.POPULARIDAD, 15, "La gente ve justicia"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, -10, "Menos control de la narrativa")
			],
			factionEffects: [
				{
					factionId: FactionId.OPOSICION,
					supportChange: -10,
					description: "La oposición pierde munición política"
				}
			]
		},
		{
			id: "continuar-encubriendo",
			text: "🤐 Continuar encubriendo",
			description: "Seguir intentando encubrir el escándalo con más propaganda y amenazas. Es arriesgado pero mantiene el control.",
			effects: [
				createImmediateEffect(MetricType.CORRUPCION, 15, "La corrupción se tolera"),
				createImmediateEffect(MetricType.POPULARIDAD, -25, "La gente se rebela"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 20, "Control total de la narrativa")
			],
			factionEffects: [
				{
					factionId: FactionId.OPOSICION,
					supportChange: 30,
					description: "La oposición gana mucho terreno"
				}
			]
		}
	],
	defaultChoice: "investigacion-profunda",
	icon: "📰",
	sound: "consecuencia-escandalo-corrupcion"
};

// ===== CONSECUENCIAS DE RELACIONES INTERNACIONALES =====

export const CONSECUENCIA_AISLAMIENTO: PoliticalEvent = {
	id: "consecuencia-aislamiento",
	title: "🌍 Consecuencias del Aislamiento Internacional",
	description: "El aislamiento internacional causado por las políticas implementadas meses atrás está mostrando sus efectos. Menos inversión extranjera, menos turismo y más sanciones. Pero hay más soberanía.",
	type: EventType.CONSECUENCIA,
	category: EventCategory.INTERNACIONAL,
	urgency: 3,
	timeLimit: 90,
	trigger: {
		requiredChoices: [
			{ eventId: "presion-internacional", choiceId: "rechazar-presion" }
		],
		probability: 0.7
	},
	choices: [
		{
			id: "mantener-aislamiento",
			text: "🏴‍☠️ Mantener el aislamiento",
			description: "Defender el aislamiento diciendo que protege la soberanía nacional. Es soberano pero costoso.",
			effects: [
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -10, "Aislamiento se profundiza"),
				createImmediateEffect(MetricType.ECONOMIA, -15, "Menos inversión extranjera"),
				createImmediateEffect(MetricType.POPULARIDAD, 5, "Algunos valoran la soberanía")
			],
			factionEffects: [
				{
					factionId: FactionId.LA_CAMPORA,
					supportChange: 15,
					description: "La Cámpora valora la soberanía"
				},
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: -20,
					description: "Los empresarios sufren el aislamiento"
				}
			]
		},
		{
			id: "buscar-reintegracion",
			text: "🤝 Buscar la reintegración internacional",
			description: "Buscar reintegrarse a la comunidad internacional con algunas concesiones. Es pragmático pero menos soberano.",
			effects: [
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, 15, "Reintegración internacional"),
				createImmediateEffect(MetricType.ECONOMIA, 10, "Más inversión extranjera"),
				createImmediateEffect(MetricType.POPULARIDAD, -5, "Algunos ven pérdida de soberanía")
			],
			factionEffects: [
				{
					factionId: FactionId.LA_CAMPORA,
					supportChange: -10,
					description: "La Cámpora ve pérdida de soberanía"
				},
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: 20,
					description: "Los empresarios celebran la reintegración"
				}
			]
		}
	],
	defaultChoice: "buscar-reintegracion",
	icon: "🌍",
	sound: "consecuencia-aislamiento"
};

// Exportar todos los eventos de consecuencia
export const CONSEQUENCE_EVENTS: PoliticalEvent[] = [
	CONSECUENCIA_AUSTERIDAD,
	CONSECUENCIA_GASTO_SOCIAL,
	CONSECUENCIA_REPRESION,
	CONSECUENCIA_PRIVATIZACION_SALUD,
	CONSECUENCIA_PLAN_DIGITAL,
	CONSECUENCIA_ESCANDALO_CORRUPCION,
	CONSECUENCIA_AISLAMIENTO
];
