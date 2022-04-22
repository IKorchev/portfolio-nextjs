import React, { useEffect, useRef } from "react"
import { useGLTF, useAnimations, Float } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { Vector3 } from "three"

export default function Model({ scroll, ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/Ship.glb")
  const { actions, names } = useAnimations(animations, group)
  const { mouse, viewport } = useThree()
  useFrame((_, delta) => {
    const posv = new Vector3(-viewport.width * 1, viewport.height * 1.5, -15)
    if (scroll.current) {
      group.current.position.y -= scroll.current * 0.1
      group.current.position.x += scroll.current * 0.1
    }
    group.current.position.lerp(posv, delta)
  })
  useEffect(() => {
    names.forEach((name) => actions[name].play().setDuration(25))
  }, [])
  const scale = (((viewport.width * 1.2) / viewport.height) * 4) / 3
  return (
    <group
      ref={group}
      {...props}
      scale={props.scale || 1 * Math.min(scale, 1.5)}
      dispose={null}>
      <group name='Scene'>
        <group name='Sketchfab_model' rotation={[-Math.PI / 2, 0, 0]} scale={0.21}>
          <group name='Root'>
            <group name='Star_Fighter'>
              <group name='Sphere001'>
                <mesh
                  name='Sphere001_0'
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere001_0.geometry}
                  material={nodes.Sphere001_0.material}
                />
              </group>
              <group name='Star_Fighter002'>
                <mesh
                  name='Star_Fighter002_0'
                  castShadow
                  receiveShadow
                  geometry={nodes.Star_Fighter002_0.geometry}
                  material={materials.Shield_1}
                />
              </group>
              <group name='Star_Fighter003' position={[-5.9, -3.39, -0.14]} scale={0}>
                <mesh
                  name='Star_Fighter003_0'
                  castShadow
                  receiveShadow
                  geometry={nodes.Star_Fighter003_0.geometry}
                  material={nodes.Star_Fighter003_0.material}
                />
              </group>
              <group name='Star_Fighter004' position={[-5.87, 3.4, -0.16]} scale={0}>
                <mesh
                  name='Star_Fighter004_0'
                  castShadow
                  receiveShadow
                  geometry={nodes.Star_Fighter004_0.geometry}
                  material={nodes.Star_Fighter004_0.material}
                />
              </group>
              <group name='Empty006' position={[3.24, 3.44, -0.13]}>
                <group name='Icosphere001' position={[0.21, 0.04, 0]}>
                  <mesh
                    name='Icosphere001_0'
                    castShadow
                    receiveShadow
                    geometry={nodes.Icosphere001_0.geometry}
                    material={nodes.Icosphere001_0.material}
                  />
                </group>
                <group name='Star_Fighter001'>
                  <mesh
                    name='Star_Fighter001_0'
                    castShadow
                    receiveShadow
                    geometry={nodes.Star_Fighter001_0.geometry}
                    material={nodes.Star_Fighter001_0.material}
                  />
                </group>
              </group>
              <group name='Empty007' position={[3.2, -3.44, -0.13]}>
                <group name='Icosphere' position={[0.25, 0, 0]}>
                  <mesh
                    name='Icosphere_0'
                    castShadow
                    receiveShadow
                    geometry={nodes.Icosphere_0.geometry}
                    material={nodes.Icosphere_0.material}
                  />
                </group>
                <group name='Star_Fighter005'>
                  <mesh
                    name='Star_Fighter005_0'
                    castShadow
                    receiveShadow
                    geometry={nodes.Star_Fighter005_0.geometry}
                    material={nodes.Star_Fighter005_0.material}
                  />
                </group>
              </group>
              <group
                name='Point002'
                position={[4.38, 3.42, -0.14]}
                rotation={[-0.07, 0.01, 1.56]}>
                <group name='Point001' />
              </group>
              <group
                name='Point003'
                position={[4.73, -3.45, -0.14]}
                rotation={[-0.07, 0.01, 1.56]}>
                <group name='Point004' />
              </group>
              <mesh
                name='Star_Fighter_0'
                castShadow
                receiveShadow
                geometry={nodes.Star_Fighter_0.geometry}
                material={materials.Star_Fighter}
              />
            </group>
            <group name='Hemi' position={[-13.39, 18.42, 8.4]} rotation={[-0.37, -0.71, 0.19]}>
              <group name='Hemi001' />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("/Ship.glb")
