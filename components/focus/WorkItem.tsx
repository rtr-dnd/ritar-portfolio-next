import Image from 'next/future/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Content, isImage, isLink } from "../../contents/contents"
import { AppDispatch, RootState } from '../../store'
import { asyncFocus, setDrawer } from '../../store/focus'
import { ImageOrVideo } from './ImageOrVideo'
import { ItemInnerLayer } from './Layers'
import styles from './WorkItem.module.css'

const IconButton = (props: { path: string, text: string, onClick?: () => void }) => {
  return <button className={styles.iconbutton} onClick={props.onClick}>
    <ItemInnerLayer inner='image'>
      <Image src={'/' + props.path + '.svg'} alt={props.text} />
    </ItemInnerLayer>
    <ItemInnerLayer inner='plain'>
      <span>{props.text}</span>
    </ItemInnerLayer>
  </button>
}

const Divider = () => {
  return <ItemInnerLayer inner='image'>
      <div className={styles.divider}></div>
    </ItemInnerLayer>
}

const Description = (props: { item: Content }) => {
  return <>
    {props.item.content?.map((e, i) => {
      if (isLink(e)) return <a key={i} className={styles.desclink} href={e.href}>{e.text}</a>
      if (isImage(e)) return <ItemInnerLayer inner='image'>
            <Image key={i} className={styles.descimage} src={e.src} alt='description image'/>
          </ItemInnerLayer>
      return <p key={i} className={styles.desctext}>{e}</p>
    })}
  </>
}

export const WorkItem = () => {
  const contentRef = useRef<HTMLDivElement>(null)

  const item = useSelector((state: RootState) => state.focus.activeItem)
  const isOpen = useSelector((state: RootState) => state.focus.isItemOpen)
  const isHidden = useSelector((state: RootState) => state.focus.isItemHidden)
  const focusVal = useSelector((state: RootState) => state.focus.focusVal)
  const dispatch = useDispatch<AppDispatch>()
  const close = () => {
    dispatch(setDrawer(false))
    dispatch(asyncFocus(1/2))
  }

  useEffect(() => {
    if (isOpen && contentRef.current) contentRef.current.scrollTop = 0
  }, [isOpen])

  useEffect(() => {
    if (!isHidden && contentRef.current) contentRef.current.scrollTop = 0
  }, [isHidden])

  const blurVal = 6
  return <section className={[styles.workitem, isOpen ? styles.open : ''].join(' ')}>
    <section className={styles.workitembg} style={{
    filter: 'blur(' + (
      Math.abs(blurVal * focusVal)).toString() + 'px)' 
    }} />
    <div ref={contentRef} className={[styles.content, isHidden ? styles.hidden : ''].join(' ')}>
      <div className={styles.closewrap}>
        <IconButton path='close' text='Close' onClick={() => {close()}}/>
      </div>
      <article className={styles.article}>
        <div className={styles.cover}>
          <ItemInnerLayer inner='image'>
            <ImageOrVideo e={item}/>
          </ItemInnerLayer>
        </div>
        <div className={styles.titlewrap}>
          <h1 className={styles.h1}>{item.title}</h1>
          <a href={item.link} className={styles.external}>
            <ItemInnerLayer inner='image'>
              <span>Visit</span>
              <Image src='/external.svg' alt='link' />
            </ItemInnerLayer>
          </a>
        </div>
        <p className={styles.desc}>{item.desc_short}</p>
        <a href={item.link} className={[styles.external, styles.mobile].join(' ')}>
          <ItemInnerLayer inner='image'>
            <span>Visit</span>
            <Image src='/external.svg' alt='link' />
          </ItemInnerLayer>
        </a>
        <Divider />
        { item.content == null && <p className={styles.desc}>{item.desc}</p> }
        { item.content != null && <Description item={item}/> }
        <Divider />
        <div className={styles.grid}>
          <ItemInnerLayer inner='light'>
            <span>Year</span>
          </ItemInnerLayer>
          <div className={styles.griditem}>{item.year}</div>
          { item.role != null &&
            <ItemInnerLayer inner='light'>
              <span>Role</span>
            </ItemInnerLayer> }
          { item.role != null &&
            <div className={styles.griditem}>{item.role}</div> }
          { item.tool != null &&
            <ItemInnerLayer inner='light'>
              <span>Tool</span>
            </ItemInnerLayer> }
          { item.tool != null &&
            <div className={styles.griditem}>{item.tool}</div> }
        </div>
      </article>
      <div className={styles.backbutton} onClick={close}>
        <div className={styles.backbg} style={{
          filter: 'blur(' + (
            Math.abs(blurVal * focusVal)).toString() + 'px)' 
        }}></div>
        <IconButton path="back" text="Back to list"/>
      </div>
    </div>
  </section>
}
