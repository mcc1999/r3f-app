import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useThree, extend, Object3DNode, useFrame } from '@react-three/fiber'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { OrbitControls, Sphere } from '@react-three/drei'
import { ChristmasCardScene } from '@/components/Models/ChristmasCardScene'
import { CircleGeometry, EquirectangularReflectionMapping, Group, Vector2 } from 'three'
import { Water2 } from 'three-stdlib'
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
    texture.mapping = EquirectangularReflectionMapping
    scene.environment = texture
    scene.background = texture
  })
  return null
}

function Ocean() {
  const ref = useRef(null)
  const geom = useMemo(() => new CircleGeometry(300, 300), [])
  const config = useMemo(
    () => ({
      textureWidth: 1024,
      textureHeight: 1024,
      color: 0xeeeeee,
      scale: 100,
      flowDirection: new Vector2(1, 1),
    }),
    []
  )
  return <water2 ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} position-y={-0.5} />
}

function LightGroup() {
  const groupRef = useRef<Group>(null)
  
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


const ChristmasCard:React.FC = () => {
  
  return (
    <div className={styles.christmasCard}>
      <Canvas
        shadows
        camera={{position: [-3.23, 2.98, 20]}}
        gl={{}}
      >
        <SceneEnv />        

        {/* Lights */}
        <directionalLight args={[0xffffff, 0.25]} position={[0, 50, 0]} />

        <pointLight args={[0xffffff, 10]} position={[0.1, 2.4, 0]} castShadow />

        <LightGroup />

        {/* Controller  */}
        <OrbitControls />

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