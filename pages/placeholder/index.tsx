import { NextPage } from "next";
import Image from 'next/future/image'
import useMouse from '@react-hook/mouse-position'
import styles from '../../styles/placeholder/placeholder.module.css'
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { changeTarget } from "../../store/placeholder";
import { useRouter } from "next/router";

const Placeholder: NextPage = () => {
  const ref = useRef(null)
  const mouse = useMouse(ref)
  const placeholderRef = useRef<HTMLImageElement>(null)

  const targets = useSelector((state: RootState) => state.placeholder.target)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const rect = placeholderRef.current?.getClientRects()[0]
    const x = rect ? (rect.left + rect.right) / 2 : 0
    const y = rect ? (rect.top + rect.bottom) / 2 : 0
    dispatch(changeTarget([{x: x, y: y}]))
  }, [dispatch])

  useEffect(() => {
    const i = targets.findIndex((e) => {
      if (mouse == null || mouse.clientX == null || mouse.clientY == null) return false
      if (Math.abs(e.x - mouse.clientX) < 3 && Math.abs(e.y - mouse.clientY) < 3) return true
      return false
    })
    if (i == -1) return
    router.push('/placeholder/menu')
  }, [mouse, mouse.clientY, mouse.clientX, targets, router])

  return (
    <div className={styles.wrap}>
      <div className={styles.cursor} style={{
          top: mouse.y + 'px',
          left: mouse.x + 'px',
        }}>
          <img src='/cursor.svg' className={styles.cursor_img} alt="cursor"></img>
      </div>
      <div className={styles.container_dark} ref={ref}>
        <div className={styles.greetingwrap}>
          <h2 className={styles.contenttitle}>こんにちは。</h2>
          <p className={styles.contentdesc}>
            ritarと申します。<br />
            東京大学大学院 情報理工学系研究科 葛岡雨宮鳴海研究室に所属しています。<br />
          </p>
        </div>
        <div className={styles.cursor_placeholder_wrap}>
          <img ref={placeholderRef} src='/cursor_placeholder_dark.svg' className={styles.cursor_placeholder_img} alt="cursor placeholder"></img>
          <p className={styles.cursor_placeholder_text_dark}>Next</p>
        </div>
      </div>
    </div>
  )
}

export default Placeholder