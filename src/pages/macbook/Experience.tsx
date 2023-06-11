import { ContactShadows, Environment, Float, Html, PresentationControls, useGLTF } from "@react-three/drei"
import { useControls } from "leva"
import { Perf } from "r3f-perf"

const Experience = () => {
  const macbook = useGLTF('./models/macbook.gltf')

  return (
    <>
      {/* <Perf position="top-left" /> */}

      <color args={['#241a1a']}  attach="background" />

      <Environment files="./textures/sky.hdr" />

      <PresentationControls
        global
        rotation={ [ 0.13, 0.1, 0 ] }
        polar={ [ - 0.4, 0.2 ] }
        azimuth={ [ - 1, 0.75 ] }
        config={ { mass: 2, tension: 400 } }
        snap={ { mass: 4, tension: 400 } }
      >
        <Float>
          <rectAreaLight
            width={ 2.5 }
            height={ 1.65 }
            intensity={ 65 }
            color={ '#ffffff' }
            rotation={ [ - 0.1, Math.PI, 0 ] }
            position={ [ 0, 0.55, - 1.15 ] }
          />
          <primitive 
            object={macbook.scene}
            position-y={ - 1.2 }
          >
            <Html
              transform
              distanceFactor={ 0.95 }
              position={ [ 0, 1.56, - 1.4 ] }
              rotation-x={ - 0.256 }
            >
              <video 
                src="./medias/videos/bunny.mp4" 
                width={1280} 
                height={720} 
                controls 
                loop 
                controlsList="nodownload nofullscreen noremoteplayback noplaybackrate" 
                disablePictureInPicture={true}
              />
            </Html>
          </primitive>
        </Float>
      </PresentationControls>

      <ContactShadows
        position-y={ - 1.4 }
        opacity={ 0.4 }
        scale={ 5 }
        blur={ 2.4 }
      />
    </>
  )
}

export default Experience