/**
 * PRESIDENCIAL BARDO - Utilidades de Efectos de Métricas
 * Funciones para calcular y aplicar efectos de métricas políticas
 */

import {
    MetricEffect,
    MetricThreshold,
    MetricType,
    PoliticalMetrics
} from "@/types/political";

// ===== THRESHOLDS DE MÉTRICAS =====

export const METRIC_THRESHOLDS: MetricThreshold = {
	critical: 25,
	low: 50,
	medium: 75,
	high: 100,
};

// ===== CREATORS DE EFECTOS =====

/**
 * Crea un efecto inmediato en una métrica
 */
export const createImmediateEffect = (
	type: MetricType,
	change: number,
	description: string
): MetricEffect => ({
	type,
	change,
	description,
	isImmediate: true,
});

/**
 * Crea un efecto gradual en una métrica
 */
export const createGradualEffect = (
	type: MetricType,
	change: number,
	description: string,
	duration: number
): MetricEffect => ({
	type,
	change,
	description,
	isImmediate: false,
	duration,
});

/**
 * Crea múltiples efectos inmediatos
 */
export const createMultipleEffects = (
	effects: Array<{
		type: MetricType;
		change: number;
		description: string;
	}>
): MetricEffect[] => {
	return effects.map(effect => createImmediateEffect(effect.type, effect.change, effect.description));
};

// ===== EFECTOS PREDEFINIDOS =====

/**
 * Efectos económicos comunes
 */
export const ECONOMIC_EFFECTS = {
	/** Crisis económica leve */
	CRISIS_LEVE: createMultipleEffects([
		{ type: MetricType.ECONOMIA, change: -10, description: "Crisis económica leve" },
		{ type: MetricType.POPULARIDAD, change: -5, description: "Pérdida de popularidad por crisis" },
	]),

	/** Crisis económica grave */
	CRISIS_GRAVE: createMultipleEffects([
		{ type: MetricType.ECONOMIA, change: -20, description: "Crisis económica grave" },
		{ type: MetricType.POPULARIDAD, change: -15, description: "Pérdida significativa de popularidad" },
		{ type: MetricType.SEGURIDAD, change: -5, description: "Aumento de tensión social" },
	]),

	/** Recuperación económica */
	RECUPERACION: createMultipleEffects([
		{ type: MetricType.ECONOMIA, change: 15, description: "Recuperación económica" },
		{ type: MetricType.POPULARIDAD, change: 10, description: "Aumento de popularidad" },
	]),

	/** Inflación descontrolada */
	INFLACION_DESCONTROLADA: createMultipleEffects([
		{ type: MetricType.ECONOMIA, change: -25, description: "Inflación descontrolada" },
		{ type: MetricType.POPULARIDAD, change: -20, description: "Rechazo popular masivo" },
		{ type: MetricType.SEGURIDAD, change: -10, description: "Protestas y disturbios" },
	]),
};

/**
 * Efectos sociales comunes
 */
export const SOCIAL_EFFECTS = {
	/** Protestas pacíficas */
	PROTESTAS_PACIFICAS: createMultipleEffects([
		{ type: MetricType.POPULARIDAD, change: -5, description: "Protestas pacíficas" },
		{ type: MetricType.SEGURIDAD, change: -3, description: "Tensión social leve" },
	]),

	/** Disturbios violentos */
	DISTURBIOS_VIOLENTOS: createMultipleEffects([
		{ type: MetricType.SEGURIDAD, change: -15, description: "Disturbios violentos" },
		{ type: MetricType.POPULARIDAD, change: -10, description: "Pérdida de control percibida" },
	]),

	/** Apoyo popular */
	APOYO_POPULAR: createMultipleEffects([
		{ type: MetricType.POPULARIDAD, change: 15, description: "Apoyo popular" },
		{ type: MetricType.SEGURIDAD, change: 5, description: "Estabilidad social" },
	]),
};

/**
 * Efectos de corrupción
 */
export const CORRUPTION_EFFECTS = {
	/** Escándalo menor */
	ESCANDALO_MENOR: createMultipleEffects([
		{ type: MetricType.CORRUPCION, change: 10, description: "Escándalo de corrupción menor" },
		{ type: MetricType.POPULARIDAD, change: -8, description: "Pérdida de confianza" },
	]),

	/** Escándalo mayor */
	ESCANDALO_MAYOR: createMultipleEffects([
		{ type: MetricType.CORRUPCION, change: 20, description: "Escándalo de corrupción mayor" },
		{ type: MetricType.POPULARIDAD, change: -15, description: "Crisis de confianza" },
		{ type: MetricType.CONTROL_MEDIOS, change: -10, description: "Pérdida de control narrativo" },
	]),

	/** Medidas anticorrupción */
	MEDIDAS_ANTICORRUPCION: createMultipleEffects([
		{ type: MetricType.CORRUPCION, change: -15, description: "Medidas anticorrupción" },
		{ type: MetricType.POPULARIDAD, change: 10, description: "Aumento de confianza" },
	]),
};

