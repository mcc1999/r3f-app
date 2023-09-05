// @ts-ignore
import vertexShader from './vertex.glsl'
// @ts-ignore
import fragmentShader from './fragment.glsl'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'


const { tv, desk, pc } = {
  tv: '#ff115e',
  desk: '#ff6700',
  pc: '#0082ff',
}

export default function BakedShaderMaterial() {
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