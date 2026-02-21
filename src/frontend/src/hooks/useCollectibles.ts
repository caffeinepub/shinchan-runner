import { useState, useCallback } from 'react';

interface Collectible {
  id: string;
  position: { x: number; y: number };
}

export function useCollectibles() {
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);

  const spawnCollectible = useCallback(() => {
    const newCollectible: Collectible = {
      id: `collectible-${Date.now()}-${Math.random()}`,
      position: {
        x: 12,
        y: Math.random() * 4 - 2, // Random height between -2 and 2
      },
    };
    setCollectibles((prev) => [...prev, newCollectible]);
  }, []);

  const removeCollectible = useCallback((id: string) => {
    setCollectibles((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const clearCollectibles = useCallback(() => {
    setCollectibles([]);
  }, []);

  return {
    collectibles,
    spawnCollectible,
    removeCollectible,
    clearCollectibles,
  };
}
