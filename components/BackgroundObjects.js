// import { Suspense, useRef } from "react"
// import { Canvas, useFrame, useThree } from "@react-three/fiber"
// import { Box, Environment, MeshReflectorMaterial } from "@react-three/drei"
// // import { Water } from "three-stdlib"
// import gsap from "gsap"
// import ScrollTrigger from "gsap/ScrollTrigger"
// import Particles from "./Particles"

// gsap.registerPlugin(ScrollTrigger)

// function ParticlesObj() {
//   const mousex = useRef([0, 0])
//   const { mouse } = useThree()
//   useFrame((e) => {
//     mousex.current[0] = mouse.x * 50
//     mousex.current[1] = -mouse.y * 50
//   })

//   return <Particles count={100} mouse={mousex} />
// }

// export default function BackgroundObjects({ data }) {
//   return (
//     <div className='relative h-[100vh] w-[100vw]'>
//       <Canvas className='h-screen w-screen' camera={{ position: [0, 0, 55], fov: 100 }}>
//         <Suspense fallback={null}>
//           <ParticlesObj />
//           <Environment preset='city' />
//           <mesh rotation={[-Math.PI / 4, 0, 0]} position={[0, 0, 0]} scale={50}>
//             <planeGeometry args={[100, 100]} />
//             <MeshReflectorMaterial
//               blur={[0, 0]}
//               resolution={0}
//               mixBlur={1}
//               mixStrength={60}
//               roughness={1}
//               depthScale={1.2}
//               minDepthThreshold={0.4}
//               maxDepthThreshold={1.4}
//               color='black'
//               metalness={0.5}
//             />
//           </mesh>
//         </Suspense>
//       </Canvas>
//     </div>
//   )
// }

// function Ocean() {
//   const tl = gsap.timeline()
//   const ref = useRef()
//   const [vec] = useState(() => new THREE.Vector3())
//   const { gl, mouse, camera } = useThree()
//   useFrame((state, delta) => {
//     camera.position.lerp(vec.set(mouse.x * 0.5, mouse.y * 0.5, 16), 0.1)
//   })
//   const [waterNormals] = useTexture([WaterNormals.src])
//   waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
//   const geom = useMemo(() => new THREE.PlaneGeometry(3000, 300), [])
//   const config = useMemo(
//     () => ({
//       textureWidth: 512,
//       textureHeight: 512,
//       waterNormals,
//       sunDirection: new THREE.Vector3(),
//       sunColor: 0xffffff,
//       waterColor: 0x001e0f,
//       distortionScale: 3.7,
//       fog: true,
//       format: gl.encoding,
//     }),
//     [waterNormals]
//   )
//   useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta))
//   return (
//     <water
//       onClick={(e) => console.log("lol")}
//       ref={ref}
//       position={[0, -30, 0]}
//       args={[geom, config]}
//       rotation-x={-Math.PI / 3}
//     />
//   )
// }

const GOLDENRATIO = 1.61803398875

import * as THREE from "three"
import { Suspense, useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  useCursor,
  Image,
  Text,
  softShadows,
  Box,
  OrbitControls,
  Plane,
  Reflector,
  useTexture,
  Billboard,
  Environment,
} from "@react-three/drei"
import { useRoute, useLocation } from "wouter"
import Particles from "./Particles"
import { Vector3 } from "three"

// Reference to a set of active KeyboardEvent.code entries
const useCodes = () => {
  const codes = useRef(new Set())
  useEffect(() => {
    const onKeyDown = (e) => {
      console.log(e.code)
      codes.current.add(e.code)
    }
    const onKeyUp = (e) => codes.current.delete(e.code)
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("keyup", onKeyUp)
    }
  }, [])
  return codes
}

const vec = new Vector3()

// Rotation logic from three/examples/jsm/controls/PointerLockControls.js
function WasdControls({ setIgnore }) {
  const { camera } = useThree()
  const code = useCodes()
  const [location, setLocation] = useLocation()
  const moveForward = (distance) => {
    setIgnore(true)
    vec.setFromMatrixColumn(camera.matrix, 0)
    vec.crossVectors(camera.up, vec)
    camera.position.addScaledVector(vec, distance)
    return setIgnore(false)
  }
  const moveRight = (distance) => {
    setIgnore(true)
    vec.setFromMatrixColumn(camera.matrix, 0)
    camera.position.addScaledVector(vec, distance)
    return setIgnore(false)
  }
  useFrame((_, delta) => {
    const speed = code.current.has("ShiftLeft") ? 20 : 10
    if (code.current.has("KeyW")) moveForward(delta * speed)
    if (code.current.has("KeyA")) moveRight(-delta * speed)
    if (code.current.has("KeyS")) moveForward(-delta * speed)
    if (code.current.has("KeyD")) moveRight(delta * speed)
    if (code.current.has("Escape")) setLocation("/")
  })
  return null
}

