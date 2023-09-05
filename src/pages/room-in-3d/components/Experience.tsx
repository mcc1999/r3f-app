import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import React, { useEffect } from 'react'
import Room from './gltfjsx/RoomModel'
import Light from './gltfjsx/ElgatoLightModel'
import Leds from './gltfjsx/GoogleHomeLedsModel'
import Buttons from './gltfjsx/LoupedeckButtonsModel'
import MacScreen from './gltfjsx/MacScreenModel'
import PcScreen from './gltfjsx/PcScreenModel'
import TopChair from './gltfjsx/TopChairModel'
import CoffeeSteam from './gltfjsx/CoffeeSteamModel'
import BouncingLogo from './BouncingLogo'
import Test from './Test'

const Experience:React.FC = () => {
  const { color } = useControls({ color: '#eeddee', })  

  return (
    <>
      <Perf position="top-left" />

      <color args={['#010101']} attach="background" />

      <OrbitControls makeDefault />

      <Light />
      <Leds />
      <Buttons />
      <Room />
      <MacScreen />
      <PcScreen />
      <TopChair />
      <CoffeeSteam />
      <BouncingLogo />
    </>
  )
}

export default Experience