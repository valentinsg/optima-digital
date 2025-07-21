"use client";

import { ALL_LAWS } from "@/data/leyes";
import { MetricType } from "@/types/political";
import { Globe, Landmark, Scale, Shield, Users } from "lucide-react";

type LawsHUDProps = {
	enactedLaws: string[];
};

const getLawCategoryIcon = (category: Law["category"]): React.ReactNode => {
	const className = "w-4 h-4";
	switch (category) {
		case "Economía":
			return <Landmark className={className} />;
		case "Social":
			return <Users className={className} />;
		case "Justicia":
			return <Scale className={className} />;
		case "Seguridad":
			return <Shield className={className} />;
		case "Internacional":
			return <Globe className={className} />;
		default:
			return <Scale className={className} />;
	}
};

const getMetricAbbreviation = (metricType: MetricType): string => {
	switch (metricType) {
		case MetricType.POPULARIDAD:
			return "Pop";
		case MetricType.ECONOMIA:
			return "Eco";
		case MetricType.SEGURIDAD:
			return "Seg";
		case MetricType.RELACIONES_INTERNACIONALES:
			return "Int";
		case MetricType.CORRUPCION:
			return "Corr";
		case MetricType.CONTROL_MEDIOS:
			return "Med";
		default:
			return "?";
	}
};

type Law = (typeof ALL_LAWS)[0];

export function LawsHUD({ enactedLaws }: LawsHUDProps) {
	const laws = ALL_LAWS.filter(law => enactedLaws.includes(law.id));

	return (
		<div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-purple-500/30">
			<h3 className="text-xl font-bold mb-3 flex items-center">
				<Scale className="w-5 h-5 mr-3 text-purple-400" />
				Leyes Promulgadas
			</h3>
			<div className="max-h-48 overflow-y-auto space-y-2 pr-2">
				{laws.length === 0 ? (
					<p className="text-gray-400 text-sm">
						No se ha promulgado ninguna ley.
					</p>
				) : (
					laws.map(law => (
						<div
							key={law.id}
							className="bg-gray-900/60 rounded-lg p-3 text-sm border border-gray-700/70"
						>
							<div className="flex justify-between items-start">
								<div>
									<p className="text-white font-semibold flex items-center gap-2">
										{getLawCategoryIcon(law.category)}
										{law.title}
									</p>
									<p className="text-gray-400 text-xs mt-1">
										{law.description}
									</p>
								</div>
								<div className="flex flex-col items-end gap-1 flex-shrink-0 ml-2">
									{law.effects.map((effect, index) => (
										<span
											key={index}
											className={`text-xs font-bold px-2 py-0.5 rounded-full ${
												effect.change > 0
													? "bg-green-800/70 text-green-300"
													: "bg-red-800/70 text-red-300"
											}`}
										>
											{effect.change > 0 ? "+" : ""}
											{effect.change}{" "}
											{getMetricAbbreviation(effect.type)}
										</span>
									))}
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}
