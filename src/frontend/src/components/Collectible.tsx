import { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

interface CollectibleProps {
  position: { x: number; y: number };
  speed: number;
  onOffScreen: () => void;
}

export default function Collectible({ position, speed, onOffScreen }: CollectibleProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const posRef = useRef({ ...position });
  
  const texture = useLoader(TextureLoader, '/assets/generated/chocobi-chip.dim_64x64.png');

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

    // Floating animation
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 3 + position.x) * 0.01;
    meshRef.current.rotation.z = state.clock.elapsedTime * 2;

    if (posRef.current.x < -12) {
      onOffScreen();
    }
  });

  return (
    <mesh ref={meshRef} position={[position.x, position.y, 0]}>
      <planeGeometry args={[0.8, 0.8]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}
