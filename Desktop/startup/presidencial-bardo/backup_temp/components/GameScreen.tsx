import { FloatingParticles } from "@/components/FloatingParticles";
import { GameCanvas } from "@/components/GameCanvas";
import { GameOverlay } from "@/components/GameOverlay";
import { GameUI } from "@/components/GameUI";
import { Marketplace } from "@/components/Marketplace";
import type { GameScreenState } from "@/hooks/useGameScreens";
import type { GameState } from "@/types/game";
import type { GameplayEffects } from "@/types/political";
import React from "react";

interface GameScreenProps {
	screenState: GameScreenState;
	gameStateRef: React.RefObject<GameState | null>;
	canvasRef: React.RefObject<HTMLCanvasElement | null>;
	playerSpritesRef: React.RefObject<{
		[key: string]: HTMLImageElement | null;
	}>;
	creatureSpritesRef: React.RefObject<{
		[key: string]: HTMLImageElement | null;
	}>;
	floorTextureRef: React.RefObject<HTMLImageElement | null>;
	healthPackSpriteRef: React.RefObject<HTMLImageElement | null>;
	playCreatureDeath: () => void;
	playPlayerCast: () => void;
	playPlayerHit: () => void;
	onMouseMove: (e: MouseEvent) => void;
	onMouseClick: (e: MouseEvent) => void;
	onStartNextWave: () => void;
	setScore: (score: number) => void;
	setPlayerHealth: (health: number) => void;
	setPlayerCoins: (coins: number) => void;
	setGameOver: (gameOver: boolean, score: number) => void;
	onResetGame: () => void;
	onReturnHome: () => void;
	onShare: () => void;
	onSaveScore: () => void;
	togglePause?: () => void;
	isPaused?: boolean;
	onUpgradeWeapon: () => void;
	onUpgradeHealth: () => void;
	onContinueFromMarketplace: () => void;
	onFullscreenChange: (isFullscreen: boolean) => void;
	gameplayEffects: GameplayEffects;
}

export function GameScreen({
	screenState,
	gameStateRef,
	canvasRef,
	playerSpritesRef,
	creatureSpritesRef,
	floorTextureRef,
	healthPackSpriteRef,
	playCreatureDeath,
	playPlayerCast,
	playPlayerHit,
	onMouseMove,
	onMouseClick,
	onStartNextWave,
	setScore,
	setPlayerHealth,
	setPlayerCoins,
	setGameOver,
	onResetGame,
	onReturnHome,
	onShare,
	onSaveScore,
	togglePause,
	isPaused,
	onUpgradeWeapon,
	onUpgradeHealth,
	onContinueFromMarketplace,
	onFullscreenChange,
	gameplayEffects,
}: GameScreenProps) {
	const {
		score,
		currentWave,
		playerHealth,
		playerCoins,
		gameOver,
		gameWon,
		waveMessage,
		showScoreModal,
	} = screenState;

	const [isFullscreen, setIsFullscreen] = React.useState(false);

	return (
		<div
			className={`relative w-full h-full flex items-center justify-center bg-black ${
				isFullscreen ? "" : "p-4"
			}`}
		>
			<FloatingParticles />
			<GameCanvas
				canvasRef={canvasRef}
				gameStateRef={gameStateRef}
				playerSpritesRef={playerSpritesRef}
				creatureSpritesRef={creatureSpritesRef}
				floorTexture={floorTextureRef.current}
				healthPackSprite={healthPackSpriteRef.current}
				waveMessage={waveMessage}
				startNextWave={onStartNextWave}
				setScore={setScore}
				setPlayerHealth={setPlayerHealth}
				setPlayerCoins={setPlayerCoins}
				setGameOver={setGameOver}
				onMouseMove={onMouseMove}
				onMouseClick={onMouseClick}
				onCreatureDeath={playCreatureDeath}
				onPlayerHit={playPlayerHit}
				onFullscreenChange={onFullscreenChange}
				gameplayEffects={gameplayEffects}
			/>
			<GameUI
				score={score}
				currentWave={currentWave}
				playerHealth={playerHealth}
				playerMaxHealth={gameStateRef.current?.player.maxHealth ?? 100}
				playerCoins={playerCoins}
				isPaused={isPaused}
				onTogglePause={togglePause}
				onFullscreenToggle={() => {
					/* Handled by GameCanvas now */
				}}
				player={gameStateRef.current?.player}
				comboKills={gameStateRef.current?.comboKills}
				onResetGame={onResetGame}
				onReturnHome={onReturnHome}
				onShare={onShare}
			/>
			{(gameOver || gameWon) && (
				<GameOverlay
					gameWon={gameWon}
					score={score}
					playerCoins={playerCoins}
					currentWave={currentWave}
					showScoreModal={showScoreModal}
					onResetGame={onResetGame}
					onReturnHome={onReturnHome}
					onSaveScore={onSaveScore}
				/>
			)}
			{gameStateRef.current?.showMarketplace && (
				<Marketplace
					player={gameStateRef.current.player}
					onUpgradeWeapon={onUpgradeWeapon}
					onUpgradeHealth={onUpgradeHealth}
					onContinue={onContinueFromMarketplace}
				/>
			)}
		</div>
	);
}
