import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { categoryDesc, Content, works } from '../contents/contents'
import styles from '../styles/focus.module.css'
import { ParallaxProvider } from 'react-scroll-parallax'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { HeadingLayer, ItemLayer, ListImageLayer, ListLayer } from '../components/focus/Layers'

const Work = dynamic(async () => {
  const importedModule = await import('../components/focus/Work')
  return importedModule.Work
}, {ssr: false})

const WorkItem = dynamic(async () => {
  const importedModule = await import('../components/focus/WorkItem')
  return importedModule.WorkItem
}, {ssr: false})

const InsideFocus = () => {
  const focusVal = useSelector((state: RootState) => state.focus.focusVal)
  return (
      <div className={styles.container} style={{
        background: 'rgba(0, 0, 0, ' + ((1 - focusVal) / 10) + ')'
      }}>
        <ItemLayer>
          <WorkItem />
        </ItemLayer>
        <main className={styles.main}>
          <HeadingLayer>
            <h1 className={styles.h1}>Greetings</h1>
          </HeadingLayer>
          <ListLayer>
            <p className={styles.greetings}>
              こんにちは。ritarと申します。<br />
              東京大学大学院 情報理工学系研究科 葛岡雨宮鳴海研究室に所属しています。<br />
            </p>
          </ListLayer>

          {categoryDesc.map(e => {
            return <section className={styles.works} key={e.titleJa}>
              <HeadingLayer>
                <p className={styles.subtitle}>Work</p>
                <h1 className={styles.h1}>{e.titleEn}</h1>
              </HeadingLayer>
              <ListLayer>
                {works.filter((element) => element.category == e.category).map((element: Content) => {
                  return <>
                    <ListImageLayer key={element.title + 'image'}>
                      <div className={styles.divider}></div>
                    </ListImageLayer>
                    <Work e={element} key={element.title + 'work'}/>
                  </>
                })}
              </ListLayer>
            </section>
          })}
          <footer className={styles.footer}>
            <HeadingLayer>
              <h1 className={styles.h1}>Footer</h1>
            </HeadingLayer>
            <ListLayer>
              <p>©2023, ritar</p>
            </ListLayer>
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
          content={"https://ritar-portfolio.vercel.app/ogp/focus.png"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="Focus | works by ritar"
        />
        <meta
          name="twitter:image"
          content={"https://ritar-portfolio.vercel.app/ogp/focus.png"}
        />
        <meta property="og:description" content="A portfolio of works by ritar" />
      </Head>
      <InsideFocus />
    </ParallaxProvider>
  )
}

export default Focus
