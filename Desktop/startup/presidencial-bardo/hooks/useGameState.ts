import { CONSEQUENCE_EVENTS } from '@/data/events/consequenceEvents';
import { ALL_LAWS } from "@/data/leyes";
import { initialProvinceData, provinceNames } from "@/data/provinceData";
import { MissionManager } from "@/game/MissionManager";
import { PoliticalEventManager } from "@/game/PoliticalEventManager";
import { DNU, DNUManager } from '@/types/dnuSystem';
import type { GameState, Player } from "@/types/game";
import {
    FactionId,
    MetricState,
    MetricType,
    PoliticalMetrics,
    ProvinceId,
    type DecisionResult,
    type FactionModifier,
    type FactionState,
    type MetricEffect,
    type PoliticalEvent,
    type ProvinceModifier,
    type ProvinceState,
} from "@/types/political";
import { calculateCrisisLevel, calculateFactionPassiveEffects, calculateMetricThresholdEffects } from "@/utils/metricEffects";
import { enableMapSet, produce } from "immer";
import { useCallback, useEffect, useRef, useState } from "react";

// Habilitar MapSet para Immer
enableMapSet();

interface GameInitializationParams {
	player: Player;
	politicalModifiers?: Partial<PoliticalMetrics>;
	factionModifiers?: Partial<Record<FactionId, FactionModifier>>;
	provinceModifiers?: Partial<Record<ProvinceId, ProvinceModifier>>;
}

// ===== FUNCIONES AUXILIARES PARA SISTEMA POLÍTICO =====

const createInitialPoliticalMetrics = (
	modifiers: Partial<PoliticalMetrics> = {},
): PoliticalMetrics => {
	const baseMetrics: PoliticalMetrics = {
		popularidad: 50,
		economia: 45,
		seguridad: 55,
		relacionesInternacionales: 60,
		corrupcion: 30,
		controlMedios: 40,
		salud: 60,
		tecnologia: 45,
	};

	const applyModifier = (base: number, mod: number | undefined) =>
		Math.max(0, Math.min(100, base + (mod || 0)));

	return {
		popularidad: applyModifier(
			baseMetrics.popularidad,
			modifiers.popularidad,
		),
		economia: applyModifier(baseMetrics.economia, modifiers.economia),
		seguridad: applyModifier(baseMetrics.seguridad, modifiers.seguridad),
		relacionesInternacionales: applyModifier(
			baseMetrics.relacionesInternacionales,
			modifiers.relacionesInternacionales,
		),
		corrupcion: applyModifier(baseMetrics.corrupcion, modifiers.corrupcion),
		controlMedios: applyModifier(
			baseMetrics.controlMedios,
			modifiers.controlMedios,
		),
		salud: applyModifier(baseMetrics.salud, modifiers.salud),
		tecnologia: applyModifier(baseMetrics.tecnologia, modifiers.tecnologia),
	};
};

const createInitialMetricStates = (): Record<MetricType, MetricState> => {
	const metrics = createInitialPoliticalMetrics(); // Usar la base para los estados iniciales
	const states: Record<MetricType, MetricState> = {} as Record<
		MetricType,
		MetricState
	>;

	Object.values(MetricType).forEach(metricType => {
		const value = metrics[metricType];
		states[metricType] = {
			value,
			trend: "stable",
			lastChange: 0,
			level:
				value <= 25
					? "critical"
					: value <= 50
					  ? "low"
					  : value <= 75
					    ? "medium"
					    : "high",
			activeEffects: [],
		};
	});

	return states;
};

const createInitialPoliticalFlags = () => ({
	inCrisis: false,
	pendingDecision: false,
	pausedForPolitics: false,
	alienMode: false,
	provinceInRebellion: false,
	curfewActive: false,
});

