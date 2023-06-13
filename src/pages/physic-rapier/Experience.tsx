import { OrbitControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { 
  Physics, 
  RigidBody,
  InstancedRigidBodies,
  CuboidCollider,
} from "@react-three/rapier"
import type { 
  RapierRigidBody,
  InstancedRigidBodyProps
} from "@react-three/rapier"
import { Perf } from "r3f-perf"
import { useMemo, useRef } from "react"
import * as THREE from "three"

const Experience = () => {
  const instancedMeshRef = useRef<RapierRigidBody[]>(null)
  const cubeRef = useRef<RapierRigidBody>(null)
  const twisterRef = useRef<RapierRigidBody>(null)

  const instancedMeshCount = 200

  useFrame((state) => {
    const time = state.clock.getElapsedTime()    

    const eulerRotation = new THREE.Euler(0, time * 3, 0)
    const quaternionRotation = new THREE.Quaternion()
    quaternionRotation.setFromEuler(eulerRotation)
    twisterRef.current?.setNextKinematicRotation(quaternionRotation)

    const angle = time * 0.5
    twisterRef.current?.setNextKinematicTranslation({
      x: Math.cos(angle) * 2,
      y: 0,
      z: Math.sin(angle) * 2,
    })
  })

  const instances = useMemo(() => {
    const instances: InstancedRigidBodyProps[] = [];

    for (let i = 0; i < instancedMeshCount; i++) {
      const scale = 0.2 + Math.random() * 0.8
      instances.push({
        key: 'instance_' + Math.random(),
        position: [(Math.random() - 0.5) * 8, 6 + Math.random() - 0.5, (Math.random() - 0.5) * 8],
        rotation: [Math.random(), Math.random(), Math.random()],
        scale: [scale, scale, scale],
      });
    }

    return instances;
  }, []);

  const handleCubeClick = () => {
    const mass = cubeRef.current?.mass() || 1
    cubeRef.current?.applyImpulse({x: 0, y: 8 * mass , z: 0}, true)
    cubeRef.current?.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    }, true)
  }

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />
  
      <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
      <ambientLight intensity={ 0.5 } />

      <Physics debug>
        <RigidBody colliders="ball">
          <mesh castShadow position={ [- 2, 2, 0] }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody 
          ref={cubeRef} 
          colliders={false}
          position={ [2, 2, 0] } 
        >
          <mesh castShadow onClick={handleCubeClick}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <CuboidCollider args={[0.5, 0.5, 0.5]} mass={2} />
        </RigidBody>

        <RigidBody ref={twisterRef} type="kinematicPosition">
          <mesh position-y={-0.75}>
            <boxGeometry args={[0.5, 0.5, 5]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed">
          <mesh receiveShadow position-y={ - 1.25 } >
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="yellowgreen" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 5, 0.25]} position={[0, 3.75, -5.25]}/>
          <CuboidCollider args={[0.25, 5, 5]} position={[5.25, 3.75, 0]}/>
          <CuboidCollider args={[5, 5, 0.25]} position={[0, 3.75, 5.25]}/>
          <CuboidCollider args={[0.25, 5, 5]} position={[-5.25, 3.75, 0]}/>
        </RigidBody>

        <InstancedRigidBodies
          ref={instancedMeshRef}
          instances={instances}
        >
          <instancedMesh 
            args={[undefined, undefined, instancedMeshCount]} 
            count={instancedMeshCount} 
            castShadow 
            receiveShadow
          >
            <boxGeometry />
            <meshStandardMaterial color="green" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  )
}

export default Experience