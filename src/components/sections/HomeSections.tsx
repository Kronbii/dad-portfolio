import Link from 'next/link'
import { details, onSite, scale } from '@/content/site'
import { Photo } from '../Photo'
import { SectionHead } from '../SectionHead'
import styles from './home.module.css'

/** Close-ups in tiles with dark grout, like the black borders in his floors. */
export function DetailTiles() {
  return (
    <section id="details" className="section-gap">
      <div className="wrap">
        <SectionHead title={details.title} intro={details.intro} />
        <div className="grid grid-cols-2 gap-[3px] border-[3px] border-ink bg-ink lg:grid-cols-3">
          {details.photos.map((photo) => (
            <Photo key={photo.src} photo={photo} ratio="4 / 5" sizes="(max-width: 1024px) 50vw, 400px" />
          ))}
        </div>
      </div>
    </section>
  )
}

export function OnSite() {
  const [first, ...rest] = onSite.photos
  return (
    <section id="onsite" className="section-gap">
      <div className="wrap">
        <SectionHead title={onSite.title} intro={onSite.intro} />
        <div className="grid grid-cols-2 gap-3.5 md:grid-cols-[1.4fr_1fr_1fr] md:grid-rows-2">
          <Photo photo={first} sizes="(max-width: 768px) 100vw, 480px" className="col-span-2 aspect-square object-[72%_50%] md:col-span-1 md:row-span-2 md:aspect-auto" />
          {rest.map((photo) => (
            <Photo key={photo.src} photo={photo} sizes="(max-width: 768px) 50vw, 340px" className="aspect-[3/4]" />
          ))}
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
          <h2 className="t-h2">{scale.title}</h2>
          <p className={styles.hoardingsLede}>{scale.intro}</p>
        </div>
        <ul className={styles.hoardingsRow}>
          {scale.items.map((item) => (
            <li key={item.caption}>
              <Photo photo={item.photo} ratio="4 / 3" sizes="(max-width: 900px) 50vw, 300px" />
              <span>{item.caption}</span>
            </li>
          ))}
        </ul>
        <Link href={scale.link.href} className={styles.hoardingsLink}>
          {scale.link.label}
        </Link>
      </div>
    </section>
  )
}
