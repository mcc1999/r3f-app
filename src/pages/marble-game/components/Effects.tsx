import { EffectComposer, DepthOfField, SSR } from '@react-three/postprocessing'
import React from 'react'

const Effects:React.FC = () => {
  return (
    <EffectComposer>
      <DepthOfField 
        focusDistance={0.01}
        focalLength={0.2}
        bokehScale={3}
      />
    </EffectComposer>
  )
}

export default Effects