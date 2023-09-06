import React from 'react'
import styles from './index.module.scss'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'

const RoomIn3D:React.FC = () => {
  return  (
    <div className={styles.canvasContainer}>
      <Canvas
        camera={{
          position: [0.5, 3.2, -5]
          // position: [-6, 6, 6]
        }}
      >
        <Experience />
      </Canvas>
    </div>
  )
}

export default RoomIn3D