"use client";

import { useState } from "react";

interface SimulationControlProps {
	onAdvanceDay: () => void;
	isPaused: boolean;
}

export function SimulationControl({ onAdvanceDay, isPaused }: SimulationControlProps) {
	const [isLoading, setIsLoading] = useState(false);

	const handleAdvance = () => {
		setIsLoading(true);
		onAdvanceDay();
		// Simulate a short delay to give feedback to the user
		setTimeout(() => {
			setIsLoading(false);
		}, 300);
	};

	return (
		<div className="mb-6">
			<h3 className="text-lg font-semibold text-purple-300 mb-3">
				Control de Simulación
			</h3>
			<div className="space-y-2">
				<button
					onClick={handleAdvance}
					disabled={isPaused || isLoading}
					className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed px-4 py-2 rounded text-white font-medium transition-all duration-200"
				>
					{isLoading
						? "Avanzando..."
						: isPaused
							? "Decisión Pendiente"
							: "▶️ Avanzar 1 Día"}
				</button>
				<div className="text-sm text-gray-400">
					Estado:{" "}
					{isPaused
						? "🟡 En Pausa (Decisión Requerida)"
						: "🟢 Listo para avanzar"}
				</div>
			</div>
		</div>
	);
}
