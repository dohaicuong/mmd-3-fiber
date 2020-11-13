import React from 'react'
import { Color, DirectionalLight, SpotLight } from "three"

const MusicLight = () => {
  return (
    <group>
      <MusicSpotLight />
      <MusicDirectionalLight />
    </group>
  )
}
export default MusicLight

const MusicSpotLight = () => {
  const spotLight = React.useRef<SpotLight>()
  React.useEffect(() => {
    if(spotLight.current) {
      spotLight.current.shadow.bias = -0.001
    }
  }, [])

  return (
    <spotLight
      castShadow
      color={new Color(0x8c8c8c)} // 0x223344
      position={[5, 20, 15]}
      angle={0.8}
      intensity={0.7}
      penumbra={0.8}
      ref={spotLight}
    />
  )
}

const MusicDirectionalLight = () => {
  const directionalLight = React.useRef<DirectionalLight>()
  React.useEffect(() => {
    if(directionalLight.current) {
      directionalLight.current.shadow.mapSize.x = 1024
      directionalLight.current.shadow.mapSize.y = 1024
      directionalLight.current.shadow.camera.right = 20
      directionalLight.current.shadow.camera.top = 20
      directionalLight.current.shadow.camera.left = -20
      directionalLight.current.shadow.camera.bottom = -20
      directionalLight.current.shadow.bias = -0.001
    }
  }, [])

  return (
    <directionalLight
      castShadow
      color={new Color(0x8c8c8c)} // 0x333333 0xffffff
      position={[-15, 15, 20]}
      ref={directionalLight}
    />
  )
}