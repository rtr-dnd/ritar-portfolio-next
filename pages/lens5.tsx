import { NextPage } from "next";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree, useLoader } from "@react-three/fiber"
import styles from '../styles/lens.module.css'
import { EffectComposer, RenderPass, ShaderPass, SSAOPass, BokehPass } from 'three-stdlib'
import { Effects } from '@react-three/drei'
import * as THREE from "three"
import { Mesh } from "three"
import useMouse from '@react-hook/mouse-position'

import flower from '../public/lens/flower_text.png'

extend({ EffectComposer, RenderPass, ShaderPass, SSAOPass, BokehPass })

const Lens: NextPage = () => {
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
          position: [0, 0, 1],
        }}
        dpr={dpr}
        shadows
      >
        <color attach="background" args={['#ffffff']} />
        <MeshComponent />
        <Composer rootRef={mountRef}/>
      </Canvas>
    </div>
  )
}

const MeshComponent = () => {
  const meshRef = useRef<Mesh>(null)
  const PLANE_SIZE = 2.0
  const tex = useLoader(THREE.TextureLoader, flower.src);
  const img = useLoader(THREE.ImageLoader, flower.src);

  const imageShader = `
    uniform vec2 uPlaneSize;
    uniform vec2 uImageSize;
    uniform sampler2D uTexture;
    
    varying vec2 vUv;

    float map(float value, float min1, float max1, float min2, float max2) {
      return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
    
    vec2 getCoverUv (vec2 uv, vec2 resolution, vec2 texResolution) {
      vec2 s = resolution; // Screen
      vec2 i = texResolution; // Image
      float rs = s.x / s.y;
      float ri = i.x / i.y;
      vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
      vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
      vec2 coverUv = uv * s / new + offset;
      return coverUv;
    }

    void main() {
      vec2 uv = vUv;
      vec2 coverUv = getCoverUv(uv, uPlaneSize, uImageSize);

      // apply image texture
      vec4 texture = texture2D(uTexture, coverUv);
      vec4 color = texture;

      gl_FragColor = color;
    }
  `
  const vertexShader = ` 
    varying vec2 vUv;
    void main() {
      // pass uv coords into fragment shader
      vUv = uv;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[PLANE_SIZE, PLANE_SIZE, 1, 1]}/>
      <shaderMaterial
        uniforms={{
          uPlaneSize: { value: new THREE.Vector2(PLANE_SIZE, PLANE_SIZE) },
          uImageSize: { value: new THREE.Vector2(img.width, img.height) },
          uTexture: { value: tex },
        }}
        vertexShader={vertexShader}
        fragmentShader={imageShader}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

const Composer = (props: {rootRef: RefObject<HTMLDivElement>}) => {
  const { size } = useThree();
  const passRef = useRef<any>(null)
  const mouse = useMouse(props.rootRef)

  const displacementShader = {
    uniforms: {
      "tDiffuse": { value: null },
      "resolution": { value: new THREE.Vector2(size.width, size.height).multiplyScalar(window.devicePixelRatio) },
      "displaceSize": { value: 1 },
      "focal": { value: new THREE.Vector2(size.width, size.height).multiplyScalar(window.devicePixelRatio) },
      "voxelResolution": new THREE.Uniform(new THREE.Vector2(8, 8))
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
    `,
    fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    uniform float displaceSize;
    uniform vec2 focal;
    uniform vec2 voxelResolution;

    varying vec2 vUv;

    float strip(float x) {
      float mousePos = focal.x / resolution.x;

      return clamp(mousePos + mod(x, 1./voxelResolution.x), 0.0, 1.0);
    }

    vec4 displace (sampler2D tex) {
      vec2 uv = gl_FragCoord.xy/resolution;
      vec2 local_uv = vec2(strip(uv.x), uv.y);

      vec4 color = texture2D(tex, local_uv);
      return color;
    }

    vec3 hsv2rgb(vec3 c)
    {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    vec3 rgb2hsv(vec3 c)
    {
      vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
      vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
      vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

      float d = q.x - min(q.w, q.y);
      float e = 1.0e-10;
      return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
    }

    float float_per_grid()
    {
      float stripCenter = floor(vUv.x * voxelResolution.x) / voxelResolution.x;
      float localFocal = focal.x / resolution.x;
      return pow(1. - distance(stripCenter, localFocal), 2.);
    }
    
    void main () {
      vec4 color = displace(tDiffuse);
      float mousePos = focal.x / resolution.x;
      vec3 hsvcolor = rgb2hsv(color.xyz);
      hsvcolor.y = hsvcolor.y * float_per_grid();
      gl_FragColor = vec4(hsv2rgb(hsvcolor), 1);
    }
    `
  }

  useFrame(() => {
    passRef.current.material.uniforms.focal.value = new THREE.Vector2(
      mouse.clientX || 0,
      mouse.clientY
        ? (props.rootRef.current?.getClientRects()[0].height || 0) - mouse.clientY
        : 0
    ).multiplyScalar(window.devicePixelRatio)
  })

  return (
    <Effects multisamping={8} renderIndex={1} disableGamma={false} disableRenderPass={false} disableRender={false}>
      <shaderPass
        ref={passRef}
        attach="passes-1"
        args={[displacementShader]}
      />
    </Effects>
  )
}


export default Lens
