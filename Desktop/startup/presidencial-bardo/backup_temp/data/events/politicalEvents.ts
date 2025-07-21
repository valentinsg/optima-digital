/**
 * PRESIDENCIAL BARDO - Base de Datos de Eventos Políticos
 * Eventos políticos argentinos con humor negro y realismo distópico
 */

import {
    EventCategory,
    EventType,
    MetricType,
    ProvinceId,
    type PoliticalEvent,
} from "@/types/political";
import {
    createImmediateEffect
} from "@/utils/metricEffects";

// ===== EVENTOS ECONÓMICOS =====

export const CRISIS_DOLAR_BLUE: PoliticalEvent = {
	id: "crisis-dolar-blue-2025",
	title: "🔥 Crisis del Dólar Blue",
	description: "El dólar blue se fue al carajo otra vez. Los ahorristas están desesperados, los memes no paran de circular y los financistas de Florida y Microcentro andan con cara de póker. La brecha cambiaria superó el 100% y hasta los aliens están pidiendo explicaciones.",
	type: EventType.CRISIS,
	category: EventCategory.ECONOMICO,
	urgency: 4,
	timeLimit: 30,
	trigger: {
		requiredMetrics: {
			[MetricType.ECONOMIA]: { max: 60 }
		},
		probability: 0.8
	},
	choices: [
		{
			id: "intervenir-mercado",
			text: "🏛️ Intervenir el mercado cambiario",
			description: "Controlar por decreto, imponer restricciones y crear más regulaciones. La clásica solución argentina.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, -3, "Intervención costosa y distorsiva"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 4, "Narrativa de control estatal"),
				createImmediateEffect(MetricType.POPULARIDAD, -2, "Molestia de sectores medios"),
				createImmediateEffect(MetricType.CORRUPCION, 3, "Oportunidades de corrupción en controles")
			]
		},
		{
			id: "culpar-gobierno-anterior",
			text: "👴 Culpar al gobierno anterior",
			description: "La estrategia más argentina que existe. Decir que toda la culpa es de los que vinieron antes.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -4, "Excusas baratas que ya no funcionan"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 2, "Narrativa política repetitiva"),
				createImmediateEffect(MetricType.ECONOMIA, -2, "No se soluciona nada"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -1, "Imagen de país poco serio")
			]
		},
		{
			id: "emitir-dinero",
			text: "💸 Emitir dinero para calmar las aguas",
			description: "La maquinita goes brrr. Imprimir billetes para que la gente tenga más plata, ¿qué puede salir mal?",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 3, "Plata en el bolsillo, contentos momentáneos"),
				createImmediateEffect(MetricType.ECONOMIA, -6, "Inflación y devaluación acelerada"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -4, "FMI y mundo financiero enojados"),
				createImmediateEffect(MetricType.CORRUPCION, 4, "Más dinero circulando = más oportunidades turbias")
			],
			triggeredEvents: ["inflacion-descontrolada"]
		},
		{
			id: "llamar-a-messi",
			text: "⚽ Llamar a Messi para que calme al país",
			description: "Cuando todo falla, siempre queda Messi. Pedirle que haga una aparición pública para distraer a la gente.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 8, "Messi siempre funciona"),
				createImmediateEffect(MetricType.ECONOMIA, -1, "No se soluciona nada, pero al menos está Messi"),
				createImmediateEffect(MetricType.SEGURIDAD, 2, "La gente se calma con fútbol"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 3, "Todos hablan de Messi, no del dólar")
			]
		}
	],
	defaultChoice: "culpar-gobierno-anterior",
	autoEffects: [
		createImmediateEffect(MetricType.ECONOMIA, -3, "Crisis automática del dólar")
	],
	icon: "💵",
	sound: "escandalo-politico"
};

export const PIQUETE_9_DE_JULIO: PoliticalEvent = {
	id: "piquete-9-de-julio",
	title: "🚧 Piquete en 9 de Julio",
	description: "Los piqueteros cortaron la 9 de Julio otra vez. Miles de laburantes no pueden llegar al trabajo, los bondis están parados y los taxis cobran fortuna. La gente está podrida pero los manifestantes no afloran. Típico martes argentino.",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 3,
	timeLimit: 45,
	trigger: {
		requiredMetrics: {
			[MetricType.POPULARIDAD]: { max: 40 },
			[MetricType.ECONOMIA]: { max: 50 }
		},
		probability: 0.6
	},
	choices: [
		{
			id: "negociar-piqueteros",
			text: "🤝 Negociar con los piqueteros",
			description: "Mandar a un funcionario a hablar con los líderes. Prometerles planes sociales y subsidios.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -3, "La gente que trabaja se enoja"),
				createImmediateEffect(MetricType.ECONOMIA, -4, "Más gasto en planes sociales"),
				createImmediateEffect(MetricType.SEGURIDAD, 2, "Se calma la situación"),
				createImmediateEffect(MetricType.CORRUPCION, 2, "Manejo de fondos de planes sociales")
			]
		},
		{
			id: "reprimir-piquete",
			text: "🚔 Mandar a la policía a reprimir",
			description: "Que la cana los saque a patadas. Orden y autoridad, como corresponde.",
			effects: [
				createImmediateEffect(MetricType.SEGURIDAD, -5, "Represión genera más violencia"),
				createImmediateEffect(MetricType.POPULARIDAD, -6, "Imagen de represor"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -3, "Organismos internacionales critican"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, -2, "Medios muestran la represión")
			],
			triggeredEvents: ["disturbios-violentos"]
		},
		{
			id: "ignorar-piquete",
			text: "🙈 Ignorar y que se arreglen solos",
			description: "Hacerse el boludo y esperar que se cansen. Total, siempre terminan levantando el piquete.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -4, "Imagen de inoperante"),
				createImmediateEffect(MetricType.ECONOMIA, -3, "Pérdidas por paralización"),
				createImmediateEffect(MetricType.SEGURIDAD, -2, "Descontrol social"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, -3, "Medios critican inacción")
			]
		},
		{
			id: "culpar-ciudad",
			text: "🏛️ Culpar a la Ciudad de Buenos Aires",
			description: "Decir que es responsabilidad de Larreta/Rodríguez Larreta/quien sea que gobierne CABA. Clásica chicana política.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -2, "Chicana política barata"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 3, "Narrativa de conflicto institucional"),
				createImmediateEffect(MetricType.ECONOMIA, -2, "No se soluciona nada"),
				createImmediateEffect(MetricType.SEGURIDAD, -1, "Pase de responsabilidades")
			]
		}
	],
	defaultChoice: "ignorar-piquete",
	autoEffects: [
		createImmediateEffect(MetricType.ECONOMIA, -2, "Paralización automática por piquete")
	],
	icon: "🚧",
	sound: "superclasico"
};

