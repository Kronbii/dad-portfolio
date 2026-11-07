'use client'

import Link from 'next/link'
import { useState } from 'react'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

const links = [
  { href: '/#finishes', label: 'What he finishes' },
  { href: '/#work', label: 'Work' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
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
            key={link.href}
            href={link.href}
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
