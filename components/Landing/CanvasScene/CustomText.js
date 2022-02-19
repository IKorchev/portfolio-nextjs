import React, { useLayoutEffect, useMemo } from "react"
import { extend, useLoader } from "@react-three/fiber"
import { FontLoader } from "three-stdlib"
import { TextGeometry } from "three-stdlib"
import { useRef } from "react"
import * as THREE from "three"
import { Environment, GradientTexture } from "@react-three/drei"
import { LayerMaterial, Base, Noise } from "lamina"
extend({ TextGeometry })

const CustomText = ({
  children,
  vAlign = "center",
  hAlign = "center",
  size = 0.5,
  color = "black",
  colors = ["#008c7b", "#17a382", "white"],
  ...props
}) => {
  const mesh = useRef()
  const fontPoppins = useLoader(FontLoader, "/Poppins_Bold.json")
  useLayoutEffect(() => {
    const size = new THREE.Vector3()
    mesh.current.geometry.computeBoundingBox()
    mesh.current.geometry.boundingBox.getSize(size)
    mesh.current.position.x = hAlign === "center" ? -size.x / 2 : hAlign === "right" ? 0 : -size.x
    mesh.current.position.y = vAlign === "center" ? -size.y / 2 : vAlign === "top" ? 0 : -size.y
  }, [children])
  const config = useMemo(
    () => ({
      font: fontPoppins,
      size: 30,
      height: 20,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1,
    }),
    [fontPoppins]
  )
  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.05]}>
      <mesh castShadow receiveShadow ref={mesh}>
        <textGeometry attach='geometry' args={[children, config]} />
        <meshStandardMaterial metalness={0.3} roughness={0.1}>
          <GradientTexture stops={[0, 0.8, 1]} colors={colors} />
        </meshStandardMaterial>
      </mesh>
    </group>
  )
}

export default CustomText
