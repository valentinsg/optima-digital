import { Law, MetricType } from "@/types/political";

export const ALL_LAWS: Law[] = [
	{
		id: "ley_reforma_laboral",
		title: "Reforma Laboral",
		description:
			"Flexibiliza las condiciones de contratación y despido para fomentar la inversión, a costa de la seguridad de los trabajadores.",
		category: "Economía",
		effects: [
			{
				type: MetricType.ECONOMIA,
				change: 15,
				description: "Aumento de la inversión extranjera",
				isImmediate: true,
			},
			{
				type: MetricType.POPULARIDAD,
				change: -10,
				description: "Descontento de los sindicatos",
				isImmediate: true,
			},
		],
		cost: {
			popularidad: 5,
		},
		requirements: {
			metrics: {
				economia: { max: 50 },
			},
		},
	},
	{
		id: "ley_educacion_publica",
		title: "Inversión en Educación Pública",
		description:
			"Aumenta significativamente el presupuesto para educación, mejorando la infraestructura y los salarios docentes a largo plazo.",
		category: "Social",
		effects: [
			{
				type: MetricType.POPULARIDAD,
				change: 10,
				description: "Apoyo del sector educativo",
				isImmediate: true,
			},
			{
				type: MetricType.ECONOMIA,
				change: -5,
				description: "Aumento del gasto público",
				isImmediate: true,
			},
		],
		requirements: {},
	},
	{
		id: "ley_anti_corrupcion",
		title: "Ley Anti-Corrupción",
		description:
			"Implementa medidas estrictas de transparencia y control en el gobierno, con penas más duras para los funcionarios corruptos.",
		category: "Justicia",
		effects: [
			{
				type: MetricType.CORRUPCION,
				change: -20,
				description: "Reducción de la corrupción percibida",
				isImmediate: true,
			},
			{
				type: MetricType.POPULARIDAD,
				change: 10,
				description: "Aumento de la confianza ciudadana",
				isImmediate: true,
			},
		],
		requirements: {
			metrics: {
				corrupcion: { min: 40 },
			},
		},
	},
];
