import type { Metadata } from 'next'
import { ContactBlock } from '@/components/sections/HomeSections'
import { RenderToReality } from '@/components/sections/RenderToReality'
import { BehindHoardings, NameOnBoard, Posters, TradeTiles } from '@/components/variations/LikedSections'
import { ProjectBands, Reel } from '@/components/variations/Showreel'
import { VersionSwitcher } from '@/components/VersionSwitcher'
import { projects } from '@/content/projects'

export const metadata: Metadata = {
  title: 'Design v2: Showreel',
  robots: { index: false, follow: false },
  alternates: { canonical: '/' },
}

/** v1 with the hero turned into a showreel: one line, one frame, five finished rooms. */
export default function V2Page() {
  return (
    <>
      <Reel />
      <TradeTiles />
      <ProjectBands projects={projects.filter((project) => project.featured)} />
      <Posters />
      <RenderToReality />
      <NameOnBoard />
      <BehindHoardings />
      <ContactBlock />
      <VersionSwitcher current="v2" />
    </>
  )
}
