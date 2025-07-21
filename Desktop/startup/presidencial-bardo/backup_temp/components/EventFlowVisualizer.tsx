"use client";

import {
    BookOpen,
    Box,
    ChevronDown,
    Clock,
    Eye,
    FileText,
    Filter,
    GitBranch,
    GitMerge,
    Link as LinkIcon,
    List,
    Monitor,
    Puzzle,
    Search,
    Target,
    Zap
} from 'lucide-react';
import { useMemo, useState } from 'react';

import { ALL_POLITICAL_EVENTS } from '@/data/events/politicalEvents';
import {
    EventCategory,
    EventChoice,
    EventType,
    MetricType,
    PoliticalEvent
} from '@/types/political';

interface EventNode {
	event: PoliticalEvent;
	connections: {
		triggers: string[];
		triggeredBy: string[];
		blocks: string[];
		blockedBy: string[];
	};
	chains: string[];
}

interface EventFlowVisualizerProps {
	events?: PoliticalEvent[];
}

const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string | number, color: string }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-5 flex flex-col items-start shadow-lg hover:bg-gray-700/50 transition-colors duration-300">
    <div className={`mb-3 rounded-full p-2 bg-gray-700/50`}>{icon}</div>
    <p className="text-3xl font-bold text-white mb-1">{value}</p>
    <p className="text-sm text-gray-400">{label}</p>
  </div>
);

const CustomSelect = ({ value, onChange, options, placeholder, icon }: { value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: { value: string, label: string }[], placeholder: string, icon: React.ReactNode }) => (
	<div className="relative bg-gray-800 border border-gray-700 rounded-md shadow-sm">
		<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
			{icon}
		</div>
		<select
			value={value}
			onChange={onChange}
			className="form-select block w-full appearance-none rounded-md bg-transparent py-2 pl-10 pr-10 text-sm text-gray-300 transition focus:border-blue-500 focus:outline-none focus:ring-blue-500"
		>
			<option value="ALL" className="bg-gray-800">{placeholder}</option>
			{options.map(opt => <option key={opt.value} value={opt.value} className="bg-gray-800">{opt.label}</option>)}
		</select>
		<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
			<ChevronDown className="h-4 w-4 text-gray-500" />
		</div>
	</div>
);