/**
 * Efectos internacionales
 */
export const INTERNATIONAL_EFFECTS = {
	/** Tensión diplomática */
	TENSION_DIPLOMATICA: createMultipleEffects([
		{ type: MetricType.RELACIONES_INTERNACIONALES, change: -10, description: "Tensión diplomática" },
		{ type: MetricType.ECONOMIA, change: -5, description: "Impacto económico" },
	]),

	/** Acuerdo internacional */
	ACUERDO_INTERNACIONAL: createMultipleEffects([
		{ type: MetricType.RELACIONES_INTERNACIONALES, change: 15, description: "Acuerdo internacional exitoso" },
		{ type: MetricType.ECONOMIA, change: 8, description: "Beneficios económicos" },
		{ type: MetricType.POPULARIDAD, change: 5, description: "Reconocimiento internacional" },
	]),

	/** Sanciones internacionales */
	SANCIONES: createMultipleEffects([
		{ type: MetricType.RELACIONES_INTERNACIONALES, change: -20, description: "Sanciones internacionales" },
		{ type: MetricType.ECONOMIA, change: -15, description: "Impacto económico severo" },
		{ type: MetricType.POPULARIDAD, change: -10, description: "Aislamiento internacional" },
	]),
};

// ===== CÁLCULOS Y VALIDACIONES =====

/**
 * Calcula el nivel de una métrica basado en su valor
 */
export const calculateMetricLevel = (value: number): 'critical' | 'low' | 'medium' | 'high' => {
	if (value <= METRIC_THRESHOLDS.critical) return 'critical';
	if (value <= METRIC_THRESHOLDS.low) return 'low';
	if (value <= METRIC_THRESHOLDS.medium) return 'medium';
	return 'high';
};

/**
 * Valida si una métrica está en nivel crítico
 */
export const isMetricCritical = (value: number): boolean => {
	return value <= METRIC_THRESHOLDS.critical;
};

/**
 * Calcula el promedio de todas las métricas
 */
export const calculateAverageMetrics = (metrics: PoliticalMetrics): number => {
	const values = Object.values(metrics);
	return values.reduce((sum, value) => sum + value, 0) / values.length;
};

/**
 * Cuenta cuántas métricas están en nivel crítico
 */
export const countCriticalMetrics = (metrics: PoliticalMetrics): number => {
	return Object.values(metrics).filter(value => isMetricCritical(value)).length;
};

/**
 * Calcula el nivel de crisis general basado en las métricas
 */
export const calculateCrisisLevel = (metrics: PoliticalMetrics): number => {
	const criticalCount = countCriticalMetrics(metrics);
	const averageValue = calculateAverageMetrics(metrics);

	// Nivel de crisis de 0-5
	let crisisLevel = 0;

	// Cada métrica crítica agrega 1 al nivel de crisis
	crisisLevel += criticalCount;

	// Si el promedio es muy bajo, agregar crisis adicional
	if (averageValue < 30) crisisLevel += 1;
	if (averageValue < 20) crisisLevel += 1;

	return Math.min(5, crisisLevel);
};

/**
 * Determina si el país está en crisis general
 */
export const isInGeneralCrisis = (metrics: PoliticalMetrics): boolean => {
	return calculateCrisisLevel(metrics) >= 3;
};

/**
 * Calcula efectos en el gameplay basado en métricas
 */
export const calculateGameplayEffects = (metrics: PoliticalMetrics) => {
	const effects = {
		enemySpawnMultiplier: 1.0,
		enemyHealthMultiplier: 1.0,
		playerDamageMultiplier: 1.0,
		specialEventChance: 0.1,
		crisisEventChance: 0.05,
	};

	// Efectos basados en seguridad
	if (metrics.seguridad < 30) {
		effects.enemySpawnMultiplier *= 1.5;
		effects.crisisEventChance *= 2;
	}

	// Efectos basados en popularidad
	if (metrics.popularidad < 25) {
		effects.enemySpawnMultiplier *= 1.3;
		effects.specialEventChance *= 1.5;
	}

	// Efectos basados en economía
	if (metrics.economia < 20) {
		effects.enemyHealthMultiplier *= 1.2;
		effects.crisisEventChance *= 1.8;
	}

	// Efectos basados en nivel de crisis general
	const crisisLevel = calculateCrisisLevel(metrics);
	if (crisisLevel >= 3) {
		effects.enemySpawnMultiplier *= 1.4;
		effects.enemyHealthMultiplier *= 1.3;
		effects.crisisEventChance *= 2.5;
	}

	return effects;
};

