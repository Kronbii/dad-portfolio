'use client'

import { useEffect, useState } from 'react'
import styles from './v3.module.css'

/**
 * The clipboard that follows the walkthrough: which room you're in, how many you've inspected,
 * and the snag count, which stays at none. Shows only while the rooms are on screen.
 */
export function WalkRail({ names }: { names: string[] }) {
  const [current, setCurrent] = useState(-1)
  const [inspected, setInspected] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const rooms = [...document.querySelectorAll<HTMLElement>('[data-room]')]
    const walk = document.querySelector('[data-walk]')
    if (!rooms.length || !walk) return
    const roomObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const i = Number((e.target as HTMLElement).dataset.room)
          setCurrent(i)
          setInspected((n) => Math.max(n, i + 1))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    const walkObserver = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '-30% 0px -30% 0px' })
    rooms.forEach((r) => roomObserver.observe(r))
    walkObserver.observe(walk)
    return () => {
      roomObserver.disconnect()
      walkObserver.disconnect()
    }
  }, [])

  return (
    <aside className={styles.rail} data-visible={visible} aria-label="Walkthrough progress">
      <p className={styles.railTitle}>Handover</p>
      <ol className={styles.railRooms}>
        {names.map((name, i) => (
          <li key={name} data-state={i === current ? 'current' : i < inspected ? 'done' : 'todo'}>
            <a href={`#room-${i + 1}`}>
              <span className={styles.srOnly}>
                Room {i + 1}: {name}
              </span>
            </a>
          </li>
        ))}
      </ol>
      <p className={styles.railCount} aria-live="polite">
        <span>
          {inspected} of {names.length} rooms
        </span>
        <span>Snags: none</span>
      </p>
    </aside>
  )
}
