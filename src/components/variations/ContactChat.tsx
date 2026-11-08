'use client'

import { useEffect, useRef, useState } from 'react'
import { contactChat, site, whatsappLink } from '@/content/site'
import { WhatsAppIcon, btnSolid } from '../ContactActions'
import styles from './variations.module.css'

/**
 * The contact as a WhatsApp chat with him: his invitation, a choice of what you're building,
 * and your message, which you can edit before it opens in WhatsApp. Works without scripts as a plain link.
 */
export function ContactChat({ avatar }: { avatar: React.ReactNode }) {
  const [text, setText] = useState(contactChat.defaultText)
  const [choice, setChoice] = useState<string | null>(null)
  const [typing, setTyping] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // His message arrives with a moment of "typing" the first time the chat scrolls into view.
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return
    setTyping(true)
    let timer = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        timer = window.setTimeout(() => setTyping(false), 1300)
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  return (
    <div ref={ref} className={styles.chat}>
      <div className={styles.chatHead}>
        <span className={`scoop ${styles.chatAvatar}`}>{avatar}</span>
        <span>
          <strong>{site.name}</strong>
          <small>{site.company.name}</small>
        </span>
      </div>
      <div className={styles.chatBody}>
        <p className={styles.bubbleIn} aria-live="polite">
          {typing ? (
            <span className={styles.dots} aria-label="Typing">
              <i />
              <i />
              <i />
            </span>
          ) : (
            contactChat.invite
          )}
        </p>
        <fieldset className={styles.chips}>
          <legend>{contactChat.question}</legend>
          <div className={styles.chipRow}>
            {contactChat.choices.map((c) => (
              <button
                key={c.label}
                type="button"
                aria-pressed={choice === c.label}
                onClick={() => {
                  setChoice(c.label)
                  setText(c.text)
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </fieldset>
        <label className={styles.bubbleOut}>
          <span className="sr-only">Your message</span>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} />
        </label>
      </div>
      <a className={`${btnSolid} ${styles.chatSend}`} href={whatsappLink(text.trim() || contactChat.defaultText)}>
        <WhatsAppIcon />
        Send on WhatsApp
      </a>
    </div>
  )
}
