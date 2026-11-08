import type { Metadata } from 'next'
import { DetailTiles, OnSite } from '@/components/sections/HomeSections'
import { RenderToReality } from '@/components/sections/RenderToReality'
import { AcrossNigeria } from '@/components/variations/AcrossNigeria'
import { AboutShort, ContactWhatsApp } from '@/components/variations/Closing'
import { BehindHoardings, Posters, TradeTiles } from '@/components/variations/LikedSections'
import { ProjectBands, Reel } from '@/components/variations/Showreel'
import { VersionSwitcher } from '@/components/VersionSwitcher'
import { projects } from '@/content/projects'
import { terracesRender } from '@/content/site'

export const metadata: Metadata = {
  title: 'Design v2: Showreel',
  robots: { index: false, follow: false },
  alternates: { canonical: '/' },
}

/** The showreel opening, trade tiles and project bands, with the contact as a WhatsApp chat. */
export default function V2Page() {
  return (
    <>
      <Reel />
      <AcrossNigeria />
      <TradeTiles />
      <ProjectBands projects={projects.filter((project) => project.featured)} />
      <Posters />
      <RenderToReality content={terracesRender} ratio="4 / 5" position="50% 18%" peek className="max-w-[520px]" />
      <DetailTiles />
      <OnSite />
      <BehindHoardings />
      <AboutShort />
      <ContactWhatsApp />
      <VersionSwitcher current="v2" />
    </>
  )
}