// Helper para crear el estado inicial de las facciones aplicando modificadores
const createInitialFactionStates = (
	modifiers: Partial<Record<FactionId, FactionModifier>> = {},
): Record<FactionId, FactionState> => {
	const factions: FactionId[] = Object.values(FactionId);
	const initialStates: Partial<Record<FactionId, FactionState>> = {};

	const baseData: Record<
		FactionId,
		Omit<FactionState, "id" | "relationships" | "demands" | "uniqueEvents">
	> = {
		[FactionId.LA_CAMPORA]: {
			name: "La Cámpora",
			description: "La Cámpora es una facción que representa a los trabajadores de la construcción y la industria.",
			support: 40,
			power: 60,
			resources: 50,
		},
		[FactionId.EMPRESARIOS]: {
			name: "Empresarios",
			description: "Los Empresarios son una facción que representa a los empresarios y la industria.",
			support: -20,
			power: 85,
			resources: 90,
		},
		[FactionId.SINDICALISTAS]: {
			name: "Sindicalistas",
			description: "Los Sindicalistas son una facción que representa a los sindicatos y los trabajadores.",
			support: 10,
			power: 70,
			resources: 40,
		},
		[FactionId.MILITARES]: {
			name: "Militares",
			description: "Los Militares son una facción que representa a los militares.",
			support: 0,
			power: 50,
			resources: 70,
		},
		[FactionId.BARRAS_BRAVAS]: {
			name: "Barras Bravas",
			description: "Las Barras Bravas son una facción que representa a las barras bravas.",
			support: 10,
			power: 40,
			resources: 20,
		},
		[FactionId.ALIENS]: {
			name: "Aliens",
			description: "Los Aliens son una facción que representa a los aliens.",
			support: 0,
			power: 0,
			resources: 100,
		},
		[FactionId.OPOSICION]: {
			name: "Oposición",
			description: "La Oposición es una facción que representa a la oposición.",
			support: -50,
			power: 65,
			resources: 50,
		},
		[FactionId.TACHEROS]: {
			name: "Tacheros",
			description: "Los Tacheros son una facción que representa a los tacheros.",
			support: 5,
			power: 30,
			resources: 30,
		},
	};

	for (const factionId of factions) {
		if (baseData[factionId]) {
			const modifier = modifiers[factionId] || {};
			const relationships: Record<FactionId, number> = {} as Record<
				FactionId,
				number
			>;
			for (const otherFactionId of factions) {
				relationships[otherFactionId] = 0; // Inicializar todas las relaciones a 0
			}

			initialStates[factionId] = {
				id: factionId,
				name: baseData[factionId].name,
				description: baseData[factionId].description,
				support: baseData[factionId].support + (modifier.support || 0),
				power: baseData[factionId].power + (modifier.power || 0),
				resources: baseData[factionId].resources,
				relationships,
				demands: [],
				uniqueEvents: [],
			};
		}
	}

	return initialStates as Record<FactionId, FactionState>;
};

// Helper para crear el estado inicial de las provincias aplicando modificadores
const createInitialProvinceStates = (
	modifiers: Partial<Record<ProvinceId, ProvinceModifier>> = {},
): Record<ProvinceId, ProvinceState> => {
	const provinces: ProvinceId[] = Object.values(ProvinceId);
	const initialStates: Partial<Record<ProvinceId, ProvinceState>> = {};

	for (const provinceId of provinces) {
		const provinceData = initialProvinceData[provinceId];
		if (provinceData) {
			const modifier = modifiers[provinceId] || {};
			initialStates[provinceId] = {
				id: provinceId,
				name: provinceNames[provinceId],
				discontent: provinceData.discontent + (modifier.discontent || 0),
				loyalty: provinceData.loyalty + (modifier.loyalty || 0),
				economicLevel: provinceData.economicLevel,
				population: provinceData.population,
				ideology: provinceData.ideology,
				factionInfluence: provinceData.factionInfluence,
				resources: provinceData.resources,
				activeEvents: [],
				activeEffects: [],
			};
		}
	}

	return initialStates as Record<ProvinceId, ProvinceState>;
};

