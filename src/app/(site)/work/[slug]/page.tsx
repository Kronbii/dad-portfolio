import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FactValue, Facts, isShown } from '@/components/FactValue'
import { GalleryGrid } from '@/components/GalleryGrid'
import { Inlay } from '@/components/Inlay'
import { Lightbox } from '@/components/Lightbox'
import { Photo } from '@/components/Photo'
import { ContactCard } from '@/components/sections/Closing'
import { Steps } from '@/components/sections/Steps'
import { getProject, projects } from '@/content/projects'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps<'/work/[slug]'>): Promise<Metadata> {
  const project = getProject((await params).slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, images: [{ url: `/images/${project.cover.src}.jpg` }] },
  }
}

export default async function ProjectPage({ params }: PageProps<'/work/[slug]'>) {
  const project = getProject((await params).slug)
  if (!project) notFound()
  const others = projects.filter((p) => p.slug !== project.slug)

  return (
    <>
      <div className="wrap">
        <Link href="/#work" className="text-[15px] font-medium text-vein no-underline hover:text-rosso">
          All work
        </Link>
        <div className="mt-6 grid items-center gap-[clamp(28px,5vw,80px)] md:grid-cols-[1.1fr_.9fr]">
          <div>
            <h1 className="t-h1 max-w-[16ch]">{project.title}</h1>
            <p className="t-lede mt-6 max-w-[62ch]">{project.summary}</p>
            <Facts items={project.facts} />
          </div>
          <Inlay photo={project.cover} ratio="4 / 5" priority reveal={false} sizes="(max-width: 768px) 100vw, 520px" />
        </div>

        <div className="section-gap mx-auto max-w-[62ch] space-y-5 text-[18px] leading-[1.7]">
          {project.story.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </div>

      {project.steps && <Steps title={project.steps.title} intro={project.steps.intro} items={project.steps.items} />}

      {project.onSite && (
        <section className="section-gap">
          <div className="wrap">
            <h2 className="t-h2 mb-9 md:mb-12">On site</h2>
            <div
              className="grid grid-cols-2 gap-3.5 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
              style={{ '--cols': project.onSite.length } as React.CSSProperties}
            >
              {project.onSite.map((photo) => (
                <Photo key={photo.src} photo={photo} ratio="3 / 4" sizes="(max-width: 768px) 50vw, 290px" />
              ))}
            </div>
          </div>
        </section>
      )}

      {project.gallery.map((section) => (
        <section key={section.title} className="section-gap">
          <div className="wrap">
            <div className="mb-8 md:mb-10">
              <h2 className="t-h2">{section.title}</h2>
              {isShown(section.text) && (
                <p className="mt-4 max-w-[62ch] text-vein">
                  <FactValue value={section.text} />
                </p>
              )}
            </div>
            <GalleryGrid id={section.title} photos={section.photos} />
          </div>
        </section>
      ))}

      <section className="section-gap">
        <div className="wrap">
          <h2 className="t-h2 mb-8">More work</h2>
          <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} className="group block no-underline">
                  <Inlay photo={p.cover} small ratio="4 / 3" sizes="(max-width: 640px) 100vw, 380px" />
                  <span className="t-h3 mt-4 block group-hover:text-rosso">{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCard />
      <Lightbox />
    </>
  )
}
