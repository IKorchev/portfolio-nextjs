import React, { useEffect, useState } from 'react'
import { useTexture, Box, useCursor, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import gsap from 'gsap'

const SkillBox = ({ name, index }) => {
  const boxRef = useRef()
  const textRef = useRef()
  const image = useTexture(`/${name}.svg`)
  const isSecondRow = index >= 4
  const [hovered, setHovered] = useState(false)

  useCursor(hovered)
  useFrame((state, delta) => {
    !hovered ? (boxRef.current.rotation.y += 0.002) : false
  })

  useEffect(() => {
    gsap.to(textRef.current.scale, {
      x: hovered ? 1 : 0,
      y: hovered ? 1 : 0,
      z: hovered ? 1 : 0,
      duration: 0.2,
    })
    gsap.fromTo(
      textRef.current.position,
      {
        y: 0,
      },
      {
        y: !isSecondRow ? 1 : -0.8,
        duration: 0.2,
      }
    )
    gsap.to(boxRef.current.material.color, {
      r: !hovered ? 0.4 : 255 / 150,
      g: !hovered ? 0.4 : 182 / 150,
      b: !hovered ? 0.4 : 0,
    })
  }, [hovered])

  return (
    <group
      onPointerEnter={() => {
        setHovered(true)
      }}
      onPointerLeave={() => {
        setHovered(false)
      }}
      receiveShadow
      castShadow
      rotation={[0, 0, 0]}
      position={[!isSecondRow ? index * 1.4 : -5.5 + index * 1.4, isSecondRow ? -1.2 : 0, 0]}>
      <Text ref={textRef} position={[0, !isSecondRow ? 1 : -0.8, 0]} color='white' fontSize={0.35} anchorX='center' anchorY='top'>
        {name.toUpperCase()}
      </Text>
      <Box ref={boxRef}>
        <meshPhysicalMaterial attach='material' map={image} />
      </Box>
    </group>
  )
}

export default SkillBox
