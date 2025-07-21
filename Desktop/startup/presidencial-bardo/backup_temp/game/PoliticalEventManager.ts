/**
 * PRESIDENCIAL BARDO - Political Event Manager
 * Controlador principal de eventos políticos argentinos
 */

import { CONSEQUENCE_EVENTS } from '@/data/events/consequenceEvents';
import { morePoliticalEvents } from '@/data/events/morePoliticalEvents';
import { ALL_POLITICAL_EVENTS } from '@/data/events/politicalEvents';
import { PROVINCE_EVENTS } from '@/data/events/provinceEvents';
import {
    EventCategory,
    EventTrigger,
    PoliticalEvent,
    PoliticalMetrics,
    type DecisionResult,
} from "@/types/political";
import { calculateCrisisLevel, isInGeneralCrisis } from "@/utils/metricEffects";

export class PoliticalEventManager {
	private events: PoliticalEvent[];
	private presidentId: string;
	private lastEventTime: number = 0;
	private eventCooldowns: Map<string, number> = new Map();
	private eventHistory: string[] = [];
	private currentCrisisLevel: number = 0;
	private triggeredEvents: Set<string> = new Set();

	// Configuración del sistema de probabilidad de eventos por día
	private readonly BASE_EVENT_PROBABILITY = 0.07; // ~7% de probabilidad base por día
	private readonly CRISIS_EVENT_MULTIPLIER = 1.5; // Eventos 50% más probables durante crisis
	private readonly CRITICAL_METRIC_BONUS = 0.05; // +5% de prob. por cada métrica en estado crítico

	constructor(events: PoliticalEvent[] = [], presidentId: string = 'default') {
		// Combinar todos los tipos de eventos
		this.events = [
			...ALL_POLITICAL_EVENTS,
			...morePoliticalEvents,
			...CONSEQUENCE_EVENTS,
			...PROVINCE_EVENTS
		];
		this.presidentId = presidentId;
		this.lastEventTime = Date.now();
	}

	/**
	 * Actualiza el estado del manager y verifica si debe activar eventos
	 */
	public update(
		metrics: PoliticalMetrics,
		governmentTime: number,
		politicalDecisions: DecisionResult[],
		provinceStates: Record<string, any> = {},
	): PoliticalEvent | null {
		const currentTime = Date.now();
		this.currentCrisisLevel = calculateCrisisLevel(metrics);

		// Verificar si es momento de activar un evento
		if (this.shouldTriggerEvent(metrics)) {
			const event = this.selectEvent(
				metrics,
				governmentTime,
				politicalDecisions,
				provinceStates,
			);
			if (event) {
				this.triggerEvent(event);
				return event;
			}
		}

		// Limpiar cooldowns expirados
		this.cleanupExpiredCooldowns(currentTime);

		return null;
	}

	/**
	 * Determina si es momento de activar un evento
	 */
	private shouldTriggerEvent(metrics: PoliticalMetrics): boolean {
		// Probabilidad base de evento por día
		let eventProbability = this.BASE_EVENT_PROBABILITY;

		// Aumentar probabilidad durante crisis general
		if (isInGeneralCrisis(metrics)) {
			eventProbability *= this.CRISIS_EVENT_MULTIPLIER;
		}

		// Aumentar probabilidad por cada métrica en estado crítico
		const criticalMetrics = Object.values(metrics).filter(
			value => value <= 25,
		).length;
		eventProbability += criticalMetrics * this.CRITICAL_METRIC_BONUS;

		// Asegurar que la probabilidad no exceda un máximo razonable (ej. 95%)
		const finalProbability = Math.min(eventProbability, 0.95);

		return Math.random() < finalProbability;
	}

