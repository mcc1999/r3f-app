import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

const Test: React.FC = () => {
  const logoRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!logoRef.current) return; 

    logoRef.current.position.y += 0.1
    logoRef.current.position.z += 0.1
  });

  return (
    <group position={[10, 0, 0]}>
      <mesh ref={logoRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </group>
  );
};

export default Test;
