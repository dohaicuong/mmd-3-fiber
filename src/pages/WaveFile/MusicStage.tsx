import React from 'react'
import {
  CircleBufferGeometry,
  Color,
  FrontSide,
  SphereBufferGeometry,
  // Mesh,
  // PlaneBufferGeometry,
  // Vector3,
} from 'three'

const MusicStage = () => {
  return (
    <group>
      <MusicStageBack />
      <MusicStageGround />
      {/* <Monitor
        position={[0, 25, -50]}
        rotation={[180 * Math.PI / 180, 180 * Math.PI / 180, 180 * Math.PI / 180]}
      />
      <Monitor
        position={[-70, 25, 0]}
        rotation={[180 * Math.PI / 180, 110 * Math.PI / 180, 180 * Math.PI / 180]}
      />
      <Monitor
        position={[70, 25, 0]}
        rotation={[180 * Math.PI / 180, -110 * Math.PI / 180, 180 * Math.PI / 180]}
      /> */}
    </group>
  )
}
export default MusicStage

const MusicStageBack = () => {
  return (
    <mesh geometry={new SphereBufferGeometry(256, 32)}>
      <meshBasicMaterial attach="material" wireframe color={0xffffff} />
    </mesh>
  )
}
const MusicStageGround = () => {
  return (
    <>
      <mesh
        receiveShadow
        geometry={new CircleBufferGeometry(50, 32)}
        rotation={[-90 * Math.PI / 180, 0, 0]}
      >
        <meshPhongMaterial
          attach='material'
          color={new Color(0x444444)}
          emissive={new Color(0x002222)}
          shadowSide={FrontSide}
        />
      </mesh>
    </>
  )
}
// const Monitor = (props: any) => {
//   const edge = React.useRef<Mesh>()
//   React.useEffect(() => {
//     if(edge.current) {
//       edge.current.position.z -= 0.01
//     }
//   }, [])

//   // const { gl, scene, camera } = useThree()
//   // const [composer2, setComposer2] = React.useState<EffectComposer>()
//   // React.useEffect(() => {
//     // const effect = new OutlineEffect(gl, {})

//     // const bloomPass = new UnrealBloomPass(
//     //   new Vector2(window.innerWidth, window.innerHeight),
//     //   1.0,
//     //   0.7,
//     //   0.1
//     // )
//     // const copyPass = new ShaderPass(CopyShader)
//     // copyPass.renderToScreen = true
//     // const composer = new EffectComposer(gl)
//     // composer.setSize(window.innerWidth, window.innerHeight)
//     // composer.addPass(bloomPass)
//     // composer.addPass(copyPass)

//     // const copyPass2 = new ShaderPass(CopyShader)
//     // const composer2 = new EffectComposer(gl)
//     // composer2.readBuffer = composer.readBuffer
//     // composer2.setSize(window.innerWidth, window.innerHeight)
//     // composer2.addPass(copyPass2)
//     // setComposer2(composer2)
//   // }, [])

//   // useFrame(() => {
//     // effect.render(scene, camera)
//     // gl.render(scene, camera)
//     // composer2?.render()
//     // composer.render()
//   // })

//   return (
//     <>
//       <mesh
//         geometry={new PlaneBufferGeometry(100, 40)}
//         {...props}
//       >
//         {/* <shaderMaterial
//           attach='material'
//           uniforms={{
//             strength: { value: 0.20 },
//             // tDiffuse: { value: composer2?.writeBuffer.texture }
//           }}
//           vertexShader=''
//           fragmentShader=''
//         /> */}
//       </mesh>
      
//       <mesh
//         geometry={new PlaneBufferGeometry(100, 40)}
//         ref={edge}
//         scale={new Vector3(1, 1, 1).multiplyScalar(1.01)}
//         {...props}
//       >
//         <meshBasicMaterial
//           attach='material'
//           color={new Color(0xffffff)}
//         />
//       </mesh>
//     </>
//   )
// }