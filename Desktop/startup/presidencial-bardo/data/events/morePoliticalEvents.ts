/**
 * PRESIDENCIAL BARDO - Más Eventos Políticos
 * Nuevos eventos que utilizan el sistema de dependencias para crear narrativas.
 */

import {
    EventCategory,
    EventType,
    FactionId,
    MetricType,
    type PoliticalEvent,
} from "@/types/political";
import { createImmediateEffect } from "@/utils/metricEffects";

// Evento Principal: El Superclásico
export const SUPERCLASICO_PRESIDENCIAL: PoliticalEvent = {
	id: "superclasico-presidencial-2025",
	title: "🏟️ Superclásico Presidencial",
	description:
		"Boca Juniors y River Plate se enfrentan en la final del campeonato. El país está completamente paralizado. Tu presencia en el palco es obligatoria, y todos los medios esperan ver a qué equipo apoyas. Tu decisión podría traer apoyo popular o desatar la furia de una de las hinchadas más grandes.",
	type: EventType.DECISION,
	category: EventCategory.DEPORTIVO,
	urgency: 5,
	trigger: {
		probability: 0.15, // Evento raro y de alto impacto
		completedEvents: [], // Podría requerir un evento previo en el futuro
	},
	choices: [
		{
			id: "apoyar-boca",
			text: "🔵 Ponerse la de Boca",
			description:
				"Te pones la azul y oro. La mitad más uno del país celebra, pero la otra mitad te declara la guerra. La seguridad se vuelve un caos.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 15, "Apoyo de la hinchada de Boca"),
				createImmediateEffect(MetricType.SEGURIDAD, -20, "Conflictos entre hinchadas rivales"),
			],
			factionEffects: [
				{
					factionId: FactionId.BARRAS_BRAVAS,
					supportChange: 15,
					powerChange: 5,
					description: "Las barras (algunas de ellas) celebran que entiendes la 'pasión popular'."
				},
				{
					factionId: FactionId.OPOSICION,
					supportChange: -10,
					description: "La oposición te acusa de fomentar la división y el populismo barato."
				}
			],
		},
		{
			id: "apoyar-river",
			text: "⚪ Ponerse la de River",
			description:
				"Te pones la banda roja. Ganas el respeto de un sector, pero la hinchada rival jura venganza. La violencia es inevitable.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 10, "Apoyo de la hinchada de River"),
				createImmediateEffect(MetricType.SEGURIDAD, -20, "Conflictos entre hinchadas rivales"),
				createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, 5, "Proyectas una imagen más 'seria'."),
			],
			factionEffects: [
				{
					factionId: FactionId.BARRAS_BRAVAS,
					supportChange: 10,
					powerChange: 5,
					description: "Las barras (algunas de ellas) aprecian tu participación en el folklore del fútbol."
				},
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: 10,
					description: "Los empresarios ven con buenos ojos tu apoyo a un club con imagen 'institucional'."
				}
			],
		},
		{
			id: "mantenerse-neutral",
			text: "👔 Mantenerse neutral",
			description:
				"Asistes con un traje neutral y das un discurso sobre la unidad. Es la opción más segura, pero ambos lados te acusan de tibio y de no entender la pasión.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -10, "Acusado de 'tibio' por ambas hinchadas"),
				createImmediateEffect(MetricType.SEGURIDAD, 5, "Se evita un conflicto mayor... por ahora."),
			],
			factionEffects: [
				{
					factionId: FactionId.BARRAS_BRAVAS,
					supportChange: -20,
					description: "Las barras te desprecian por no entender 'el juego'."
				}
			]
		},
	],
	icon: "🏟️",
	sound: "estadio-multitud",
};

