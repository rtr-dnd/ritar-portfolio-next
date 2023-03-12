import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Content } from "../../contents/contents"
import { AppDispatch, RootState } from '../../store'
import { asyncFocus, asyncSwap, setDrawer, setItem } from '../../store/focus'
import { ImageOrVideo } from './ImageOrVideo'
import { ListImageLayer } from './Layers'
import styles from './Work.module.css'

export const Work = (props: { e: Content }) => {
  const hasHover = window.matchMedia("(hover: hover)").matches
  const dispatch = useDispatch<AppDispatch>()
  const isOpen = useSelector((state: RootState) => state.focus.isItemOpen)
  const focusVal = useSelector((state: RootState) => state.focus.focusVal)
  const activeItem = useSelector((state: RootState) => state.focus.activeItem)

  const [flag, setFlag] = useState<boolean>(false) // if true, openItem can work
  useEffect(() => {
    if (focusVal == 0.5) { // item is tapped from outside
      dispatch(asyncFocus(0.5))
      setTimeout(() => {
        setFlag(true)
      }, 300)
    } else { // focus moved to other layer
      setFlag(false)
    }
  }, [focusVal, dispatch])

  const openItem = (v: number) => {
    if (!flag) return
    if (isOpen) {
      dispatch(asyncSwap(props.e))
    } else {
      dispatch(setItem(props.e))
      dispatch(setDrawer(true))
      dispatch(asyncFocus(0))
    }
  }
  
  return <section className={styles.work} key={props.e.title} onClick={e => openItem(focusVal)}>
    <div className={styles.text}>
      <h3 className={[styles.h3, (props.e == activeItem && isOpen) ? styles.active : ''].join(' ')}>
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
