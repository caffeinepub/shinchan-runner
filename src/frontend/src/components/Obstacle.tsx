import { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

interface ObstacleProps {
  position: { x: number; y: number };
  type: 'rock' | 'puddle';
  speed: number;
  onOffScreen: () => void;
}

export default function Obstacle({ position, type, speed, onOffScreen }: ObstacleProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const posRef = useRef({ ...position });
  
  const rockTexture = useLoader(TextureLoader, '/assets/generated/obstacle-rock.dim_80x80.png');
  const puddleTexture = useLoader(TextureLoader, '/assets/generated/obstacle-puddle.dim_100x60.png');

  const texture = type === 'rock' ? rockTexture : puddleTexture;
  const size: [number, number] = type === 'rock' ? [1, 1] : [1.2, 0.8];

  useEffect(() => {
    if (texture) {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.NearestFilter;
    }
  }, [texture]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    posRef.current.x -= speed * 3 * delta;
    meshRef.current.position.x = posRef.current.x;
    meshRef.current.position.y = posRef.current.y;

    if (posRef.current.x < -12) {
      onOffScreen();
    }
  });

  return (
    <mesh ref={meshRef} position={[position.x, position.y, 0]}>
      <planeGeometry args={size} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}