	/**
	 * Selecciona un evento apropiado según el estado actual
	 */
	private selectEvent(
		metrics: PoliticalMetrics,
		governmentTime: number,
		politicalDecisions: DecisionResult[],
		provinceStates: Record<string, any>,
	): PoliticalEvent | null {
		// Filtrar eventos disponibles
		const availableEvents = this.events.filter(event =>
			this.canTriggerEvent(
				event,
				metrics,
				governmentTime,
				politicalDecisions,
				provinceStates,
			),
		);

		if (availableEvents.length === 0) {
			return null;
		}

		// Priorizar por urgencia durante crisis
		if (this.currentCrisisLevel >= 3) {
			const urgentEvents = availableEvents.filter(event => event.urgency >= 4);
			if (urgentEvents.length > 0) {
				return this.selectWeightedEvent(urgentEvents);
			}
		}

		// Priorizar eventos económicos si la economía está mal
		if (metrics.economia <= 30) {
			const economicEvents = availableEvents.filter(event =>
				event.category === EventCategory.ECONOMICO,
			);
			if (economicEvents.length > 0 && Math.random() < 0.7) {
				return this.selectWeightedEvent(economicEvents);
			}
		}

		// Priorizar eventos sociales si la popularidad está baja
		if (metrics.popularidad <= 25) {
			const socialEvents = availableEvents.filter(event =>
				event.category === EventCategory.SOCIAL,
			);
			if (socialEvents.length > 0 && Math.random() < 0.6) {
				return this.selectWeightedEvent(socialEvents);
			}
		}

		// Selección aleatoria con peso
		return this.selectWeightedEvent(availableEvents);
	}

	/**
	 * Selecciona un evento con peso basado en la urgencia
	 */
	private selectWeightedEvent(events: PoliticalEvent[]): PoliticalEvent {
		// Crear array con pesos basados en urgencia
		const weightedEvents: PoliticalEvent[] = [];

		events.forEach(event => {
			// Agregar el evento tantas veces como su urgencia
			for (let i = 0; i < event.urgency; i++) {
				weightedEvents.push(event);
			}
		});

		// Seleccionar aleatoriamente del array con peso
		return weightedEvents[Math.floor(Math.random() * weightedEvents.length)];
	}