// Evento Dependiente 1: Furia de la Barra
export const GUERRA_DE_BARRAS: PoliticalEvent = {
	id: "guerra-de-barras-2025",
	title: "⚔️ ¡Guerra de Barras!",
	description:
		"La barra brava del equipo que no apoyaste en el Superclásico está causando disturbios masivos. Exigen una compensación por tu 'traición'. La violencia escala y la seguridad nacional está en jaque.",
	type: EventType.CRISIS,
	category: EventCategory.SEGURIDAD,
	urgency: 5,
	trigger: {
		probability: 1, // Se activa si se cumplen las condiciones
		// Requiere que se haya tomado una decisión en el Superclásico (o apoyar a Boca o a River)
		requiredChoices: [
			{ eventId: "superclasico-presidencial-2025", choiceId: "apoyar-boca" },
			{ eventId: "superclasico-presidencial-2025", choiceId: "apoyar-river" },
		],
		// Bloqueado si el usuario fue neutral
		blockingEvents: [
			/* Aquí podríamos poner un evento que se dispare si se eligió neutralidad */
		],
	},
	choices: [
		{
			id: "negociar-barras",
			text: "💸 Negociar y darles subsidios",
			description:
				"Calmar a las bestias con plata del estado. Una solución rápida pero peligrosa.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, -15, "Gasto en subsidios para barras"),
				createImmediateEffect(MetricType.SEGURIDAD, 10, "La violencia se detiene... por ahora"),
				createImmediateEffect(
					MetricType.CORRUPCION,
					10,
					"Fomentar la corrupción de las barras",
				),
			],
		},
		{
			id: "reprimir-barras",
			text: "🚔 Reprimir con toda la fuerza",
			description:
				"Declararles la guerra total. Esto puede terminar muy bien o muy mal.",
			effects: [
				createImmediateEffect(MetricType.SEGURIDAD, -20, "Guerra total en las calles"),
				createImmediateEffect(
					MetricType.POPULARIDAD,
					-10,
					"Caos y miedo en la población",
				),
				createImmediateEffect(
					MetricType.RELACIONES_INTERNACIONALES,
					-5,
					"Preocupación por la violencia interna",
				),
			],
		},
	],
	icon: "⚔️",
	sound: "disturbios-violentos",
};

export const BARRAS_BRAVAS_REUNION: PoliticalEvent = {
	id: "barras-bravas-reunion-2025",
	title: "🗣️ La Barra Pide Reunión",
	description:
		"El líder de la facción de las Barras Bravas quiere una 'charla' en tu despacho. Vienen con reclamos de más apoyo para sus 'actividades culturales' y control sobre la seguridad en los estadios. Te recuerdan sutilmente que ellos 'cuidan a la gente' en las tribunas... y en las calles.",
	type: EventType.DECISION,
	category: EventCategory.DEPORTIVO,
	urgency: 4,
	trigger: {
		// Se activa si las barras tienen poder pero no están contentas
		// Faction support check should be implemented in PoliticalEventManager
		probability: 0.5,
	},
	choices: [
		{
			id: "negociar-subsidios",
			text: "💸 Negociar y otorgar subsidios",
			description:
				"Les das fondos para sus 'actividades'. Ganas su lealtad temporalmente, pero aumentas la corrupción y gastas recursos.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, -10, "Gasto en subsidios a barras"),
				createImmediateEffect(MetricType.CORRUPCION, 15, "Fomento de la corrupción en el fútbol"),
			],
			factionEffects: [
				{
					factionId: FactionId.BARRAS_BRAVAS,
					supportChange: 30,
					description: "Las barras agradecen tu 'contribución' a sus actividades culturales."
				}
			]
		},
		{
			id: "prometer-control",
			text: "🛡️ Prometerles control de seguridad",
			description:
				"Les cedes el control de la seguridad en los estadios. Se calman, pero tu métrica de seguridad nacional se desploma.",
			effects: [
				createImmediateEffect(MetricType.SEGURIDAD, -20, "Pérdida de control estatal en estadios"),
			],
			factionEffects: [
				{
					factionId: FactionId.BARRAS_BRAVAS,
					supportChange: 50,
					powerChange: 10,
					description: "Ahora controlan los estadios. Su poder e influencia crecen."
				}
			]
		},
		{
			id: "rechazar-demandas",
			text: "🚫 Rechazar sus demandas",
			description:
				"Te plantas y les dices que no. Respetable, pero ahora tienes a la facción más violenta del país en tu contra.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 5, "Muestra de autoridad"),
			],
			factionEffects: [
				{
					factionId: FactionId.BARRAS_BRAVAS,
					supportChange: -75,
					description: "Rechazaste sus demandas. Te han declarado la guerra."
				}
			]
		},
	],
	icon: "🗣️",
	sound: "tension-politica",
};

