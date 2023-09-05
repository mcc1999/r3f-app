import { Canvas } from '@react-three/fiber'
import React, { useMemo } from 'react'
import Experience from './components/Experience'
import styles from './index.module.scss'
import { KeyboardControls } from '@react-three/drei'
import UserInterface from './components/UserInterface'

export enum Controls {
  'FORWARD' = 'forward',
  "RIGHT" = 'rightward',
  "BACK" = 'backward',
  "LEFT" = 'leftward',
  "JUMP" = 'jump',
  "RESET" = 'reset',
}

const MarblesGame:React.FC = () => {
  const keyMap = useMemo(() => [
    { name: Controls.FORWARD, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.RIGHT, keys: ['ArrowRight', 'KeyD'] },
    { name: Controls.BACK, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.LEFT, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.JUMP, keys: ['Space'] },
    { name: Controls.RESET, keys: ['KeyR']}
  ], [])

  return (
    <div className={styles.canvasContainer}>
      <KeyboardControls map={keyMap}>
        <Canvas
          shadows
          camera={ {
              fov: 45,
              near: 0.1,
              far: 200,
              position: [ 2.5, 4, 6 ]
          } }
        >
          <Experience />
        </Canvas>
        <UserInterface />
      </KeyboardControls>
    </div>
  )
}

export default MarblesGame