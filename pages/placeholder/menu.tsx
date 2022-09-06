import { NextPage } from "next";
import Image from 'next/future/image'
import useMouse from '@react-hook/mouse-position'
import styles from '../../styles/placeholder/placeholder.module.css'
import menuStyles from '../../styles/placeholder/menu.module.css'
import { RefObject, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { changeTarget, Vec2 } from "../../store/placeholder";
import { categoryDesc } from "../../contents/contents"
import router from "next/router";

const PlaceholderMenu: NextPage = () => {
  const ref = useRef(null)
  const mouse = useMouse(ref)
  const backRef = useRef<HTMLImageElement>(null)
  const categoryRefs = useRef<Array<HTMLImageElement | null>>([])

  const targets = useSelector((state: RootState) => state.placeholder.target)
  const dispatch = useDispatch()

  useEffect(() => {
    categoryRefs.current = categoryRefs.current.slice(0, categoryDesc.length)
  }, [categoryDesc])

  const addRef = (targets: Vec2[], current: HTMLImageElement) => {
    const rect = current.getClientRects()[0]
    const x = rect ? (rect.left + rect.right) / 2 : 0
    const y = rect ? (rect.top + rect.bottom) / 2 : 0
    targets.push({x: x, y: y})
  }

  useEffect(() => {
    const targets: Vec2[] = []
    if (backRef.current) addRef(targets, backRef.current)
    for (let i = 0; i < categoryDesc.length; i++) {
      const tmp = categoryRefs.current[i]
      if (tmp == null) continue
      addRef(targets, tmp)
    }
    dispatch(changeTarget(targets))
  }, [dispatch])

  useEffect(() => {
    const i = targets.findIndex((e) => {
      if (mouse == null || mouse.clientX == null || mouse.clientY == null) return false
      if (Math.abs(e.x - mouse.clientX) < 3 && Math.abs(e.y - mouse.clientY) < 3) return true
      return false
    })
    if (i == -1) return
    if (i == 0) router.push('/placeholder')
    if (i > 0 && i < categoryDesc.length) router.push('/placeholder/' + categoryDesc[i].category)
  }, [mouse, mouse.clientY, mouse.clientX, targets])

  return (
    <div className={styles.wrap}>
      <div className={styles.cursor} style={{
          top: mouse.y + 'px',
          left: mouse.x + 'px',
        }}>
          <img src='/cursor.svg' className={styles.cursor_img} alt="cursor"></img>
      </div>
      <div className={[styles.container_light, menuStyles.menu_container].join(' ')} ref={ref}>
        <div className={styles.cursor_placeholder_wrap}>
          <img ref={backRef} src='/cursor_placeholder_light.svg' className={styles.cursor_placeholder_img} alt="cursor placeholder"></img>
          <p className={styles.cursor_placeholder_text_light}>Back</p>
        </div>
        <div className={styles.greetingwrap}>
          <h2 className={styles.contenttitle}>Works</h2>
          { categoryDesc.map((e, index) => {
            return (<div className={menuStyles.categoryitem} key={index}>
              <div className={menuStyles.categoryitemleft}>
                <h3 className={menuStyles.categoryitemtitle}>{e.titleJa}</h3>
                <p className={menuStyles.categoryitemdesc}>{e.descJa}</p>
              </div>
              <div className={styles.cursor_placeholder_wrap}>
                <img ref={el => categoryRefs.current[index] = el} src='/cursor_placeholder_light.svg' className={styles.cursor_placeholder_img} alt="cursor placeholder"></img>
                <p className={styles.cursor_placeholder_text_light}>Enter</p>
              </div>
            </div>)
          }) }
        </div>
      </div>
    </div>
  )
}

export default PlaceholderMenu