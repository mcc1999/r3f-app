import { Environment, ScrollControls } from "@react-three/drei"
import { Perf } from "r3f-perf"
import LightGroup from "./Meshs/LightGroup"
import React, { Suspense } from "react"
import { ChristmasCardScene } from "@/components/Models/ChristmasCardScene"
import Ocean from "./Meshs/Ocean"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'
import { gsap } from "gsap"
import ScrollComponent from "./Meshs/ScrollComponent"

export const sceneList = [
  {
    text: "妹妹，520快乐！！！",
    position: [-3.23, 3, 4.06],
    target: [-8, 2, 0]
  },
  {
    text: "感谢在这么大的世界里遇见了你",
    position: [7, 0, 23],
    target: [0, 0, 0]
  },
  {
    text: "愿与你探寻世界的每一个角落",
    position: [10, 3, 0],
    target: [5, 2, 0]
  },
  {
    text: "愿将天上的星星送给你",
    position: [7, 0, 23],
    target: [0, 0, 0],
  },
  {
    text: "愿我们余生相守，健康快乐！",
    position: [-20, 1.3, 6.6],
    target: [5, 2, 0]
  },
]

const Experience: React.FC<{sceneIndex: number}> = ({sceneIndex}) => {
  useFrame((state, delta) => {
    const { camera } = state
    const [x, y ,z] = sceneList[sceneIndex].position
    const [tx, ty ,tz] = sceneList[sceneIndex].target
    camera.position.set(x, y, z)
    camera.lookAt(new THREE.Vector3(tx, ty, tz))
  })

  return (
    <>
      {/* R3f-Perf */}
      <Perf />

      {/* 表面滚动元素 */}
      <ScrollControls pages={sceneList.length} infinite>
        <ScrollComponent />
      </ScrollControls >

      {/* Scene Env */}
      {/* <SceneEnv />   */}
      <Environment 
        files="./textures/sky.hdr" 
        background
      /> 

      {/* Lights */}
      <directionalLight args={[0xffffff, 0.25]} position={[0, 50, 0]} />

      <pointLight args={[0xffffff, 10]} position={[0.1, 2.4, 0]} castShadow />

      <LightGroup />

      {/* Mesh */}
      <Suspense fallback={null}>
        <ChristmasCardScene />
      </Suspense>

      <Ocean />
    </>
  )
}

export default Experience