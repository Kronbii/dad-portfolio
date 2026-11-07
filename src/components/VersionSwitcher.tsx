import Link from 'next/link'
import styles from './VersionSwitcher.module.css'

const versions = [
  { href: '/v1', label: 'v1', title: 'Gallery (current site)' },
  { href: '/v2', label: 'v2', title: 'The finishing package' },
  { href: '/v3', label: 'v3', title: 'The handover walkthrough' },
  { href: '/v4', label: 'v4', title: 'The hoarding' },
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
