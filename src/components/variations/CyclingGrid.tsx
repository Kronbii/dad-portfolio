'use client'

import { useEffect, useState } from 'react'
import styles from './variations.module.css'

// Corners swap in a cross pattern, so two neighbours never change one after the other.
const order = [0, 3, 1, 2]

/** Four framed photos. Every couple of seconds one of them dissolves to its next photo. Still with reduced motion. */
export function CyclingGrid({ slots }: { slots: React.ReactNode[][] }) {
  const [shown, setShown] = useState(() => slots.map(() => 0))
  const counts = slots.map((photos) => photos.length).join()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lengths = counts.split(',').map(Number)
    let turn = 0
    const id = window.setInterval(() => {
      if (document.hidden) return
      const slot = order[turn++ % order.length]
      setShown((prev) => prev.map((n, i) => (i === slot ? (n + 1) % lengths[i] : n)))
    }, 2000)
    return () => window.clearInterval(id)
  }, [counts])

  return (
    <div className={styles.cycleGrid}>
      {slots.map((photos, i) => (
        <div key={i} className="inlay inlay-sm scoop">
          <div className="inlay-gap scoop">
            <div className={`inlay-media scoop ${styles.cycleSlot}`}>
              {photos.map((photo, j) => (
                <div key={j} className={styles.layer} data-shown={j === shown[i] || undefined} aria-hidden={j !== shown[i]}>
                  {photo}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
