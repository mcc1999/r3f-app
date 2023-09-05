import { useGLTF, Float, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CuboidCollider, RapierRigidBody, RigidBody } from '@react-three/rapier'
import React, { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const floorMaterial1 = new THREE.MeshStandardMaterial({ /* color: 'limegreen' */ color: '#111111', metalness: 0, roughness: 0 })
const floorMaterial2 = new THREE.MeshStandardMaterial({ /* color: 'greenyellow' */ color: '#222222', metalness: 0, roughness: 0 })
const obstacleMaterial = new THREE.MeshStandardMaterial({ /* color: 'orangered' */ color: '#ff0000', metalness: 0, roughness: 1 })
const wallMaterial = new THREE.MeshStandardMaterial({ /* color: 'slategrey' */ color: '#887777', metalness: 0, roughness: 0 })

interface ComponentPosition {
  position: [x: number, y: number, z: number];
}

const BlockStart:React.FC<ComponentPosition> = ({ position = [0, 0, 0]}) => {
  return (
    <group position={position}>
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text 
          scale={0.5} 
          font="/fonts/bebas-neue-v9-latin-regular.woff"
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0.75, 0.65, 0]}
          rotation-y={-0.25}
        >
          Marble race
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
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

const BlockEnd:React.FC<ComponentPosition> = ({ position = [0, 0, 0]}) => {
  const hamburger = useGLTF('/models/hamburger.glb')
  hamburger.scene.children.forEach(mesh => {
    mesh.castShadow = true
  })

  return (
    <group position={position}>
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text 
          scale={0.5} 
          font="/fonts/bebas-neue-v9-latin-regular.woff"
          position={[0, 1.75, 2]}
        >
          FINISH!!!
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
      <mesh 
        position={[0, 0, 0]}
        geometry={boxGeometry}
        scale={[4, 0.2, 4]}
        material={floorMaterial1}
        receiveShadow
      />
      <RigidBody type="fixed" colliders="hull" restitution={0.2} friction={0}>
        <primitive object={hamburger.scene} position={[0, 0.25, 0]} scale={0.2} />
      </RigidBody>
    </group>
  )
}

const BlockSpinner:React.FC<ComponentPosition> = ({ position = [0, 0, 0]}) => {
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
      <RigidBody type="fixed" restitution={0.2}>
        <mesh 
          position={[0, -0.1, 0]}
          geometry={boxGeometry}
          scale={[4, 0.2, 4]}
          material={floorMaterial2}
          receiveShadow
        />
      </RigidBody>
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

const BlockLimbo:React.FC<ComponentPosition> = ({ position = [0, 0, 0]}) => {
  const obstacle = useRef<RapierRigidBody>(null)
  const [timeOffset] = useState<number>(() => (Math.random() * Math.PI * 2))


  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    const y = Math.sin(time + timeOffset) + 1.15
    obstacle.current?.setNextKinematicTranslation({x: position[0], y: position[1] + y, z: position[2]})
  })

  return (
    <group position={position}>
      <RigidBody type="fixed" restitution={0.2}>
        <mesh 
          position={[0, -0.1, 0]}
          geometry={boxGeometry}
          scale={[4, 0.2, 4]}
          material={floorMaterial2}
          receiveShadow
        />
      </RigidBody>
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

const BlockAxe:React.FC<ComponentPosition> = ({ position = [0, 0, 0]}) => {
  const obstacle = useRef<RapierRigidBody>(null)
  const [timeOffset] = useState<number>(() => (Math.random() * Math.PI * 2))


  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    const x = Math.sin(time + timeOffset) * 1.25
    obstacle.current?.setNextKinematicTranslation({x: position[0] + x, y: position[1] + 0.75, z: position[2]})
  })

  return (
    <group position={position}>
      <RigidBody type="fixed" restitution={0.2}>
        <mesh 
          position={[0, -0.1, 0]}
          geometry={boxGeometry}
          scale={[4, 0.2, 4]}
          material={floorMaterial2}
          receiveShadow
        />
      </RigidBody>
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

const Bounce: React.FC<{ length: number }> = ({ length }) => {
  return (
    <RigidBody type="fixed" restitution={0.2} friction={0}>
      {/* Wall */}
      <mesh
        geometry={boxGeometry}
        scale={[0.3, 1.5, length * 4]}
        material={wallMaterial}
        position={[2.15, 0.75, -(length * 4 / 2) + 4 / 2]}
        castShadow
      />
      <mesh
        geometry={boxGeometry}
        scale={[0.3, 1.5, length * 4]}
        material={wallMaterial}
        position={[-2.15, 0.75, -(length * 4 / 2) + 4 / 2]}
        receiveShadow
      />
      <mesh
        geometry={boxGeometry}
        scale={[4, 1.5, 0.3]}
        material={wallMaterial}
        position={[0, 0.75, -length * 4 + 4 / 2 ]}
        receiveShadow
      />
      {/* Floor */}
      <CuboidCollider 
        args={[2, 0.1, length * 2]} 
        position={[0, -0.1, -length * 2 + 2]}
        restitution={0.2}
        friction={1}  
        />
      {/* <CuboidCollider 
        args={[2, 0.75, 0.1]} 
        position={[0, 0.75, 2 + 0.1]}
        restitution={0.2}
        friction={0}  
      /> */}
    </RigidBody>
  )
}

export interface LevelProps {
  obstacleNum?: number;
  obstacleTypes?: any[];
  seed?: number;
}

const Level:React.FC<LevelProps> = (props) => {
  const { obstacleNum = 5, obstacleTypes = [ BlockSpinner, BlockLimbo, BlockAxe ], seed = 0 } = props

  const obstacleBlocks = useMemo(() => {
    const blocks = []
    for (let i = 0; i < obstacleNum; i++) {
      const block = obstacleTypes[Math.floor(Math.random() * 3)]
      blocks.push(block)
    }
    return blocks
  }, [obstacleNum, obstacleTypes, seed])

  return (
    <>
      <BlockStart position={[0, 0, 0]} />

      {obstacleBlocks.map((Block, index) => <Block key={index} position={[0, 0, -(index + 1) * 4]} />)}

      <BlockEnd position={[0, 0, -(obstacleNum + 1) * 4]} />

      <Bounce length={obstacleNum + 2} />
    </>
  )
}

export default Level