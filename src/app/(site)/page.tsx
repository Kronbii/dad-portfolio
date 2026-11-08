import { AboutShort, ContactCard } from '@/components/sections/Closing'
import { AcrossNigeria } from '@/components/sections/AcrossNigeria'
import { BehindHoardings, DetailTiles, OnSite } from '@/components/sections/HomeSections'
import { Posters } from '@/components/sections/Posters'
import { RenderToReality } from '@/components/sections/RenderToReality'
import { ProjectBands, Reel } from '@/components/sections/Showreel'
import { TradeTiles } from '@/components/sections/TradeTiles'
import { projects } from '@/content/projects'
import { renderToReality } from '@/content/site'

export default function HomePage() {
  return (
    <>
      <Reel />
      <AcrossNigeria />
      <TradeTiles />
      <ProjectBands projects={projects.filter((project) => project.featured)} />
      <Posters />
      <RenderToReality content={renderToReality} />
      <DetailTiles />
      <OnSite />
      <BehindHoardings />
      <AboutShort />
      <ContactCard />
    </>
  )
}
