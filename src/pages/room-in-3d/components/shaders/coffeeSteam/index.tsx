// @ts-ignore
import vertexShader from './vertex.glsl'
// @ts-ignore
import fragmentShader from './fragment.glsl'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'


const { tv, desk, pc } = {
  tv: '#ff115e',
  desk: '#ff6700',
  pc: '#0082ff',
}

export default function CoffeeShaderMaterial() {
  const material = useRef<THREE.ShaderMaterial>(null)

  useFrame((state) => {
    if (!material.current) return
    material.current.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <shaderMaterial 
      ref={material}
      uniforms={{
        uTime: { value: 0 },
        uTimeFrequency: { value: 0.0004 },
        uUvFrequency: { value: new THREE.Vector2(4, 5) },
        uColor: { value: new THREE.Color('#d2958a') }
      }}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
    />
  )
}