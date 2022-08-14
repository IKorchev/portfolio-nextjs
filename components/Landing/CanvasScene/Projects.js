import { Float, Plane, useCursor, useTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { handleScrollDown } from '../../../utils/animations'
import Text from './CustomText'

const ProjectsPlanes = ({ data, scroll, ...props }) => {
  const projectsGroupRef = useRef()
  const { height } = useThree((state) => state.viewport)
  const [hoveredElement, setHoveredElement] = useState(null)

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
      <Float position={[0, data.length * 1 + 0.1, 0]} speed={0.5} rotationIntensity={0.5} floatIntensity={0.2}>
        <Text size={0.1} rotation={[0, -0.2, 0]} children='Projects' />
      </Float>

      {data.map((project, index) => {
        const { projectImage } = project
        const imageURL = `https:${projectImage.fields.file.url}` //contentful formats the url without the protocol
        return (
          <CustomPlane
            hoveredElement={hoveredElement}
            setElementHovered={setHoveredElement}
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

function CustomPlane({ hoveredElement, setHoveredElement, imageURL, id, scroll, index, setElementHovered, ...props }) {
  const texture = useTexture(imageURL)
  const planeRef = useRef()
  useCursor(hoveredElement === index)

  useEffect(() => {
    gsap.to(planeRef.current.scale, {
      x: hoveredElement === index ? 1.3 : 1.1,
      y: hoveredElement === index ? 1.3 : 1.1,
      duration: 0.5,
      ease: 'power4.inOut',
    })

    gsap.to(planeRef.current.position, {
      y: index - 1 === hoveredElement ? planeRef.current.position.y - 1 : index + 1 === hoveredElement ? planeRef.current.position.y + 1 : planeRef.current.position.y,
      duration: 0.5,
      ease: 'power4.inOut',
    })
  }, [hoveredElement])

  return (
    <Float
      onClick={() => handleScrollDown(`#id_${id}`, 1)}
      onPointerEnter={() => setElementHovered(index)}
      onPointerLeave={() => setElementHovered(null)}
      speed={0.5}
      rotationIntensity={0.1}
      floatIntensity={0.1}>
      <Plane args={[1, 1]} ref={planeRef} {...props}>
        <Float position={[1, 0, 0]} speed={0.5} rotationIntensity={0.5} floatIntensity={0.2}>
          <Text
            size={0.1}
            colors={hoveredElement === index ? ['#fff600', '#ffffff', '#ffb600'] : ['#ffb600', '#ffb600', '#ffb600']}
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