const trunc = (str) => str.substr(0, 160) + "..."

const getPosX = (i) => {
  const factor = 1.5
  switch (i) {
    case 0:
      return [-3 / factor, 0.5, 0]
    case 1:
      return [-3.15 / factor, 0.5, 1.5]
    case 2:
      return [-3.3 / factor, 0.5, 2.8]
    case 3:
      return [-3.45 / factor, 0.5, 4]
    case 4:
      return [3.45 / factor, 0.5, 4]
    case 5:
      return [3.3 / factor, 0.5, 2.8]
    case 6:
      return [3.15 / factor, 0.5, 1.5]
    case 7:
      return [3 / factor, 0.5, 0]
  }
}

export default function App({ data }) {
  const images = data.map((el, i) => {
    console.log(el)
    return {
      position: getPosX(i),
      rotation: [0, i >= data.length / 2 ? -Math.PI / 2.5 : Math.PI / 2.5, 0],
      url: `https:${el.projectImage.fields.file.url}`,
      id: el.projectImage.sys.id,
      title: el.title,

      description: el.projectDescription,
    }
  })

  const [ignoreCam, setIgnore] = useState(false)
  if (!data) return null

  return (
    <div className='h-screen'>
      <Suspense fallback={null}>
        <Canvas shadows gl={{ alpha: false }} dpr={[1, 1.5]} camera={{ fov: 70 }}>
          <fog attach='fog' args={["#191920", 1, 55]} />
          <Environment preset='city' />
          <Plane
            receiveShadows
            rotation={[-Math.PI / 2.1, 0, 0]}
            scale={50}
            position={[0, -1, 5]}
            args={[100, 150, 150]}>
            <meshStandardMaterial attach='material' color={"white"} />
          </Plane>
          <Text color='black' position={[0, 0, 3]} fontSize={0.7} rotation={[-Math.PI / 2, 0, 0]}>
            Projects
          </Text>
          <Text color='black' position={[0, 0, 4]} fontSize={0.1} rotation={[-Math.PI / 2, 0, 0]}>
            WASD keys to slightly move
          </Text>
          <Text color='black' position={[0, 0, 4.2]} fontSize={0.1} rotation={[-Math.PI / 2, 0, 0]}>
            Click on the image to turn towards it
          </Text>
          <WasdControls setIgnore={setIgnore} />
          <group position={[0, -0.5, 0]}>
            <Frames ignore={ignoreCam} images={images} />
          </group>
          <Particles count={100} mouse={{ current: [0, 0] }} />
        </Canvas>
      </Suspense>
    </div>
  )
}

function Frames({ ignore, images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute("/item/:id")
  const [location, setLocation] = useLocation()
  const { camera, mouse } = useThree()

  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id)
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.5))
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 1, 6.5)
      q.identity()
    }
  })

  useFrame((state, dt) => {
    camera.position.lerp(p, THREE.MathUtils.damp(0, 1, 3, dt))
    camera.quaternion.slerp(q, THREE.MathUtils.damp(0, 1, 3, dt))
  })
  return (
    <group ref={ref}>
      {images.map(
        (props, i) => {
          const {url} = props
          return   <Frame current={clicked.current} setLocation={setLocation} url={url} description={props.description} id={props.id} key={props.id} {...props} />} /* prettier-ignore */
      )}
    </group>
  )
}

function Frame({ current, setLocation, url, id, description, c = new THREE.Color(), ...props }) {
  const [hovered, hover] = useState(false)
  const image = useRef()
  const frame = useRef()
  useCursor(hovered)

  return (
    <group
      onPointerOver={(e) => (e.stopPropagation(), hover(true))}
      onPointerOut={() => hover(false)}
      onPointerMissed={() => setLocation("/")}
      onClick={(e) => {
        e.stopPropagation()
        setLocation(current?.id === id ? "/" : "/item/" + id)
      }}
      {...props}>
      <Box name={id} scale={[1, 1, 0.1]} position={[0, GOLDENRATIO / 2, 0]}>
        <meshPhongMaterial color='black' metalness={0.5} roughness={0.5} />
        <Image raycast={() => null} ref={image} position={[0, 0, 0.63]} url={url} />
      </Box>
      <Box args={[1, 0.4]} position={[0, 0.12, 0]} scale={[1, 1, 0.1]}>
        <meshPhongMaterial color='black' metalness={0.5} roughness={0.5} />
        <Text
          maxWidth={1.5}
          anchorX='left'
          anchorY='top'
          position={[-0.5, 1.5, 0.1]}
          fontSize={0.1}
          color='white'>
          {props.title}
        </Text>
        <Text
          maxWidth={0.9}
          anchorX='left'
          anchorY='top'
          position={[-0.45, 0.14, 0.6]}
          fontSize={0.05}
          color='white'>
          {trunc(description)}
        </Text>
      </Box>
    </group>
  )
}
