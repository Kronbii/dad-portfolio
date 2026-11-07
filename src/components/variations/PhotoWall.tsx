import Link from 'next/link'
import { hero, site } from '@/content/site'
import type { Photo as PhotoType, Project } from '@/content/types'
import { WhatsAppButton, btnLine } from '../ContactActions'
import { Inlay } from '../Inlay'
import { Photo } from '../Photo'
import { tiles } from './LikedSections'
import styles from './variations.module.css'

const m = (name: string, alt: string): PhotoType => ({ src: `marble-interiors/${name}`, alt })
const l = (name: string, alt: string): PhotoType => ({ src: `lagoon-residence/${name}`, alt })
const f = (name: string, alt: string): PhotoType => ({ src: `finishes/${name}`, alt })

// Four columns of finished work. Phones show the first two.
const columns: PhotoType[][] = [
  [hero.photo, m('shower-carrara', 'White veined marble shower with a bench'), l('terrace-lagoon', 'Curving balustrade terrace beside the lagoon'), m('floor-inlay-onyx', 'Onyx inlay set into a marble floor')],
  [m('onyx-bath', 'Honey onyx and white marble wall panels'), l('lagoon-pool', 'Pool and thatched gazebos above the lagoon'), m('medallion-floor', 'Gold medallion inlaid in a cream marble floor'), m('stained-glass-lit', 'Backlit stained-glass ceiling')],
  [m('marble-staircase', 'Marble staircase with an inlaid border at its foot'), f('mosaic-pool', 'Pool with blue mosaic steps'), m('parquet', 'Parquet laid in a geometric pattern'), m('bath-rose-marble', 'Rose marble bathroom')],
  [f('water-wall', 'Stone water wall lit at night'), m('master-bath', 'Master bathroom with lit niches'), l('stair-balustrade', 'Exterior stair with white balustrades'), m('marble-corridor', 'Long marble corridor with an inlaid border')],
]

/** A wall of his finished rooms that assembles on load and drifts as you scroll, with a plaque bearing his line. */
export function Wall() {
  return (
    <div className={styles.wall} id="top">
      <div className={styles.wallCols} aria-hidden>
        {columns.map((photos, c) => (
          <div key={c} className={styles.wallCol}>
            {photos.map((photo, r) => (
              <div key={photo.src} className={`inlay inlay-sm scoop ${styles.wallTile}`} style={{ '--d': r * 4 + c } as React.CSSProperties}>
                <div className="inlay-gap scoop">
                  <div className="inlay-media scoop">
                    <Photo photo={photo} ratio="3 / 4" sizes="(max-width: 900px) 50vw, 25vw" priority={r === 0} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.wallVeil} aria-hidden />
      <div className={`double-rule ${styles.plaque}`}>
        <p className="mb-4 text-[15px] font-semibold text-rosso">{site.role}</p>
        <h1 className={styles.plaqueTitle}>{hero.headline}</h1>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <WhatsAppButton />
          <Link className={btnLine} href="#work">
            See his work
          </Link>
        </div>
      </div>
    </div>
  )
}

/** What he finishes, held in place while the row of trades slides past. */
export function SidewaysTrades() {
  return (
    <section id="finishes" className={styles.sideways}>
      <div className={styles.sidewaysSticky}>
        <ul className={styles.sidewaysTrack}>
          <li className={styles.sidewaysTitle}>
            <h2 className="t-h2">What he finishes</h2>
            <p className="mt-4 max-w-[30ch] text-vein">Inside and out, from the first tile to the final polish.</p>
          </li>
          {tiles.map((tile) => (
            <li key={tile.name}>
              <Inlay photo={tile.photo} ratio="3 / 4" small reveal={false} sizes="(max-width: 900px) 70vw, 360px" />
              <h3 className={styles.sidewaysName}>{tile.name}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Selected work as paper cards that stack as you scroll: three photos and a name each. */
export function WorkStack({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="section-gap">
      <div className="wrap">
        <h2 className="t-h2 mb-10 md:mb-14">Selected work</h2>
        <div className={styles.stack}>
          {projects.map((project, i) => (
            <article key={project.slug} className={styles.stackCard} style={{ '--i': i } as React.CSSProperties}>
              <Inlay photo={project.cover} small sizes="(max-width: 900px) 50vw, 460px" reveal={false} />
              <Inlay photo={project.thumbs[0]} small sizes="(max-width: 900px) 50vw, 360px" reveal={false} />
              <Inlay photo={project.thumbs[1] ?? project.thumbs[0]} small sizes="360px" reveal={false} />
              <div className={styles.stackText}>
                <h3 className="t-h3">{project.title}</h3>
                <Link href={`/work/${project.slug}`} className={styles.bandLink}>
                  See the project
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
