import { Canvas } from "@react-three/fiber"
import Experience from "./Experience"
import styles from './index.module.scss'

const Text3D = () => {
  return (
    <div className={styles.canvasContainer}>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: [ -3, 1.5, 4 ]
        }}
      >
        <color args={['#ffffff']} attach="background" />
        <Experience />
      </Canvas>
    </div>
  )
}

export default Text3D