export const ESCANDALO_CORRUPCION: PoliticalEvent = {
	id: "escandalo-corrupcion-funcionario",
	title: "🕵️ Escándalo de Corrupción",
	description: "Salió a la luz que un funcionario cercano a tu gobierno tiene 47 propiedades, 12 autos de lujo y una colección de relojes que vale más que el PBI de Chaco. Los medios están como locos y la oposición pide tu cabeza. La clásica argentina.",
	type: EventType.CRISIS,
	category: EventCategory.CORRUPCION,
	urgency: 5,
	timeLimit: 20,
	trigger: {
		requiredMetrics: {
			[MetricType.CORRUPCION]: { min: 30 }
		},
		probability: 0.4
	},
	choices: [
		{
			id: "echar-funcionario",
			text: "🔥 Echar al funcionario inmediatamente",
			description: "Cortar por lo sano. Decir que no sabías nada y que no tolerás la corrupción.",
			effects: [
				createImmediateEffect(MetricType.CORRUPCION, -10, "Medida anticorrupción"),
				createImmediateEffect(MetricType.POPULARIDAD, 5, "Decisión popular"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, -5, "Reconocimiento implícito del problema"),
				createImmediateEffect(MetricType.SEGURIDAD, -3, "Inestabilidad interna")
			]
		},
		{
			id: "defender-funcionario",
			text: "🛡️ Defender al funcionario",
			description: "Decir que es una operación política de la oposición y que todo está en regla. Bancarlo hasta el final.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -20, "Imagen de corrupto"),
				createImmediateEffect(MetricType.CORRUPCION, 15, "Tolerancia a la corrupción"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, -12, "Medios en contra"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -8, "Imagen internacional negativa")
			],
			triggeredEvents: ["investigacion-internacional"]
		},
		{
			id: "crear-comision-investigadora",
			text: "🔍 Crear comisión investigadora",
			description: "La clásica: crear una comisión que investigate por 2 años y no llegue a ninguna conclusión.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -8, "Maniobra dilatoria obvia"),
				createImmediateEffect(MetricType.CORRUPCION, 5, "Tiempo para ocultar pruebas"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 3, "Narrativa de transparencia"),
				createImmediateEffect(MetricType.ECONOMIA, -5, "Costo de la comisión")
			]
		},
		{
			id: "atacar-medios",
			text: "📺 Atacar a los medios",
			description: "Decir que es una campaña de desprestigio de los medios hegemónicos. Hablar de lawfare y persecución.",
			effects: [
				createImmediateEffect(MetricType.CONTROL_MEDIOS, -15, "Guerra con los medios"),
				createImmediateEffect(MetricType.POPULARIDAD, -10, "Deflección obvia"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -5, "Imagen autoritaria"),
				createImmediateEffect(MetricType.CORRUPCION, 8, "No se investiga nada")
			]
		}
	],
	defaultChoice: "crear-comision-investigadora",
	autoEffects: [
		createImmediateEffect(MetricType.POPULARIDAD, -5, "Escándalo automático")
	],
	icon: "🕵️",
	sound: "escandalo-politico"
};

