/**
 * PRESIDENCIAL BARDO - Sistema de Efectos Graduales
 * Efectos que se aplican de manera progresiva para mayor realismo
 */

import { MetricType, type PoliticalMetrics } from "@/types/political";

export interface GradualEffect {
	metricType: MetricType;
	totalChange: number;
	duration: number; // en segundos
	description: string;
	startTime: number;
	applied: number; // cuánto se ha aplicado ya
}

export class GradualEffectManager {
	private activeEffects: Map<string, GradualEffect> = new Map();
	private effectCounter = 0;

	/**
	 * Crea un efecto gradual que se aplica durante un período de tiempo
	 */
	public createGradualEffect(
		metricType: MetricType,
		totalChange: number,
		duration: number,
		description: string
	): string {
		const effectId = `effect_${this.effectCounter++}`;

		const effect: GradualEffect = {
			metricType,
			totalChange,
			duration,
			description,
			startTime: Date.now(),
			applied: 0
		};

		this.activeEffects.set(effectId, effect);
		return effectId;
	}

	/**
	 * Actualiza todos los efectos graduales activos
	 */
	public updateEffects(metrics: PoliticalMetrics): PoliticalMetrics {
		const currentTime = Date.now();
		const updatedMetrics = { ...metrics };
		const completedEffects: string[] = [];

		for (const [effectId, effect] of this.activeEffects) {
			const elapsed = (currentTime - effect.startTime) / 1000; // en segundos

			if (elapsed >= effect.duration) {
				// Efecto completado, aplicar el resto
				const remaining = effect.totalChange - effect.applied;
				updatedMetrics[effect.metricType] = Math.max(0, Math.min(100,
					updatedMetrics[effect.metricType] + remaining
				));
				completedEffects.push(effectId);
			} else {
				// Aplicar progresivamente
				const progress = elapsed / effect.duration;
				const shouldHaveApplied = effect.totalChange * progress;
				const toApply = shouldHaveApplied - effect.applied;

				if (Math.abs(toApply) >= 0.1) { // Solo aplicar si el cambio es significativo
					updatedMetrics[effect.metricType] = Math.max(0, Math.min(100,
						updatedMetrics[effect.metricType] + toApply
					));
					effect.applied += toApply;
				}
			}
		}

		// Limpiar efectos completados
		completedEffects.forEach(effectId => {
			this.activeEffects.delete(effectId);
		});

		return updatedMetrics;
	}

	/**
	 * Obtiene información sobre efectos activos
	 */
	public getActiveEffects(): Array<{
		id: string;
		effect: GradualEffect;
		progress: number;
		remaining: number;
	}> {
		const currentTime = Date.now();
		const result: Array<{
			id: string;
			effect: GradualEffect;
			progress: number;
			remaining: number;
		}> = [];

		for (const [effectId, effect] of this.activeEffects) {
			const elapsed = (currentTime - effect.startTime) / 1000;
			const progress = Math.min(1, elapsed / effect.duration);
			const remaining = effect.duration - elapsed;

			result.push({
				id: effectId,
				effect,
				progress,
				remaining: Math.max(0, remaining)
			});
		}

		return result;
	}

	/**
	 * Cancela un efecto específico
	 */
	public cancelEffect(effectId: string): boolean {
		return this.activeEffects.delete(effectId);
	}

	/**
	 * Cancela todos los efectos activos
	 */
	public clearAllEffects(): void {
		this.activeEffects.clear();
	}

	/**
	 * Acelera todos los efectos activos (para testing o eventos especiales)
	 */
	public accelerateEffects(multiplier: number): void {
		for (const effect of this.activeEffects.values()) {
			effect.duration = Math.max(1, effect.duration / multiplier);
		}
	}
}

// Funciones helper para crear efectos graduales comunes

/**
 * Crea un efecto gradual lento (se aplica durante 30-60 segundos)
 */
export function createSlowGradualEffect(
	metricType: MetricType,
	totalChange: number,
	description: string
): GradualEffect {
	return {
		metricType,
		totalChange,
		duration: 45, // 45 segundos
		description,
		startTime: Date.now(),
		applied: 0
	};
}

/**
 * Crea un efecto gradual medio (se aplica durante 15-30 segundos)
 */
export function createMediumGradualEffect(
	metricType: MetricType,
	totalChange: number,
	description: string
): GradualEffect {
	return {
		metricType,
		totalChange,
		duration: 20, // 20 segundos
		description,
		startTime: Date.now(),
		applied: 0
	};
}

/**
 * Crea un efecto gradual rápido (se aplica durante 5-15 segundos)
 */
export function createFastGradualEffect(
	metricType: MetricType,
	totalChange: number,
	description: string
): GradualEffect {
	return {
		metricType,
		totalChange,
		duration: 8, // 8 segundos
		description,
		startTime: Date.now(),
		applied: 0
	};
}

/**
 * Crea múltiples efectos graduales con diferentes velocidades
 */
export function createMixedGradualEffects(effects: Array<{
	metricType: MetricType;
	totalChange: number;
	speed: 'slow' | 'medium' | 'fast';
	description: string;
}>): GradualEffect[] {
	return effects.map(effect => {
		switch (effect.speed) {
			case 'slow':
				return createSlowGradualEffect(effect.metricType, effect.totalChange, effect.description);
			case 'medium':
				return createMediumGradualEffect(effect.metricType, effect.totalChange, effect.description);
			case 'fast':
				return createFastGradualEffect(effect.metricType, effect.totalChange, effect.description);
			default:
				return createMediumGradualEffect(effect.metricType, effect.totalChange, effect.description);
		}
	});
}

// Instancia global del manager (singleton)
export const gradualEffectManager = new GradualEffectManager();
