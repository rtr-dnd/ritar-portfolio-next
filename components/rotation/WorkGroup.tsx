import Image from 'next/future/image'
import { Content, CategoryDesc } from "../../contents/contents"
import styles from './WorkGroup.module.css'

export const WorkGroup = (props: {category: CategoryDesc, contents: Content[], currentIndex: number, index: number}) => {
  return (
    <div className={styles.content} key={props.category.category} style={{
      visibility: props.currentIndex - 1 == props.index ? 'visible' : 'hidden',
      opacity: props.currentIndex - 1 == props.index ? '1' : '0'
    }}>
      {/* <p className={styles.categorydesc}>{props.category.descJa}</p> */}
      {props.contents.map((e: Content, index) => Work({e}))}
    </div>
  )
}

const Work = (props: {e: Content}) => {

  return (
    <a href={props.e.link} className={styles.work}>
      <h2 className={styles.contenttitle}>{props.e.title}</h2>
      <p className={styles.contentdesc}>{props.e.desc}</p>
      {props.e.img
      ? (
        props.e.isVideo
        ? <video className={styles.img} loop muted autoPlay playsInline>
          <source src={props.e.img} type="video/webm"/>
          <source src={props.e.img2} type="video/mp4" />
        </video>
        : <Image className={styles.img} src={props.e.img} alt='description image' priority={true} />
        )
      : <div></div>}
    </a>
  )
}