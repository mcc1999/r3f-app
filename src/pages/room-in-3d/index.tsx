import React from 'react'
import styles from './index.module.scss'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'

const RoomIn3D:React.FC = () => {
  return  (
    <div className={styles.canvasContainer}>
      <Canvas
        camera={{
          fov: 35,
          far: 150,
          position: [-15, 15, 15],
        }}
        gl={{
          alpha: false,
          antialias: true,
        }}
      >
        <Experience />
      </Canvas>
    </div>
  )
}

export default RoomIn3D