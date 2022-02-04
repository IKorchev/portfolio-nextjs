import { useRef, Suspense, useEffect, useState } from "react"
import { useThree, Canvas, useFrame } from "@react-three/fiber"
import LandingPage from "./LandingPage"
import {
  Billboard,
  Box,
  Float,
  ScrollControls,
  Scroll,
  Text,
  useTexture,
  Environment,
  Stars,
} from "@react-three/drei"
import { boxesData } from "../utils/boxesData"
import { useSpring, animated as a } from "@react-spring/three"
import * as THREE from "three"
import { handleScrollDown } from "../utils/animations"
import Aboutme from "./Aboutme"
import Contact from "./Contact"
import Projects from "./Projects"

const BackgroundObjects = ({ data }) => {
  return (
    <div className='overflow-hidden  mx-auto '>
      <div className='z-0  top-0 left-0 relative w-screen h-screen overflow-hidden'>
        <Canvas camera={{ position: [0, 0, 55], fov: 100, zoom: 2 }}>
          <Stars count={2000} depth={500} />
          <Suspense fallback={null}>
            <Environment preset='studio' />
            <SkillsBoxes />
          </Suspense>
          <ScrollControls damping={15} pages={7}>
            <Scroll html className='w-full h-screen z-0'>
              <LandingPage />
              <Projects data={data} />
              <Aboutme />
              <Contact />
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
    </div>
  )
}
function SkillsBoxes() {
  const ref = useRef()
  const vec = new THREE.Vector3()
  const { mouse } = useThree()
  useFrame(() => {
    ref.current.position.lerp(vec.set(-mouse.x * 1, -mouse.y * 1, 0), 0.1)
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      (-mouse.x * Math.PI) / 70,
      0.01
    )
  })

  return (
    <group ref={ref} position={[0, 0, 5]}>
      <Billboard position={[40, 0, 0]}>
        <Text fontSize={1}>My skils</Text>
      </Billboard>
      {boxesData.map((el, i) => {
        const isSecondRow = i > 3
        const xPos = isSecondRow ? i * 5 : i * 5 + 20
        const yPos = isSecondRow ? 2 : 6
        return (
          <CustomBox
            index={i}
            key={el.text}
            text={el.text}
            position={[xPos, -yPos, 3]}
            image={el.image}
          />
        )
      })}
    </group>
  )
}
function CustomBox({ index, image, text, ...props }) {
  const mesh = useRef()
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(0)
  const [texture1] = useTexture([image])
  const { spring: hoveredSpring } = useSpring({
    spring: hovered,
    config: { mass: 2, tension: 352, friction: 20, precision: 0.001 },
  })
  const { spring: textSpring } = useSpring({
    spring: hovered,
    config: { mass: 5, tension: 255, friction: 50, precision: 0.0001 },
  })
  useEffect(() => {
    document.body.style.cursor = hovered && "pointer"
    return () => (document.body.style.cursor = !hovered && "auto")
  }, [hovered])

  const scale = hoveredSpring.to([0, 1], [2, 2.5])
  const rotation = hoveredSpring.to([0, 1], [1.5, Math.PI / 3])
  const textRotation = textSpring.to([0, 1], [Math.PI / 3, 0])
  const scaleText = textSpring.to([0, 1], [0, 0.8])
  const textPosY = textSpring.to([0, 1], [0, 2])
  const color = hoveredSpring.to([0, 1], ["#cfe8e5", "rgb(45, 212, 191)"])

  return (
    <Float
      speed={1} // Animation speed, defaults to 1
      rotationIntensity={0.02} // XYZ rotation intensity, defaults to 1
      floatIntensity={0.001} // Up/down float intensity, defaults to 1
    >
      <group
        position={props.position}
        onPointerOver={() => setHovered(1)}
        onPointerOut={() => {
          setActive(0)
          setHovered(0)
        }}
        onClick={() => setActive(Number(!active))}
        ref={mesh}>
        <a.mesh
          castShadow
          scale={scaleText}
          position-z={15}
          position-y={textPosY}
          rotation-x={textRotation}>
          <Billboard>
            <Text color={"white"} fontSize={1}>
              {text}
              <a.meshStandardMaterial attach='material' color={color} />
            </Text>
          </Billboard>
        </a.mesh>
        <a.mesh scale={scale} rotation-y={rotation} position-z={15}>
          <Box>
            <a.meshStandardMaterial map={texture1} color={color} />
          </Box>
        </a.mesh>
      </group>
    </Float>
  )
}

export default BackgroundObjects
