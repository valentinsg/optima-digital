/**
 * PRESIDENCIAL BARDO - Cadenas de Eventos Políticos
 * Eventos conectados que crean narrativas complejas y dependientes
 */

import {
	EventCategory,
	EventType,
	FactionId,
	MetricType,
	type PoliticalEvent
} from "@/types/political";
import { createImmediateEffect } from "@/utils/metricEffects";

// ===== CADENA: LA SAGA DEL DÓLAR =====

export const DOLAR_SUBE_LOCO: PoliticalEvent = {
	id: "dolar-sube-loco-inicio",
	title: "💸 El Dólar se Fue a la Mierda",
	description:
		"El dólar blue saltó de $500 a $800 en una semana. Los memes de 'Argentina momento' están trending worldwide. Tu ministro de Economía renunció por WhatsApp y ahora gobierna un bot de ChatGPT.",
	type: EventType.CRISIS,
	category: EventCategory.ECONOMICO,
	urgency: 5,
	timeLimit: 45,
	trigger: {
		requiredMetrics: {
			[MetricType.ECONOMIA]: { max: 40 }
		},
		probability: 0.7
	},
	choices: [
		{
			id: "culpar-especuladores",
			text: "🎯 Culpar a los especuladores",
			description: "Decir que todo es culpa de los 'especuladores' y anunciar medidas que no vas a cumplir.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -5, "La gente ya no se come el verso"),
				createImmediateEffect(MetricType.ECONOMIA, -8, "Los mercados se ríen de vos"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 10, "Narrativa anti-especuladores")
			]
		},
		{
			id: "emitir-mas-pesos",
			text: "🖨️ Prender la maquinita",
			description: "Imprimir más pesos para 'estabilizar' el mercado. Porque más pesos = más estabilidad, obvio.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, -15, "Inflación goes brrr"),
				createImmediateEffect(MetricType.POPULARIDAD, 8, "Más plata en el bolsillo (por ahora)"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -12, "El FMI se quiere matar")
			],
			triggeredEvents: ["hiperinflacion-desatada"]
		},
		{
			id: "crear-dolar-patriota",
			text: "🇦🇷 Crear el 'Dólar Patriota'",
			description: "Inventar un nuevo tipo de cambio oficial para 'verdaderos argentinos'. Porque si no podés controlar el dólar, creás otro.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 15, "La gente ama las medidas creativas"),
				createImmediateEffect(MetricType.ECONOMIA, -5, "Más confusión cambiaria"),
				createImmediateEffect(MetricType.CORRUPCION, 20, "Oportunidades de arbitraje infinitas")
			],
			triggeredEvents: ["guerra-de-dolares"]
		}
	],
	defaultChoice: "culpar-especuladores",
	icon: "💸",
	sound: "crisis-economica"
};

export const HIPERINFLACION_DESATADA: PoliticalEvent = {
	id: "hiperinflacion-desatada",
	title: "🔥 ¡Hiperinflación Desatada!",
	description:
		"La inflación llegó al 300% anual. Los precios cambian mientras hacés las compras. Un alfajor cuesta $2000 y subiendo. La gente hace trueque con dólares de Monopoly porque valen más que los pesos.",
	type: EventType.EMERGENCIA,
	category: EventCategory.ECONOMICO,
	urgency: 5,
	timeLimit: 30,
	trigger: {
		requiredChoices: [
			{ eventId: "dolar-sube-loco-inicio", choiceId: "emitir-mas-pesos" }
		],
		probability: 1
	},
	choices: [
		{
			id: "plan-austral-2",
			text: "💰 Plan Austral 2.0",
			description: "Crear una nueva moneda: el 'Peso Argentino Renovado'. Porque cambiar el nombre siempre funciona.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, 10, "Esperanza momentánea"),
				createImmediateEffect(MetricType.POPULARIDAD, 20, "La gente ama los planes nuevos"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -8, "El mundo ya conoce este truco")
			],
			triggeredEvents: ["plan-austral-fracaso"]
		},
		{
			id: "dolarizar-economia",
			text: "🇺🇸 Dolarizar la economía",
			description: "Tirar la toalla y adoptar el dólar americano. Admitir que perdiste la batalla.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, 25, "Estabilidad instantánea"),
				createImmediateEffect(MetricType.POPULARIDAD, -20, "Humillación nacional"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, 15, "Responsabilidad económica")
			]
		},
		{
			id: "culpar-a-macri",
			text: "👴 Culpar a Macri",
			description: "Decir que toda la culpa es de Macri, aunque haya pasado una década. El comodín eterno.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -15, "Ya no funciona el verso"),
				createImmediateEffect(MetricType.ECONOMIA, -10, "Seguís sin solucionar nada"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 5, "Narrativa conocida")
			]
		}
	],
	defaultChoice: "culpar-a-macri",
	icon: "🔥",
	sound: "colapso-economico"
};

