/**
 * PRESIDENCIAL BARDO - Más Eventos Políticos Argentinos
 * Eventos con humor local y efectos más graduales
 */

import {
    EventCategory,
    EventType,
    FactionId,
    MetricType,
    ProvinceId,
    type PoliticalEvent,
} from "@/types/political";
import { createImmediateEffect } from "@/utils/metricEffects";

// ===== EVENTOS COTIDIANOS ARGENTINOS =====

export const CORTE_DE_LUZ_MASIVO: PoliticalEvent = {
	id: "corte-luz-masivo-verano",
	title: "💡 Corte de Luz Masivo",
	description:
		"Se cortó la luz en toda la provincia de Buenos Aires en pleno verano. Los aires acondicionados colapsaron la red eléctrica y ahora medio país está sin energía. Twitter explotó con memes de 'Argentina momento' y la gente está cocinando asado en las veredas.",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 4,
	timeLimit: 45,
	trigger: {
		requiredMetrics: {
			[MetricType.ECONOMIA]: { max: 50 }
		},
		probability: 0.6
	},
	choices: [
		{
			id: "culpar-empresas",
			text: "🏢 Culpar a las empresas eléctricas",
			description: "Echarle la culpa a las empresas privatizadas. Amenazar con estatizar todo.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 8, "La gente odia a las empresas"),
				createImmediateEffect(MetricType.ECONOMIA, -3, "Incertidumbre en el sector"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 5, "Narrativa anti-empresas")
			],
			factionEffects: [
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: -15,
					description: "Los empresarios se enojan con las amenazas"
				}
			]
		},
		{
			id: "racionamiento-energia",
			text: "⚡ Implementar racionamiento",
			description: "Cortes programados de luz para 'ahorrar energía'. Porque planificar la miseria es mejor que la miseria espontánea.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -12, "Nadie quiere racionamiento"),
				createImmediateEffect(MetricType.ECONOMIA, -8, "Pérdida de productividad"),
				createImmediateEffect(MetricType.SEGURIDAD, -5, "Aumenta la inseguridad")
			]
		},
		{
			id: "pedir-que-no-usen-aire",
			text: "🌡️ Pedir que no usen aire acondicionado",
			description: "Salir en cadena nacional a pedirle a la gente que no use aire acondicionado. En pleno verano. Con 40 grados.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -15, "Pedido ridículo"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, -8, "Memes y burlas"),
				createImmediateEffect(MetricType.ECONOMIA, -2, "Problema no resuelto")
			]
		}
	],
	defaultChoice: "culpar-empresas",
	icon: "💡",
	sound: "corte-luz"
};

export const ESCASEZ_CARNE: PoliticalEvent = {
	id: "escasez-carne-asado",
	title: "🥩 Escasez de Carne",
	description:
		"No hay carne en los supermercados. El kilo de asado está $3000 y subiendo. Los domingos familiares se convirtieron en 'domingos de polenta'. La gente está considerando hacer asado de pollo, lo cual es prácticamente traición a la patria.",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 5,
	timeLimit: 30,
	trigger: {
		requiredMetrics: {
			[MetricType.ECONOMIA]: { max: 40 }
		},
		probability: 0.7
	},
	choices: [
		{
			id: "controlar-precios-carne",
			text: "🏷️ Controlar precios de la carne",
			description: "Fijar precios máximos para la carne. Porque controlar precios siempre funciona en Argentina.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 10, "Precios más baratos (temporalmente)"),
				createImmediateEffect(MetricType.ECONOMIA, -8, "Distorsión del mercado"),
				createImmediateEffect(MetricType.CORRUPCION, 12, "Mercado negro de carne")
			]
		},
		{
			id: "importar-carne-uruguay",
			text: "🇺🇾 Importar carne de Uruguay",
			description: "Traer carne del país vecino. Admitir que Uruguay hace mejor asado que nosotros.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -8, "Humillación nacional"),
				createImmediateEffect(MetricType.ECONOMIA, -5, "Gasto en importaciones"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, 3, "Buena relación con Uruguay")
			]
		},
		{
			id: "promover-asado-pollo",
			text: "🐔 Promover el 'asado de pollo'",
			description: "Hacer campaña para que la gente haga asado de pollo. Traición a la argentinidad.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -20, "Traición a la cultura argentina"),
				createImmediateEffect(MetricType.ECONOMIA, 2, "Menor demanda de carne"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, -10, "Memes y burlas eternas")
			]
		}
	],
	defaultChoice: "controlar-precios-carne",
	icon: "🥩",
	sound: "crisis-carne"
};

