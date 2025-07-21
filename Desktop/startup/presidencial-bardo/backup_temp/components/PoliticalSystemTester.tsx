"use client";

import { ALL_EVENTS } from "@/data/events";
import { useGameState } from '@/hooks/useGameState';
import type { MetricEffect } from "@/types/political";
import {
    ProvinceId
} from "@/types/political";
import { CORRUPTION_EFFECTS, ECONOMIC_EFFECTS, SOCIAL_EFFECTS } from "@/utils/metricEffects";
import { ProvinceManager } from "@/utils/provinceManager";
import { produce } from "immer";
import {
    AlertTriangle,
    BarChart3,
    Briefcase,
    ChevronDown,
    CircleDollarSign,
    Dice5,
    Drama,
    EyeOff,
    Flag,
    Flame,
    GitBranch,
    Goal,
    Megaphone,
    Mic,
    RotateCw,
    ScrollText,
    SlidersHorizontal,
    TrafficCone,
    ZapOff
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ArgentinaMap } from "./ArgentinaMap";
import { CharacterSelectionScreen } from "./CharacterSelectionScreen";
import { EventFlowViewer } from "./EventFlowViewer";
import { FactionsHUD } from "./FactionsHUD";
import { PoliticalCalendar } from "./PoliticalCalendar";
import { PoliticalDecisionModal } from "./PoliticalDecisionModal";
import PoliticalEventSimulator from "./PoliticalEventSimulator";
import { PoliticalMetricsHUD } from "./PoliticalMetricsHUD";
import PressConference from "./PressConference";
import { ProvinceStatsHUD } from "./ProvinceStatsHUD";

const SIMULATION_SPEED_MS = 150; // Velocidad de avance de días
const MAX_DAYS = 1460; // 4 años de gobierno (365 * 4)