export const LICITACION_ESTRATEGICA: PoliticalEvent = {
	id: "licitacion-estrategica-2025",
	title: "🏗️ Licitación Estratégica",
	description: "Un consorcio de empresarios amigos te ofrece una generosa 'donación' para tu partido a cambio de la adjudicación directa de un megaproyecto de infraestructura. Es una oportunidad para mejorar la economía, pero la corrupción podría dispararse.",
	type: EventType.OPORTUNIDAD,
	category: EventCategory.ECONOMICO,
	urgency: 3,
	trigger: {
		// Se activa si los empresarios tienen poder y confían en ti
		probability: 0.4,
	},
	choices: [
		{
			id: "aceptar-acuerdo",
			text: "🤝 Aceptar el jugoso acuerdo",
			description: "Adjudicas el contrato. La economía recibe un impulso y los empresarios te adoran, pero la corrupción aumenta y los sindicalistas desconfían.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, 15, "Inyección de capital por megaproyecto"),
				createImmediateEffect(MetricType.CORRUPCION, 20, "Adjudicación directa a empresarios amigos"),
			],
			factionEffects: [
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: 40,
					description: "El consorcio celebra tu 'visión para los negocios'."
				},
				{
					factionId: FactionId.SINDICALISTAS,
					supportChange: -15,
					description: "Los sindicatos denuncian favoritismo y falta de transparencia."
				}
			]
		},
		{
			id: "rechazar-oferta",
			text: "⚖️ Rechazar y llamar a licitación pública",
			description:
				"Optas por la transparencia. Ganas apoyo popular y de los sindicatos, pero los empresarios se enfurecen y la economía se estanca.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 10, "Muestra de transparencia"),
				createImmediateEffect(MetricType.CORRUPCION, -15, "Se evita un caso claro de corrupción"),
				createImmediateEffect(MetricType.ECONOMIA, -5, "El megaproyecto se retrasa por la burocracia"),
			],
			factionEffects: [
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: -20,
					description: "Los empresarios te acusan de frenar el progreso y te retiran su confianza."
				},
				{
					factionId: FactionId.SINDICALISTAS,
					supportChange: 15,
					description: "Los sindicatos celebran tu decisión de no ceder ante los intereses corporativos."
				}
			]
		},
	],
	icon: "🏗️",
	sound: "construccion-grande",
};

