/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 googleHomeLedsModel.glb -t
*/

import * as THREE from 'three'
import React from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    led2: THREE.Mesh
    led3: THREE.Mesh
    led1: THREE.Mesh
    led0: THREE.Mesh
  }
  materials: {}
}

const colors = ['#196aff', '#ff0000', '#ff5d00', '#7db81b']

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/roomIn3d/googleHomeLedsModel.glb') as GLTFResult

  const googleHomeLedMaskTexture = useTexture('/roomIn3d/googleHomeLedMask.png')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.led2.geometry} position={[1.02, 1.12, 1]} rotation={[0.04, 1.57, 0]} scale={0.02}>
        <meshBasicMaterial
          color={colors[2]}
          transparent={true}
          alphaMap={googleHomeLedMaskTexture}
        />
      </mesh>
      <mesh geometry={nodes.led3.geometry} position={[1.02, 1.11, 1.04]} rotation={[0.12, Math.PI / 2, 0]} scale={0.02}>
        <meshBasicMaterial
          color={colors[3]}
          transparent={true}
          alphaMap={googleHomeLedMaskTexture}
        />
      </mesh>
      <mesh geometry={nodes.led1.geometry} position={[1.02, 1.12, 0.96]} rotation={[-0.04, -Math.PI / 2, 0]} scale={0.02}>
        <meshBasicMaterial
          color={colors[1]}
          transparent={true}
          alphaMap={googleHomeLedMaskTexture}
        />
      </mesh>
      <mesh geometry={nodes.led0.geometry} position={[1.02, 1.11, 0.92]} rotation={[-0.12, -1.57, 0]} scale={0.02}>
        <meshBasicMaterial
          color={colors[0]}
          transparent={true}
          alphaMap={googleHomeLedMaskTexture}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/roomIn3d/googleHomeLedsModel.glb')