	/**
	 * Verifica si un evento puede ser activado
	 */
	private canTriggerEvent(
		event: PoliticalEvent,
		metrics: PoliticalMetrics,
		governmentTime: number,
		politicalDecisions: DecisionResult[],
		provinceStates: Record<string, any>,
	): boolean {
		// Verificar cooldown
		if (this.isEventInCooldown(event.id)) {
			return false;
		}

		// Verificar trigger conditions
		if (
			!this.checkTriggerConditions(
				event.trigger,
				metrics,
				governmentTime,
				politicalDecisions,
				provinceStates,
			)
		) {
			return false;
		}

		// Verificar que no sea uno de los últimos 5 eventos (evitar repetición inmediata)
		if (this.eventHistory.length > 0) {
			const recentEvents = this.eventHistory.slice(-5);
			if (recentEvents.includes(event.id)) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Verifica las condiciones de trigger de un evento
	 */
	private checkTriggerConditions(
		trigger: EventTrigger,
		metrics: PoliticalMetrics,
		governmentTime: number,
		politicalDecisions: DecisionResult[],
		provinceStates: Record<string, any>,
	): boolean {
		// Verificar presidente requerido
		if (trigger.requiredPresidentId && trigger.requiredPresidentId !== this.presidentId) {
			return false;
		}

		// Verificar métricas requeridas
		if (trigger.requiredMetrics) {
			for (const [metricType, requirements] of Object.entries(
				trigger.requiredMetrics,
			)) {
				const metricValue = metrics[metricType as keyof PoliticalMetrics];

				if (requirements.min !== undefined && metricValue < requirements.min) {
					return false;
				}

				if (requirements.max !== undefined && metricValue > requirements.max) {
					return false;
				}
			}
		}

		// Verificar eventos bloqueantes
		if (trigger.blockingEvents) {
			const isBlocked = trigger.blockingEvents.some(eventId =>
				this.eventHistory.includes(eventId),
			);
			if (isBlocked) {
				return false;
			}
		}

		// Verificar eventos previos requeridos
		if (trigger.completedEvents) {
			const hasAllRequiredEvents = trigger.completedEvents.every(eventId =>
				this.eventHistory.includes(eventId),
			);
			if (!hasAllRequiredEvents) {
				return false;
			}
		}

		// Verificar decisiones específicas requeridas
		if (trigger.requiredChoices) {
			const hasMadeAllRequiredChoices = trigger.requiredChoices.every(
				requiredChoice =>
					politicalDecisions.some(
						madeDecision =>
							madeDecision.eventId === requiredChoice.eventId &&
							madeDecision.choiceId === requiredChoice.choiceId,
					),
			);
			if (!hasMadeAllRequiredChoices) {
				return false;
			}
		}

		// Verificar probabilidad
		if (trigger.probability && Math.random() > trigger.probability) {
			return false;
		}

		return true;
	}

	/**
	 * Verifica si un evento tiene cooldown activo
	 */
	private isEventInCooldown(eventId: string): boolean {
		const cooldownTime = this.eventCooldowns.get(eventId);
		return !!cooldownTime && cooldownTime > Date.now();
	}

	/**
	 * Activa un evento, actualizando el historial y cooldowns
	 */
	private triggerEvent(event: PoliticalEvent): void {
		this.lastEventTime = Date.now();
		this.eventHistory.push(event.id);

		if (event.trigger.cooldown) {
			this.eventCooldowns.set(
				event.id,
				this.lastEventTime + event.trigger.cooldown * 1000, // Cooldown en segundos
			);
		}
	}

	/**
	 * Limpia los cooldowns que ya han expirado
	 */
	private cleanupExpiredCooldowns(currentTime: number): void {
		for (const [eventId, expiryTime] of this.eventCooldowns.entries()) {
			if (currentTime > expiryTime) {
				this.eventCooldowns.delete(eventId);
			}
		}
	}

	/**
	 * Fuerza la activación de un evento por su ID
	 */
	public forceEvent(eventId: string): PoliticalEvent | null {
		const event = this.events.find(e => e.id === eventId);
		if (event) {
			this.triggerEvent(event);
			return event;
		}
		return null;
	}

	/**
	 * Fuerza un evento aleatorio de los que son válidos en el estado actual
	 */
	public forceRandomEvent(
		metrics: PoliticalMetrics,
		governmentTime: number,
		politicalDecisions: DecisionResult[],
		provinceStates: Record<string, any>,
	): PoliticalEvent | null {
		const availableEvents = this.events.filter(event =>
			this.canTriggerEvent(
				event,
				metrics,
				governmentTime,
				politicalDecisions,
				provinceStates,
			),
		);

		if (availableEvents.length === 0) {
			return null;
		}

		const randomIndex = Math.floor(Math.random() * availableEvents.length);
		const event = availableEvents[randomIndex];
		this.triggerEvent(event);
		return event;
	}

	/**
	 * Devuelve estadísticas sobre el estado del manager
	 */
	public getStats() {
		return {
			totalEvents: this.events.length,
			triggeredEventsCount: this.eventHistory.length,
			lastEventTimestamp: this.lastEventTime,
			activeCooldowns: this.eventCooldowns.size,
			eventHistory: [...this.eventHistory],
		};
	}

	/**
	 * Reinicia el estado del manager
	 */
	public reset(): void {
		this.eventCooldowns.clear();
		this.eventHistory = [];
	}

	/**
	 * Devuelve una recomendación para el próximo evento (usado para UI)
	 */
	public getNextRecommendedEvent(
		metrics: PoliticalMetrics,
		governmentTime: number,
		politicalDecisions: DecisionResult[],
		provinceStates: Record<string, any> = {},
	): PoliticalEvent | null {
		return this.selectEvent(
			metrics,
			governmentTime,
			politicalDecisions,
			provinceStates,
		);
	}
}
