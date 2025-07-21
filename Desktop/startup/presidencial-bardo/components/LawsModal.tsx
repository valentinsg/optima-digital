"use client";

import { Law } from "@/types/political";
import { Check, Scale, X } from "lucide-react";

type LawsModalProps = {
	allLaws: Law[];
	enactedLaws: string[];
	onEnactLawAction: (lawId: string) => void;
	onCloseAction: () => void;
	isVisible: boolean;
};

export function LawsModal({
	allLaws,
	enactedLaws,
	onEnactLawAction,
	onCloseAction,
	isVisible,
}: LawsModalProps) {
	if (!isVisible) return null;

	// TODO: Implement requirement checks
	const availableLaws = allLaws.filter(law => !enactedLaws.includes(law.id));

	return (
		<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="bg-gray-800 border-2 border-purple-500/50 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
				<header className="p-4 border-b border-purple-500/30 flex justify-between items-center">
					<h2 className="text-2xl font-bold text-white flex items-center">
						<Scale className="w-6 h-6 mr-3 text-purple-400" />
						Centro de Legislación
					</h2>
					<button
						type="button"
						onClick={onCloseAction}
						className="p-2 rounded-full hover:bg-gray-700 transition-colors"
					>
						<X className="w-6 h-6 text-white" />
					</button>
				</header>

				<div className="p-6 overflow-y-auto">
					<p className="text-gray-400 mb-6 text-center">
						Aquí puedes proponer y promulgar nuevas leyes para moldear el futuro
						de la nación. Cada ley tiene costos y beneficios permanentes.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{availableLaws.map(law => (
							<div
								key={law.id}
								className="bg-gray-900/70 rounded-xl p-5 border border-purple-500/20 flex flex-col"
							>
								<h3 className="text-lg font-semibold text-purple-300">
									{law.title}
								</h3>
								<p className="text-sm text-gray-400 mt-1 mb-4 flex-grow">
									{law.description}
								</p>

								<div className="space-y-2 text-xs mb-4">
									<h4 className="font-semibold text-gray-300">Efectos:</h4>
									{law.effects.map((effect, index) => (
										<p key={index} className="text-gray-400">
											<span
												className={
													effect.change > 0
														? "text-green-400"
														: "text-red-400"
												}
											>
												{effect.change > 0 ? "+" : ""}
												{effect.change}
											</span>{" "}
											{effect.type}
										</p>
									))}
								</div>

								<button
									type="button"
									onClick={() => onEnactLawAction(law.id)}
									className="w-full mt-auto bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900/50 px-4 py-2 rounded-lg text-white font-semibold transition-colors flex items-center justify-center"
								>
									<Check className="w-4 h-4 mr-2" />
									Promulgar
								</button>
							</div>
						))}
					</div>

					{availableLaws.length === 0 && (
						<div className="text-center py-12">
							<p className="text-gray-500">
								No hay nuevas leyes para proponer en este momento.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
