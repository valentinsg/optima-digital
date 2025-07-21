/**
 * PRESIDENCIAL BARDO - Eventos de Salud y Tecnología
 * Eventos políticos relacionados con el sistema de salud y desarrollo tecnológico
 */

import {
  EventCategory,
  EventType,
  FactionId,
  MetricType,
  type PoliticalEvent
} from "@/types/political";
import { createImmediateEffect } from "@/utils/metricEffects";

// ===== CADENA: CRISIS SANITARIA =====

export const CRISIS_HOSPITALARIA: PoliticalEvent = {
	id: "crisis-hospitalaria",
	title: "🏥 Crisis Hospitalaria Nacional",
	description: "Los hospitales están colapsados. No hay camas, no hay médicos, no hay insumos. La gente se muere en las puertas de los hospitales mientras los funcionarios se toman vacaciones en Miami. Una tragedia anunciada que nadie quiso prevenir.",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 5,
	timeLimit: 45,
	trigger: {
		requiredMetrics: {
			[MetricType.SALUD]: { max: 35 }
		},
		probability: 0.8
	},
	choices: [
		{
			id: "emergencia-sanitaria",
			text: "🚨 Declarar emergencia sanitaria",
			description: "Decretar emergencia sanitaria nacional y movilizar todos los recursos disponibles. Es caro pero necesario.",
			effects: [
				createImmediateEffect(MetricType.SALUD, 15, "Respuesta inmediata a la crisis"),
				createImmediateEffect(MetricType.ECONOMIA, -20, "Gasto masivo en emergencia"),
				createImmediateEffect(MetricType.POPULARIDAD, 10, "La gente ve acción inmediata"),
				createImmediateEffect(MetricType.CORRUPCION, 8, "Oportunidades en compras de emergencia")
			],
			triggeredEvents: ["corrupcion-emergencia-sanitaria"]
		},
		{
			id: "culpar-gobierno-anterior-salud",
			text: "👴 Culpar al gobierno anterior",
			description: "Decir que la crisis es culpa del gobierno anterior que no invirtió en salud. La clásica estrategia argentina.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -15, "La gente ya no se come el verso"),
				createImmediateEffect(MetricType.SALUD, -5, "No se soluciona nada"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 5, "Narrativa política repetitiva")
			]
		},
		{
			id: "privatizar-salud",
			text: "💼 Proponer privatización de la salud",
			description: "Anunciar que la solución es privatizar el sistema de salud. Los empresarios aplauden, la gente se indigna.",
			effects: [
				createImmediateEffect(MetricType.SALUD, 8, "Mejora en algunos servicios"),
				createImmediateEffect(MetricType.POPULARIDAD, -25, "Rechazo masivo de la población"),
				createImmediateEffect(MetricType.ECONOMIA, 5, "Ahorro fiscal"),
				createImmediateEffect(MetricType.CORRUPCION, 15, "Oportunidades de corrupción en privatización")
			],
			factionEffects: [
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: 20,
					description: "Los empresarios ven oportunidades de negocio"
				},
				{
					factionId: FactionId.SINDICALISTAS,
					supportChange: -30,
					description: "Los sindicatos se oponen ferozmente"
				}
			],
			triggeredEvents: ["huelga-medicos"]
		}
	],
	defaultChoice: "emergencia-sanitaria",
	icon: "🏥",
	sound: "crisis-sanitaria"
};

export const CORRUPCION_EMERGENCIA_SANITARIA: PoliticalEvent = {
	id: "corrupcion-emergencia-sanitaria",
	title: "💰 Escándalo de Corrupción en Emergencia Sanitaria",
	description: "Se descubrió que durante la emergencia sanitaria se compraron respiradores a precios inflados, mascarillas de papel higiénico y guantes de plástico de juguete. Los funcionarios se llenaron los bolsillos mientras la gente se moría.",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 4,
	timeLimit: 30,
	trigger: {
		requiredChoices: [
			{ eventId: "crisis-hospitalaria", choiceId: "emergencia-sanitaria" }
		],
		probability: 0.7
	},
	choices: [
		{
			id: "investigar-y-castigar",
			text: "🔍 Investigar y castigar a los culpables",
			description: "Ordenar una investigación profunda y castigar a todos los involucrados. Mostrar que no se tolera la corrupción.",
			effects: [
				createImmediateEffect(MetricType.CORRUPCION, -10, "Se combate la corrupción"),
				createImmediateEffect(MetricType.POPULARIDAD, 5, "La gente ve justicia"),
				createImmediateEffect(MetricType.SALUD, -5, "Investigación paraliza el sistema")
			]
		},
		{
			id: "encubrir-escandalo",
			text: "🤐 Intentar encubrir el escándalo",
			description: "Intentar tapar el escándalo con más propaganda y amenazas a los medios. La clásica estrategia de los corruptos.",
			effects: [
				createImmediateEffect(MetricType.CORRUPCION, 15, "Más corrupción para tapar la anterior"),
				createImmediateEffect(MetricType.POPULARIDAD, -20, "La gente se entera igual"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 10, "Control de la narrativa")
			],
			triggeredEvents: ["medios-revelan-todo"]
		}
	],
	defaultChoice: "investigar-y-castigar",
	icon: "💰",
	sound: "escandalo-corrupcion"
};

