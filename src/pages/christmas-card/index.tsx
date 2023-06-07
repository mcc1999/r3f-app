import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useThree, extend, Object3DNode, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Environment } from '@react-three/drei'
import { ChristmasCardScene } from '@/components/Models/ChristmasCardScene'
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { Water2, OrbitControls as OrbitControlsType } from 'three-stdlib'
import { Perf } from 'r3f-perf'
import styles from './index.module.scss'

const radius = 3

extend({Water2})
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'water2': Object3DNode<Water2, typeof Water2>;
    }
  }
}

const SceneEnv = () => {
  const scene = useThree(state => state.scene)
  new RGBELoader().load('/textures/sky.hdr', function (texture) {    
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = texture
    scene.background = texture
  })
  return null
}

function Ocean() {
  const ref = useRef(null)
  const geom = useMemo(() => new THREE.CircleGeometry(300, 300), [])
  const config = useMemo(
    () => ({
      textureWidth: 1024,
      textureHeight: 1024,
      color: 0xeeeeee,
      scale: 100,
      flowDirection: new THREE.Vector2(1, 1),
    }),
    []
  )

  return (
    <water2
      ref={ref} 
      args={[geom, config]} 
      rotation-x={-Math.PI / 2} 
      position-y={-0.5}  
    />
  )
}

function LightGroup() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(({clock}) => {
    groupRef.current?.rotateY(0.02)
    groupRef.current?.children.forEach((child, i) => {
      if (i === 1) {
        child.position.y = Math.cos(i * 2 / 3 * Math.PI) + Math.cos(5 * clock.getElapsedTime())
      } else {
        child.position.y = Math.cos(i * 2 / 3 * Math.PI) + Math.cos(5 * clock.getElapsedTime())
      }
    })
  })
  return (
    <group position={[-8, 2.5, -1.5]} ref={groupRef}>
      <Sphere args={[0.2, 32, 32]} position={[radius * Math.cos(0 * 2 / 3 * Math.PI), Math.cos(0 * 2 / 3 * Math.PI), radius * Math.sin(0 * 2 / 3 * Math.PI)]}>
        <pointLight args={[0xffffff, 5, 8]} castShadow />
      </Sphere>
      <Sphere args={[0.2, 0.2, 0.2]} position={[radius * Math.cos(1 * 2 / 3 * Math.PI), Math.cos(1 * 2 / 3 * Math.PI), radius * Math.sin(1 * 2 / 3 * Math.PI)]}>
        <pointLight args={[0x00ffff, 5, 8]} castShadow />
      </Sphere>
      <Sphere args={[0.2, 32, 32]} position={[radius * Math.cos(2 * 2 / 3 * Math.PI), Math.cos(2 * 2 / 3 * Math.PI), radius * Math.sin(2 * 2 / 3 * Math.PI)]}>
        <pointLight args={[0xffffff, 5, 8]} castShadow />
      </Sphere>
    </group>
  )
}

const sceneList = [
  {
    text: "妹妹，520快乐！！！",
    position: [-3.23, 3, 4.06],
    target: [-8, 2, 0]
  },
  {
    text: "感谢在这么大的世界里遇见了你",
    position: [7, 0, 23],
    target: [0, 0, 0]
  },
  {
    text: "愿与你探寻世界的每一个角落",
    position: [10, 3, 0],
    target: [5, 2, 0]
  },
  {
    text: "愿将天上的星星送给你",
    position: [7, 0, 23],
    target: [0, 0, 0],
  },
  {
    text: "愿我们余生相守，健康快乐！",
    position: [-20, 1.3, 6.6],
    target: [5, 2, 0]
  },
]

const ChristmasCard:React.FC = () => {
  const orbitControlsRef = useRef<OrbitControlsType>(null)
    
  return (
    <div className={styles.christmasCard}>
      <Canvas
        shadows
        camera={{position: [-3.23, 3, 4.06]}}
      >
        {/* R3f-Perf */}
        <Perf position='top-left'/>
        
        {/* Scene Env */}
        {/* <SceneEnv />   */}
        <Environment 
          files="./textures/sky.hdr" 
          background
        /> 

        {/* Lights */}
        <directionalLight args={[0xffffff, 0.25]} position={[0, 50, 0]} />

        <pointLight args={[0xffffff, 10]} position={[0.1, 2.4, 0]} castShadow />

        <LightGroup />

        {/* Controller  */}
        <OrbitControls target={[-8, 2, 0]} ref={orbitControlsRef} />

        {/* Mesh */}
        <ChristmasCardScene />

        <Suspense fallback={null}>
          <Ocean />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ChristmasCard