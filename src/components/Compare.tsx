'use client'

import Image from 'next/image'
import { useState } from 'react'

type Img = { src: string; alt: string; width: number; height: number; blurDataURL: string }

/** Render on the left, finished work on the right; drag (or use the arrow keys) to compare. */
export function Compare({ before, after }: { before: Img; after: Img }) {
  const [value, setValue] = useState(50)
  const ratio = `${after.width} / ${after.height}`
  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: ratio }}>
      <Image {...after} sizes="(max-width: 760px) 100vw, 620px" placeholder="blur" className="absolute inset-0 h-full w-full object-cover" alt={after.alt} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
        <Image {...before} sizes="(max-width: 760px) 100vw, 620px" placeholder="blur" className="h-full w-full object-cover" alt={before.alt} />
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-paper shadow-[0_0_0_1px_rgba(33,30,27,.25)]"
        style={{ left: `${value}%` }}
      >
        <span className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-paper bg-rosso" />
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label="Slide between the render and the finished work"
        className="absolute inset-0 m-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  )
}
