'use client'

import { useEffect, useRef, useState } from 'react'
import { benue, mapBox, niger, nigeria } from './nigeria'
import styles from './home.module.css'

/** x and y are in the map's own units (see nigeria.ts). A label goes to the right of its pin unless it would collide. */
export type City = { name: string; work: string; x: number; y: number; labelAbove?: boolean }

/** Where he has worked: rosso inlay diamonds on Nigeria. It steps through the cities on its own until someone picks one. */
export function WorkMap({ cities, photos }: { cities: City[]; photos: React.ReactNode[] }) {
  const [active, setActive] = useState(0)
  const [picked, setPicked] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (picked || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let visible = false
    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.4 })
    if (ref.current) observer.observe(ref.current)
    const id = window.setInterval(() => {
      if (visible && !document.hidden) setActive((i) => (i + 1) % cities.length)
    }, 2800)
    return () => {
      observer.disconnect()
      window.clearInterval(id)
    }
  }, [picked, cities.length])

  const city = cities[active]
  return (
    <div ref={ref} className={styles.mapGrid}>
      <div className={styles.mapWrap}>
        <svg viewBox={`0 0 ${mapBox.width} ${mapBox.height}`} className={styles.map} aria-hidden>
          <path d={nigeria} pathLength={1} className={styles.mapLand} />
          <path d={niger} className={styles.mapRiver} />
          <path d={benue} className={styles.mapRiver} />
        </svg>
        {cities.map((c, i) => (
          <button
            key={c.name}
            type="button"
            className={styles.pin}
            style={{ left: `${(c.x / mapBox.width) * 100}%`, top: `${(c.y / mapBox.height) * 100}%`, '--d': i } as React.CSSProperties}
            aria-pressed={i === active}
            data-above={c.labelAbove || undefined}
            onClick={() => {
              setActive(i)
              setPicked(true)
            }}
          >
            <span className={styles.pinMark} aria-hidden />
            {c.name}
          </button>
        ))}
      </div>
      <figure className={styles.mapCard}>
        <div className="inlay scoop">
          <div className="inlay-gap scoop">
            <div className={`inlay-media scoop ${styles.mapPhoto}`}>
              {photos.map((photo, i) => (
                <div key={cities[i].name} className={styles.layer} data-shown={i === active || undefined} aria-hidden={i !== active}>
                  {photo}
                </div>
              ))}
            </div>
          </div>
        </div>
        <figcaption aria-live={picked ? 'polite' : 'off'}>
          <span className={styles.mapCity}>{city.name}</span>
          <span className={styles.mapWork}>{city.work}</span>
        </figcaption>
      </figure>
    </div>
  )
}
