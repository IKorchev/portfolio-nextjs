import { useThree } from "@react-three/fiber"
import gsap from "gsap"
import React, { useEffect } from "react"
import { useRef } from "react"
import skillsImages from "../../../utils/images"
import Text from "./CustomText"
import SkillBox from "./SkillBox"

const SkillsGroup = () => {
  const skillsGroup = useRef()
  const { width, height } = useThree((state) => state.viewport)
  useEffect(() => {
    const tl = gsap.timeline()
    const positions = skillsGroup.current.children.map((el) => el.position)
    tl.from(
      positions,
      {
        y: -10,
        stagger: 0.1,
      },
      "+=1.5"
    )
  }, [])

  return (
    <group
      ref={skillsGroup}
      position={[width * 0.9, height * -0.9, -20]}
      scale={Math.min((width / height) * 1.5, 1.5)}>
      <Text size={0.15} rotation={[0, -0.3, 0]} position={[1.8, 1.4, 0]} children='SKILLS' />
      {skillsImages.map((el, i) => {
        return <SkillBox key={el} name={el} index={i} />
      })}
    </group>
  )
}

export default SkillsGroup
