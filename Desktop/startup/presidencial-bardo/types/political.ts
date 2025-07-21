  /**
   * PRESIDENCIAL BARDO - Sistema de Tipos Políticos
   * Simulador Político Distópico Argentino
   *
   * Tipos y interfaces para el sistema de métricas políticas,
   * eventos, provincias y mecánicas de gobierno.
   */

  // ===== MÉTRICAS POLÍTICAS =====

  /**
   * Métricas principales del sistema político
   * Cada métrica va de 0 a 100
   */
  export interface PoliticalMetrics {
    /** Aprobación ciudadana (0-100) */
    popularidad: number;

    /** Estado financiero del país (0-100) */
    economia: number;

    /** Control del orden público (0-100) */
    seguridad: number;

    /** Diplomacia global (0-100) */
    relacionesInternacionales: number;

    /** Nivel de transparencia - inverso (0-100) */
    corrupcion: number;

    /** Influencia en la narrativa (0-100) */
    controlMedios: number;

    /** Estado del sistema de salud (0-100) */
    salud: number;

    /** Desarrollo tecnológico del país (0-100) */
    tecnologia: number;
  }

  /**
   * Tipos de métricas disponibles
   */
  export enum MetricType {
    POPULARIDAD = 'popularidad',
    ECONOMIA = 'economia',
    SEGURIDAD = 'seguridad',
    RELACIONES_INTERNACIONALES = 'relacionesInternacionales',
    CORRUPCION = 'corrupcion',
    CONTROL_MEDIOS = 'controlMedios',
    SALUD = 'salud',
    TECNOLOGIA = 'tecnologia'
  }

  /**
   * Efectos en las métricas políticas
   */
  export interface MetricEffect {
    /** Tipo de métrica afectada */
    type: MetricType;

    /** Cambio en el valor (-100 a +100) */
    change: number;

    /** Descripción del efecto */
    description: string;

    /** Si el efecto es inmediato o gradual */
    isImmediate: boolean;

    /** Duración del efecto en turnos (si no es inmediato) */
    duration?: number;
  }

  /**
   * Niveles críticos para métricas
   */
  export type MetricThreshold = {
    /** Nivel crítico bajo (0-25) */
    critical: number;

    /** Nivel bajo (26-50) */
    low: number;

    /** Nivel medio (51-75) */
    medium: number;

    /** Nivel alto (76-100) */
    high: number;
  };

  /**
   * Estado de una métrica con información adicional
   */
  export interface MetricState {
    /** Valor actual de la métrica */
    value: number;

    /** Tendencia: subiendo, bajando o estable */
    trend: 'rising' | 'falling' | 'stable';

    /** Cambio en la última actualización */
    lastChange: number;

    /** Nivel actual según thresholds */
    level: 'critical' | 'low' | 'medium' | 'high';

    /** Efectos activos que afectan esta métrica */
    activeEffects: MetricEffect[];
  }

  /**
   * Estado general del sistema político en el juego.
   * Incluye métricas nacionales y el estado de todas las provincias.
   */
  export interface PoliticalState {
    metrics: PoliticalMetrics;
    provinces: Record<ProvinceId, ProvinceState>;
  }

  // ===== EVENTOS POLÍTICOS =====

  /**
   * Tipos de eventos políticos
   */
  export enum EventType {
    CRISIS = 'crisis',
    OPORTUNIDAD = 'oportunidad',
    DECISION = 'decision',
    EMERGENCIA = 'emergencia',
    HUMOR_NEGRO = 'humor_negro',
    CONFLICTO_FACCIONES = 'conflicto_facciones',
    CONSECUENCIA = 'consecuencia',
  }

  /**
   * Categorías de eventos por tema
   */
  export enum EventCategory {
    ECONOMICO = 'economico',
    SOCIAL = 'social',
    INTERNACIONAL = 'internacional',
    SEGURIDAD = 'seguridad',
    CORRUPCION = 'corrupcion',
    DEPORTIVO = 'deportivo',
    CULTURAL = 'cultural',
    PROVINCIAL = 'provincial'
  }

  /**
   * Condiciones para que se active un evento
   */
  export interface EventTrigger {
    /** ID del presidente requerido para que este evento ocurra */
    requiredPresidentId?: string;

    /** Métricas requeridas para activar el evento */
    requiredMetrics?: Partial<Record<MetricType, { min?: number; max?: number }>>;

    /** Provincias que deben estar en cierto estado */
    requiredProvinces?: string[];

    /** Eventos que deben haberse completado para que este se active */
    completedEvents?: string[];

    /** Eventos que, si están activos o completados, impiden que este se active */
    blockingEvents?: string[];

    /** Decisiones específicas que deben haberse tomado para que este se active */
    requiredChoices?: { eventId: string; choiceId: string }[];

    /** Tiempo mínimo desde el último evento similar */
    cooldown?: number;

    /** Probabilidad de activación (0-1) */
    probability?: number;
  }

  /**
   * Opción de decisión en un evento
   */
  export interface EventChoice {
    /** ID único de la opción */
    id: string;

    /** Texto de la opción */
    text: string;

    /** Descripción de las consecuencias */
    description: string;

    /** Efectos inmediatos en métricas nacionales */
    effects?: MetricEffect[];

    /** Efectos en facciones específicas */
    factionEffects?: FactionEffect[];

    /** Efectos en provincias específicas */
    regionalEffects?: RegionalEffect[];

    /** Modificadores de provincias específicas */
    provinceModifiers?: Partial<Record<ProvinceId, ProvinceModifier>>;

    /** Multiplicadores de efectos según la ideología de la provincia */
    ideologyEffects?: Partial<Record<ProvinceState['ideology'], number>>;

    /** Eventos que pueden desencadenarse */
    triggeredEvents?: string[];

    /** Requerimientos para mostrar esta opción */
    requirements?: EventTrigger;

    /** Costo en recursos o métricas */
    cost?: Partial<PoliticalMetrics>;

    /** Última interacción */
    lastInteraction?: string;
  }

  /**
   * Evento político completo
   */
  export interface PoliticalEvent {
    /** ID único del evento */
    id: string;

    /** Título del evento */
    title: string;

    /** Descripción del evento */
    description: string;

    /** Tipo de evento */
    type: EventType;

    /** Categoría del evento */
    category: EventCategory;

    /** Condiciones para activar el evento */
    trigger: EventTrigger;

    /** Opciones disponibles */
    choices: EventChoice[];

    /** Tiempo límite para decidir (en segundos) */
    timeLimit?: number;

    /** Opción por defecto si se acaba el tiempo */
    defaultChoice?: string;

    /** Nivel de urgencia (1-5) */
    urgency: number;

    /** Efectos automáticos al activarse */
    autoEffects?: MetricEffect[];

    /** Provincia específica (si aplica) */
    provinceId?: ProvinceId;

    /** Imagen o icono del evento */
    icon?: string;

    /** Sonido del evento */
    sound?: string;
  }

  // ===== LEYES =====

  /**
   * Representa una ley que puede ser promulgada
   */
  export interface Law {
    /** ID único de la ley */
    id: string;

    /** Título de la ley */
    title: string;

    /** Descripción de la ley y sus efectos */
    description: string;

    /** Categoría temática de la ley */
    category: 'Economía' | 'Social' | 'Seguridad' | 'Justicia' | 'Internacional';

    /** Efectos permanentes que aplica la ley */
    effects: MetricEffect[];

    /** Costo para promulgar la ley (en métricas o recursos) */
    cost?: Partial<PoliticalMetrics>;

    /** Requisitos para que la ley esté disponible */
    requirements: {
      /** Métricas requeridas */
      metrics?: Partial<Record<MetricType, { min?: number; max?: number }>>;
      /** Leyes que deben haberse promulgado antes */
      requiredLaws?: string[];
      /** Leyes que no deben estar promulgadas */
      blockingLaws?: string[];
    };
  }

  // ===== SISTEMA DE PROVINCIAS =====

  /**
   * Provincias argentinas
   */
  export enum ProvinceId {
    BUENOS_AIRES = "BUENOS_AIRES",
    CABA = "CABA",
    CATAMARCA = "CATAMARCA",
    CHACO = "CHACO",
    CHUBUT = "CHUBUT",
    CORDOBA = "CORDOBA",
    CORRIENTES = "CORRIENTES",
    ENTRE_RIOS = "ENTRE_RIOS",
    FORMOSA = "FORMOSA",
    JUJUY = "JUJUY",
    LA_PAMPA = "LA_PAMPA",
    LA_RIOJA = "LA_RIOJA",
    MENDOZA = "MENDOZA",
    MISIONES = "MISIONES",
    NEUQUEN = "NEUQUEN",
    RIO_NEGRO = "RIO_NEGRO",
    SALTA = "SALTA",
    SAN_JUAN = "SAN_JUAN",
    SAN_LUIS = "SAN_LUIS",
    SANTA_CRUZ = "SANTA_CRUZ",
    SANTA_FE = "SANTA_FE",
    SANTIAGO_DEL_ESTERO = "SANTIAGO_DEL_ESTERO",
    TIERRA_DEL_FUEGO = "TIERRA_DEL_FUEGO",
    TUCUMAN = "TUCUMAN",
  }

  /**
   * Estado de una provincia
   */
  export interface ProvinceState {
    /** ID de la provincia */
    id: ProvinceId;

    /** Nombre de la provincia */
    name: string;

    /** Nivel de descontento (0-100) */
    discontent: number;

    /** Lealtad al gobierno (0-100) */
    loyalty: number;

    /** Nivel de desarrollo económico */
    economicLevel: number;

    /** Población aproximada */
    population: number;

    /** Ideología política dominante en la provincia */
    ideology:
      | "populista"
      | "liberal"
      | "conservadora"
      | "progresista"
      | "anarquista";

    /** Influencia de cada facción en la provincia (0-100) */
    factionInfluence: Record<FactionId, number>;

    /** Recursos naturales principales */
    resources: string[];

    /** Eventos activos en la provincia */
    activeEvents: string[];

    /** Efectos regionales activos */
    activeEffects: RegionalEffect[];

    /** Último evento importante */
    lastMajorEvent?: string;
  }

  /**
   * Información completa de una provincia
   */
  export interface Province {
    /** Estado actual de la provincia */
    state: ProvinceState;

    /** Características especiales */
    specialFeatures: string[];

    /** Eventos únicos de esta provincia */
    uniqueEvents: string[];

    /** Relaciones con otras provincias */
    relationships: Record<ProvinceId, number>;

    /** Coordenadas en el mapa */
    coordinates: { x: number; y: number };

    /** Color representativo */
    color: string;
  }

  /**
   * Efecto de una decisión en una provincia específica.
   */
  export interface RegionalEffect {
    provinceId: ProvinceId;
    effect: Partial<Omit<ProvinceState, "id" | "name">>;
  }

  /** Modificador de provincia para el estado inicial */
  export type ProvinceModifier = {
    loyalty?: number;
    discontent?: number;
  };

  // ===== SISTEMA DE FACCIONES =====

  /**
   * Facciones políticas
   */
  export enum FactionId {
    LA_CAMPORA = "la_campora",
    EMPRESARIOS = "empresarios",
    SINDICALISTAS = "sindicalistas",
    MILITARES = "militares",
    BARRAS_BRAVAS = "barras_bravas",
    ALIENS = "aliens",
    OPOSICION = "oposicion",
    TACHEROS = "tacheros",
  }

  /**
   * Estado de una facción
   */
  export interface FactionState {
    /** ID de la facción */
    id: FactionId;

    /** Nombre de la facción */
    name: string;

    /** Descripción de la facción y sus intereses. */
    description: string;

    /** Nivel de apoyo al gobierno (-100 a +100) */
    support: number;

    /** Nivel de poder/influencia (0-100) */
    power: number;

    /** Recursos disponibles */
    resources: number;

    /** Relaciones con otras facciones */
    relationships: Record<FactionId, number>;

    /** Demandas activas */
    demands: string[];

    /** Eventos únicos de esta facción */
    uniqueEvents: string[];

    /** Última interacción */
    lastInteraction?: string;
  }

  /**
   * Efecto sobre una facción específica
   */
  export interface FactionEffect {
    /** ID de la facción afectada */
    factionId: FactionId;

    /** Cambio en el apoyo (-100 a 100) */
    supportChange?: number;

    /** Cambio en el poder (0-100) */
    powerChange?: number;

    /** Descripción del efecto */
    description: string;
  }

  /** Modificador de facción para el estado inicial */
  export type FactionModifier = {
    support?: number;
    power?: number;
  };

  // ===== UTILIDADES =====

  /**
   * Resultado de una decisión política
   */
  export interface DecisionResult {
    /** Evento que generó la decisión */
    eventId: string;

    /** Título del evento */
    eventTitle?: string;

    /** Opción elegida */
    choiceId: string;

    /** Título de la opción */
    choiceTitle?: string;

    /** Efectos en métricas nacionales aplicados */
    appliedEffects: MetricEffect[];

    /** Efectos en facciones aplicados */
    appliedFactionEffects: FactionEffect[];

    /** Efectos regionales aplicados */
    appliedRegionalEffects: RegionalEffect[];

    /** Nuevos eventos desencadenados */
    triggeredEvents: string[];

    /** Timestamp de la decisión */
    timestamp: number;

    /** Descripción del resultado */
    description: string;
  }

  /**
   * Efectos en el gameplay derivados de las métricas políticas
   */
  export interface GameplayEffects {
    /** Multiplicador para la tasa de aparición de enemigos */
    enemySpawnMultiplier: number;
    /** Multiplicador para la salud de los enemigos */
    enemyHealthMultiplier: number;
    /** Multiplicador para el daño del jugador */
    playerDamageMultiplier: number;
    /** Probabilidad de eventos especiales (positivos) */
    specialEventChance: number;
    /** Probabilidad de eventos de crisis (negativos) */
    crisisEventChance: number;
  }

  /**
   * Estado general del sistema político en el juego.
   * Incluye métricas nacionales y el estado de todas las provincias.
   */
  export interface GameState {
    politicalMetrics: PoliticalMetrics;
    metricStates: Record<keyof PoliticalMetrics, MetricState>;
    factionStates: Record<FactionId, FactionState>;
    provinceStates: Record<ProvinceId, ProvinceState>;
    currentPoliticalEvent: PoliticalEvent | null;
    politicalDecisions: DecisionResult[];
    eventHistory: string[];
    crisisLevel: number;
    governmentTime: number;
    curfewActive: boolean;
  }

  // Testing Types
  export interface TestScenario {
    id: string;
    name: string;
    description: string;
    initialMetrics: PoliticalMetrics;
    initialProvinceStates: Record<string, ProvinceState>;
    initialFactionStates: Record<string, FactionState>;
    expectedOutcomes: string[];
    testEvents: PoliticalEvent[];
  }

  export interface AutomatedTestBatch {
    id: string;
    name: string;
    description: string;
    events: PoliticalEvent[];
    intervalMs: number;
    durationMinutes: number;
    stressLevel: 'low' | 'medium' | 'high' | 'extreme';
  }

  export interface MetricSnapshot {
    timestamp: number;
    metrics: PoliticalMetrics;
    provinces: Record<string, ProvinceState>;
    factions: Record<string, FactionState>;
    activeEvents: string[];
    lastDecision?: string;
  }

  export interface MetricTrend {
    metricType: keyof PoliticalMetrics;
    values: Array<{
      timestamp: number;
      value: number;
      change: number;
      trigger?: string;
    }>;
    trend: 'ascending' | 'descending' | 'stable' | 'volatile';
    averageChange: number;
    volatility: number;
  }

  export interface EffectLog {
    id: string;
    timestamp: number;
    effectType: 'decision' | 'event' | 'cascade' | 'faction' | 'province';
    source: string;
    target: string;
    beforeValue: number;
    afterValue: number;
    change: number;
    calculation: string;
    cascadeLevel?: number;
  }

  export interface TestResult {
    testId: string;
    startTime: number;
    endTime: number;
    totalEvents: number;
    decisionsForced: number;
    systemStability: 'stable' | 'unstable' | 'crashed';
    finalMetrics: PoliticalMetrics;
    criticalErrors: string[];
    warnings: string[];
    performanceMetrics: {
      avgEventProcessingTime: number;
      maxEventProcessingTime: number;
      memoryUsage: number;
    };
  }

  export interface CorrelationAnalysis {
    decisionType: string;
    expectedEffects: Record<string, number>;
    actualEffects: Record<string, number>;
    accuracy: number;
    variance: number;
    consistency: 'high' | 'medium' | 'low';
  }

  // Debug Types
  export interface SystemDebugInfo {
    currentState: {
      metrics: PoliticalMetrics;
      provinces: Record<string, ProvinceState>;
      factions: Record<string, FactionState>;
      activeEvents: PoliticalEvent[];
    };
    recentEffects: EffectLog[];
    systemHealth: {
      lastUpdate: number;
      processingQueue: number;
      errorCount: number;
      warningCount: number;
    };
    consistency: {
      isValid: boolean;
      errors: string[];
      warnings: string[];
    };
  }

  // Simulation Types
  export interface SimulationConfig {
    speedMultiplier: number; // 1x = normal, 100x = acelerado
    duration: number; // en minutos de juego simulado
    autoDecisions: boolean;
    logLevel: 'minimal' | 'detailed' | 'verbose';
    breakOnError: boolean;
    stressTest: boolean;
  }

  export interface AcceleratedSimulation {
  id: string;
  config: SimulationConfig;
  startState: MetricSnapshot;
  snapshots: MetricSnapshot[];
  effectLogs: EffectLog[];
  result: TestResult;
  isRunning: boolean;
  progress: number;
}

// ===== SISTEMA RPG =====

/**
 * Habilidades RPG del presidente
 */
export interface Skill {
  id: string;
  name: string;
  description: string;
  branch: 'combate' | 'politica' | 'economia';
  level: number;
  cost: number;
  effects: SkillEffect[];
  unlockRequirement: {
    minLevel: number;
    requiredSkills?: string[];
  };
}

/**
 * Efectos de las habilidades
 */
export interface SkillEffect {
  type: 'damage' | 'speed' | 'health' | 'factionBoost' | 'provinceBoost' | 'projectileCount' | 'castRate';
  value: number;
  description: string;
}
