import { OrbitControls } from '@react-three/drei'
import Lights from './Lights'
import Level from './Level'
import { Physics } from '@react-three/rapier'
import Marble from './Marble'
import useR3fStore from '@/stores'
import Effects from './Effects'
import { Perf } from 'r3f-perf'


export default function Experience() {
  const obstacleNum = useR3fStore(state => state.blocksCount)
  const obstacleSeed = useR3fStore(state => state.blocksSeed)

  return (
    <>
      <Perf position="top-left" />
      
      <color args={['#bdedfc']} attach="background" />
      <OrbitControls />

      <Physics>
        <Lights />

        <Level obstacleNum={obstacleNum} seed={obstacleSeed} />

        <Marble />
      </Physics>

      <Effects />
    </>
  )
}