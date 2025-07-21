"use client";

import { AlertTriangle, Building } from 'lucide-react';
import React, { useState } from 'react';
import EventNotification from './EventNotification';

interface PoliticalEvent {
	id: string;
	title: string;
	description: string;
	category: 'Crisis' | 'Oportunidad' | 'Emergencia' | 'Rutina';
	urgencyLevel: 1 | 2 | 3 | 4 | 5;
	province?: string;
	options: {
		text: string;
		effects: {
			popularidad?: number;
			economia?: number;
			inflacion?: number;
			dolarBlue?: number;
			caos?: number;
			description: string;
		};
	}[];
}

interface PoliticalMetrics {
	popularidad: number;
	economia: number;
	inflacion: number;
	dolarBlue: number;
	caos: number;
	riesgosPais: number;
	reservas: number;
}

const POLITICAL_EVENTS: PoliticalEvent[] = [
	{
		id: 'dolar-crisis',
		title: 'Crisis del Dólar Blue',
		description: 'El dólar blue se disparó 15% en una semana. Los especuladores están vendiendo pesos masivamente y hay corridas bancarias en el microcentro. El FMI amenaza con suspender el acuerdo.',
		category: 'Crisis',
		urgencyLevel: 4,
		province: 'CABA',
		options: [
			{
				text: 'Prohibir la venta de dólares y enviar a la AFIP a perseguir arbolitos',
				effects: {
					dolarBlue: 50,
					caos: 8,
					popularidad: -5,
					description: 'Los arbolitos se vuelven ninjas, el dólar blue sube más por la escasez'
				}
			},
			{
				text: 'Crear el "Dólar Patria" que vale lo mismo pero suena más nacional',
				effects: {
					economia: -3,
					caos: 12,
					popularidad: 2,
					description: 'La gente no entiende nada pero aplaude el patriotismo'
				}
			},
			{
				text: 'Llamar sesión extraordinaria del Congreso para debatir 6 meses',
				effects: {
					popularidad: 3,
					economia: -2,
					caos: -2,
					description: 'Ganaste tiempo pero el problema sigue ahí'
				}
			}
		]
	},
	{
		id: 'piquete-masivo',
		title: 'Piquete Masivo en 9 de Julio',
		description: 'Los movimientos sociales cortaron la 9 de Julio desde Plaza de Mayo hasta el Obelisco. Piden aumento de planes sociales y renuncia del ministro de Economía. Hay 50 mil personas.',
		category: 'Crisis',
		urgencyLevel: 3,
		province: 'CABA',
		options: [
			{
				text: 'Negociar con los líderes piqueteros y darles lo que piden',
				effects: {
					popularidad: -8,
					economia: -5,
					caos: -10,
					description: 'Los piqueteros se van contentos, la clase media explota'
				}
			},
			{
				text: 'Ordenar desalojo policial con gases lacrimógenos',
				effects: {
					popularidad: 5,
					caos: 15,
					economia: 2,
					description: 'La represión genera más protestas pero algunos aplauden'
				}
			},
			{
				text: 'Ignorar totalmente la protesta y hacer streaming jugando al FIFA',
				effects: {
					caos: 20,
					popularidad: -3,
					economia: -1,
					description: 'Los memes se vuelven virales, el país arde pero te ríes'
				}
			}
		]
	},
	{
		id: 'fmi-meeting',
		title: 'Reunión Urgente con el FMI',
		description: 'El FMI exige reunión inmediata. Quieren que eliminemos subsidios a combustibles, subamos tarifas 200% y despidamos 100 mil empleados públicos. A cambio prometen 5 mil millones de dólares.',
		category: 'Oportunidad',
		urgencyLevel: 5,
		options: [
			{
				text: 'Aceptar todas las condiciones del FMI como un alumno aplicado',
				effects: {
					economia: 8,
					popularidad: -15,
					caos: 25,
					description: 'Tenés dólares pero el país explota en protestas'
				}
			},
			{
				text: 'Proponer un plan alternativo de "ajuste gradual en 47 etapas"',
				effects: {
					economia: 2,
					popularidad: 5,
					caos: -2,
					description: 'El FMI se ríe pero ganaste tiempo para maniobrar'
				}
			},
			{
				text: 'Rechazar todo y anunciar que Argentina se va del FMI',
				effects: {
					popularidad: 12,
					economia: -10,
					caos: 30,
					description: 'Ovación nacional pero los mercados colapsan'
				}
			}
		]
	},
	{
		id: 'superclasico-violence',
		title: 'Violencia en el Superclásico',
		description: 'River vs Boca terminó con 47 heridos, 12 detenidos y la tribuna de River incendiada. Los hinchas de ambos equipos marchan hacia el Congreso pidiendo tu renuncia por "no saber de fútbol".',
		category: 'Emergencia',
		urgencyLevel: 2,
		province: 'Buenos Aires',
		options: [
			{
				text: 'Suspender el fútbol indefinidamente hasta que aprendan a comportarse',
				effects: {
					popularidad: -20,
					caos: 40,
					economia: -3,
					description: 'El país se levanta en armas, ni la dictadura prohibió el fútbol'
				}
			},
			{
				text: 'Reunirte secretamente con las barras bravas y negociar paz',
				effects: {
					caos: -8,
					popularidad: -5,
					economia: -2,
					description: 'Las barras te respetan pero la oposición te acusa de mafioso'
				}
			},
			{
				text: 'Crear un mega operativo policial en todos los estadios del país',
				effects: {
					caos: 5,
					popularidad: 8,
					economia: -1,
					description: 'Los hinchas protestan pero las familias aplauden'
				}
			}
		]
	},
	{
		id: 'inflation-spiral',
		title: 'Espiral Inflacionaria Descontrolada',
		description: 'La inflación mensual llegó al 25%. Los supermercados cambian precios 3 veces por día. La gente hace cola para comprar lo que sea antes de que suba más. Los sindicatos piden paritarias del 400%.',
		category: 'Crisis',
		urgencyLevel: 5,
		options: [
			{
				text: 'Congelar precios por decreto y enviar inspectores a multar',
				effects: {
					inflacion: -15,
					economia: -8,
					caos: 10,
					description: 'Los precios se congelan pero desaparece todo del mercado negro'
				}
			},
			{
				text: 'Liberar completamente la economía y que se arregle sola',
				effects: {
					economia: 5,
					inflacion: 10,
					popularidad: -12,
					description: 'Los mercados aplauden, la gente no puede ni comprar pan'
				}
			},
			{
				text: 'Crear una nueva moneda llamada "Peso Evita" respaldada en amor',
				effects: {
					caos: 15,
					popularidad: 8,
					inflacion: -5,
					description: 'La gente no entiende nada pero el nombre emociona'
				}
			}
		]
	},
	{
		id: 'energy-crisis',
		title: 'Apagón Nacional por Ola de Calor',
		description: 'El 60% del país está sin luz por una ola de calor histórica. Los aires acondicionados colapsaron el sistema eléctrico. Hay saqueos en algunos barrios y la gente cocina asado en las calles.',
		category: 'Emergencia',
		urgencyLevel: 4,
		province: 'Nacional',
		options: [
			{
				text: 'Racionar la electricidad: 4 horas de luz por día para todos',
				effects: {
					economia: -3,
					caos: 8,
					popularidad: -8,
					description: 'Orden pero la gente odia las medidas autoritarias'
				}
			},
			{
				text: 'Priorizar hospitales y escuelas, que el resto se arregle',
				effects: {
					popularidad: 5,
					caos: 12,
					economia: -1,
					description: 'Decisión humana pero los barrios ricos protestan'
				}
			},
			{
				text: 'Declarar "Día Nacional del Asado en la Calle" y hacer fiesta',
				effects: {
					popularidad: 15,
					caos: -5,
					economia: 1,
					description: 'La crisis se vuelve celebración, genio del marketing'
				}
			}
		]
	}
];