export const PARO_GENERAL_SORPRESIVO: PoliticalEvent = {
	id: "paro-general-2025",
	title: "📢 Paro General Sorpresivo",
	description: "La facción sindicalista ha convocado un paro general por 24 horas, paralizando la industria y los servicios. Exigen un aumento salarial de emergencia y un bono para los trabajadores. La presión es máxima.",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 5,
	trigger: {
		// Se activa con baja popularidad o economía
		requiredMetrics: {
			[MetricType.POPULARIDAD]: { max: 40 },
			[MetricType.ECONOMIA]: { max: 40 },
		},
		probability: 0.6,
	},
	choices: [
		{
			id: "otorgar-aumento",
			text: "✅ Decretar el aumento salarial",
			description: "Cedes a las demandas. El paro se levanta y los sindicalistas te apoyan, pero los empresarios enfurecen por el costo laboral y la economía sufre.",
			effects: [
				createImmediateEffect(MetricType.ECONOMIA, -15, "Aumento del gasto público por salarios"),
				createImmediateEffect(MetricType.POPULARIDAD, 10, "Aumento salarial bien recibido por la gente"),
			],
			factionEffects: [
				{
					factionId: FactionId.SINDICALISTAS,
					supportChange: 50,
					description: "Celebran la 'victoria histórica' de los trabajadores."
				},
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: -35,
					description: "Los empresarios critican la medida como 'populista e irresponsable'."
				}
			]
		},
		{
			id: "declarar-ilegal",
			text: "⚖️ Declarar el paro ilegal",
			description: "Usas tu poder para declarar la huelga ilegal y amenazas con sanciones. Los empresarios aplauden tu firmeza, pero los sindicatos te declaran su enemigo y la seguridad se tensa.",
			effects: [
				createImmediateEffect(MetricType.SEGURIDAD, -15, "Riesgo de disturbios por represión sindical"),
			],
			factionEffects: [
				{
					factionId: FactionId.SINDICALISTAS,
					supportChange: -70,
					description: "Te acusan de 'traidor' y prometen más medidas de fuerza."
				},
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: 25,
					description: "Los empresarios celebran tu 'defensa del orden y la propiedad'."
				}
			]
		}
	],
	icon: "📢",
	sound: "protesta-masiva"
};

export const CONFLICTO_PROVINCIAL_FACCIONES: PoliticalEvent = {
	id: "conflicto-provincial-facciones",
	title: "🔥 ¡Guerra de Poder en {provinceName}!",
	description:
		"La influencia de las facciones {faction1} y {faction2} ha llegado a un punto crítico en la provincia de {provinceName}, desatando un conflicto abierto por el control territorial. La situación es insostenible y requiere tu intervención inmediata antes de que escale a una guerra civil.",
	type: EventType.CONFLICTO_FACCIONES,
	category: EventCategory.PROVINCIAL,
	urgency: 5,
	trigger: {
		// Este evento se dispara manualmente desde la lógica del juego, no por condiciones normales.
	},
	choices: [
		{
			id: "apoyar-faccion-1",
			text: "Apoyar a {faction1}",
			description:
				"Respalda a {faction1} para que tome el control total, aplastando a su rival. Ganarás un poderoso aliado, pero la provincia quedará resentida.",
			// Los efectos se aplicarán dinámicamente
		},
		{
			id: "apoyar-faccion-2",
			text: "Apoyar a {faction2}",
			description:
				"Respalda a {faction2} para que se imponga. Consolidarás su poder en la región, pero a un costo muy alto.",
			// Los efectos se aplicarán dinámicamente
		},
		{
			id: "intervenir-neutral",
			text: "Mandar al ejército a calmar las aguas",
			description:
				"Impones un estado de sitio temporal en la provincia para detener la violencia. Ambas facciones te odiarán, pero evitarás un baño de sangre... por ahora.",
			// Los efectos se aplicarán dinámicamente
		},
	],
	icon: "⚔️",
	sound: "disturbios-violentos",
};

