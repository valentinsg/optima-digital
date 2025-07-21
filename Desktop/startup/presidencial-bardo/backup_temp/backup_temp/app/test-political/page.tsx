"use client";
import { AutomatedTestingPanel } from "@/components/AutomatedTestingPanel";
import ClientOnly from "@/components/ClientOnly";
import { EventFlowVisualizerSimple } from "@/components/EventFlowVisualizerSimple";
import { ExtremeCasesTester } from "@/components/ExtremeCasesTester";
import { MetricsTrendAnalyzer } from "@/components/MetricsTrendAnalyzer";
import { MissionsRPGTester } from "@/components/MissionsRPGTester";
import { PoliticalSystemTester } from "@/components/PoliticalSystemTester";
import { SystemDebugConsole } from "@/components/SystemDebugConsole";
import { EffectLog, MetricSnapshot, PoliticalMetrics, SystemDebugInfo, TestScenario } from "@/types/political";
import { useCallback, useState } from "react";

export default function TestPoliticalPage() {
	const [activeTab, setActiveTab] = useState<'tester' | 'automated' | 'trends' | 'debug' | 'extreme' | 'visualizer' | 'missions'>('tester');

	// Estados para datos de testing
	const [currentMetrics, setCurrentMetrics] = useState<PoliticalMetrics>({
		popularidad: 50,
		economia: 50,
		seguridad: 50,
		relacionesInternacionales: 50,
		corrupcion: 50,
		controlMedios: 50,
		salud: 60,
		tecnologia: 50
	});

	const [snapshots, setSnapshots] = useState<MetricSnapshot[]>([]);
	const [effectLogs, setEffectLogs] = useState<EffectLog[]>([]);

	// HANDLERS PARA TESTING
	const handleApplyScenario = useCallback((scenario: TestScenario) => {
		console.log(`📋 Aplicando escenario: ${scenario.name}`);
		setCurrentMetrics(scenario.initialMetrics);

		// Crear snapshot del escenario aplicado
		const snapshot: MetricSnapshot = {
			timestamp: Date.now(),
			metrics: scenario.initialMetrics,
			provinces: scenario.initialProvinceStates,
			factions: scenario.initialFactionStates,
			activeEvents: [],
			lastDecision: `Aplicar escenario: ${scenario.name}`
		};
		setSnapshots(prev => [...prev, snapshot]);

		// Log del cambio
		Object.entries(scenario.initialMetrics).forEach(([key, newValue]) => {
			const oldValue = currentMetrics[key as keyof PoliticalMetrics];
			if (oldValue !== newValue) {
				const log: EffectLog = {
					id: `scenario-${Date.now()}-${key}`,
					timestamp: Date.now(),
					effectType: 'event',
					source: `Escenario: ${scenario.name}`,
					target: key,
					beforeValue: oldValue,
					afterValue: newValue,
					change: newValue - oldValue,
					calculation: `Aplicación directa de escenario`
				};
				setEffectLogs(prev => [...prev, log]);
			}
		});
	}, [currentMetrics]);

	const handleTriggerEvent = useCallback((eventId: string) => {
		console.log(`🎭 Triggering event: ${eventId}`);

		// Simular efectos del evento
		const mockEffects = {
			'metric-zero-test': { economia: -currentMetrics.economia },
			'metric-hundred-test': { popularidad: 100 - currentMetrics.popularidad },
			'economic-collapse': { economia: -20, popularidad: -15 },
			'social-unrest': { seguridad: -25, popularidad: -10 },
			'security-breakdown': { seguridad: -30, corrupcion: 15 },
			'international-isolation': { relacionesInternacionales: -35 },
			'corruption-scandal': { corrupcion: 25, popularidad: -20 }
		};

		const effects = mockEffects[eventId as keyof typeof mockEffects] || {};

		const newMetrics = { ...currentMetrics };
		Object.entries(effects).forEach(([metric, change]) => {
			const key = metric as keyof PoliticalMetrics;
			const oldValue = newMetrics[key];
			const newValue = Math.max(0, Math.min(100, oldValue + change));
			newMetrics[key] = newValue;

			// Crear log del efecto
			const log: EffectLog = {
				id: `event-${Date.now()}-${key}`,
				timestamp: Date.now(),
				effectType: 'event',
				source: eventId,
				target: key,
				beforeValue: oldValue,
				afterValue: newValue,
				change: newValue - oldValue,
				calculation: `Efecto directo del evento ${eventId}`
			};
			setEffectLogs(prev => [...prev, log]);
		});

		setCurrentMetrics(newMetrics);

		// Crear snapshot
		const snapshot: MetricSnapshot = {
			timestamp: Date.now(),
			metrics: newMetrics,
			provinces: {},
			factions: {},
			activeEvents: [eventId],
			lastDecision: `Evento: ${eventId}`
		};
		setSnapshots(prev => [...prev, snapshot]);
	}, [currentMetrics]);

	const handleForceMetricAction = useCallback((metric: keyof PoliticalMetrics, value: number) => {
		const clampedValue = Math.max(0, Math.min(100, value));
		const oldValue = currentMetrics[metric];

		setCurrentMetrics(prev => ({
			...prev,
			[metric]: clampedValue
		}));

		// Log del cambio forzado
		const log: EffectLog = {
			id: `force-${Date.now()}-${metric}`,
			timestamp: Date.now(),
			effectType: 'decision',
			source: 'Testing: Forzar métrica',
			target: metric,
			beforeValue: oldValue,
			afterValue: clampedValue,
			change: clampedValue - oldValue,
			calculation: `Valor forzado manualmente`
		};
		setEffectLogs(prev => [...prev, log]);

		// Crear snapshot
		const snapshot: MetricSnapshot = {
			timestamp: Date.now(),
			metrics: { ...currentMetrics, [metric]: clampedValue },
			provinces: {},
			factions: {},
			activeEvents: [],
			lastDecision: `Forzar ${metric} a ${clampedValue}%`
		};
		setSnapshots(prev => [...prev, snapshot]);
	}, [currentMetrics]);

	const handleSystemCheck = useCallback((): SystemDebugInfo => {
		return {
			currentState: {
				metrics: currentMetrics,
				provinces: {},
				factions: {},
				activeEvents: []
			},
			recentEffects: effectLogs.slice(-20),
			systemHealth: {
				lastUpdate: Date.now(),
				processingQueue: 0,
				errorCount: effectLogs.filter(log => log.afterValue <= 5 || Math.abs(log.change) > 30).length,
				warningCount: effectLogs.filter(log => Math.abs(log.change) > 15 && Math.abs(log.change) <= 30).length
			},
			consistency: {
				isValid: Object.values(currentMetrics).every(v => v >= 0 && v <= 100),
				errors: Object.entries(currentMetrics)
					.filter(([_, value]) => value < 0 || value > 100)
					.map(([key, value]) => `Métrica ${key} fuera de rango: ${value}%`),
				warnings: Object.entries(currentMetrics)
					.filter(([_, value]) => value <= 10)
					.map(([key, value]) => `Métrica ${key} en nivel crítico: ${value}%`)
			}
		};
	}, [currentMetrics, effectLogs]);

	const handleStressTestAction = useCallback(async (intensity: 'low' | 'medium' | 'high' | 'extreme') => {
		console.log(`⚡ Iniciando stress test: ${intensity}`);

		const intensityConfig = {
			low: { events: 10, interval: 1000 },
			medium: { events: 25, interval: 500 },
			high: { events: 50, interval: 200 },
			extreme: { events: 100, interval: 100 }
		};

		const config = intensityConfig[intensity];

		for (let i = 0; i < config.events; i++) {
			setTimeout(() => {
				// Efecto aleatorio
				const metrics = Object.keys(currentMetrics) as Array<keyof PoliticalMetrics>;
				const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
				const randomChange = (Math.random() - 0.5) * 20; // Cambio entre -10 y +10

				const oldValue = currentMetrics[randomMetric];
				const newValue = Math.max(0, Math.min(100, oldValue + randomChange));

				setCurrentMetrics(prev => ({
					...prev,
					[randomMetric]: newValue
				}));

				// Log del stress test
				const log: EffectLog = {
					id: `stress-${Date.now()}-${randomMetric}-${i}`,
					timestamp: Date.now(),
					effectType: 'event',
					source: `StressTest-${intensity}`,
					target: randomMetric,
					beforeValue: oldValue,
					afterValue: newValue,
					change: newValue - oldValue,
					calculation: `Efecto aleatorio del stress test (${i+1}/${config.events})`
				};
				setEffectLogs(prev => [...prev, log]);
			}, i * config.interval);
		}
	}, [currentMetrics]);

	// Limpiar datos de testing
	const handleClearData = useCallback(() => {
		setSnapshots([]);
		setEffectLogs([]);
		setCurrentMetrics({
			popularidad: 50,
			economia: 50,
			seguridad: 50,
			relacionesInternacionales: 50,
			corrupcion: 50,
			controlMedios: 50,
			salud: 60,
			tecnologia: 50
		});
	}, []);

	return (
		<ClientOnly fallback={
			<div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
				<div className="text-center">
					<div className="text-2xl font-bold mb-4">Cargando herramientas...</div>
					<div className="animate-pulse text-purple-400">⚡ Inicializando sistema político avanzado</div>
				</div>
			</div>
		}>
			<div className="w-full h-screen overflow-y-auto bg-gray-900 text-white p-4 sm:p-6">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
						🧪 Suite de Testing Político Avanzado
					</h1>
					<div className="flex items-center space-x-4">
						<div className="text-sm text-gray-400">
							Snapshots: <span className="text-purple-400 font-bold">{snapshots.length}</span> |
							Logs: <span className="text-blue-400 font-bold">{effectLogs.length}</span>
						</div>
						<button
							onClick={handleClearData}
							className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
						>
							🗑️ Limpiar Datos
						</button>
					</div>
				</div>

				{/* Tabs */}
				<div className="flex flex-wrap border-b border-gray-700 mb-6">
					{[
						{ id: 'tester', label: '🎮 Sistema Base', icon: '🎮' },
						{ id: 'automated', label: '⚡ Testing Automatizado', icon: '⚡' },
						{ id: 'trends', label: '📈 Análisis de Tendencias', icon: '📈' },
						{ id: 'debug', label: '🔧 Debug & Logs', icon: '🔧' },
						{ id: 'extreme', label: '💥 Casos Extremos', icon: '💥' },
						{ id: 'visualizer', label: '📊 Visualizador', icon: '📊' },
						{ id: 'missions', label: '🎯 Misiones & RPG', icon: '🎯' }
					].map(tab => (
						<button
							key={tab.id}
							className={`px-6 py-3 font-medium text-lg border-b-2 transition-colors ${
								activeTab === tab.id
									? 'border-purple-500 text-purple-400'
									: 'border-transparent text-gray-400 hover:text-gray-200'
							}`}
							onClick={() => setActiveTab(tab.id as any)}
						>
							{tab.icon} {tab.label}
						</button>
					))}
				</div>

				{/* Contenido */}
				<div className="space-y-6">
					{activeTab === 'tester' && <PoliticalSystemTester />}

					{activeTab === 'automated' && (
						<AutomatedTestingPanel
							currentMetrics={currentMetrics}
							onApplyScenario={handleApplyScenario}
							onTriggerEvent={handleTriggerEvent}
						/>
					)}

					{activeTab === 'trends' && (
						<MetricsTrendAnalyzer
							currentMetrics={currentMetrics}
							snapshots={snapshots}
							effectLogs={effectLogs}
						/>
					)}

					{activeTab === 'debug' && (
						<SystemDebugConsole
							currentMetrics={currentMetrics}
							effectLogs={effectLogs}
							onSystemCheck={handleSystemCheck}
						/>
					)}

					{activeTab === 'extreme' && (
						<ExtremeCasesTester
							currentMetrics={currentMetrics}
							onForceMetricAction={handleForceMetricAction}
							onTriggerCrisisAction={handleTriggerEvent}
							onStressTestAction={handleStressTestAction}
						/>
					)}

					{activeTab === 'visualizer' && <EventFlowVisualizerSimple />}

					{activeTab === 'missions' && <MissionsRPGTester />}
				</div>
			</div>
		</ClientOnly>
	);
}