export const GUERRA_DE_DOLARES: PoliticalEvent = {
	id: "guerra-de-dolares",
	title: "⚔️ Guerra de Dólares",
	description:
		"Ahora hay 47 tipos de dólar diferentes: blue, patriota, solidario, turista, Qatar, streaming, cripto, y el nuevo 'dólar Messi'. Nadie entiende nada y los arbolitos de Florida están haciendo fortuna.",
	type: EventType.CRISIS,
	category: EventCategory.ECONOMICO,
	urgency: 4,
	trigger: {
		requiredChoices: [
			{ eventId: "dolar-sube-loco-inicio", choiceId: "crear-dolar-patriota" }
		],
		probability: 1
	},
	choices: [
		{
			id: "unificar-dolares",
			text: "🎯 Unificar todos los dólares",
			description: "Intentar crear un solo tipo de cambio. Spoiler: no va a funcionar.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, 5, "Intento de orden"),
				createImmediateEffect(MetricType.POPULARIDAD, -10, "Caos en la transición"),
				createImmediateEffect(MetricType.CORRUPCION, -15, "Menos oportunidades de arbitraje")
			]
		},
		{
			id: "crear-mas-dolares",
			text: "📈 Crear más tipos de dólar",
			description: "Si no podés con ellos, unite. Crear el 'dólar influencer' y el 'dólar gamer'.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 15, "Creatividad argentina"),
				createImmediateEffect(MetricType.ECONOMIA, -20, "Caos cambiario total"),
				createImmediateEffect(MetricType.CORRUPCION, 25, "Paraíso de especuladores")
			],
			triggeredEvents: ["mercado-negro-dolares"]
		}
	],
	icon: "⚔️",
	sound: "guerra-cambiaria"
};

// ===== CADENA: LA SAGA DE LOS PIQUETES =====

export const PIQUETE_MASIVO_INICIO: PoliticalEvent = {
	id: "piquete-masivo-inicio",
	title: "🚧 Piquete Masivo Nacional",
	description:
		"Todos los movimientos sociales se unieron en un mega-piquete. Cortaron la 9 de Julio, la Panamericana, la General Paz y hasta el Obelisco. Buenos Aires está paralizada y los delivery de McDonald's no pueden pasar.",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 5,
	timeLimit: 60,
	trigger: {
		requiredMetrics: {
			[MetricType.POPULARIDAD]: { max: 30 },
			[MetricType.ECONOMIA]: { max: 35 }
		},
		probability: 0.8
	},
	choices: [
		{
			id: "negociar-planes",
			text: "💰 Negociar más planes sociales",
			description: "Darles más planes, subsidios y programas. La solución clásica argentina.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, -15, "Gasto en planes sociales"),
				createImmediateEffect(MetricType.POPULARIDAD, 10, "Sectores vulnerables contentos"),
				createImmediateEffect(MetricType.SEGURIDAD, 8, "Se calma la situación")
			],
			triggeredEvents: ["dependencia-planes-sociales"]
		},
		{
			id: "reprimir-piquetes",
			text: "🚔 Reprimir con gendarmería",
			description: "Mandar a la gendarmería a despejar todo. Mano dura contra el desorden.",
			effects: [
				createImmediateEffect(MetricType.SEGURIDAD, -25, "Violencia en las calles"),
				createImmediateEffect(MetricType.POPULARIDAD, -20, "Imagen de represor"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -15, "Críticas internacionales")
			],
			triggeredEvents: ["escalada-violencia-social"]
		},
		{
			id: "ignorar-piquetes",
			text: "🙈 Ignorar y esperar",
			description: "Hacerte el boludo y esperar que se cansen. Total, algún día se van a ir.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -15, "Imagen de inoperante"),
				createImmediateEffect(MetricType.ECONOMIA, -12, "Paralización económica"),
				createImmediateEffect(MetricType.SEGURIDAD, -10, "Pérdida de control")
			],
			triggeredEvents: ["piquetes-permanentes"]
		}
	],
	defaultChoice: "negociar-planes",
	icon: "🚧",
	sound: "piquete-masivo"
};

