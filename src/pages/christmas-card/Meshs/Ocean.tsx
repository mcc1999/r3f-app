import { useMemo, useRef } from "react"
import * as THREE from 'three'

export default function Ocean() {
  const ref = useRef(null)
  const geom = useMemo(() => new THREE.CircleGeometry(300, 300), [])
  const config = useMemo(
    () => ({
      textureWidth: 1024,
      textureHeight: 1024,
      color: 0xeeeeee,
      scale: 100,
      flowDirection: new THREE.Vector2(1, 1),
    }),
    []
  )

  return (
    <water2
      ref={ref} 
      args={[geom, config]} 
      rotation-x={-Math.PI / 2} 
      position-y={-0.5}  
    />
  )
}