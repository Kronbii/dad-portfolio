'use client'

import Image from 'next/image'
import { useState } from 'react'
import styles from './v2.module.css'

type Img = { src: string; alt: string; width: number; height: number; blurDataURL: string }

/** Design intent against as built, split by a drafting line the visitor drags. */
export function AsBuilt({ intent, built }: { intent: Img; built: Img }) {
  const [pos, setPos] = useState(50)
  return (
    <div className={styles.asBuilt} style={{ aspectRatio: `${built.width} / ${built.height}` }}>
      <Image {...built} alt={built.alt} sizes="(max-width: 900px) 100vw, 560px" placeholder="blur" className={styles.asBuiltImg} />
      <div className={styles.asBuiltIntent} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image {...intent} alt={intent.alt} sizes="(max-width: 900px) 100vw, 560px" placeholder="blur" className={styles.asBuiltImg} />
      </div>
      <span className={styles.asBuiltLine} style={{ left: `${pos}%` }} aria-hidden>
        <span className={styles.asBuiltTag}>{pos}% intent</span>
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Slide between the design intent and the as-built photo"
        className={styles.asBuiltRange}
      />
    </div>
  )
}
