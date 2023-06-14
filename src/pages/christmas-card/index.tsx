import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useThree, extend, Object3DNode, useFrame } from '@react-three/fiber'
import { Loader } from '@react-three/drei'
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { Water2, OrbitControls as OrbitControlsType } from 'three-stdlib'
import styles from './index.module.scss'
import Experience, { sceneList} from './Experience';

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

const ChristmasCard:React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false)
  const textRef = useRef<HTMLDivElement>(null)
  const [sceneIndex, setSceneIndex] = useState<number>(0)

  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <div className={styles.christmasCard}>
      {/* <div className={styles.textContainer} ref={textRef} onScroll={() => {
        const index = Math.round((textRef.current?.scrollTop || 0) / window.innerHeight)
        if (index !== sceneIndex) setSceneIndex(index)
        
      }}>
        {sceneList.map((value, i) => (
          <div key={i} className={styles.textBox}>
            {value.text}
          </div>
        ))}
      </div> */}
      <Canvas
        className={styles.canvasContainer}
        shadows
        camera={{position: [-3.23, 3, 4.06]}}
      >
        <Experience sceneIndex={sceneIndex} />
      </Canvas>
      {mounted? <Loader /> : null}
    </div>
  )
}

export default ChristmasCard