// Definir un jugador por defecto para el estado inicial
const defaultPlayer: Player = {
	id: "default-president",
	position: { x: 0, y: 0 },
	collisionRadius: 20,
	width: 40,
	height: 40,
	speed: 200,
	health: 100,
	maxHealth: 100,
	angle: 0,
	sprites: {},
	lastDamageTime: 0,
	lastMovementDirection: { x: 1, y: 0 },
	crystals: 0,
	upgrades: {
		spellDamage: 1,
		maxHealth: 0,
		spellLevel: 1,
		healthLevel: 1,
		projectileCount: 0,
		projectileSize: 0,
		castRate: 0,
		spread: 0,
	},
	direction: "S",
	isMoving: false,
	animationFrame: "S",
	lastAnimationTime: 0,
	// Sistema RPG
	level: 1,
	xp: 0,
	xpToNextLevel: 1000,
	skillPoints: 0,
	skills: {},
};

// Estado inicial del juego
const INITIAL_GAME_STATE: GameState = {
	player: defaultPlayer,
	projectiles: [],
	creatures: [],
	obstacles: [],
	healthPacks: [],
	score: 0,
	currentWave: 0,
	creaturesToSpawnThisWave: 0,
	creaturesRemainingInWave: 0,
	creaturesSpawnedThisWave: 0,
	gameOver: false,
	gameWon: false,
	isPaused: false,
	keys: {},
	mousePosition: { x: 0, y: 0 },
	waveTransitioning: false,
	showMarketplace: false,
	crystalParticles: [],
	mobConfig: {
		normal: true,
		caster: true,
		tank: true,
		speed: true,
		explosive: true,
		boss: true,
	},
	comboKills: 0,
	lastComboKillTime: 0,
	politicalMetrics: createInitialPoliticalMetrics(),
	metricStates: createInitialMetricStates(),
	currentPoliticalEvent: null,
	pendingPoliticalEvents: [],
	politicalDecisions: [],
	eventHistory: [],
	provinceStates: createInitialProvinceStates(),
	factionStates: createInitialFactionStates(),
	enactedLaws: [],
	lastPoliticalEventTime: 0,
	governmentTime: 0,
	crisisLevel: 0,
	politicalFlags: createInitialPoliticalFlags(),
	// Sistema de Misiones
	activeMissions: [],
	completedMissions: [],
	unlockedMissions: [],
	gameTime: 0,
	notifications: [],
};