export const CRISIS_CHACO: PoliticalEvent = {
	id: "crisis-electrica-chaco",
	title: "⚡ Crisis Eléctrica en Chaco",
	description: "Chaco se quedó sin luz... otra vez. Los chaqueños están acostumbrados pero esta vez la cosa se complicó porque se cortó durante la final de la Copa América. Ahora están enojados posta y amenazan con independizarse. Aunque nadie sabe si alguien se daría cuenta.",
	type: EventType.HUMOR_NEGRO,
	category: EventCategory.PROVINCIAL,
	urgency: 2,
	timeLimit: 60,
	provinceId: ProvinceId.CHACO,
	trigger: {
		requiredMetrics: {
			[MetricType.ECONOMIA]: { max: 45 }
		},
		probability: 0.3
	},
	choices: [
		{
			id: "enviar-generadores",
			text: "🔌 Enviar generadores de emergencia",
			description: "Mandar generadores para que tengan luz. Por lo menos hasta que termine el partido.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, -8, "Costo de generadores y logística"),
				createImmediateEffect(MetricType.POPULARIDAD, 3, "Gesto simpático"),
				createImmediateEffect(MetricType.SEGURIDAD, 2, "Chaco contento, Chaco pacífico")
			]
		},
		{
			id: "mandar-velas",
			text: "🕯️ Mandarles velas y que se arreglen",
			description: "Enviar velas aromáticas y decir que es una experiencia 'mindfulness'. Relajación by Chaco.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -5, "Chaco se siente abandonado"),
				createImmediateEffect(MetricType.ECONOMIA, -1, "Costo de velas"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 8, "Meme viral nacional"),
				createImmediateEffect(MetricType.SEGURIDAD, -2, "Ligero descontento chaqueño")
			]
		},
		{
			id: "ignorar-chaco",
			text: "🙈 Ignorar y esperar que se acostumbren",
			description: "Total, están acostumbrados. Que se las arreglen como siempre.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -8, "Chaco se siente olvidado"),
				createImmediateEffect(MetricType.SEGURIDAD, -4, "Descontento provincial"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, -3, "Mala imagen en medios")
			]
		},
		{
			id: "culpar-al-clima",
			text: "🌡️ Culpar al cambio climático",
			description: "Decir que es por el calentamiento global y que Argentina es víctima del mundo desarrollado.",
			effects: [
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, 5, "Narrativa ecológica"),
				createImmediateEffect(MetricType.POPULARIDAD, -3, "Excusa poco creíble"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 6, "Desvío de atención"),
				createImmediateEffect(MetricType.ECONOMIA, -2, "No se soluciona nada")
			]
		}
	],
	defaultChoice: "mandar-velas",
	autoEffects: [
		createImmediateEffect(MetricType.ECONOMIA, -1, "Costo de la crisis eléctrica")
	],
	icon: "⚡",
	sound: "apagon-chaco"
};

export const TENSION_CON_BRASIL: PoliticalEvent = {
	id: "tension-diplomatica-brasil",
	title: "🇧🇷 Tensión Diplomática con Brasil",
	description: "Brasil se enojó porque dijiste que el fútbol brasileño es 'jogo bonito pero sin huevos'. Ahora Bolsonaro/Lula (quien sea que gobierne) está haciendo quilombo y amenaza con cerrar la frontera. Los brasileños están trolleando en redes sociales y hasta subieron memes de Maradona vs Pelé.",
	type: EventType.CRISIS,
	category: EventCategory.INTERNACIONAL,
	urgency: 3,
	timeLimit: 40,
	trigger: {
		requiredMetrics: {
			[MetricType.RELACIONES_INTERNACIONALES]: { max: 50 }
		},
		probability: 0.5
	},
	choices: [
		{
			id: "pedir-disculpas",
			text: "🙏 Pedir disculpas públicamente",
			description: "Tragar el orgullo y disculparse. Decir que fue un malentendido y que admirás el fútbol brasileño.",
			effects: [
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, 12, "Normalización de relaciones"),
				createImmediateEffect(MetricType.POPULARIDAD, -8, "Imagen de débil"),
				createImmediateEffect(MetricType.ECONOMIA, 5, "Comercio bilateral se normaliza"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, -5, "Críticas por 'entregarse'")
			]
		},
		{
			id: "doblar-la-apuesta",
			text: "⚽ Doblar la apuesta futbolística",
			description: "Decir que tenés razón y que Argentina tiene 3 Mundiales vs 5 de Brasil, pero los nuestros son más épicos.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 15, "Orgullo nacional"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -15, "Guerra fría futbolística"),
				createImmediateEffect(MetricType.ECONOMIA, -10, "Impacto comercial"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 10, "Narrativa nacionalista")
			],
			triggeredEvents: ["guerra-fria-futbolistica"]
		},
		{
			id: "proponer-partido",
			text: "🏆 Proponer un partido Argentina vs Brasil",
			description: "Desafiar a Brasil a un partido para dirimir la cuestión. El que gana tiene razón.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 12, "Propuesta épica"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, 8, "Solución deportiva"),
				createImmediateEffect(MetricType.ECONOMIA, -5, "Costo del evento"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 15, "Atención mediática mundial")
			]
		},
		{
			id: "ignorar-brasil",
			text: "🤷 Ignorar y seguir con lo tuyo",
			description: "Que se enojen nomás. Total, somos vecinos y van a tener que llevarse bien eventualmente.",
			effects: [
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -8, "Deterioro de relaciones"),
				createImmediateEffect(MetricType.ECONOMIA, -12, "Problemas comerciales"),
				createImmediateEffect(MetricType.POPULARIDAD, -3, "Imagen de conflictivo"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, -3, "Críticas por inacción")
			]
		}
	],
	defaultChoice: "proponer-partido",
	autoEffects: [
		createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -3, "Tensión diplomática automática")
	],
	icon: "🇧🇷",
	sound: "tension-diplomatica"
};