export const PARO_DOCENTE_ETERNO: PoliticalEvent = {
	id: "paro-docente-eterno",
	title: "📚 Paro Docente Eterno",
	description:
		"Los docentes están de paro hace 3 meses. Los chicos no tienen clases, los padres no saben qué hacer y los docentes siguen pidiendo aumento. Mientras tanto, los pibes están aprendiendo más en TikTok que en la escuela.",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 3,
	timeLimit: 60,
	trigger: {
		requiredMetrics: {
			[MetricType.ECONOMIA]: { max: 45 }
		},
		probability: 0.8
	},
	choices: [
		{
			id: "dar-aumento-docentes",
			text: "💰 Dar aumento a los docentes",
			description: "Ceder y darles el aumento que piden. Porque la educación es importante (y los votos también).",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, -12, "Gasto en salarios docentes"),
				createImmediateEffect(MetricType.POPULARIDAD, 8, "Padres contentos"),
				createImmediateEffect(MetricType.SEGURIDAD, 5, "Se termina el conflicto")
			],
			factionEffects: [
				{
					factionId: FactionId.SINDICALISTAS,
					supportChange: 25,
					description: "Los sindicatos celebran la victoria"
				}
			]
		},
		{
			id: "clases-virtuales",
			text: "💻 Implementar clases virtuales",
			description: "Que los chicos estudien por Zoom. Total, ya están todo el día con el celular.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -5, "Solución poco popular"),
				createImmediateEffect(MetricType.ECONOMIA, -3, "Inversión en tecnología"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 8, "Modernización educativa")
			]
		},
		{
			id: "ignorar-paro",
			text: "🙈 Ignorar el paro",
			description: "Hacerse el boludo y esperar que se cansen. Los chicos pueden aprender en YouTube.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -15, "Padres furiosos"),
				createImmediateEffect(MetricType.ECONOMIA, 2, "Ahorro en salarios"),
				createImmediateEffect(MetricType.SEGURIDAD, -8, "Conflicto se intensifica")
			]
		}
	],
	defaultChoice: "dar-aumento-docentes",
	icon: "📚",
	sound: "paro-docente"
};

export const INVASION_CARPINCHOS: PoliticalEvent = {
	id: "invasion-carpinchos-nordelta",
	title: "🦫 Invasión de Carpinchos",
	description:
		"Los carpinchos invadieron Nordelta. Están comiendo el pasto de los countries, cagando en las piscinas y los chetos no saben qué hacer. Los carpinchos se volvieron un símbolo de resistencia anti-establishment y tienen su propio hashtag: #CarpinchoLibre.",
	type: EventType.HUMOR_NEGRO,
	category: EventCategory.SOCIAL,
	urgency: 2,
	timeLimit: 90,
	trigger: {
		probability: 0.3
	},
	choices: [
		{
			id: "defender-carpinchos",
			text: "🦫 Defender a los carpinchos",
			description: "Declararlos patrimonio natural y protegerlos. Los carpinchos son más argentinos que los que viven en countries.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 15, "Apoyo popular a los carpinchos"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, 5, "Imagen ecologista"),
				createImmediateEffect(MetricType.ECONOMIA, -2, "Conflicto con desarrolladores")
			],
			factionEffects: [
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: -20,
					description: "Los empresarios inmobiliarios se enojan"
				}
			]
		},
		{
			id: "reubicar-carpinchos",
			text: "🚚 Reubicar a los carpinchos",
			description: "Mudarlos a un lugar más apropiado. Operación 'Carpincho Libre' con helicópteros y todo.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, -5, "Costo de reubicación"),
				createImmediateEffect(MetricType.POPULARIDAD, 5, "Solución equilibrada"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 8, "Operativo mediático")
			]
		},
		{
			id: "ignorar-carpinchos",
			text: "🤷 Que se arreglen solos",
			description: "No es problema del Estado. Que los de Nordelta se las arreglen con los carpinchos.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 8, "La gente se divierte con el conflicto"),
				createImmediateEffect(MetricType.ECONOMIA, 1, "Ahorro en gastos"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, -3, "Imagen de desinterés")
			]
		}
	],
	defaultChoice: "defender-carpinchos",
	icon: "🦫",
	sound: "carpinchos"
};

