import { Canvas } from '@react-three/fiber'
import React from 'react'
import Experience from './components/Experience'
import styles from './index.module.scss'

const MarblesGame:React.FC = () => {
  return (
    <div className={styles.canvasContainer}>
      <Canvas
        shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 2.5, 4, 6 ]
        } }
      >
        <Experience />
      </Canvas>
    </div>
  )
}

export default MarblesGame