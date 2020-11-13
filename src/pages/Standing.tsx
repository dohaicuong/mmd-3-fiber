import React, { useRef } from 'react'

import { Canvas, useFrame } from 'react-three-fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import useLoadMMD from 'utils/useLoadMMD'
import { useIdle } from 'utils/useIdle'
import { Group, Mesh, SkinnedMesh, SphereBufferGeometry, Vector3 } from 'three'

const StandingPage = () => {
  return (
    <Canvas
      style={{ width: '100vw', height: '100vh' }}
      shadowMap
      pixelRatio={window.devicePixelRatio}
      camera={{
        position: [0, 10, 40],
      }}
    >
      {/* <ambientLight /> */}
      <pointLight position={[0, 6, 0]} intensity={0.4} distance={10} decay={1} />
      <spotLight
        color='223344'
        position={[5, 20, 15]}
        angle={0.8}
        intensity={0.7}
        penumbra={0.8}
        castShadow
        shadowBias={-0.001}
      />
      {/* <directionalLight
        color='333333'
        position={[-15, 15, 20]}
        castShadow
        shadow={{
          // @ts-ignore
          mapSize: { x: 1024, y: 1024 },
          // @ts-ignore
          camera: {
            right: 20,
            top: 20,
            left: -20,
            bottom: -20,
          }
        }}
      /> */}

      <OrbitControls />

      <Stars />

      <Miku />
    </Canvas>
  )
}
export default StandingPage

const Miku = () => {
  const { model, mixer, actions, playAction } = useLoadMMD({
    modelUrl: 'resources/miku_v2.pmd',
    motions: [
      { name: 'idle', url: 'resources/standing.vmd' },
      { name: 'waving', url: 'resources/waving.vmd' },
    ]
  })
  useIdle({ model, actions })
  useFrame((_, delta) => mixer?.update(delta))

  // const { camera } = useThree()
  // const modelPositionString = JSON.stringify(model?.position)
  // useEffect(() => {
  //   if(model?.position) {
  //     console.log('here')
  //     camera.lookAt(model?.position)
  //   }
  // }, [modelPositionString])

  const onTouchMiku = async () => {
    playAction('waving', 'idle')
  }

  if(!model) return null
  return (
    <>
      <primitive
        object={model}
        dispose={null}
        onClick={onTouchMiku}
      />
      <Beams model={model} />
    </>
  )
}

const Beams = ({ model }: { model: SkinnedMesh }) => {
  const beams = useRef<Group>()
  const count = 200
  
  useFrame(() => {
    if(!beams.current) return null

    const num = 20
    const fingerPosition = model.skeleton.bones[110].getWorldPosition(new Vector3( 0, 0, 0 ))
    for(let i = beams.current.children.length - 1; i > 0; i--) {
      if ( i < num ) {
        beams.current.children[i].position.copy(beams.current.children[0].position).lerp(fingerPosition, i/num)
      }
      else {
        beams.current.children[i].position.copy(beams.current.children[i - num].position)
      }
    }
    beams.current.children[0].position.copy(fingerPosition)
  })

  return (
    <group ref={beams}>
      {Array(count).fill(1).map((_beam, index) => (
        <Beam
          key={index}
          count={count}
          index={index}
        />
      ))}
    </group>
  )
}
const Beam = ({ count, index }: { count: number, index: number }) => {
  const mesh = useRef<Mesh>()

  return (
    <>
      <mesh
        ref={mesh}
        geometry={new SphereBufferGeometry(0.05, 4)}
        attach='point-material'
      />
      <meshBasicMaterial
        attach='point-material'
        opacity={0.25 - 0.25 / count * index}
        transparent={true}
        color='ffff88'
      />
    </>
  )
}
