import { NextPage } from "next";
import Image from 'next/future/image'
import styles from '../styles/rotation.module.css'
import { Content, works } from '../contents/contents'
import { title } from "process";
import React, { useState } from "react";
import Head from "next/head";
import useMedia from "use-media";

const headers: string[] = [
  'Greeting',
  ...(works.map(e => e.title)),
  'Footer',
]


const wheelRadius = 120

const WheelElement = (props: {titles: string[], activeIndex: number, style: React.CSSProperties}) => {
  const rotationAngle = 360 / props.titles.length
  return <div className={styles.wheel} style={props.style}>
    {props.titles.map((e, index) => {
      const thisRadian = ((rotationAngle) * index) * Math.PI / 180
      const sin = Math.sin(thisRadian)
      const cos = Math.cos(thisRadian)
      const deltaX = cos * wheelRadius
      const deltaY = sin * wheelRadius
      return (<div className={styles.wheeltitlewrap} key={index} style={{
        position: "absolute",
        top: 0,
        left: 0,
        whiteSpace: 'nowrap',
        transformOrigin: 'left center',
        transform: 'translateX(' + deltaX + 'px) '
        + 'translateY(' + deltaY + 'px) '
        + 'rotate(' + (rotationAngle * index) + 'deg)',
        color: index == props.activeIndex ? '#000' : 'rgba(0, 0, 0, 0.2)'
      }}>
        {(index >= 1 && index <= works.length) &&
          <p className={styles.wheelsubtitle}>Work</p>
        }
        <h2 className={styles.wheeltitle}>{e}</h2>
      </div>)
    })}
  </div>
}

const mod = (n: number, m: number) => {
  return ((n % m) + m) % m;
}

const Rotation: NextPage = () => {
  const rotationGain = 1
  const [rotation, setRotation] = useState(0)
  const isNarrow = useMedia({maxWidth: '720px'})
  const [lastTouchVal, setLastTouchVal] = useState([0, 0])

  const currentIndex = headers.length - 1 - Math.abs(Math.trunc((mod(rotation, 360) - (360 / headers.length / 2)) / (360 / headers.length)))

  return (
    <div className={styles.container} onWheel={(e) => {
      e.preventDefault()
      setRotation((isNarrow ? (rotation + e.deltaX) : (rotation - e.deltaY) * rotationGain))
    }} onTouchStart={(e) => {
      setLastTouchVal([e.targetTouches[0].pageX, e.targetTouches[0].pageY])
    }} onTouchMove={(e) => {
      e.preventDefault()
      setRotation((isNarrow
        ? (rotation + (lastTouchVal[0] - e.targetTouches[0].pageX))
        : (rotation - (lastTouchVal[1] - e.targetTouches[0].pageY)) * rotationGain))
      setLastTouchVal([e.targetTouches[0].pageX, e.targetTouches[0].pageY])
    }} onTouchEnd={(e) => {
      setLastTouchVal([0, 0])
    }}>
      <Head>
        <title>Rotation | works by ritar</title>
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Rotation | works by ritar"
        />
        <meta
          property="og:image"
          content={"https://ritar-portfolio.vercel.app/ogp_rotation.png"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="Rotation | works by ritar"
        />
        <meta
          name="twitter:image"
          content={"https://ritar-portfolio.vercel.app/ogp_rotation.png"}
        />
      </Head>
      <div className={styles.wheelwrap}>
        <WheelElement activeIndex={currentIndex} titles={headers} style={{
          transform: (isNarrow ? 'rotate(90deg) ' : '') + 'rotate(' + rotation + 'deg)'
        }}/>
      </div>
      <div className={styles.contentwrap}>
        <div className={styles.content} style={{visibility: currentIndex == 0 ? 'visible' : 'hidden'}}>
          <h2 className={styles.contenttitle}>こんにちは。</h2>
          <p className={styles.contentdesc}>
            ritarと申します。<br />
            東京大学大学院 情報理工学系研究科 葛岡雨宮鳴海研究室に所属しています。<br />
          </p>
        </div>
        {
          works.map((e: Content, index) => {
            return <a href={e.link} className={styles.content} key={e.title} style={{visibility: currentIndex - 1 == index ? 'visible' : 'hidden'}}>
            <h2 className={styles.contenttitle}>{e.title}</h2>
            <p className={styles.contentdesc}>{e.desc}</p>
            {e.img ? (
              e.isVideo
              ? <video className={styles.img} loop muted autoPlay playsInline>
                <source src={e.img} type="video/webm"/>
              </video>
              : <Image className={styles.img} src={e.img} alt='description image' priority={true} />
            )
          : <div></div>}
          </a> 
          })
        }
        <div className={styles.content} style={{visibility: currentIndex == works.length + 1 ? 'visible' : 'hidden'}}>
          <p className={styles.contentdesc}>©2021, ritar</p>
        </div>
      </div>
    </div>
  )
}

export default Rotation