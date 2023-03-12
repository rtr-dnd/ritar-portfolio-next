import Image from 'next/future/image'
import { useEffect, useRef } from 'react';
import { Content } from "../../contents/contents";

export const ImageOrVideo = (props: { e: Content }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (!props.e.isVideo) return;
    videoRef.current?.load()
  }, [props.e])
  return props.e.img
  ? (
    props.e.isVideo
      ? <video ref={videoRef} loop muted autoPlay playsInline>
        <source src={props.e.img} type="video/webm" />
        <source src={props.e.img2} type='video/mp4' />
      </video>
      : <Image src={props.e.img} alt='description image' priority={true} />
  )
  : <div></div>  
}
