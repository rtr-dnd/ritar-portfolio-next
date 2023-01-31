import { NextPage } from "next";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree, useLoader } from "@react-three/fiber"
import styles from '../styles/lens.module.css'
import { EffectComposer, RenderPass, ShaderPass, SSAOPass, BokehPass } from 'three-stdlib'
import { Effects } from '@react-three/drei'
import * as THREE from "three"
import { Mesh } from "three"
import useMouse from '@react-hook/mouse-position'

import flower from '../public/lens/flower.jpg'

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

    console.log(flower.src)
  }, [])

  return (
    <div className={styles.container} ref={mountRef}>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 0, 5],
          // lookAt: [0, 0, 0]
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
  const PLANE_SIZE = 4.0
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
    <mesh ref={meshRef} rotation-x={Math.PI * 0.25}>
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

  const blurShader = {
    uniforms: {
      "tDiffuse": { value: null },
      "resolution": { value: new THREE.Vector2(size.width, size.height).multiplyScalar(window.devicePixelRatio) },
      "blurSize": { value: 100 },
      "focal": { value: new THREE.Vector2(size.width, size.height).multiplyScalar(window.devicePixelRatio) },
      "voxelResolution": new THREE.Uniform(new THREE.Vector2(10, 10))
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
    uniform float blurSize;
    uniform vec2 focal;
    uniform vec2 voxelResolution;

    varying vec2 vUv;

    const float PI2 = 6.28318530718; // Pi*2

    float blur_size_local () {
      vec2 voxelCenter = vec2(
        floor(vUv.x * voxelResolution.x) / voxelResolution.x,
        floor(vUv.y * voxelResolution.y) / voxelResolution.y
      );

      vec2 localFocal = vec2(
        focal.x / resolution.x,
        focal.y / resolution.y
      );

      // return = distance(voxelCenter, localFocal) * blurSize;
      return distance(voxelCenter, localFocal);
    }

    vec4 blur (sampler2D tex) {
      const float directions = 16.0; // BLUR DIRECTIONS (Default 16.0 - More is better but slower)
      const float quality = 3.0; // BLUR QUALITY (Default 3.0 - More is better but slower)

      vec2 radius = blur_size_local() * blurSize / resolution;

      vec2 uv = gl_FragCoord.xy/resolution;
      vec4 color = texture2D(tex, uv);

      // Blur calculations
      int count = 1;
      for( float theta=0.0; theta<PI2; theta+=PI2/directions)
      {
        vec2 dir = vec2(cos(theta), sin(theta)) * radius;
        for(float i=1.0/quality; i<=1.0; i+=1.0/quality)
        {
          color += texture2D( tex, uv+dir*i);	
          count++;
        }
      }
      color /= float(count);

      return color;
    }
    
    void main () {
      gl_FragColor = blur(tDiffuse);
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
        args={[blurShader]}
      />
    </Effects>
  )
}


export default Lens
