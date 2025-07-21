"use client";

import { AlertTriangle, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface DecisionTimerProps {
	/** Tiempo límite total en segundos */
	timeLimit: number;

	/** Callback cuando el tiempo se agota */
	onTimeUp: () => void;

	/** Callback con el tiempo restante */
	onTimeUpdate?: (timeRemaining: number) => void;

	/** Nivel de urgencia del evento (1-5) */
	urgency?: number;

	/** Si el timer está pausado */
	isPaused?: boolean;

	/** Texto personalizado para mostrar */
	customText?: string;

	/** Si debe ser compacto */
	isCompact?: boolean;
}

export function DecisionTimer({
	timeLimit,
	onTimeUp,
	onTimeUpdate,
	urgency = 3,
	isPaused = false,
	customText,
	isCompact = false,
}: DecisionTimerProps) {
	const [timeRemaining, setTimeRemaining] = useState(timeLimit);
	const [isBlinking, setIsBlinking] = useState(false);

	useEffect(() => {
		setTimeRemaining(timeLimit);
	}, [timeLimit]);

	useEffect(() => {
		if (isPaused || timeRemaining <= 0) return;

		const interval = setInterval(() => {
			setTimeRemaining((prev) => {
				const newTime = Math.max(0, prev - 1);
				onTimeUpdate?.(newTime);

				if (newTime === 0) {
					onTimeUp();
				}

				return newTime;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [isPaused, timeRemaining, onTimeUp, onTimeUpdate]);

	// Configurar parpadeo en los últimos 10 segundos
	useEffect(() => {
		setIsBlinking(timeRemaining <= 10 && timeRemaining > 0);
	}, [timeRemaining]);

	const formatTime = (seconds: number): string => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	const getUrgencyColor = () => {
		if (timeRemaining <= 5) return "rgb(239, 68, 68)"; // red-500
		if (timeRemaining <= 15) return "rgb(249, 115, 22)"; // orange-500
		if (timeRemaining <= 30) return "rgb(251, 191, 36)"; // amber-400

		switch (urgency) {
			case 5:
				return "rgb(239, 68, 68)"; // red-500
			case 4:
				return "rgb(249, 115, 22)"; // orange-500
			case 3:
				return "rgb(251, 191, 36)"; // amber-400
			case 2:
				return "rgb(34, 197, 94)"; // green-500
			case 1:
			default:
				return "rgb(168, 85, 247)"; // purple-500
		}
	};

	const getProgressPercentage = (): number => {
		return (timeRemaining / timeLimit) * 100;
	};

	const getUrgencyText = (): string => {
		if (timeRemaining <= 5) return "¡CRÍTICO!";
		if (timeRemaining <= 15) return "¡URGENTE!";
		if (timeRemaining <= 30) return "¡DECIDE YA!";

		switch (urgency) {
			case 5:
				return "CRISIS EXTREMA";
			case 4:
				return "ALTA URGENCIA";
			case 3:
				return "DECISIÓN IMPORTANTE";
			case 2:
				return "TIEMPO LIMITADO";
			case 1:
			default:
				return "PIENSA BIEN";
		}
	};

	const shouldPulse = timeRemaining <= 10;
	const shouldShake = timeRemaining <= 5;

	if (isCompact) {
		return (
			<div
				className={`
					flex items-center gap-2 px-3 py-2 rounded-lg border
					${shouldShake ? "animate-pulse" : ""}
					${isBlinking ? "animate-pulse" : ""}
				`}
				style={{
					backgroundColor: `${getUrgencyColor()}20`,
					borderColor: getUrgencyColor(),
					boxShadow: `0 0 10px ${getUrgencyColor()}60`,
				}}
			>
				<Clock className="w-4 h-4" style={{ color: getUrgencyColor() }} />
				<span
					className="font-bold text-sm"
					style={{ color: getUrgencyColor() }}
				>
					{formatTime(timeRemaining)}
				</span>
			</div>
		);
	}

	return (
		<div
			className={`
				relative bg-black/80 backdrop-blur-sm rounded-xl border-2 p-6
				${shouldShake ? "animate-bounce" : ""}
				${shouldPulse ? "animate-pulse" : ""}
				transition-all duration-300
			`}
			style={{
				borderColor: getUrgencyColor(),
				boxShadow: `0 0 20px ${getUrgencyColor()}40`,
			}}
		>
			{/* Header */}
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-3">
					<div
						className={`
							p-2 rounded-full
							${isBlinking ? "animate-pulse" : ""}
						`}
						style={{ backgroundColor: `${getUrgencyColor()}20` }}
					>
						{timeRemaining <= 10 ? (
							<AlertTriangle
								className="w-6 h-6"
								style={{ color: getUrgencyColor() }}
							/>
						) : (
							<Clock
								className="w-6 h-6"
								style={{ color: getUrgencyColor() }}
							/>
						)}
					</div>
					<div>
						<h3 className="text-white font-bold text-lg">Tiempo de Decisión</h3>
						<p
							className="text-sm font-semibold"
							style={{ color: getUrgencyColor() }}
						>
							{getUrgencyText()}
						</p>
					</div>
				</div>

				{/* Countdown display */}
				<div className="text-right">
					<div
						className={`
							text-4xl font-bold mb-1
							${isBlinking ? "animate-pulse" : ""}
						`}
						style={{ color: getUrgencyColor() }}
					>
						{formatTime(timeRemaining)}
					</div>
					{customText && (
						<p className="text-gray-300 text-sm">{customText}</p>
					)}
				</div>
			</div>

			{/* Progress Bar */}
			<div className="w-full bg-gray-800/50 rounded-full h-3 border border-gray-700">
				<div
					className={`
						h-full rounded-full transition-all duration-1000 ease-out
						${shouldPulse ? "animate-pulse" : ""}
					`}
					style={{
						width: `${getProgressPercentage()}%`,
						backgroundColor: getUrgencyColor(),
						boxShadow: `0 0 10px ${getUrgencyColor()}80`,
					}}
				/>
			</div>

			{/* Status text */}
			<div className="flex justify-between items-center mt-3 text-sm">
				<span className="text-gray-400">
					{isPaused ? "⏸️ PAUSADO" : "⏰ Tiempo restante"}
				</span>
				<span className="text-gray-300">
					{Math.round((timeRemaining / timeLimit) * 100)}% restante
				</span>
			</div>

			{/* Warning messages */}
			{timeRemaining <= 15 && timeRemaining > 0 && (
				<div
					className={`
						mt-4 p-3 rounded-lg border text-center
						${isBlinking ? "animate-pulse" : ""}
					`}
					style={{
						backgroundColor: `${getUrgencyColor()}10`,
						borderColor: getUrgencyColor(),
					}}
				>
					<p
						className="font-bold text-sm"
						style={{ color: getUrgencyColor() }}
					>
						{timeRemaining <= 5
							? "⚠️ ¡Se elegirá automáticamente la opción por defecto!"
							: "⏰ ¡El tiempo se está agotando!"}
					</p>
				</div>
			)}
		</div>
	);
}
