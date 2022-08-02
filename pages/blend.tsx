import Image from 'next/future/image'
import { NextPage } from "next"
import styles from '../styles/blend.module.css'
import { useRef, useState } from 'react'
import Head from 'next/head'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync'

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
  const ref = useRef<HTMLDivElement>(null)
  const [header, setHeader] = useState<string>('SCROLL DOWN')

  return (
    <ScrollSync>
      <div className={styles.container} ref={ref}>
        <Head>
          <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)"></meta>
          <title>HONGO DESIGN DAY</title>
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="HONGO DESIGN DAY"
          />
        </Head>
        <div className={styles.fixedcontent}>
          <div className={styles.logo}>{header}</div>
        </div>
        <div className={styles.flippedfixedcontent}>
          <div className={styles.logo}>{header}</div>
        </div>

        <ScrollSyncPane>
          <div className={styles.content} onScroll={(e) => {
            if (e.currentTarget.scrollTop < 5) {
              setHeader('SCROLL DOWN')
            } else {
              setHeader('HONGO DESIGN DAY')
            }
          }}>
            <Content />
          </div>
        </ScrollSyncPane>
        <ScrollSyncPane>
          <div className={styles.content + ' ' + styles.flipped}>
            <Content />
          </div>
        </ScrollSyncPane>
      </div>
    </ScrollSync>
  )
}

export default Blend