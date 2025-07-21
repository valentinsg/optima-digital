"use client";

import {
	ChevronLeft,
	ChevronRight,
	Pause,
	Play
} from "lucide-react";
import { useMemo } from "react";

interface PoliticalCalendarProps {
	currentDay: number;
	onToggleSimulationAction: () => void;
	isSimulating: boolean;
	isPaused: boolean;
}

const MONTHS = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre",
];
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const START_YEAR = 2025;

export function PoliticalCalendar({
	currentDay,
	onToggleSimulationAction,
	isSimulating,
	isPaused,
}: PoliticalCalendarProps) {
	const { monthIndex, dayOfMonth, year, daysInCurrentMonth } = useMemo(() => {
		let day = currentDay;
		let year = START_YEAR;
		let monthIndex = 0;

		while (day > DAYS_IN_MONTH[monthIndex]) {
			day -= DAYS_IN_MONTH[monthIndex];
			monthIndex++;
			if (monthIndex >= 12) {
				monthIndex = 0;
				year++;
			}
		}

		return {
			monthIndex,
			dayOfMonth: day,
			year,
			daysInCurrentMonth: DAYS_IN_MONTH[monthIndex],
		};
	}, [currentDay]);

	const renderDays = () => {
		const days = [];
		const firstDayOfWeek = new Date(year, monthIndex, 1).getDay();

		for (let i = 0; i < firstDayOfWeek; i++) {
			days.push(<div key={`empty-${i}`} className="h-10" />);
		}

		for (let i = 1; i <= daysInCurrentMonth; i++) {
			const isCurrent = i === dayOfMonth;

			days.push(
				<div
					key={i}
					className={`
            h-10 flex items-center justify-center rounded-lg transition-all duration-200 text-sm
            ${isCurrent
							? "bg-purple-600 text-white font-bold ring-2 ring-purple-300 scale-110"
							: "bg-gray-800/80 text-white"
						}
          `}
				>
					{i}
				</div>,
			);
		}
		return days;
	};

	return (
		<div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
			<div className="flex items-center justify-between mb-3">
				<button
					className="p-1 rounded-md hover:bg-purple-700 transition-colors"
					disabled
				>
					<ChevronLeft className="w-5 h-5 text-gray-500" />
				</button>
				<h3 className="text-lg font-bold text-white tracking-widest">
					{MONTHS[monthIndex]} {year}
				</h3>
				<button
					className="p-1 rounded-md hover:bg-purple-700 transition-colors"
					disabled
				>
					<ChevronRight className="w-5 h-5 text-gray-500" />
				</button>
			</div>

			<div className="grid grid-cols-7 gap-1.5 mb-4">{renderDays()}</div>

			<div className="space-y-2 pt-3 border-t border-purple-500/20">
				<button
					type="button"
					onClick={onToggleSimulationAction}
					className={`
            w-full flex items-center justify-center px-4 py-2 rounded-lg text-white font-semibold transition-all duration-200
            ${isSimulating ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"}
            disabled:bg-gray-500/50
          `}
					disabled={isPaused}
				>
					{isSimulating ? (
						<Pause className="w-4 h-4 mr-2" />
					) : (
						<Play className="w-4 h-4 mr-2" />
					)}
					{isSimulating ? "Pausar" : "Simular"}
				</button>
			</div>
		</div>
	);
}
