"use client";

import { Mission } from "@/data/missions";
import { ProvinceId, ProvinceState } from "@/types/political";
import { useState } from "react";

interface ArgentinaMapProps {
    provinceStates: Record<string, ProvinceState>;
    activeMissions?: Mission[];
    onProvinceSelect: (provinceId: ProvinceId) => void;
    onMissionSelect?: (mission: Mission) => void;
}

// Coordenadas aproximadas para un layout 2D simple
const provinceLayout: Record<ProvinceId, { x: number; y: number; w: number; h: number }> = {
    [ProvinceId.JUJUY]: { x: 2, y: 0, w: 1, h: 1 },
    [ProvinceId.SALTA]: { x: 2, y: 1, w: 1, h: 2 },
    [ProvinceId.FORMOSA]: { x: 3, y: 1, w: 1, h: 1 },
    [ProvinceId.CHACO]: { x: 3, y: 2, w: 1, h: 1 },
    [ProvinceId.SANTIAGO_DEL_ESTERO]: { x: 3, y: 3, w: 1, h: 1 },
    [ProvinceId.CATAMARCA]: { x: 2, y: 3, w: 1, h: 1 },
    [ProvinceId.TUCUMAN]: { x: 2, y: 2, w: 1, h: 1 },
    [ProvinceId.LA_RIOJA]: { x: 2, y: 4, w: 1, h: 1 },
    [ProvinceId.SAN_JUAN]: { x: 1, y: 4, w: 1, h: 1 },
    [ProvinceId.MENDOZA]: { x: 1, y: 5, w: 1, h: 2 },
    [ProvinceId.CORDOBA]: { x: 3, y: 4, w: 1, h: 1 },
    [ProvinceId.SANTA_FE]: { x: 4, y: 3, w: 1, h: 2 },
    [ProvinceId.ENTRE_RIOS]: { x: 4, y: 5, w: 1, h: 1 },
    [ProvinceId.CORRIENTES]: { x: 4, y: 2, w: 1, h: 1 },
    [ProvinceId.MISIONES]: { x: 5, y: 1, w: 1, h: 1 },
    [ProvinceId.SAN_LUIS]: { x: 2, y: 5, w: 1, h: 1 },
    [ProvinceId.LA_PAMPA]: { x: 2, y: 6, w: 2, h: 1 },
    [ProvinceId.NEUQUEN]: { x: 1, y: 7, w: 1, h: 1 },
    [ProvinceId.RIO_NEGRO]: { x: 1, y: 8, w: 2, h: 1 },
    [ProvinceId.CHUBUT]: { x: 1, y: 9, w: 2, h: 1 },
    [ProvinceId.SANTA_CRUZ]: { x: 1, y: 10, w: 2, h: 1 },
    [ProvinceId.TIERRA_DEL_FUEGO]: { x: 2, y: 11, w: 1, h: 1 },
    [ProvinceId.BUENOS_AIRES]: { x: 3, y: 6, w: 1, h: 2 },
    [ProvinceId.CABA]: { x: 4, y: 6, w: 1, h: 1 },
};

const getDiscontentColor = (discontent: number) => {
    if (discontent > 75) return "fill-red-500 hover:fill-red-400";
    if (discontent > 50) return "fill-orange-500 hover:fill-orange-400";
    if (discontent > 25) return "fill-yellow-500 hover:fill-yellow-400";
    return "fill-green-500 hover:fill-green-400";
}

