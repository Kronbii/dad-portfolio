'use client'

import { useEffect, useState } from 'react'
import styles from './variations.module.css'

/** The hero's framed photo: one room dissolves into the next every few seconds, with its caption. Still with reduced motion. */
export function ReelStage({ photos, captions }: { photos: React.ReactNode[]; captions: string[] }) {
  const [shown, setShown] = useState(0)
  const count = photos.length

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      if (!document.hidden) setShown((i) => (i + 1) % count)
    }, 3600)
    return () => window.clearInterval(id)
  }, [count])

  return (
    <>
      <div className="inlay scoop">
        <div className="inlay-gap scoop">
          <div className={`inlay-media scoop ${styles.reelStage}`}>
            {photos.map((photo, i) => (
              <div key={captions[i]} className={styles.layer} data-shown={i === shown || undefined} aria-hidden={i !== shown}>
                {photo}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.reelCaption}>
        <p className={styles.captions}>
          {captions.map((caption, i) => (
            <span key={caption} data-shown={i === shown || undefined} aria-hidden={i !== shown}>
              {caption}
            </span>
          ))}
        </p>
        <span className={styles.marks} aria-hidden>
          {captions.map((caption, i) => (
            <i key={caption} data-shown={i === shown || undefined} />
          ))}
        </span>
      </div>
    </>
  )
}
