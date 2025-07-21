"use client"

import { EventType, PoliticalEvent } from "@/types/political";
import { useMemo } from "react";
import Mermaid from "react-mermaid2";

interface EventChainDiagramProps {
    events: PoliticalEvent[];
    title: string;
}

// Función para sanear IDs y títulos para Mermaid
const sanitize = (text: string) => {
    // Reemplaza caracteres problemáticos para IDs de Mermaid
    const idSafe = text.replace(/[^a-zA-Z0-9_]/g, '_');
    // Escapa comillas y otros caracteres para los títulos dentro del diagrama
    const titleSafe = text.replace(/"/g, '#quot;').replace(/</g, '#lt;').replace(/>/g, '#gt;').replace(/'/g, '#apos;');
    return { idSafe, titleSafe };
};

export const EventChainDiagram = ({ events, title }: EventChainDiagramProps) => {
    const chart = useMemo(() => {
        if (events.length === 0) return "graph TD; A[No hay eventos en esta cadena];";

        let mermaidString = `graph LR;\n`;

        // --- STYLES ---
        mermaidString += `
    classDef default fill:#1a202c,stroke:#2d3748,stroke-width:2px,color:#e2e8f0;
    classDef event fill:#2d3748,stroke:#4a5568,stroke-width:2px,color:#e2e8f0;
    classDef consequence fill:#4a5568,stroke:#718096,stroke-width:2px,color:#f7fafc;
    classDef crisis fill:#5f2727,stroke:#9b2c2c,stroke-width:2px,color:#fed7d7;
    classDef root fill:#2c5282,stroke:#4299e1,stroke-width:3px,color:#bee3f8;
    linkStyle default stroke:#4a5568,stroke-width:2px;
`;
        const nodes = new Set<string>();

        events.forEach(event => {
            const { idSafe: eventIdSafe } = sanitize(event.id);

            // Determinar la clase de estilo
            let nodeClass = "event";
            if(event.type === EventType.CRISIS || event.type === EventType.EMERGENCIA) nodeClass = "crisis";
            if(event.type === EventType.CONSECUENCIA) nodeClass = "consequence";

            // Encontrar si este evento es un punto de partida (no es consecuencia de nada en esta lista)
            const isTriggeredByOtherEventInList = events.some(e =>
                e.choices.some(c => c.triggeredEvents?.includes(event.id))
            );
            if (!isTriggeredByOtherEventInList) {
                nodeClass = "root";
            }

            if (!nodes.has(eventIdSafe)) {
                const displayText = `${event.icon} ${sanitize(event.title).titleSafe}`;
                // Usar diferentes formas: default (rect), {} (rhombus), () (stadium)
                const shape = nodeClass === "root" ? `(("${displayText}"))` : `["${displayText}"]`;
                mermaidString += `    ${eventIdSafe}${shape}:::${nodeClass};\n`;
                nodes.add(eventIdSafe);
            }

            event.choices.forEach((choice, index) => {
                if (choice.triggeredEvents) {
                    choice.triggeredEvents.forEach(triggeredId => {
                        const triggeredEvent = events.find(e => e.id === triggeredId);
                        if (triggeredEvent) {
                            const { idSafe: triggeredIdSafe } = sanitize(triggeredEvent.id);
                            const choiceText = sanitize(choice.text).titleSafe;
                            mermaidString += `    ${eventIdSafe} -- "${choiceText}" --> ${triggeredIdSafe};\n`;
                        } else {
                            // Evento externo a la lista actual
                             const { idSafe: triggeredIdSafe } = sanitize(triggeredId);
                             if (!nodes.has(triggeredIdSafe)) {
                                 mermaidString += `    ${triggeredIdSafe}["${triggeredIdSafe}"]:::external;\n`;
                                 nodes.add(triggeredIdSafe);
                             }
                             const choiceText = sanitize(choice.text).titleSafe;
                             mermaidString += `    ${eventIdSafe} -- "${choiceText}" --> ${triggeredIdSafe};\n`;
                        }
                    });
                }
            });
        });
        return mermaidString;
    }, [events]);

    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 w-full mb-6">
             <h4 className="text-lg font-semibold text-blue-400 mb-4">{title}</h4>
            <div className="overflow-x-auto">
                <Mermaid chart={chart} />
            </div>
        </div>
    );
};