export const PIQUETE_TACHEROS: PoliticalEvent = {
	id: "piquete-tacheros-general-paz",
	title: "🚕 Piquete de Tacheros en General Paz",
	description:
		"La facción de los Tacheros ha bloqueado la General Paz en protesta contra las aplicaciones de transporte como Uber y Cabify. Exigen la prohibición inmediata de sus competidores y subsidios para renovar su flota. El caos de tránsito es total y la ciudad está al borde del colpaso.",
	type: EventType.CRISIS,
	category: EventCategory.SOCIAL,
	urgency: 4,
	trigger: {
		// Se activa si los Tacheros tienen suficiente poder y bajo apoyo
		probability: 0.4,
	},
	choices: [
		{
			id: "prohibir-apps",
			text: "🚫 Prohibir las aplicaciones de transporte",
			description:
				"Cedes ante la presión y prohíbes las apps. Los Tacheros celebran su victoria y te apoyan, pero una gran parte de la población y los sectores tecnológicos se enfurecen.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -15, "Rechazo de los usuarios de apps"),
				createImmediateEffect(MetricType.ECONOMIA, -5, "Impacto negativo en la economía digital"),
			],
			factionEffects: [
				{
					factionId: FactionId.TACHEROS,
					supportChange: 50,
					powerChange: 10,
					description: "Los Tacheros consiguen su monopolio y su poder aumenta."
				},
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: -10,
					description: "Los empresarios tecnológicos critican la medida como retrógrada."
				}
			],
		},
		{
			id: "regular-apps",
			text: "📝 Regular y negociar",
			description:
				"Propones una mesa de diálogo para regular las aplicaciones y establecer un impuesto. Es una solución intermedia que no dejará a nadie contento.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, 5, "Intento de solución equilibrada"),
				createImmediateEffect(MetricType.CORRUPCION, 5, "La regulación abre puertas a la corrupción"),
			],
			factionEffects: [
				{
					factionId: FactionId.TACHEROS,
					supportChange: -20,
					description: "Los Tacheros sienten que es una traición y no es suficiente."
				},
				{
					factionId: FactionId.OPOSICION,
					supportChange: 5,
					description: "La oposición apoya la regulación, pero la critica por insuficiente."
				}
			]
		},
		{
			id: "reprimir-piquete-tacheros",
			text: "🚔 Reprimir el piquete",
			description:
				"Ordenas a la policía despejar la General Paz por la fuerza. La violencia escala y podrías perder el control de la situación.",
			effects: [
				createImmediateEffect(MetricType.SEGURIDAD, -15, "Represión genera disturbios violentos"),
				createImmediateEffect(MetricType.POPULARIDAD, -10, "Imagen de autoritarismo"),
			],
			factionEffects: [
				{
					factionId: FactionId.TACHEROS,
					supportChange: -60,
					description: "Los Tacheros te declaran su enemigo mortal."
				}
			]
		},
	],
	icon: "🚕",
	sound: "piquete-bocinas",
};

export const REVUELTA_PROVINCIAL: PoliticalEvent = {
	id: "revuelta-provincial",
	title: "🚨 ¡Revuelta en {provinceName}!",
	description:
		"El descontento en {provinceName} ha explotado. La gente ha salido a las calles, superando a las fuerzas de seguridad locales. Queman edificios públicos y exigen tu renuncia. La provincia está fuera de control.",
	type: EventType.EMERGENCIA,
	category: EventCategory.PROVINCIAL,
	urgency: 5,
	trigger: {
		// Este evento se debe activar cuando el descontento de una provincia supere un umbral (ej. 85)
		// La lógica de activación estará en el PoliticalEventManager
	},
	choices: [
		{
			id: "negociar-revuelta",
			text: "💸 Enviar fondos y promesas",
			description:
				"Intentas calmar la situación con una inyección masiva de fondos y promesas de inversión. Podría funcionar, o podría ser visto como una señal de debilidad.",
		},
		{
			id: "intervenir-provincia",
			text: "🏛️ Intervenir la provincia",
			description:
				"Tomas el control total de la provincia, disolviendo el gobierno local. Una medida extrema que traerá graves consecuencias políticas y sociales.",
		},
		{
			id: "reprimir-revuelta",
			text: "⚔️ Enviar al ejército",
			description:
				"Ordenas al ejército restaurar el orden a cualquier costo. La violencia será extrema y tu imagen internacional quedará por los suelos, pero podrías sofocar la rebelión.",
		},
	],
	icon: "🔥",
	sound: "guerra-civil",
};

