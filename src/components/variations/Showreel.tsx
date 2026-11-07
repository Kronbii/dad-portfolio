import Link from 'next/link'
import { hero, site } from '@/content/site'
import type { Photo as PhotoType, Project } from '@/content/types'
import { WhatsAppButton, btnLine } from '../ContactActions'
import { Inlay } from '../Inlay'
import { Photo } from '../Photo'
import styles from './variations.module.css'

const p = (src: string, alt: string): PhotoType => ({ src, alt })

const scenes = [
  { photo: hero.photo, caption: 'Dome ceiling, private residence' },
  { photo: p('marble-interiors/onyx-bath', 'Honey onyx and white marble wall panels with ornamental black borders'), caption: 'Onyx and marble bathroom' },
  { photo: p('lagoon-residence/lagoon-pool', 'Pool, thatched gazebos and curved balustrades on a terrace above the Lagos lagoon'), caption: 'Pool and terraces above the lagoon' },
  { photo: p('marble-interiors/marble-staircase', 'Marble staircase with an inlaid floor border at its foot'), caption: 'Marble staircase and inlaid floor' },
  { photo: p('marble-interiors/stained-glass-lit', 'Backlit stained-glass ceiling glowing above a hall'), caption: 'Stained-glass ceiling' },
]

const corners = ['left-[9px] top-[9px]', 'left-[calc(100%-9px)] top-[9px]', 'left-[9px] top-[calc(100%-9px)]', 'left-[calc(100%-9px)] top-[calc(100%-9px)]']

/** v1's framed hero, held still while five finished rooms dissolve through the inlay as you scroll. */
export function Reel() {
  return (
    <div className={styles.reel} id="top">
      <div className={styles.reelSticky}>
        <div className="wrap w-full">
          <div className={styles.reelFrame}>
            <div className="hero-frame" aria-hidden />
            <div className="hero-frame-inner" aria-hidden />
            {corners.map((pos) => (
              <span key={pos} className={`hero-corner ${pos}`} aria-hidden />
            ))}
            <div className={styles.reelGrid}>
              <div>
                <p className="hero-rise mb-[22px] text-[15px] font-semibold text-rosso">{site.role}</p>
                <h1 className="hero-rise hero-rise-2 t-h1 max-w-[13ch]">{hero.headline}</h1>
                <div className="hero-rise hero-rise-3 mt-9 flex flex-wrap gap-3">
                  <WhatsAppButton />
                  <Link className={`${btnLine} max-md:hidden`} href="#work">
                    See his work
                  </Link>
                </div>
              </div>
              <div className={styles.reelInlay}>
                <div className="inlay scoop">
                  <div className="inlay-gap scoop">
                    <div className={`inlay-media scoop ${styles.reelStage}`}>
                      {scenes.map((scene, i) => (
                        <div key={scene.photo.src} className={styles.scene} style={{ '--i': i } as React.CSSProperties}>
                          <Photo photo={scene.photo} sizes="(max-width: 900px) 70vw, 460px" priority={i === 0} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.reelCaption}>
                  <p className={styles.captions}>
                    {scenes.map((scene, i) => (
                      <span key={scene.caption} style={{ '--i': i } as React.CSSProperties} aria-hidden={i > 0}>
                        {scene.caption}
                      </span>
                    ))}
                  </p>
                  <span className={styles.marks} aria-hidden>
                    {scenes.map((scene, i) => (
                      <i key={scene.caption} style={{ '--i': i } as React.CSSProperties} />
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Selected work as two framed photos and a name. The page behind the link carries the story. */
export function ProjectBands({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="section-gap">
      <div className="wrap">
        <h2 className="t-h2 mb-10 md:mb-14">Selected work</h2>
        <div className={styles.bands}>
          {projects.map((project) => {
            const [title, place] = project.title.split(', ')
            return (
              <article key={project.slug} className={styles.band}>
                <Inlay photo={project.cover} ratio="4 / 5" sizes="(max-width: 900px) 50vw, 440px" />
                <Inlay photo={project.thumbs[0]} ratio="4 / 5" small sizes="(max-width: 900px) 50vw, 440px" className="mb-[12%]" />
                <div className={styles.bandText}>
                  <h3 className={styles.bandTitle}>{title}</h3>
                  {place && <p className={styles.bandPlace}>{place}</p>}
                  <Link href={`/work/${project.slug}`} className={styles.bandLink}>
                    See the project
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
