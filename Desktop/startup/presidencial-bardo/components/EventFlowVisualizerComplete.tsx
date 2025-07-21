"use client";

import {
    ArrowRight,
    Clock,
    Eye,
    Filter,
    Link,
    Search,
    Target
} from 'lucide-react';
import React, { useMemo, useState } from 'react';

import { ALL_POLITICAL_EVENTS } from '@/data/politicalEvents';
import {
    EventCategory,
    EventChoice,
    EventType,
    MetricType,
    PoliticalEvent
} from '@/types/political';

// Componentes UI simples sin dependencias externas
const Card = ({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <div className={`bg-white rounded-lg border shadow-sm ${className}`} onClick={onClick}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = "default", className = "" }: { children: React.ReactNode; variant?: string; className?: string }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
    variant === "outline" ? "border border-gray-300 text-gray-700" :
    variant === "secondary" ? "bg-gray-100 text-gray-800" :
    "bg-blue-100 text-blue-800"
  } ${className}`}>
    {children}
  </span>
);

const Button = ({ children, variant = "default", size = "default", onClick, className = "" }: {
  children: React.ReactNode;
  variant?: string;
  size?: string;
  onClick?: () => void;
  className?: string;
}) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
      variant === "outline" ? "border border-gray-300 bg-white hover:bg-gray-50" :
      "bg-blue-600 text-white hover:bg-blue-700"
    } ${
      size === "sm" ? "h-8 px-3 text-xs" : "h-10 px-4 py-2"
    } ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const ScrollArea = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`overflow-auto ${className}`}>
    {children}
  </div>
);

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

export function EventFlowVisualizerComplete({ events = ALL_POLITICAL_EVENTS }: EventFlowVisualizerProps) {
  const [selectedEvent, setSelectedEvent] = useState<PoliticalEvent | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<EventChoice | null>(null);
  const [filterCategory, setFilterCategory] = useState<EventCategory | 'ALL'>('ALL');
  const [filterType, setFilterType] = useState<EventType | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showConnections, setShowConnections] = useState(true);
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

    return {
      totalEvents,
      totalChoices,
      eventsWithConnections,
      eventsByCategory,
      eventsByType
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
      [EventCategory.CORRUPCION]: 'bg-yellow-100 text-yellow-800',
      [EventCategory.DEPORTIVO]: 'bg-orange-100 text-orange-800',
      [EventCategory.CULTURAL]: 'bg-pink-100 text-pink-800',
      [EventCategory.PROVINCIAL]: 'bg-indigo-100 text-indigo-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
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
      <Card
        key={event.id}
        className={`cursor-pointer transition-all hover:shadow-lg ${
          selectedEvent?.id === event.id ? 'ring-2 ring-blue-500' : ''
        }`}
        onClick={() => setSelectedEvent(event)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`} />
                <Badge variant="outline" className={getEventCategoryColor(event.category)}>
                  {event.category}
                </Badge>
                <Badge variant="secondary">
                  Urgencia {event.urgency}
                </Badge>
              </div>
              <CardTitle className="text-lg">{event.title}</CardTitle>
            </div>
            <div className="text-2xl">{event.icon}</div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {event.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline" className="text-xs">
              {event.choices.length} opciones
            </Badge>
            {event.timeLimit && (
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {event.timeLimit}s
              </Badge>
            )}
            {node.chains.length > 0 && (
              <Badge variant="outline" className="text-xs bg-purple-50">
                <Link className="w-3 h-3 mr-1" />
                Cadena
              </Badge>
            )}
          </div>

          {showConnections && (
            <div className="text-xs text-gray-500 space-y-1">
              {node.connections.triggeredBy.length > 0 && (
                <div>← Activado por: {node.connections.triggeredBy.length} eventos</div>
              )}
              {node.connections.triggers.length > 0 && (
                <div>→ Puede activar: {node.connections.triggers.length} eventos</div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderEventDetails = (event: PoliticalEvent) => {
    const node = eventNodes[event.id];

    return (
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">{event.icon}</div>
            <div>
              <h2 className="text-2xl font-bold">{event.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={getEventCategoryColor(event.category)}>
                  {event.category}
                </Badge>
                <Badge variant="outline">
                  {event.type}
                </Badge>
                <Badge variant="secondary">
                  Urgencia {event.urgency}
                </Badge>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-4">{event.description}</p>

          {node.chains.length > 0 && (
            <div className="bg-purple-50 p-3 rounded-lg mb-4">
              <h4 className="font-semibold text-purple-800 mb-2">Parte de cadenas:</h4>
              <div className="flex flex-wrap gap-2">
                {node.chains.map(chain => (
                  <Badge key={chain} variant="outline" className="bg-purple-100">
                    {chain}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Condiciones de activación */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Condiciones de Activación</h3>
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            {event.trigger.probability && (
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Probabilidad: {(event.trigger.probability * 100).toFixed(0)}%</span>
              </div>
            )}

            {event.trigger.requiredMetrics && (
              <div>
                <h4 className="font-medium mb-2">Métricas requeridas:</h4>
                <div className="space-y-1">
                  {Object.entries(event.trigger.requiredMetrics).map(([metric, req]) => (
                    <div key={metric} className="flex items-center gap-2 text-sm">
                      <span>{getMetricIcon(metric as MetricType)}</span>
                      <span>{metric}:</span>
                      {req.min && <span>≥ {req.min}</span>}
                      {req.max && <span>≤ {req.max}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {event.trigger.completedEvents && event.trigger.completedEvents.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Eventos prerequisito:</h4>
                <div className="space-y-1">
                  {event.trigger.completedEvents.map(eventId => (
                    <div key={eventId} className="text-sm text-blue-600">
                      → {eventId}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {event.trigger.blockingEvents && event.trigger.blockingEvents.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Eventos bloqueantes:</h4>
                <div className="space-y-1">
                  {event.trigger.blockingEvents.map(eventId => (
                    <div key={eventId} className="text-sm text-red-600">
                      ✗ {eventId}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Opciones de decisión */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Opciones de Decisión</h3>
          <div className="space-y-4">
            {event.choices.map((choice, index) => (
              <Card
                key={choice.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedChoice?.id === choice.id ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={() => setSelectedChoice(choice)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-lg">{choice.text}</h4>
                    <Badge variant="outline">Opción {index + 1}</Badge>
                  </div>

                  <p className="text-gray-600 mb-3">{choice.description}</p>

                  {choice.effects && choice.effects.length > 0 && (
                    <div className="mb-3">
                      <h5 className="font-medium text-sm mb-2">Efectos en métricas:</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {choice.effects.map((effect, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <span>{getMetricIcon(effect.type)}</span>
                            <span className={effect.change > 0 ? 'text-green-600' : 'text-red-600'}>
                              {effect.change > 0 ? '+' : ''}{effect.change}
                            </span>
                            <span className="text-gray-600">{effect.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {choice.factionEffects && choice.factionEffects.length > 0 && (
                    <div className="mb-3">
                      <h5 className="font-medium text-sm mb-2">Efectos en facciones:</h5>
                      <div className="space-y-1">
                        {choice.factionEffects.map((effect, i) => (
                          <div key={i} className="text-sm">
                            <span className="font-medium">{effect.factionId}:</span>
                            {effect.supportChange && (
                              <span className={effect.supportChange > 0 ? 'text-green-600 ml-2' : 'text-red-600 ml-2'}>
                                {effect.supportChange > 0 ? '+' : ''}{effect.supportChange} apoyo
                              </span>
                            )}
                            {effect.powerChange && (
                              <span className={effect.powerChange > 0 ? 'text-green-600 ml-2' : 'text-red-600 ml-2'}>
                                {effect.powerChange > 0 ? '+' : ''}{effect.powerChange} poder
                              </span>
                            )}
                            <div className="text-gray-600 text-xs">{effect.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {choice.triggeredEvents && choice.triggeredEvents.length > 0 && (
                    <div className="mb-3">
                      <h5 className="font-medium text-sm mb-2">Eventos que puede desencadenar:</h5>
                      <div className="space-y-1">
                        {choice.triggeredEvents.map(eventId => (
                          <div key={eventId} className="text-sm text-blue-600">
                            → {eventId}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {choice.provinceModifiers && (
                    <div className="mb-3">
                      <h5 className="font-medium text-sm mb-2">Efectos provinciales:</h5>
                      <div className="text-sm text-gray-600">
                        Afecta a {Object.keys(choice.provinceModifiers).length} provincias
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Conexiones */}
        {(node.connections.triggers.length > 0 || node.connections.triggeredBy.length > 0) && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Conexiones con otros eventos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {node.connections.triggeredBy.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Activado por:</h4>
                  <div className="space-y-1">
                    {node.connections.triggeredBy.map(eventId => (
                      <div key={eventId} className="text-sm text-blue-600">
                        ← {eventId}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {node.connections.triggers.length > 0 && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Puede activar:</h4>
                  <div className="space-y-1">
                    {node.connections.triggers.map(eventId => (
                      <div key={eventId} className="text-sm text-green-600">
                        → {eventId}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Visualizador de Eventos Políticos</h1>
        <p className="text-gray-600">
          Explora el flujo completo de decisiones políticas y sus consecuencias en Presidencial Bardo
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalEvents}</div>
            <div className="text-sm text-gray-600">Eventos totales</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.totalChoices}</div>
            <div className="text-sm text-gray-600">Decisiones posibles</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.eventsWithConnections}</div>
            <div className="text-sm text-gray-600">Eventos conectados</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Object.keys(eventNodes).filter(id => eventNodes[id].chains.length > 0).length}
            </div>
            <div className="text-sm text-gray-600">Eventos en cadenas</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="w-full">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'events'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('events')}
          >
            Eventos
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'chains'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('chains')}
          >
            Cadenas
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'analysis'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('analysis')}
          >
            Análisis
          </button>
        </div>

        {activeTab === 'events' && (
          <div className="space-y-4">
            {/* Filtros */}
            <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filtros:</span>
              </div>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as EventCategory | 'ALL')}
                className="px-3 py-1 border rounded text-sm"
              >
                <option value="ALL">Todas las categorías</option>
                {Object.values(EventCategory).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as EventType | 'ALL')}
                className="px-3 py-1 border rounded text-sm"
              >
                <option value="ALL">Todos los tipos</option>
                {Object.values(EventType).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <div className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-1 border rounded text-sm"
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowConnections(!showConnections)}
              >
                {showConnections ? 'Ocultar' : 'Mostrar'} conexiones
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Lista de eventos */}
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Eventos ({filteredEvents.length})
                </h2>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {filteredEvents.map(event => renderEventCard(event))}
                  </div>
                </ScrollArea>
              </div>

              {/* Detalles del evento seleccionado */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Detalles del Evento</h2>
                <ScrollArea className="h-[600px] pr-4">
                  {selectedEvent ? (
                    renderEventDetails(selectedEvent)
                  ) : (
                    <div className="text-center text-gray-500 py-20">
                      <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Selecciona un evento para ver sus detalles</p>
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chains' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cadenas de eventos */}
              <Card>
                <CardHeader>
                  <CardTitle>🔗 Cadena del Dólar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {events.filter(e => e.id.includes('dolar')).map((event, i) => (
                      <div key={event.id} className="flex items-center gap-3">
                        <div className="text-2xl">{event.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-gray-600">{event.description.substring(0, 100)}...</div>
                        </div>
                        {i < events.filter(e => e.id.includes('dolar')).length - 1 && (
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>🚧 Cadena de Piquetes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {events.filter(e => e.id.includes('piquete')).map((event, i) => (
                      <div key={event.id} className="flex items-center gap-3">
                        <div className="text-2xl">{event.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-gray-600">{event.description.substring(0, 100)}...</div>
                        </div>
                        {i < events.filter(e => e.id.includes('piquete')).length - 1 && (
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>⚽ Cadena del Fútbol</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {events.filter(e => e.id.includes('futbol')).map((event, i) => (
                      <div key={event.id} className="flex items-center gap-3">
                        <div className="text-2xl">{event.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-gray-600">{event.description.substring(0, 100)}...</div>
                        </div>
                        {i < events.filter(e => e.id.includes('futbol')).length - 1 && (
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>🏴 Cadena Provincial</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {events.filter(e => e.id.includes('provincial')).map((event, i) => (
                      <div key={event.id} className="flex items-center gap-3">
                        <div className="text-2xl">{event.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-gray-600">{event.description.substring(0, 100)}...</div>
                        </div>
                        {i < events.filter(e => e.id.includes('provincial')).length - 1 && (
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Distribución por categorías */}
              <Card>
                <CardHeader>
                  <CardTitle>📊 Distribución por Categorías</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(stats.eventsByCategory).map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm">{category}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(count / stats.totalEvents) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Distribución por tipos */}
              <Card>
                <CardHeader>
                  <CardTitle>🎯 Distribución por Tipos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(stats.eventsByType).map(([type, count]) => (
                      <div key={type} className="flex items-center justify-between">
                        <span className="text-sm">{type}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${(count / stats.totalEvents) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Análisis de gameplay */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>🎮 Análisis de Gameplay</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Complejidad Estratégica</h4>
                      <p className="text-sm text-blue-700">
                        {stats.eventsWithConnections} eventos están conectados, creando {' '}
                        {Math.round((stats.eventsWithConnections / stats.totalEvents) * 100)}% de decisiones
                        con consecuencias a largo plazo.
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Variabilidad</h4>
                      <p className="text-sm text-green-700">
                        Con {stats.totalChoices} decisiones posibles distribuidas en {stats.totalEvents} eventos,
                        cada partida puede ser completamente diferente.
                      </p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Narrativa</h4>
                      <p className="text-sm text-purple-700">
                        Las cadenas de eventos crean narrativas complejas donde las decisiones
                        tempranas afectan profundamente el desarrollo posterior del juego.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
