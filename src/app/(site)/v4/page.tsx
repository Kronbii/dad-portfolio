import type { Metadata } from 'next'
import { ContactBlock, DetailTiles } from '@/components/sections/HomeSections'
import { RenderToReality } from '@/components/sections/RenderToReality'
import { BehindHoardings, NameOnBoard, Posters } from '@/components/variations/LikedSections'
import { SidewaysTrades, Wall, WorkStack } from '@/components/variations/PhotoWall'
import { VersionSwitcher } from '@/components/VersionSwitcher'
import { projects } from '@/content/projects'

export const metadata: Metadata = {
  title: 'Design v4: Photo wall',
  robots: { index: false, follow: false },
  alternates: { canonical: '/' },
}

/** v1 opening on a wall of his work, with the trades sliding past and the projects stacking up. */
export default function V4Page() {
  return (
    <>
      <Wall />
      <SidewaysTrades />
      <WorkStack projects={projects.filter((project) => project.featured)} />
      <Posters />
      <DetailTiles />
      <RenderToReality />
      <NameOnBoard />
      <BehindHoardings />
      <ContactBlock />
      <VersionSwitcher current="v4" />
    </>
  )
}
