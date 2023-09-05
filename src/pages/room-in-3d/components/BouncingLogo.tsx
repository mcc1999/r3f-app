import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

const animations = {
  limits: {
    y: { min: -1.055, max: 0.947 },
    z: { min: -1.076, max: 1.454 },
  },
  speed: {
    y: 0.00037,
    z: 0.00061,
  },
};

const updateAnimations = (key: 'y' | 'z', value: any) => {
  let res = {...value}
  if (key === 'y') {
    res.speed.y = -value.speed.y
  }
  if (key === 'z') {
    res.speed.z = -value.speed.z
  }
  console.log(res.speed);
  
  return res
}

const BouncingLogo: React.FC = () => {
  const threejsJourneyLogoTexture = useTexture(
    "/roomIn3d/threejsJourneyLogo.png"
  );
  const logoRef = useRef<THREE.Mesh>(null);
  const yOption = useRef('add')
  const zOption = useRef('add')

  useFrame((state, delta) => {
    if (!logoRef.current) return; 

    if (logoRef.current.position.y > (animations.limits.y.max - delta)) {
      if (yOption.current === 'add') yOption.current = 'sub'
    } 
    if (logoRef.current.position.y < (animations.limits.y.min + delta)) {
      if (yOption.current === 'sub') yOption.current = 'add'
    } 
    if (yOption.current === 'add') {
      logoRef.current.position.y += delta
    } else {
      logoRef.current.position.y -= delta
    }
    
    if (logoRef.current.position.z > (animations.limits.z.max - delta)) {
      if (zOption.current === 'add') zOption.current = 'sub'
    } 
    if (logoRef.current.position.z < (animations.limits.z.min + delta)) {
      if (zOption.current === 'sub') zOption.current = 'add'
    } 
    if (zOption.current === 'add') {
      logoRef.current.position.z += delta
    } else {
      logoRef.current.position.z -= delta
    }
  });

  return (
    <group position={[4.2, 2.717, 1.63]}>
      <mesh ref={logoRef} scale={[0.4, 0.359, 0.424]} rotation-y={-Math.PI / 2}>
        <planeGeometry args={[4, 1, 1, 1]} />
        <meshBasicMaterial
          transparent={true}
          premultipliedAlpha={true}
          map={threejsJourneyLogoTexture}
        />
      </mesh>
    </group>
  );
};

export default BouncingLogo;
