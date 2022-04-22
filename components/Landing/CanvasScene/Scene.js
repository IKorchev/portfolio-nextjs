"../../../utils/animations"
import { useFrame, useThree } from "@react-three/fiber"
import { Environment, Stars } from "@react-three/drei"
import CustomSphere from "./Planet"
import SkillsGroup from "./SkillsGroup"
import TextGroup from "./TextGroup"
import Ship from "./Ship"
import DroneModel from "./Drone"
import { Vector3 } from "three"
import * as THREE from "three"
import ProjectsPlanes from "./Projects"


const colors = ["#797a7a", "#a1ffff", "#fcc921", "#ab00ab", "#f3f3f3"]

const Scene = ({ data, scroll }) => {
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

      <CustomSphere position={[width * 5.4, height * 10, -90]} scale={10} color={colors[4]} />
      <CustomSphere position={[width * -3.4, height * 9, -100]} scale={10} color={colors[4]} />
      <Stars count={200} />
      <SkillsGroup />
      <Ship
        scroll={scroll}
        position={[-width * 0.8, height * 1.4, -12]}
        rotation={[-Math.PI / 1.3, Math.PI / 0.8, 6]}
      />
      <DroneModel position={[-width * 1, -height * 1, -10]} rotation={[0, 0, 0]} />
      <ProjectsPlanes
        scale={THREE.MathUtils.clamp((2 * width) / height, 2, 2.5)}
        position={[width * 2.5, -height * 1.8, -35]}
        rotation={[0, -0.5, 0]}
        scroll={scroll}
        data={data}
      />
      <Environment preset='night' />
    </group>
  )
}


export default Scene
