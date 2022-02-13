import { Sphere, useTexture, Float } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import React, { useRef, useState } from "react"

const CustomSphere = ({ position, scale, color }) => {
  const { mouse, camera, viewport } = useThree()
  const texture = useTexture("/planettexture.jpg")
  const sphereRef = useRef()
  const [hovered, setHovered] = useState(true)
  useFrame((_, dt) => {
    // offset the camera on every frame dependent on the mouse
    camera.position.x = mouse.x * 0.02
    camera.position.y = mouse.y * 0.02
    // camera.position.z = 20
    //if the object is not hovered, rotate
    if (hovered) {
      sphereRef.current.rotation.y += dt / 66
      sphereRef.current.rotation.x -= dt / 56
    }
  })

  return (
    <Float speed={0.2} rotationIntensity={0.3} floatIntensity={0.3}>
      <Sphere
        onPointerEnter={() => {
          setHovered(false)
        }}
        onPointerLeave={() => {
          setHovered(true)
        }}
        ref={sphereRef}
        receiveShadow
        castShadow
        position={position}
        scale={scale * (viewport.width / viewport.height / 8)}
        args={[1, 36, 36]}>
        <meshStandardMaterial color={color} map={texture} />
      </Sphere>
    </Float>
  )
}

export default CustomSphere