export const FALTA_DOLAR_TURISMO: PoliticalEvent = {
	id: "falta-dolar-turismo",
	title: "✈️ Falta de Dólares para Turismo",
	description:
		"No hay cupo de dólares para turismo. Los argentinos no pueden viajar al exterior y están haciendo 'turismo interno' en Mar del Plata con precios de Miami. Los que tenían planeado ir a Disney ahora van a Bariloche y lloran.",
	type: EventType.CRISIS,
	category: EventCategory.ECONOMICO,
	urgency: 3,
	timeLimit: 60,
	trigger: {
		requiredMetrics: {
			[MetricType.ECONOMIA]: { max: 35 }
		},
		probability: 0.9
	},
	choices: [
		{
			id: "aumentar-cupo-dolares",
			text: "💸 Aumentar cupo de dólares",
			description: "Darle más dólares a la gente para que puedan viajar. Porque el turismo es un derecho humano.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 15, "Clase media contenta"),
				createImmediateEffect(MetricType.ECONOMIA, -15, "Fuga de divisas"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, 5, "Más turistas argentinos")
			]
		},
		{
			id: "promover-turismo-interno",
			text: "🏔️ Promover turismo interno",
			description: "Hacer campaña para que la gente viaje dentro del país. 'Argentina tiene todo lo que necesitás'.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -5, "Decepción de la clase media"),
				createImmediateEffect(MetricType.ECONOMIA, 8, "Ahorro de divisas"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 10, "Campaña nacionalista")
			]
		},
		{
			id: "crear-dolar-turista",
			text: "🏖️ Crear 'dólar turista'",
			description: "Inventar un nuevo tipo de cambio especial para turismo. Porque más dólares = más soluciones.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 10, "Creatividad argentina"),
				createImmediateEffect(MetricType.ECONOMIA, -8, "Más complejidad cambiaria"),
				createImmediateEffect(MetricType.CORRUPCION, 15, "Oportunidades de arbitraje")
			]
		}
	],
	defaultChoice: "promover-turismo-interno",
	icon: "✈️",
	sound: "turismo-crisis"
};

export const QUILOMBO_SUBTE: PoliticalEvent = {
	id: "quilombo-subte-buenos-aires",
	title: "🚇 Quilombo en el Subte",
	description:
		"El subte de Buenos Aires está colapsado. Los trenes no andan, hay piquetes en las estaciones y la gente está caminando 2 horas para llegar al trabajo. Los porteños están teniendo que vivir como el resto del país: sin transporte público decente.",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 4,
	timeLimit: 45,
	trigger: {
		requiredMetrics: {
			[MetricType.ECONOMIA]: { max: 40 }
		},
		probability: 0.7
	},
	choices: [
		{
			id: "invertir-subte",
			text: "🚇 Invertir en el subte",
			description: "Meter plata para arreglar el subte. Porque los porteños votan y se quejan mucho.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, -12, "Inversión en transporte"),
				createImmediateEffect(MetricType.POPULARIDAD, 8, "Porteños contentos"),
				createImmediateEffect(MetricType.SEGURIDAD, 5, "Menos caos en las calles")
			],
			provinceModifiers: {
				[ProvinceId.CABA]: { loyalty: 15, discontent: -10 }
			}
		},
		{
			id: "culpar-ciudad",
			text: "🏛️ Culpar a la Ciudad",
			description: "Decir que es problema de la Ciudad de Buenos Aires, no de la Nación. Clásico pase de responsabilidades.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -8, "Pase de responsabilidades"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 5, "Narrativa anti-CABA"),
				createImmediateEffect(MetricType.ECONOMIA, 2, "Ahorro en inversión")
			]
		},
		{
			id: "promover-bicicleta",
			text: "🚲 Promover el uso de bicicleta",
			description: "Hacer campaña para que la gente use bicicleta. Ecológico y barato.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -10, "Solución poco práctica"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, 3, "Imagen ecologista"),
				createImmediateEffect(MetricType.ECONOMIA, -1, "Inversión en bicisendas")
			]
		}
	],
	defaultChoice: "culpar-ciudad",
	icon: "🚇",
	sound: "subte-quilombo"
};

