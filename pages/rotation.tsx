import { NextPage } from "next";
import Image from 'next/future/image'
import styles from '../styles/rotation.module.css'
import { Content, works, categoryDesc, CategoryDesc } from '../contents/contents'
import { title } from "process";
import React, { useState } from "react";
import Head from "next/head";
import useMedia from "use-media";
import { WorkGroup } from "../components/rotation/WorkGroup";

const headers: string[] = [
  'Greeting',
  ...(categoryDesc.map(e => e.titleJa)),
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
        {(index >= 1 && index <= categoryDesc.length) &&
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

  const [currentIndex, setCurrentIndex] = useState(0)
  const updateIndex = () => {
    setCurrentIndex(
      headers.length - 1 - Math.abs(Math.trunc((mod(rotation, 360) - (360 / headers.length / 2)) / (360 / headers.length)))
    )
  }

  return (
    <div className={styles.container} >
      <Head>
        <title>Rotation | works by ritar</title>
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Rotation | works by ritar"
        />
        <meta
          property="og:image"
          content={"https://ritar-portfolio.vercel.app/ogp/rotation.png"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="Rotation | works by ritar"
        />
        <meta
          name="twitter:image"
          content={"https://ritar-portfolio.vercel.app/ogp/rotation.png"}
        />
      </Head>
      <div className={styles.wheelwrap} onWheel={(e) => {
        setRotation((isNarrow ? (rotation + e.deltaX) : (rotation - e.deltaY) * rotationGain))
        updateIndex()
      }} onTouchStart={(e) => {
        setLastTouchVal([e.targetTouches[0].pageX, e.targetTouches[0].pageY])
      }} onTouchMove={(e) => {
        setRotation((isNarrow
          ? (rotation + (lastTouchVal[0] - e.targetTouches[0].pageX))
          : (rotation - (lastTouchVal[1] - e.targetTouches[0].pageY)) * rotationGain))
        updateIndex()
        setLastTouchVal([e.targetTouches[0].pageX, e.targetTouches[0].pageY])
      }} onTouchEnd={(e) => {
        setLastTouchVal([0, 0])
      }}>
        <WheelElement activeIndex={currentIndex} titles={headers} style={{
          transform: (isNarrow ? 'rotate(90deg) ' : '') + 'rotate(' + rotation + 'deg)'
        }}/>
      </div>
      <div className={styles.contentwrap}>
        <div className={styles.content} style={{
          visibility: currentIndex == 0 ? 'visible' : 'hidden',
          opacity: currentIndex == 0 ? '1' : '0'
        }}>
          <h2 className={styles.contenttitle}>こんにちは。</h2>
          <p className={styles.contentdesc}>
            ritarと申します。<br />
            東京大学大学院 情報理工学系研究科 葛岡雨宮鳴海研究室に所属しています。<br />
          </p>
        </div>
        {
          categoryDesc.map((e: CategoryDesc, index) => WorkGroup({
            category: e,
            contents: works.filter((element) => element.category == e.category),
            currentIndex: currentIndex,
            index: index
          }))
        }
        <div className={styles.content} style={{
          visibility: currentIndex == categoryDesc.length + 1 ? 'visible' : 'hidden',
          opacity: currentIndex == categoryDesc.length + 1 ? '1' : '0',
        }}>
          <p className={styles.contentdesc}>©2021, ritar</p>
        </div>
      </div>
    </div>
  )
}

export default Rotation