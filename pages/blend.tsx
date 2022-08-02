import Image from 'next/future/image'
import { NextPage } from "next"
import styles from '../styles/blend.module.css'
import { useEffect, useRef, useState, WheelEventHandler } from 'react'
import Head from 'next/head'

const getWindowDimensions = () => {
  if (typeof window == 'undefined') return
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  }
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


const Content = () => {
  return (
    <div className={styles.contentwrap}>
      <Image className={styles.image} src="/blend/blend_1.jpg" alt="bg" priority/>
      <h1 className={styles.title}>
        <span>HONGO</span>
        <span>DESIGN</span>
        <span>DAY</span>
      </h1>
      <Image className={styles.image} src="/blend/blend_2.jpg" alt="bg" priority/>
      <Image className={styles.image} src="/blend/blend_3.jpg" alt="bg" priority/>
      <Image className={styles.image} src="/blend/blend_4.jpg" alt="bg" priority/>
      <Image className={styles.image} src="/blend/blend_5.jpg" alt="bg" priority/>
      <div className={styles.desc}>
        <span>at <a className={styles.link} href='https://lab-cafe.net/'>LabCafe</a></span>
        <span>from 7:30 pm on every tuesday</span>
      </div>
      <Image className={styles.image} src="/blend/blend_6.jpg" alt="bg" priority/>
      <Image className={styles.image} src="/blend/blend_7.jpg" alt="bg" priority/>
      <Image className={styles.image} src="/blend/blend_8.jpg" alt="bg" priority/>
      <div className={styles.foot}>
        <a className={styles.link} href='http://designingplusnine.com/'>
          <Image className={styles.footlogo} src="/dp9.svg" alt="bg" priority/>
        </a>
      </div>
    </div>
  )
}

const Blend: NextPage = () => {
  const scrollGain = 1
  const [scrollTop, setScrollTop] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const dimensions = useWindowDimensions()
  const {height, width} = dimensions ? dimensions : {width: 0, height: 0}
  const [header, setHeader] = useState<string>('SCROLL DOWN')
  const [lastTouchVal, setLastTouchVal] = useState<number>(0)

  const onScroll = (y: number) => {
    const val = scrollTop + y * scrollGain
    if (val < 0) return
    if (!contentRef.current?.clientHeight) return
    if (val > contentRef.current?.clientHeight - height) return
    if (val < 5) {
      setHeader('SCROLL DOWN')
    } else {
      setHeader('HONGO DESIGN DAY')
    }
    setScrollTop(val)
  }

  const onWheel = (e: WheelEvent) => {
    e.preventDefault()
    onScroll(e.deltaY)
  }

  useEffect(() => {
    ref.current?.addEventListener("wheel", onWheel, {passive: false})
    return (() => {
      ref.current?.removeEventListener("wheel", onWheel)
    })
  })

  return (
    <div className={styles.container} ref={ref} onTouchStart={(e) => {
      setLastTouchVal(e.targetTouches[0].pageY)
    }} onTouchMove={(e) => {
      onScroll(lastTouchVal - e.targetTouches[0].pageY)
      setLastTouchVal(e.targetTouches[0].pageY)
    }} onTouchEnd={(e) => {
      setLastTouchVal(0)
    }}>
      <Head>
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)"></meta>
        <title>HONGO DESIGN DAY</title>
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="HONGO DESIGN DAY"
        />
      </Head>
      {/* <Content isFlipped={false}/>
      <Content isFlipped={true}/> */}
      <div className={styles.fixedcontent}>
        <div className={styles.logo}>{header}</div>
      </div>
      <div className={styles.flippedfixedcontent}>
        <div className={styles.logo}>{header}</div>
      </div>
      <div className={styles.content} ref={contentRef} style={{
        marginTop: scrollTop * -1 + 'px'
      }}>
        <Content />
      </div>
      <div className={styles.content + ' ' + styles.flipped} style={{
        bottom: scrollTop * -1 + 'px'
      }}>
        <Content />
      </div>
    </div>
  )
}

export default Blend