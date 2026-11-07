import type { Metadata } from 'next'
import { Big_Shoulders_Stencil, Gloock } from 'next/font/google'
import { VersionSwitcher } from '@/components/VersionSwitcher'
import styles from '@/components/v4/v4.module.css'

const stencil = Big_Shoulders_Stencil({ subsets: ['latin'], axes: ['opsz'], variable: '--font-stencil', display: 'swap' })
const gloock = Gloock({ subsets: ['latin'], weight: '400', variable: '--font-gloock', display: 'swap' })

export const metadata: Metadata = {
  title: 'Design v4: The hoarding',
  robots: { index: false, follow: false },
  alternates: { canonical: '/' },
}

export default function V4Layout({ children }: LayoutProps<'/v4'>) {
  return (
    <div className={`${stencil.variable} ${gloock.variable} ${styles.v4}`}>
      {children}
      <VersionSwitcher current="v4" />
    </div>
  )
}