export const VISITA_FMI: PoliticalEvent = {
	id: "visita-fmi-2025",
	title: "🤝 Visita del FMI",
	description:
		"Una delegación del Fondo Monetario Internacional ha llegado al país para 'evaluar el progreso' de las reformas. Te ofrecen un nuevo desembolso a cambio de un severo ajuste fiscal. La decisión es tuya.",
	type: EventType.DECISION,
	category: EventCategory.ECONOMICO,
	urgency: 5,
	trigger: {
		probability: 0.3,
		requiredMetrics: { economia: { max: 35 } },
	},
	choices: [
		{
			id: "fmi-aceptar",
			text: "Aceptar las condiciones y el desembolso",
			description:
				"La oposición te acusa de vender el país. Tu popularidad sufre, pero los mercados internacionales respiran aliviados.",
			effects: [
				createImmediateEffect(
					MetricType.ECONOMIA,
					20,
					"El FMI desbloquea fondos y da confianza a los mercados.",
				),
				createImmediateEffect(
					MetricType.POPULARIDAD,
					-15,
					"Rechazo popular a las medidas de austeridad.",
				),
				createImmediateEffect(
					MetricType.RELACIONES_INTERNACIONALES,
					10,
					"Mejora la relación con organismos de crédito.",
				),
			],
			factionEffects: [
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: 15,
					description:
						"Los empresarios celebran la 'previsibilidad' económica.",
				},
				{
					factionId: FactionId.SINDICALISTAS,
					supportChange: -20,
					description: "Los sindicatos te declaran la guerra por el ajuste.",
				},
			],
		},
		{
			id: "fmi-rechazar",
			text: "Rechazar las condiciones y buscar soberanía",
			description:
				"Anuncias que no aceptarás las imposiciones del FMI y que buscarás un camino propio. Un gesto patriótico que gusta a la gente, pero que aísla al país y puede agravar la crisis.",
			effects: [
				createImmediateEffect(
					MetricType.ECONOMIA,
					-10,
					"Incertidumbre en los mercados y fuga de capitales.",
				),
				createImmediateEffect(
					MetricType.POPULARIDAD,
					20,
					"Fuerte apoyo popular a la defensa de la soberanía.",
				),
				createImmediateEffect(
					MetricType.RELACIONES_INTERNACIONALES,
					-15,
					"Conflicto con organismos internacionales y acreedores.",
				),
			],
			factionEffects: [
				{
					factionId: FactionId.LA_CAMPORA,
					supportChange: 25,
					description: "La Cámpora celebra tu postura 'anti-imperialista'.",
				},
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: -15,
					description:
						"Los empresarios te acusan de 'impredecible' y 'poco serio'.",
				},
			],
		},
	],
	icon: "🤝",
	sound: "negociacion-tensa",
};

export const FESTIVAL_CINE_MAR_DEL_PLATA: PoliticalEvent = {
	id: "festival-cine-mdp-2025",
	title: "🎬 Festival de Cine de Mar del Plata",
	description:
		"Se celebra el prestigioso Festival Internacional de Cine de Mar del Plata. Es una oportunidad única para mostrar al mundo una cara cultural y sofisticada de Argentina, atrayendo turismo y mejorando la imagen del país. Sin embargo, requiere una inversión considerable del estado.",
	type: EventType.OPORTUNIDAD,
	category: EventCategory.CULTURAL,
	urgency: 2,
	trigger: {
		probability: 0.2, // Evento cultural, no tan frecuente
	},
	choices: [
		{
			id: "cine-apoyo-total",
			text: "Dar apoyo total y subsidios generosos",
			description:
				"Inviertes fuertemente en el festival. Es un éxito rotundo, la comunidad artística te adora y la imagen del país mejora. El gasto, sin embargo, es considerable.",
			effects: [
				createImmediateEffect(
					MetricType.POPULARIDAD,
					10,
					"Apoyo de la comunidad cultural y artística.",
				),
				createImmediateEffect(
					MetricType.RELACIONES_INTERNACIONALES,
					10,
					"Mejora la imagen del país a nivel internacional.",
				),
				createImmediateEffect(
					MetricType.ECONOMIA,
					-7,
					"Gasto significativo en la organización del festival.",
				),
			],
			factionEffects: [
				{
					factionId: FactionId.MEDIOS,
					supportChange: 10,
					description:
						"Los medios elogian tu compromiso con la cultura nacional.",
				},
			],
		},
		{
			id: "cine-apoyo-moderado",
			text: "Ofrecer apoyo moderado y buscar sponsors",
			description:
				"Das un apoyo básico y buscas patrocinadores privados. El festival se hace, pero con menos brillo. Ahorras dinero, pero el impacto es menor y algunos te acusan de tacaño.",
			effects: [
				createImmediateEffect(
					MetricType.POPULARIDAD,
					5,
					"Apoyo moderado del sector cultural.",
				),
				createImmediateEffect(
					MetricType.RELACIONES_INTERNACIONALES,
					5,
					"El festival tiene una repercusión modesta.",
				),
				createImmediateEffect(
					MetricType.ECONOMIA,
					-2,
					"Gasto público reducido gracias a sponsors.",
				),
			],
		},
		{
			id: "cine-cancelar",
			text: "Cancelar el festival por austeridad",
			description:
				"Decides que no hay dinero para 'fiestas' y cancelas el apoyo estatal. Ahorras dinero, pero la comunidad cultural y la oposición te destrozan, acusándote de ignorante.",
			effects: [
				createImmediateEffect(
					MetricType.POPULARIDAD,
					-10,
					"Furia de la comunidad artística y cultural.",
				),
				createImmediateEffect(
					MetricType.RELACIONES_INTERNACIONALES,
					-5,
					"Se cancela un evento de prestigio internacional.",
				),
			],
			factionEffects: [
				{
					factionId: FactionId.MEDIOS,
					supportChange: -10,
					description:
						"Los medios te critican duramente por tu 'falta de visión'.",
				},
				{
					factionId: FactionId.OPOSICION,
					supportChange: -10,
					description: "La oposición te usa como ejemplo de 'brutalidad'.",
				},
			],
		},
	],
};

