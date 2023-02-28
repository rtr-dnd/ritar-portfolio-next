import { UIEvent, useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import Image from 'next/future/image'
import Head from "next/head";
import Link from "next/link";
import styles from '../styles/index.module.css'
import { Page, pages } from '../contents/pages'

const sketch: {title: string, path: string} [] = [
  {
    title: "Blend",
    path: "blend"
  },
  {
    title: "Lens 1",
    path: "lens3"
  },
  {
    title: "Lens 2",
    path: "lens2"
  },
  {
    title: "Lens 3",
    path: "lens"
  },
]

const Card = (page: Page) => {
  const [lastY, setLastY] = useState(0)
  const [roundness, setRoundness] = useState(0)

  const handleScroll = useCallback(() => {
    if (window.scrollY < 10 || window.scrollY + window.innerHeight >= document.body.offsetHeight - 10) {
      setRoundness(4)
    } else {
      setRoundness(Math.abs(window.scrollY - lastY) * 10)
    }
    setLastY(window.scrollY)
  }, [lastY])

  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener('scroll', handleScroll)
    }
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return <Link href={page.href} key={page.href}>
    <div className={styles.card}>
      <Image className={styles.cardimage} src={'/ogp/' + page.photoPath} alt={'preview image for ' + page.name + ' page'} style={{
        borderRadius: roundness + 'px'
      }}></Image>
      <p className={styles.carddesc}>
        {page.name} {page.onlyPC && <span className={styles.pconly}>PC Only</span>} {page.wip && <span className={styles.pconly}>WIP</span>}
      </p>
    </div>
  </Link>
}

const Index: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Top | works by ritar</title>
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Top | works by ritar"
        />
        <meta
          property="og:image"
          content={"https://ritar-portfolio.vercel.app/ogp/index.png"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="Top | works by ritar"
        />
        <meta
          name="twitter:image"
          content={"https://ritar-portfolio.vercel.app/ogp/index.png"}
        />
        <meta property="og:description" content="Portfolio of portfolios of works by ritar" />
      </Head>
      <div className={styles.containerinside}>
        <h1 className={styles.h1}>
          <p className={styles.title1}>works</p>
          <p className={styles.title1}>by</p>
          <p className={styles.title2}>ritar</p>
        </h1>
        <div className={styles.spacer}></div>
        <div className={styles.content}>
          {pages.map((p) => {
            return Card(p)
          })}
        </div>
        <div className={styles.spacer}></div>
        <div className={styles.sketches}>
          <p className={styles.sketchtitle}>Sketches</p>
          <div className={styles.sketchitems}>
            {sketch.map((e) => <Link href={e.path} key={e.path}>
              <a className={styles.sketch}>{e.title}</a>
            </Link>)}
          </div>
        </div>
        <div className={styles.spacer}></div>
        <div className={styles.footer}>
          <p className={styles.footertext}>
            ©2022, <Link href={'https://twitter.com/rtr_dnd'}><a className={styles.footerlink}>ritar</a></Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Index
