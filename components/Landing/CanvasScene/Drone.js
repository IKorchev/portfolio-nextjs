/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef, useState } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"
import * as THREE from "three"
import { useFrame, useThree } from "@react-three/fiber"
export default function Model(props) {
  const group = useRef()
  const drone = useRef()
  const { nodes, materials, animations } = useGLTF("/Drone.glb")
  const { actions, names } = useAnimations(animations, group)
  const [hovered, setHovered] = useState(false)
  const { mouse } = useThree()

  //prettier-ignore
  useFrame((_, dt) => {
    // //animate on mouse move
    drone.current.rotation.z = THREE.MathUtils.lerp(drone.current.rotation.z,(-mouse.x * Math.PI * 5) / 120,dt + 1)
  })

  const playAnimation = () => {
    names.forEach((name) => {
      //prettier-ignore
      actions[name]
      .setLoop(THREE.LoopPingPong, Infinity)
      .setDuration(5)
      .play()
    })
  }

  useEffect(() => {
    playAnimation()
  }, [])

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onPointerEnter={() => {
        setHovered(true)
      }}
      onPointerLeave={() => {
        setHovered(false)
      }}>
      <group name='Scene'>
        <group
          name='RobotR1'
          ref={drone}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2.5, Math.PI, 0]}
          scale={0.01}>
          <group name='Hand' position={[0, 16.74, 0]}>
            <group name='Gun1' position={[4.79, 0, 0]}>
              <group name='Boole_1_3' position={[27.54, 0, 0]}>
                <group name='Cube_11' position={[-45.61, -79.61, -116.87]} />
                <group name='Cylinder_1_9' position={[-49.18, -79.65, -120.13]}>
                  <group name='Cylinder_1_10' position={[0, 0, 10.29]} />
                </group>
                <mesh
                  name='Cube_10'
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube_10.geometry}
                  material={nodes.Cube_10.material}
                  position={[-45.61, -79.61, -116.87]}
                />
                <mesh
                  name='Cylinder_1_7'
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder_1_7.geometry}
                  material={nodes.Cylinder_1_7.material}
                  position={[-49.18, -79.65, -120.13]}>
                  <mesh
                    name='Cylinder_1_8'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_1_8.geometry}
                    material={nodes.Cylinder_1_8.material}
                    position={[0, 0, 10.29]}
                  />
                </mesh>
              </group>
              <group name='Gun1a' position={[57.44, 0, 0]}>
                <group name='Boole_2_3' position={[-139.52, -79.52, -120.29]}>
                  <group name='Cylinder_8' position={[8.25, -0.14, 0.16]} />
                  <group name='Cylinder_7' position={[37.43, -0.14, 0.16]}>
                    <group name='Cylinder_1_6' position={[-20.09, 0, 0]} />
                  </group>
                  <mesh
                    name='Cylinder_6'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_6.geometry}
                    material={nodes.Cylinder_6.material}
                    position={[8.25, -0.14, 0.16]}
                  />
                  <mesh
                    name='Cylinder_5'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_5.geometry}
                    material={nodes.Cylinder_5.material}
                    position={[37.43, -0.14, 0.16]}>
                    <mesh
                      name='Cylinder_1_5'
                      castShadow
                      receiveShadow
                      geometry={nodes.Cylinder_1_5.geometry}
                      material={nodes.Cylinder_1_5.material}
                      position={[-20.09, 0, 0]}
                    />
                  </mesh>
                </group>
              </group>
              <mesh
                name='Cube_9'
                castShadow
                receiveShadow
                geometry={nodes.Cube_9.geometry}
                material={nodes.Cube_9.material}
                position={[-21.46, -79.85, -129.31]}
                rotation={[0, 0.01, 0]}
              />
            </group>
            <group name='Boole_4' position={[234.83, 0, 0]}>
              <group name='Cube_1_6' position={[-220.28, -77.49, -68.06]} />
              <group
                name='Cube_1_7'
                position={[-196.41, -80.88, -66.41]}
                rotation={[-1.55, 0, 0]}>
                <group name='Cube_1_8' position={[0, 0, 4.34]} />
                <group name='Cube_1_9' position={[0, 0, -4.91]} />
              </group>
              <mesh
                name='Cube_1_2'
                castShadow
                receiveShadow
                geometry={nodes.Cube_1_2.geometry}
                material={nodes.Cube_1_2.material}
                position={[-220.28, -77.49, -68.06]}
              />
              <mesh
                name='Cube_1_3'
                castShadow
                receiveShadow
                geometry={nodes.Cube_1_3.geometry}
                material={nodes.Cube_1_3.material}
                position={[-196.41, -80.88, -66.41]}
                rotation={[-1.55, 0, 0]}>
                <mesh
                  name='Cube_1_4'
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube_1_4.geometry}
                  material={nodes.Cube_1_4.material}
                  position={[0, 0, 4.34]}
                />
                <mesh
                  name='Cube_1_5'
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube_1_5.geometry}
                  material={nodes.Cube_1_5.material}
                  position={[0, 0, -4.91]}
                />
              </mesh>
            </group>
            <mesh
              name='Sweep_NURBS_1_2'
              castShadow
              receiveShadow
              geometry={nodes.Sweep_NURBS_1_2.geometry}
              material={materials["Mat.7"]}
              position={[-48.4, -75.49, -66.91]}
              rotation={[0, 0, -0.05]}>
              <mesh
                name='Cap_1_3'
                castShadow
                receiveShadow
                geometry={nodes.Cap_1_3.geometry}
                material={nodes.Cap_1_3.material}
                position={[-9.58, -1.93, -36.63]}
                rotation={[Math.PI / 2, 0, -1.68]}
              />
              <mesh
                name='Cap_2_3'
                castShadow
                receiveShadow
                geometry={nodes.Cap_2_3.geometry}
                material={nodes.Cap_2_3.material}
                position={[49.12, -1.93, 7.05]}
                rotation={[Math.PI / 2, 0, 0.06]}
              />
              <group
                name='Circle_3'
                position={[-54.9, 43.38, 4.76]}
                rotation={[0, 0, -Math.PI / 2]}
              />
              <group name='Spline_3' position={[21.75, -1.93, -40.78]} />
            </mesh>
            <mesh
              name='Sweep_NURBS_2'
              castShadow
              receiveShadow
              geometry={nodes.Sweep_NURBS_2.geometry}
              material={nodes.Sweep_NURBS_2.material}
              position={[-48.4, -82, -66.91]}>
              <group
                name='Circle_4'
                position={[-54.9, 43.38, 4.76]}
                rotation={[0, 0, -Math.PI / 2]}
              />
              <group name='Spline_4' position={[21.75, -1.93, -40.78]} />
              <mesh
                name='Cap_1_4'
                castShadow
                receiveShadow
                geometry={nodes.Cap_1_4.geometry}
                material={nodes.Cap_1_4.material}
                position={[-9.58, -1.93, -36.63]}
                rotation={[Math.PI / 2, 0, -1.68]}
              />
              <mesh
                name='Cap_2_4'
                castShadow
                receiveShadow
                geometry={nodes.Cap_2_4.geometry}
                material={nodes.Cap_2_4.material}
                position={[49.12, -1.93, 7.05]}
                rotation={[Math.PI / 2, 0, 0.06]}
              />
            </mesh>
            <mesh
              name='Tube_1'
              castShadow
              receiveShadow
              geometry={nodes.Tube_1.geometry}
              material={nodes.Tube_1.material}
              position={[0, -89.72, -99.88]}>
              <group name='Boole_2_4' position={[0, 73.29, -7.39]}>
                <group name='Cube_13' position={[0, 39.22, 4.21]} />
                <group name='Sphere_7' position={[0, 0, 7.35]} />
                <mesh
                  name='Cube_12'
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube_12.geometry}
                  material={nodes.Cube_12.material}
                  position={[0, 39.22, 4.21]}
                />
                <mesh
                  name='Sphere_6'
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_6.geometry}
                  material={nodes.Sphere_6.material}
                  position={[0, 0, 7.35]}
                />
              </group>
            </mesh>
          </group>
          <group name='Hand2' position={[0, -22.78, 0]}>
            <group name='Gun2' position={[32.25, 0, 0]}>
              <group name='Gun2a' position={[22.22, 0, 0]}>
                <group name='Boole_2_2' position={[-131.91, 86.24, -120.29]}>
                  <group name='Cylinder_4' position={[8.25, -0.14, 0.16]} />
                  <group name='Cylinder_3' position={[37.43, -0.14, 0.16]}>
                    <group name='Cylinder_1_2' position={[-20.09, 0, 0]} />
                  </group>
                  <mesh
                    name='Cylinder_2'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder_2.geometry}
                    material={nodes.Cylinder_2.material}
                    position={[8.25, -0.14, 0.16]}
                  />
                  <mesh
                    name='Cylinder'
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder.geometry}
                    material={nodes.Cylinder.material}
                    position={[37.43, -0.14, 0.16]}>
                    <mesh
                      name='Cylinder_1'
                      castShadow
                      receiveShadow
                      geometry={nodes.Cylinder_1.geometry}
                      material={nodes.Cylinder_1.material}
                      position={[-20.09, 0, 0]}
                    />
                  </mesh>
                </group>
              </group>
              <group name='Boole_1' position={[0, 165.7, 0]}>
                <group
                  name='Cube_6'
                  position={[-45.61, -80.25, -116.87]}
                  rotation={[-3.14, 0, 0]}
                />
                <group name='Cylinder_1_4' position={[-68.09, -79.65, -120.13]} />
                <mesh
                  name='Cube_5'
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube_5.geometry}
                  material={nodes.Cube_5.material}
                  position={[-45.61, -80.25, -116.87]}
                  rotation={[-3.14, 0, 0]}
                />
                <mesh
                  name='Cylinder_1_3'
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder_1_3.geometry}
                  material={nodes.Cylinder_1_3.material}
                  position={[-68.09, -79.65, -120.13]}
                />
              </group>
              <mesh
                name='Cube_3_2'
                castShadow
                receiveShadow
                geometry={nodes.Cube_3_2.geometry}
                material={nodes.Cube_3_2.material}
                position={[-48.99, 86.06, -129.31]}
                rotation={[0, 0.01, 0]}
              />
            </group>
            <mesh
              name='Cube_1'
              castShadow
              receiveShadow
              geometry={nodes.Cube_1.geometry}
              material={nodes.Cube_1.material}
              position={[14.55, 84.56, -68.06]}
            />
            <mesh
              name='Sweep_NURBS'
              castShadow
              receiveShadow
              geometry={nodes.Sweep_NURBS.geometry}
              material={nodes.Sweep_NURBS.material}
              position={[-48.4, 87.82, -66.91]}>
              <group
                name='Circle_2'
                position={[-54.9, 43.38, 4.76]}
                rotation={[0, 0, -Math.PI / 2]}
              />
              <group name='Spline_2' position={[21.75, -1.93, -40.78]} />
              <mesh
                name='Cap_1_2'
                castShadow
                receiveShadow
                geometry={nodes.Cap_1_2.geometry}
                material={nodes.Cap_1_2.material}
                position={[-9.58, -1.93, -36.63]}
                rotation={[Math.PI / 2, 0, -1.68]}
              />
              <mesh
                name='Cap_2_2'
                castShadow
                receiveShadow
                geometry={nodes.Cap_2_2.geometry}
                material={nodes.Cap_2_2.material}
                position={[49.12, -1.93, 7.05]}
                rotation={[Math.PI / 2, 0, 0.06]}
              />
            </mesh>
            <mesh
              name='Sweep_NURBS_1'
              castShadow
              receiveShadow
              geometry={nodes.Sweep_NURBS_1.geometry}
              material={materials["Mat.4"]}
              position={[-48.39, 91.78, -66.91]}
              rotation={[0, 0, -0.05]}>
              <mesh
                name='Cap_1'
                castShadow
                receiveShadow
                geometry={nodes.Cap_1.geometry}
                material={nodes.Cap_1.material}
                position={[-9.58, -1.93, -36.63]}
                rotation={[Math.PI / 2, 0, -1.68]}
              />
              <mesh
                name='Cap_2'
                castShadow
                receiveShadow
                geometry={nodes.Cap_2.geometry}
                material={nodes.Cap_2.material}
                position={[49.12, -1.93, 7.05]}
                rotation={[Math.PI / 2, 0, 0.06]}
              />
              <group
                name='Circle'
                position={[-54.9, 43.38, 4.76]}
                rotation={[0, 0, -Math.PI / 2]}
              />
              <group name='Spline' position={[21.75, -1.93, -40.78]} />
            </mesh>
            <mesh
              name='Tube_4'
              castShadow
              receiveShadow
              geometry={nodes.Tube_4.geometry}
              material={nodes.Tube_4.material}
              position={[0, 95.37, -99.88]}>
              <group name='Boole_1_2' position={[0, -72.87, -7.39]}>
                <group name='Cube_8' position={[0, -31.15, 9.43]} />
                <group name='Sphere_5' position={[0, 0, 7.35]} />
                <mesh
                  name='Cube_7'
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube_7.geometry}
                  material={nodes.Cube_7.material}
                  position={[0, -31.15, 9.43]}
                />
                <mesh
                  name='Sphere_4'
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere_4.geometry}
                  material={nodes.Sphere_4.material}
                  position={[0, 0, 7.35]}
                />
              </group>
            </mesh>
          </group>
          <group name='Had' position={[0, 0, -100.07]} rotation={[0, -0.07, 0]}>
            <mesh
              name='Cube_2'
              castShadow
              receiveShadow
              geometry={nodes.Cube_2.geometry}
              material={nodes.Cube_2.material}
              position={[-39.59, -0.21, -76.48]}>
              <mesh
                name='Oil_Tank'
                castShadow
                receiveShadow
                geometry={nodes.Oil_Tank.geometry}
                material={materials["Mat.8"]}
                position={[-16.76, 5.65, 3.77]}
                rotation={[0, -1.57, 0]}
              />
              <mesh
                name='Oil_Tank_2'
                castShadow
                receiveShadow
                geometry={nodes.Oil_Tank_2.geometry}
                material={materials["Mat.6"]}
                position={[-21.37, -0.19, -4.91]}
                rotation={[0, -1.57, 0]}
              />
              <mesh
                name='Tube_2'
                castShadow
                receiveShadow
                geometry={nodes.Tube_2.geometry}
                material={nodes.Tube_2.material}
                position={[39.59, -5.3, 76.6]}
              />
              <mesh
                name='Tube_3'
                castShadow
                receiveShadow
                geometry={nodes.Tube_3.geometry}
                material={nodes.Tube_3.material}
                position={[39.59, 5.12, 76.6]}
              />
            </mesh>
          </group>
          <group name='Wheel' position={[0, 0, -99.93]}>
            <group name='Boole' position={[0, 0, -7.34]}>
              <group name='Boole_2' position={[0, 0, 100.66]}>
                <mesh
                  name='Sphere'
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere.geometry}
                  material={nodes.Sphere.material}
                  position={[0, 0, -93.31]}
                />
                <mesh
                  name='Tube'
                  castShadow
                  receiveShadow
                  geometry={nodes.Tube.geometry}
                  material={nodes.Tube.material}
                  position={[0, -0.3, -93.34]}
                />
              </group>
              <group name='Boole_3' position={[0, 0, 100.66]}>
                <group name='Sphere_2' position={[0, 0, -93.31]} />
                <group name='Sphere_3' position={[0, 0, -93.31]} />
                <group name='Tube_2_2' position={[0, -0.3, -93.34]} />
                <group name='Tube_3_2' position={[0, -0.3, -93.34]} />
              </group>
              <group name='Cube_3' position={[0, 85.86, 4.21]}>
                <group name='Cube_4' position={[0, -172.08, 0]} />
              </group>
              <mesh
                name='Cube'
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={nodes.Cube.material}
                position={[0, 85.86, 4.21]}>
                <mesh
                  name='Cube_2_2'
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube_2_2.geometry}
                  material={nodes.Cube_2_2.material}
                  position={[0, -172.08, 0]}
                />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("/Drone.glb")
