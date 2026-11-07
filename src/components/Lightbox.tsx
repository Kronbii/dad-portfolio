'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

type Item = { src: string; alt: string; width: number; height: number }

/**
 * One photo viewer for the whole page. It listens for clicks on any `a[data-lightbox]` (see GalleryGrid)
 * and steps through the photos of that link's gallery. A native <dialog>: Esc closes, arrows move.
 */
export function Lightbox() {
  const dialog = useRef<HTMLDialogElement>(null)
  const [view, setView] = useState<{ items: Item[]; index: number } | null>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[data-lightbox]')
      if (!link || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      e.preventDefault()
      const links = [...(link.closest('[data-gallery]') ?? document).querySelectorAll<HTMLAnchorElement>('a[data-lightbox]')]
      const items = links.map((l) => ({ src: l.getAttribute('href') ?? '', alt: l.dataset.alt ?? '', width: Number(l.dataset.w), height: Number(l.dataset.h) }))
      setView({ items, index: links.indexOf(link) })
      dialog.current?.showModal()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const close = useCallback(() => dialog.current?.close(), [])
  const step = useCallback((delta: number) => setView((v) => (v ? { ...v, index: (v.index + delta + v.items.length) % v.items.length } : v)), [])

  const current = view?.items[view.index]
  return (
    <dialog
      ref={dialog}
      aria-label="Photo viewer"
      className="lightbox m-0 h-dvh max-h-none w-dvw max-w-none bg-ink/95 p-0 text-paper backdrop:bg-ink/80"
      onClose={() => setView(null)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') step(1)
        if (e.key === 'ArrowLeft') step(-1)
      }}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="flex h-full flex-col items-center justify-center px-4 py-14" onClick={(e) => e.target === e.currentTarget && close()}>
        {current && view && (
          <figure key={current.src} className="lightbox-photo m-0 flex max-h-full flex-col items-center">
            <Image src={current.src} alt={current.alt} width={current.width} height={current.height} sizes="100vw" loading="eager" className="max-h-[calc(100dvh-9rem)] w-auto object-contain" />
            <figcaption className="mt-3 max-w-[60ch] text-center text-sm text-paper/80">
              {current.alt}{' '}
              <span className="text-paper/50">
                ({view.index + 1} of {view.items.length})
              </span>
            </figcaption>
          </figure>
        )}
      </div>
      <button type="button" onClick={close} className="absolute right-4 top-4 rounded-full p-2 hover:bg-paper/10" aria-label="Close">
        <X className="size-6" aria-hidden />
      </button>
      {view && view.items.length > 1 && (
        <>
          <button type="button" onClick={() => step(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-paper/10" aria-label="Previous photo">
            <ChevronLeft className="size-8" aria-hidden />
          </button>
          <button type="button" onClick={() => step(1)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-paper/10" aria-label="Next photo">
            <ChevronRight className="size-8" aria-hidden />
          </button>
        </>
      )}
    </dialog>
  )
}
