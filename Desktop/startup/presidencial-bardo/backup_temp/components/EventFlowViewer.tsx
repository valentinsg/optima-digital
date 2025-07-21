"use client";

import { ALL_POLITICAL_EVENTS } from "@/data/events/politicalEvents";
import { AlertTriangle, CheckCircle, ChevronsRight, Clock, GitBranch, Shield } from "lucide-react";

interface EventFlowViewerProps {
    // Por ahora no necesita props, pero podría en el futuro
}

const getMetricConditionText = (metrics: any) => {
    const conditions = Object.entries(metrics).map(([key, value]: [string, any]) => {
        const min = value.min !== undefined ? `min ${value.min}` : '';
        const max = value.max !== undefined ? `max ${value.max}` : '';
        return `${key} (${min} ${max})`;
    });
    return conditions.join(', ');
}

export function EventFlowViewer({ }: EventFlowViewerProps) {
    const events = ALL_POLITICAL_EVENTS;

    return (
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-purple-500/30">
            <h3 className="text-xl font-bold mb-4 flex items-center">
                <GitBranch className="w-6 h-6 mr-3 text-purple-400" />
                Flujo de Eventos Políticos
            </h3>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {events.map(event => (
                    <div key={event.id} className="bg-gray-800/70 p-4 rounded-lg">
                        <h4 className="font-bold text-lg text-purple-300">{event.title}</h4>
                        <p className="text-xs text-gray-500 mb-2">ID: {event.id}</p>

                        <div className="text-xs space-y-1 mb-3">
                            <p className="flex items-center"><AlertTriangle className="w-3 h-3 mr-2 text-yellow-400" /> <strong>Trigger:</strong> {event.trigger.probability ? `${event.trigger.probability * 100}% prob.` : ''} {event.trigger.requiredMetrics ? getMetricConditionText(event.trigger.requiredMetrics) : 'Sin condición de métrica'}</p>
                            {event.trigger.completedEvents && <p className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" /> <strong>Requiere Evento Previo:</strong> {event.trigger.completedEvents.join(', ')}</p>}
                            {event.trigger.blockingEvents && <p className="flex items-center"><Shield className="w-3 h-3 mr-2 text-red-400" /> <strong>Bloqueado por:</strong> {event.trigger.blockingEvents.join(', ')}</p>}
                            {event.trigger.cooldown && <p className="flex items-center"><Clock className="w-3 h-3 mr-2 text-blue-400" /> <strong>Cooldown:</strong> {event.trigger.cooldown}s</p>}
                        </div>

                        <div>
                            {event.choices.map(choice => (
                                <div key={choice.id} className="p-2 rounded-md bg-gray-900/50 mb-2">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium">{choice.text}</p>
                                        {choice.triggeredEvents && choice.triggeredEvents.length > 0 && (
                                            <>
                                                <ChevronsRight className="w-4 h-4 text-purple-400" />
                                                <div className="flex flex-wrap gap-1">
                                                    {choice.triggeredEvents.map(triggeredId => (
                                                        <span key={triggeredId} className="text-xs bg-purple-800 text-white px-2 py-1 rounded-full">{triggeredId}</span>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="pl-4 mt-2 text-xs border-l-2 border-gray-700">
                                        {choice.effects && choice.effects.length > 0 && (
                                            <div className="mb-2">
                                                <p className="font-semibold text-purple-400">Efectos en Métricas:</p>
                                                {choice.effects.map((effect, index) => (
                                                    <p key={index} className="text-gray-300">
                                                        {effect.type}: <span className={effect.change > 0 ? "text-green-400" : "text-red-400"}>{effect.change > 0 ? `+${effect.change}` : effect.change}</span> ({effect.description})
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                        {choice.factionEffects && choice.factionEffects.length > 0 && (
                                            <div>
                                                <p className="font-semibold text-purple-400">Efectos en Facciones:</p>
                                                {choice.factionEffects.map((effect, index) => (
                                                    <p key={index} className="text-gray-300">
                                                        {effect.factionId}: Apoyo <span className={effect.supportChange && effect.supportChange > 0 ? "text-green-400" : "text-red-400"}>{effect.supportChange && effect.supportChange > 0 ? `+${effect.supportChange}` : effect.supportChange || 0}</span>, Poder <span className={effect.powerChange && effect.powerChange > 0 ? "text-green-400" : "text-red-400"}>{effect.powerChange && effect.powerChange > 0 ? `+${effect.powerChange}` : effect.powerChange || 0}</span>
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