export const useGameState = () => {
	const gameStateRef = useRef<GameState | null>(null);
	const eventManager = useRef<PoliticalEventManager | null>(null);
	const missionManager = useRef<MissionManager | null>(null);
	const [activeDNUs, setActiveDNUs] = useState<DNU[]>([]);
	const [dnuManager] = useState(() => new DNUManager());
	const [notifications, setNotifications] = useState<Array<{
		id: string;
		message: string;
		type: 'success' | 'warning' | 'error' | 'info';
		timestamp: number;
	}>>([]);

	// Variables de estado político
	const [currentPoliticalEvent, setCurrentPoliticalEvent] = useState<PoliticalEvent | null>(null);
	const [politicalDecisions, setPoliticalDecisions] = useState<DecisionResult[]>([]);

	// ===== PERSISTENCIA EN LOCALSTORAGE =====
	const LOCAL_STORAGE_KEY = 'presidencial_bardo_political_state';

	// Cargar estado político desde localStorage al inicializar
	useEffect(() => {
		const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (savedState) {
			const parsedState = JSON.parse(savedState);
			gameStateRef.current = produce(gameStateRef.current || INITIAL_GAME_STATE, (draft: GameState) => {
				draft.politicalMetrics = parsedState.politicalMetrics || createInitialPoliticalMetrics();
				draft.metricStates = parsedState.metricStates || createInitialMetricStates();
				draft.provinceStates = parsedState.provinceStates || createInitialProvinceStates();
				draft.factionStates = parsedState.factionStates || createInitialFactionStates();
				draft.politicalDecisions = parsedState.politicalDecisions || [];
				draft.eventHistory = parsedState.eventHistory || [];
				draft.enactedLaws = parsedState.enactedLaws || [];
				draft.crisisLevel = parsedState.crisisLevel || 0;
				draft.governmentTime = parsedState.governmentTime || 0;
				draft.politicalFlags = parsedState.politicalFlags || createInitialPoliticalFlags();
			});
		}
	}, []);

	// Guardar estado político en localStorage al actualizar
	useEffect(() => {
		if (gameStateRef.current) {
			const stateToSave = {
				politicalMetrics: gameStateRef.current.politicalMetrics,
				metricStates: gameStateRef.current.metricStates,
				provinceStates: gameStateRef.current.provinceStates,
				factionStates: gameStateRef.current.factionStates,
				politicalDecisions: gameStateRef.current.politicalDecisions,
				eventHistory: gameStateRef.current.eventHistory,
				enactedLaws: gameStateRef.current.enactedLaws,
				crisisLevel: gameStateRef.current.crisisLevel,
				governmentTime: gameStateRef.current.governmentTime,
				politicalFlags: gameStateRef.current.politicalFlags,
			};
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
		}
	}, [gameStateRef.current?.politicalMetrics, gameStateRef.current?.metricStates /* agregar dependencias relevantes */]);

	// Añadir notificación
	const addNotification = useCallback((message: string, type: 'success' | 'warning' | 'error' | 'info') => {
		const notification = {
			id: Date.now().toString(),
			message,
			type,
			timestamp: Date.now()
		};
		setNotifications(prev => [...prev, notification]);

		// Auto-remover después de 5 segundos
		setTimeout(() => {
			setNotifications(prev => prev.filter(n => n.id !== notification.id));
		}, 5000);
	}, []);

	// Funciones auxiliares para actualizar métricas y facciones
	const updateMetric = useCallback((metric: MetricType, change: number) => {
		if (!gameStateRef.current) return;

		gameStateRef.current = produce(gameStateRef.current, draft => {
			draft.politicalMetrics[metric] += change;
			draft.politicalMetrics[metric] = Math.max(0, Math.min(100, draft.politicalMetrics[metric]));
		});
	}, []);

	const updateFactionSupport = useCallback((factionId: FactionId, change: number) => {
		if (!gameStateRef.current) return;

		gameStateRef.current = produce(gameStateRef.current, draft => {
			if (draft.factionStates[factionId]) {
				draft.factionStates[factionId].support += change;
				draft.factionStates[factionId].support = Math.max(-100, Math.min(100, draft.factionStates[factionId].support));
			}
		});
	}, []);

	const initializeGameState = useCallback((params: GameInitializationParams) => {
		const newGameState = produce(INITIAL_GAME_STATE, (draft: GameState) => {
			// Configurar jugador con propiedades RPG
			draft.player = {
				...params.player,
				level: 1,
				xp: 0,
				xpToNextLevel: 1000,
				skillPoints: 0,
				skills: {},
			};

			// Fusionar el jugador de forma segura para Immer
			Object.assign(draft.player, params.player);

			if (params.factionModifiers) {
				draft.factionStates = createInitialFactionStates(params.factionModifiers);
			}
			if (params.provinceModifiers) {
				draft.provinceStates = createInitialProvinceStates(params.provinceModifiers);
			}

			// Inicializar managers
			if (!eventManager.current) {
				eventManager.current = new PoliticalEventManager();
			}
			if (!missionManager.current) {
				missionManager.current = new MissionManager();
			}

			// Configurar aliases para compatibilidad con MissionManager
			draft.metrics = draft.politicalMetrics;
			draft.provinces = Object.values(draft.provinceStates).map(province => ({
				...province,
				id: province.id as ProvinceId
			}));
			draft.factions = Object.values(draft.factionStates).map(faction => ({
				...faction,
				id: faction.id as FactionId
			}));
		});

		gameStateRef.current = newGameState;
	}, []);

	const resetPoliticalEventManager = () => {
		gameStateRef.current = null;
		if (eventManager.current) {
			eventManager.current.reset();
		}
	};

	const updatePoliticalState = useCallback(() => {
		if (!gameStateRef.current || !eventManager.current) return;

		gameStateRef.current = produce(gameStateRef.current, (draft: GameState) => {
			// Aplicar efectos pasivos automáticos
			const factionEffects = calculateFactionPassiveEffects(draft.factionStates as Record<string, any>);
			factionEffects.forEach((effect: MetricEffect) => {
				if (draft.politicalMetrics[effect.type] !== undefined) {
					draft.politicalMetrics[effect.type] += effect.change;
					draft.politicalMetrics[effect.type] = Math.max(0, Math.min(100, draft.politicalMetrics[effect.type]));
				}
			});

			// Efectos por umbrales de métricas
			const thresholdEffects = calculateMetricThresholdEffects(draft.politicalMetrics);
			thresholdEffects.forEach((effect: MetricEffect) => {
				if (draft.politicalMetrics[effect.type] !== undefined) {
					draft.politicalMetrics[effect.type] += effect.change;
					draft.politicalMetrics[effect.type] = Math.max(0, Math.min(100, draft.politicalMetrics[effect.type]));
				}
			});

			// Actualizar estados de métricas y nivel de crisis
			draft.metricStates = createInitialMetricStates();
			draft.crisisLevel = calculateCrisisLevel(draft.politicalMetrics);

			// Actualizar tiempo de misiones
			draft.gameTime = (draft.gameTime || 0) + 1;
		});

		const triggeredEvent = eventManager.current.update(
			gameStateRef.current.politicalMetrics,
			gameStateRef.current.governmentTime,
			gameStateRef.current.politicalDecisions,
			gameStateRef.current.provinceStates,
		);

		if (triggeredEvent) {
			gameStateRef.current = produce(gameStateRef.current, draft => {
				draft.currentPoliticalEvent = triggeredEvent;
			});
			setCurrentPoliticalEvent(triggeredEvent);
		}
	}, []);

	const forcePoliticalEvent = (eventId: string) => {
		if (!gameStateRef.current || !eventManager.current) return null;

		const event = eventManager.current.forceEvent(eventId);
		if (event) {
			gameStateRef.current = produce(gameStateRef.current, draft => {
				draft.currentPoliticalEvent = event;
			});
			setCurrentPoliticalEvent(event);
			return event;
		}
		return null;
	};

	const forceRandomPoliticalEvent = () => {
		if (!gameStateRef.current || !eventManager.current) return null;

		const event = eventManager.current.forceRandomEvent(
			gameStateRef.current.politicalMetrics,
			gameStateRef.current.governmentTime,
			gameStateRef.current.politicalDecisions,
			gameStateRef.current.provinceStates,
		);
		if (event) {
			gameStateRef.current = produce(gameStateRef.current, draft => {
				draft.currentPoliticalEvent = event;
			});
			setCurrentPoliticalEvent(event);
			return event;
		}
		return null;
	};

	const enactLaw = (lawId: string) => {
		if (!gameStateRef.current) return;

		const law = ALL_LAWS.find(l => l.id === lawId);
		if (!law) return;

		// TODO: Check requirements and costs

		gameStateRef.current = produce(gameStateRef.current, draft => {
			draft.enactedLaws.push(lawId);
			// Apply effects
			if (law.effects) {
				law.effects.forEach(effect => {
					draft.politicalMetrics[effect.type] += effect.change;
					draft.politicalMetrics[effect.type] = Math.max(
						0,
						Math.min(100, draft.politicalMetrics[effect.type]),
					);
				});
			}
			// Apply costs
			if (law.cost) {
				for (const [metric, value] of Object.entries(law.cost)) {
					if (value) {
						draft.politicalMetrics[metric as MetricType] -= value;
						draft.politicalMetrics[metric as MetricType] = Math.max(
							0,
							Math.min(100, draft.politicalMetrics[metric as MetricType]),
						);
					}
				}
			}
		});
	};

	const getPoliticalEventStats = () => {
		if (!gameStateRef.current || !eventManager.current) {
			return {
				crisisLevel: 0,
				governmentTime: 0,
				triggeredEventsCount: 0,
			};
		}
		return eventManager.current.getStats();
	};

	const makeDecision = (eventId: string, choiceId: string) => {
		if (!gameStateRef.current || !gameStateRef.current.currentPoliticalEvent)
			return;

		const event = gameStateRef.current.currentPoliticalEvent;
		if (event.id !== eventId) return;

		const choice = event.choices.find(c => c.id === choiceId);
		if (!choice) return;

		gameStateRef.current = produce(gameStateRef.current, draft => {
			if (choice.effects) {
				choice.effects.forEach(effect => {
					draft.politicalMetrics[effect.type] += effect.change;
					draft.politicalMetrics[effect.type] = Math.max(0, Math.min(100, draft.politicalMetrics[effect.type]));
				});
			}

			// Aplicar efectos en facciones
			if (choice.factionEffects) {
				choice.factionEffects.forEach(effect => {
					if (draft.factionStates[effect.factionId]) {
						draft.factionStates[effect.factionId].support += effect.supportChange || 0;
						draft.factionStates[effect.factionId].support = Math.max(-100, Math.min(100, draft.factionStates[effect.factionId].support));
					}
				});
			}

			// Aplicar efectos regionales
			if (choice.regionalEffects) {
				choice.regionalEffects.forEach(effect => {
					if (draft.provinceStates[effect.provinceId]) {
						Object.assign(draft.provinceStates[effect.provinceId], effect.effect);
					}
				});
			}

			// Registrar la decisión
			const decisionResult: DecisionResult = {
				eventId: event.id,
				eventTitle: event.title,
				choiceId: choice.id,
				choiceTitle: choice.text,
				appliedEffects: choice.effects || [],
				appliedFactionEffects: choice.factionEffects || [],
				appliedRegionalEffects: choice.regionalEffects || [],
				triggeredEvents: choice.triggeredEvents || [],
				timestamp: Date.now(),
				description: choice.description,
			};

			draft.politicalDecisions.push(decisionResult);
			draft.currentPoliticalEvent = null;
			draft.lastPoliticalEventTime = Date.now();
		});

		// Actualizar estado local
		setPoliticalDecisions(prev => [...prev, {
			eventId: event.id,
			eventTitle: event.title,
			choiceId: choice.id,
			choiceTitle: choice.text,
			appliedEffects: choice.effects || [],
			appliedFactionEffects: choice.factionEffects || [],
			appliedRegionalEffects: choice.regionalEffects || [],
			triggeredEvents: choice.triggeredEvents || [],
			timestamp: Date.now(),
			description: choice.description,
		}]);
		setCurrentPoliticalEvent(null);

		// Añadir notificación
		addNotification(`Decisión tomada: ${choice.text}`, 'info');
	};

	const updatePoliticalMetrics = (effects: MetricEffect[]) => {
		if (!gameStateRef.current) return;

		gameStateRef.current = produce(gameStateRef.current, draft => {
			effects.forEach(effect => {
				draft.politicalMetrics[effect.type] += effect.change;
				// Clamp values between 0 and 100
				draft.politicalMetrics[effect.type] = Math.max(0, Math.min(100, draft.politicalMetrics[effect.type]));
			});

			draft.metricStates = createInitialMetricStates();
			draft.crisisLevel = calculateCrisisLevel(draft.politicalMetrics);
		});
	};

	// Aplicar efectos de DNUs activos
	const applyDNUEffects = useCallback(() => {
		if (activeDNUs.length === 0 || !gameStateRef.current) return;

		const { metricModifiers, factionEffects } = dnuManager.applyDNUEffects();

		gameStateRef.current = produce(gameStateRef.current, draft => {
			// Aplicar modificadores de métricas
			Object.entries(metricModifiers).forEach(([metric, modifier]) => {
				if (modifier && draft.politicalMetrics[metric as MetricType] !== undefined) {
					draft.politicalMetrics[metric as MetricType] += modifier;
					draft.politicalMetrics[metric as MetricType] = Math.max(0, Math.min(100, draft.politicalMetrics[metric as MetricType]));
				}
			});

			// Aplicar efectos en facciones
			factionEffects.forEach(effect => {
				if (draft.factionStates[effect.factionId]) {
					draft.factionStates[effect.factionId].support += effect.supportChange;
					draft.factionStates[effect.factionId].support = Math.max(-100, Math.min(100, draft.factionStates[effect.factionId].support));
				}
			});
		});
	}, [activeDNUs, dnuManager]);

	// Emitir DNU
	const emitDNU = useCallback((dnuId: string) => {
		if (!gameStateRef.current) return null;

		const dnu = dnuManager.emitDNU(dnuId, gameStateRef.current.politicalMetrics);
		if (dnu) {
			setActiveDNUs(prev => [...prev, dnu]);

			// Aplicar efectos inmediatos
			gameStateRef.current = produce(gameStateRef.current, draft => {
				Object.entries(dnu.effects.nationalMetrics).forEach(([metric, value]) => {
					if (value && draft.politicalMetrics[metric as MetricType] !== undefined) {
						draft.politicalMetrics[metric as MetricType] += value;
						draft.politicalMetrics[metric as MetricType] = Math.max(0, Math.min(100, draft.politicalMetrics[metric as MetricType]));
					}
				});

				dnu.effects.factionEffects.forEach(effect => {
					if (draft.factionStates[effect.factionId]) {
						draft.factionStates[effect.factionId].support += effect.supportChange;
						draft.factionStates[effect.factionId].support = Math.max(-100, Math.min(100, draft.factionStates[effect.factionId].support));
					}
				});
			});

			// Añadir notificación
			addNotification(`DNU emitido: ${dnu.title}`, 'info');

			return dnu;
		}
		return null;
	}, [dnuManager, addNotification]);

	// Revocar DNU
	const revokeDNU = useCallback((dnuId: string) => {
		const dnu = activeDNUs.find(d => d.id === dnuId);
		if (dnu) {
			setActiveDNUs(prev => prev.filter(d => d.id !== dnuId));

			// Aplicar efectos de revocación
			Object.entries(dnu.revocationEffects.nationalMetrics).forEach(([metric, value]) => {
				if (value) {
					updateMetric(metric as MetricType, value);
				}
			});

			dnu.revocationEffects.factionEffects.forEach(effect => {
				updateFactionSupport(effect.factionId, effect.supportChange);
			});

			addNotification(`DNU revocado: ${dnu.title}`, 'warning');
		}
	}, [activeDNUs, updateMetric, updateFactionSupport, addNotification]);

	// Responder a DNU
	const respondToDNU = useCallback((dnuId: string, responseId: string) => {
		const dnu = activeDNUs.find(d => d.id === dnuId);
		if (dnu) {
			const response = dnu.responseOptions.find(r => r.id === responseId);
			if (response) {
				// Aplicar efectos de la respuesta
				Object.entries(response.effects.nationalMetrics).forEach(([metric, value]) => {
					if (value) {
						updateMetric(metric as MetricType, value);
					}
				});

				response.effects.factionEffects.forEach(effect => {
					updateFactionSupport(effect.factionId, effect.supportChange);
				});

				addNotification(`Respuesta aplicada: ${response.name}`, 'success');
			}
		}
	}, [activeDNUs, updateMetric, updateFactionSupport, addNotification]);

	// Verificar DNUs expirados
	const checkExpiredDNUs = useCallback(() => {
		const expiredIds = dnuManager.checkExpiredDNUs();
		if (expiredIds.length > 0) {
			setActiveDNUs(prev => prev.filter(d => !expiredIds.includes(d.id)));
			expiredIds.forEach(id => {
				addNotification(`DNU expirado: ${id}`, 'warning');
			});
		}
	}, [dnuManager, addNotification]);

	// Verificar eventos de consecuencia basados en decisiones previas
	const checkConsequenceEvents = useCallback(() => {
		if (!currentPoliticalEvent) return;

		const consequenceEvent = CONSEQUENCE_EVENTS.find(event => {
			// Verificar si las condiciones del trigger se cumplen
			if (event.trigger.requiredChoices) {
				return event.trigger.requiredChoices.some(choice =>
					politicalDecisions.some(decision =>
						decision.eventId === choice.eventId && decision.choiceId === choice.choiceId
					)
				);
			}
			return false;
		});

		if (consequenceEvent && Math.random() < (consequenceEvent.trigger.probability || 0.5)) {
			setCurrentPoliticalEvent(consequenceEvent);
			addNotification(`Evento de consecuencia: ${consequenceEvent.title}`, 'warning');
		}
	}, [currentPoliticalEvent, politicalDecisions, addNotification]);

	// ===== SISTEMA DE MISIONES =====
	const updateMissions = useCallback(() => {
		if (!gameStateRef.current || !missionManager.current) return;

		// Actualizar tiempo de juego
		gameStateRef.current = produce(gameStateRef.current, (draft: GameState) => {
			draft.gameTime = (draft.gameTime || 0) + 1;
		});

		// Actualizar misiones disponibles
		missionManager.current.updateMissions(gameStateRef.current);
	}, []);

	const playMission = useCallback((missionId: string) => {
		if (!gameStateRef.current || !missionManager.current) return;

		const mission = gameStateRef.current.activeMissions?.find(m => m.id === missionId);
		if (mission) {
			missionManager.current.playMission(mission, gameStateRef.current);
		}
	}, []);

	const processMissionChoice = useCallback((missionId: string, choiceId: string) => {
		if (!gameStateRef.current || !missionManager.current) return;

		missionManager.current.processMissionChoice({ missionId, choiceId }, gameStateRef.current);
	}, []);

	// ===== SISTEMA RPG =====
	const gainXP = useCallback((amount: number) => {
		if (!gameStateRef.current?.player) return;

		gameStateRef.current = produce(gameStateRef.current, (draft: GameState) => {
			if (!draft.player) return;

			draft.player.xp += amount;

			// Verificar level ups
			while (draft.player.xp >= draft.player.xpToNextLevel) {
				draft.player.level++;
				draft.player.xp -= draft.player.xpToNextLevel;
				draft.player.xpToNextLevel = Math.floor(1000 * Math.pow(draft.player.level, 1.5));
				draft.player.skillPoints += 2;

				// Bonos base por level
				draft.player.maxHealth += 10;
				draft.player.health = draft.player.maxHealth; // Curar al subir nivel

				// Añadir notificación
				if (!draft.notifications) draft.notifications = [];
				draft.notifications.push({
					id: `levelup-${Date.now()}`,
					type: 'success',
					message: `¡Subiste a nivel ${draft.player.level}!`,
					timestamp: Date.now()
				});
			}
		});
	}, []);

	const unlockSkill = useCallback((skillId: string) => {
		if (!gameStateRef.current?.player) return;

		gameStateRef.current = produce(gameStateRef.current, (draft: GameState) => {
			if (!draft.player) return;

			// Por ahora implementación simple - se puede extender con verificación de requirements
			if (draft.player.skillPoints > 0) {
				draft.player.skills[skillId] = (draft.player.skills[skillId] || 0) + 1;
				draft.player.skillPoints -= 1;

				// Añadir notificación
				if (!draft.notifications) draft.notifications = [];
				draft.notifications.push({
					id: `skill-${Date.now()}`,
					type: 'success',
					message: `¡Desbloqueaste nueva habilidad!`,
					timestamp: Date.now()
				});
			}
		});
	}, []);

	// ===== ACTUALIZACIÓN PRINCIPAL =====
	useEffect(() => {
		const interval = setInterval(() => {
			// ... existing logic ...

			// Aplicar efectos de DNUs
			applyDNUEffects();

			// Verificar DNUs expirados
			checkExpiredDNUs();

			// Verificar eventos de consecuencia
			checkConsequenceEvents();

		}, 1000);

		return () => clearInterval(interval);
	}, [applyDNUEffects, checkExpiredDNUs, checkConsequenceEvents]);

	return {
		gameStateRef,
		initializeGameState,
		resetPoliticalEventManager,
		updatePoliticalState,
		forcePoliticalEvent,
		forceRandomPoliticalEvent,
		getPoliticalEventStats,
		makeDecision,
		updatePoliticalMetrics,
		enactLaw,
		activeDNUs,
		emitDNU,
		revokeDNU,
		respondToDNU,
		notifications,
		addNotification,
		// Sistema RPG
		gainXP,
		unlockSkill,
		// Sistema de Misiones
		updateMissions,
		playMission,
		processMissionChoice,
	};
};