/**
 * Genera un color para representar el nivel de una métrica
 */
export const getMetricColor = (value: number): string => {
	if (value <= 25) return '#ef4444'; // Rojo crítico
	if (value <= 50) return '#f97316'; // Naranja bajo
	if (value <= 75) return '#eab308'; // Amarillo medio
	return '#22c55e'; // Verde alto
};

/**
 * Genera un color para el nivel de crisis
 */
export const getCrisisColor = (crisisLevel: number): string => {
	switch (crisisLevel) {
		case 0: return '#22c55e'; // Verde - Sin crisis
		case 1: return '#84cc16'; // Verde claro - Crisis mínima
		case 2: return '#eab308'; // Amarillo - Crisis leve
		case 3: return '#f97316'; // Naranja - Crisis moderada
		case 4: return '#ef4444'; // Rojo - Crisis grave
		case 5: return '#991b1b'; // Rojo oscuro - Crisis extrema
		default: return '#6b7280'; // Gris - Desconocido
	}
};

// ===== SISTEMA DE EFECTOS PASIVOS DE FACCIONES =====

/**
 * Efectos pasivos de facciones según su nivel de apoyo
 */
export const calculateFactionPassiveEffects = (
	factionStates: Record<string, any>
): MetricEffect[] => {
	const effects: MetricEffect[] = [];

	// La Cámpora - Efectos cuando tiene alto apoyo
	if (factionStates.la_campora?.support > 50) {
		effects.push(
			createImmediateEffect(MetricType.CONTROL_MEDIOS, 2, "Influencia de La Cámpora en medios"),
			createImmediateEffect(MetricType.POPULARIDAD, 1, "Base de apoyo movilizada")
		);
	} else if (factionStates.la_campora?.support < -30) {
		effects.push(
			createImmediateEffect(MetricType.CONTROL_MEDIOS, -3, "Oposición de La Cámpora"),
			createImmediateEffect(MetricType.SEGURIDAD, -2, "Tensión con base militante")
		);
	}

	// Empresarios - Efectos económicos
	if (factionStates.empresarios?.support > 40) {
		effects.push(
			createImmediateEffect(MetricType.ECONOMIA, 3, "Confianza empresarial"),
			createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, 2, "Inversión extranjera")
		);
	} else if (factionStates.empresarios?.support < -20) {
		effects.push(
			createImmediateEffect(MetricType.ECONOMIA, -5, "Fuga de capitales"),
			createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -3, "Desconfianza internacional")
		);
	}

	// Sindicalistas - Efectos sociales
	if (factionStates.sindicalistas?.support > 30) {
		effects.push(
			createImmediateEffect(MetricType.POPULARIDAD, 2, "Paz laboral"),
			createImmediateEffect(MetricType.SEGURIDAD, 1, "Estabilidad social")
		);
	} else if (factionStates.sindicalistas?.support < -25) {
		effects.push(
			createImmediateEffect(MetricType.SEGURIDAD, -4, "Conflictos laborales"),
			createImmediateEffect(MetricType.ECONOMIA, -3, "Paros y huelgas")
		);
	}

	// Militares - Efectos de seguridad
	if (factionStates.militares?.support > 25) {
		effects.push(
			createImmediateEffect(MetricType.SEGURIDAD, 3, "Apoyo militar"),
			createImmediateEffect(MetricType.CORRUPCION, 1, "Influencia militar en política")
		);
	} else if (factionStates.militares?.support < -20) {
		effects.push(
			createImmediateEffect(MetricType.SEGURIDAD, -3, "Descontento militar"),
			createImmediateEffect(MetricType.POPULARIDAD, -2, "Rumores de golpe")
		);
	}

	// Barras Bravas - Efectos de seguridad y popularidad
	if (factionStates.barras_bravas?.support > 20) {
		effects.push(
			createImmediateEffect(MetricType.POPULARIDAD, 2, "Apoyo de barras"),
			createImmediateEffect(MetricType.SEGURIDAD, -1, "Influencia de barras en calles")
		);
	} else if (factionStates.barras_bravas?.support < -30) {
		effects.push(
			createImmediateEffect(MetricType.SEGURIDAD, -5, "Violencia de barras"),
			createImmediateEffect(MetricType.POPULARIDAD, -3, "Caos en estadios")
		);
	}

	// Oposición - Efectos políticos
	if (factionStates.oposicion?.support > -20) {
		effects.push(
			createImmediateEffect(MetricType.CONTROL_MEDIOS, -2, "Narrativa opositora"),
			createImmediateEffect(MetricType.POPULARIDAD, -1, "Críticas de oposición")
		);
	} else if (factionStates.oposicion?.support < -60) {
		effects.push(
			createImmediateEffect(MetricType.POPULARIDAD, 2, "Oposición debilitada"),
			createImmediateEffect(MetricType.CONTROL_MEDIOS, 3, "Control narrativo")
		);
	}

	// Tacheros - Efectos de transporte y economía
	if (factionStates.tacheros?.support > 15) {
		effects.push(
			createImmediateEffect(MetricType.ECONOMIA, 1, "Servicio de transporte estable"),
			createImmediateEffect(MetricType.SEGURIDAD, 1, "Tacheros como informantes")
		);
	} else if (factionStates.tacheros?.support < -40) {
		effects.push(
			createImmediateEffect(MetricType.ECONOMIA, -2, "Paros de tacheros"),
			createImmediateEffect(MetricType.SEGURIDAD, -2, "Bloqueos de transporte")
		);
	}

	return effects;
};