export const SUPERCLASICO_PRESIDENCIAL: PoliticalEvent = {
	id: "superclasico-presidencial",
	title: "🏆 Superclásico Presidencial",
	description: "La final del Superclásico Presidencial entre Argentina y Brasil. El partido más esperado del mundo futbolístico. La expectativa es tan alta que hasta los políticos se emocionan.",
	type: EventType.HUMOR_NEGRO,
	category: EventCategory.INTERNACIONAL,
	urgency: 1,
	timeLimit: 90,
	trigger: {
		requiredMetrics: {
			[MetricType.RELACIONES_INTERNACIONALES]: { max: 50 }
		},
		probability: 0.7
	},
	choices: [
		{
			id: "celebrar-victoria",
			text: "🏆 Celebrar la victoria",
			description: "La victoria es nuestra. Celebrar la victoria argentina y mostrar orgullo nacional.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 15, "Orgullo nacional"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, 10, "Aumento de relaciones"),
				createImmediateEffect(MetricType.ECONOMIA, 5, "Impacto económico positivo"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 5, "Narrativa positiva")
			]
		},
		{
			id: "celebrar-derrota",
			text: "🏆 Celebrar la derrota",
			description: "La derrota es nuestra. Celebrar la derrota argentina y mostrar orgullo nacional.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 10, "Orgullo nacional"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -10, "Deterioro de relaciones"),
				createImmediateEffect(MetricType.ECONOMIA, -5, "Impacto económico negativo"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 5, "Narrativa negativa")
			]
		},
		{
			id: "celebrar-empate",
			text: "🏆 Celebrar el empate",
			description: "El empate es nuestra. Celebrar el empate argentino y mostrar orgullo nacional.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 5, "Orgullo nacional"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, 0, "Relaciones estables"),
				createImmediateEffect(MetricType.ECONOMIA, 0, "Impacto económico neutro"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 5, "Narrativa neutra")
			]
		},
		{
			id: "celebrar-partido",
			text: "🏆 Celebrar el partido",
			description: "Celebrar el partido y mostrar orgullo nacional.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 5, "Orgullo nacional"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, 0, "Relaciones estables"),
				createImmediateEffect(MetricType.ECONOMIA, 0, "Impacto económico neutro"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 5, "Narrativa neutra")
			]
		}
	],
	defaultChoice: "celebrar-victoria",
	autoEffects: [
		createImmediateEffect(MetricType.POPULARIDAD, 5, "Superclásico automático")
	],
	icon: "🏆",
	sound: "superclasico"
};

// ===== NUEVOS EVENTOS INDIVIDUALES (GENERADOS POR IA) =====

export const EL_CEPO_ETERNO: PoliticalEvent = {
	id: "el-cepo-eterno",
	title: "💸 El cepo eterno",
	description:
		"El gobierno aprieta el cepo cambiario aún más: comprar dólares es misión imposible. Ni para el viajecito a Miami te dejan. La clase media está que explota y aparecen cotizaciones truchas hasta del 'dólar fideo'. La presión aumenta para que aflojes con las restricciones.",
	type: EventType.CRISIS,
	category: EventCategory.ECONOMICO,
	urgency: 4,
	trigger: { probability: 0.4 },
	choices: [
		{
			id: "aflojar-cepo",
			text: "🤏 Aflojar un poco el cepo",
			description: "Aflojar un poco el cepo para calmar a la gente.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 4, "La gente agradece la flexibilización."),
				createImmediateEffect(MetricType.ECONOMIA, -3, "Aflojar el cepo genera presión sobre las reservas."),
			],
		},
		{
			id: "redoblar-cepo",
			text: "🔒 Redoblar el cepo",
			description: "Redoblar el cepo y culpar a los 'especuladores antipatria'.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -4, "Mayor restricción genera más enojo."),
				createImmediateEffect(MetricType.ECONOMIA, 1, "Se protegen las reservas a corto plazo."),
			],
		},
	],
	icon: "💸",
	sound: "cepo-cambiario",
};

export const BLUE_POR_LAS_NUBES: PoliticalEvent = {
	id: "blue-por-las-nubes",
	title: "😱 Blue por las nubes",
	description:
		"El dólar blue se dispara a la estratósfera, marcando un récord histórico. En las cuevas de Calle Florida, los arbolitos ni siquiera dan precio. La gente entra en pánico comprando verdes y aparecen memes del peso argentino usado de papel higienico. La presión por devaluar es inmensa.",
	type: EventType.CRISIS,
	category: EventCategory.ECONOMICO,
	urgency: 5,
	trigger: { probability: 0.3 },
	choices: [
		{
			id: "devaluar-oficialmente",
			text: "📉 Devaluar el peso",
			description: "Devaluar el peso oficialmente para cerrar la brecha con el blue.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -5, "La devaluación impacta en los precios y el poder adquisitivo."),
				createImmediateEffect(MetricType.ECONOMIA, 4, "Sincerar el tipo de cambio es visto como una medida necesaria por los mercados."),
			],
		},
		{
			id: "perseguir-cueveros",
			text: "🕵️ Perseguir a cueveros",
			description: "Perseguir a cueveros y culpar a 'golpistas económicos' por la suba.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 1, "Una parte de la población apoya la mano dura."),
				createImmediateEffect(MetricType.ECONOMIA, -5, "La persecución no soluciona el problema de fondo y genera más desconfianza."),
			],
		},
		{
			id: "minimizar-tema",
			text: "🤷‍♂️ Minimizar el tema",
			description: "Minimizar el tema: decir que el blue no importa y seguir igual.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -3, "La inacción se percibe como negación de la realidad."),
				createImmediateEffect(MetricType.ECONOMIA, -3, "La brecha cambiaria sigue distorsionando la economía."),
			],
		},
	],
	icon: "😱",
	sound: "crisis-dolar",
};