export const DEPENDENCIA_PLANES_SOCIALES: PoliticalEvent = {
	id: "dependencia-planes-sociales",
	title: "🔄 Dependencia de Planes Sociales",
	description:
		"Ahora el 60% de la población depende de planes sociales. Cada vez que hay un problema, la solución es más planes. Creaste un monstruo que se alimenta de subsidios y no para de crecer.",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 4,
	trigger: {
		requiredChoices: [
			{ eventId: "piquete-masivo-inicio", choiceId: "negociar-planes" }
		],
		probability: 1
	},
	choices: [
		{
			id: "reducir-planes",
			text: "✂️ Reducir gradualmente los planes",
			description: "Intentar reducir la dependencia de planes de manera gradual. Spoiler: va a ser un quilombo.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, 10, "Ahorro en gasto público"),
				createImmediateEffect(MetricType.POPULARIDAD, -25, "Furia de beneficiarios"),
				createImmediateEffect(MetricType.SEGURIDAD, -20, "Protestas masivas")
			],
			triggeredEvents: ["revuelta-planeros"]
		},
		{
			id: "crear-mas-planes",
			text: "📈 Crear más planes",
			description: "Si no podés reducir, agregá más. Plan para todo: plan mascota, plan streaming, plan delivery.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 20, "Todos contentos con más planes"),
				createImmediateEffect(MetricType.ECONOMIA, -25, "Gasto público insostenible"),
				createImmediateEffect(MetricType.CORRUPCION, 15, "Más oportunidades de corrupción")
			],
			triggeredEvents: ["colapso-sistema-social"]
		}
	],
	icon: "🔄",
	sound: "dependencia-social"
};

// ===== CADENA: LA SAGA DEL FÚTBOL =====

export const CRISIS_FUTBOL_INICIO: PoliticalEvent = {
	id: "crisis-futbol-inicio",
	title: "⚽ Crisis del Fútbol Argentino",
	description:
		"La AFA está quebrada, los clubes deben salarios hace 8 meses y los jugadores amenazan con hacer paro. Para colmo, la Selección perdió con Bolivia 3-0 y Scaloni renunció por Instagram.",
	type: EventType.CRISIS,
	category: EventCategory.DEPORTIVO,
	urgency: 5,
	timeLimit: 45,
	trigger: {
		requiredMetrics: {
			[MetricType.POPULARIDAD]: { max: 50 }
		},
		probability: 0.4
	},
	choices: [
		{
			id: "salvar-futbol",
			text: "💸 Salvar el fútbol con fondos públicos",
			description: "Usar plata del Estado para rescatar al fútbol. Porque el fútbol es más importante que la educación.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 25, "Héroe del fútbol argentino"),
				createImmediateEffect(MetricType.ECONOMIA, -20, "Gasto público en fútbol"),
				createImmediateEffect(MetricType.SEGURIDAD, 10, "Hinchas contentos")
			],
			factionEffects: [
				{
					factionId: FactionId.BARRAS_BRAVAS,
					supportChange: 40,
					description: "Las barras te aman por salvar el fútbol"
				}
			],
			triggeredEvents: ["futbol-estatal"]
		},
		{
			id: "privatizar-futbol",
			text: "🏢 Privatizar el fútbol",
			description: "Que se arreglen solos. El fútbol debería ser un negocio privado, no un subsidio estatal.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -30, "Traidor del fútbol"),
				createImmediateEffect(MetricType.ECONOMIA, 5, "Ahorro en subsidios"),
				createImmediateEffect(MetricType.SEGURIDAD, -15, "Furia de hinchas")
			],
			factionEffects: [
				{
					factionId: FactionId.BARRAS_BRAVAS,
					supportChange: -60,
					description: "Las barras te declaran enemigo público"
				},
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: 20,
					description: "Los empresarios apoyan la privatización"
				}
			],
			triggeredEvents: ["guerra-barras-estado"]
		}
	],
	defaultChoice: "salvar-futbol",
	icon: "⚽",
	sound: "crisis-futbol"
};

