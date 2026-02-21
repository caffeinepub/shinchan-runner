import { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import Player from './Player';
import Background from './Background';
import Collectible from './Collectible';
import Obstacle from './Obstacle';
import ScoreDisplay from './ScoreDisplay';
import GameOver from './GameOver';
import StartScreen from './StartScreen';
import { useCollectibles } from '../hooks/useCollectibles';
import { useObstacles } from '../hooks/useObstacles';
import { useControls } from '../hooks/useControls';
import { checkCollision } from '../utils/collision';
import { calculateSpeed } from '../utils/difficulty';

type GameState = 'start' | 'playing' | 'gameOver';

export default function Game() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(1);
  const playerPositionRef = useRef({ x: -6, y: 0 });
  
  const { collectibles, spawnCollectible, removeCollectible, clearCollectibles } = useCollectibles();
  const { obstacles, spawnObstacle, removeObstacle, clearObstacles } = useObstacles();
  const controls = useControls(gameState === 'playing');

  const spawnTimerRef = useRef({ collectible: 0, obstacle: 0 });

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setGameSpeed(1);
    clearCollectibles();
    clearObstacles();
    playerPositionRef.current = { x: -6, y: 0 };
    spawnTimerRef.current = { collectible: 0, obstacle: 0 };
  }, [clearCollectibles, clearObstacles]);

  const endGame = useCallback(() => {
    setGameState('gameOver');
  }, []);

  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  useFrame((state, delta) => {
    if (gameState !== 'playing') return;

    // Update game speed based on score
    const newSpeed = calculateSpeed(score);
    setGameSpeed(newSpeed);

    // Spawn collectibles
    spawnTimerRef.current.collectible += delta;
    if (spawnTimerRef.current.collectible > 2 / newSpeed) {
      spawnCollectible();
      spawnTimerRef.current.collectible = 0;
    }

    // Spawn obstacles
    spawnTimerRef.current.obstacle += delta;
    if (spawnTimerRef.current.obstacle > 3 / newSpeed) {
      spawnObstacle();
      spawnTimerRef.current.obstacle = 0;
    }

    // Check collectible collisions
    collectibles.forEach((collectible) => {
      if (checkCollision(playerPositionRef.current, collectible.position, 0.8, 0.6)) {
        removeCollectible(collectible.id);
        setScore((prev) => prev + 10);
      }
    });

    // Check obstacle collisions
    obstacles.forEach((obstacle) => {
      const obstacleSize = obstacle.type === 'rock' ? 0.8 : 1.0;
      if (checkCollision(playerPositionRef.current, obstacle.position, 0.8, obstacleSize)) {
        endGame();
      }
    });
  });

  return (
    <>
      <ambientLight intensity={1} />
      
      {gameState === 'playing' && (
        <>
          <Background speed={gameSpeed} />
          <Player 
            controls={controls} 
            positionRef={playerPositionRef}
          />
          
          {collectibles.map((collectible) => (
            <Collectible
              key={collectible.id}
              position={collectible.position}
              speed={gameSpeed}
              onOffScreen={() => removeCollectible(collectible.id)}
            />
          ))}
          
          {obstacles.map((obstacle) => (
            <Obstacle
              key={obstacle.id}
              position={obstacle.position}
              type={obstacle.type}
              speed={gameSpeed}
              onOffScreen={() => removeObstacle(obstacle.id)}
            />
          ))}
        </>
      )}

      <ScoreDisplay score={score} visible={gameState === 'playing'} />
      
      {gameState === 'start' && <StartScreen onStart={startGame} />}
      {gameState === 'gameOver' && <GameOver score={score} onRestart={restartGame} />}
    </>
  );
}
