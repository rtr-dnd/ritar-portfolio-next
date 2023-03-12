import { useDispatch, useSelector } from "react-redux"
import { useParallax } from "react-scroll-parallax"
import { AppDispatch, RootState } from "../../store"
import { asyncFocus, focusSlice } from "../../store/focus"
import styles from "./Layers.module.css"

export type LayerProps = {
  onHover?: () => {},
  children?: JSX.Element | JSX.Element[],
  inner?: 'plain' | 'light' | 'image' | 'box'
}

const maxBlurVal = 12

export const ItemLayer: React.FC<LayerProps> = ({
  onHover,
  children,
}) => {
  const focusVal = useSelector((state: RootState) => state.focus.focusVal)
  const dispatch = useDispatch<AppDispatch>()
  const focus = () => {
    dispatch(asyncFocus(0))
  }

  return (
    <div className={styles.itemlayer} onMouseEnter={focus} onTouchStart={focus} style={{
      textShadow: '0 0 ' + (focusVal * maxBlurVal).toString() + 'px rgba(0, 0, 0, 1)'
    }}>
      {children}
    </div>
  )
}

export const ItemInnerLayer: React.FC<LayerProps> = ({
  onHover,
  children,
  inner
}) => {
  const focusVal = useSelector((state: RootState) => state.focus.focusVal)

  if (inner == 'light' || inner == 'plain') return(
    <div className={styles.iteminnerlayer} onMouseEnter={focus} onTouchStart={focus} style={{
      textShadow: '0 0 ' + (focusVal * maxBlurVal).toString() + 'px rgba(0, 0, 0, ' + (inner == 'plain' ? '1' : '0.2') + ')'
    }}>
      {children}
    </div> 
  )

  const blurVal = 6

  return (
    <div className={styles.iteminnerlayer} style={{
      filter: 'blur(' + (
        Math.abs(blurVal * focusVal)
      ).toString() + 'px)'
    }}>
      {children}
    </div>
  )
}

export const ListLayer: React.FC<LayerProps> = ({
  onHover,
  children,
}) => {
  const focusVal = useSelector((state: RootState) => state.focus.focusVal)
  const dispatch = useDispatch<AppDispatch>()
  const focus = () => {
    dispatch(asyncFocus(1/2))
  }

  const {ref} = useParallax<HTMLParagraphElement>({speed: -7})

  return (
    <div className={styles.listlayer} ref={ref} onMouseEnter={focus} onTouchStart={focus} style={{
      textShadow: '0 0 ' + (
        Math.abs(maxBlurVal * focusVal - maxBlurVal / 2)
      ).toString() + 'px rgba(0, 0, 0, 1)'
    }}>
      {children}
    </div>
  )
}

export const ListImageLayer: React.FC<LayerProps> = ({
  onHover,
  children,
}) => {
  const focusVal = useSelector((state: RootState) => state.focus.focusVal)

  const blurVal = 12

  return (
    <div className={styles.imagelayer} style={{
      filter: 'blur(' + (
        Math.abs(blurVal * focusVal - blurVal / 2)
      ).toString() + 'px)'
    }}>
      {children}
    </div>
  )
}

export const HeadingLayer: React.FC<LayerProps> = ({
  onHover,
  children,
}) => {
  const focusVal = useSelector((state: RootState) => state.focus.focusVal)
  const dispatch = useDispatch<AppDispatch>()
  const focus = () => {
    dispatch(asyncFocus(1))
  }

  const {ref} = useParallax<HTMLDivElement>({speed: -21})

  return (
    <div className={styles.headinglayer} ref={ref} onMouseEnter={focus} onTouchStart={focus} style={{
      textShadow: '0 0 ' + (
        Math.abs((1 - focusVal) * maxBlurVal)
      ).toString() + 'px rgba(0, 0, 0, 0.2)'
    }}>
      {children}
    </div>
  )
}