export const FUTBOL_ESTATAL: PoliticalEvent = {
	id: "futbol-estatal",
	title: "🏛️ Fútbol Estatal",
	description:
		"Ahora el Estado maneja el fútbol argentino. Creaste el 'Ministerio del Fútbol' y nombraste a Riquelme como ministro. Los partidos se juegan con himnos y discursos políticos en el entretiempo.",
	type: EventType.CONSECUENCIA,
	category: EventCategory.DEPORTIVO,
	urgency: 3,
	trigger: {
		requiredChoices: [
			{ eventId: "crisis-futbol-inicio", choiceId: "salvar-futbol" }
		],
		probability: 1
	},
	choices: [
		{
			id: "politizar-futbol",
			text: "🎯 Politizar completamente el fútbol",
			description: "Usar el fútbol como herramienta política. Los equipos ahora representan partidos políticos.",
			effects: [
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 25, "Control de la narrativa futbolística"),
				createImmediateEffect(MetricType.POPULARIDAD, -15, "División en el fútbol"),
				createImmediateEffect(MetricType.SEGURIDAD, -20, "Violencia política en estadios")
			]
		},
		{
			id: "mantener-autonomia",
			text: "⚖️ Mantener autonomía deportiva",
			description: "Financiar pero no interferir. Dejar que el fútbol siga siendo fútbol.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 15, "Respeto por la autonomía"),
				createImmediateEffect(MetricType.ECONOMIA, -10, "Gasto continuo sin control"),
				createImmediateEffect(MetricType.SEGURIDAD, 5, "Estabilidad en el fútbol")
			]
		}
	],
	icon: "🏛️",
	sound: "futbol-politico"
};

// ===== CADENA: LA SAGA DE LAS PROVINCIAS =====

export const REBELION_PROVINCIAL_INICIO: PoliticalEvent = {
	id: "rebelion-provincial-inicio",
	title: "🏴 Rebelión Provincial",
	description:
		"Tres provincias del norte se declararon en rebeldía. Dicen que no van a mandar más impuestos a la Nación hasta que no reciban su parte justa. Crearon la 'Confederación del Norte' y tienen su propia moneda: el 'Norteño'.",
	type: EventType.CRISIS,
	category: EventCategory.PROVINCIAL,
	urgency: 5,
	timeLimit: 60,
	trigger: {
		requiredMetrics: {
			[MetricType.POPULARIDAD]: { max: 40 }
		},
		probability: 0.3
	},
	choices: [
		{
			id: "negociar-coparticipacion",
			text: "💰 Negociar nueva coparticipación",
			description: "Darles más plata de coparticipación. Ceder ante sus demandas.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, -15, "Más gasto en provincias"),
				createImmediateEffect(MetricType.POPULARIDAD, 10, "Solución pacífica"),
				createImmediateEffect(MetricType.SEGURIDAD, 8, "Se evita el conflicto")
			],
			triggeredEvents: ["efecto-domino-provincial"]
		},
		{
			id: "intervenir-provincias",
			text: "🏛️ Intervenir las provincias rebeldes",
			description: "Mandar interventores federales. Mostrar quién manda en el país.",
			effects: [
				createImmediateEffect(MetricType.SEGURIDAD, -20, "Conflicto institucional"),
				createImmediateEffect(MetricType.POPULARIDAD, -15, "Autoritarismo"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -10, "Preocupación internacional")
			],
			triggeredEvents: ["guerra-civil-provincial"]
		}
	],
	defaultChoice: "negociar-coparticipacion",
	icon: "🏴",
	sound: "rebelion-provincial"
};