export const ESCANDALO_FUNCIONARIO_LUJO: PoliticalEvent = {
	id: "escandalo-funcionario-lujo",
	title: "💎 Escándalo de Funcionario de Lujo",
	description:
		"Un funcionario de tu gobierno fue filmado comprando champagne de $50.000 en Puerto Madero mientras el país se cae a pedazos. El video se viralizó y ahora hay memes de 'Funcionario Champagne' por todos lados.",
	type: EventType.CRISIS,
	category: EventCategory.CORRUPCION,
	urgency: 4,
	timeLimit: 30,
	trigger: {
		requiredMetrics: {
			[MetricType.CORRUPCION]: { min: 40 }
		},
		probability: 0.5
	},
	choices: [
		{
			id: "echar-funcionario-champagne",
			text: "🔥 Echar al funcionario",
			description: "Echarlo inmediatamente y hacer un discurso sobre la austeridad. Damage control.",
			effects: [
				createImmediateEffect(MetricType.CORRUPCION, -8, "Medida anticorrupción"),
				createImmediateEffect(MetricType.POPULARIDAD, 12, "Decisión popular"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 5, "Control de daños")
			]
		},
		{
			id: "defender-funcionario-champagne",
			text: "🍾 Defender al funcionario",
			description: "Decir que tiene derecho a gastar su sueldo como quiera. Porque la libertad individual es sagrada.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -25, "Imagen de desconectado"),
				createImmediateEffect(MetricType.CORRUPCION, 15, "Tolerancia a los excesos"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, -15, "Memes eternos")
			]
		},
		{
			id: "crear-codigo-austeridad",
			text: "📋 Crear código de austeridad",
			description: "Implementar un código de austeridad para funcionarios. Prohibir gastos excesivos.",
			effects: [
				createImmediateEffect(MetricType.CORRUPCION, -5, "Medidas de transparencia"),
				createImmediateEffect(MetricType.POPULARIDAD, 8, "Buena imagen"),
				createImmediateEffect(MetricType.ECONOMIA, -2, "Costo de implementación")
			]
		}
	],
	defaultChoice: "echar-funcionario-champagne",
	icon: "💎",
	sound: "escandalo-lujo"
};

export const CRISIS_MEDICAMENTOS: PoliticalEvent = {
	id: "crisis-medicamentos-faltantes",
	title: "💊 Crisis de Medicamentos",
	description:
		"Faltan medicamentos en todo el país. Los diabéticos no encuentran insulina, los hipertensos no tienen pastillas y los laboratorios dicen que no es rentable producir. La gente está comprando medicamentos en el mercado negro o viajando a Uruguay.",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 5,
	timeLimit: 30,
	trigger: {
		requiredMetrics: {
			[MetricType.ECONOMIA]: { max: 35 }
		},
		probability: 0.8
	},
	choices: [
		{
			id: "subsidiar-medicamentos",
			text: "💰 Subsidiar medicamentos",
			description: "Usar fondos públicos para subsidiar la producción de medicamentos esenciales.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, -15, "Gasto en subsidios"),
				createImmediateEffect(MetricType.POPULARIDAD, 20, "Salud pública priorizada"),
				createImmediateEffect(MetricType.SEGURIDAD, 8, "Se calma la crisis")
			]
		},
		{
			id: "importar-medicamentos",
			text: "🌍 Importar medicamentos",
			description: "Traer medicamentos del exterior para suplir la falta. Caro pero efectivo.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, -10, "Gasto en importaciones"),
				createImmediateEffect(MetricType.POPULARIDAD, 15, "Solución rápida"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, 3, "Cooperación internacional")
			]
		},
		{
			id: "culpar-laboratorios",
			text: "🏭 Culpar a los laboratorios",
			description: "Echarle la culpa a los laboratorios privados y amenazar con estatizar la industria farmacéutica.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 10, "Narrativa anti-empresas"),
				createImmediateEffect(MetricType.ECONOMIA, -5, "Incertidumbre en el sector"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 8, "Control de la narrativa")
			],
			factionEffects: [
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: -25,
					description: "Los empresarios farmacéuticos se enojan"
				}
			]
		}
	],
	defaultChoice: "subsidiar-medicamentos",
	icon: "💊",
	sound: "crisis-salud"
};

