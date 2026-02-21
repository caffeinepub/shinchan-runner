import { useState, useCallback } from 'react';

interface Obstacle {
  id: string;
  position: { x: number; y: number };
  type: 'rock' | 'puddle';
}

export function useObstacles() {
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);

  const spawnObstacle = useCallback(() => {
    const type = Math.random() > 0.5 ? 'rock' : 'puddle';
    const newObstacle: Obstacle = {
      id: `obstacle-${Date.now()}-${Math.random()}`,
      position: {
        x: 12,
        y: type === 'puddle' ? -2 : Math.random() > 0.5 ? -2 : 0,
      },
      type,
    };
    setObstacles((prev) => [...prev, newObstacle]);
  }, []);

  const removeObstacle = useCallback((id: string) => {
    setObstacles((prev) => prev.filter((o) => o.id !== id));
  }, []);

  const clearObstacles = useCallback(() => {
    setObstacles([]);
  }, []);

  return {
    obstacles,
    spawnObstacle,
    removeObstacle,
    clearObstacles,
  };
}
