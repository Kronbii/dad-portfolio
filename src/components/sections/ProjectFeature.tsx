import Link from 'next/link'
import type { Project } from '@/content/types'
import { cn } from '@/lib/utils'
import { Facts } from '../FactValue'
import { Inlay } from '../Inlay'
import { Photo } from '../Photo'

/** A project on the home page: framed cover and thumbnails on one side, facts on the other. */
export function ProjectFeature({ project, flip }: { project: Project; flip?: boolean }) {
  return (
    <article className="grid items-start gap-[clamp(28px,5vw,72px)] md:grid-cols-[1.1fr_.9fr]">
      <div className={cn(flip && 'md:order-2')}>
        <Link href={`/work/${project.slug}`} aria-label={`${project.title}: see the project`} className="block">
          <Inlay photo={project.cover} ratio="4 / 5" sizes="(max-width: 768px) 100vw, 580px" />
        </Link>
        <div className="mt-3 grid auto-cols-fr grid-flow-col gap-3">
          {project.thumbs.map((thumb) => (
            <Photo key={thumb.src} photo={thumb} ratio="1 / 1" sizes="(max-width: 768px) 33vw, 190px" />
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-display text-[clamp(28px,3vw,38px)] leading-[1.15]">
          <Link href={`/work/${project.slug}`} className="no-underline hover:text-rosso">
            {project.title}
          </Link>
        </h3>
        <p className="mt-[18px] max-w-[62ch]">{project.summary}</p>
        <Facts items={project.facts} />
        <Link href={`/work/${project.slug}`} className="mt-7 inline-block font-semibold text-rosso underline decoration-rosso/40 underline-offset-4 hover:decoration-rosso">
          See the project
        </Link>
      </div>
    </article>
  )
}
