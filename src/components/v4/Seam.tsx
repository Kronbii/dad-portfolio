'use client'

import { MoveHorizontal } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import styles from './v4.module.css'

/**
 * Raw underneath, finished on top, split by a seam. Until the visitor takes hold of it, the seam
 * sweeps across as the panel scrolls through the screen; dragging (or the arrow keys) takes over.
 * A printed readout says how much of the frame is finished.
 */
export function Seam({ raw, finished, label, start = 50, auto = true, className }: { raw: ReactNode; finished: ReactNode; label: string; start?: number; auto?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(start)
  const [manual, setManual] = useState(!auto)

  useEffect(() => {
    if (manual) return
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 as the panel's top enters the bottom of the screen, 1 as its bottom leaves the top
      const t = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)))
      setPos(Math.round(88 - t * 76))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [manual])

  const finishedShare = 100 - pos
  return (
    <div ref={ref} className={`${styles.seam} ${className ?? ''}`}>
      <div className={styles.seamRaw}>{raw}</div>
      <div className={styles.seamFinished} style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        {finished}
      </div>
      <div className={styles.seamEdge} style={{ left: `${pos}%` }} aria-hidden>
        <span className={styles.seamGrip}>
          <MoveHorizontal aria-hidden />
        </span>
      </div>
      <p className={styles.readout} aria-hidden>
        <span>{finishedShare}%</span> finished
      </p>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => {
          setManual(true)
          setPos(Number(e.target.value))
        }}
        onPointerDown={() => setManual(true)}
        aria-label={label}
        aria-valuetext={`${finishedShare}% finished`}
        className={styles.seamRange}
      />
    </div>
  )
}
