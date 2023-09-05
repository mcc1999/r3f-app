import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody, useRapier } from '@react-three/rapier'
import React, { useEffect, useRef, useState } from 'react'
import { Controls } from '..'
import * as THREE from 'three'
import useR3fStore from '@/stores'
import { GamePhase } from '@/stores/marbleGameSlice'

const Marble:React.FC = () => {
  const [subscribeKeys, getKeys] = useKeyboardControls<Controls>()
  const { rapier, world } = useRapier()
  const startGame = useR3fStore(state => state.start)
  const endGame = useR3fStore(state => state.end)
  const restartGame = useR3fStore(state => state.restart)
  const obstacleNum = useR3fStore(state => state.blocksCount)

  const [smoothCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10))
  const [smoothCameraTarget] = useState(() => new THREE.Vector3())
  
  const marble = useRef<RapierRigidBody>(null)

  const jump = () => {
    const origin = marble.current?.translation()    
    if (!origin) return

    origin.y -= 0.31
    const direction = {x: 0, y: -1, z: 0}
    const ray = new rapier.Ray(origin, direction)
    const hit = world.castRay(ray, 10, true)
    

    if (hit && hit.toi < 0.15) {      
      marble.current?.applyImpulse({x: 0, y: 0.5, z: 0}, true)
    }
  }

  const reset = () => {
    marble.current?.setTranslation({x: 0, y: 1, z: 0}, true)
    marble.current?.setLinvel({x: 0, y: 0, z: 0}, true)
    marble.current?.setAngvel({x: 0, y: 0, z: 0}, true)
    
  }

  useEffect(() => {
    const jumpUnSubscription = subscribeKeys(
      (state) => state.jump, 
      (pressed) => {
        if (pressed) jump()
      }
    )

    const resetGameUnSubscription = subscribeKeys(
      (state) => state.reset, 
      (pressed) => {
        if (pressed) {
          endGame()
          restartGame()
        }
      }
    )
    
     const startUnSubscription = subscribeKeys(
      (state) => [state.forward, state.rightward, state.backward, state.leftward, state.jump],
      (keys) => {        
        if (keys.includes(true)) startGame()
      }
    )

    const phaseUnSubscription = useR3fStore.subscribe(
      (state) => state.phase,
      // @ts-ignore
      (phase) => {
        if (phase === GamePhase.READY) {
          reset()
        }
      }
    )

    return () => {
      jumpUnSubscription()
      startUnSubscription()
      phaseUnSubscription()
      resetGameUnSubscription()
    }
  }, [])
  

  useFrame((state, delta) => {   
    /**
     * Key Controls
     */ 
    const { forward, rightward, backward, leftward } = getKeys()
    
    const impulse = { x: 0, y: 0, z: 0}
    const torque = { x: 0, y: 0, z: 0}

    const impulseStrength = 0.6 * delta
    const torqueStrength = 0.2 * delta

    if (forward) {
      impulse.z -= impulseStrength
      torque.x -= torqueStrength
    }
    if (rightward) {
      impulse.x += impulseStrength
      torque.z -= torqueStrength
    }
    if (backward) {
      impulse.z += impulseStrength
      torque.x += torqueStrength
    }
    if (leftward) {
      impulse.x -= impulseStrength
      torque.z += torqueStrength
    }
    
    marble.current?.applyImpulse(impulse, false)
    marble.current?.applyTorqueImpulse(torque, true)

    /**
     * Camera
     */
    const marblePosition = marble.current?.translation() as THREE.Vector3
    if (!marblePosition) return

    const cameraPosition = new THREE.Vector3()
    cameraPosition.copy(marblePosition)
    cameraPosition.z += 2.25
    cameraPosition.y += 0.65
    const cameraTarget = new THREE.Vector3()
    cameraTarget.copy(marblePosition)
    cameraTarget.y += 0.25

    smoothCameraPosition.lerp(cameraPosition, 5 * delta)
    smoothCameraTarget.lerp(cameraTarget, 5 * delta)

    state.camera.position.copy(smoothCameraPosition)
    state.camera.lookAt(smoothCameraTarget)

    /**
     * Game End / reStart
     */
    if (marblePosition.z < - (obstacleNum * 4 + 2)) {
      endGame()
    }
    if (marblePosition.y < -4) {
      restartGame()
    }
  })

  return (
    <RigidBody 
      ref={marble} 
      colliders="ball" 
      position={[0, 1, 0]} 
      restitution={0.2} 
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color="mediumpurple" />
      </mesh>
    </RigidBody>
  )
}

export default Marble