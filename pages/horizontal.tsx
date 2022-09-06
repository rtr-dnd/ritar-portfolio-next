import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { Content, works } from '../contents/contents'
import styles from '../styles/horizontal.module.css'

const Work = dynamic(async () => {
  const importedModule = await import('../components/horizontal/Work')
  return importedModule.Work
}, {ssr: false})

const Horizontal: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Horizontal | works by ritar</title>
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Horizontal | works by ritar"
        />
        <meta
          property="og:image"
          content={"https://ritar-portfolio.vercel.app/ogp/horizontal.png"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="Horizontal | works by ritar"
        />
        <meta
          name="twitter:image"
          content={"https://ritar-portfolio.vercel.app/ogp/horizontal.png"}
        />
        <meta property="og:description" content="A portfolio of works by ritar" />
      </Head>

      <main>
        <div className={styles.first}>
          <div className={styles.headlines}>
            <h1>
              こんにちは。
            </h1>
            <p>[ Languages: ja / <Link href='/'>en</Link> ]</p>
            <p>
              ritarと申します。<br />
              東京大学大学院 情報理工学系研究科 葛岡雨宮鳴海研究室に所属しています。<br />
            </p>
          </div>
        </div>

        <section className={styles.works}>
          <div className={styles.divider}></div>
          <h2>Works</h2>
          {works.map((e: Content) => {
            return <div className={styles.workwrapper} key={e.title}>
              <Work e={e} />
            </div>
          })}
        </section>
      </main>

      <footer className={styles.footer}>
          <p>©2021, ritar</p>
      </footer>
    </div>
  )
}

export default Horizontal