const CollapsibleSection = ({
	title,
	icon,
	children,
	defaultOpen = false,
}: {
	title: string;
	icon: React.ReactNode;
	children: React.ReactNode;
	defaultOpen?: boolean;
}) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		<div className="border-t border-purple-500/20 pt-4 mt-4">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="w-full flex items-center justify-between text-lg font-semibold text-purple-300 hover:text-purple-200 transition-colors"
			>
				<span className="flex items-center gap-3">
					{icon}
					{title}
				</span>
				<ChevronDown
					className={`w-5 h-5 transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>
			{isOpen && <div className="pt-3">{children}</div>}
		</div>
	);
};

export function PoliticalSystemTester() {
	const { gameStateRef, updatePoliticalState, initializeGameState, forcePoliticalEvent, forceRandomPoliticalEvent, updatePoliticalMetrics, makeDecision, resetPoliticalEventManager, getPoliticalEventStats, addNotification } = useGameState();
	const [showModal, setShowModal] = useState(false);
	const [currentDay, setCurrentDay] = useState(1);
	const [selectedProvince, setSelectedProvince] = useState<ProvinceId | null>(null);
	const [characterSelected, setCharacterSelected] = useState(false);
	const [showEventFlow, setShowEventFlow] = useState(false);
	const [, forceUpdate] = useState(0);

	const [isSimulating, setIsSimulating] = useState(false);
	const simulationIntervalRef = useRef<NodeJS.Timeout | null>(null);

	// Estado para conferencias de prensa automáticas
	const [pendingPressConference, setPendingPressConference] = useState<{
		required: boolean;
		reason: string;
		urgency: number;
	}>({ required: false, reason: '', urgency: 1 });

	const [provinceManager] = useState(() => new ProvinceManager());
	const [governmentTime, setGovernmentTime] = useState(0);

	const stopSimulation = () => {
		if (simulationIntervalRef.current) {
			clearInterval(simulationIntervalRef.current);
			simulationIntervalRef.current = null;
		}
		setIsSimulating(false);
	};

	const advanceOneDay = () => {
		if (currentDay >= MAX_DAYS) {
			stopSimulation();
			// Aquí podrías agregar una lógica de fin de juego/año
			return;
		}

		updatePoliticalState();
		setCurrentDay(d => d + 1);

		if (gameStateRef.current?.currentPoliticalEvent) {
			stopSimulation();
		}
		forceUpdate(c => c + 1);
	};

	const startSimulation = () => {
		setIsSimulating(true);
		simulationIntervalRef.current = setInterval(
			advanceOneDay,
			SIMULATION_SPEED_MS,
		);
	};

	const handleToggleSimulation = () => {
		if (isSimulating) {
			stopSimulation();
		} else {
			startSimulation();
		}
	};

	// Limpieza al desmontar el componente
	useEffect(() => {
		return () => {
			if (simulationIntervalRef.current) {
				clearInterval(simulationIntervalRef.current);
			}
		};
	}, []);

	const handleSelectCharacter = (
		character: any, // Usamos 'any' por simplicidad, ya que el tipo CharacterProfile no está exportado
	) => {
		initializeGameState({
			player: {
				id: character.id,
				// Los sprites se cargarían en otro lugar, aquí solo pasamos un objeto vacío
				sprites: {},
				// El resto de las propiedades del jugador usarán los valores por defecto
			} as any, // casteamos a 'any' para evitar conflictos de tipo con el Player completo
			politicalModifiers: character.modifiers,
			factionModifiers: character.factionModifiers,
			provinceModifiers: character.provinceModifiers,
		});
		setCharacterSelected(true);
		forceUpdate((c) => c + 1);
	};

	const handleSelectProvince = (provinceId: ProvinceId) => {
		setSelectedProvince(provinceId);
		forceUpdate((c) => c + 1);
	};

	const handleForceEvent = (eventId: string) => {
		const event = forcePoliticalEvent(eventId);
		if (event) {
			forceUpdate((c) => c + 1);
		}
	};

	const handleForceRandomEvent = () => {
		const event = forceRandomPoliticalEvent();
		if (event) {
			forceUpdate((c) => c + 1);
		}
	};

	const handleApplyEffect = (effectName: string) => {
		let effects: MetricEffect[] = [];
		switch (effectName) {
			case "CRISIS_LEVE":
				effects = ECONOMIC_EFFECTS.CRISIS_LEVE;
				break;
			case "CRISIS_GRAVE":
				effects = ECONOMIC_EFFECTS.CRISIS_GRAVE;
				break;
			case "PROTESTAS":
				effects = SOCIAL_EFFECTS.PROTESTAS_PACIFICAS;
				break;
			case "ESCANDALO":
				effects = CORRUPTION_EFFECTS.ESCANDALO_MAYOR;
				break;
		}
		updatePoliticalMetrics(effects);
		forceUpdate((c) => c + 1);
	};

	const handleMakeDecision = (eventId: string, choiceId: string) => {
		makeDecision(eventId, choiceId);
		// No necesitamos setShowModal(false) porque se maneja automáticamente
		// cuando currentPoliticalEvent se vuelve null
		forceUpdate((c) => c + 1);
	};

	const handleResetSystem = () => {
		stopSimulation();
		resetPoliticalEventManager();
		setCharacterSelected(false);
		setCurrentDay(1);
		forceUpdate(c => c + 1);
	};

	const currentState = gameStateRef.current;

	if (!characterSelected || !currentState) {
		return (
			<CharacterSelectionScreen
				onSelectCharacterAction={handleSelectCharacter}
			/>
		);
	}

	if (!currentState) {
		return (
			<div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 to-indigo-900 p-4 text-white">
				<div className="text-center">
					<Drama className="mx-auto h-16 w-16 mb-4 text-purple-400" />
					<h1 className="text-4xl font-bold mb-2">Presidencial Bardo</h1>
					<p className="text-lg text-purple-300 mb-6">
						Cargando simulador político...
					</p>
					<button
						type="button"
						onClick={handleToggleSimulation}
						className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-bold transition-colors"
					>
						Iniciar Simulación
					</button>
				</div>
			</div>
		);
	}

	const stats = getPoliticalEventStats();

	const validEvents = ALL_EVENTS.filter(
		event => event && event.id,
	);

	const getEventIcon = (icon: string) => {
		switch (icon) {
			case "💸":
				return <CircleDollarSign className="w-4 h-4 mr-2" />;
			case "🚧":
				return <TrafficCone className="w-4 h-4 mr-2" />;
			case "🕵️":
				return <Briefcase className="w-4 h-4 mr-2" />;
			case "⚡️":
				return <ZapOff className="w-4 h-4 mr-2" />;
			case "🇧🇷":
				return <Flag className="w-4 h-4 mr-2" />;
			case "🏟️":
				return <Goal className="w-4 h-4 mr-2" />;
			default:
				return null;
		}
	};

	// Función para detectar si se necesita conferencia después de eventos
	const checkForPressConferenceNeeded = (eventTitle: string, effects: any) => {
		const highImpactEvents = [
			'crisis', 'escándalo', 'corrupción', 'dólar', 'inflación',
			'piquete', 'represión', 'hiperinflación', 'colapso'
		];

		const isHighImpact = highImpactEvents.some(keyword =>
			eventTitle.toLowerCase().includes(keyword)
		);

		// También considerar cambios grandes en métricas
		const hasLargeMetricChange = Object.values(effects || {}).some((value: any) =>
			typeof value === 'number' && Math.abs(value) >= 15
		);

		if (isHighImpact || hasLargeMetricChange) {
			setPendingPressConference({
				required: true,
				reason: `Conferencia requerida tras: ${eventTitle}`,
				urgency: isHighImpact ? 4 : 3
			});
		}
	};

	// Simular avance de tiempo
	const advanceTime = (days: number) => {
		setGovernmentTime(prev => prev + days);
		// Avanzar estado político usando hook
		if (gameStateRef.current) {
			gameStateRef.current = produce(gameStateRef.current, draft => {
				draft.governmentTime += days;
			});
		}
	};

	const handleDecision = (eventId: string, choiceId: string) => {
		makeDecision(eventId, choiceId);
		// Aplicar efectos a provincias
		if (gameStateRef.current) {
			const decisionResult = gameStateRef.current.politicalDecisions[gameStateRef.current.politicalDecisions.length - 1]; // Última decisión
			const effects = provinceManager.applyDecisionEffects(decisionResult, gameStateRef.current.politicalMetrics);
			gameStateRef.current = produce(gameStateRef.current, draft => {
				effects.forEach(effect => {
					const province = draft.provinceStates[effect.provinceId];
					if (province) {
						province.discontent += Math.abs(effect.perceptionChange) || 0;
						province.discontent = Math.max(0, Math.min(100, province.discontent));
					}
				});
			});
		}
	};

	return (
		<div className="flex flex-col bg-gradient-to-br from-gray-900 to-indigo-900 p-4 text-white lg:h-screen">
			{/* Header */}
			<header className="text-center mb-4 flex-shrink-0">
				<h1 className="text-5xl font-extrabold tracking-tight mb-2 flex items-center justify-center">
					<Drama className="w-12 h-12 mr-4 text-purple-400" />
					Presidencial Bardo
				</h1>
				<p className="text-purple-300 text-lg">
					Un simulador para testear el equilibrio del sistema político Argentino.
				</p>
			</header>

			<div className="flex-1 max-w-8xl w-full mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-y-auto lg:overflow-hidden">
				{/* Panel de Control Lateral */}
				<aside className="lg:col-span-1 flex flex-col gap-6 p-1 lg:overflow-y-auto">
					<div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-purple-500/30">
						<h2 className="text-2xl font-bold mb-4 flex items-center">
							<SlidersHorizontal className="w-6 h-6 mr-3 text-purple-400" />
							Panel de Control
						</h2>
						<p className="text-sm text-gray-400 mb-5">
							Gestiona la simulación día a día y dispara eventos para probar el
							sistema.
						</p>
						{/* Sistema de Simulación */}
						<PoliticalCalendar
							currentDay={currentDay}
							onToggleSimulationAction={handleToggleSimulation}
							isSimulating={isSimulating}
							isPaused={!!currentState.currentPoliticalEvent}
						/>

						{/* Eventos manuales */}
						<CollapsibleSection
							title="Eventos Manuales"
							icon={<Dice5 className="w-5 h-5" />}
						>
							<div className="space-y-2">
								<button
									type="button"
									onClick={handleForceRandomEvent}
									className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900/50 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-colors"
									disabled={!!currentState.currentPoliticalEvent}
								>
									<Dice5 className="w-4 h-4 mr-2" />
									Evento Aleatorio
								</button>
								{validEvents.map(event => (
									<button
										key={event.id}
										type="button"
										onClick={() => handleForceEvent(event.id)}
										className="w-full flex items-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 px-4 py-2 rounded-lg text-white text-sm text-left transition-colors"
										disabled={!!currentState.currentPoliticalEvent}
									>
										{getEventIcon(event.icon || "")} {event.title}
									</button>
								))}
							</div>
						</CollapsibleSection>

						{/* Efectos directos */}
						<CollapsibleSection
							title="Efectos Directos"
							icon={<Flame className="w-5 h-5" />}
						>
							<div className="grid grid-cols-2 gap-2">
								<button
									type="button"
									onClick={() => handleApplyEffect("CRISIS_LEVE")}
									className="flex items-center justify-center bg-orange-600 hover:bg-orange-700 px-3 py-2 rounded-lg text-white text-xs font-semibold transition-colors"
								>
									<CircleDollarSign className="w-4 h-4 mr-1.5" /> Crisis Leve
								</button>
								<button
									type="button"
									onClick={() => handleApplyEffect("CRISIS_GRAVE")}
									className="flex items-center justify-center bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-white text-xs font-semibold transition-colors"
								>
									<Flame className="w-4 h-4 mr-1.5" /> Crisis Grave
								</button>
								<button
									type="button"
									onClick={() => handleApplyEffect("PROTESTAS")}
									className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 px-3 py-2 rounded-lg text-white text-xs font-semibold transition-colors"
								>
									<Megaphone className="w-4 h-4 mr-1.5" /> Protestas
								</button>
								<button
									type="button"
									onClick={() => handleApplyEffect("ESCANDALO")}
									className="flex items-center justify-center bg-rose-600 hover:bg-rose-700 px-3 py-2 rounded-lg text-white text-xs font-semibold transition-colors"
								>
									<EyeOff className="w-4 h-4 mr-1.5" /> Escándalo
								</button>
							</div>
						</CollapsibleSection>

						{/* Eventos Políticos Estratégicos */}
						<CollapsibleSection
							title="Eventos Políticos"
							icon={<AlertTriangle className="w-5 h-5" />}
						>
							<div className="max-h-96 overflow-y-auto">
								<PoliticalEventSimulator
									onMetricsChange={(metrics: any, eventTitle?: string) => {
										// Aplicar cambios al estado del juego
										Object.entries(metrics).forEach(([key, value]) => {
											if (typeof value === 'number') {
												handleApplyEffect(key.toUpperCase() as any);
											}
										});

										// Verificar si se necesita conferencia de prensa
										if (eventTitle) {
											checkForPressConferenceNeeded(eventTitle, metrics);
										}
									}}
									initialMetrics={{
										popularidad: currentState.politicalMetrics.popularidad,
										economia: currentState.politicalMetrics.economia,
										inflacion: 65,
										dolarBlue: 800,
										caos: currentState.crisisLevel * 20,
										riesgosPais: 1200,
										reservas: 12000
									}}
								/>
							</div>
						</CollapsibleSection>

						{/* Conferencias de Prensa */}
						<CollapsibleSection
							title={`Conferencias de Prensa ${pendingPressConference.required ? '🔴 REQUERIDA' : ''}`}
							icon={<Mic className="w-5 h-5" />}
						>
							{pendingPressConference.required && (
								<div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-red-200 font-semibold">📢 Conferencia de Prensa Requerida</p>
											<p className="text-red-300 text-sm">{pendingPressConference.reason}</p>
											<p className="text-xs text-red-400">Urgencia: {pendingPressConference.urgency}/5</p>
										</div>
										<button
											onClick={() => setPendingPressConference({ required: false, reason: '', urgency: 1 })}
											className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
										>
											Ignorar
										</button>
									</div>
								</div>
							)}

							<div className="max-h-96 overflow-y-auto">
								<PressConference
									onMetricsChange={(metrics: any) => {
										// Aplicar cambios menores al estado del juego
										Object.entries(metrics).forEach(([key, value]) => {
											if (typeof value === 'number') {
												// Efectos más pequeños para conferencias
												handleApplyEffect(key.toUpperCase() as any);
											}
										});
										// Marcar conferencia como completada
										if (pendingPressConference.required) {
											setPendingPressConference({ required: false, reason: '', urgency: 1 });
										}
									}}
									initialMetrics={{
										popularidad: currentState.politicalMetrics.popularidad,
										economia: currentState.politicalMetrics.economia,
										inflacion: 65,
										dolarBlue: 800,
										caos: currentState.crisisLevel * 20
									}}
									isRequired={pendingPressConference.required}
									urgencyLevel={pendingPressConference.urgency}
								/>
							</div>
						</CollapsibleSection>



						{/* Reset */}
						<div className="mt-auto pt-4 border-t border-purple-500/20">
							<button
								type="button"
								onClick={handleResetSystem}
								className="w-full flex items-center justify-center bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
							>
								<RotateCw className="w-4 h-4 mr-2" />
								Resetear Simulación
							</button>
						</div>
					</div>
					<ArgentinaMap provinceStates={currentState.provinceStates} onProvinceSelect={handleSelectProvince} />
					<div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-purple-500/30 mt-6">
						<button
							type="button"
							onClick={() => setShowEventFlow(!showEventFlow)}
							className="w-full flex items-center justify-center bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg font-medium transition-colors"
						>
							<GitBranch className="w-4 h-4 mr-2" />
							{showEventFlow ? "Ocultar Flujo de Eventos" : "Mostrar Flujo de Eventos"}
						</button>
					</div>
				</aside>
				{/* Contenido Principal */}
				<main className="lg:col-span-3 flex flex-col gap-6 p-1 lg:overflow-y-auto">
					{showEventFlow ? (
						<EventFlowViewer />
					) : (
						<>
							<PoliticalMetricsHUD
								metrics={currentState.politicalMetrics}
								metricStates={currentState.metricStates}
								crisisLevel={currentState.crisisLevel}
							/>
							<ProvinceStatsHUD
								provinceStates={currentState.provinceStates}
								selectedProvinceId={selectedProvince}
								factionStates={currentState.factionStates}
							/>
							{/* Historial y Facciones */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Historial de decisiones */}
								<div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-purple-500/30">
									<h3 className="text-xl font-bold mb-3 flex items-center">
										<ScrollText className="w-5 h-5 mr-3 text-purple-400" />
										Historial de Decisiones
									</h3>
									<div className="max-h-48 overflow-y-auto space-y-2 pr-2">
										{currentState.politicalDecisions.length === 0 ? (
											<p className="text-gray-400 text-sm">
												Aún no se han tomado decisiones.
											</p>
										) : (
											currentState.politicalDecisions
												.slice(-10)
												.reverse()
												.map((decision, index) => (
													<div
														key={index}
														className="bg-gray-800/60 rounded-lg p-3 text-sm"
													>
														<p className="text-white font-semibold">
															{decision.eventTitle || decision.eventId}
														</p>
														<p className="text-gray-300">
															Decisión:{" "}
															<span className="font-medium text-purple-300">
																{decision.choiceTitle || decision.choiceId}
															</span>
														</p>
														{(decision.appliedFactionEffects?.length > 0 ||
															decision.appliedRegionalEffects?.length > 0) && (
															<div className="mt-2 pt-2 border-t border-purple-500/10 text-xs">
																{decision.appliedFactionEffects?.length > 0 && (
																	<p className="text-gray-400">
																		Facciones Afectadas:{" "}
																		<span className="text-yellow-300">
																			{decision.appliedFactionEffects
																				.map(
																					e =>
																						currentState.factionStates[e.factionId]
																							.name,
																				)
																				.join(", ")}
																		</span>
																	</p>
																)}
																{decision.appliedRegionalEffects?.length >
																	0 && (
																	<p className="text-gray-400">
																		Provincias Afectadas:{" "}
																		<span className="text-blue-300">
																			{decision.appliedRegionalEffects
																				.map(
																					e =>
																						currentState.provinceStates[
																							e.provinceId
																						].name,
																				)
																				.join(", ")}
																		</span>
																	</p>
																)}
															</div>
														)}
														<p className="text-xs text-gray-500 text-right mt-1">
															{new Date(
																decision.timestamp,
															).toLocaleTimeString()}
														</p>
													</div>
												))
										)}
									</div>
								</div>
								{/* Estadísticas */}
								<div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-purple-500/30">
									<h3 className="text-xl font-bold mb-3 flex items-center">
										<BarChart3 className="w-5 h-5 mr-3 text-purple-400" />
										Estadísticas
									</h3>
									<div className="space-y-3 text-sm">
										<div className="flex justify-between items-center">
											<span className="text-gray-300">
												Eventos Activados:
											</span>
											<span className="font-bold text-lg text-purple-300">
												{stats.triggeredEventsCount}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-300">Día de Gobierno:</span>
											<span className="font-bold text-lg text-purple-300">
												{currentDay}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-300">Nivel de Crisis:</span>
											<span className="font-bold text-lg text-red-400">
												{currentState.crisisLevel}/5
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-gray-300">
												Tiempo de Gobierno:
											</span>
											<span className="font-bold text-lg text-purple-300">
												{Math.round(currentState.governmentTime / 1000)}s
											</span>
										</div>
									</div>
								</div>
							</div>
							<FactionsHUD factionStates={currentState.factionStates} />
						</>
					)}
				</main>
			</div>
			{/* Modal de Decisión Política */}
			<PoliticalDecisionModal
				event={currentState.currentPoliticalEvent}
				onMakeDecisionAction={handleMakeDecision}
				onCloseAction={() => {
					// No se puede cerrar el modal de decisión, se debe tomar una
				}}
				isVisible={!!currentState.currentPoliticalEvent}
			/>
		</div>
	);
}