export const EFECTO_DOMINO_PROVINCIAL: PoliticalEvent = {
	id: "efecto-domino-provincial",
	title: "🎯 Efecto Dominó Provincial",
	description:
		"Al ceder con las provincias rebeldes, ahora todas las demás provincias quieren lo mismo. Córdoba exige autonomía fiscal, Mendoza quiere controlar sus recursos naturales y La Pampa... bueno, nadie sabe qué quiere La Pampa.",
	type: EventType.CRISIS,
	category: EventCategory.PROVINCIAL,
	urgency: 4,
	trigger: {
		requiredChoices: [
			{ eventId: "rebelion-provincial-inicio", choiceId: "negociar-coparticipacion" }
		],
		probability: 1
	},
	choices: [
		{
			id: "federalizar-todo",
			text: "🗺️ Federalizar completamente",
			description: "Darle autonomía total a todas las provincias. Convertir Argentina en una confederación.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, -25, "Pérdida de ingresos fiscales"),
				createImmediateEffect(MetricType.POPULARIDAD, 20, "Satisfacción provincial"),
				createImmediateEffect(MetricType.SEGURIDAD, -15, "Fragmentación del país")
			],
			triggeredEvents: ["argentina-confederada"]
		},
		{
			id: "resistir-demandas",
			text: "✊ Resistir las demandas",
			description: "Decir que no a todas las demás provincias. Mantener la unidad nacional.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -20, "Enojo provincial generalizado"),
				createImmediateEffect(MetricType.SEGURIDAD, -25, "Conflictos en múltiples provincias"),
				createImmediateEffect(MetricType.ECONOMIA, 10, "Mantenimiento de ingresos fiscales")
			],
			triggeredEvents: ["caos-federal"]
		}
	],
	icon: "🎯",
	sound: "efecto-domino"
};

// Array con todas las cadenas de eventos
export const eventChains: PoliticalEvent[] = [
	// Cadena del Dólar
	DOLAR_SUBE_LOCO,
	HIPERINFLACION_DESATADA,
	GUERRA_DE_DOLARES,

	// Cadena de Piquetes
	PIQUETE_MASIVO_INICIO,
	DEPENDENCIA_PLANES_SOCIALES,

	// Cadena del Fútbol
	CRISIS_FUTBOL_INICIO,
	FUTBOL_ESTATAL,

	// Cadena Provincial
	REBELION_PROVINCIAL_INICIO,
	EFECTO_DOMINO_PROVINCIAL,
];

// Función para obtener eventos por cadena
export const getEventChain = (chainId: string): PoliticalEvent[] => {
	const chains: Record<string, PoliticalEvent[]> = {
		dolar: [DOLAR_SUBE_LOCO, HIPERINFLACION_DESATADA, GUERRA_DE_DOLARES],
		piquetes: [PIQUETE_MASIVO_INICIO, DEPENDENCIA_PLANES_SOCIALES],
		futbol: [CRISIS_FUTBOL_INICIO, FUTBOL_ESTATAL],
		provincial: [REBELION_PROVINCIAL_INICIO, EFECTO_DOMINO_PROVINCIAL],
	};

	return chains[chainId] || [];
};

// Función para verificar si un evento puede desencadenar otros
export const getTriggeredEvents = (eventId: string, choiceId: string): string[] => {
	const event = eventChains.find(e => e.id === eventId);
	if (!event) return [];

	const choice = event.choices.find(c => c.id === choiceId);
	return choice?.triggeredEvents || [];
};

// ===== NUEVAS CADENAS DE EVENTOS (GENERADAS POR IA) =====

// ######### CADENA: CRISIS ECONÓMICA #########

export const ECONOMIA_AL_HORNO: PoliticalEvent = {
	id: "economia-al-horno",
	title: "🍬 Economía al horno",
	description:
		"La inflación se fue al carajo: precios suben cada hora, el peso vale menos que un caramelo. La gente está en pánico, saqueando supermercados metafóricamente mientras remarcan los precios. Urge tomar medidas drásticas antes de que explote todo.",
	type: EventType.CRISIS,
	category: EventCategory.ECONOMICO,
	urgency: 5,
	trigger: {
		probability: 0.5, // Probabilidad base, ajustar según balanceo
	},
	choices: [
		{
			id: "aplicar-shock-ortodoxo",
			text: "📈 Aplicar shock ortodoxo",
			description: "Aplicar un shock ortodoxo (ajuste fiscal y suba de tasas ya).",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -8, "El ajuste fiscal genera descontento inmediato."),
				createImmediateEffect(MetricType.ECONOMIA, 3, "Se espera una mejora económica a largo plazo."),
			],
			triggeredEvents: ["el-ajuste-duele"],
		},
		{
			id: "congelar-precios",
			text: "🥶 Congelar precios y tarifas",
			description: "Congelar precios y tarifas con mano dura (plan populista express).",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 5, "La gente apoya el congelamiento al principio."),
				createImmediateEffect(MetricType.ECONOMIA, -4, "El control de precios genera distorsiones en el mercado."),
			],
			triggeredEvents: ["congelador-lleno-de-grietas"],
		},
	],
	icon: "🍬",
	sound: "crisis-economy",
};