export const BRECHA_SEGURIDAD_INFORMATICA: PoliticalEvent = {
	id: "brecha-seguridad-gobierno-2025",
	title: "🔒 Brecha de Seguridad Informática",
	description:
		"Un grupo de hackers ha vulnerado los sistemas del gobierno, robando información sensible. La noticia aún no es pública. Tienes la opción de invertir en ciberseguridad para mitigar el daño, o intentar ocultar el incidente, arriesgándote a un escándalo mayor si la verdad sale a la luz.",
	type: EventType.CRISIS,
	category: EventCategory.SEGURIDAD,
	urgency: 4,
	trigger: {
		probability: 0.15,
		requiredMetrics: { seguridad: { max: 40 } }, // Más probable si la seguridad es baja
	},
	choices: [
		{
			id: "seguridad-invertir",
			text: "Invertir en ciberseguridad y transparentar",
			description:
				"Anuncias la brecha y destinas fondos de emergencia para fortalecer los sistemas. Es un golpe a corto plazo, pero refuerza la confianza a largo plazo.",
			effects: [
				createImmediateEffect(
					MetricType.SEGURIDAD,
					-10,
					"Admisión pública de la vulnerabilidad del sistema.",
				),
				createImmediateEffect(
					MetricType.ECONOMIA,
					-8,
					"Gasto de emergencia en ciberseguridad.",
				),
				createImmediateEffect(
					MetricType.CORRUPCION,
					-5,
					"La transparencia es bien vista.",
				),
			],
		},
		{
			id: "seguridad-ocultar",
			text: "Ocultar el incidente y esperar que no se filtre",
			description:
				"Decides no decir nada y usar a la inteligencia para silenciar posibles filtraciones. No gastas dinero, pero si la noticia se filtra, el escándalo será catastrófico.",
			effects: [
				createImmediateEffect(
					MetricType.CONTROL_MEDIOS,
					10,
					"Uso de recursos de inteligencia para controlar la narrativa.",
				),
				createImmediateEffect(
					MetricType.CORRUPCION,
					15,
					"Ocultamiento de una falla grave del estado.",
				),
			],
			// Esta decisión podría disparar un evento futuro de "ESCÁNDALO DE HACKEO"
			triggeredEvents: ["escandalo-hackeo-filtracion"],
		},
	],
};

