import { useFrame, useThree } from "@react-three/fiber"
import { Stars, useFBX, useGLTF, useTexture, OrbitControls, PresentationControls, Environment } from "@react-three/drei"
import CustomSphere from "./Planet"
import SkillsGroup from "./SkillsGroup"
import TextGroup from "./TextGroup"
import Ship from "./Ship"
import { Vector3 } from "three"
const colors = ["#797a7a", "#a1ffff", "#fcc921", "#ab00ab", "#f3f3f3"]

const Scene = ({ scroll }) => {
  const { width, height } = useThree((state) => state.viewport)
  useFrame((state, delta) => {
    if (scroll.current) {
      const p = new Vector3(width * 1, height * 1, -21)
      state.camera.position.lerp(p, scroll.current * delta * 0.4)
    }
    const p = new Vector3(0, 0, 5)
    state.camera.position.lerp(p, delta * 4)
  })

  return (
    <group>
      {/* 3D Title and Subtitle text */}
      <TextGroup />
      <CustomSphere position={[width * -1.2, height * 0.8, -5]} scale={10} color={colors[0]} />
      <CustomSphere position={[width * 2.2, height * -1.5, -20]} scale={10} color={colors[0]} />
      <CustomSphere position={[width * -1.2, height * -1.5, -20]} scale={10} color={colors[4]} />
      <CustomSphere position={[width * 5.4, height * 10, -90]} scale={10} color={colors[4]} />
      <CustomSphere position={[width * -3.4, height * 9, -100]} scale={10} color={colors[4]} />
      <Stars count={200} />
      <SkillsGroup />
      <Ship
        scroll={scroll}
        position={[-width * 0.8, height * 1.4, -12]}
        rotation={[-Math.PI / 1.3, Math.PI / 0.8, 6]}
      />

      <pointLight position={[-width * 0.8, height * 1.4, -5]} intensity={1} color='red' />
      <pointLight position={[0, 0, 0]} intensity={0.1} color='#ffffff' />

      {/* Lights */}
    </group>
  )
}

export default Scene
