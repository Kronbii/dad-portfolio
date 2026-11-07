import Link from 'next/link'
import { about, contactBlock, details, onSite, scale, site } from '@/content/site'
import { ContactActions } from '../ContactActions'
import { Inlay } from '../Inlay'
import { Photo } from '../Photo'
import { SectionHead } from '../SectionHead'

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

export function ScaleBand() {
  return (
    <div className="section-gap">
      <div className="border-y border-hair bg-paper py-[clamp(56px,7vw,96px)]">
        <div className="wrap">
          <SectionHead title={scale.title} intro={scale.intro} />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {scale.items.map((item) => (
              <figure key={item.caption} className="m-0">
                <Photo photo={item.photo} ratio="4 / 3" sizes="(max-width: 1024px) 50vw, 300px" className="grayscale-[.45]" />
                <figcaption className="mt-2.5 text-sm text-vein">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
          <Link href="/work/built-to-scale" className="mt-8 inline-block font-semibold text-rosso underline decoration-rosso/40 underline-offset-4 hover:decoration-rosso">
            See the structural work
          </Link>
        </div>
      </div>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="section-gap">
      <div className="wrap grid items-center gap-[clamp(28px,6vw,96px)] md:grid-cols-[.8fr_1.2fr]">
        <Inlay photo={about.photo} ratio="3 / 4" sizes="(max-width: 768px) 100vw, 440px" />
        <div>
          <h2 className="t-h2">{about.title}</h2>
          <p className="t-lede mt-6 max-w-[62ch]">{about.lede}</p>
          <p className="mt-[18px] max-w-[62ch]">{about.body}</p>
          <p className="mt-[18px] text-vein">{about.references}</p>
        </div>
      </div>
    </section>
  )
}

/** Bookends the hero with the same double rule. */
export function ContactBlock() {
  return (
    <div className="wrap section-gap">
      <div id="contact" className="double-rule scroll-mt-6 p-[clamp(36px,6vw,88px)] text-center">
        <h2 className="t-h2 mx-auto max-w-[18ch]">{contactBlock.title}</h2>
        <p className="mx-auto mt-5 max-w-[62ch] text-vein">{contactBlock.text}</p>
        <ContactActions className="mt-8 justify-center" />
        <a href={site.cv.pdf} className="mt-7 inline-block font-medium underline underline-offset-4" download>
          Download his CV (PDF)
        </a>
      </div>
    </div>
  )
}
