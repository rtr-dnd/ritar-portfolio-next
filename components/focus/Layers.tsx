import { useDispatch, useSelector } from "react-redux"
import { useParallax } from "react-scroll-parallax"
import { RootState } from "../../store"
import { focusSlice } from "../../store/focus"
import styles from "./Layers.module.css"

export type LayerProps = {
  onHover?: () => {},
  children?: JSX.Element | JSX.Element[]
}

const maxBlurVal = 12

export const FirstLayer: React.FC<LayerProps> = ({
  onHover,
  children,
}) => {
  const focusVal = useSelector((state: RootState) => state.focus.focusVal)
  const dispatch = useDispatch()
  const focus = () => {
    dispatch(focusSlice.actions.focusAt(0))
  }

  return (
    <div className={styles.firstlayer} onMouseEnter={focus} style={{
      textShadow: '0 0 ' + (focusVal * maxBlurVal).toString() + 'px rgba(0, 0, 0, 0.8)'
    }}>
      {children}
    </div>
  )
}

export const SecondLayer: React.FC<LayerProps> = ({
  onHover,
  children,
}) => {
  const focusVal = useSelector((state: RootState) => state.focus.focusVal)
  const dispatch = useDispatch()
  const focus = () => {
    dispatch(focusSlice.actions.focusAt(1/3))
  }

  const {ref} = useParallax<HTMLParagraphElement>({speed: -7})

  return (
    <div className={styles.secondlayer} ref={ref} onMouseEnter={focus} style={{
      textShadow: '0 0 ' + (
        Math.abs(maxBlurVal * focusVal - maxBlurVal / 3)
      ).toString() + 'px rgba(0, 0, 0, 0.8)'
    }}>
      {children}
    </div>
  )
}

export const ImageLayer: React.FC<LayerProps> = ({
  onHover,
  children,
}) => {
  const focusVal = useSelector((state: RootState) => state.focus.focusVal)
  const dispatch = useDispatch()
  const focus = () => {
    dispatch(focusSlice.actions.focusAt(2/3))
  }

  const {ref} = useParallax<HTMLParagraphElement>({speed: -14})
  const blurVal = 5

  return (
    <div className={styles.imagelayer} ref={ref} onMouseEnter={focus} style={{
      filter: 'blur(' + (
        Math.abs(blurVal * focusVal - blurVal / 3 * 2)
      ).toString() + 'px)'
    }}>
      {children}
    </div>
  )
}

export const BgLayer: React.FC<LayerProps> = ({
  onHover,
  children,
}) => {
  const focusVal = useSelector((state: RootState) => state.focus.focusVal)
  const dispatch = useDispatch()
  const focus = () => {
    dispatch(focusSlice.actions.focusAt(1))
  }

  const {ref} = useParallax<HTMLDivElement>({speed: -100})

  return (
    <div className={styles.bglayer} ref={ref}
    // onMouseEnter={focus}
    style={{
      filter: 'blur(' + ((1 - focusVal) * 4).toString() + 'px)'
    }}>
      {children}
    </div>
  )
}

