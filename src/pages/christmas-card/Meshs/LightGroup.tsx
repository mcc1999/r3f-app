import { Sphere } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

const radius = 3

export default 
function LightGroup() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(({clock}) => {
    groupRef.current?.rotateY(0.02)
    groupRef.current?.children.forEach((child, i) => {
      if (i === 1) {
        child.position.y = Math.cos(i * 2 / 3 * Math.PI) + Math.cos(5 * clock.getElapsedTime())
      } else {
        child.position.y = Math.cos(i * 2 / 3 * Math.PI) + Math.cos(5 * clock.getElapsedTime())
      }
    })
  })
  return (
    <group position={[-8, 2.5, -1.5]} ref={groupRef}>
      <Sphere args={[0.2, 32, 32]} position={[radius * Math.cos(0 * 2 / 3 * Math.PI), Math.cos(0 * 2 / 3 * Math.PI), radius * Math.sin(0 * 2 / 3 * Math.PI)]}>
        <pointLight args={[0xffffff, 5, 8]} castShadow />
      </Sphere>
      <Sphere args={[0.2, 0.2, 0.2]} position={[radius * Math.cos(1 * 2 / 3 * Math.PI), Math.cos(1 * 2 / 3 * Math.PI), radius * Math.sin(1 * 2 / 3 * Math.PI)]}>
        <pointLight args={[0x00ffff, 5, 8]} castShadow />
      </Sphere>
      <Sphere args={[0.2, 32, 32]} position={[radius * Math.cos(2 * 2 / 3 * Math.PI), Math.cos(2 * 2 / 3 * Math.PI), radius * Math.sin(2 * 2 / 3 * Math.PI)]}>
        <pointLight args={[0xffffff, 5, 8]} castShadow />
      </Sphere>
    </group>
  )
}
