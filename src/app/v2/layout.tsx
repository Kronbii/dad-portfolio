import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import { VersionSwitcher } from '@/components/VersionSwitcher'
import styles from '@/components/v2/v2.module.css'

const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-v2', display: 'swap' })

export const metadata: Metadata = {
  title: 'Design v2: The finishing package',
  robots: { index: false, follow: false },
  alternates: { canonical: '/' },
}

export default function V2Layout({ children }: LayoutProps<'/v2'>) {
  return (
    <div className={`${archivo.variable} ${styles.v2}`}>
      {children}
      <VersionSwitcher current="v2" />
    </div>
  )
}