export function ArgentinaMap({ provinceStates, activeMissions = [], onProvinceSelect, onMissionSelect }: ArgentinaMapProps) {
    const [hoveredProvince, setHoveredProvince] = useState<ProvinceState | null>(null);

    // Crear mapa de misiones por provincia
    const missionsByProvince = activeMissions.reduce((acc, mission) => {
        if (!acc[mission.targetProvince]) {
            acc[mission.targetProvince] = [];
        }
        acc[mission.targetProvince].push(mission);
        return acc;
    }, {} as Record<ProvinceId, Mission[]>);

    const getProvinceColor = (province: ProvinceState) => {
        const missions = missionsByProvince[province.id] || [];

        // Si hay misiones, usar color especial
        if (missions.length > 0) {
            const hasUrgentMission = missions.some(m => m.type === 'combate');
            if (hasUrgentMission) {
                return "fill-red-600 hover:fill-red-500 animate-pulse"; // Misión de combate urgente
            }
            return "fill-blue-600 hover:fill-blue-500"; // Misiones disponibles
        }

        // Color basado en descontento
        if (province.discontent > 75) return "fill-red-500 hover:fill-red-400";
        if (province.discontent > 50) return "fill-orange-500 hover:fill-orange-400";
        if (province.discontent > 25) return "fill-yellow-500 hover:fill-yellow-400";
        return "fill-green-500 hover:fill-green-400";
    };

    return (
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30 aspect-[9/10]">
            <h3 className="text-xl font-bold mb-4 text-white text-center">
                Mapa de Influencia
                {activeMissions.length > 0 && (
                    <span className="ml-2 text-sm text-blue-400">
                        ({activeMissions.length} misiones activas)
                    </span>
                )}
            </h3>
            <div className="relative">
                <svg viewBox="0 0 7 13" className="w-full h-full">
                    {Object.values(provinceStates).map(province => {
                        const layout = provinceLayout[province.id];
                        const missions = missionsByProvince[province.id] || [];
                        if (!layout) return null;

                        return (
                            <g
                                key={province.id}
                                onClick={() => {
                                    onProvinceSelect(province.id);
                                    // Si hay misiones y callback, seleccionar la primera misión
                                    if (missions.length > 0 && onMissionSelect) {
                                        onMissionSelect(missions[0]);
                                    }
                                }}
                                onMouseEnter={() => setHoveredProvince(province)}
                                onMouseLeave={() => setHoveredProvince(null)}
                                role="button"
                                tabIndex={0}
                                aria-label={`${province.name}, descontento: ${province.discontent}${missions.length > 0 ? `, ${missions.length} misión(es) disponible(s)` : ''}`}
                                className="cursor-pointer"
                            >
                                <rect
                                    x={layout.x}
                                    y={layout.y}
                                    width={layout.w}
                                    height={layout.h}
                                    className={`stroke-purple-300 stroke-[0.05] transition-all duration-300 ${getProvinceColor(province)}`}
                                />
                                <text
                                    x={layout.x + layout.w / 2}
                                    y={layout.y + layout.h / 2}
                                    className="text-[0.2px] fill-white font-bold text-center"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                >
                                    {province.name.substring(0, 3).toUpperCase()}
                                </text>

                                {/* Indicador de misiones */}
                                {missions.length > 0 && (
                                    <circle
                                        cx={layout.x + layout.w - 0.1}
                                        cy={layout.y + 0.1}
                                        r={0.15}
                                        className={`${missions.some(m => m.type === 'combate') ? 'fill-red-400' : 'fill-blue-400'} stroke-white stroke-[0.03]`}
                                    />
                                )}

                                {/* Número de misiones si hay más de una */}
                                {missions.length > 1 && (
                                    <text
                                        x={layout.x + layout.w - 0.1}
                                        y={layout.y + 0.15}
                                        className="text-[0.1px] fill-white font-bold text-center"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        {missions.length}
                                    </text>
                                )}
                            </g>
                        )
                    })}
                </svg>

                {/* Tooltip */}
                {hoveredProvince && (
                    <div className="absolute top-0 right-0 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg border border-purple-500/50 z-10 max-w-xs">
                        <h4 className="font-semibold mb-2">{hoveredProvince.name}</h4>
                        <div className="space-y-1">
                            <p>Descontento: {hoveredProvince.discontent}%</p>
                            <p>Lealtad: {hoveredProvince.loyalty}%</p>
                            <p>Ideología: {hoveredProvince.ideology}</p>
                            <p>Población: {hoveredProvince.population.toLocaleString()}</p>
                            <p>Recursos: {hoveredProvince.resources.join(", ")}</p>

                            {/* Mostrar misiones si las hay */}
                            {missionsByProvince[hoveredProvince.id]?.length > 0 && (
                                <div className="mt-2 pt-2 border-t border-gray-600">
                                    <p className="font-semibold text-blue-400 mb-1">
                                        🎯 Misiones ({missionsByProvince[hoveredProvince.id].length})
                                    </p>
                                    {missionsByProvince[hoveredProvince.id].slice(0, 2).map((mission, index) => (
                                        <div key={mission.id} className="mb-1">
                                            <p className="font-medium">
                                                {mission.type === 'combate' ? '⚔️' : mission.type === 'negociacion' ? '🤝' : mission.type === 'diplomatica' ? '🎭' : '🕵️'}
                                                {mission.title}
                                            </p>
                                            <p className="text-gray-400 text-xs">
                                                {mission.assigningFaction ? `Por: ${mission.assigningFaction}` : 'Sistema'}
                                            </p>
                                        </div>
                                    ))}
                                    {missionsByProvince[hoveredProvince.id].length > 2 && (
                                        <p className="text-gray-400 text-xs">
                                            +{missionsByProvince[hoveredProvince.id].length - 2} más...
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-500 mt-1">
                                        Click para ver detalles
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