export const PARO_CAMIONEROS: PoliticalEvent = {
	id: "paro-camioneros-moyano",
	title: "🚛 Paro de Camioneros",
	description:
		"Los camioneros pararon y no se mueve nada en el país. No llegan alimentos a los supermercados, no hay combustible en las estaciones y Moyano está negociando desde su despacho con aire acondicionado mientras el país se paraliza.",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 5,
	timeLimit: 30,
	trigger: {
		requiredMetrics: {
			[MetricType.ECONOMIA]: { max: 45 }
		},
		probability: 0.6
	},
	choices: [
		{
			id: "negociar-moyano",
			text: "🤝 Negociar con Moyano",
			description: "Sentarse a negociar con el líder de los camioneros. Porque Moyano siempre gana.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, -12, "Concesiones salariales"),
				createImmediateEffect(MetricType.POPULARIDAD, 5, "Se resuelve el conflicto"),
				createImmediateEffect(MetricType.SEGURIDAD, 10, "Normalización del transporte")
			],
			factionEffects: [
				{
					factionId: FactionId.SINDICALISTAS,
					supportChange: 30,
					description: "Los sindicalistas celebran otra victoria"
				}
			]
		},
		{
			id: "usar-ejercito-transporte",
			text: "🪖 Usar el ejército para transportar",
			description: "Militarizar el transporte temporalmente. Mostrar que el Estado no se deja presionar.",
			effects: [
				createImmediateEffect(MetricType.SEGURIDAD, -15, "Tensión social"),
				createImmediateEffect(MetricType.POPULARIDAD, -10, "Imagen autoritaria"),
				createImmediateEffect(MetricType.ECONOMIA, -8, "Costo de operativo militar")
			]
		},
		{
			id: "esperar-que-se-cansen",
			text: "⏰ Esperar que se cansen",
			description: "No ceder y esperar que el paro se desinfle solo. Jugar al desgaste.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -18, "Desabastecimiento"),
				createImmediateEffect(MetricType.ECONOMIA, -15, "Paralización económica"),
				createImmediateEffect(MetricType.SEGURIDAD, -12, "Caos en el transporte")
			]
		}
	],
	defaultChoice: "negociar-moyano",
	icon: "🚛",
	sound: "paro-camioneros"
};

// Array con todos los eventos argentinos adicionales
export const moreArgentineEvents: PoliticalEvent[] = [
	CORTE_DE_LUZ_MASIVO,
	ESCASEZ_CARNE,
	PARO_DOCENTE_ETERNO,
	INVASION_CARPINCHOS,
	FALTA_DOLAR_TURISMO,
	QUILOMBO_SUBTE,
	ESCANDALO_FUNCIONARIO_LUJO,
	CRISIS_MEDICAMENTOS,
	PARO_CAMIONEROS,
];

// Función para obtener eventos por provincia
export const getEventsByProvince = (provinceId: ProvinceId): PoliticalEvent[] => {
	return moreArgentineEvents.filter(event =>
		event.choices.some(choice =>
			choice.provinceModifiers && choice.provinceModifiers[provinceId]
		)
	);
};

// Función para obtener eventos por facción
export const getEventsByFaction = (factionId: FactionId): PoliticalEvent[] => {
	return moreArgentineEvents.filter(event =>
		event.choices.some(choice =>
			choice.factionEffects && choice.factionEffects.some(effect => effect.factionId === factionId)
		)
	);
};
