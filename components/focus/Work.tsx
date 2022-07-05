import Image from 'next/future/image'
import { Content } from "../../contents/contents"
import styles from './Work.module.css'
import { SecondLayer, ImageLayer } from './Layers'

export const Work = (props: {e: Content}) => {
  return <section className={styles.work} key={props.e.title}>
      <SecondLayer>
        <h3 className={styles.h3}> 
          <a className={styles.link} href={props.e.link}>
            {props.e.title}
          </a>
        </h3>
        <p className={styles.desc}>{props.e.desc}</p>
      </SecondLayer>
      <div className={styles.imgplaceholder}></div>
      <div className={styles.imgwrap}>
        <ImageLayer>
          {props.e.img
            ? (
              props.e.isVideo
              ? <video className={styles.img} loop muted autoPlay playsInline>
                  <source src={props.e.img} type="video/webm" />
                  <source src={props.e.img2} type='video/mp4' />
                </video>
              : <Image className={styles.img} src={props.e.img} alt='description image' priority={true}/>
            )
            : <div></div>
          }
        </ImageLayer>
      </div>
    </section>
}