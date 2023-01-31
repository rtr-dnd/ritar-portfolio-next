import Image from 'next/future/image'
import styles from '../styles/reflection.module.css'
import { Content, works } from '../contents/contents'

const Work = (props: {e: Content}) => {
  return (
    <div className={styles.work}>
      <div className={styles.text}>
        <h3 className={styles.h3}> 
          <a className={styles.link} href={props.e.link}>
            {props.e.title}
          </a>
        </h3>
        <p className={styles.desc}>{props.e.desc}</p>
      </div>
      <div className={styles.imgwrap}>
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
      </div>
    </div>
  )
}

const Scenery = () => {
  return (
    <div className={styles.scenerycontainer}>
      <div className={styles.sceneryinner}>
        <h1 className={styles.h1}>こんにちは。</h1>
        <p>
          ritarと申します。<br />
          東京大学大学院 情報理工学系研究科 葛岡雨宮鳴海研究室に所属しています。<br />
        </p>
        <section className={styles.works}>
          <h2 className={styles.h2}>Works</h2>
          {works.map((e: Content) => {
            return <Work e={e} key={e.title}/>
          })}
        </section>
      </div>
    </div>
  )
}

const Reflection = () => {
  return (
    <div className={styles.container}>
      <div style={{
        clipPath: 'url(#clip1)'
      }}>
        <Scenery />
      </div>
      <svg className={styles.svg} width="462" height="263" viewBox="0 0 462 263" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <clipPath id="clip1" clipPathUnits="objectBoundingBox">
          <path d="M0.42405 0.705579C0.418745 0.671412 0.335502 0.561575 0.292297 0.511316C0.316295 0.494487 0.493097 0.205612 0.543402 0.00088501H0.999815V0.52892C0.817102 0.583924 0.446152 0.69626 0.42405 0.705579Z" fill="black"/>
        </clipPath>
      </svg>
    </div>
  )
}

export default Reflection