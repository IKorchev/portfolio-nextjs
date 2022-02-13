import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import CustomSphere from "./Planet"
import Ground from "./Ground"

const colors = ["#797a7a", "#a1ffff", "#fcc921", "#ab00ab", "#f3f3f3"]
const Scene = ({ scroll }) => {
  const lightRef = useRef()
  const { width, height } = useThree((state) => state.viewport)
  const { mouse } = useThree()
  useFrame((state, delta) => {
    lightRef.current.position.x = -mouse.x * width
    lightRef.current.position.y = -mouse.y * height
    if (scroll.current) {
      state.camera.position.y -= scroll.current * 1
    }
  })
  //prettier-ignore
  return (
    <group>
      <CustomSphere position={[ width * -1.2, height * 0.8, -5 ] }    scale={10}  color={colors[0]} />
      <CustomSphere position={[ width * 2.2,  height * -1.5 , -20 ] } scale={10}   color={colors[0]} />
      <CustomSphere position={[ width * -1.2, height * -2.2, -10 ] } scale={10}   color={colors[4]} />
      <CustomSphere position={[ width * 1.4,  height * 1.3,  -10 ] } scale={10}  color={colors[4]} />
      {/* <Ground /> */}
      <Stars count={200} />
      <pointLight ref={lightRef} position={[23, 23, 50]} intensity={0.8} color='#ffffff' />
      <ambientLight intensity={0.1} />
    </group>
  )
}

export default Scene
