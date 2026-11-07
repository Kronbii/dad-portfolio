import Link from 'next/link'
import { site } from '@/content/site'
import type { Photo as PhotoType, Project } from '@/content/types'
import { WhatsAppButton, btnLine } from '../ContactActions'
import { Inlay } from '../Inlay'
import { Photo } from '../Photo'
import { CyclingGrid } from './CyclingGrid'
import { WorkMap, type City } from './WorkMap'
import styles from './variations.module.css'

const p = (src: string, alt: string): PhotoType => ({ src, alt })

// Each corner of the grid keeps to one kind of work, so the swaps read as "more of the same quality".
const slots: PhotoType[][] = [
  [p('marble-interiors/dome-ceiling', 'Dome ceiling with radiating mouldings'), p('marble-interiors/stained-glass-lit', 'Backlit stained-glass ceiling'), p('marble-interiors/cove-ceiling', 'Ceiling with cove lighting')],
  [p('marble-interiors/onyx-bath', 'Honey onyx and white marble bathroom'), p('marble-interiors/bath-rose-marble', 'Rose marble bathroom'), p('marble-interiors/shower-grey', 'Grey marble shower')],
  [p('lagoon-residence/lagoon-pool', 'Pool and gazebos above the lagoon'), p('finishes/mosaic-pool', 'Pool with blue mosaic steps'), p('lagoon-residence/terraces-gazebo', 'Curving balustrades around a gazebo')],
  [p('marble-interiors/medallion-floor', 'Gold medallion inlaid in a marble floor'), p('marble-interiors/marble-staircase', 'Marble staircase with an inlaid border'), p('marble-interiors/parquet', 'Parquet in a geometric pattern')],
]

const corners = ['left-[9px] top-[9px]', 'left-[calc(100%-9px)] top-[9px]', 'left-[9px] top-[calc(100%-9px)]', 'left-[calc(100%-9px)] top-[calc(100%-9px)]']

/** The opening as a company profile: one line, two actions, and a grid of his rooms that keeps changing. */
export function ProfileHero() {
  return (
    <div className="wrap" id="top">
      <div className="relative mt-2 p-[clamp(24px,4.5vw,64px)]">
        <div className="hero-frame" aria-hidden />
        <div className="hero-frame-inner" aria-hidden />
        {corners.map((pos) => (
          <span key={pos} className={`hero-corner ${pos}`} aria-hidden />
        ))}
        <div className="relative grid items-center gap-[clamp(28px,5vw,80px)] md:grid-cols-[1fr_1fr]">
          <div>
            <p className="hero-rise mb-[22px] text-[15px] font-semibold text-rosso">{site.company.name}</p>
            <h1 className="hero-rise hero-rise-2 t-h1 max-w-[12ch]">Finishing for villas and large buildings.</h1>
            <div className="hero-rise hero-rise-3 mt-9 flex flex-wrap gap-3">
              <WhatsAppButton />
              <a className={btnLine} href={site.cv.pdf} download>
                Download his CV
              </a>
            </div>
          </div>
          <CyclingGrid slots={slots.map((photos) => photos.map((photo, i) => <Photo key={photo.src} photo={photo} sizes="(max-width: 768px) 45vw, 280px" priority={i === 0} />))} />
        </div>
      </div>
    </div>
  )
}

const cities: (City & { photo: PhotoType })[] = [
  { name: 'Lagos', work: 'Lagoon-front residence, marble interiors, villa structures', x: 36, y: 310, photo: p('lagoon-residence/terraces-from-above', 'Terraces, gazebos and pool above the lagoon') },
  { name: 'Ibadan', work: 'Event hall and a guest house', x: 56, y: 273, photo: p('event-hall/hall-stage', 'Event hall with a polished checkered floor and stage') },
  { name: 'Ogbomosho', work: 'Waffle slab', x: 70, y: 243, labelAbove: true, photo: p('built-to-scale/waffle-slab', 'Waffle slab formwork') },
  { name: 'Lokoja', work: 'Three-storey building', x: 170, y: 256, photo: p('built-to-scale/lokoja-building', 'Three-storey building in Lokoja') },
  { name: 'Abuja', work: "Round restaurant, house finishing and a women's spa", x: 200, y: 206, photo: p('built-to-scale/restaurant-walls', 'Walls of the round restaurant going up') },
  { name: 'Kano', work: 'Box culverts at Makarfi', x: 241, y: 88, photo: p('built-to-scale/culverts-formwork', 'Timber formwork for box culverts') },
]

export function WhereHeWorked() {
  return (
    <section id="map" className="section-gap">
      <div className="wrap">
        <h2 className="t-h2 mb-8 md:mb-4">Across Nigeria</h2>
        <WorkMap
          cities={cities.map(({ name, work, x, y, labelAbove }) => ({ name, work, x, y, labelAbove }))}
          photos={cities.map((city) => <Photo key={city.name} photo={city.photo} sizes="(max-width: 900px) 40vw, 400px" />)}
        />
      </div>
    </section>
  )
}

// From his CV. To confirm with him before any of this goes live.
const firms = ['Console Consultant', 'Unicane', 'Gazco Construction', 'KRAFT Construction', 'Jet Ceramics']

export function Firms() {
  return (
    <section className="section-gap">
      <div className="wrap">
        <h2 className="t-h3 text-vein">Finishing for consultants and construction firms, including</h2>
        <ul className={styles.firms}>
          {firms.map((firm) => (
            <li key={firm}>{firm}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ProjectRow({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="section-gap">
      <div className="wrap">
        <h2 className="t-h2 mb-10 md:mb-14">Selected work</h2>
        <ul className={styles.projectRow}>
          {projects.map((project) => {
            const [title, place] = project.title.split(', ')
            return (
              <li key={project.slug}>
                <Link href={`/work/${project.slug}`}>
                  <Inlay photo={project.cover} ratio="3 / 4" small sizes="(max-width: 900px) 100vw, 400px" />
                  <h3 className={styles.rowTitle}>{title}</h3>
                  {place && <p className={styles.rowPlace}>{place}</p>}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
