"use client";

import {
    FactionId,
    FactionState,
    ProvinceId,
    ProvinceState,
} from "@/types/political";
import { calculateRegionalGameplayEffects } from "@/utils/gameplayEffects";
import {
    Angry,
    Bot,
    Building,
    Car,
    Circle,
    HandCoins,
    Heart,
    Landmark,
    MapPin,
    Shield,
    Skull,
    TrendingDown, TrendingUp,
    Users,
    Zap
} from "lucide-react";
import { useState } from "react";

interface ProvinceStatsHUDProps {
	provinceStates: Record<string, ProvinceState>;
	selectedProvinceId: ProvinceId | null;
	factionStates: Record<FactionId, FactionState>;
	onProvinceSelect?: (provinceId: ProvinceId) => void;
}

const factionIcons: Record<FactionId, React.ReactNode> = {
	[FactionId.LA_CAMPORA]: <Users className="w-4 h-4" />,
	[FactionId.EMPRESARIOS]: <Building className="w-4 h-4" />,
	[FactionId.SINDICALISTAS]: <Circle className="w-4 h-4" />,
	[FactionId.MILITARES]: <Shield className="w-4 h-4" />,
	[FactionId.BARRAS_BRAVAS]: <Skull className="w-4 h-4" />,
	[FactionId.ALIENS]: <Bot className="w-4 h-4" />,
	[FactionId.OPOSICION]: <Users className="w-4 h-4" />,
	[FactionId.TACHEROS]: <Car className="w-4 h-4" />,
};

const StatDisplay = ({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: number;
}) => {
	const colorConfig: Record<
		string,
		{ text: string; bg: string; iconColor: string }
	> = {
		Lealtad: {
			text: "text-green-400",
			bg: "bg-green-400",
			iconColor: "text-green-400",
		},
		Descontento: {
			text: "text-red-400",
			bg: "bg-red-400",
			iconColor: "text-red-400",
		},
		Economía: {
			text: "text-yellow-400",
			bg: "bg-yellow-400",
			iconColor: "text-yellow-400",
		},
	};
	const config = colorConfig[label] || {
		text: "text-gray-400",
		bg: "bg-gray-400",
		iconColor: "text-gray-400",
	};

	return (
		<div className="flex flex-col items-center justify-center bg-gray-900/70 p-4 rounded-lg border border-gray-700/50">
			<div
				className={`flex items-center gap-2 text-sm font-semibold ${config.iconColor}`}
			>
				{icon}
				<p>{label}</p>
			</div>
			<p className={`text-3xl font-bold mt-1 ${config.text}`}>{value}</p>
			<div className="w-full bg-gray-800 rounded-full h-2 mt-2 border border-black/20">
				<div
					className={`h-full rounded-full ${config.bg}`}
					style={{ width: `${value}%` }}
				/>
			</div>
		</div>
	);
};

