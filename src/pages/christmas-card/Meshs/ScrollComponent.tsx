import { Scroll, ScrollControls, useScroll } from "@react-three/drei"
import { sceneList } from "../Experience"
import styles from '../index.module.scss'
import { useFrame } from "@react-three/fiber"

export default function ScrollComponent() {
  const data = useScroll()
  
  useFrame((state, delta) => {    
    
  })

  return (
    <Scroll html>
      {sceneList.map((value, i) => (
        <div key={i} className={styles.textBox}>
          {value.text}
        </div>
      ))}
    </Scroll>
  )
}