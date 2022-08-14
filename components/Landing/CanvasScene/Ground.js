import { Plane, MeshReflectorMaterial } from '@react-three/drei'

const Ground = () => {
  return (
    <Plane receiveShadow rotation={[-Math.PI / 2, 0, 0]} args={[200, 200, 55]} position={[0, -5, 25]}>
      <MeshReflectorMaterial metalness={0.1} mirror={1} />
    </Plane>
  )
}

export default Ground
