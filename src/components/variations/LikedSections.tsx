import Link from 'next/link'
import { madeOnSite, onSite, scale, site } from '@/content/site'
import type { Photo as PhotoType } from '@/content/types'
import { Inlay } from '../Inlay'
import { Photo } from '../Photo'
import styles from './variations.module.css'

const tilts = [-2.2, 1.4, -0.8, 2, -1.6, 0.9]

/** "Made on site, not imported": the balustrade steps pasted up like posters, in v1's paper and rosso. */
export function Posters() {
  return (
    <section id="made" className={styles.posters}>
      <div className="wrap">
        <div className={styles.postersHead}>
          <h2 className="t-h2">Made on site, not imported.</h2>
          <p className="max-w-[52ch] text-vein">Every baluster and curved coping on the lagoon-front residence was made on site, from a profile drawn for the house.</p>
        </div>
        <ol className={styles.posterWall}>
          {madeOnSite.steps.map((step, i) => (
            <li key={step.title} className={styles.poster} style={{ '--tilt': `${tilts[i]}deg` } as React.CSSProperties}>
              <Photo photo={step.photo} ratio="4 / 5" sizes="(max-width: 900px) 45vw, 340px" />
              <p className={styles.posterTitle}>
                <span>{i + 1}</span>
                {step.title}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/** "The name on the board is on the site every day": portrait, three site photos, one line about him. */
export function NameOnBoard() {
  const strip: PhotoType[] = [onSite.photos[0], onSite.photos[2], onSite.photos[4]]
  return (
    <section id="about" className="section-gap">
      <div className={`wrap ${styles.board}`}>
        <Inlay photo={{ src: 'him/portrait-lagoon', alt: 'Mahmoud Kronbi in a hard hat on a balcony above the lagoon' }} ratio="3 / 4" sizes="(max-width: 768px) 100vw, 460px" />
        <div>
          <h2 className="t-h2 max-w-[16ch]">The name on the board is on the site every day.</h2>
          <p className="t-lede mt-5 max-w-[46ch]">He checks every slab, line and joint himself.</p>
          <ul className={styles.boardStrip}>
            {strip.map((photo) => (
              <li key={photo.src}>
                <Photo photo={photo} ratio="3 / 4" sizes="(max-width: 768px) 30vw, 180px" />
              </li>
            ))}
          </ul>
          <p className={styles.boardAbout}>
            Lebanese, more than twenty years in Nigeria. Runs {site.company.name} (RC {site.company.rc}). Speaks English, Arabic and French.
          </p>
        </div>
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
          <p className={styles.hoardingsLede}>The structure is usually by others. He has run that too, from pile foundations on the Lagos lagoon to box culverts in Kano.</p>
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
export function TradeTiles({ title = 'What he finishes' }: { title?: string }) {
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
