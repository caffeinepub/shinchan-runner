import { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

interface ObstacleProps {
  position: { x: number; y: number };
  type: 'car' | 'trafficCone';
  speed: number;
  onOffScreen: () => void;
}

export default function Obstacle({ position, type, speed, onOffScreen }: ObstacleProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const posRef = useRef({ ...position });
  
  const carTexture = useLoader(TextureLoader, '/assets/generated/car-obstacle.dim_128x64.png');
  const trafficConeTexture = useLoader(TextureLoader, '/assets/generated/traffic-cone.dim_64x64.png');

  const texture = type === 'car' ? carTexture : trafficConeTexture;
  const size: [number, number] = type === 'car' ? [1.28, 0.64] : [0.64, 0.64];

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
