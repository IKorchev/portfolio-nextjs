import { Float, Plane, useCursor, useTexture } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import { handleScrollDown } from "../../../utils/animations"
import Text from "./CustomText"

const ProjectsPlanes = ({ data, scroll, ...props }) => {
  const projectsGroupRef = useRef()
  const { width, height } = useThree((state) => state.viewport)
  useEffect(() => {
    const positions = projectsGroupRef.current.children.map((el) => el.position)
    gsap.from(positions, {
      duration: 0.4,
      x: 8,
      stagger: 0.1,
      delay: 0.2,
    })
  }, [])
  return (
    <group ref={projectsGroupRef} {...props}>
      <Float
        position={[0, data.length * 1.1 + 1, 0]}
        speed={0.5}
        rotationIntensity={0.5}
        floatIntensity={0.2}>
        <Text size={0.1} rotation={[0, -0.2, 0]} children='Projects' />
      </Float>

      {data.map((project, index) => {
        const { projectImage } = project
        const imageURL = `https:${projectImage.fields.file.url}` //contentful formats the url without the protocol
        return (
          <CustomPlane
            key={imageURL}
            id={projectImage.sys.id}
            scroll={scroll}
            imageURL={imageURL}
            index={index}
            position={[0, height * 1.6 - index * 1.2, 0]}
          />
        )
      })}
    </group>
  )
}

function CustomPlane({ imageURL, id, scroll, index, ...props }) {
  const [hovered, setHovered] = useState(false)
  const texture = useTexture(imageURL)
  const planeRef = useRef()
  useCursor(hovered)
  useEffect(() => {
    gsap.to(planeRef.current.scale, {
      x: hovered ? 1.3 : 1.1,
      y: hovered ? 1.3 : 1.1,
      duration: 0.5,
      ease: "power4.inOut",
    })
  }, [hovered])

  return (
    <Float
      onClick={() => {
        handleScrollDown(`#id_${id}`, 1)
      }}
      onPointerEnter={() => {
        setHovered(true)
      }}
      onPointerLeave={() => {
        setHovered(false)
      }}
      speed={0.5}
      rotationIntensity={0.1}
      floatIntensity={0.1}>
      <Plane args={[1, 1]} ref={planeRef} {...props}>
        <Float position={[1, 0, 0]} speed={0.5} rotationIntensity={0.5} floatIntensity={0.2}>
          <Text
            size={0.1}
            colors={
              hovered ? ["#fff600", "#ffffff", "#ffb600"] : ["#ffb600", "#ffb600", "#ffb600"]
            }
            rotation={[0, -0.3, 0]}
            children={(index + 1).toString()}
          />
        </Float>
        <meshBasicMaterial attach='material' map={texture} />
      </Plane>
    </Float>
  )
}

export default ProjectsPlanes