export const IMPUESTO_AL_ASADO: PoliticalEvent = {
	id: "impuesto-al-asado",
	title: "🥩 Impuesto al asado",
	description:
		'Se filtra un proyecto para crear un impuesto al asado "por salud y ecología". Nadie se la cree: es puro manotazo de ahogado fiscal. El pueblo está indignado, ni la sagrada parrilla se salva de la voracidad impositiva. "Con el asado no", braman hasta los oficialistas.',
	type: EventType.DECISION,
	category: EventCategory.ECONOMICO,
	urgency: 3,
	trigger: { probability: 0.2 },
	choices: [
		{
			id: "dar-marcha-atras",
			text: "🔙 Dar marcha atrás",
			description: "Dar marcha atrás de inmediato; mejor no meterse con la carne.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 6, "La gente celebra que no te metiste con el asado."),
				createImmediateEffect(MetricType.ECONOMIA, -2, "Se pierde una fuente de recaudación."),
			],
		},
		{
			id: "defender-impuesto",
			text: "⚖️ Defender el impuesto",
			description: "Defender el impuesto: que los asados paguen su parte.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -6, "La medida es extremadamente impopular."),
				createImmediateEffect(MetricType.ECONOMIA, 2, "Se crea una nueva fuente de ingresos para el Estado."),
			],
		},
		{
			id: "aplicar-solo-cortes-premium",
			text: "🎩 Solo a cortes premium",
			description: "Aplicarlo solo a cortes premium y gourmet, al resto no.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -2, "La medida sigue siendo impopular, aunque menos."),
				createImmediateEffect(MetricType.ECONOMIA, 1, "La recaudación es menor de la esperada."),
			],
		},
	],
	icon: "🥩",
	sound: "protesta-cacerola",
};

export const ULTIMATUM_DEL_FMI: PoliticalEvent = {
	id: "ultimatum-del-fmi",
	title: "IMF Ultimátum del FMI",
	description:
		"El FMI te aprieta las clavijas: o aplicás más ajuste o se cae el acuerdo. La directora Kristina Yorguera advierte que sin recortes no hay próximo desembolso. En las calles resuena el 'No al FMI' de un lado, y del otro temen un default inminente. Decisión crucial en puerta.",
	type: EventType.CRISIS,
	category: EventCategory.INTERNACIONAL,
	urgency: 5,
	trigger: { probability: 0.3 },
	choices: [
		{
			id: "ceder-al-fmi",
			text: "✍️ Ceder y ajustar",
			description: "Ceder: ajustar el gasto para cumplir con el FMI.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -5, "El ajuste es impopular."),
				createImmediateEffect(MetricType.ECONOMIA, 5, "El acuerdo con el FMI trae estabilidad financiera."),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, 3, "Mejoran las relaciones con organismos de crédito."),
			],
		},
		{
			id: "plantarse-y-defaultear",
			text: "💥 Plantarse y defaultear",
			description: "Plantarse: rechazar las condiciones y defaultear si es necesario.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 3, "La postura nacionalista es bien vista por un sector."),
				createImmediateEffect(MetricType.ECONOMIA, -7, "El default genera un colapso económico."),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -10, "Aislamiento financiero internacional."),
			],
		},
		{
			id: "ganar-tiempo",
			text: "⏳ Ganar tiempo",
			description: "Ganar tiempo: renegociar plazos y buscar apoyo de otros países.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 1, "La gente espera una solución menos dolorosa."),
				createImmediateEffect(MetricType.ECONOMIA, -2, "La incertidumbre afecta a los mercados."),
			],
		},
	],
	icon: "IMF",
	sound: "tension-internacional",
};

export const PARO_NACIONAL: PoliticalEvent = {
	id: "paro-nacional",
	title: "✊ Paro nacional",
	description:
		"Los sindicatos declaran un paro nacional. No hay colectivos, trenes, ni bancos; el país está congelado por un día. Exigen subas salariales 'como la gente' y clausura de despidos. El líder Hugo Mojano sale en TV diciendo que tu gobierno es antiobrero. Se te viene la noche con la CGT.",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 4,
	trigger: { probability: 0.4 },
	choices: [
		{
			id: "conceder-aumento",
			text: "💵 Conceder el aumento",
			description: "Ceder y conceder el aumento general que piden.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 4, "Los sindicatos y trabajadores celebran."),
				createImmediateEffect(MetricType.ECONOMIA, -4, "El aumento salarial tiene un costo fiscal alto."),
			],
		},
		{
			id: "no-ceder",
			text: "🚫 No ceder nada",
			description: "No ceder nada y amenazar con reemplazar a huelguistas.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -6, "La postura genera un fuerte rechazo social."),
				createImmediateEffect(MetricType.ECONOMIA, 1, "Se evita el gasto fiscal del aumento."),
				createImmediateEffect(MetricType.SEGURIDAD, -4, "Riesgo de escalada en el conflicto."),
			],
		},
		{
			id: "ofrecer-bono",
			text: "🍬 Ofrecer un bono",
			description: "Ofrecer un bono único y mesa de diálogo futura.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 1, "Es una solución a medias que no conforma a todos."),
				createImmediateEffect(MetricType.ECONOMIA, -1, "El bono tiene un costo fiscal menor."),
			],
		},
	],
	icon: "✊",
	sound: "huelga-general",
};

