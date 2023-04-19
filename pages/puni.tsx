import { NextPage } from "next";
import styles from '../styles/lens.module.css'
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three"
import { Canvas, MeshProps, ThreeElements, useFrame, useThree } from "@react-three/fiber";
import { DeviceOrientationControls } from 'three-stdlib';

const clamp = (x: number, min: number, max: number) => {
  return Math.min(Math.max(x, min), max)
}

const Box = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>(null)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => { if (mesh.current) mesh.current.rotation.x += delta})
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const Portal = (props: {width: number, height: number}) => {
  // const [camera] = useState(new THREE.PerspectiveCamera())

  return (
    <Box />
  )
}

const InteractionManager = () => {
  const { size } = useThree()

  const { width, height } = useMemo(
    () =>
      size.width > size.height
        ? {
            width: 1,
            height: size.height / size.width
          }
        : {
            width: size.width / size.height,
            height: 1
          },
    [size]
  )

  const rotation = useRef<DeviceOrientationControls>()
  const betaRef = useRef<number>()
  const gammaRef = useRef<number>()

  useEffect(() => {
    rotation.current = new DeviceOrientationControls(new THREE.PerspectiveCamera())
  }, [])

  useFrame(({ camera }) => {
    if (!rotation.current) return

    rotation.current.update()

    if (!rotation.current?.deviceOrientation) return

    const { beta, gamma } = rotation.current.deviceOrientation

    if (!beta || !gamma) return

    betaRef.current = clamp(beta, -45 * height, 45 * height)
    gammaRef.current = clamp(gamma, -45 * width, 45 * width)

    camera.lookAt(0, 0, 0)

    camera.position.x = -gammaRef.current / 90
    camera.position.y = betaRef.current / 90
    camera.position.z = 1 - 0.5 * Math.min(Math.abs(camera.position.x) + Math.abs(camera.position.y), 1)
  })

  return (<>
    <Portal width={width} height={height}/>
  </>)
}

const Puni: NextPage = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sizeRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0))
  const [dpr, setDpr] = useState(0)

  useEffect(() => {
    sizeRef.current = new THREE.Vector2(
      mountRef.current?.getBoundingClientRect().width || 0,
      mountRef.current?.getBoundingClientRect().height || 0
    )
    setDpr(window.devicePixelRatio)
  }, [])

  return (
    <div className={styles.container} ref={mountRef}>
      <Canvas
        camera={{
          position: [0, 0, 1], far: 100, near: 0.1,
        }}
        dpr={dpr}
        shadows
      >
        <color attach="background" args={['#ffffff']} />
        {/* <Box /> */}
        <InteractionManager />
      </Canvas>
    </div>
  )
}

export default Puni