export const HUELGA_MEDICOS: PoliticalEvent = {
	id: "huelga-medicos",
	title: "👨‍⚕️ Huelga Nacional de Médicos",
	description: "Los médicos están de huelga indefinida. Exigen mejores condiciones, más presupuesto y que no se privatice la salud. Los hospitales están cerrados y solo atienden emergencias. La crisis sanitaria se agrava.",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 4,
	timeLimit: 60,
	trigger: {
		requiredChoices: [
			{ eventId: "crisis-hospitalaria", choiceId: "privatizar-salud" }
		],
		probability: 0.9
	},
	choices: [
		{
			id: "ceder-a-medicos",
			text: "🤝 Ceder a las demandas de los médicos",
			description: "Aceptar las demandas de los médicos y aumentar el presupuesto de salud. Es caro pero necesario.",
			effects: [
				createImmediateEffect(MetricType.SALUD, 20, "Mejora del sistema de salud"),
				createImmediateEffect(MetricType.ECONOMIA, -15, "Mayor gasto en salud"),
				createImmediateEffect(MetricType.POPULARIDAD, 15, "La gente apoya a los médicos")
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
			id: "militarizar-hospitales",
			text: "⚔️ Militarizar los hospitales",
			description: "Mandar a los militares a manejar los hospitales. Los médicos se enojan más pero al menos hay atención.",
			effects: [
				createImmediateEffect(MetricType.SALUD, 5, "Atención básica garantizada"),
				createImmediateEffect(MetricType.SEGURIDAD, 10, "Control militar"),
				createImmediateEffect(MetricType.POPULARIDAD, -10, "Imagen autoritaria"),
				createImmediateEffect(MetricType.CORRUPCION, 8, "Oportunidades de corrupción militar")
			],
			factionEffects: [
				{
					factionId: FactionId.MILITARES,
					supportChange: 15,
					description: "Los militares ganan influencia"
				},
				{
					factionId: FactionId.SINDICALISTAS,
					supportChange: -20,
					description: "Los sindicatos se oponen ferozmente"
				}
			]
		}
	],
	defaultChoice: "ceder-a-medicos",
	icon: "👨‍⚕️",
	sound: "huelga-medicos"
};

// ===== CADENA: DESARROLLO TECNOLÓGICO =====

export const CRISIS_TECNOLOGICA: PoliticalEvent = {
	id: "crisis-tecnologica",
	title: "💻 Crisis Tecnológica Nacional",
	description: "El país está tecnológicamente atrasado. No hay internet en las escuelas, los hospitales usan máquinas de escribir, y el gobierno sigue usando fax. Mientras tanto, Uruguay ya tiene 5G y Chile exporta software. Argentina se queda atrás.",
	type: EventType.CRISIS,
	category: EventCategory.ECONOMICO,
	urgency: 3,
	timeLimit: 90,
	trigger: {
		requiredMetrics: {
			[MetricType.TECNOLOGIA]: { max: 30 }
		},
		probability: 0.6
	},
	choices: [
		{
			id: "plan-digital-nacional",
			text: "🌐 Lanzar Plan Digital Nacional",
			description: "Crear un plan masivo de digitalización del país. Conectar todas las escuelas, hospitales y dependencias públicas.",
			effects: [
				createImmediateEffect(MetricType.TECNOLOGIA, 20, "Modernización tecnológica"),
				createImmediateEffect(MetricType.ECONOMIA, -25, "Inversión masiva en tecnología"),
				createImmediateEffect(MetricType.POPULARIDAD, 15, "La gente ve progreso"),
				createImmediateEffect(MetricType.CORRUPCION, 12, "Oportunidades en licitaciones")
			],
			triggeredEvents: ["licitacion-tecnologica"]
		},
		{
			id: "alianza-empresas-tech",
			text: "🤝 Alianza con empresas tecnológicas",
			description: "Hacer alianzas con Google, Microsoft y otras empresas tecnológicas para modernizar el país. Es más barato pero menos soberano.",
			effects: [
				createImmediateEffect(MetricType.TECNOLOGIA, 15, "Modernización con empresas extranjeras"),
				createImmediateEffect(MetricType.ECONOMIA, -10, "Costo moderado"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, 10, "Alianzas internacionales"),
				createImmediateEffect(MetricType.CORRUPCION, 5, "Riesgo de dependencia")
			],
			factionEffects: [
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: 20,
					description: "Los empresarios ven oportunidades"
				}
			]
		},
		{
			id: "ignorar-crisis-tech",
			text: "🙈 Ignorar la crisis tecnológica",
			description: "Decir que la tecnología no es prioridad. Que primero hay que resolver la economía y la salud. La gente se enoja.",
			effects: [
				createImmediateEffect(MetricType.TECNOLOGIA, -10, "Atraso tecnológico se agrava"),
				createImmediateEffect(MetricType.POPULARIDAD, -15, "La gente ve falta de visión"),
				createImmediateEffect(MetricType.ECONOMIA, -5, "Pérdida de competitividad")
			]
		}
	],
	defaultChoice: "plan-digital-nacional",
	icon: "💻",
	sound: "crisis-tecnologica"
};

