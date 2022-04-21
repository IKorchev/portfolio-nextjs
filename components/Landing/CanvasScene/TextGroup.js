import { Environment, Float } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import Text from "./CustomText"
import gsap from "gsap"
import * as THREE from "three"
const TextGroup = () => {
  const titleRef = useRef()
  const subtitleRef = useRef()
  const groupRef = useRef()
  const { mouse } = useThree()
  const { width, height } = useThree((state) => state.viewport)

  //prettier-ignore
  useFrame((_, dt) => {
    //animate on mouse move
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y,(-mouse.x * Math.PI) / 180,dt + 0.01)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x,(-mouse.y * Math.PI) / 180,dt + 0.01)
  })

  useEffect(() => {
    //initial animation
    const tl = gsap.timeline()
    tl.from([titleRef.current.children[0].position, titleRef.current.children[1].position], {
      y: 40,
      duration: 0.7,
      ease: "back.out(1.3)",
      stagger: 0.1,
    }).from(
      [subtitleRef.current.children[0].position, subtitleRef.current.children[1].position],
      {
        x: -40,
        duration: 0.7,
        ease: "back.out(1.2)",
        stagger: 0.1,
      },
      "-=0.2"
    )
  }, [])

  return (
    <group
      ref={groupRef}
      scale={(0.2 * width) / height}
      position={[width > 5 ? width * -0.7 : width * -0.6, height > 5 ? 1.2 : 1.5, 0]}>
      <Float floatIntensity={0.3} rotationIntensity={0.3}>
        <group ref={titleRef} scale={1}>
          <Text
            size={1}
            hAlign='right'
            rotation={[0.1, 0.4, 0]}
            position={[0, 3, -20]}
            children='IVAYLO'
          />
          <Text
            size={1}
            hAlign='right'
            rotation={[0.1, 0.4, 0]}
            position={[0, -1.5, -20]}
            children='KORCHEV'
          />
        </group>
        <group ref={subtitleRef} position={[0, -2, 0]} scale={1}>
          <Text
            size={0.5}
            hAlign='right'
            rotation={[0, 0.4, 0]}
            colors={["#89a19d", "#89a19d", "#89a19d"]}
            position={[0, -4.5, -20]}
            children='FRONT END'
          />
          <Text
            size={0.5}
            hAlign='right'
            rotation={[0, 0.4, 0]}
            colors={["#89a19d", "#89a19d", "#89a19d"]}
            position={[0, -6.5, -20]}
            children='DEVELOPER'
          />
        </group>
      </Float>
      <pointLight intensity={2} position={[-20, 20, 20]} />
      {/* <Environment preset='sunset' /> */}
    </group>
  )
}

export default TextGroup
