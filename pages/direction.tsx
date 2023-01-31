import { NextPage } from "next";
import { UIEvent, useCallback, useEffect, useRef } from "react";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import styles from '../styles/direction.module.css'

const Direction: NextPage = () => {
  const horizontalRef = useRef<HTMLDivElement>(null)
  const verticalRef = useRef<HTMLDivElement>(null)

  const onHorizontalScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
    console.log("horizontal scroll")
    console.log(verticalRef)
    if (verticalRef.current == null) return;
    console.log("horizontal scroll not null")
    verticalRef.current.scrollTop =
      e.currentTarget.scrollLeft *
      (verticalRef.current.scrollHeight - verticalRef.current.clientHeight) /
      (e.currentTarget.scrollWidth - e.currentTarget.clientWidth)
  }, []
  )

  useEffect(() => {
    console.log(verticalRef)
    console.log(horizontalRef)
  }, [verticalRef])

  // const onVerticalScroll: UIEventHandler<HTMLDivElement> = (e) => {
  //   console.log("vertical scroll")
  //   if (horizontalRef.current == null) return;
  //   console.log("vertical scroll not null")
  //   horizontalRef.current.scrollLeft = 
  //     e.currentTarget.scrollTop * 
  //     (horizontalRef.current.scrollWidth - horizontalRef.current.clientWidth) /
  //     (e.currentTarget.scrollHeight - e.currentTarget.clientHeight)
  // }


  return (
    <ScrollSync>
      <div className={styles.container}>
        <div className={styles.upper}>
          <ScrollSyncPane group="one">
            <div className={styles.vertical + ' ' + styles.flipped}>
              <div className={styles.second}>
                This is second item
              </div>
            </div>
          </ScrollSyncPane>
          <ScrollSyncPane group="two">
            <div className={styles.horizontal + ' ' + styles.flipped}>
              <div className={styles.first}>
                This is first item
              </div>
            </div>
          </ScrollSyncPane>
        </div>
        <div className={styles.lower}>
          <ScrollSyncPane group="two">
            <div className={styles.horizontal} ref={horizontalRef} onScroll={onHorizontalScroll}>
              <div className={styles.third}>
                This is third item
              </div>
            </div>
          </ScrollSyncPane>
          <ScrollSyncPane group="one">
            <div className={styles.vertical} ref={verticalRef}>
              <div className={styles.fourth}>
                This is fourth item
              </div>
            </div>
          </ScrollSyncPane>
        </div>
      </div>
    </ScrollSync>
  )
}

export default Direction