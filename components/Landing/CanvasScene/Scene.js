import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import CustomSphere from "./Planet"
import TextGroup from "./TextGroup"
import SkillBox from "./SkillBox"
import skillsImages from "../../../utils/images"
import CustomText from "./CustomText"
const colors = ["#797a7a", "#a1ffff", "#fcc921", "#ab00ab", "#f3f3f3"]

const Scene = ({ scroll }) => {
  const lightRef = useRef()
  const { mouse, size } = useThree()
  const { width, height } = useThree((state) => state.viewport)

  useFrame((state, delta) => {
    lightRef.current.position.x = mouse.x * (width * 0.5)
    lightRef.current.position.y = mouse.y * (height * 0.5)
    if (scroll.current) {
      state.camera.position.z = 5 + -scroll.current * 1
      state.camera.position.y = scroll.current * 0.4
      state.camera.position.x = scroll.current * 1
      state.camera.rotation.y = scroll.current * 0.048
    }
  })

  return (
    <group>
      {/* 3D Title and Subtitle text */}
      <TextGroup />
      {/* Background objects */}
      <CustomSphere position={[width * -1.2, height * 0.8, -5]} scale={10} color={colors[0]} />
      <CustomSphere position={[width * 2.2, height * -1.5, -20]} scale={10} color={colors[0]} />
      <CustomSphere position={[width * -1.2, height * -1.5, -20]} scale={10} color={colors[4]} />
      <CustomSphere position={[width * 5.4, height * 10, -90]} scale={10} color={colors[4]} />
      <CustomSphere position={[width * -3.4, height * 9, -100]} scale={10} color={colors[4]} />
      <CustomSphere position={[width * 4.4, height * 5, -50]} scale={10} color={colors[4]} />
      <Stars count={200} />
      <group
        position={[width * 0.9, height * -0.9, -20]}
        scale={Math.min((width / height) * 1.5, 1.5)}>
        <CustomText
          size={0.15}
          rotation={[0, -0.3, 0]}
          position={[1.8, 1.4, 0]}
          children='SKILLS'
        />
        {skillsImages.map((el, i) => {
          return <SkillBox key={el} name={el} index={i} />
        })}
      </group>
      {/* Lights */}
      <pointLight ref={lightRef} position={[0, 0, 0]} intensity={0.1} color='#ffffff' />
    </group>
  )
}

export default Scene
