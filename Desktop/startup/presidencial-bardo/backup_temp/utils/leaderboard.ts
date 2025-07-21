import { supabase } from "@/lib/supabase";
import { type LeaderboardEntry } from "@/types/game";

/**
 * Obtiene el top 10 de scores del leaderboard
 */
export async function getTopScores(): Promise<LeaderboardEntry[]> {
	try {
		const { data, error } = await supabase
			.from("leaderboard")
			.select("*")
			.order("score", { ascending: false })
			.limit(10); // Aumentado a 10 para un leaderboard más completo

		if (error) {
			console.error("Error fetching top scores:", error);
			return [];
		}

		return data || [];
	} catch (error) {
		console.error("Error fetching top scores:", error);
		return [];
	}
}

/**
 * Obtiene todos los scores ordenados por fecha (más recientes primero)
 */
export async function getAllScores(): Promise<LeaderboardEntry[]> {
	try {
		const { data, error } = await supabase
			.from("leaderboard")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) {
			console.error("Error fetching all scores:", error);
			return [];
		}

		return data || [];
	} catch (error) {
		console.error("Error fetching all scores:", error);
		return [];
	}
}

/**
 * Obtiene estadísticas generales del juego, como el total de partidas jugadas.
 */
export async function getGameStats(): Promise<{ totalGames: number }> {
	try {
		// Contar el número total de filas en la tabla game_stats
		const { count, error } = await supabase
			.from("game_stats")
			.select("*", { count: "exact", head: true });

		if (error) {
			console.error("Error fetching game stats:", error);
			return { totalGames: 0 };
		}

		return { totalGames: count || 0 };
	} catch (error) {
		console.error("Error fetching game stats:", error);
		return { totalGames: 0 };
	}
}

/**
 * Obtiene la posición de un score en el ranking
 */
export async function getScoreRank(score: number): Promise<number> {
	try {
		const { count, error } = await supabase
			.from("leaderboard")
			.select("*", { count: "exact", head: true })
			.gt("score", score);

		if (error) {
			console.error("Error getting score rank:", error);
			return 0;
		}

		return (count || 0) + 1;
	} catch (error) {
		console.error("Error getting score rank:", error);
		return 0;
	}
}
