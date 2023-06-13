import { Loader, OrbitControls, useGLTF } from "@react-three/drei"
import { Perf } from "r3f-perf"
import { Suspense } from "react"

const Experience = () => {
  const model1 = useGLTF('./models/Flamingo.glb')
  const model2 = useGLTF('./models/macbook.gltf')
  const model3 = useGLTF('./models/Parrot.glb')
  const model4 = useGLTF('./models/Stork.glb')
  const model5 = useGLTF('./models/Flamingo.glb')
  const model6 = useGLTF('./models/bigModel.gltf')

  return (
    <>
      <Perf position="top-left" />

        <OrbitControls makeDefault />
    
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
          <primitive object={model1.scene} />
          <primitive object={model2.scene} />
          <primitive object={model3.scene} />
          <primitive object={model4.scene} />
          <primitive object={model5.scene} />
          <primitive object={model6.scene} />
    </>
  )
}

export default Experience