export const DIPUTADO_PANQUEQUE: PoliticalEvent = {
	id: "diputado-panqueque",
	title: "🥞 Diputado panqueque",
	description:
		"Un diputado opositor recién electo pega el portazo a su bloque y se pasa a tus filas de la noche a la mañana. La prensa habla de maletines bajo la mesa y carguitos prometidos. La oposición grita traición, mientras en tu espacio algunos festejan tener un voto más en el Congreso.",
	type: EventType.DECISION,
	category: EventCategory.SOCIAL,
	urgency: 3,
	trigger: { probability: 0.3 },
	choices: [
		{
			id: "celebrar-pase",
			text: "🎉 Celebrar el pase",
			description: "Celebrar el pase y premiarlo con un puesto, la política es así.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -4, "El transfuguismo es visto como corrupción."),
				createImmediateEffect(MetricType.CORRUPCION, 5, "Se alimenta la percepción de 'compra de voluntades'."),
			],
		},
		{
			id: "marcar-distancia",
			text: " distancing Marcar distancia",
			description: "Marcar distancia y criticar el transfuguismo públicamente.",
			effects: [createImmediateEffect(MetricType.POPULARIDAD, 4, "La postura ética es bien recibida.")],
		},
	],
	icon: "🥞",
	sound: "politica-turbia",
};

export const LA_GRIETA: PoliticalEvent = {
	id: "la-grieta-hasta-en-la-sopa",
	title: "🍲 La grieta hasta en la sopa",
	description:
		"Un simple homenaje se vuelve batalla campal en redes: tu gobierno propone renombrar el aeropuerto internacional con el nombre de un ex presidente amado y odiado a la vez. La oposición enloquece y promete revertirlo. Las discusiones dividen familias, y hasta los memes salen con casaca política. Nada se salva de la grieta.",
	type: EventType.DECISION,
	category: EventCategory.SOCIAL,
	urgency: 2,
	trigger: { probability: 0.5 },
	choices: [
		{
			id: "avanzar-con-cambio",
			text: "➡️ Avanzar con el cambio",
			description: "Avanzar con el cambio de nombre pese a quien le pese.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -3, "La medida profundiza la división social."),
			],
		},
		{
			id: "dar-marcha-atras",
			text: "🔙 Dar marcha atrás",
			description: "Dar marcha atrás para no echar más leña al fuego.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 2, "La gente valora el gesto de no seguir con la polémica."),
			],
		},
	],
	icon: "🍲",
	sound: "discusion-acalorada",
};

export const SOBRINO_MIMADO: PoliticalEvent = {
	id: "el-sobrino-mimado",
	title: "👶 El sobrino mimado",
	description:
		"Trasciende que querés nombrar a tu sobrino preferido como ministro. El pibe es medio queso en gestión, pero la familia es la familia. Los medios te cocinan por nepotismo descarado. Tu sobrino ya está probándose el traje para la jura mientras medio Gabinete se indigna en silencio.",
	type: EventType.DECISION,
	category: EventCategory.SOCIAL,
	urgency: 3,
	trigger: { probability: 0.2 },
	choices: [
		{
			id: "nombrarlo-igual",
			text: "👨‍👦 Nombrarlo igual",
			description: "Nombrarlo igual, sangre es sangre y me banco las críticas.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -6, "El nepotismo es fuertemente criticado."),
				createImmediateEffect(MetricType.CORRUPCION, 4, "Se percibe como un acto de favoritismo."),
			],
		},
		{
			id: "carguito-menor",
			text: "🤫 Un carguito menor",
			description: "Darle un carguito menor tras bambalinas para conformarlo sin que se note tanto.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -3, "La maniobra se filtra y es criticada."),
				createImmediateEffect(MetricType.CORRUPCION, 2, "Sigue siendo un acto de nepotismo."),
			],
		},
		{
			id: "cancelar-nombramiento",
			text: "🚫 Cancelar el nombramiento",
			description: "Cancelar el nombramiento y decirle que se gane el puesto con merito.",
			effects: [createImmediateEffect(MetricType.POPULARIDAD, 5, "La decisión es aplaudida por meritocrática.")],
		},
	],
	icon: "👶",
	sound: "politica-familiar",
};

export const PRESO_POLITICO: PoliticalEvent = {
	id: "preso-politico",
	title: "⛓️ ¿Preso político?",
	description:
		"Un aliado clave tuyo es condenado por corrupción. Él jura que es un fallo político armado por los 'poderes oscuros' y se declara preso político. Sus seguidores te piden que lo respaldes, mientras la oposición reclama que respetes la independencia judicial. El caso polariza a la sociedad otra vez.",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 4,
	trigger: { probability: 0.3 },
	choices: [
		{
			id: "denunciar-lawfare",
			text: "📢 Denunciar lawfare",
			description: "Denunciar el fallo y apoyar públicamente a tu aliado, es víctima de lawfare.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -4, "Apoyar a un condenado daña tu imagen."),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -3, "Se cuestiona la seguridad jurídica del país."),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, -3, "La prensa independiente critica la movida."),
			],
		},
		{
			id: "acatar-sentencia",
			text: "⚖️ Acatar la sentencia",
			description: "Acatar la sentencia y despegarte, la ley ante todo aunque duela.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 3, "Respetar la justicia es bien visto."),
			],
		},
	],
	icon: "⛓️",
	sound: "tension-judicial",
};

export const TITULO_TRUCHO: PoliticalEvent = {
	id: "titulo-trucho",
	title: "📜 Título trucho",
	description:
		"Surge que tu flamante Ministro de Educación mintió en su CV: no es doctor ni nada. Le compró el título a una 'universidad trucha' online. Los memes no perdonan. La oposición exige su renuncia por mentiroso. Vos tenés que decidir si bancarlo o soltarle la mano.",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 3,
	trigger: { probability: 0.3 },
	choices: [
		{
			id: "pedir-renuncia",
			text: "🚪 Pedirle la renuncia",
			description: "Pedirle la renuncia de inmediato, no se tolera esa chantada.",
			effects: [createImmediateEffect(MetricType.POPULARIDAD, 4, "La rápida acción es vista como un signo de integridad.")],
		},
		{
			id: "defenderlo",
			text: "👨‍🏫 Defenderlo",
			description: "Defenderlo: la experiencia vale más que un título de papel.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -5, "Defender a un mentiroso es muy impopular."),
				createImmediateEffect(MetricType.CORRUPCION, 3, "Se percibe como un acto de encubrimiento."),
			],
		},
	],
	icon: "📜",
	sound: "escandalo-menor",
};

