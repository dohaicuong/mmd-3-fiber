import React from 'react'
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber'
import MusicLight from './MusicLight'
import MusicStage from './MusicStage'
import MusicCamera from './MusicCamera'

import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader'
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper'
import { loadAnimation } from 'utils/loadAnimation'
import { Audio, AudioListener, AudioLoader } from 'three'

const WaveFilePage = () => {
  return (
    <Canvas
      gl2
      shadowMap
      gl={{ antialias: true }}
      pixelRatio={window.devicePixelRatio}
      style={{ width: window.innerWidth, height: window.innerHeight }}
    >
      <MusicLight />
      <MusicCamera />

      <React.Suspense fallback={null}>
        <Miku />
      </React.Suspense>

      <MusicStage />
    </Canvas>
  )
}
export default WaveFilePage

const Miku = () => {
  const model = useLoader(MMDLoader, 'resources/muubu_miku/miku.pmx')
  const model2 = useLoader(MMDLoader, 'resources/dot_miku/miku.pmx')
  const model3 = useLoader(MMDLoader, 'resources/dot_miku_2020/miku.pmx')
  const model4 = useLoader(MMDLoader, 'resources/dot_miku_honey_whip/miku.pmx')
  const model5 = useLoader(MMDLoader, 'resources/dot_miku_star_voice/miku.pmx')

  const { camera } = useThree()
  const [helper, setHelper] = React.useState<MMDAnimationHelper>()

  React.useEffect(() => {
    if(model.visible) {
      const start = async () => {
        const loader = new MMDLoader()
        const helper = new MMDAnimationHelper()

        const cameraMotionClip = await loadAnimation(loader, camera as any, 'resources/hare_hare_yukai/camera.vmd')
        helper.add(camera, { animation: cameraMotionClip })

        const { audio } = await loadAudio('resources/hare_hare_yukai/music.mp3')
        helper.add(audio, { delayTime: 0 }) // { delayTime: 160 * 1 / 30 }

        const haruhiMotion = await loadAnimation(loader, model, 'resources/hare_hare_yukai/haruhi.vmd')
        helper.add(model, { physics: true, animation: haruhiMotion })

        const ashinaMotion = await loadAnimation(loader, model2, 'resources/hare_hare_yukai/asahina.vmd')
        helper.add(model2, { physics: true, animation: ashinaMotion })

        const yukiMotion = await loadAnimation(loader, model3, 'resources/hare_hare_yukai/yuki.vmd')
        helper.add(model3, { physics: true, animation: yukiMotion })

        const kyonMotion = await loadAnimation(loader, model4, 'resources/hare_hare_yukai/kyon.vmd')
        helper.add(model4, { physics: true, animation: kyonMotion })

        const koizumiMotion = await loadAnimation(loader, model5, 'resources/hare_hare_yukai/koizumi.vmd')
        helper.add(model5, { physics: true, animation: koizumiMotion })

        setHelper(helper)
      }
      start()
    }
  }, [model.visible])

  useFrame((_, delta) => {
    helper?.update(delta)
  })

  return (
    <>
      <primitive object={model} dispose={null} />
      <primitive object={model2} dispose={null} />
      <primitive object={model3} dispose={null} />
      <primitive object={model4} dispose={null} />
      <primitive object={model5} dispose={null} />
    </>
  )
}

const loadAudio = (url: string): Promise<{audio: Audio<GainNode>, listener: AudioListener}> => {
  const loader = new AudioLoader()
  const listener = new AudioListener()
  listener.position.z = 1
  return new Promise(resolve => {
    loader.load(url, buffer => {
      const audio = new Audio(listener).setBuffer(buffer)
      resolve({ audio, listener })
    })
  })
}

const loadPose = (loader: MMDLoader, poseUrl: string): Promise<object> => {
  return new Promise(resolve => {
    loader.loadVPD(poseUrl, true, pose => {
      resolve(pose)
    })
  })
}

