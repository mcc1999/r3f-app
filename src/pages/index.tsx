import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Parrot from '@/components/Models/Parrot'
import { Bird } from '@/components/Models/Bird'
import styles from './index.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <Canvas
        camera={{position: [10, 5, 10]}}
      >
        {/* Light */}
        <ambientLight args={[0xffff00, 0.5]} />
        <directionalLight args={[0xffff00, 0.5]} position={[10, 10, 10]} />

        {/* Controller  */}
        <OrbitControls />

        {/* Helper */}
        {/* <axesHelper args={[10]} /> */}

        {/* Mesh */}
        <Parrot />
        <Bird />     
      </Canvas>
    </main>
  )
}