export const EL_AJUSTE_DUELE: PoliticalEvent = {
	id: "el-ajuste-duele",
	title: "🔥 El ajuste duele",
	description:
		"Aplicaste recortes brutales y tarifazos. El FMI aplaude, pero el pueblo está furioso: cacerolazos todas las noches y piquetes en la 9 de Julio. Sindicatos convocan huelga general contra tu 'plan de hambre'. La situación está que arde.",
	type: EventType.CONSECUENCIA,
	category: EventCategory.ECONOMICO,
	urgency: 5,
	trigger: {
		requiredChoices: [{ eventId: "economia-al-horno", choiceId: "aplicar-shock-ortodoxo" }],
		probability: 1,
	},
	choices: [
		{
			id: "bancar-el-plan",
			text: "🏦 Bancar el plan",
			description: "Bancar el plan a toda costa pese al odio en las calles.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -5, "La persistencia en el ajuste aumenta el enojo popular."),
				createImmediateEffect(MetricType.ECONOMIA, 2, "El mercado confía en tu determinación."),
			],
			triggeredEvents: ["remedio-amargo"],
		},
	],
	icon: "🔥",
	sound: "protesta-masiva",
};

export const REMEDIO_AMARGO: PoliticalEvent = {
	id: "remedio-amargo",
	title: "📉 Remedio amargo",
	description:
		"Tras meses de dolor, la inflación afloja un poco y el peso deja de caer en picada. La economía muestra un tibio rebote, pero la recesión pegó duro y tu aprobación está por el piso. El FMI te felicita con un aplauso sarcástico, pero el pueblo te quiere prender fuego.",
	type: EventType.CONSECUENCIA,
	category: EventCategory.ECONOMICO,
	urgency: 3,
	trigger: {
		requiredChoices: [{ eventId: "el-ajuste-duele", choiceId: "bancar-el-plan" }],
		probability: 1,
	},
	choices: [
		{
			id: "reconstruir-imagen",
			text: "✨ Reconstruir la imagen",
			description: "Tratar de reconstruir la imagen con la incipiente estabilidad.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 1, "La estabilidad empieza a mejorar la percepción pública lentamente."),
				createImmediateEffect(MetricType.ECONOMIA, 1, "La economía se estabiliza, pero el crecimiento es lento."),
			],
		},
	],
	icon: "📉",
	sound: "noticia-positiva-tenue",
};

export const CONGELADOR_LLENO_DE_GRIETAS: PoliticalEvent = {
	id: "congelador-lleno-de-grietas",
	title: "🧊 Congelador lleno de grietas",
	description:
		"Congelaste precios y tarifas. Al principio la gente respira aliviada, pero rápido empiezan a faltar productos: góndolas vacías y mercados paralelos surgen en las sombras. Los empresarios están que trinan y se habla de desabastecimiento. La paz era ilusoria y el mercado negro está on fire.",
	type: EventType.CONSECUENCIA,
	category: EventCategory.ECONOMICO,
	urgency: 4,
	trigger: {
		requiredChoices: [{ eventId: "economia-al-horno", choiceId: "congelar-precios" }],
		probability: 1,
	},
	choices: [
		{
			id: "doblar-la-apuesta",
			text: "👮‍♂️ Doblar la apuesta",
			description: "Doblar la apuesta: controlar y multar a quien aumente o esconda mercadería.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -2, "La mano dura genera rechazo y miedo."),
				createImmediateEffect(MetricType.ECONOMIA, -3, "Mayor control ahoga más la producción."),
			],
			triggeredEvents: ["colapso-congelado"],
		},
	],
	icon: "🧊",
	sound: "mercado-negro",
};

