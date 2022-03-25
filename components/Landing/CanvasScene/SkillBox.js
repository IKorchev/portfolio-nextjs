import React, { useState } from "react"
import { useTexture, Box, useCursor } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
const SkillBox = ({ name, index }) => {
  const boxRef = useRef()
  const image = useTexture(`/${name}.svg`)
  const isSecondRow = index >= 4
  const [hovered, setHovered] = useState(false)

  useCursor(hovered)
  useFrame((state, delta) => {
    boxRef.current.rotation.y += 0.002
  })

  return (
    <Box
      onPointerEnter={() => {
        setHovered(true)
      }}
      onPointerLeave={() => {
        setHovered(false)
      }}
      ref={boxRef}
      receiveShadow
      castShadow
      rotation={[0, 0, 0]}
      position={[!isSecondRow ? index * 1.4 : -5.5 + index * 1.4, isSecondRow ? -1.2 : 0, 0]}>
      <meshPhysicalMaterial attach='material' map={image} color={!hovered ? "white" : "#17a382"} />
    </Box>
  )
}

export default SkillBox
