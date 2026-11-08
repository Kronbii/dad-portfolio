import Link from 'next/link'
import { madeOnSite, madeOnSitePosters } from '@/content/site'
import { Marked } from '../Marked'
import { Photo } from '../Photo'
import styles from './home.module.css'

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
