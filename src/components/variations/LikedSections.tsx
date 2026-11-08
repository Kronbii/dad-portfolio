import Link from 'next/link'
import { finishes, madeOnSite, madeOnSitePosters, scale } from '@/content/site'
import type { Photo as PhotoType } from '@/content/types'
import { Marked } from '../Marked'
import { Photo } from '../Photo'
import styles from './variations.module.css'

const tilts = [-2.2, 1.4, -0.8, 2, -1.6, 0.9]

/** "Made on site, not imported": the balustrade steps pasted up like posters, each with what happened at that step. */
export function Posters() {
  return (
    <section id="made" className={styles.posters}>
      <div className="wrap">
        <div className={styles.postersHead}>
          <h2 className="t-h2">
            <Marked text={madeOnSitePosters.title} mark={madeOnSitePosters.mark} draw="scroll" />
          </h2>
          <div className={styles.postersWhy}>
            <p>{madeOnSitePosters.why}</p>
            <p>{madeOnSitePosters.how}</p>
          </div>
        </div>
        <ol className={styles.posterWall}>
          {madeOnSite.steps.map((step, i) => (
            <li key={step.title} className={styles.poster} style={{ '--tilt': `${tilts[i]}deg` } as React.CSSProperties}>
              <Photo photo={step.photo} ratio="4 / 5" sizes="(max-width: 900px) 45vw, 340px" />
              <p className={styles.posterTitle}>
                <span>{i + 1}</span>
                {step.title}
              </p>
              <p className={styles.posterText}>{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 md:mt-14">
          <Link href={madeOnSitePosters.link.href} className={styles.bandLink}>
            {madeOnSitePosters.link.label}
          </Link>
        </p>
      </div>
    </section>
  )
}

/** "Behind other hoardings": the structural work, quiet and dark, colour returning under the pointer. */
export function BehindHoardings() {
  return (
    <section className={styles.hoardings}>
      <div className="wrap">
        <div className="grid items-end gap-x-16 gap-y-5 md:grid-cols-2">
          <h2 className="t-h2">Behind other hoardings</h2>
          <p className={styles.hoardingsLede}>The structure is usually by others. I have run that too, from pile foundations on the Lagos lagoon to box culverts in Kano.</p>
        </div>
        <ul className={styles.hoardingsRow}>
          {scale.items.map((item) => (
            <li key={item.caption}>
              <Photo photo={item.photo} ratio="4 / 3" sizes="(max-width: 900px) 50vw, 300px" />
              <span>{item.caption}</span>
            </li>
          ))}
        </ul>
        <Link href="/work/built-to-scale" className={styles.hoardingsLink}>
          See the structural work
        </Link>
      </div>
    </section>
  )
}

type Tile = { name: string; photo: PhotoType; second: PhotoType }
const p = (src: string, alt: string): PhotoType => ({ src, alt })

export const tiles: Tile[] = [
  { name: 'Marble and stone', photo: p('marble-interiors/onyx-bath', 'Onyx and white marble panels with ornamental borders'), second: p('marble-interiors/medallion-square', 'Square marble medallion in a red and grey border') },
  { name: 'Bathrooms and spas', photo: p('marble-interiors/master-bath', 'Master bathroom with lit niches'), second: p('marble-interiors/shower-carrara', 'White veined marble shower with a bench') },
  { name: 'Ceilings', photo: p('marble-interiors/stained-glass', 'Backlit stained-glass ceiling'), second: p('marble-interiors/dome-ceiling', 'Dome ceiling with radiating mouldings') },
  { name: 'Floors', photo: p('marble-interiors/parquet', 'Parquet in a geometric pattern'), second: p('marble-interiors/floor-diamond-grid', 'Marble floor with a diamond grid of inlays') },
  { name: 'Pools', photo: p('finishes/mosaic-pool', 'Pool with blue mosaic steps'), second: p('lagoon-residence/pool-paving', 'Pool with crazy-paving surround and gazebos') },
  { name: 'Water features', photo: p('finishes/water-wall', 'Stone water wall lit at night'), second: p('lagoon-residence/entrance-built', 'Entrance with a fountain bed') },
  { name: 'Facades and balustrades', photo: p('lagoon-residence/stair-balustrade', 'Exterior stair with white balustrades'), second: p('lagoon-residence/arches-facade', 'White arched facade') },
  { name: 'Interior design', photo: p('finishes/kitchen-drawing', '3D design drawing of a kitchen'), second: p('lagoon-residence/entrance-render', 'Render of a villa entrance') },
]

/** What he finishes, as pictures with names. A second photo crossfades in on hover. */
export function TradeTiles({ title = finishes.title }: { title?: string }) {
  return (
    <section id="finishes" className="section-gap">
      <div className="wrap">
        <h2 className="t-h2 mb-9 md:mb-12">{title}</h2>
        <ul className={styles.tiles}>
          {tiles.map((tile) => (
            <li key={tile.name} className={styles.tile}>
              <div className="inlay inlay-sm scoop">
                <div className="inlay-gap scoop">
                  <div className={`inlay-media scoop ${styles.tileMedia}`}>
                    <Photo photo={tile.photo} ratio="3 / 4" sizes="(max-width: 900px) 45vw, 280px" />
                    <Photo photo={tile.second} ratio="3 / 4" sizes="(max-width: 900px) 45vw, 280px" className={styles.tileSecond} />
                  </div>
                </div>
              </div>
              <h3 className="t-h3 mt-4">{tile.name}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
