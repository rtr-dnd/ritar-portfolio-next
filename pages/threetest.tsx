import * as THREE from 'three'
import { render } from 'react-dom'
import React, { useEffect, useRef, useMemo } from 'react'
import { Canvas, useThree, useFrame, extend } from '@react-three/fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { AdditiveBlendingShader } from '../components/lens/AdditiveBlendingShader'
import { VolumetricLightShader } from '../components/lens/VolumetricLightShader'
import { ThreeElements } from '@react-three/fiber'
import { NextPage } from 'next'

extend({ EffectComposer, RenderPass, ShaderPass })

const DEFAULT_LAYER = 0
const OCCLUSION_LAYER = 1

function Torusknot({ layer = DEFAULT_LAYER }) {
    const ref = useRef<THREE.Mesh>(null)
  // const Material = useMemo(() => `mesh${layer === DEFAULT_LAYER ? 'Physical' : 'Basic'}Material`, [layer])
  const color = useMemo(() => (layer === DEFAULT_LAYER ? '#873740' : '#070707'), [layer])
  useFrame(({ clock }) => {
    ref.current!.position!.x = Math.cos(clock.getElapsedTime()) * 1.5
    ref.current!.rotation!.x += 0.01
    ref.current!.rotation!.y += 0.01
    ref.current!.rotation!.z += 0.01
  })
  return (
    <mesh ref={ref} position={[0, 0, 2]} layers={layer} receiveShadow castShadow>
      <torusKnotGeometry attach="geometry" args={[0.5, 0.15, 150, 32]} />
      {/* <Material /> */}
      <meshPhysicalMaterial attach="material" color={color} roughness={1} clearcoat={1} clearcoatRoughness={0.2} />
    </mesh>
  )
}

function Effects() {
  const { gl, scene, camera, size } = useThree()
  const occlusionRenderTarget = useMemo(() => new THREE.WebGLRenderTarget(), [])
  const occlusionComposer = useRef<EffectComposer>(null)
  const composer = useRef<EffectComposer>(null)
  const light = useRef<THREE.Mesh>(null)

  useEffect(() => {
    occlusionComposer.current!.setSize(size.width, size.height)
    composer.current!.setSize(size.width, size.height)
  }, [size])

  useFrame(() => {
    console.log(composer.current)
    light.current!.rotation.z += 0.005
    camera.layers.set(OCCLUSION_LAYER)
    occlusionComposer.current!.render()
    camera.layers.set(DEFAULT_LAYER)
    composer.current!.render()
  }, 1)

  return (
    <>
      <mesh ref={light} layers={OCCLUSION_LAYER}>
        <boxGeometry attach="geometry" args={[0.5, 20, 1]} />
        <meshBasicMaterial attach="material" color="lightblue" />
      </mesh>
      <effectComposer ref={occlusionComposer} args={[gl, occlusionRenderTarget]} renderToScreen={false}>
        <renderPass attachArray="passes" args={[scene, camera]} />
        <shaderPass attachArray="passes" args={[VolumetricLightShader]} needsSwap={false} />
      </effectComposer>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" args={[scene, camera]} />
        <shaderPass attachArray="passes" args={[AdditiveBlendingShader]} uniforms-tAdd-value={occlusionRenderTarget.texture} />
        <shaderPass attachArray="passes" args={[FXAAShader]} uniforms-resolution-value={[1 / size.width, 1 / size.height]} renderToScreen />
      </effectComposer>
    </>
  )
}

const Threetest: NextPage = () => {
  return (
    <Canvas shadows>
      <ambientLight />
      <pointLight />
      <spotLight castShadow intensity={4} angle={Math.PI / 10} position={[10, 10, 10]} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <Torusknot />
      <Torusknot layer={OCCLUSION_LAYER} />
      <Effects />
    </Canvas>
  )
}

export default Threetest
