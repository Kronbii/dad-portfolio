import type { Metadata } from 'next'
import { ContactBlock } from '@/components/sections/HomeSections'
import { Firms, ProfileHero, ProjectRow, WhereHeWorked } from '@/components/variations/CompanyProfile'
import { BehindHoardings, NameOnBoard, Posters, TradeTiles } from '@/components/variations/LikedSections'
import { VersionSwitcher } from '@/components/VersionSwitcher'
import { projects } from '@/content/projects'

export const metadata: Metadata = {
  title: 'Design v3: Company profile',
  robots: { index: false, follow: false },
  alternates: { canonical: '/' },
}

/** v1 read as a company profile for developers and contractors: what, where, for whom, then the proof. */
export default function V3Page() {
  return (
    <>
      <ProfileHero />
      <WhereHeWorked />
      <TradeTiles />
      <Firms />
      <ProjectRow projects={projects.filter((project) => project.featured)} />
      <NameOnBoard />
      <Posters />
      <BehindHoardings />
      <ContactBlock />
      <VersionSwitcher current="v3" />
    </>
  )
}
