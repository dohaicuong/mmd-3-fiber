import React from 'react'
import { useFrame } from 'react-three-fiber'
import { Color, Group, Mesh, SkinnedMesh, SphereBufferGeometry, Vector3 } from "three"

const Beams = ({ model }: { model: SkinnedMesh }) => {
  const beams = React.useRef<Group>()
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
export default Beams

const Beam = ({ count, index }: { count: number, index: number }) => {
  return (
    <mesh geometry={new SphereBufferGeometry(0.05, 4)}>
      <meshBasicMaterial
        attach='material'
        opacity={0.25 - 0.25 / count * index}
        transparent={true}
        color={new Color(0xffff88)}
      />
    </mesh>
  )
}
