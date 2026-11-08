import Link from 'next/link'
import styles from './VersionSwitcher.module.css'

const versions = [
  { href: '/v1', label: 'v1', title: 'Gallery (current site)' },
  { href: '/v2', label: 'v2', title: 'Showreel' },
  { href: '/v4', label: 'v4', title: 'Photo wall' },
]

/** Floating switcher on the design versions, for comparing them side by side. Not on the live pages. */
export function VersionSwitcher({ current }: { current: string }) {
  return (
    <nav className={styles.switcher} aria-label="Design versions">
      {versions.map((v) => (
        <Link key={v.href} href={v.href} title={v.title} aria-current={v.label === current ? 'page' : undefined} className={styles.link}>
          {v.label}
        </Link>
      ))}
    </nav>
  )
}
