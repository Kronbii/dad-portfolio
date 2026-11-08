'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

const links = [
  { hash: '#finishes', label: 'What I finish' },
  { hash: '#work', label: 'Work' },
  { hash: '#about', label: 'About' },
  { hash: '#contact', label: 'Contact' },
]

// The design versions (/v1 to /v4) are each a whole home page, so their links stay on the page.
const isVersion = (path: string) => /^\/v\d$/.test(path)

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const base = isVersion(usePathname()) ? '' : '/'
  return (
    <header className="wrap no-print relative flex items-center justify-between gap-6 py-[22px]">
      <Link href="/" className="font-display text-[22px] no-underline">
        {site.name}
      </Link>
      <button
        type="button"
        className="rounded-[2px] border border-ink px-3.5 py-2 text-[15px] font-medium md:hidden"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Close' : 'Menu'}
      </button>
      <nav
        id="site-nav"
        aria-label="Main"
        className={cn(
          'absolute inset-x-[clamp(16px,4vw,48px)] top-16 z-20 flex-col border border-ink bg-paper md:static md:flex md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent',
          open ? 'flex' : 'hidden',
        )}
      >
        {links.map((link) => (
          <Link
            key={link.hash}
            href={base + link.hash}
            onClick={() => setOpen(false)}
            className="border-b border-hair px-[18px] py-3.5 text-[15px] font-medium no-underline hover:text-rosso md:border-0 md:p-0"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
