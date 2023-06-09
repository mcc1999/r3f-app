import { Canvas } from "@react-three/fiber"
import Experience from "./Experience"
import styles from './index.module.scss'
import { Suspense } from "react"

const Text3D = () => {
  return (
    <div className={styles.text3dContainer}>
      <Canvas>
        <color args={['#ffffff']} attach="background" />
        <Experience />
      </Canvas>
    </div>
  )
}

export default Text3D