export const LICITACION_TECNOLOGICA: PoliticalEvent = {
	id: "licitacion-tecnologica",
	title: "🏗️ Mega Licitación Tecnológica",
	description: "Se abrió la mega licitación para el Plan Digital Nacional. Empresas de todo el mundo quieren participar. Hay rumores de sobornos, favoritismos y conexiones políticas. Una oportunidad de oro para la corrupción.",
	type: EventType.CRISIS,
	category: EventCategory.ECONOMICO,
	urgency: 4,
	timeLimit: 45,
	trigger: {
		requiredChoices: [
			{ eventId: "crisis-tecnologica", choiceId: "plan-digital-nacional" }
		],
		probability: 0.8
	},
	choices: [
		{
			id: "licitacion-transparente",
			text: "⚖️ Mantener licitación transparente",
			description: "Asegurar que la licitación sea completamente transparente y que gane la mejor propuesta. Es lo correcto pero más lento.",
			effects: [
				createImmediateEffect(MetricType.CORRUPCION, -10, "Se evita la corrupción"),
				createImmediateEffect(MetricType.TECNOLOGIA, 10, "Mejor tecnología seleccionada"),
				createImmediateEffect(MetricType.ECONOMIA, -5, "Proceso más costoso"),
				createImmediateEffect(MetricType.POPULARIDAD, 5, "La gente ve transparencia")
			]
		},
		{
			id: "favorecer-empresa-amiga",
			text: "🤝 Favorecer empresa amiga",
			description: "Darle la licitación a una empresa amiga del gobierno. Es más rápido y barato, pero huele mal.",
			effects: [
				createImmediateEffect(MetricType.CORRUPCION, 20, "Corrupción evidente"),
				createImmediateEffect(MetricType.TECNOLOGIA, 5, "Tecnología mediocre"),
				createImmediateEffect(MetricType.ECONOMIA, -15, "Sobreprecio"),
				createImmediateEffect(MetricType.POPULARIDAD, -10, "La gente sospecha")
			],
			triggeredEvents: ["escandalo-licitacion"]
		}
	],
	defaultChoice: "licitacion-transparente",
	icon: "🏗️",
	sound: "licitacion-tecnologica"
};

export const ESCANDALO_LICITACION: PoliticalEvent = {
	id: "escandalo-licitacion",
	title: "📰 Escándalo de Licitación Tecnológica",
	description: "Se filtró que la empresa ganadora de la licitación tecnológica es propiedad del primo del ministro. Los medios están como locos, la oposición pide juicio político y la empresa ya empezó a cobrar sin entregar nada.",
	type: EventType.CRISIS,
	category: EventCategory.ECONOMICO,
	urgency: 5,
	timeLimit: 30,
	trigger: {
		requiredChoices: [
			{ eventId: "licitacion-tecnologica", choiceId: "favorecer-empresa-amiga" }
		],
		probability: 1
	},
	choices: [
		{
			id: "cancelar-licitacion",
			text: "❌ Cancelar la licitación",
			description: "Cancelar la licitación y abrir una nueva. Es lo correcto pero retrasa todo el plan digital.",
			effects: [
				createImmediateEffect(MetricType.CORRUPCION, -15, "Se combate la corrupción"),
				createImmediateEffect(MetricType.TECNOLOGIA, -10, "Retraso en modernización"),
				createImmediateEffect(MetricType.ECONOMIA, -10, "Pérdida de fondos"),
				createImmediateEffect(MetricType.POPULARIDAD, 10, "La gente ve acción contra la corrupción")
			]
		},
		{
			id: "defender-licitacion",
			text: "🛡️ Defender la licitación",
			description: "Defender la licitación diciendo que fue transparente y que los medios mienten. Es arriesgado pero mantiene el plan.",
			effects: [
				createImmediateEffect(MetricType.CORRUPCION, 10, "Se tolera la corrupción"),
				createImmediateEffect(MetricType.POPULARIDAD, -20, "La gente no se lo cree"),
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 15, "Control de la narrativa")
			]
		}
	],
	defaultChoice: "cancelar-licitacion",
	icon: "📰",
	sound: "escandalo-licitacion"
};