interface PoliticalEventSimulatorProps {
	onMetricsChange?: (metrics: Partial<PoliticalMetrics>) => void;
	initialMetrics?: PoliticalMetrics;
}

const PoliticalEventSimulator: React.FC<PoliticalEventSimulatorProps> = ({
	onMetricsChange,
	initialMetrics = {
		popularidad: 45,
		economia: 42,
		inflacion: 68,
		dolarBlue: 850,
		caos: 35,
		riesgosPais: 1200,
		reservas: 12000
	}
}) => {
	const [currentEvent, setCurrentEvent] = useState<PoliticalEvent | null>(null);
	const [metrics, setMetrics] = useState<PoliticalMetrics>(initialMetrics);
	const [eventHistory, setEventHistory] = useState<{
		event: string;
		decision: string;
		effects: string;
		timestamp: Date;
	}[]>([]);
	const [notification, setNotification] = useState<{
		message: string;
		type: 'success' | 'warning' | 'error';
	} | null>(null);

	const generateRandomEvent = () => {
		const randomEvent = POLITICAL_EVENTS[Math.floor(Math.random() * POLITICAL_EVENTS.length)];
		setCurrentEvent(randomEvent);

		// Notificación de evento nuevo
		setNotification({
			message: `NUEVO EVENTO: ${randomEvent.title}`,
			type: 'warning'
		});
	};

	const handleDecision = (optionIndex: number) => {
		if (!currentEvent) return;

		const option = currentEvent.options[optionIndex];
		const newMetrics = { ...metrics };

		// Aplicar efectos
		Object.entries(option.effects).forEach(([key, value]) => {
			if (key !== 'description' && typeof value === 'number') {
				newMetrics[key as keyof PoliticalMetrics] += value;

				// Mantener límites realistas
				if (key === 'dolarBlue') {
					newMetrics[key] = Math.max(300, Math.min(3000, newMetrics[key]));
				} else if (key === 'riesgosPais') {
					newMetrics[key] = Math.max(500, Math.min(5000, newMetrics[key]));
				} else if (key === 'reservas') {
					newMetrics[key] = Math.max(-50000, Math.min(100000, newMetrics[key]));
				} else {
					newMetrics[key] = Math.max(0, Math.min(100, newMetrics[key]));
				}
			}
		});

		setMetrics(newMetrics);
		onMetricsChange?.(newMetrics);

		// Agregar al historial
		setEventHistory(prev => [...prev, {
			event: currentEvent.title,
			decision: option.text,
			effects: option.effects.description,
			timestamp: new Date()
		}]);

		// Mostrar resultado
		setNotification({
			message: option.effects.description,
			type: 'success'
		});

		setCurrentEvent(null);
	};

	const getUrgencyColor = (level: number) => {
		switch (level) {
			case 1: return 'text-blue-400 border-blue-500/30';
			case 2: return 'text-green-400 border-green-500/30';
			case 3: return 'text-yellow-400 border-yellow-500/30';
			case 4: return 'text-orange-400 border-orange-500/30';
			case 5: return 'text-red-400 border-red-500/30';
			default: return 'text-purple-400 border-purple-500/30';
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 rounded-lg border border-purple-500/30">
			{/* Header */}
			<div className="text-center mb-6">
				<div className="flex items-center justify-center gap-3 mb-3">
					<AlertTriangle className="w-8 h-8 text-purple-400" />
					<h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
						EVENTOS POLÍTICOS ESTRATÉGICOS
					</h2>
					<Building className="w-8 h-8 text-purple-400" />
				</div>
				<p className="text-purple-300">
					🏛️ Decisiones importantes que moldean el destino del país (sin prisa)
				</p>
			</div>

			{/* Métricas actuales */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-black/20 rounded-lg border border-purple-500/20">
				<div className="text-center">
					<div className="text-sm text-purple-300 mb-1">Popularidad</div>
					<div className="text-2xl font-bold text-white">{metrics.popularidad}%</div>
				</div>
				<div className="text-center">
					<div className="text-sm text-purple-300 mb-1">Economía</div>
					<div className="text-2xl font-bold text-white">{metrics.economia}%</div>
				</div>
				<div className="text-center">
					<div className="text-sm text-purple-300 mb-1">Dólar Blue</div>
					<div className="text-2xl font-bold text-white">${metrics.dolarBlue}</div>
				</div>
				<div className="text-center">
					<div className="text-sm text-purple-300 mb-1">Caos</div>
					<div className="text-2xl font-bold text-white">{metrics.caos}%</div>
				</div>
			</div>

			{!currentEvent ? (
				/* No hay evento activo */
				<div className="text-center py-12">
					<div className="mb-8">
						<h3 className="text-2xl font-bold text-purple-300 mb-4">
							🎯 ¿Listo para tomar decisiones políticas importantes?
						</h3>
						<p className="text-purple-400 mb-2">
							• Eventos que requieren análisis y estrategia
						</p>
						<p className="text-purple-400 mb-2">
							• Sin presión de tiempo - decidí cuando quieras
						</p>
						<p className="text-purple-400 mb-6">
							• Cada decisión tiene consecuencias a largo plazo
						</p>
					</div>

					<button
						onClick={generateRandomEvent}
						className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700
								 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105
								 shadow-lg shadow-purple-500/25"
					>
						🎲 GENERAR EVENTO POLÍTICO
					</button>
				</div>
			) : (
				/* Evento activo */
				<div className="space-y-6">
					{/* Información del evento */}
					<div className={`p-6 rounded-lg border-2 ${getUrgencyColor(currentEvent.urgencyLevel)} bg-black/30`}>
						<div className="flex items-start justify-between mb-4">
							<div>
								<h3 className="text-2xl font-bold text-white mb-2">{currentEvent.title}</h3>
								<div className="flex items-center gap-4 text-sm">
									<span className={`px-3 py-1 rounded-full border ${getUrgencyColor(currentEvent.urgencyLevel)}`}>
										{currentEvent.category}
									</span>
									{currentEvent.province && (
										<span className="text-purple-300">📍 {currentEvent.province}</span>
									)}
									<span className="text-purple-300">
										🔥 Urgencia: {currentEvent.urgencyLevel}/5
									</span>
								</div>
							</div>
						</div>

						<p className="text-purple-100 text-lg leading-relaxed">
							{currentEvent.description}
						</p>
					</div>

					{/* Opciones de decisión */}
					<div>
						<h4 className="text-xl font-bold text-purple-300 mb-4">
							🤔 ¿Qué decisión tomás? (Pensalo bien...)
						</h4>
						<div className="space-y-4">
							{currentEvent.options.map((option, index) => (
								<button
									key={index}
									onClick={() => handleDecision(index)}
									className="w-full p-6 text-left bg-gradient-to-r from-purple-700/50 to-purple-600/50
											 hover:from-purple-600/70 hover:to-purple-500/70 border border-purple-500/30
											 rounded-lg transition-all duration-200 transform hover:scale-[1.02] text-white"
								>
									<div className="flex items-start gap-4">
										<span className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
											{index + 1}
										</span>
										<div>
											<div className="text-lg font-medium mb-2">{option.text}</div>
											<div className="text-sm text-purple-300">
												💡 Posibles consecuencias: {option.effects.description}
											</div>
										</div>
									</div>
								</button>
							))}
						</div>
					</div>

					<div className="text-center">
						<button
							onClick={() => setCurrentEvent(null)}
							className="px-6 py-2 bg-gray-600/20 hover:bg-gray-600/30 border border-gray-500/30
									 text-gray-300 rounded-lg transition-all duration-200"
						>
							🚪 Postergar Decisión
						</button>
					</div>
				</div>
			)}

			{/* Historial */}
			{eventHistory.length > 0 && (
				<div className="mt-8 p-4 bg-black/20 rounded-lg border border-purple-500/20">
					<h4 className="text-lg font-bold text-purple-300 mb-4">
						📚 Historial de Decisiones ({eventHistory.length})
					</h4>
					<div className="space-y-3 max-h-60 overflow-y-auto">
						{eventHistory.slice(-5).reverse().map((entry, index) => (
							<div key={index} className="p-3 bg-purple-900/30 rounded border border-purple-500/20">
								<div className="text-sm text-purple-300 mb-1">
									{entry.timestamp.toLocaleTimeString()} - {entry.event}
								</div>
								<div className="text-xs text-purple-400 mb-1">
									Decisión: {entry.decision}
								</div>
								<div className="text-xs text-green-400">
									Resultado: {entry.effects}
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Notificaciones */}
			{notification && (
				<EventNotification
					title="Eventos Políticos"
					message={notification.message}
					type={notification.type === 'success' ? 'Oportunidad' : 'Crisis'}
					urgencyLevel={3}
					onClose={() => setNotification(null)}
					autoCloseAfter={4000}
					position="bottom"
					compact={true}
				/>
			)}
		</div>
	);
};

export default PoliticalEventSimulator;
