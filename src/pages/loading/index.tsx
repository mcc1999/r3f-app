import { Canvas } from "@react-three/fiber"
import Experience from "./Experience"
import styles from './index.module.scss'
import { Suspense, useCallback, useEffect, useState } from "react"
import { Loader } from "@react-three/drei"
// import Loader from "@/components/Loader"

const Loading = () => {
  const [mount, setMount] = useState<boolean>(false)

  useEffect(() => {
    setMount(true)
  }, [])
  
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
        <color args={['#000000']} attach="background" />
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      {mount ? <Loader /> : null}
    </div>
  )
}

export default Loading