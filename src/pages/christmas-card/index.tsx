import React, { Suspense, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { Canvas, useThree, extend, Object3DNode, useFrame } from '@react-three/fiber'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { OrbitControls, Sphere, Text, Text3D } from '@react-three/drei'
import { ChristmasCardScene } from '@/components/Models/ChristmasCardScene'
import { Camera, CircleGeometry, EquirectangularReflectionMapping, Group, PerspectiveCamera, Vector2, Vector3 } from 'three'
import { Water2, OrbitControls as OrbitControlsType } from 'three-stdlib'
import { gsap } from 'gsap';
import { throttle } from 'lodash'
import styles from './index.module.scss'

const radius = 3

extend({Water2})
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'water2': Object3DNode<Water2, typeof Water2>;
    }
  }
}

const SceneEnv = () => {
  const scene = useThree(state => state.scene)
  new RGBELoader().load('/textures/sky.hdr', function (texture) {    
    texture.mapping = EquirectangularReflectionMapping
    scene.environment = texture
    scene.background = texture
  })
  return null
}

interface OceanProps {
  onSceneChange: (index: number) => void;
  orbitControls: OrbitControlsType;
}

function Ocean() {
  const ref = useRef(null)
  const geom = useMemo(() => new CircleGeometry(300, 300), [])
  const config = useMemo(
    () => ({
      textureWidth: 1024,
      textureHeight: 1024,
      color: 0xeeeeee,
      scale: 100,
      flowDirection: new Vector2(1, 1),
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

function LightGroup() {
  const groupRef = useRef<Group>(null)
  
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

interface SceneTranslateProps {
  sceneIndex: number;
}
function SceneTranslate(props: SceneTranslateProps) {
  const { sceneIndex } = props  

  console.log('====SceneTranslate', sceneIndex);
  
  return <div className={styles.textScene} style={{transform: `translate3d(0, ${-sceneIndex * 100}vh, 0)`,}}>
    {sceneList.map((scene, index) => (
      <div key={index} className={styles.sceneItem}>
        <div>{scene.text}</div>
      </div>
    ))}
  </div>
}

const sceneList = [
  {
    text: "妹妹，520快乐！！！",
    callback: [[-3.23, 3, 4.06], [-8, 2, 0]],
  },
  {
    text: "感谢在这么大的世界里遇见了你",
    callback: [[7, 0, 23], [0, 0, 0]],
    
  },
  {
    text: "愿与你探寻世界的每一个角落",
    callback: [[10, 3, 0], [5, 2, 0]],
    
  },
  {
    text: "愿将天上的星星送给你",
    callback: [[7, 0, 23], [0, 0, 0]],
    
  },
  {
    text: "愿我们余生相守，健康快乐！",
    callback: [[-20, 1.3, 6.6], [5, 2, 0]],
  },
]

const ChristmasCard:React.FC = () => {
  const textRef = useRef<any>(null)
  const sceneIndexRef = useRef(0)
  const cameraRef = useRef<PerspectiveCamera>()
  const orbitControlsRef = useRef<OrbitControlsType>(null)
  let isAnimate = false
  

  const translateCamera = (camera: Camera, position: number[], target: number[]) => {    
    const [x, y, z] = position
    const timeline1 = gsap.timeline()
    const timeline2 = gsap.timeline()
    timeline1.to(camera.position, {
      x, y, z, ease: "power2.inOut", duration: 1,
    })
    if (orbitControlsRef.current) {
      timeline2.to(orbitControlsRef.current.target, {
        x: target[0], y: target[1], z: target[2], ease: "power2.inOut", duration: 1,
      })
    }
  }

  const handleClick = throttle((e: any) => {  
    console.log('====handleClick');
    
    if (isAnimate) return
    isAnimate = true
    
    if (e.deltaY > 0) {
      if (sceneIndexRef.current === sceneList.length - 2) {
        sceneIndexRef.current = -1
        // restoreHeart();
      } else {
        sceneIndexRef.current = sceneIndexRef.current + 1
      }
    }
    const callback = sceneList[sceneIndexRef.current+1]?.callback    
    cameraRef.current && callback && translateCamera(cameraRef.current, callback[0], callback[1])
  
    setTimeout(() => {
     isAnimate = false
    }, 1000);

    e.preventDefault()
    return false
  }, 1000)
    
  return (
    <div className={styles.christmasCard}>
      <Canvas
        shadows
        camera={{position: [-3.23, 3, 4.06]}}
        onCreated={state => cameraRef.current = state.camera as any}
        onWheel={handleClick}
      >
        {/* Scene Env */}
        <SceneEnv />       

        {/* Lights */}
        <directionalLight args={[0xffffff, 0.25]} position={[0, 50, 0]} />

        <pointLight args={[0xffffff, 10]} position={[0.1, 2.4, 0]} castShadow />

        <LightGroup />

        {/* Controller  */}
        <OrbitControls target={[-8, 2, 0]} ref={orbitControlsRef} enableDamping />

        {/* Mesh */}
        <ChristmasCardScene />

        <Suspense fallback={null}>
          <Ocean />
        </Suspense>

        <Text3D font='/fonts/Alibaba_PuHuiTi_Regular.json' position={[-15, 4, 5.5]} rotation-y={Math.PI / 2}>
          {sceneList[sceneIndexRef.current].text}
          <meshPhongMaterial color='red' />
        </Text3D>
      </Canvas>
    </div>
  )
}

export default ChristmasCard