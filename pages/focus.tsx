import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { Content, works } from '../contents/contents'
import styles from '../styles/focus.module.css'
import { useParallax, ParallaxProvider } from 'react-scroll-parallax'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useDispatch } from 'react-redux'
import { focusSlice } from '../store/focus'
import { BgLayer, FirstLayer, SecondLayer, ImageLayer } from '../components/focus/Layers'

const Work = dynamic(async () => {
  const importedModule = await import('../components/focus/Work')
  return importedModule.Work
}, {ssr: false})

const InsideFocus = () => {
  return (
      <div className={styles.container}>
        <BgLayer>
          <div className={styles.bg}>
          </div>
        </BgLayer>

        <main className={styles.main}>
          <FirstLayer>
            <h1 className={styles.h1}>こんにちは。</h1>
          </FirstLayer>
          <SecondLayer>
            <p>
              ritarと申します。<br />
              東京大学大学院 情報理工学系研究科 葛岡雨宮鳴海研究室に所属しています。<br />
            </p>
          </SecondLayer>

          <section className={styles.works}>
            <FirstLayer>
              <h2 className={styles.h2}>Works</h2>
            </FirstLayer>
            {works.map((e: Content) => {
              return <Work e={e} key={e.title}/>
            })}
          </section>

          <footer className={styles.footer}>
            <FirstLayer>
              <p>©2021, ritar</p>
            </FirstLayer>
          </footer>
        </main>
      </div>
    )    
}

const Focus: NextPage = () => {
  return (
    <ParallaxProvider>
      <Head>
        <title>Focus | works by ritar</title>
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Focus | works by ritar"
        />
        <meta
          property="og:image"
          content={"https://ritar-portfolio.vercel.app/ogp_focus.png"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="Focus | works by ritar"
        />
        <meta
          name="twitter:image"
          content={"https://ritar-portfolio.vercel.app/ogp_focus.png"}
        />
      </Head>
      <InsideFocus />
    </ParallaxProvider>
  )
}

export default Focus