export const COLAPSO_CONGELADO: PoliticalEvent = {
	id: "colapso-congelado",
	title: "💸 Colapso congelado",
	description:
		"La economía informal florece: el asado se vende bajo el mostrador a precio dolarizado. Tras meses de escasez y caos, el congelamiento estalla por los aires y terminás devaluando de golpe. La gente te culpa por el caos y tu popularidad se hunde junto con la economía. Un quilombo total.",
	type: EventType.CONSECUENCIA,
	category: EventCategory.ECONOMICO,
	urgency: 5,
	trigger: {
		requiredChoices: [{ eventId: "congelador-lleno-de-grietas", choiceId: "doblar-la-apuesta" }],
		probability: 1,
	},
	choices: [
		{
			id: "reconocer-desastre",
			text: "🙏 Reconocer el desastre",
			description: "Reconocer el desastre y prometer nunca más recetas mágicas.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -1, "La honestidad no alcanza para calmar el enojo."),
				createImmediateEffect(MetricType.ECONOMIA, -2, "La devaluación post-congelamiento es un golpe duro."),
			],
		},
	],
	icon: "💸",
	sound: "colapso-economico",
};

// ######### CADENA: CORRUPCIÓN Y JUSTICIA #########

export const BOLSOS_EN_EL_CONVENTO: PoliticalEvent = {
	id: "bolsos-en-el-convento",
	title: "👜 Bolsos en el convento",
	description:
		"Un escándalo explota: atrapan a un funcionario tuyo arrojando bolsos repletos de dólares por encima del muro de un convento a medianoche. Las monjitas atónitas, los videos virales, y todos preguntan de dónde salió tamaña fortuna. Te salpica la sospecha de corrupción y el país está en shock.",
	type: EventType.CRISIS,
	category: EventCategory.CORRUPCION,
	urgency: 5,
	trigger: { probability: 0.2 },
	choices: [
		{
			id: "sacrificar-funcionario",
			text: "🔪 Sacrificar al funcionario",
			description: "Sacrificar al funcionario: condenarlo públicamente y entregarlo a la Justicia.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 3, "La acción rápida es vista como un gesto de transparencia."),
				createImmediateEffect(MetricType.CORRUPCION, -5, "Se muestra una postura en contra de la corrupción."),
			],
			triggeredEvents: ["lavada-de-manos"],
		},
		{
			id: "defender-a-muerte",
			text: "🛡️ Defenderlo a muerte",
			description: "Afirmar que es una operación política y defender a tu hombre a muerte.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -5, "Defender lo indefendible daña tu imagen."),
				createImmediateEffect(MetricType.CORRUPCION, 8, "Se percibe como encubrimiento."),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, -5, "Los medios critican la defensa."),
			],
			triggeredEvents: ["negacion-y-contraataque"],
		},
	],
	icon: "👜",
	sound: "escandalo-politico",
};

export const LAVADA_DE_MANOS: PoliticalEvent = {
	id: "lavada-de-manos",
	title: "🙏 Lavada de manos",
	description:
		"Te despegás del escándalo echando al funcionario y diciendo que te 'sentiste engañado'. Colaborás con la investigación y hasta vas a misa con las monjas indignadas. Muchos te creen y rescatan tu gesto de transparencia, aunque los más cínicos dicen que solo salvaste tu pellejo a tiempo.",
	type: EventType.CONSECUENCIA,
	category: EventCategory.CORRUPCION,
	urgency: 4,
	trigger: {
		requiredChoices: [{ eventId: "bolsos-en-el-convento", choiceId: "sacrificar-funcionario" }],
		probability: 1,
	},
	choices: [
		{
			id: "respirar-aliviado",
			text: "😅 Respirar aliviado",
			description: "Respirar aliviado y aprender la lección... ¿quizá?.",
			effects: [createImmediateEffect(MetricType.POPULARIDAD, 1, "La crisis parece contenida, por ahora.")],
		},
	],
	icon: "🙏",
	sound: "noticia-positiva-tenue",
};

