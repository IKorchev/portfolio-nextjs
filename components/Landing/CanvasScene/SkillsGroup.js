import { useThree } from "@react-three/fiber"
import gsap from "gsap"
import React, { useEffect } from "react"
import { useRef } from "react"
import skillsImages from "../../../utils/images"
import Text from "./CustomText"
import SkillBox from "./SkillBox"
import * as THREE from "three"
const SkillsGroup = () => {
  const skillsGroup = useRef()
  const { width, height } = useThree((state) => state.viewport)
  useEffect(() => {
    const tl = gsap.timeline()
    const positions = skillsGroup.current.children.map((el) => el.position)
    tl.from(
      positions,
      {
        duration: 0.5,
        y: -10,
        stagger: 0.1,
      },
      "+=1.2"
    )
  }, [])

  return (
    <group
      ref={skillsGroup}
      position={[width * 0.8, height * -1.7, -25]}
      scale={THREE.MathUtils.clamp((width / height) * 2, 1, 2)}>
      <Text
        size={0.15}
        rotation={[0, -0.3, 0]}
        colors={["#d69d00", "#d69d00", "#d69d00"]}
        position={[1.8, 1.4, 0]}
        children='SKILLS'
      />
      {skillsImages.map((el, i) => {
        return <SkillBox key={el} name={el} index={i} />
      })}
    </group>
  )
}

export default SkillsGroup
