import { finishes } from '@/content/site'
import { Photo } from '../Photo'
import styles from './home.module.css'

/** What he finishes, as pictures with names. A second photo crossfades in on hover. */
export function TradeTiles() {
  return (
    <section id="finishes" className="section-gap">
      <div className="wrap">
        <h2 className="t-h2 mb-9 md:mb-12">{finishes.title}</h2>
        <ul className={styles.tiles}>
          {finishes.tiles.map((tile) => (
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