export function ProvinceStatsHUD({
	provinceStates,
	selectedProvinceId,
	factionStates,
	onProvinceSelect
}: ProvinceStatsHUDProps) {
	const [expandedProvince, setExpandedProvince] = useState<ProvinceId | null>(null);
	const [showGameplayEffects, setShowGameplayEffects] = useState(false);

	const provinces = Object.values(provinceStates);
	const selectedProvince = selectedProvinceId
		? provinceStates[selectedProvinceId]
		: null;
	const regionalEffects = calculateRegionalGameplayEffects(provinceStates);

	// Provincias con mayor descontento
	const criticalProvinces = provinces
		.filter(p => p.discontent > 75)
		.sort((a, b) => b.discontent - a.discontent);

	// Provincias más leales
	const loyalProvinces = provinces
		.filter(p => p.loyalty > 70)
		.sort((a, b) => b.loyalty - a.loyalty);

	// Provincias con eventos activos
	const provincesWithEvents = provinces.filter(p => p.activeEvents.length > 0);

	const getIdeologyColor = (ideology: string) => {
		switch (ideology) {
			case "populista":
				return "text-red-400";
			case "liberal":
				return "text-blue-400";
			case "conservadora":
				return "text-yellow-400";
			case "progresista":
				return "text-green-400";
			case "anarquista":
				return "text-purple-400";
			default:
				return "text-gray-400";
		}
	};

	const getDiscontentColor = (discontent: number) => {
		if (discontent > 75) return "text-red-400";
		if (discontent > 50) return "text-orange-400";
		if (discontent > 25) return "text-yellow-400";
		return "text-green-400";
	};

	const getLoyaltyColor = (loyalty: number) => {
		if (loyalty > 70) return "text-green-400";
		if (loyalty > 50) return "text-blue-400";
		if (loyalty > 30) return "text-yellow-400";
		return "text-red-400";
	};

	const handleProvinceClick = (provinceId: ProvinceId) => {
		if (onProvinceSelect) {
			onProvinceSelect(provinceId);
		}
		setExpandedProvince(expandedProvince === provinceId ? null : provinceId);
	};

	if (selectedProvince) {
		const sortedFactions = Object.entries(selectedProvince.factionInfluence)
			.sort(([, a], [, b]) => b - a)
			.slice(0, 5);

		return (
			<div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-purple-500/30">
				<h3 className="text-2xl font-bold mb-1 flex items-center">
					<Landmark className="w-7 h-7 mr-3 text-purple-400" />
					{selectedProvince.name}
				</h3>
				<p
					className={`text-lg font-semibold capitalize mb-4 ${getIdeologyColor(
						selectedProvince.ideology,
					)}`}
				>
					{selectedProvince.ideology}
				</p>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
					<StatDisplay
						icon={<Heart className="w-5 h-5" />}
						label="Lealtad"
						value={selectedProvince.loyalty}
					/>
					<StatDisplay
						icon={<Angry className="w-5 h-5" />}
						label="Descontento"
						value={selectedProvince.discontent}
					/>
					<StatDisplay
						icon={<HandCoins className="w-5 h-5" />}
						label="Economía"
						value={selectedProvince.economicLevel}
					/>
				</div>

				<div>
					<h4 className="font-bold text-lg text-purple-300 mb-2">
						Influencia de Facciones
					</h4>
					<div className="space-y-3">
						{sortedFactions.map(([factionId, influence]) => (
							<div key={factionId} className="flex items-center gap-3">
								<div className="w-5 text-gray-400">
									{factionIcons[factionId as FactionId]}
								</div>
								<span className="w-32 text-sm font-medium text-white truncate">
									{factionStates[factionId as FactionId]?.name || factionId}
								</span>
								<div className="w-full bg-gray-700/50 rounded-full h-2.5">
									<div
										className="bg-purple-600 h-2.5 rounded-full"
										style={{ width: `${influence}%` }}
									/>
								</div>
								<span className="text-sm font-bold w-10 text-right text-white">
									{Math.round(influence)}%
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-xl font-bold text-white flex items-center gap-2">
					<MapPin className="w-5 h-5 text-purple-400" />
					Estados Provinciales
				</h3>
				<button
					onClick={() => setShowGameplayEffects(!showGameplayEffects)}
					className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded transition-colors"
				>
					{showGameplayEffects ? "Ocultar" : "Mostrar"} Efectos
				</button>
			</div>

			{/* Efectos de Gameplay */}
			{showGameplayEffects && (
				<div className="mb-4 p-3 bg-purple-900/30 rounded-lg border border-purple-500/50">
					<h4 className="text-sm font-semibold text-purple-300 mb-2">Efectos Regionales</h4>
					<div className="grid grid-cols-2 gap-2 text-xs">
						<div>
							<span className="text-gray-400">Multiplicador Enemigos:</span>
							<span className={`ml-1 font-bold ${regionalEffects.enemySpawnMultiplier > 1 ? 'text-red-400' : 'text-green-400'}`}>
								x{regionalEffects.enemySpawnMultiplier.toFixed(2)}
							</span>
						</div>
						<div>
							<span className="text-gray-400">Power-ups Regionales:</span>
							<span className="ml-1 font-bold text-blue-400">
								{(regionalEffects.regionalPowerUpChance * 100).toFixed(1)}%
							</span>
						</div>
						<div>
							<span className="text-gray-400">Migraciones Activas:</span>
							<span className="ml-1 font-bold text-yellow-400">
								{regionalEffects.migrationEvents.length}
							</span>
						</div>
						<div>
							<span className="text-gray-400">Bonos de Recursos:</span>
							<span className="ml-1 font-bold text-green-400">
								{regionalEffects.resourceBonuses.length}
							</span>
						</div>
					</div>
				</div>
			)}

			{/* Provincias Críticas */}
			{criticalProvinces.length > 0 && (
				<div className="mb-4">
					<h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-1">
						<TrendingDown className="w-4 h-4" />
						Provincias Críticas ({criticalProvinces.length})
					</h4>
					<div className="space-y-2">
						{criticalProvinces.slice(0, 3).map(province => (
							<div
								key={province.id}
								className="bg-red-900/30 border border-red-500/50 rounded-lg p-2 cursor-pointer hover:bg-red-900/50 transition-colors"
								onClick={() => handleProvinceClick(province.id)}
							>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-white">{province.name}</span>
									<span className={`text-sm font-bold ${getDiscontentColor(province.discontent)}`}>
										{province.discontent}%
									</span>
								</div>
								<div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
									<div
										className="bg-red-500 h-full rounded-full transition-all duration-300"
										style={{ width: `${province.discontent}%` }}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Provincias Leales */}
			{loyalProvinces.length > 0 && (
				<div className="mb-4">
					<h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-1">
						<TrendingUp className="w-4 h-4" />
						Provincias Leales ({loyalProvinces.length})
					</h4>
					<div className="space-y-2">
						{loyalProvinces.slice(0, 3).map(province => (
							<div
								key={province.id}
								className="bg-green-900/30 border border-green-500/50 rounded-lg p-2 cursor-pointer hover:bg-green-900/50 transition-colors"
								onClick={() => handleProvinceClick(province.id)}
							>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-white">{province.name}</span>
									<span className={`text-sm font-bold ${getLoyaltyColor(province.loyalty)}`}>
										{province.loyalty}%
									</span>
								</div>
								<div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
									<div
										className="bg-green-500 h-full rounded-full transition-all duration-300"
										style={{ width: `${province.loyalty}%` }}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Provincias con Eventos */}
			{provincesWithEvents.length > 0 && (
				<div className="mb-4">
					<h4 className="text-sm font-semibold text-yellow-400 mb-2 flex items-center gap-1">
						<Zap className="w-4 h-4" />
						Eventos Activos ({provincesWithEvents.length})
					</h4>
					<div className="space-y-2">
						{provincesWithEvents.slice(0, 3).map(province => (
							<div
								key={province.id}
								className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-2 cursor-pointer hover:bg-yellow-900/50 transition-colors"
								onClick={() => handleProvinceClick(province.id)}
							>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-white">{province.name}</span>
									<span className="text-xs text-yellow-400">
										{province.activeEvents.length} eventos
									</span>
								</div>
								{expandedProvince === province.id && (
									<div className="mt-2 text-xs text-yellow-300">
										{province.activeEvents.map((event, index) => (
											<div key={index} className="mb-1">• {event}</div>
										))}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			)}

			{/* Detalles de Provincia Expandida */}
			{expandedProvince && (
				<div className="mt-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
					<h4 className="text-sm font-semibold text-white mb-2">
						{provinceStates[expandedProvince]?.name}
					</h4>
					<div className="grid grid-cols-2 gap-2 text-xs">
						<div>
							<span className="text-gray-400">Población:</span>
							<span className="ml-1 text-white">
								{provinceStates[expandedProvince]?.population.toLocaleString()}
							</span>
						</div>
						<div>
							<span className="text-gray-400">Nivel Económico:</span>
							<span className="ml-1 text-white">
								{provinceStates[expandedProvince]?.economicLevel}%
							</span>
						</div>
						<div>
							<span className="text-gray-400">Ideología:</span>
							<span className="ml-1 text-white capitalize">
								{provinceStates[expandedProvince]?.ideology}
							</span>
						</div>
						<div>
							<span className="text-gray-400">Recursos:</span>
							<span className="ml-1 text-white">
								{provinceStates[expandedProvince]?.resources.join(", ")}
							</span>
						</div>
					</div>
				</div>
			)}

			{/* Resumen */}
			<div className="mt-4 pt-3 border-t border-gray-700">
				<div className="grid grid-cols-3 gap-2 text-xs text-center">
					<div>
						<div className="text-gray-400">Promedio Descontento</div>
						<div className={`font-bold ${getDiscontentColor(provinces.reduce((sum, p) => sum + p.discontent, 0) / provinces.length)}`}>
							{Math.round(provinces.reduce((sum, p) => sum + p.discontent, 0) / provinces.length)}%
						</div>
					</div>
					<div>
						<div className="text-gray-400">Promedio Lealtad</div>
						<div className={`font-bold ${getLoyaltyColor(provinces.reduce((sum, p) => sum + p.loyalty, 0) / provinces.length)}`}>
							{Math.round(provinces.reduce((sum, p) => sum + p.loyalty, 0) / provinces.length)}%
						</div>
					</div>
					<div>
						<div className="text-gray-400">Total Población</div>
						<div className="font-bold text-white">
							{(provinces.reduce((sum, p) => sum + p.population, 0) / 1000000).toFixed(1)}M
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
