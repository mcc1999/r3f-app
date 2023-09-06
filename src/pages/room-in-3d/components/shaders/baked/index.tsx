// @ts-ignore
import vertexShader from './vertex.glsl'
// @ts-ignore
import fragmentShader from './fragment.glsl'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef } from 'react'


const { tv, desk, pc } = {
  tv: '#ff115e',
  desk: '#ff6700',
  pc: '#0082ff',
}

export default function BakedShaderMaterial() {
  const material = useRef<THREE.ShaderMaterial>(null)
  function handleNumberChange(v: number, key: string) {
    if (!material.current) return
    material.current.uniforms[key].value = v; 
  }
  function handleColorChange(v: number, key: string) {
    if (!material.current) return
    material.current.uniforms[key].value = new THREE.Color(v); 
  }
  useControls({
    NightMix: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.1,
      onChange: (v) => handleNumberChange(v, 'uNightMix')
    },
    NeutralMix: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.1,
      onChange: (v) => handleNumberChange(v, 'uNeutralMix')
    },
    LightTvStrength: {
      value: 1.47,
      min: 0,
      max: 3,
      step: 0.1,
      onChange: (v) => handleNumberChange(v, 'uLightTvStrength')
    },
    LightDeskStrength: {
      value: 1.9,
      min: 0,
      max: 3,
      step: 0.1,
      onChange: (v) => handleNumberChange(v, 'uLightDeskStrength')

    },
    LightPcStrength: {
      value: 1.4,
      min: 0,
      max: 3,
      step: 0.1,
      onChange: (v) => handleNumberChange(v, 'uLightPcStrength')
    },
    LightTvColor: {
      value: tv,
      onChange: (v) => handleColorChange(v, 'uLightTvColor')

    },
    LightDeskColor: {
      value: desk,
      onChange: (v) => handleColorChange(v, 'uLightDeskColor')
    },
    LightPcColor: {
      value: pc,
      onChange: (v) => handleColorChange(v, 'uLightPcColor')
    },
  })
  const [
    bakedDayTexture,
    bakedNightTexture,
    bakedNeutralTexture,
    lightMapTexture,
  ] = useTexture([
    '/roomIn3d/bakedDay.jpg', 
    '/roomIn3d/bakedNight.jpg', 
    '/roomIn3d/bakedNeutral.jpg', 
    '/roomIn3d/lightMap.jpg'
  ])

  bakedDayTexture.encoding = THREE.sRGBEncoding
  bakedDayTexture.flipY = false
  bakedNightTexture.encoding = THREE.sRGBEncoding
  bakedNightTexture.flipY = false
  bakedNeutralTexture.encoding = THREE.sRGBEncoding
  bakedNeutralTexture.flipY = false
  lightMapTexture.flipY = false
  
  return (
    <shaderMaterial 
      ref={material}
      uniforms={{
        uBakedDayTexture: { value: bakedDayTexture },
        uBakedNightTexture: { value: bakedNightTexture },
        uBakedNeutralTexture: { value: bakedNeutralTexture },
        uLightMapTexture: { value: lightMapTexture },

        uNightMix: { value: 1 },
        uNeutralMix: { value: 0 },

        uLightTvColor: { value: new THREE.Color(tv) },
        uLightTvStrength: { value: 1.47 },

        uLightDeskColor: { value: new THREE.Color(desk) },
        uLightDeskStrength: { value: 1.9 },

        uLightPcColor: { value: new THREE.Color(pc) },
        uLightPcStrength: { value: 1.4 }
      }}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
    />
  )
}