// ===== EVENTOS INDIVIDUALES =====

export const VACUNACION_MASIVA: PoliticalEvent = {
	id: "vacunacion-masiva",
	title: "💉 Campaña de Vacunación Masiva",
	description: "Se lanza una campaña masiva de vacunación contra enfermedades prevenibles. Es una oportunidad de mostrar que el gobierno se preocupa por la salud de la gente.",
	type: EventType.OPORTUNIDAD,
	category: EventCategory.SOCIAL,
	urgency: 2,
	timeLimit: 120,
	trigger: {
		requiredMetrics: {
			[MetricType.SALUD]: { min: 40 }
		},
		probability: 0.4
	},
	choices: [
		{
			id: "campaña-exitosa",
			text: "✅ Campaña exitosa y transparente",
			description: "Organizar una campaña de vacunación exitosa y transparente. Es caro pero muy efectivo.",
			effects: [
				createImmediateEffect(MetricType.SALUD, 25, "Mejora significativa en salud pública"),
				createImmediateEffect(MetricType.POPULARIDAD, 20, "La gente está agradecida"),
				createImmediateEffect(MetricType.ECONOMIA, -15, "Costo de la campaña"),
				createImmediateEffect(MetricType.CORRUPCION, -5, "Transparencia en el proceso")
			]
		},
		{
			id: "campaña-corrupta",
			text: "💰 Campaña con sobreprecios",
			description: "Hacer la campaña pero con sobreprecios y compras a empresas amigas. Es más barato para el gobierno pero huele mal.",
			effects: [
				createImmediateEffect(MetricType.SALUD, 15, "Mejora moderada en salud"),
				createImmediateEffect(MetricType.POPULARIDAD, 10, "La gente está contenta"),
				createImmediateEffect(MetricType.ECONOMIA, -5, "Costo reducido"),
				createImmediateEffect(MetricType.CORRUPCION, 15, "Corrupción en compras")
			]
		}
	],
	defaultChoice: "campaña-exitosa",
	icon: "💉",
	sound: "vacunacion-masiva"
};

export const STARTUP_NACIONAL: PoliticalEvent = {
	id: "startup-nacional",
	title: "🚀 Incubadora de Startups Nacional",
	description: "Se crea una incubadora nacional de startups tecnológicas. Es una oportunidad de desarrollar el ecosistema tecnológico argentino y crear empleos de calidad.",
	type: EventType.OPORTUNIDAD,
	category: EventCategory.ECONOMICO,
	urgency: 2,
	timeLimit: 180,
	trigger: {
		requiredMetrics: {
			[MetricType.TECNOLOGIA]: { min: 35 }
		},
		probability: 0.3
	},
	choices: [
		{
			id: "incubadora-exitosa",
			text: "🌟 Incubadora exitosa y bien gestionada",
			description: "Crear una incubadora bien gestionada que realmente ayude a las startups. Es una inversión a largo plazo.",
			effects: [
				createImmediateEffect(MetricType.TECNOLOGIA, 20, "Desarrollo del ecosistema tech"),
				createImmediateEffect(MetricType.ECONOMIA, 10, "Nuevas empresas y empleos"),
				createImmediateEffect(MetricType.POPULARIDAD, 15, "La gente ve progreso"),
				createImmediateEffect(MetricType.CORRUPCION, -5, "Transparencia en gestión")
			]
		},
		{
			id: "incubadora-fantasma",
			text: "👻 Incubadora fantasma para la foto",
			description: "Crear una incubadora solo para la foto y los titulares. No funciona pero queda bien en las redes.",
			effects: [
				createImmediateEffect(MetricType.TECNOLOGIA, 5, "Mejora mínima"),
				createImmediateEffect(MetricType.POPULARIDAD, 5, "La gente ve la foto"),
				createImmediateEffect(MetricType.ECONOMIA, -5, "Gasto sin resultados"),
				createImmediateEffect(MetricType.CORRUPCION, 8, "Oportunidades de corrupción")
			]
		}
	],
	defaultChoice: "incubadora-exitosa",
	icon: "🚀",
	sound: "startup-nacional"
};

// Exportar todos los eventos
export const HEALTH_AND_TECH_EVENTS: PoliticalEvent[] = [
	CRISIS_HOSPITALARIA,
	CORRUPCION_EMERGENCIA_SANITARIA,
	HUELGA_MEDICOS,
	CRISIS_TECNOLOGICA,
	LICITACION_TECNOLOGICA,
	ESCANDALO_LICITACION,
	VACUNACION_MASIVA,
	STARTUP_NACIONAL
];
