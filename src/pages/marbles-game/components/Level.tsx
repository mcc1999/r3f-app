import { Vector3, useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody } from '@react-three/rapier'
import React, { useRef, useState } from 'react'
import * as THREE from 'three'

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const floorMaterial1 = new THREE.MeshStandardMaterial({color: 'limegreen'})
const floorMaterial2 = new THREE.MeshStandardMaterial({color: 'greenyellow'})
const obstacleMaterial = new THREE.MeshStandardMaterial({color: 'orangered'})
const wallMaterial = new THREE.MeshStandardMaterial({color: 'slategrey'})

const BlockStart:React.FC<{ position: [x: number, y: number, z: number] }> = ({ position = [0, 0, 0]}) => {
  return (
    <group position={position}>
      <mesh 
        position={[0, -0.1, 0]}
        geometry={boxGeometry}
        scale={[4, 0.2, 4]}
        material={floorMaterial1}
        receiveShadow
      />
    </group>
  )
}

const BlockEnd:React.FC<{ position: [x: number, y: number, z: number] }> = ({ position = [0, 0, 0]}) => {
  return (
    <group position={position}>
      <mesh 
        position={[0, 0, 0]}
        geometry={boxGeometry}
        scale={[4, 0.2, 4]}
        material={floorMaterial1}
        receiveShadow
      />
    </group>
  )
}

const BlockSpinner:React.FC<{ position: [x: number, y: number, z: number] }> = ({ position = [0, 0, 0]}) => {
  const obstacle = useRef<RapierRigidBody>(null)
  const [speed] = useState<number>(() => (Math.random() + 0.2) * (Math.random() > 0.5 ? 1 : -1) )

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    const rotation = new THREE.Quaternion()
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
    obstacle.current?.setNextKinematicRotation(rotation)
  })

  return (
    <group position={position}>
      <mesh 
        position={[0, -0.1, 0]}
        geometry={boxGeometry}
        scale={[4, 0.2, 4]}
        material={floorMaterial2}
        receiveShadow
      />
      <RigidBody ref={obstacle} type="kinematicPosition" position={[0, 0.3, 0]} restitution={0.2} friction={0}>
        <mesh 
          geometry={boxGeometry}
          scale={[3.5, 0.3, 0.3]}
          material={obstacleMaterial}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  )
}

const BlockLimbo:React.FC<{ position: [x: number, y: number, z: number] }> = ({ position = [0, 0, 0]}) => {
  const obstacle = useRef<RapierRigidBody>(null)
  const [timeOffset] = useState<number>(() => (Math.random() * Math.PI * 2))


  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    const y = Math.sin(time + timeOffset) + 1.15
    obstacle.current?.setNextKinematicTranslation({x: position[0], y: position[1] + y, z: position[2]})
  })

  return (
    <group position={position}>
      <mesh 
        position={[0, -0.1, 0]}
        geometry={boxGeometry}
        scale={[4, 0.2, 4]}
        material={floorMaterial2}
        receiveShadow
      />
      <RigidBody ref={obstacle} type="kinematicPosition" position={[0, 0.3, 0]} restitution={0.2} friction={0}>
        <mesh 
          geometry={boxGeometry}
          scale={[3.5, 0.3, 0.3]}
          material={obstacleMaterial}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  )
}

const BlockAxe:React.FC<{ position: [x: number, y: number, z: number] }> = ({ position = [0, 0, 0]}) => {
  const obstacle = useRef<RapierRigidBody>(null)
  const [timeOffset] = useState<number>(() => (Math.random() * Math.PI * 2))


  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    const x = Math.sin(time + timeOffset) * 1.25
    obstacle.current?.setNextKinematicTranslation({x: position[0] + x, y: position[1] + 0.75, z: position[2]})
  })

  return (
    <group position={position}>
      <mesh 
        position={[0, -0.1, 0]}
        geometry={boxGeometry}
        scale={[4, 0.2, 4]}
        material={floorMaterial2}
        receiveShadow
      />
      <RigidBody ref={obstacle} type="kinematicPosition" position={[0, 0.3, 0]} restitution={0.2} friction={0}>
        <mesh 
          geometry={boxGeometry}
          scale={[1.5, 1.5, 0.3]}
          material={obstacleMaterial}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  )
}


const Level:React.FC = () => {
  return (
    <>
      <BlockStart position={[0, 0, 16]} />
      <BlockSpinner position={[0, 0, 12]} />
      <BlockLimbo position={[0, 0, 8]} />
      <BlockAxe position={[0, 0, 4]} />
      <BlockEnd position={[0, 0, 0]} />
    </>
  )
}

export default Level