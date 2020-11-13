import React from 'react'
import { useThree } from 'react-three-fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { PerspectiveCamera as PerspectiveCameraType } from 'three'

const MusicCamera = () => {
  const camera = React.useRef<PerspectiveCameraType>()
  const { setDefaultCamera } = useThree()
  React.useEffect(() => {
    if(camera.current) {
      setDefaultCamera(camera.current)
    }
  }, [setDefaultCamera])

  return (
    <PerspectiveCamera
      fov={45}
      aspect={window.innerWidth / window.innerHeight}
      near={1}
      far={2000}
      position={[0, 15, 50]}
      ref={camera}
    />
  )
}

export default MusicCamera
