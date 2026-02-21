import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

interface BackgroundProps {
  speed: number;
}

export default function Background({ speed }: BackgroundProps) {
  const bg1Ref = useRef<THREE.Mesh>(null);
  const bg2Ref = useRef<THREE.Mesh>(null);
  
  const texture = useLoader(TextureLoader, '/assets/generated/game-background.dim_1920x600.png');

  useFrame((state, delta) => {
    if (!bg1Ref.current || !bg2Ref.current) return;

    const scrollSpeed = speed * 3 * delta;
    
    bg1Ref.current.position.x -= scrollSpeed;
    bg2Ref.current.position.x -= scrollSpeed;

    // Reset position for infinite scroll
    if (bg1Ref.current.position.x < -20) {
      bg1Ref.current.position.x = bg2Ref.current.position.x + 20;
    }
    if (bg2Ref.current.position.x < -20) {
      bg2Ref.current.position.x = bg1Ref.current.position.x + 20;
    }
  });

  return (
    <>
      <mesh ref={bg1Ref} position={[0, 0, -5]}>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      <mesh ref={bg2Ref} position={[20, 0, -5]}>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  );
}