/**
 * Efectos por tramos de métricas (efectos pasivos automáticos)
 */
export const calculateMetricThresholdEffects = (
	metrics: PoliticalMetrics
): MetricEffect[] => {
	const effects: MetricEffect[] = [];

	// Efectos por economía baja
	if (metrics.economia <= 25) {
		effects.push(
			createImmediateEffect(MetricType.POPULARIDAD, -2, "Drenaje de popularidad por crisis económica"),
			createImmediateEffect(MetricType.SEGURIDAD, -1, "Tensión social por crisis")
		);
	}

	// Efectos por seguridad baja
	if (metrics.seguridad <= 30) {
		effects.push(
			createImmediateEffect(MetricType.POPULARIDAD, -3, "Pérdida de confianza por inseguridad"),
			createImmediateEffect(MetricType.ECONOMIA, -1, "Impacto económico de la inseguridad")
		);
	}

	// Efectos por popularidad alta
	if (metrics.popularidad >= 75) {
		effects.push(
			createImmediateEffect(MetricType.SEGURIDAD, 1, "Estabilidad por alta popularidad"),
			createImmediateEffect(MetricType.CONTROL_MEDIOS, 1, "Control narrativo facilitado")
		);
	}

	// Efectos por corrupción alta
	if (metrics.corrupcion >= 70) {
		effects.push(
			createImmediateEffect(MetricType.POPULARIDAD, -2, "Descontento por corrupción"),
			createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -1, "Imagen internacional deteriorada")
		);
	}

	// Efectos por salud baja
	if (metrics.salud <= 35) {
		effects.push(
			createImmediateEffect(MetricType.POPULARIDAD, -2, "Descontento por crisis sanitaria"),
			createImmediateEffect(MetricType.ECONOMIA, -1, "Pérdida de productividad por salud")
		);
	}

	// Efectos por tecnología baja
	if (metrics.tecnologia <= 30) {
		effects.push(
			createImmediateEffect(MetricType.ECONOMIA, -1, "Atraso tecnológico afecta economía"),
			createImmediateEffect(MetricType.RELACIONES_INTERNACIONALES, -1, "Imagen de país atrasado")
		);
	}

	return effects;
};

// ===== APLICACIÓN DE EFECTOS =====

/**
 * Calcula el nuevo valor de una métrica con límites (0-100)
 */
export const calculateNewValue = (current: number, change: number): number => {
	const newValue = current + change;
	if (newValue < 0) return 0;
	if (newValue > 100) return 100;
	return newValue;
};

/**
 * Aplica un efecto a las métricas políticas
 */
export const applyMetricEffect = (
	metrics: PoliticalMetrics,
	effect: MetricEffect
): PoliticalMetrics => {
	if (!effect.type || !Object.values(MetricType).includes(effect.type)) return metrics;
	const currentValue = metrics[effect.type];
	const newValue = calculateNewValue(currentValue, effect.change);
	return { ...metrics, [effect.type]: newValue };
};

/**
 * Verifica condiciones de game over basadas en métricas críticas
 */
export const checkGameOver = (metrics: PoliticalMetrics): boolean => {
	const criticalCount = countCriticalMetrics(metrics);
	return criticalCount >= 3;
};
