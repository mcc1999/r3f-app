import React, { useEffect } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { CatmullRomCurve3, Vector3, VectorKeyframeTrack, AnimationClip } from 'three'

interface BirdProps extends React.ComponentProps<'group'> {
  position?: [number, number, number]
}
const Bird: React.FC<BirdProps> = (args) => {
  const {scene, animations} = useGLTF('/models/Parrot.glb')  
  const {clips, mixer} = useAnimations(animations, scene)
  const catmullRomCurve3 = 	new	CatmullRomCurve3([
    new	Vector3(-1,	2, 1),
    new	Vector3(-4,	1, 2),
    new	Vector3(0, 0,	-1),
    new	Vector3(2, -1,	-1),
    new	Vector3(4, -2,	1),
    new	Vector3(3, -2,	1),
    new	Vector3(2, -1,	3),
    new	Vector3(1, 1,	2),
    new	Vector3(-1,	2, 1),
  ]);
  let time = 0;
  const positions: number[] = []
  const times: number[]  = []
  for (let i = 0; i < 1 ; i += 0.05) {
    const point = catmullRomCurve3.getPoint(i);
    positions.push(point.x, point.y, point.z)
    times.push(time)
    time += 1
  }
  const positionTrack = new VectorKeyframeTrack('.position', times, positions)
  const clip = new AnimationClip('clip', -1, [positionTrack])

  useEffect(() => {
    mixer.clipAction(clips[0]).play()   
    // mixer.clipAction(clip).play()     
  }, [])

  return (
    <group {...args} >
      <mesh>
        <tubeGeometry args={[catmullRomCurve3, 100, 0.005, 8]}/>
        <meshBasicMaterial color="yellowGreen"/>
      </mesh>
      <primitive object={scene} rotation={[0, -Math.PI / 2, 0]} />
    </group>
  )
}

useGLTF.preload('/models/Parrot.glb')

export default Bird