export const MOTOCHORROS_EN_FUGA: PoliticalEvent = {
	id: "motochorros-en-fuga",
	title: "🛵 Motochorros en fuga",
	description:
		"Oleada de motochorros: videos virales muestran cómo arrebatadores en moto le roban la cartera a la gente a plena luz del día. La sociedad está harta y exige acción. 'Ni caminar se puede ya', dicen en la tele. Presión para que hagas algo contra el delito callejero.",
	type: EventType.CRISIS,
	category: EventCategory.SEGURIDAD,
	urgency: 4,
	trigger: { probability: 0.4 },
	choices: [
		{
			id: "crear-brigadas-especiales",
			text: " SWAT Crear brigadas especiales",
			description: "Crear brigadas especiales anti-motochorros y endurecer penas.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 3, "La gente apoya la mano dura contra el delito."),
				createImmediateEffect(MetricType.SEGURIDAD, 3, "Aumenta la presencia policial en las calles."),
			],
		},
		{
			id: "decir-que-tengan-cuidado",
			text: "🗣️ Decir que tengan cuidado",
			description: "Decir a la gente que tenga cuidado y que es parte de la realidad urbana.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -5, "La gente percibe al gobierno como inútil y desconectado."),
			],
		},
		{
			id: "prohibir-dos-por-moto",
			text: "🚫 Prohibir dos por moto",
			description: "Prohibir dos personas por moto y controlar a diestra y siniestra.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -2, "La medida es impopular entre los motociclistas."),
				createImmediateEffect(MetricType.SEGURIDAD, 1, "Dificulta el accionar de los motochorros."),
			],
		},
	],
	icon: "🛵",
	sound: "motochorros",
};

export const TOMA_DE_TIERRAS: PoliticalEvent = {
	id: "toma-de-tierras",
	title: "🏕️ Toma de tierras",
	description:
		"Cientos de familias sin techo ocupan un terreno privado en las afueras de la ciudad. Gritan 'Tierra para vivir' mientras el dueño del predio exige desalojo inmediato. Organizaciones sociales respaldan la toma, vecinos están divididos. Si mandás desalojo puede haber lío feo, si no, temen efecto contagio.",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 5,
	trigger: { probability: 0.3 },
	choices: [
		{
			id: "ordenar-desalojo",
			text: "🚓 Ordenar desalojo",
			description: "Ordenar desalojo con la policía, la ley es la ley.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -3, "La represión es mal vista por un sector de la sociedad."),
				createImmediateEffect(MetricType.SEGURIDAD, 2, "Se reestablece el orden y la propiedad privada."),
			],
		},
		{
			id: "negociar-reubicacion",
			text: "🤝 Negociar reubicación",
			description: "Negociar: ofrecer reubicación o asistencia a las familias ocupantes.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 2, "La solución pacífica es bien vista."),
				createImmediateEffect(MetricType.ECONOMIA, -1, "La reubicación tiene un costo fiscal."),
			],
		},
		{
			id: "no-intervenir",
			text: "🤷 No intervenir",
			description: "No intervenir y dejar que se arreglen entre ellos.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -2, "La inacción se percibe como debilidad."),
				createImmediateEffect(MetricType.SEGURIDAD, -2, "El conflicto podría escalar sin intervención."),
			],
		},
	],
	icon: "🏕️",
	sound: "conflicto-social",
};

export const PARO_DOCENTE_ETERNO_2: PoliticalEvent = {
	id: "paro-docente-eterno-2",
	title: "📚 Paro docente eterno",
	description:
		"Los maestros llevan semanas de paro. Sin clases, los chicos en la casa jugando a la Play, y los padres que ya no saben qué hacer. Los docentes exigen aumentos por encima de la inflación y más presupuesto. Las negociaciones están estancadas y crece la tensión social.",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 4,
	trigger: { probability: 0.4 },
	choices: [
		{
			id: "ceder-y-otorgar-aumento",
			text: "💰 Otorgar aumento",
			description: "Ceder y otorgar el aumento salarial que piden los docentes.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 3, "Los docentes y padres agradecen la resolución del conflicto."),
				createImmediateEffect(MetricType.ECONOMIA, -3, "El aumento tiene un impacto fiscal considerable."),
			],
		},
		{
			id: "mantenerse-firme",
			text: "💪 Mantenerse firme",
			description: "Mantenerte firme: no hay más plata, que vuelvan a clases o descuento días.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -4, "La intransigencia genera un fuerte rechazo."),
			],
		},
		{
			id: "ofrecer-acuerdo-intermedio",
			text: "🤏 Ofrecer acuerdo intermedio",
			description: "Ofrecer un acuerdo intermedio con aumentos escalonados y promesa de inversión.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 1, "Una solución a medias que no conforma del todo."),
				createImmediateEffect(MetricType.ECONOMIA, -1, "El costo fiscal es menor."),
			],
		},
	],
	icon: "📚",
	sound: "huelga-general",
};

