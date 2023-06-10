import { OrbitControls } from "@react-three/drei"
import { EffectComposer } from "@react-three/postprocessing"
import { Perf } from "r3f-perf"
import Drunk from "@/effects/Drunk"
import { useControls } from "leva"
import { BlendFunction } from "postprocessing"

const Experience = () => {

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

      <OrbitControls makeDefault />

      <EffectComposer>
        <Drunk 
          frequency={frequency}
          amplitude={amplitude}
          blendFunction={BlendFunction.SCREEN}
        />
      </EffectComposer>

  
      <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
      <ambientLight intensity={ 0.5 } />

      <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="#555555" metalness={ 0 } roughness={ 0 } />
        </mesh>
    </>
  )
}

export default Experience