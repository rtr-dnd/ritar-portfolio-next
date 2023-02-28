import { Html, OrbitControls, useAnimations, useAspect, useGLTF, useProgress, useVideoTexture } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { NextPage } from "next"
import { forwardRef, MutableRefObject, RefObject, Suspense, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { DirectionalLight, PerspectiveCamera } from "three"
import styles from '../styles/choco.module.css'

interface ModelProps {
  progress: number
}
interface Handler {
  playCamera(): void
  pauseCamera(): void
  resetCamera(): void
}

// eslint-disable-next-line react/display-name
const Scene = forwardRef<Handler, ModelProps>((props: ModelProps, ref) => {
  const gltf = useGLTF("/choco/choco.glb")
  const mixer = useMemo(() => new THREE.AnimationMixer(gltf.scene), [gltf.scene])
  const clock = useMemo(() => new THREE.Clock(), [])
  const { set } = useThree()
  useFrame(() => mixer.update(clock.getDelta()))
  const action = useRef<THREE.AnimationAction>()

  useImperativeHandle(ref, () => ({
    playCamera: () => {
      action.current?.play()
    },
    pauseCamera: () => {
      action.current?.stop()
    },
    resetCamera: () => {
      if (action.current) action.current.time = 0
    }
  }))

  // bg video
  const texture = useVideoTexture("/choco/choco.mp4", { muted: true, start: true, loop: true })
  const scale = useAspect(
    1024,                     // Pixel-width
    512,                      // Pixel-height
    1                         // Optional scaling factor
  )

  useEffect(() => {
    set({ camera: gltf.cameras[0] as PerspectiveCamera })

    action.current = mixer.clipAction(gltf.animations[0])
    action.current.setLoop(THREE.LoopRepeat, Infinity)
  }, [gltf, mixer, set, ref])

  return (
    <Suspense fallback={<Html center>{props.progress} % loaded</Html>}>
      <directionalLight
        color={"#ffffff"}
      />
      <primitive object={gltf.scene} />
      {/* <mesh scale={scale}>
        <planeGeometry />
        <meshBasicMaterial map={texture} />
      </mesh> */}
    </Suspense>
  )
})

const Choco: NextPage = () => {
  const [dpr, setDpr] = useState(0)
  const { progress } = useProgress()
  const [mounted, setMounted] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const animeRef = useRef<Handler>(null)

  useEffect(() => {
    setMounted(true)
    setDpr(window.devicePixelRatio)

    setTimeout(() => {
      videoRef.current?.play()
      animeRef.current?.playCamera()
      setInterval(() => {
        if (!videoRef.current) return
        if (!animeRef.current) return

        videoRef.current.pause()
        videoRef.current.currentTime = 0
        animeRef.current.pauseCamera()
        animeRef.current.resetCamera()

        videoRef.current.play()
        animeRef.current.playCamera()
      }, 10000)
    }, 1000)
  }, [])

  return (
    <div className={styles.container}>
      {mounted && <video
        ref={videoRef}
        className={styles.absolute}
        src="/choco/choco.mp4"
        muted loop playsInline
      />}
      <Canvas
        className={styles.absolute}
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 0, 5],
        }}
        dpr={dpr}
        shadows
      >
        {/* <color attach="background" /> */}
        <Scene progress={0} ref={animeRef}/>
      </Canvas>
    </div>
  )
}

export default Choco
