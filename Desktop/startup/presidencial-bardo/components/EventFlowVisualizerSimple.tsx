"use client";

import {
    ArrowRight,
    Book,
    Clock,
    Eye,
    Filter,
    Link,
    MapPin,
    Search,
    Target,
} from "lucide-react";
import { useMemo, useState } from "react";

import { ADVANCED_EVENTS, CHAINED_EVENTS } from '@/data/events';
import { EventChainDiagram } from './EventChainDiagram';

import { PROVINCE_NAMES } from '@/constants/provinces';
import {
    EventCategory,
    EventChoice,
    EventType,
    MetricType,
    PoliticalEvent
} from "@/types/political";

interface EventNode {
  event: PoliticalEvent;
  connections: {
    triggers: string[];
    triggeredBy: string[];
    blocks: string[];
    blockedBy: string[];
  };
  isChained: boolean;
}

interface EventFlowVisualizerProps {
  events?: PoliticalEvent[];
}

export function EventFlowVisualizerSimple({ events = ADVANCED_EVENTS }: EventFlowVisualizerProps) {
  const [selectedEvent, setSelectedEvent] = useState<PoliticalEvent | null>(
    null,
  );
  const [selectedChoice, setSelectedChoice] = useState<EventChoice | null>(null);
  const [filterCategory, setFilterCategory] = useState<EventCategory | 'ALL'>('ALL');
  const [filterType, setFilterType] = useState<EventType | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<"events" | "chains" | "analysis">(
    "events",
  );

  const chainedEventIds = useMemo(() => new Set(CHAINED_EVENTS.map(e => e.id)), []);

  // Filtrar eventos en cadena que están en los eventos avanzados
  const advancedChainedEvents = useMemo(() => {
    const advancedEventIds = new Set(events.map(e => e.id));
    return CHAINED_EVENTS.filter(event => advancedEventIds.has(event.id));
  }, [events]);

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
        isChained: chainedEventIds.has(event.id),
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

      event.trigger.requiredChoices?.forEach(req => {
        if (nodes[req.eventId]) {
            node.connections.triggeredBy.push(req.eventId);
            nodes[req.eventId].connections.triggers.push(event.id);
        }
      });

      // Eventos bloqueantes
      event.trigger.blockingEvents?.forEach(blockingId => {
        if (nodes[blockingId]) {
          node.connections.blockedBy.push(blockingId);
          nodes[blockingId].connections.blocks.push(event.id);
        }
      });
    });

    return nodes;
  }, [events, chainedEventIds]);

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

  // Obtener estadísticas
  const stats = useMemo(() => {
    const totalEvents = events.length;
    const eventsByCategory = events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {} as Record<EventCategory, number>);

    const eventsByType = events.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {} as Record<EventType, number>);

    const totalChoices = events.reduce((acc, event) => acc + event.choices.length, 0);
    const eventsWithConnections = Object.values(eventNodes).filter(node =>
      node.connections.triggers.length > 0 || node.connections.triggeredBy.length > 0
    ).length;

    const eventsInChains = Object.values(eventNodes).filter(node => node.isChained).length;

    return {
      totalEvents,
      totalChoices,
      eventsWithConnections,
      eventsByCategory,
      eventsByType,
      eventsInChains
    };
  }, [events, eventNodes]);

  const getEventTypeColor = (type: EventType) => {
    const colors = {
      [EventType.CRISIS]: 'bg-red-500',
      [EventType.OPORTUNIDAD]: 'bg-green-500',
      [EventType.DECISION]: 'bg-blue-500',
      [EventType.EMERGENCIA]: 'bg-orange-500',
      [EventType.HUMOR_NEGRO]: 'bg-purple-500',
      [EventType.CONFLICTO_FACCIONES]: 'bg-yellow-500',
      [EventType.CONSECUENCIA]: 'bg-gray-500',
    };
    return colors[type] || 'bg-gray-500';
  };

  const getEventCategoryColor = (category: EventCategory) => {
    const colors = {
      [EventCategory.ECONOMICO]: 'bg-green-100 text-green-800',
      [EventCategory.SOCIAL]: 'bg-blue-100 text-blue-800',
      [EventCategory.INTERNACIONAL]: 'bg-purple-100 text-purple-800',
      [EventCategory.SEGURIDAD]: 'bg-red-100 text-red-800',
      [EventCategory.CORRUPCION]: 'bg-yellow-900/50 text-yellow-200 border-yellow-700',
      [EventCategory.DEPORTIVO]: 'bg-orange-900/50 text-orange-200 border-orange-700',
      [EventCategory.CULTURAL]: 'bg-pink-900/50 text-pink-200 border-pink-700',
      [EventCategory.PROVINCIAL]: 'bg-indigo-900/50 text-indigo-200 border-indigo-700',
    };
    return colors[category] || 'bg-gray-700 text-gray-200 border-gray-600';
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
        className={`bg-slate-800/80 rounded-lg border border-slate-700 shadow-sm cursor-pointer transition-all hover:shadow-lg hover:border-blue-500 p-4 ${
          selectedEvent?.id === event.id ? "ring-2 ring-blue-500 border-blue-500" : ""
        }`}
        onClick={() => setSelectedEvent(event)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`}
              />
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${getEventCategoryColor(event.category)}`}
              >
                {event.category}
              </span>
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-700 text-gray-200 border border-gray-600">
                Urgencia {event.urgency}
              </span>
              {event.provinceId && (
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-indigo-900/50 text-indigo-200 border border-indigo-700">
                  <MapPin className="w-3 h-3 mr-1" />
                  {PROVINCE_NAMES[event.provinceId]}
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-slate-100">{event.title}</h3>
          </div>
          <div className="text-2xl">{event.icon}</div>
        </div>

        <p className="text-sm text-slate-400 mb-3 line-clamp-3">
          {event.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-gray-600 text-gray-300">
            {event.choices.length} opciones
          </span>
          {event.timeLimit && (
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-gray-600 text-gray-300">
              <Clock className="w-3 h-3 mr-1" />
              {event.timeLimit}s
            </span>
          )}
          {node.isChained && (
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-900/50 border border-purple-700 text-purple-200">
              <Link className="w-3 h-3 mr-1" />
              En Cadena
            </span>
          )}
        </div>

        <div className="text-xs text-slate-500 space-y-1">
          {node.connections.triggeredBy.length > 0 && (
            <div>
              ← Activado por: {node.connections.triggeredBy.length} eventos
            </div>
          )}
          {node.connections.triggers.length > 0 && (
            <div>
              → Puede activar: {node.connections.triggers.length} eventos
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderEventDetails = (event: PoliticalEvent) => {
    if (!event) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-700">
          <Eye className="w-16 h-16 text-slate-500 mb-4" />
          <h3 className="text-xl font-semibold text-slate-300">
            Selecciona un evento
          </h3>
          <p className="text-slate-400">
            Elige un evento de la lista para ver sus detalles, decisiones y
            consecuencias.
          </p>
        </div>
      );
    }

    const node = eventNodes[event.id];

    return (
      <div className="h-full p-6 bg-slate-800/80 rounded-lg border border-slate-700 overflow-y-auto">
        <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">{event.icon}</div>
            <div>
                <h2 className="text-2xl font-bold text-slate-100">{event.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getEventCategoryColor(event.category)}`}>
                  {event.category}
                </span>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-gray-300 text-gray-700">
                  {event.type}
                </span>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                  Urgencia {event.urgency}
                </span>
                 {node.isChained && (
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-900/50 border border-purple-700 text-purple-200">
                    <Link className="w-3 h-3 mr-1" />
                    En Cadena
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-4">{event.description}</p>

        </div>
          <div className="text-4xl">{event.icon}</div>
        </div>

        <div className="space-y-6">
        <div>
            <h4 className="font-semibold text-slate-200 mb-3 border-b border-slate-700 pb-2">
              Decisiones Posibles ({event.choices.length})
            </h4>
          <div className="space-y-4">
              {event.choices.map((choice) => (
              <div
                key={choice.id}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedChoice?.id === choice.id
                      ? "bg-blue-900/30 border-blue-700"
                      : "bg-slate-900/70 border-slate-700 hover:border-slate-500"
                }`}
                onClick={() => setSelectedChoice(choice)}
              >
                  <h5 className="font-semibold text-blue-300">{choice.text}</h5>
                  <p className="text-sm text-slate-400 mt-1">
                    {choice.description}
                  </p>
                {choice.effects && choice.effects.length > 0 && (
                    <div className="mt-3">
                      <h6 className="text-xs font-semibold text-slate-500 mb-2">
                        Efectos Inmediatos:
                      </h6>
                      <div className="flex flex-wrap gap-2">
                      {choice.effects.map((effect, i) => (
                          <div
                            key={i}
                            className="bg-slate-700/80 px-2 py-1 rounded-md text-xs"
                          >
                            <span className="mr-1">
                              {getMetricIcon(effect.type)}
                          </span>
                            <span className="font-mono">
                              {effect.change > 0 ? "+" : ""}
                              {effect.change}%
                            </span>{" "}
                            <span className="text-slate-400">
                              {effect.type}
                            </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

          <div>
            <h4 className="font-semibold text-slate-200 mb-3 border-b border-slate-700 pb-2">
              Condiciones de Activación
            </h4>
            <div className="space-y-3 text-sm">
                {event.trigger.probability && (
                    <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-slate-500" />
                        <span>Probabilidad de activación: <span className="font-semibold text-slate-300">{(event.trigger.probability * 100).toFixed(0)}%</span></span>
                    </div>
                )}
                 {event.provinceId && (
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span>Provincia específica: <span className="font-semibold text-slate-300">{PROVINCE_NAMES[event.provinceId]}</span></span>
                    </div>
                )}
                 {event.trigger.completedEvents && event.trigger.completedEvents.length > 0 && (
                    <div>
                        <h5 className="font-semibold text-slate-400 mt-2 mb-1">Eventos requeridos completados:</h5>
                        <div className="pl-4 flex flex-col gap-1">
                            {event.trigger.completedEvents.map(req => <span key={req} className="text-amber-400 font-mono text-xs">{req}</span>)}
                        </div>
                    </div>
                 )}
                {event.trigger.requiredChoices && event.trigger.requiredChoices.length > 0 && (
                    <div>
                        <h5 className="font-semibold text-slate-400 mt-2 mb-1">Decisiones previas requeridas:</h5>
                        <div className="pl-4 flex flex-col gap-1">
                            {event.trigger.requiredChoices.map(req => <span key={`${req.eventId}-${req.choiceId}`} className="text-amber-400 font-mono text-xs">{req.eventId} → {req.choiceId}</span>)}
                        </div>
                    </div>
                )}
                 {event.trigger.blockingEvents && event.trigger.blockingEvents.length > 0 && (
                    <div>
                        <h5 className="font-semibold text-slate-400 mt-2 mb-1">Eventos que lo bloquean:</h5>
                        <div className="pl-4 flex flex-col gap-1">
                            {event.trigger.blockingEvents.map(req => <span key={req} className="text-red-400 font-mono text-xs">{req}</span>)}
                        </div>
                    </div>
                 )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 mb-3 border-b border-slate-700 pb-2">
              Conexiones
            </h4>
            <div className="space-y-3 text-sm">
                {node.connections.triggers.length > 0 && (
                    <div>
                        <h5 className="font-semibold text-slate-400 mt-2 mb-1">Puede activar los siguientes eventos:</h5>
                        <div className="pl-4 flex flex-col gap-1">
                             {node.connections.triggers.map(eventId => (
                                 <button key={eventId} onClick={() => setSelectedEvent(events.find(e => e.id === eventId) || null)} className="text-left text-green-400 hover:text-green-300 font-mono text-xs">→ {eventId}</button>
                            ))}
                        </div>
                    </div>
                )}

                {node.connections.triggeredBy.length > 0 && (
                    <div>
                        <h5 className="font-semibold text-slate-400 mt-2 mb-1">Es activado por los siguientes eventos:</h5>
                        <div className="pl-4 flex flex-col gap-1">
                             {node.connections.triggeredBy.map(eventId => (
                                 <button key={eventId} onClick={() => setSelectedEvent(events.find(e => e.id === eventId) || null)} className="text-left text-blue-400 hover:text-blue-300 font-mono text-xs">← {eventId}</button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StatCard = ({ title, value, icon: Icon }: { title: string, value: string | number, icon: React.ElementType }) => (
    <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-4 flex items-center">
      <div className="p-3 rounded-full bg-slate-700 mr-4">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <div>
        <div className="text-3xl font-bold text-slate-100">{value}</div>
        <div className="text-sm text-slate-400">{title}</div>
      </div>
    </div>
  );


  return (
    <div className="w-full">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
          <Target className="w-8 h-8 text-blue-500" />
          Visualizador de Eventos Políticos
        </h2>
        <p className="text-slate-400 mt-2">
          Explora el flujo completo de decisiones políticas y sus consecuencias
          en Presidencial Bardo
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Eventos Totales" value={stats.totalEvents} icon={Book} />
        <StatCard title="Decisiones Posibles" value={stats.totalChoices} icon={ArrowRight} />
        <StatCard title="Eventos Conectados" value={stats.eventsWithConnections} icon={Link} />
        <StatCard title="Eventos en Cadenas" value={stats.eventsInChains} icon={Link} />

      </div>

      <div className="mb-4">
        <div className="flex border-b border-slate-700">
          <button
            className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
              activeTab === 'events'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('events')}
          >
            <Eye className="w-4 h-4"/> Eventos
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
              activeTab === 'chains'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('chains')}
          >
            <Link className="w-4 h-4" /> Cadenas
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
              activeTab === 'analysis'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('analysis')}
          >
            <Filter className="w-4 h-4" /> Análisis
          </button>
        </div>
        </div>

        {activeTab === 'events' && (
        <>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-6 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Filter className="w-5 h-5" /> Filtros:
              </div>
            {/* Categoría */}
              <select
                value={filterCategory}
              onChange={(e) =>
                setFilterCategory(e.target.value as EventCategory | "ALL")
              }
              className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="ALL">Todas las categorías</option>
              {Object.values(EventCategory).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
                ))}
              </select>
            {/* Tipo */}
              <select
                value={filterType}
              onChange={(e) => setFilterType(e.target.value as EventType | "ALL")}
              className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="ALL">Todos los tipos</option>
              {Object.values(EventType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
                ))}
              </select>
            {/* Búsqueda */}
            <div className="relative flex-grow">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md pl-10 pr-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4 h-[70vh] overflow-y-auto pr-2">
              <h3 className="text-xl font-semibold text-slate-200">Eventos ({filteredEvents.length})</h3>
              {filteredEvents.map(renderEventCard)}
                </div>
            <div className="lg:col-span-2 h-[70vh] overflow-y-auto">
              {selectedEvent && renderEventDetails(selectedEvent)}
            </div>
          </div>
        </>
        )}

        {activeTab === 'chains' && (
        <div className="h-[80vh] overflow-y-auto">
          <EventChainDiagram events={advancedChainedEvents} title="Eventos en Cadena (Sin Políticos Clásicos)" />
        </div>
        )}
        {activeTab === 'analysis' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-4">Distribución por Categorías</h3>
                  <div className="space-y-3">
                    {Object.entries(stats.eventsByCategory).map(([category, count]) => (
                          <div key={category} className="flex items-center justify-between text-sm">
                              <span className="text-slate-300">{category}</span>
                              <div className="flex items-center gap-3">
                                  <div className="w-24 bg-slate-700 rounded-full h-2.5">
                            <div
                                          className="bg-blue-500 h-2.5 rounded-full"
                              style={{ width: `${(count / stats.totalEvents) * 100}%` }}
                            />
                          </div>
                                  <span className="font-medium text-slate-200 w-8 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-4">Distribución por Tipos</h3>
                  <div className="space-y-3">
                    {Object.entries(stats.eventsByType).map(([type, count]) => (
                          <div key={type} className="flex items-center justify-between text-sm">
                              <span className="text-slate-300">{type}</span>
                              <div className="flex items-center gap-3">
                                  <div className="w-24 bg-slate-700 rounded-full h-2.5">
                            <div
                                          className={`${getEventTypeColor(type as EventType)} h-2.5 rounded-full`}
                              style={{ width: `${(count / stats.totalEvents) * 100}%` }}
                            />
                          </div>
                                  <span className="font-medium text-slate-200 w-8 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

    </div>
  );
}
