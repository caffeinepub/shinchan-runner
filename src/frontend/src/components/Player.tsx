import { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

interface PlayerProps {
  controls: { jump: boolean; moveUp: boolean; moveDown: boolean };
  positionRef: React.MutableRefObject<{ x: number; y: number }>;
}

export default function Player({ controls, positionRef }: PlayerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const velocityRef = useRef(0);
  const isGroundedRef = useRef(true);
  
  const texture = useLoader(TextureLoader, '/assets/generated/shinchan-running.dim_128x128.png');

  useEffect(() => {
    if (texture) {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.NearestFilter;
    }
  }, [texture]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const GRAVITY = -20;
    const JUMP_FORCE = 8;
    const GROUND_Y = -2;
    const MAX_Y = 3;

    // Handle jump
    if (controls.jump && isGroundedRef.current) {
      velocityRef.current = JUMP_FORCE;
      isGroundedRef.current = false;
    }

    // Apply gravity
    velocityRef.current += GRAVITY * delta;
    positionRef.current.y += velocityRef.current * delta;

    // Ground collision
    if (positionRef.current.y <= GROUND_Y) {
      positionRef.current.y = GROUND_Y;
      velocityRef.current = 0;
      isGroundedRef.current = true;
    }

    // Ceiling collision
    if (positionRef.current.y > MAX_Y) {
      positionRef.current.y = MAX_Y;
      velocityRef.current = 0;
    }

    // Update mesh position
    meshRef.current.position.x = positionRef.current.x;
    meshRef.current.position.y = positionRef.current.y;

    // Add subtle bounce animation
    const bounce = Math.sin(state.clock.elapsedTime * 10) * 0.05;
    meshRef.current.rotation.z = bounce * 0.5;
  });

  return (
    <mesh ref={meshRef} position={[-6, -2, 0]}>
      <planeGeometry args={[1.5, 1.5]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}