export const HOSPITAL_EN_RUINAS: PoliticalEvent = {
	id: "hospital-en-ruinas",
	title: "🏥 Hospital en ruinas",
	description:
		"Se cae a pedazos el principal hospital público: pacientes hacinados en pasillos, no hay insumos básicos, goteras en quirófano. Imágenes durísimas recorren los noticieros. Médicos amenazan con renunciar en masa si no invierten ya mismo. La salud pública en terapia intensiva (literal).",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 5,
	trigger: { probability: 0.3 },
	choices: [
		{
			id: "inyectar-fondos-emergencia",
			text: "💉 Inyectar fondos de emergencia",
			description: "Inyectar fondos de emergencia y dotar de insumos al hospital ya.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 5, "La medida es muy bien recibida por la población."),
				createImmediateEffect(MetricType.ECONOMIA, -3, "La inversión en salud es costosa."),
			],
		},
		{
			id: "culpar-gestion-hospitalaria",
			text: "🗣️ Culpar a la gestión",
			description: "Culpar a la gestión hospitalaria y patear el problema, no hay plata.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -6, "La gente te culpa por la falta de acción."),
			],
		},
		{
			id: "anunciar-plan-infraestructura",
			text: "🏗️ Anunciar plan a futuro",
			description: "Anunciar un plan de infraestructura hospitalaria (aunque tarde años).",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 1, "La promesa genera algo de esperanza, pero no soluciona el problema actual."),
				createImmediateEffect(MetricType.ECONOMIA, -1, "El plan tiene un costo a largo plazo."),
			],
		},
	],
	icon: "🏥",
	sound: "crisis-sanitaria",
};

// Importar eventos de otros archivos
import { eventChains } from "@/data/events/eventChains";
import { moreArgentineEvents } from "@/data/events/moreArgentineEvents";
import { morePoliticalEvents } from "@/data/events/morePoliticalEvents";

// Unificar todos los eventos en una sola lista
export const ALL_POLITICAL_EVENTS: PoliticalEvent[] = [
	CRISIS_DOLAR_BLUE,
	PIQUETE_9_DE_JULIO,
	ESCANDALO_CORRUPCION,
	CRISIS_CHACO,
	TENSION_CON_BRASIL,
	SUPERCLASICO_PRESIDENCIAL,
	...morePoliticalEvents,
	...eventChains,
	...moreArgentineEvents,
	// Añadir nuevos eventos generados
	EL_CEPO_ETERNO,
	BLUE_POR_LAS_NUBES,
	IMPUESTO_AL_ASADO,
	ULTIMATUM_DEL_FMI,
	PARO_NACIONAL,
	DIPUTADO_PANQUEQUE,
	LA_GRIETA,
	SOBRINO_MIMADO,
	PRESO_POLITICO,
	TITULO_TRUCHO,
	MOTOCHORROS_EN_FUGA,
	TOMA_DE_TIERRAS,
	PARO_DOCENTE_ETERNO_2,
	HOSPITAL_EN_RUINAS,
];

// ===== EVENTOS POR CATEGORÍA =====

export const EVENTOS_POR_CATEGORIA: { [key: string]: PoliticalEvent[] } = {
	[EventCategory.ECONOMICO]: [CRISIS_DOLAR_BLUE],
	[EventCategory.SOCIAL]: [PIQUETE_9_DE_JULIO],
	[EventCategory.CORRUPCION]: [ESCANDALO_CORRUPCION],
	[EventCategory.PROVINCIAL]: [CRISIS_CHACO],
	[EventCategory.INTERNACIONAL]: [TENSION_CON_BRASIL, SUPERCLASICO_PRESIDENCIAL]
};

// ===== EVENTOS POR URGENCIA =====

export const EVENTOS_POR_URGENCIA: { [key: number]: PoliticalEvent[] } = {
	1: [],
	2: [CRISIS_CHACO],
	3: [PIQUETE_9_DE_JULIO, TENSION_CON_BRASIL],
	4: [CRISIS_DOLAR_BLUE],
	5: [ESCANDALO_CORRUPCION]
};

// ===== EVENTOS POR PROVINCIA =====

export const EVENTOS_POR_PROVINCIA: { [key: string]: PoliticalEvent[] } = {
	[ProvinceId.CHACO]: [CRISIS_CHACO],
	// Más eventos provinciales se agregan aquí
};

// ===== HELPER FUNCTIONS =====

/**
 * Obtiene eventos filtrados por categoría
 */
export const getEventsByCategory = (category: EventCategory): PoliticalEvent[] => {
	return EVENTOS_POR_CATEGORIA[category] || [];
};

/**
 * Obtiene eventos filtrados por urgencia
 */
export const getEventsByUrgency = (urgency: number): PoliticalEvent[] => {
	return EVENTOS_POR_URGENCIA[urgency] || [];
};

/**
 * Obtiene eventos filtrados por provincia
 */
export const getEventsByProvince = (province: ProvinceId): PoliticalEvent[] => {
	return EVENTOS_POR_PROVINCIA[province] || [];
};

/**
 * Obtiene un evento aleatorio de una categoría
 */
export const getRandomEventFromCategory = (category: EventCategory): PoliticalEvent | null => {
	const events = getEventsByCategory(category);
	if (events.length === 0) return null;
	return events[Math.floor(Math.random() * events.length)];
};

/**
 * Obtiene un evento aleatorio de cualquier categoría
 */
export const getRandomEvent = (): PoliticalEvent => {
	return ALL_POLITICAL_EVENTS[Math.floor(Math.random() * ALL_POLITICAL_EVENTS.length)];
};
