"use client";

import { MetricState, MetricType, PoliticalMetrics } from "@/types/political";
import { getMetricColor } from "@/utils/metricEffects";
import {
    CircleDollarSign,
    EyeOff,
    Globe,
    Heart,
    Info,
    Landmark,
    Shield,
    Tv,
    Users,
    Zap,
} from "lucide-react";

interface PoliticalMetricsHUDProps {
	metrics: PoliticalMetrics;
	metricStates: Record<MetricType, MetricState>;
	crisisLevel: number;
	isCompact?: boolean;
}

const MetricTooltip = ({ text }: { text: string }) => (
	<div className="absolute bottom-full mb-2 hidden group-hover:block w-60 bg-gray-900 text-white text-xs rounded-lg p-2 shadow-lg border border-purple-500/50 z-10">
		<p>{text}</p>
	</div>
);

export function PoliticalMetricsHUD({
	metrics,
	metricStates,
	crisisLevel,
	isCompact = false,
}: PoliticalMetricsHUDProps) {
	const getMetricIcon = (metricType: MetricType): React.ReactNode => {
		const className = "w-6 h-6";
		switch (metricType) {
			case MetricType.POPULARIDAD:
				return <Users className={className} />;
			case MetricType.ECONOMIA:
				return <Landmark className={className} />;
			case MetricType.SEGURIDAD:
				return <Shield className={className} />;
			case MetricType.RELACIONES_INTERNACIONALES:
				return <Globe className={className} />;
			case MetricType.CORRUPCION:
				return <EyeOff className={className} />;
			case MetricType.CONTROL_MEDIOS:
				return <Tv className={className} />;
			case MetricType.SALUD:
				return <Heart className={className} />;
			case MetricType.TECNOLOGIA:
				return <Zap className={className} />;
			default:
				return <CircleDollarSign className={className} />;
		}
	};

	const getMetricName = (metricType: MetricType): string => {
		switch (metricType) {
			case MetricType.POPULARIDAD:
				return "Popularidad";
			case MetricType.ECONOMIA:
				return "Economía";
			case MetricType.SEGURIDAD:
				return "Seguridad";
			case MetricType.RELACIONES_INTERNACIONALES:
				return "Rel. Internacionales";
			case MetricType.CORRUPCION:
				return "Corrupción";
			case MetricType.CONTROL_MEDIOS:
				return "Control de Medios";
			case MetricType.SALUD:
				return "Salud";
			case MetricType.TECNOLOGIA:
				return "Tecnología";
			default:
				return metricType;
		}
	};

	const getMetricDescription = (metricType: MetricType): string => {
		switch (metricType) {
			case MetricType.POPULARIDAD:
				return "Aprobación del pueblo. Valores altos son buenos y desbloquean apoyo popular.";
			case MetricType.ECONOMIA:
				return "Salud financiera del país. Valores altos indican prosperidad y estabilidad.";
			case MetricType.SEGURIDAD:
				return "Nivel de orden público y control. Valores altos significan menos crimen y caos.";
			case MetricType.RELACIONES_INTERNACIONALES:
				return "Posición en el mundo. Valores altos abren oportunidades diplomáticas y comerciales.";
			case MetricType.CORRUPCION:
				return "Percepción de la corrupción. ¡Valores BAJOS son buenos! Un valor alto indica corrupción descontrolada.";
			case MetricType.CONTROL_MEDIOS:
				return "Influencia sobre la narrativa pública. Valores altos permiten controlar el mensaje, pero pueden afectar otras métricas.";
			case MetricType.SALUD:
				return "Estado del sistema de salud público. Valores altos indican mejor atención médica y menor mortalidad.";
			case MetricType.TECNOLOGIA:
				return "Desarrollo tecnológico del país. Valores altos indican modernización e innovación.";
			default:
				return "Métrica desconocida.";
		}
	};

	const getTrendIcon = (trend: "rising" | "falling" | "stable"): string => {
		switch (trend) {
			case "rising":
				return "▲";
			case "falling":
				return "▼";
			case "stable":
				return "–";
			default:
				return "–";
		}
	};

	const getCrisisLevelDisplay = () => {
		const labels = [
			"🟢 Estable",
			"🟡 Tensión Leve",
			"🟠 Crisis Leve",
			"🔴 Crisis Moderada",
			"🚨 Crisis Grave",
			"💀 Crisis Extrema",
		];
		return labels[crisisLevel] || "❓ Desconocido";
	};

	const getLevelDisplay = (
		level: "critical" | "low" | "medium" | "high",
	) => {
		const styles = {
			critical: "text-red-400 border-red-400",
			low: "text-orange-400 border-orange-400",
			medium: "text-yellow-400 border-yellow-400",
			high: "text-green-400 border-green-400",
		};
		return (
			<span
				className={`border text-xs font-semibold px-2 py-0.5 rounded-full ${styles[level]}`}
			>
				{level.toUpperCase()}
			</span>
		);
	};

	if (isCompact) {
		return (
			<div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
				<div className="flex items-center justify-between mb-2">
					<h3 className="text-sm font-bold text-purple-300 flex items-center gap-2">
						<Landmark className="w-4 h-4" />
						🏛️ Estado Nacional
					</h3>
					<span className="text-xs text-gray-400 font-semibold">
						{getCrisisLevelDisplay()}
					</span>
				</div>
				<div className="grid grid-cols-4 gap-2">
					{Object.entries(metrics).map(([key, value]) => {
						const metricType = key as MetricType;
						const state = metricStates[metricType];
						return (
							<div key={key} className="text-center group relative">
								<div className="text-gray-400 scale-75 mb-1" style={{ color: getMetricColor(value) }}>
									{getMetricIcon(metricType)}
								</div>
								<div
									className="text-sm font-bold"
									style={{ color: getMetricColor(value) }}
								>
									{Math.round(value)}
								</div>
								{state.lastChange !== 0 && (
									<div className="text-xs" style={{ color: state.lastChange > 0 ? "#4ade80" : "#f87171" }}>
										{getTrendIcon(state.trend)}
									</div>
								)}
								{/* Tooltip compacto */}
								<div className="absolute bottom-full mb-2 hidden group-hover:block w-32 bg-gray-900 text-white text-xs rounded-lg p-2 shadow-lg border border-purple-500/50 z-10 left-1/2 transform -translate-x-1/2">
									<p className="font-semibold">{getMetricName(metricType)}</p>
									<p className="text-gray-300">{Math.round(value)}/100</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	return (
		<div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-purple-500/30">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-bold text-white flex items-center gap-3">
					<Landmark className="w-6 h-6 text-purple-400" />
					Estado Nacional
				</h2>
				<div className="text-sm font-semibold text-purple-300">
					{getCrisisLevelDisplay()}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{Object.entries(metrics).map(([key, value]) => {
					const metricType = key as MetricType;
					const state = metricStates[metricType];
					const color = getMetricColor(value);

					return (
						<div
							key={key}
							className="relative group bg-gray-900/60 rounded-lg p-3 border border-gray-700/70 hover:border-purple-500/50 transition-all duration-300"
						>
							<MetricTooltip text={getMetricDescription(metricType)} />
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center gap-2">
									<div style={{ color }}>{getMetricIcon(metricType)}</div>
									<span className="font-bold text-gray-200">
										{getMetricName(metricType)}
									</span>
								</div>
								<Info className="w-4 h-4 text-gray-500" />
							</div>

							<div className="w-full bg-gray-700/50 rounded-full h-2.5 my-2 border border-black/20">
								<div
									className="h-full rounded-full transition-all duration-500"
									style={{
										width: `${value}%`,
										backgroundColor: color,
										boxShadow: `0 0 8px ${color}90`,
									}}
								/>
							</div>

							<div className="flex items-center justify-between mt-2">
								<span className="text-2xl font-bold" style={{ color }}>
									{Math.round(value)}
								</span>
								<div className="flex items-center gap-3">
									{state.lastChange !== 0 && (
										<span
											className={`text-sm font-semibold flex items-center ${
												state.lastChange > 0
													? "text-green-400"
													: "text-red-400"
											}`}
										>
											{getTrendIcon(state.trend)}
											{state.lastChange.toFixed(1)}
										</span>
									)}
									{getLevelDisplay(state.level)}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
