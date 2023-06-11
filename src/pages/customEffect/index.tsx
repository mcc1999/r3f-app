import { Canvas } from "@react-three/fiber"
import Experience from "./Experience"
import styles from './index.module.scss'

const CustomEffect = () => {
  return (
    <div className={styles.canvasContainer}>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 4, 15]
        }}
      >
        <color args={['#ffffff']} attach="background" />
        <Experience />
      </Canvas>
    </div>
  )
}

export default CustomEffect