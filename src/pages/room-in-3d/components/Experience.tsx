import { OrbitControls, PresentationControls } from '@react-three/drei'
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
import { Bloom, DepthOfField, EffectComposer, HueSaturation, Noise } from '@react-three/postprocessing'
import { HalfFloatType } from 'three'

const Experience:React.FC = () => {
  return (
    <>
      <Perf position="top-left" />

      <color args={['#010101']} attach="background" />


      <EffectComposer stencilBuffer> 
        
      </EffectComposer>

      <PresentationControls snap global zoom={0.8} polar={[0, Math.PI / 4]} azimuth={[-Math.PI / 4, Math.PI / 4]}>
        <Light />
        <Leds />
        <Buttons />
        <Room />
        <MacScreen />
        <PcScreen />
        <TopChair />
        <CoffeeSteam />
        <BouncingLogo />
      </PresentationControls>
    </>
  )
}

export default Experience