'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type Img = { src: string; alt: string; width: number; height: number; blurDataURL: string }

type Props = {
  before: Img
  after: Img
  /** Crop both photos to this ratio instead of the after photo's own, e.g. "4 / 5". */
  ratio?: string
  /** Sweep the handle once when it first scrolls into view, to show that it moves. */
  peek?: boolean
  /** Names the two sides for screen readers, e.g. ["Render", "Finished"]. */
  labels?: readonly [string, string]
  sizes?: string
}

// Where the handle travels on its one sweep: towards the before photo, across to the after, back to the middle.
const sweep = [50, 22, 78, 50]
const clamp = (n: number) => Math.min(100, Math.max(0, n))

/**
 * Before on the left, after on the right. Drag anywhere on the photo, tap to jump, or use the arrow keys.
 * On touch screens a vertical swipe still scrolls the page; only a sideways drag moves the handle.
 */
export function Compare({ before, after, ratio, peek, labels = ['Before', 'After'], sizes = '(max-width: 760px) 100vw, 620px' }: Props) {
  const [value, setValue] = useState(50)
  const box = useRef<HTMLDivElement>(null)
  const touched = useRef(false)
  const drag = useRef<{ id: number; x: number; y: number; active: boolean } | null>(null)

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

  const moveTo = (clientX: number) => {
    const rect = box.current?.getBoundingClientRect()
    if (rect) setValue(clamp(((clientX - rect.left) / rect.width) * 100))
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    touched.current = true
    const mouse = e.pointerType === 'mouse'
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, active: mouse }
    if (mouse) {
      e.currentTarget.setPointerCapture(e.pointerId)
      moveTo(e.clientX)
    }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    if (!d.active) {
      // A finger only takes the handle once it clearly moves sideways; up and down stays a scroll.
      const dx = Math.abs(e.clientX - d.x)
      if (dx < 6 || dx < Math.abs(e.clientY - d.y)) return
      d.active = true
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    moveTo(e.clientX)
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    // A tap without a drag moves the handle to where the finger landed.
    if (d && !d.active && Math.hypot(e.clientX - d.x, e.clientY - d.y) < 10) moveTo(e.clientX)
    drag.current = null
  }

  const fit = 'h-full w-full object-cover'
  return (
    <div
      ref={box}
      className="group relative cursor-ew-resize touch-pan-y overflow-hidden select-none"
      style={{ aspectRatio: ratio ?? `${after.width} / ${after.height}` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (drag.current = null)}
    >
      <Image {...after} sizes={sizes} placeholder="blur" draggable={false} className={`absolute inset-0 ${fit}`} alt={after.alt} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
        <Image {...before} sizes={sizes} placeholder="blur" draggable={false} className={fit} alt={before.alt} />
      </div>
      <span aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-paper shadow-[0_0_0_1px_rgba(33,30,27,.25)]" style={{ left: `${value}%` }}>
        <span className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-[0_2px_10px_rgba(33,30,27,.35)] group-has-[input:focus-visible]:outline-2 group-has-[input:focus-visible]:outline-offset-2 group-has-[input:focus-visible]:outline-rosso">
          <ChevronLeft className="size-3.5" strokeWidth={2.5} />
          <span className="mx-0.5 size-2.5 rotate-45 bg-rosso" />
          <ChevronRight className="size-3.5" strokeWidth={2.5} />
        </span>
      </span>
      {/* The keyboard way in: focusable, while the box above handles the pointer. */}
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(value)}
        onChange={(e) => {
          touched.current = true
          setValue(Number(e.target.value))
        }}
        aria-label={`Slide between ${labels[0].toLowerCase()} and ${labels[1].toLowerCase()}`}
        className="pointer-events-none absolute inset-0 m-0 h-full w-full opacity-0"
      />
    </div>
  )
}