export function EventFlowVisualizerSimple({ events = ALL_POLITICAL_EVENTS }: EventFlowVisualizerProps) {
	const [selectedEvent, setSelectedEvent] = useState<PoliticalEvent | null>(null);
	const [selectedChoice, setSelectedChoice] = useState<EventChoice | null>(null);
	const [filterCategory, setFilterCategory] = useState<EventCategory | 'ALL'>('ALL');
	const [filterType, setFilterType] = useState<EventType | 'ALL'>('ALL');
	const [searchTerm, setSearchTerm] = useState('');
	const [activeTab, setActiveTab] = useState<'events' | 'chains' | 'analysis'>('events');

	// Crear mapa de nodos con conexiones
	const eventNodes = useMemo(() => {
		const nodes: Record<string, EventNode> = {};

		events.forEach(event => {
			nodes[event.id] = {
				event,
				connections: {
					triggers: [],
					triggeredBy: [],
					blocks: [],
					blockedBy: []
				},
				chains: []
			};
		});

		// Analizar conexiones
		events.forEach(event => {
			const node = nodes[event.id];

			// Eventos que este evento puede desencadenar
			event.choices.forEach(choice => {
				choice.triggeredEvents?.forEach(triggeredId => {
					if (nodes[triggeredId]) {
						node.connections.triggers.push(triggeredId);
						nodes[triggeredId].connections.triggeredBy.push(event.id);
					}
				});
			});

			// Eventos prerequisito
			event.trigger.completedEvents?.forEach(requiredId => {
				if (nodes[requiredId]) {
					node.connections.triggeredBy.push(requiredId);
					nodes[requiredId].connections.triggers.push(event.id);
				}
			});

			// Eventos bloqueantes
			event.trigger.blockingEvents?.forEach(blockingId => {
				if (nodes[blockingId]) {
					node.connections.blockedBy.push(blockingId);
					nodes[blockingId].connections.blocks.push(event.id);
				}
			});

			// Detectar cadenas
			const eventId = event.id;
			if (eventId.includes('dolar')) node.chains.push('Cadena del Dólar');
			if (eventId.includes('piquete')) node.chains.push('Cadena de Piquetes');
			if (eventId.includes('futbol')) node.chains.push('Cadena del Fútbol');
			if (eventId.includes('provincial')) node.chains.push('Cadena Provincial');
		});

		return nodes;
	}, [events]);

	// Filtrar eventos
	const filteredEvents = useMemo(() => {
		return events.filter(event => {
			const matchesCategory = filterCategory === 'ALL' || event.category === filterCategory;
			const matchesType = filterType === 'ALL' || event.type === filterType;
			const matchesSearch = searchTerm === '' ||
				event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				event.description.toLowerCase().includes(searchTerm.toLowerCase());

			return matchesCategory && matchesType && matchesSearch;
		});
	}, [events, filterCategory, filterType, searchTerm]);

	const stats = useMemo(() => {
		const totalEvents = events.length;
		const totalChoices = events.reduce((acc, event) => acc + event.choices.length, 0);
		const eventsWithConnections = Object.values(eventNodes).filter(node =>
			node.connections.triggers.length > 0 || node.connections.triggeredBy.length > 0
		).length;
		const totalChains = new Set(Object.values(eventNodes).flatMap(node => node.chains)).size;

		return {
			totalEvents,
			totalChoices,
			eventsWithConnections,
			totalChains,
		};
	}, [events, eventNodes]);

	const getEventTypeColor = (type: EventType) => {
		const colors = {
			[EventType.CRISIS]: 'bg-red-500/20 text-red-300 border border-red-500/30',
			[EventType.OPORTUNIDAD]: 'bg-green-500/20 text-green-300 border border-green-500/30',
			[EventType.DECISION]: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
			[EventType.EMERGENCIA]: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
			[EventType.HUMOR_NEGRO]: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
			[EventType.CONFLICTO_FACCIONES]: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
			[EventType.CONSECUENCIA]: 'bg-gray-500/20 text-gray-300 border border-gray-500/30',
    };
		return colors[type] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
	};

	const getEventCategoryColor = (category: EventCategory) => {
		const colors = {
			[EventCategory.ECONOMICO]: 'bg-green-900/50 text-green-300 border border-green-500/30',
			[EventCategory.SOCIAL]: 'bg-blue-900/50 text-blue-300 border border-blue-500/30',
			[EventCategory.INTERNACIONAL]: 'bg-indigo-900/50 text-indigo-300 border border-indigo-500/30',
			[EventCategory.SEGURIDAD]: 'bg-red-900/50 text-red-300 border border-red-500/30',
			[EventCategory.CORRUPCION]: 'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30',
			[EventCategory.DEPORTIVO]: 'bg-orange-900/50 text-orange-300 border border-orange-500/30',
			[EventCategory.CULTURAL]: 'bg-pink-900/50 text-pink-300 border border-pink-500/30',
			[EventCategory.PROVINCIAL]: 'bg-purple-900/50 text-purple-300 border border-purple-500/30',
    };
		return colors[category] || 'bg-gray-900/50 text-gray-300 border-gray-500/30';
	};

	const getMetricIcon = (metric: MetricType) => {
    switch (metric) {
      case MetricType.POPULARIDAD: return '👥';
      case MetricType.ECONOMIA: return '💰';
      case MetricType.SEGURIDAD: return '🛡️';
      case MetricType.RELACIONES_INTERNACIONALES: return '🌍';
      case MetricType.CORRUPCION: return '🕵️';
      case MetricType.CONTROL_MEDIOS: return '📺';
      default: return '📊';
    }
  };

  const renderEventCard = (event: PoliticalEvent) => {
    const node = eventNodes[event.id];

    return (
		<div
			key={event.id}
				className={`bg-gray-800/50 border border-gray-700 rounded-lg p-4 transition-all duration-200 cursor-pointer hover:bg-gray-700/80 shadow-lg ${
					selectedEvent?.id === event.id ? 'ring-2 ring-blue-500 shadow-blue-500/30' : 'hover:border-gray-500'
			}`}
			onClick={() => setSelectedEvent(event)}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						setSelectedEvent(event);
					}
				}}
			tabIndex={0}
				role="button"
				aria-pressed={selectedEvent?.id === event.id}
			aria-label={`Seleccionar evento: ${event.title}`}
		>
				<div className="flex justify-between items-start mb-2">
					<div className="flex-grow">
						<div className="flex items-center gap-2 mb-2 flex-wrap">
							<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getEventCategoryColor(event.category)}`}>
					{event.category}
				</span>
							<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-700 text-gray-300">
                Urgencia {event.urgency}
				</span>
			</div>
						<h3 className="text-md font-semibold text-gray-100">{event.title}</h3>
          </div>
					<div className="text-3xl ml-4 flex-shrink-0">{event.icon}</div>
        </div>

				<p className="text-sm text-gray-400 mb-4 line-clamp-3">
          {event.description}
        </p>

				<div className="flex flex-wrap gap-2 text-xs">
					<span className="flex items-center gap-1.5 bg-gray-700/50 border border-gray-600 px-2 py-1 rounded-full text-gray-300">
						<Puzzle className="w-3 h-3" />
            {event.choices.length} opciones
          </span>
          {event.timeLimit && (
						<span className="flex items-center gap-1.5 bg-gray-700/50 border border-gray-600 px-2 py-1 rounded-full text-gray-300">
							<Clock className="w-3 h-3" />
              {event.timeLimit}s
            </span>
          )}
          {node.chains.length > 0 && (
						<span className="flex items-center gap-1.5 bg-purple-500/20 border border-purple-500/30 px-2 py-1 rounded-full text-purple-300">
							<LinkIcon className="w-3 h-3" />
							En Cadena
            </span>
          )}
        </div>
		</div>
	);
  };

	const renderEventDetails = (event: PoliticalEvent) => {
		const node = eventNodes[event.id];

		return (
			<div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 sticky top-24 h-[calc(100vh-12rem)] overflow-y-auto shadow-xl">
				<div className="flex justify-between items-start mb-4">
				<div>
						<h2 className="text-2xl font-bold text-white mb-1">{event.title}</h2>
						<div className="flex items-center gap-2 flex-wrap">
							<span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getEventCategoryColor(event.category)}`}>
									{event.category}
								</span>
							<span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getEventTypeColor(event.type)}`}>
                  {event.type}
                </span>
							<span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-gray-700 text-gray-300">
								Urgencia: {event.urgency}
								</span>
							</div>
						</div>
					<div className="text-5xl">{event.icon}</div>
				</div>

				<p className="text-gray-400 mb-6">{event.description}</p>

				<div>
					<h3 className="text-lg font-semibold text-gray-200 mb-3 border-b border-gray-700 pb-2">Decisiones Posibles</h3>
					<div className="space-y-4">
						{event.choices.map((choice, index) => (
							<div key={index}
								 className={`bg-gray-900/50 border border-gray-700 p-4 rounded-lg cursor-pointer transition hover:bg-gray-700/70 ${selectedChoice === choice ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedChoice(choice)}
              >
								<p className="font-semibold text-gray-200">{choice.text}</p>
								<div className="text-sm text-gray-400 mt-2">
									{choice.effects?.map((effect, i) => (
										<div key={i} className="flex items-center gap-2">
                          <span>{getMetricIcon(effect.type)}</span>
											<span>{effect.change > 0 ? '+' : ''}{effect.change} en {effect.type}</span>
													</div>
												))}
											</div>
                {choice.triggeredEvents && choice.triggeredEvents.length > 0 && (
									<div className="mt-2 text-xs text-blue-400 flex items-center gap-1">
										<Zap className="w-3 h-3" />
										Desencadena: {choice.triggeredEvents.join(', ')}
										</div>
									)}
														</div>
													))}
												</div>
											</div>
								</div>
		)
	}

	const renderEmptyState = () => (
		<div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-gray-800/50 border border-gray-700 rounded-lg sticky top-24">
			<Eye className="w-24 h-24 text-gray-600 mb-6" />
			<h2 className="text-2xl font-bold text-gray-200 mb-2">Detalles del Evento</h2>
			<p className="text-gray-400 max-w-sm">
				Selecciona un evento de la lista de la izquierda para ver sus detalles, conexiones y posibles consecuencias.
			</p>
			</div>
		);

	const categoryOptions = Object.values(EventCategory).map(c => ({ value: c, label: c }));
	const typeOptions = Object.values(EventType).map(t => ({ value: t, label: t }));

	return (
		<div className="bg-gray-900 text-gray-200 min-h-screen p-4 sm:p-6 lg:p-8">
			<div className="max-w-screen-2xl mx-auto">
				{/* Header */}
			<header className="mb-8">
					<div className="flex items-center gap-4 mb-2">
						<div className="bg-blue-600/20 p-3 rounded-lg border border-blue-500/30">
							<Monitor className="h-8 w-8 text-blue-400" />
				</div>
					<div>
							<h1 className="text-3xl font-bold text-white tracking-tight">Visualizador de Eventos Políticos</h1>
							<p className="text-gray-400 mt-1 max-w-2xl">
								Explora el flujo completo de decisiones políticas y sus consecuencias en Presidencial Bardo.
        </p>
					</div>
				</div>
				</header>

				{/* Stats */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
					<StatCard icon={<List className="h-6 w-6 text-blue-400" />} label="Eventos Totales" value={stats.totalEvents} color="blue" />
					<StatCard icon={<Puzzle className="h-6 w-6 text-green-400" />} label="Decisiones Posibles" value={stats.totalChoices} color="green" />
					<StatCard icon={<GitMerge className="h-6 w-6 text-purple-400" />} label="Eventos Conectados" value={stats.eventsWithConnections} color="purple" />
					<StatCard icon={<GitBranch className="h-6 w-6 text-yellow-400" />} label="Eventos en Cadenas" value={stats.totalChains} color="yellow" />
			</div>

				<div className="bg-gray-800/30 border border-gray-700 rounded-xl p-1.5 mb-6 backdrop-blur-sm">
					<div className="flex items-center border-b border-gray-700 px-2">
					<button
							className={`px-4 py-2.5 text-sm font-medium flex items-center gap-2 ${activeTab === 'events' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('events')}
          >
							<FileText className="w-4 h-4" />
						Eventos
					</button>
					<button
							className={`px-4 py-2.5 text-sm font-medium flex items-center gap-2 ${activeTab === 'chains' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
						onClick={() => setActiveTab('chains')}
					>
							<LinkIcon className="w-4 h-4" />
							Cadenas
					</button>
					<button
							className={`px-4 py-2.5 text-sm font-medium flex items-center gap-2 ${activeTab === 'analysis' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
						onClick={() => setActiveTab('analysis')}
					>
							<BookOpen className="w-4 h-4" />
							Análisis
					</button>
				</div>

					<div className="p-4">
						{/* Filters */}
						<div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
							<div className="flex items-center gap-2 text-sm font-medium text-gray-300">
								<Filter className="w-5 h-5" />
								<span>Filtros:</span>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
								<CustomSelect
									icon={<Box className="h-4 w-4 text-gray-500" />}
								value={filterCategory}
									onChange={(e) => setFilterCategory(e.target.value as any)}
									options={categoryOptions}
									placeholder="Todas las categorías"
								/>
								<CustomSelect
									icon={<Target className="h-4 w-4 text-gray-500" />}
								value={filterType}
									onChange={(e) => setFilterType(e.target.value as any)}
									options={typeOptions}
									placeholder="Todos los tipos"
								/>
								<div className="relative">
									<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
								<input
									type="text"
									placeholder="Buscar eventos..."
									value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
										className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 pl-10 pr-4 text-sm text-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                />
									</div>
								</div>
							</div>

						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							{/* Events List */}
							<div className="lg:col-span-1 space-y-4 h-[calc(100vh-26rem)] overflow-y-auto pr-2 -mr-2">
								<h2 className="text-xl font-semibold text-gray-200 px-1">Eventos ({filteredEvents.length})</h2>
								{filteredEvents.map(renderEventCard)}
							</div>

							{/* Event Details */}
							<div className="lg:col-span-2">
								{selectedEvent ? renderEventDetails(selectedEvent) : renderEmptyState()}
										</div>
									</div>
								</div>
							</div>
			</div>
		</div>
	);
}
