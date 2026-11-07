import { Hero } from '@/components/sections/Hero'
import { About, ContactBlock, DetailTiles, OnSite, ScaleBand } from '@/components/sections/HomeSections'
import { ProjectFeature } from '@/components/sections/ProjectFeature'
import { RenderToReality } from '@/components/sections/RenderToReality'
import { Steps } from '@/components/sections/Steps'
import { TradeGrid } from '@/components/sections/TradeGrid'
import { SectionHead } from '@/components/SectionHead'
import { projects } from '@/content/projects'
import { madeOnSite } from '@/content/site'

export default function HomePage() {
  const featured = projects.filter((project) => project.featured)
  return (
    <>
      <Hero />
      <TradeGrid />
      <section id="work" className="section-gap">
        <div className="wrap">
          <SectionHead title="Selected work" intro="Private homes and large buildings, finished under his direct management." />
          <div className="flex flex-col gap-[clamp(64px,8vw,112px)]">
            {featured.map((project, i) => (
              <ProjectFeature key={project.slug} project={project} flip={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>
      <Steps id="made" title={madeOnSite.title} intro={madeOnSite.intro} items={madeOnSite.steps} />
      <RenderToReality />
      <DetailTiles />
      <OnSite />
      <ScaleBand />
      <About />
      <ContactBlock />
    </>
  )
}
