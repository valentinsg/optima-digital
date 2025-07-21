"use client";

import { EventChoice, PoliticalEvent } from "@/types/political";

interface PoliticalDecisionModalProps {
	event: PoliticalEvent | null;
	onMakeDecisionAction: (eventId: string, choiceId: string) => void;
	onCloseAction: () => void;
	isVisible: boolean;
}

export function PoliticalDecisionModal({
	event,
	onMakeDecisionAction,
	onCloseAction,
	isVisible
}: PoliticalDecisionModalProps) {
	if (!isVisible || !event) return null;

	const handleChoiceClick = (choiceId: string) => {
		onMakeDecisionAction(event.id, choiceId);
		onCloseAction();
	};

	const getUrgencyColor = (urgency: number) => {
		switch (urgency) {
			case 1:
			case 2:
				return "border-green-500 bg-green-50";
			case 3:
				return "border-yellow-500 bg-yellow-50";
			case 4:
				return "border-orange-500 bg-orange-50";
			case 5:
				return "border-red-500 bg-red-50";
			default:
				return "border-gray-500 bg-gray-50";
		}
	};

	const getEventTypeIcon = (type: string) => {
		switch (type) {
			case "crisis":
				return "🚨";
			case "oportunidad":
				return "✨";
			case "decision":
				return "🤔";
			case "emergencia":
				return "🔥";
			case "humor_negro":
				return "😈";
			default:
				return "📰";
		}
	};

	return (
		<div className="fixed h-screen w-screen inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
			<div
				className={`
				relative max-w-4xl w-full mx-4 p-6 rounded-lg border-2 shadow-2xl
				${getUrgencyColor(event.urgency)}
				animate-in fade-in-0 zoom-in-95 duration-300
        max-h-full overflow-y-auto
			`}
			>
				{/* Header */}
				<div className="flex items-start justify-between mb-4 sticky top-0 bg-inherit py-2">
					<div className="flex items-center gap-3">
						<span className="text-3xl">
							{event.icon || getEventTypeIcon(event.type)}
						</span>
						<div>
							<h2 className="text-xl font-bold text-gray-900">
								{event.title}
							</h2>
							<div className="flex items-center gap-2 text-sm">
								<span className={`
									px-2 py-1 rounded text-xs font-medium uppercase
									${event.urgency >= 4
										? "bg-red-200 text-red-800"
										: event.urgency >= 3
											? "bg-yellow-200 text-yellow-800"
											: "bg-blue-200 text-blue-800"
									}
								`}>
									{event.category}
								</span>
								<span className="text-gray-600">
									Urgencia: {event.urgency}/5
								</span>
							</div>
						</div>
					</div>

					{/* Timer si existe */}
					{event.timeLimit && (
						<div className="text-sm font-mono bg-gray-200 px-2 py-1 rounded">
							⏱️ {event.timeLimit}s
						</div>
					)}
				</div>

				{/* Descripción del evento */}
				<div className="mb-6">
					<p className="text-gray-800 leading-relaxed text-base">
						{event.description}
					</p>
				</div>

				{/* Opciones de decisión */}
				<div>
					<h3 className="font-semibold text-gray-900 mb-3 text-center">
						🤔 ¿Qué hacés?
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						{event.choices.map((choice: EventChoice, index: number) => (
							<button
								key={choice.id}
								onClick={() => handleChoiceClick(choice.id)}
								className={`
								w-full h-full p-4 text-left rounded-lg border-2 transition-all duration-200
								flex flex-col
								hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]
								border-gray-300 bg-white hover:border-purple-400 hover:bg-purple-50
								focus:outline-none focus:ring-2 focus:ring-purple-500
							`}
							>
								<div className="flex items-start gap-3">
									<span className="text-lg font-bold text-purple-600">
										{String.fromCharCode(65 + index)}
									</span>
									<div className="flex-1">
										<div className="font-medium text-gray-900 mb-1">
											{choice.text}
										</div>
										<div className="text-sm text-gray-600">
											{choice.description}
										</div>
									</div>
								</div>
								{/* Preview de efectos */}
								{choice.effects && choice.effects.length > 0 && (
									<div className="mt-3 pt-2 border-t border-gray-200 flex-grow flex items-end">
										<div>
											<span className="text-xs font-semibold text-gray-500 mb-1 block">
												Efectos esperados:
											</span>
											<div className="flex flex-wrap gap-1.5">
												{choice.effects.map((effect, i) => (
													<span
														key={i}
														className={`
													inline-block px-2 py-0.5 rounded-full text-xs font-medium
													${
														effect.change > 0
															? "text-green-800 bg-green-100"
															: "text-red-800 bg-red-100"
													}
												`}
													>
														{effect.change > 0 ? "+" : ""}
														{effect.change}{" "}
														{effect.type
															.charAt(0)
															.toUpperCase() +
															effect.type.slice(1)}
													</span>
												))}
											</div>
										</div>
									</div>
								)}
							</button>
						))}
					</div>
				</div>

				{/* Footer con información adicional */}
				<div className="mt-6 pt-4 border-t border-gray-200">
					<div className="flex items-center justify-between text-xs text-gray-500">
						<span>
							Provincia:{" "}
							{event.provinceId
								? event.provinceId.replace(/_/g, " ").toUpperCase()
								: "NACIONAL"}
						</span>
						<span>Presidencial Bardo • Sistema Político v1.2</span>
					</div>
				</div>

				{/* Efecto de urgencia para eventos críticos */}
				{event.urgency >= 4 && (
					<div className="absolute inset-0 rounded-lg border-2 border-red-500 animate-pulse pointer-events-none" />
				)}
			</div>
		</div>
	);
}
