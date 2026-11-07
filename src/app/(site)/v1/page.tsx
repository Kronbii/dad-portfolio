import type { Metadata } from 'next'
import { VersionSwitcher } from '@/components/VersionSwitcher'
import HomePage from '../page'

export const metadata: Metadata = {
  title: 'Design v1: Gallery',
  robots: { index: false, follow: false },
  alternates: { canonical: '/' },
}

/** v1 is the current live design, kept here so it can be compared with the other versions. */
export default function V1Page() {
  return (
    <>
      <HomePage />
      <VersionSwitcher current="v1" />
    </>
  )
}
