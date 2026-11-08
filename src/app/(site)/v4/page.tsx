import type { Metadata } from 'next'
import { DetailTiles, OnSite } from '@/components/sections/HomeSections'
import { RenderToReality } from '@/components/sections/RenderToReality'
import { AcrossNigeria } from '@/components/variations/AcrossNigeria'
import { AboutShort, ContactCard } from '@/components/variations/Closing'
import { BehindHoardings, Posters } from '@/components/variations/LikedSections'
import { FeaturedWork, SidewaysTrades, Wall } from '@/components/variations/PhotoWall'
import { VersionSwitcher } from '@/components/VersionSwitcher'
import { projects } from '@/content/projects'
import { terracesRender } from '@/content/site'

export const metadata: Metadata = {
  title: 'Design v4: Photo wall',
  robots: { index: false, follow: false },
  alternates: { canonical: '/' },
}

/** The photo-wall opening, trades sliding sideways and v1's selected work, with the contact as his visiting card. */
export default function V4Page() {
  return (
    <>
      <Wall />
      <AcrossNigeria />
      <SidewaysTrades />
      <FeaturedWork projects={projects.filter((project) => project.featured)} />
      <Posters />
      <RenderToReality content={terracesRender} ratio="4 / 5" position="50% 18%" peek className="max-w-[520px]" />
      <DetailTiles />
      <OnSite />
      <BehindHoardings />
      <AboutShort />
      <ContactCard />
      <VersionSwitcher current="v4" />
    </>
  )
}
