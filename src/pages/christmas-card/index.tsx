import React, { Suspense, useMemo, useRef } from 'react'
import { Canvas, useThree, extend, Object3DNode } from '@react-three/fiber'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { OrbitControls } from '@react-three/drei'
import { ChristmasCardScene } from '@/components/Models/ChristmasCardScene'
import { CircleGeometry, EquirectangularReflectionMapping, Vector2 } from 'three'
import { Water2 } from 'three-stdlib'
import styles from './index.module.scss'

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
  return <water2 ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
}


const ChristmasCard:React.FC = () => {
  
  return (
    <div className={styles.christmasCard}>
      <Canvas
        camera={{position: [-3.23, 2.98, 20]}}
      >
        <SceneEnv />        
        {/* Lights */}
        <directionalLight args={[0xffffff, 1]} position={[0, 50, 0]} />

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