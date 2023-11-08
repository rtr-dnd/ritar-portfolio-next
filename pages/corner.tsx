import { NextPage } from "next"
import styles from '../styles/corner.module.css'
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import useMouse from "@react-hook/mouse-position"
import Image from "next/image"

const Corner: NextPage = () => {
  const ref = useRef(null)
  const mouse = useMouse(ref)
  const cornerPadding = 12
  const cornerLocation = 200
  const cornerSize = 100
  const [cardTop, setCardTop] = useState<number | null>(0)
  const [cardLeft, setCardLeft] = useState<number | null>(0)
  // 0: no corner processing
  // 1: is in pocket area but no visual feedback yet
  // 2: corner comes front, card position could be altered
  const [cornerState, setCornerState] = useState<number>(0)

  useEffect(() => {
    const inAroundPocketArea = (
      mouse.clientX && mouse.clientY
      && mouse.clientX > cornerLocation
      && mouse.clientX < cornerLocation - cornerPadding + cornerSize
      && mouse.clientY > cornerLocation
      && mouse.clientY < cornerLocation - cornerPadding + cornerSize
    )
    const inPocketArea = (
      mouse.clientX && mouse.clientY && inAroundPocketArea
      && mouse.clientY - cornerLocation + cornerPadding
        > -(mouse.clientX - cornerLocation + cornerPadding) + cornerSize - (cornerPadding * Math.pow(2, 0.5))
    )
    console.log(inAroundPocketArea, inPocketArea, cornerState)

    let newCornerState = cornerState
    switch(cornerState)
    {
      case 0: 
        if (inPocketArea) newCornerState = 1
        break
      case 1:
        if (!inAroundPocketArea) newCornerState = 0
        if (inAroundPocketArea && !inPocketArea) newCornerState = 2
        break
      case 2:
        if (inPocketArea) newCornerState = 1
        if (
          mouse.clientX && mouse.clientY && (
            mouse.clientX > cornerLocation - cornerPadding + cornerSize
            || mouse.clientY > cornerLocation - cornerPadding + cornerSize
          )
        ) newCornerState = 0
        break
    }
    setCornerState(newCornerState)
    if (mouse.y == null || mouse.x == null) return
    setCardTop(newCornerState == 2 && mouse.y < cornerLocation ? cornerLocation : mouse.y)
    setCardLeft(newCornerState == 2 &&  mouse.x < cornerLocation ? cornerLocation : mouse.x)
  }, [mouse, mouse.clientX, mouse.clientY, cornerState])

  return (
    <div className={styles.container} ref={ref}>
      <Head>
        <title>Corner | works by ritar</title>
      </Head>
      <main>
        <div className={styles.card} style={{
          top: cardTop + 'px',
          left: cardLeft + 'px'
        }}>
          <h1>Corner pocket</h1>
          <p>Bring me to the corner!</p>
        </div>
        <img className={styles.cornerimage} src="/corner/corner.png" alt="corner" style={{
          top: cornerLocation - cornerPadding + 'px',
          left: cornerLocation - cornerPadding + 'px',
          zIndex: cornerState == 1 || cornerState == 2 ? 99 : 0
        }}/>
      </main>
    </div>
  )
}

export default Corner
