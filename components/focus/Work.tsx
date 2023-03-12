import Image from 'next/future/image'
import { useDispatch, useSelector } from 'react-redux'
import { Content } from "../../contents/contents"
import { AppDispatch, RootState } from '../../store'
import { asyncFocus, asyncSwap, setDrawer, setItem } from '../../store/focus'
import { ImageOrVideo } from './ImageOrVideo'
import { ListImageLayer } from './Layers'
import styles from './Work.module.css'

export const Work = (props: { e: Content }) => {
  const dispatch = useDispatch<AppDispatch>()
  const isOpen = useSelector((state: RootState) => state.focus.isItemOpen)
  const openItem = () => {
    if (isOpen) {
      dispatch(asyncSwap(props.e))
    } else {
      dispatch(setItem(props.e))
      dispatch(setDrawer(true))
      dispatch(asyncFocus(0))
    }
  }
  
  return <section className={styles.work} key={props.e.title} onClick={e => openItem()}>
    <div className={styles.text}>
      <h3 className={styles.h3}>
        {props.e.title}
      </h3>
      <p className={styles.desc}>{props.e.desc_short}</p>
    </div>
    <div className={styles.imgwrap}>
      <ListImageLayer>
        <ImageOrVideo e={props.e} />
      </ListImageLayer>
    </div>
  </section>
}
