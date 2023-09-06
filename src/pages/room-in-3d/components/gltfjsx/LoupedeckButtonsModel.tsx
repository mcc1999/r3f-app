/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 loupedeckButtonsModel.glb -t
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'

type GLTFResult = GLTF & {
  nodes: {
    screen001: THREE.Mesh
    screen004: THREE.Mesh
    screen003: THREE.Mesh
    screen002: THREE.Mesh
    screen007: THREE.Mesh
    screen006: THREE.Mesh
    screen005: THREE.Mesh
    screen010: THREE.Mesh
    screen009: THREE.Mesh
    screen008: THREE.Mesh
    screen013: THREE.Mesh
    screen012: THREE.Mesh
    screen011: THREE.Mesh
    screen014: THREE.Mesh
  }
  materials: {}
}

export default function Model(props: JSX.IntrinsicElements['group']) {  
  const { nodes } = useGLTF('/roomIn3d/loupedeckButtonsModel.glb') as GLTFResult
  const buttonGroup = useRef<THREE.Group>(null)
  const time = useRef(0)

  const buttonAnimation = () => {
    if (!buttonGroup.current) return   

    const colors = ['#af55cf', '#dbd85d', '#e86b24', '#b81b54']
    const buttons: THREE.Mesh[] = [], outButtons: THREE.Mesh[] = []
    for (let child of buttonGroup.current.children) {
      if (Math.random() > 0.5) buttons.push(child as THREE.Mesh)
      else outButtons.push(child as THREE.Mesh)
    }

    for(let mesh of outButtons) {      
      (mesh.material as THREE.Material).opacity = 0
    }
    
    let i = 0
    for(let mesh of buttons) {
      (mesh.material as THREE.MeshBasicMaterial).color.set(colors[Math.floor(Math.random() * colors.length)])
      gsap.to(mesh.material, {
        delay: i * 0.05,
        duration: 0.2,
        opacity: 1,
        onComplete: () =>
        {
          gsap.to(
            mesh.material,
            {
                delay: 3,
                duration: 0.5,
                opacity: 0
            }
          )
        }
      })
      i++
    }
  }
  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime
    if (elapsedTime - time.current > 5) {
      time.current = elapsedTime
      buttonAnimation()
    }
  })

  return (
    <group ref={buttonGroup} {...props} dispose={null} position={[0, 0.01, 0]}>
      <mesh geometry={nodes.screen001.geometry} position={[0.15, 2.46, -4.35]} rotation={[0.29, 0, 0]} scale={[0.17, 0.12, 0.1]}>
        <meshBasicMaterial color="#ffffff" transparent={true} opacity={0} />
      </mesh>
      <mesh geometry={nodes.screen002.geometry} position={[0.15, 2.46, -4.35]} rotation={[0.29, 0, 0]} scale={[0.17, 0.12, 0.1]}>
        <meshBasicMaterial color="#ffffff" transparent={true} opacity={0} />
      </mesh>
      <mesh geometry={nodes.screen003.geometry} position={[0.15, 2.46, -4.35]} rotation={[0.29, 0, 0]} scale={[0.17, 0.12, 0.1]}>
        <meshBasicMaterial color="#ffffff" transparent={true} opacity={0} />
      </mesh>
      <mesh geometry={nodes.screen004.geometry} position={[0.15, 2.46, -4.35]} rotation={[0.29, 0, 0]} scale={[0.17, 0.12, 0.1]}>
        <meshBasicMaterial color="#ffffff" transparent={true} opacity={0} />
      </mesh>
      <mesh geometry={nodes.screen005.geometry} position={[0.15, 2.46, -4.35]} rotation={[0.29, 0, 0]} scale={[0.17, 0.12, 0.1]}>
        <meshBasicMaterial color="#ffffff" transparent={true} opacity={0} />
      </mesh>
      <mesh geometry={nodes.screen006.geometry} position={[0.15, 2.46, -4.35]} rotation={[0.29, 0, 0]} scale={[0.17, 0.12, 0.1]}>
        <meshBasicMaterial color="#ffffff" transparent={true} opacity={0} />
      </mesh>
      <mesh geometry={nodes.screen007.geometry} position={[0.15, 2.46, -4.35]} rotation={[0.29, 0, 0]} scale={[0.17, 0.12, 0.1]}>
        <meshBasicMaterial color="#ffffff" transparent={true} opacity={0} />
      </mesh>
      <mesh geometry={nodes.screen008.geometry} position={[0.15, 2.46, -4.35]} rotation={[0.29, 0, 0]} scale={[0.17, 0.12, 0.1]}>
        <meshBasicMaterial color="#ffffff" transparent={true} opacity={0} />
      </mesh>
      <mesh geometry={nodes.screen009.geometry} position={[0.15, 2.46, -4.35]} rotation={[0.29, 0, 0]} scale={[0.17, 0.12, 0.1]}>
        <meshBasicMaterial color="#ffffff" transparent={true} opacity={0} />
      </mesh>
      <mesh geometry={nodes.screen010.geometry} position={[0.15, 2.46, -4.35]} rotation={[0.29, 0, 0]} scale={[0.17, 0.12, 0.1]}>
        <meshBasicMaterial color="#ffffff" transparent={true} opacity={0} />
      </mesh>
      <mesh geometry={nodes.screen011.geometry} position={[0.15, 2.46, -4.35]} rotation={[0.29, 0, 0]} scale={[0.17, 0.12, 0.1]}>
        <meshBasicMaterial color="#ffffff" transparent={true} opacity={0} />
      </mesh>
      <mesh geometry={nodes.screen012.geometry} position={[0.15, 2.46, -4.35]} rotation={[0.29, 0, 0]} scale={[0.17, 0.12, 0.1]}>
        <meshBasicMaterial color="#ffffff" transparent={true} opacity={0} />
      </mesh>
      <mesh geometry={nodes.screen013.geometry} position={[0.15, 2.46, -4.35]} rotation={[0.29, 0, 0]} scale={[0.17, 0.12, 0.1]}>
        <meshBasicMaterial color="#ffffff" transparent={true} opacity={0} />
      </mesh>
      <mesh geometry={nodes.screen014.geometry} position={[0.15, 2.46, -4.35]} rotation={[0.29, 0, 0]} scale={[0.17, 0.12, 0.1]}>
        <meshBasicMaterial color="#ffffff" transparent={true} opacity={0} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/roomIn3d/loupedeckButtonsModel.glb')