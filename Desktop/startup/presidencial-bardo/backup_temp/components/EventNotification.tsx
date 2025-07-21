"use client";

import { EventCategory, EventType } from "@/types/political";
import {
    AlertTriangle,
    Globe,
    Radio,
    Shield,
    TrendingDown,
    TrendingUp,
    Users,
    Volume2,
    X,
    Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

interface EventNotificationProps {
	/** ID único de la notificación */
	id: string;

	/** Título del evento */
	title: string;

	/** Descripción del evento */
	description: string;

	/** Tipo de evento */
	type: EventType;

	/** Categoría del evento */
	category?: EventCategory;

	/** Nivel de urgencia (1-5) */
	urgency?: number;

	/** Provincia afectada (opcional) */
	province?: string;

	/** Si se debe mostrar automáticamente */
	autoShow?: boolean;

	/** Duración en pantalla en segundos */
	duration?: number;

	/** Callback cuando se cierra */
	onClose?: () => void;

	/** Callback cuando se hace click */
	onClick?: () => void;

	/** Si se debe reproducir sonido */
	playSound?: boolean;

	/** Posición de la notificación */
	position?: "top" | "bottom" | "center";

	/** Si debe ser compacta */
	isCompact?: boolean;
}

export function EventNotification({
	id,
	title,
	description,
	type,
	category,
	urgency = 3,
	province,
	autoShow = true,
	duration = 8,
	onClose,
	onClick,
	playSound = true,
	position = "top",
	isCompact = false,
}: EventNotificationProps) {
	const [isVisible, setIsVisible] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [timeRemaining, setTimeRemaining] = useState(duration);

	useEffect(() => {
		if (autoShow) {
			setIsVisible(true);
		}
	}, [autoShow]);

	// Auto-close timer
	useEffect(() => {
		if (!isVisible || duration <= 0) return;

		const interval = setInterval(() => {
			setTimeRemaining((prev) => {
				if (prev <= 1) {
					handleClose();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [isVisible, duration]);

	const handleClose = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsVisible(false);
			onClose?.();
		}, 300);
	};

	const handleClick = () => {
		onClick?.();
	};

	const getEventIcon = () => {
		const className = "w-6 h-6";

		switch (type) {
			case EventType.CRISIS:
				return <AlertTriangle className={className} />;
			case EventType.EMERGENCIA:
				return <AlertTriangle className={className} />;
			case EventType.OPORTUNIDAD:
				return <TrendingUp className={className} />;
			case EventType.DECISION:
				return <Users className={className} />;
			case EventType.CONFLICTO_FACCIONES:
				return <Shield className={className} />;
			default:
				return <Radio className={className} />;
		}
	};

	const getCategoryIcon = () => {
		const className = "w-4 h-4";

		switch (category) {
			case EventCategory.INTERNACIONAL:
				return <Globe className={className} />;
			case EventCategory.SEGURIDAD:
				return <Shield className={className} />;
			case EventCategory.ECONOMICO:
				return <TrendingDown className={className} />;
			case EventCategory.SOCIAL:
				return <Users className={className} />;
			default:
				return <Zap className={className} />;
		}
	};

	const getTypeColor = () => {
		switch (type) {
			case EventType.CRISIS:
			case EventType.EMERGENCIA:
				return "rgb(239, 68, 68)"; // red-500
			case EventType.OPORTUNIDAD:
				return "rgb(34, 197, 94)"; // green-500
			case EventType.DECISION:
				return "rgb(251, 191, 36)"; // amber-400
			case EventType.CONFLICTO_FACCIONES:
				return "rgb(249, 115, 22)"; // orange-500
			case EventType.HUMOR_NEGRO:
				return "rgb(168, 85, 247)"; // purple-500
			default:
				return "rgb(59, 130, 246)"; // blue-500
		}
	};

	const getTypeText = () => {
		switch (type) {
			case EventType.CRISIS:
				return "CRISIS";
			case EventType.EMERGENCIA:
				return "EMERGENCIA";
			case EventType.OPORTUNIDAD:
				return "OPORTUNIDAD";
			case EventType.DECISION:
				return "DECISIÓN REQUERIDA";
			case EventType.CONFLICTO_FACCIONES:
				return "CONFLICTO";
			case EventType.HUMOR_NEGRO:
				return "NOTICIA";
			case EventType.CONSECUENCIA:
				return "CONSECUENCIA";
			default:
				return "EVENTO";
		}
	};

	const getBadgeText = () => {
		if (province) return province;
		if (category) {
			switch (category) {
				case EventCategory.INTERNACIONAL:
					return "INTERNACIONAL";
				case EventCategory.ECONOMICO:
					return "ECONOMÍA";
				case EventCategory.SOCIAL:
					return "SOCIAL";
				case EventCategory.SEGURIDAD:
					return "SEGURIDAD";
				case EventCategory.DEPORTIVO:
					return "DEPORTES";
				case EventCategory.CULTURAL:
					return "CULTURA";
				case EventCategory.PROVINCIAL:
					return "PROVINCIAL";
				default:
					return "GENERAL";
			}
		}
		return "GENERAL";
	};

	const getPositionStyles = () => {
		switch (position) {
			case "top":
				return "top-4 left-1/2 transform -translate-x-1/2";
			case "bottom":
				return "bottom-4 left-1/2 transform -translate-x-1/2";
			case "center":
				return "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
			default:
				return "top-4 right-4";
		}
	};

	const shouldPulse = urgency >= 4;
	const shouldBlink = urgency >= 5;

	if (!isVisible) return null;

	if (isCompact) {
		return (
			<div
				className={`
					fixed z-50 ${getPositionStyles()}
					transition-all duration-300 ease-out
					${isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"}
					${shouldPulse ? "animate-pulse" : ""}
				`}
			>
				<div
					className={`
						flex items-center gap-3 px-4 py-2 rounded-lg border
						bg-black/90 backdrop-blur-sm cursor-pointer
						hover:scale-105 transition-transform duration-200
					`}
					style={{
						borderColor: getTypeColor(),
						boxShadow: `0 0 15px ${getTypeColor()}60`,
					}}
					onClick={handleClick}
				>
					<div style={{ color: getTypeColor() }}>{getEventIcon()}</div>
					<div className="flex-1 min-w-0">
						<p className="text-white font-bold text-sm truncate">{title}</p>
					</div>
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							handleClose();
						}}
						className="text-gray-400 hover:text-white transition-colors"
						aria-label="Cerrar notificación"
					>
						<X className="w-4 h-4" />
					</button>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`
				fixed z-50 ${getPositionStyles()}
				transition-all duration-500 ease-out
				${isClosing ? "opacity-0 translate-y-[-20px] scale-95" : "opacity-100 translate-y-0 scale-100"}
				${shouldPulse ? "animate-pulse" : ""}
				${shouldBlink ? "animate-bounce" : ""}
			`}
		>
			<div
				className={`
					max-w-md w-full bg-black/95 backdrop-blur-sm rounded-xl border-2
					shadow-2xl cursor-pointer
					hover:scale-[1.02] transition-all duration-300
				`}
				style={{
					borderColor: getTypeColor(),
					boxShadow: `0 0 30px ${getTypeColor()}40, 0 10px 25px rgba(0,0,0,0.3)`,
				}}
				onClick={handleClick}
			>
				{/* Breaking News Header */}
				<div
					className="relative px-4 py-2 rounded-t-xl"
					style={{ backgroundColor: `${getTypeColor()}20` }}
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div
								className={`
									p-1 rounded-full
									${shouldBlink ? "animate-pulse" : ""}
								`}
								style={{ backgroundColor: getTypeColor() }}
							>
								<Radio className="w-3 h-3 text-white" />
							</div>
							<span
								className="text-xs font-black tracking-wider"
								style={{ color: getTypeColor() }}
							>
								🚨 BREAKING NEWS
							</span>
						</div>

						<div className="flex items-center gap-2">
							{playSound && (
								<Volume2
									className="w-4 h-4"
									style={{ color: getTypeColor() }}
								/>
							)}
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									handleClose();
								}}
								className="text-gray-400 hover:text-white transition-colors"
								aria-label="Cerrar notificación"
							>
								<X className="w-4 h-4" />
							</button>
						</div>
					</div>

					{/* Scrolling text effect */}
					<div className="overflow-hidden whitespace-nowrap mt-1">
						<div
							className="animate-pulse text-xs font-semibold"
							style={{ color: getTypeColor() }}
						>
							{getTypeText()} • {getBadgeText()} • PRESIDENCIAL BARDO
						</div>
					</div>
				</div>

				{/* Content */}
				<div className="p-4">
					<div className="flex items-start gap-3">
						<div
							className={`
								p-2 rounded-full flex-shrink-0
								${shouldPulse ? "animate-pulse" : ""}
							`}
							style={{ backgroundColor: `${getTypeColor()}20` }}
						>
							<div style={{ color: getTypeColor() }}>{getEventIcon()}</div>
						</div>

						<div className="flex-1 min-w-0">
							<h3 className="text-white font-bold text-lg mb-2 leading-tight">
								{title}
							</h3>
							<p className="text-gray-300 text-sm leading-relaxed mb-3">
								{description}
							</p>

							{/* Tags */}
							<div className="flex items-center gap-2 flex-wrap">
								<span
									className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border"
									style={{
										backgroundColor: `${getTypeColor()}10`,
										borderColor: getTypeColor(),
										color: getTypeColor(),
									}}
								>
									{getCategoryIcon()}
									{getBadgeText()}
								</span>

								{urgency >= 4 && (
									<span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-red-500/20 border border-red-500 text-red-400">
										<AlertTriangle className="w-3 h-3" />
										URGENTE
									</span>
								)}
							</div>
						</div>
					</div>

					{/* Progress bar for auto-close */}
					{duration > 0 && (
						<div className="mt-4">
							<div className="w-full bg-gray-800/50 rounded-full h-1">
								<div
									className="h-full rounded-full transition-all duration-1000 ease-linear"
									style={{
										width: `${(timeRemaining / duration) * 100}%`,
										backgroundColor: getTypeColor(),
									}}
								/>
							</div>
							<div className="flex justify-between items-center mt-1 text-xs text-gray-500">
								<span>Click para ver detalles</span>
								<span>{timeRemaining}s</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