export const NEGACION_Y_CONTRAATAQUE: PoliticalEvent = {
	id: "negacion-y-contraataque",
	title: "😤 Negación y contraataque",
	description:
		"Doblete: defendés a tu funcionario diciendo que esos dólares eran para caridad y acusás a la oposición de armar un circo mediático. Solo tus aplaudidores te creen. La mayoría ve un encubrimiento burdo. Las encuestas se desploman y hasta en tu partido algunos te miran torcido por inmolarte así.",
	type: EventType.CONSECUENCIA,
	category: EventCategory.CORRUPCION,
	urgency: 5,
	trigger: {
		requiredChoices: [{ eventId: "bolsos-en-el-convento", choiceId: "defender-a-muerte" }],
		probability: 1,
	},
	choices: [
		{
			id: "aguantar-chaparrón",
			text: "🌧️ Aguantar el chaparrón",
			description: "Aguantar el chaparrón y seguir negando hasta el final.",
			effects: [createImmediateEffect(MetricType.POPULARIDAD, -3, "La negación erosiona aún más tu credibilidad.")],
		},
	],
	icon: "😤",
	sound: "tension-politica",
};

// ######### CADENA: CRISIS SOCIAL #########

export const JUSTICIA_MANO_PROPIA: PoliticalEvent = {
	id: "justicia-por-mano-propia",
	title: "✊ Justicia por mano propia",
	description:
		"Cansados de robos, vecinos de un barrio arman patrullas vecinales y linchan a un sospechoso. La policía llega tarde y la situación es un caos. Unos celebran a los 'justicieros', otros advierten que así empiezan los desastres. Te toca definir posición ante la seguridad por mano propia.",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 4,
	trigger: { probability: 0.3 },
	choices: [
		{
			id: "aplaudir-vecinos",
			text: "👏 Aplaudir a los vecinos",
			description: "Aplaudir a los vecinos y alentarlos a defenderse si el Estado no llega.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 1, "Un sector apoya la mano dura."),
				createImmediateEffect(MetricType.SEGURIDAD, -3, "Se fomenta un clima de anarquía y violencia."),
			],
			triggeredEvents: ["pueblada-fatal"],
		},
		{
			id: "condenar-linchamiento",
			text: "🚔 Condenar el linchamiento",
			description: "Condenar el linchamiento y enviar más policías al barrio.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 2, "La mayoría apoya una solución institucional."),
				createImmediateEffect(MetricType.SEGURIDAD, 2, "Se refuerza el rol del Estado."),
			],
		},
	],
	icon: "✊",
	sound: "disturbios-violentos",
};

export const PUEBLADA_FATAL: PoliticalEvent = {
	id: "pueblada-fatal",
	title: "💔 Pueblada fatal",
	description:
		"Alentados por tu guiño, los vecinos justicieros se descontrolan. En una redada barrial matan por error a un pibe inocente confundiéndolo con un chorro. Ahora tenés un muerto absurdo, la opinión pública horrorizada y pedidos de renuncia por avalar la barbarie. Un tiro por la culata en toda regla.",
	type: EventType.CONSECUENCIA,
	category: EventCategory.SOCIAL,
	urgency: 5,
	trigger: {
		requiredChoices: [{ eventId: "justicia-por-mano-propia", choiceId: "aplaudir-vecinos" }],
		probability: 1,
	},
	choices: [
		{
			id: "reconocer-error",
			text: " mea-culpa Reconocer el error",
			description: "Reconocer el error y anunciar que la seguridad la brinda el Estado, no las turbas.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -4, "El reconocimiento del error no borra la tragedia."),
				createImmediateEffect(MetricType.SEGURIDAD, 3, "Se intenta retomar el control de la seguridad."),
			],
		},
	],
	icon: "💔",
	sound: "tragedia-nacional",
};

// --- Añadir los nuevos eventos a la lista exportada ---
eventChains.push(
	ECONOMIA_AL_HORNO,
	EL_AJUSTE_DUELE,
	REMEDIO_AMARGO,
	CONGELADOR_LLENO_DE_GRIETAS,
	COLAPSO_CONGELADO,
	BOLSOS_EN_EL_CONVENTO,
	LAVADA_DE_MANOS,
	NEGACION_Y_CONTRAATAQUE,
	JUSTICIA_MANO_PROPIA,
	PUEBLADA_FATAL
);
