/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 macScreenModel.glb -t
*/

import * as THREE from 'three'
import React, { useEffect } from 'react'
import { useGLTF, useVideoTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    top001: THREE.Mesh
  }
  materials: {}
}

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/roomIn3d/macScreenModel.glb') as GLTFResult
  const texture = useVideoTexture("/roomIn3d/videoStream.mp4")
  
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.top001.geometry} material={nodes.top001.material} position={[2.22, 2.62, -4.3]} rotation={[1.52, -0.02, 0.3]}>
        <meshBasicMaterial map={texture} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/roomIn3d/macScreenModel.glb')