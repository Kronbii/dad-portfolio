import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import { VersionSwitcher } from '@/components/VersionSwitcher'
import styles from '@/components/v3/v3.module.css'

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], axes: ['opsz', 'wdth'], variable: '--font-v3', display: 'swap' })

export const metadata: Metadata = {
  title: 'Design v3: The handover walkthrough',
  robots: { index: false, follow: false },
  alternates: { canonical: '/' },
}

export default function V3Layout({ children }: LayoutProps<'/v3'>) {
  return (
    <div className={`${bricolage.variable} ${styles.v3}`}>
      {children}
      <VersionSwitcher current="v3" />
    </div>
  )
}
