import Image from 'next/image'
import { Content } from "../contents/contents"
import styles from './Work.module.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

export const Work = (props: {e: Content}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  
  useEffect(() => {
    if (!process.browser) return
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.create({
      trigger: contentRef.current,
      start: 'top center',
      end: 'bottom center',
      toggleClass: {
        targets: imgRef.current,
        className: styles.active
      }
    })

  }, [])

  return <section className={styles.work} key={props.e.title} ref={contentRef}>
    <h3>{props.e.title}</h3>
    <a href={props.e.link}>[ Link ]</a>
    <p>{props.e.desc}</p>
    {props.e.img && 
      <div className={styles.img} ref={imgRef}>
        <Image src={props.e.img} alt='description image' layout='fill' objectFit='contain' priority={true}/>
      </div>
    }
  </section>
}