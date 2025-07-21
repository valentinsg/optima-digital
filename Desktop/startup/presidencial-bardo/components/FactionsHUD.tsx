"use client";

import { FactionId, FactionState } from "@/types/political";
import {
    Bot,
    Building,
    Car,
    Circle,
    Info,
    Shield,
    Skull,
    Users
} from "lucide-react";

interface FactionsHUDProps {
	factionStates: Record<FactionId, FactionState>;
}

const factionIcons: Record<FactionId, React.ReactNode> = {
	[FactionId.LA_CAMPORA]: <Users className="w-5 h-5 text-blue-400" />,
	[FactionId.EMPRESARIOS]: <Building className="w-5 h-5 text-yellow-400" />,
	[FactionId.SINDICALISTAS]: <Circle className="w-5 h-5 text-red-400" />, // Placeholder icon
	[FactionId.MILITARES]: <Shield className="w-5 h-5 text-gray-400" />,
	[FactionId.BARRAS_BRAVAS]: <Skull className="w-5 h-5 text-orange-400" />,
	[FactionId.ALIENS]: <Bot className="w-5 h-5 text-purple-400" />,
	[FactionId.OPOSICION]: <Users className="w-5 h-5 text-pink-400" />,
	[FactionId.TACHEROS]: <Car className="w-5 h-5 text-yellow-600" />,
};

const FactionTooltip = ({ text }: { text: string }) => (
	<div className="absolute bottom-full mb-2 hidden group-hover:block w-64 bg-gray-900 text-white text-xs rounded-lg p-2 shadow-lg border border-purple-500/50 z-10">
		<p>{text}</p>
	</div>
);

export function FactionsHUD({ factionStates }: FactionsHUDProps) {
	const factions = Object.values(factionStates).filter(
		f => f.id !== FactionId.ALIENS,
	); // No mostrar aliens al principio

	return (
		<div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-purple-500/30">
			<h3 className="text-xl font-bold mb-4 flex items-center">
				🎭 Facciones y Grupos de Interés
			</h3>
			<div className="space-y-4">
				{factions.map(faction => (
					<div key={faction.id} className="relative group">
						<FactionTooltip text={faction.description} />
						<div className="flex items-center justify-between text-sm mb-1.5">
							<div className="flex items-center gap-2">
								{factionIcons[faction.id]}
								<span className="font-medium text-white">{faction.name}</span>
								<Info className="w-3 h-3 text-gray-500" />
							</div>
							<span
								className={`font-bold text-lg ${
									faction.support > 0
										? "text-green-400"
										: faction.support < 0
										  ? "text-red-400"
										  : "text-gray-300"
								}`}
							>
								{faction.support > 0 ? "+" : ""}
								{faction.support}
							</span>
						</div>
						<div className="w-full bg-gray-900/50 rounded-full h-3 flex items-center border border-gray-700/50">
							<div className="flex-1 flex justify-end">
								<div
									className="bg-red-500 h-2 rounded-l-full transition-all duration-300"
									style={{
										width: faction.support < 0 ? `${-faction.support}%` : "0%",
									}}
								/>
							</div>
							<div className="w-0.5 h-3 bg-gray-500/50" />
							<div className="flex-1">
								<div
									className="bg-green-500 h-2 rounded-r-full transition-all duration-300"
									style={{
										width: faction.support > 0 ? `${faction.support}%` : "0%",
									}}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
