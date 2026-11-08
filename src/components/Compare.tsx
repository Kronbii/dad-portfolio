'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type Img = { src: string; alt: string; width: number; height: number; blurDataURL: string }

type Props = {
  before: Img
  after: Img
  /** Crop both photos to this ratio instead of the finished photo's own, e.g. "4 / 5". */
  ratio?: string
  /** object-position for the crop, the same for both photos so they stay aligned. */
  position?: string
  /** Sweep the handle once when it first scrolls into view, to show that it moves. */
  peek?: boolean
}

// Where the handle travels on its one sweep: towards the render, across to the finish, back to the middle.
const sweep = [50, 22, 78, 50]

/** Render on the left, finished work on the right; drag (or use the arrow keys) to compare. */
export function Compare({ before, after, ratio, position, peek }: Props) {
  const [value, setValue] = useState(50)
  const box = useRef<HTMLDivElement>(null)
  const touched = useRef(false)

  useEffect(() => {
    const el = box.current
    if (!peek || !el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer = 0
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        let start = 0
        const legs = sweep.length - 1
        const legTime = 900
        const tick = (now: number) => {
          if (touched.current) return
          start ||= now
          const t = Math.min((now - start) / (legTime * legs), 1)
          const leg = Math.min(Math.floor(t * legs), legs - 1)
          const local = t * legs - leg
          const eased = local < 0.5 ? 2 * local * local : 1 - (-2 * local + 2) ** 2 / 2
          setValue(sweep[leg] + (sweep[leg + 1] - sweep[leg]) * eased)
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        timer = window.setTimeout(() => (frame = requestAnimationFrame(tick)), 400)
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [peek])

  const fit = { objectPosition: position }
  return (
    <div ref={box} className="relative overflow-hidden" style={{ aspectRatio: ratio ?? `${after.width} / ${after.height}` }}>
      <Image {...after} sizes="(max-width: 760px) 100vw, 620px" placeholder="blur" className="absolute inset-0 h-full w-full object-cover" style={fit} alt={after.alt} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
        <Image {...before} sizes="(max-width: 760px) 100vw, 620px" placeholder="blur" className="h-full w-full object-cover" style={fit} alt={before.alt} />
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
        value={Math.round(value)}
        onChange={(e) => {
          touched.current = true
          setValue(Number(e.target.value))
        }}
        onPointerDown={() => (touched.current = true)}
        aria-label="Slide between the render and the finished work"
        className="absolute inset-0 m-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  )
}
