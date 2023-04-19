import { NextPage } from "next";
import Image from 'next/future/image'
import styles from '../styles/shadow.module.css'
import useMouse from "@react-hook/mouse-position";
import { useEffect, useRef, useState } from "react";

const Shadow: NextPage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const clipRef = useRef<HTMLDivElement>(null)
  const mouse = useMouse(ref)
  const [shadowPos, setShadowPos] = useState<{x: number, y: number}>({x: 0, y: 0})
  const [highlightPos, setHighlightPos] = useState<{x: number, y: number}>({x: 0, y: 0})
  const [distance, setDistance] = useState<number>(0)

  useEffect(() => {
    if (mouse.clientX == null
      || mouse.clientY == null
      || ref.current == null) return
    const w = ref.current.clientWidth
    const h = ref.current.clientHeight

    const vec = {
      x: mouse.clientX - w / 2,
      y: mouse.clientY - h / 2
    }
    const d = (vec.x ** 2 + vec.y ** 2) / ((w / 2) ** 2 + (h / 2) ** 2) // 0 ~ 1
    setShadowPos({
      x: -vec.x + w / 2,
      y: -vec.y + h / 2
    })
    setDistance(d)

    if (clipRef.current == null) return
    setHighlightPos({
      x: -(w / 2) + (clipRef.current.clientWidth / 2) + mouse.clientX,
      y: -(h / 2) + (clipRef.current.clientHeight / 2) + mouse.clientY
    })
  }, [mouse, mouse.clientX, mouse.clientY])

  return (
    <div className={styles.container} ref={ref}>
      {/* {mouse.clientX} <br />
      {mouse.clientY} <br />
      {highlightRef.current?.clientTop} <br />
      {highlightRef.current?.clientLeft} <br /> */}
      <Image height="96px" className={styles.button} src="/shadow/button.png" alt="button image"/>
      <div className={styles.clip} ref={clipRef}>
        <div className={styles.highlight}/>
        <Image className={styles.highlight} src="/shadow/circle.png" alt="light" style={{
          top: highlightPos.y,
          left: highlightPos.x,
        }} />
      </div>
      <Image className={styles.shadow} src="/shadow/button.png" alt="button image" style={{
        top: shadowPos.y,
        left: shadowPos.x,
        width: (260 + distance * 240) + 'px',
        filter: 'blur(' + (4 + distance * 16) + 'px)',
        opacity: 1 - (distance * 0.5)
      }}/>
      {/* <Image className={styles.highlightback} src="/shadow/circle.png" alt="light" style={{
        top: shadowPos.y,
        left: shadowPos.x,
        opacity: 0.2 - (distance * 0.2)
      }} /> */}
    </div>
  )
}

export default Shadow
