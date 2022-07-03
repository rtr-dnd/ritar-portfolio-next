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
      <ImageLayer>
        {props.e.img
          ? <Image className={styles.img} src={props.e.img} alt='description image' priority={true}/>
          : <div></div>
        }
      </ImageLayer>
    </section>
}