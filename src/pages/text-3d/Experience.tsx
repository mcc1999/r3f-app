import { Center, Text3D, OrbitControls, useMatcapTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { EffectComposer } from "@react-three/postprocessing"
import { Perf } from "r3f-perf"
import { useEffect, useRef } from "react"
import Drunk from "@/effects/Drunk"
import * as THREE from 'three'
import { useControls } from "leva"
import { BlendFunction } from "postprocessing"

const donutGeometry = new THREE.TorusGeometry(10, 3, 16, 32)
const matcapMaterial = new THREE.MeshMatcapMaterial()

const Experience = () => {
  const [matcapTexture] = useMatcapTexture('28292A_D3DAE5_A3ACB8_818183', 512)
  const donuts = useRef<any[]>([])

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace
    matcapTexture.needsUpdate = true

    matcapMaterial.matcap = matcapTexture
    matcapMaterial.needsUpdate = true
  }, [])
  
  useFrame((state, delta) => {
    for (const donut of donuts.current) {
      donut.rotation.y += delta * 0.5
    }
  })

  const { frequency, amplitude } = useControls({
    frequency: {
      value: 2,
      min: 0,
      max: 10
    },
    amplitude: {
      value: 0.1,
      min: 0,
      max: 1
    }
  })

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls />

      <EffectComposer>
        <Drunk 
          frequency={frequency}
          amplitude={amplitude}
          // blendFunction={BlendFunction.SCREEN}
        />
      </EffectComposer>

      <Center>
        <Text3D 
          font="./fonts/helvetiker_regular.typeface.json"
          material={matcapMaterial}
          size={ 0.75 }
          height={ 0.2 }
          curveSegments={ 12 }
          bevelEnabled
          bevelThickness={ 0.02 }
          bevelSize={ 0.02 }
          bevelOffset={ 0 }
          bevelSegments={ 5 }
        >
          Hello R3f
        </Text3D>

        {[...Array(200)].map((value, index) => (
          <mesh 
            ref={(mesh) => donuts.current![index] = mesh}
            key={index}
            geometry={donutGeometry}
            material={matcapMaterial}
            scale={0.02 + Math.random() * 0.01}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            rotation={[
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              0
            ]}
          />
        ))}
      </Center>

    </>
  )
}

export default Experience