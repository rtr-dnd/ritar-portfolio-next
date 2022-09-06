import { NextPage } from "next";
import Image from 'next/future/image'
import Head from "next/head";
import Link from "next/link";
import styles from '../styles/index.module.css'
import { Page, pages } from './pages'

const Card = (page: Page) => {
  return <Link href={page.href}>
    <div className={styles.card}>
      <Image className={styles.cardimage} src={'/ogp/' + page.photoPath} alt={'preview image for ' + page.name + ' page'}></Image>
      <p className={styles.carddesc}>
        {page.name}
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