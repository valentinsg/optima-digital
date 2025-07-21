import {
    DecisionResult,
    FactionId,
    FactionState,
    MetricState,
    MetricType,
    PoliticalEvent,
    PoliticalMetrics,
    ProvinceId,
    ProvinceState
} from './political';


export interface Vector2 {
	x: number;
	y: number;
}

export interface PlayerUpgrades {
	spellDamage: number;
	maxHealth: number;
	spellLevel: number;
	healthLevel: number;
	projectileCount: number;
	projectileSize: number;
	castRate: number;
	spread: number;
}

export interface Player {
	id: string;
	position: Vector2;
	collisionRadius: number;
	width: number;
	height: number;
	speed: number;
	health: number;
	maxHealth: number;
	angle: number;
	sprites: { [key: string]: HTMLImageElement | null };
	lastDamageTime: number;
	lastMovementDirection: Vector2;
	crystals: number;
	upgrades: PlayerUpgrades;
	direction: "N" | "S" | "E" | "O";
	isMoving: boolean;
	animationFrame: "L" | "R" | "S";
	lastAnimationTime: number;
	// Mobile joystick movement
	dx?: number;
	dy?: number;
	// RPG System
	level: number;
	xp: number;
	xpToNextLevel: number;
	skillPoints: number;
	skills: Record<string, number>;
}

export interface Projectile {
	position: Vector2;
	velocity: Vector2;
	radius: number;
	speed: number;
	isMagicBolt?: boolean;
	isBossProjectile?: boolean;
	initialPosition?: Vector2;
}

export interface Creature {
	id: string;
	position: Vector2;
	width: number;
	height: number;
	speed: number;
	health: number;
	maxHealth: number;
	type: "normal" | "caster" | "tank" | "speed" | "explosive" | "boss";
	lastSpellTime?: number;
	sprite?: HTMLImageElement | null;
	direction: "N" | "S" | "E" | "O";
	isMoving: boolean;
	animationFrame: "L" | "R" | "S";
	lastAnimationTime: number;
	lastPosition?: Vector2;
	currentPath?: Vector2[];
	currentPathIndex?: number;
	lastPathUpdate?: number;
	targetPosition?: Vector2;
	xpValue: number; // XP otorgado al matar esta criatura
}

export interface Obstacle {
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface CrystalParticle {
	id: string;
	x: number;
	y: number;
	vx: number;
	vy: number;
	alpha: number;
	scale: number;
	crystals: number;
}

export interface HealthPack {
	id: string;
	position: Vector2;
	width: number;
	height: number;
	healAmount: number;
	sprite?: HTMLImageElement | null;
}

export interface GameState {
	player: Player;
	projectiles: Projectile[];
	creatures: Creature[];
	obstacles: Obstacle[];
	healthPacks: HealthPack[];
	score: number;
	currentWave: number;
	creaturesToSpawnThisWave: number;
	creaturesRemainingInWave: number;
	creaturesSpawnedThisWave: number;
	gameOver: boolean;
	gameWon: boolean;
	isPaused: boolean;
	keys: { [key: string]: boolean };
	mousePosition: Vector2;
	waveTransitioning: boolean;
	showMarketplace: boolean;
	crystalParticles: CrystalParticle[];
	mobConfig: MobConfig;
	// Combo System
	comboKills: number;
	lastComboKillTime: number;

	// ===== SISTEMA POLÍTICO =====
	/** Métricas políticas actuales */
	politicalMetrics: PoliticalMetrics;

	/** Estados detallados de métricas con tendencias */
	metricStates: Record<MetricType, MetricState>;

	/** Evento político actual (si hay uno activo) */
	currentPoliticalEvent: PoliticalEvent | null;

	/** Cola de eventos políticos pendientes */
	pendingPoliticalEvents: string[];

	/** Historial de decisiones políticas */
	politicalDecisions: DecisionResult[];

	/** Historial de IDs de eventos que ya ocurrieron */
	eventHistory: string[];

	/** Estados de las provincias argentinas */
	provinceStates: Record<string, ProvinceState>;

	/** Estados de las facciones políticas */
	factionStates: Record<string, FactionState>;

	/** Tiempo desde el último evento político */
	lastPoliticalEventTime: number;

	/** Tiempo total de gobierno (en segundos) */
	governmentTime: number;

	/** Nivel de crisis general (0-5) */
	crisisLevel: number;

	/** Leyes promulgadas */
	enactedLaws: string[];

	/** Flags de estado político */
	politicalFlags: {
		/** Si se está en medio de una crisis */
		inCrisis: boolean;
		/** Si hay una decisión pendiente */
		pendingDecision: boolean;
		/** Si el juego está pausado por evento político */
		pausedForPolitics: boolean;
		/** Si se ha activado el modo alien */
		alienMode: boolean;
		/** Si hay una provincia en rebelión */
		provinceInRebellion: boolean;
		/** Si el toque de queda está activo */
		curfewActive: boolean;
	};

	// ===== SISTEMA DE MISIONES =====
	/** Misiones actualmente disponibles */
	activeMissions?: any[]; // Usar any[] temporalmente para evitar dependencias circulares

	/** IDs de misiones completadas */
	completedMissions?: string[];

	/** IDs de misiones desbloqueadas */
	unlockedMissions?: string[];

	/** Tiempo de juego en segundos */
	gameTime?: number;

	/** Dificultad de misión actual */
	missionDifficulty?: number;

	/** Tipo de misión activa */
	activeMissionType?: 'combate' | 'negociacion' | 'diplomatica' | 'espionaje';

	/** Contexto de negociación activa */
	negotiationContext?: {
		faction?: FactionId;
		province: ProvinceId;
		objectives: string[];
	};

	/** Contexto diplomático activo */
	diplomaticContext?: {
		faction?: FactionId;
		province: ProvinceId;
		choices: any[];
	};

	/** Sistema de notificaciones */
	notifications?: Array<{
		id: string;
		type: 'success' | 'warning' | 'error' | 'info';
		message: string;
		timestamp: number;
	}>;

	// ===== COMPATIBILIDAD CON POLÍTICO =====
	/** Alias para acceso desde MissionManager */
	metrics?: Record<MetricType, number>;
	provinces?: Array<ProvinceState & { id: ProvinceId }>;
	factions?: Array<FactionState & { id: FactionId }>;
}

export interface LeaderboardEntry {
	id: string;
	player_name: string;
	score: number;
	waves_survived: number;
	created_at: string;
}

export interface ScoreSubmission {
	player_name: string;
	score: number;
	waves_survived: number;
}

export interface GameDataForScoreSubmission {
	wavesSurvived: number;
	crystalsEarned: number;
	gameStartTime: number;
	gameDuration: number;
	spellLevel: number;
	healthLevel: number;
}

// Configuración para habilitar/deshabilitar tipos de mobs
export interface MobConfig {
	normal: boolean;
	caster: boolean;
	tank: boolean;
	speed: boolean;
	explosive: boolean;
	boss: boolean;
}