export const ESCANDALO_DE_SOBORNOS: PoliticalEvent = {
	id: "escandalo-de-sobornos-2025",
	title: "🤫 Escándalo de Sobornos",
	description:
		"Se ha descubierto una red de corrupción en el gobierno que involucra a varios funcionarios y empresarios. La noticia ha causado una gran crisis política y ha afectado la imagen del país.",
	type: EventType.CRISIS,
	category: EventCategory.CORRUPCION,
	urgency: 5,
	trigger: {
		probability: 0.1,
		requiredMetrics: { corrupcion: { max: 50 } },
	},
	choices: [
		{
			id: "investigar",
			text: "🔍 Investigar y sancionar",
			description:
				"Ordenas una investigación exhaustiva y sanciones a los implicados. Es una solución a corto plazo, pero podría causar descontento entre los funcionarios y empresarios.",
			effects: [
				createImmediateEffect(MetricType.CORRUPCION, -10, "Reducción de la corrupción"),
				createImmediateEffect(MetricType.POPULARIDAD, -5, "Rechazo popular a la investigación"),
			],
			factionEffects: [
				{
					factionId: FactionId.LA_CAMPORA,
					supportChange: -10,
					description: "La Cámpora se enfrenta a la crisis y pierde apoyo."
				},
				{
					factionId: FactionId.EMPRESARIOS,
					supportChange: -10,
					description: "Los empresarios se enfrentan a la crisis y pierden apoyo."
				}
			]
		},
		{
			id: "ocultar",
			text: "🤫 Ocultar la noticia",
			description:
				"Decides no hacer nada y esperar que la noticia se diluya con el tiempo. Es una solución a largo plazo, pero podría empeorar la situación.",
			effects: [
				createImmediateEffect(MetricType.CONTROL_MEDIOS, 10, "Uso de recursos de inteligencia para controlar la narrativa."),
				createImmediateEffect(MetricType.CORRUPCION, 10, "Aumento de la corrupción"),
			],
			triggeredEvents: ["escandalo-hackeo-filtracion"],
		},
	],
	icon: "🤫",
	sound: "negocios-turbios",
};

export const EVENTO_ESPECIFICO_PRESIDENTE: PoliticalEvent = {
	id: "evento-especial-default",
	title: "🤔 ¿Y este quién es?",
	description:
		"La gente parece confundida sobre tu identidad. Algunos te llaman por tu nombre, otros te confunden con un presentador de TV. Quizás deberías hacer algo memorable para que sepan quién manda.",
	type: EventType.HUMOR_NEGRO,
	category: EventCategory.SOCIAL,
	urgency: 1,
	trigger: {
		requiredPresidentId: "default-president",
		probability: 1, // 100% de probabilidad para que aparezca rápido en las pruebas
	},
	choices: [
		{
			id: "ignorar",
			text: "🤷‍♂️ Ignorarlos",
			description: "Ya se van a acostumbrar a tu cara.",
			effects: [
				createImmediateEffect(MetricType.POPULARIDAD, -5, "La gente te percibe como un don nadie."),
			],
		},
	],
	icon: "🤔",
	sound: "sonido-confuso",
};

// Agrupamos todos los eventos adicionales en un solo array para exportar
export const morePoliticalEvents: PoliticalEvent[] = [
	SUPERCLASICO_PRESIDENCIAL,
	GUERRA_DE_BARRAS,
	BARRAS_BRAVAS_REUNION,
	LICITACION_ESTRATEGICA,
	PARO_GENERAL_SORPRESIVO,
	CONFLICTO_PROVINCIAL_FACCIONES,
	PIQUETE_TACHEROS,
	REVUELTA_PROVINCIAL,
	VISITA_FMI,
	FESTIVAL_CINE_MAR_DEL_PLATA,
	BRECHA_SEGURIDAD_INFORMATICA,
	ESCANDALO_DE_SOBORNOS,
	EVENTO_ESPECIFICO_PRESIDENTE,
];
