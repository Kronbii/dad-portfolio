import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ContactActions'
import { Seam } from '@/components/v4/Seam'
import styles from '@/components/v4/v4.module.css'
import { madeOnSite, onSite, scale, site } from '@/content/site'
import type { Photo } from '@/content/types'
import { pairs } from '@/content/versions'
import { resolvePhoto } from '@/lib/photos'

function Fill({ photo, sizes, className, priority }: { photo: Photo; sizes: string; className?: string; priority?: boolean }) {
  const img = resolvePhoto(photo)
  return <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes={sizes} priority={priority} placeholder="blur" blurDataURL={img.blurDataURL} className={className ?? styles.fill} />
}

const tilts = [-2.2, 1.4, -0.8, 2, -1.6, 0.9]

export default function V4Home() {
  return (
    <main className={styles.page}>
      {/* The hoarding: zinc on one side of the seam, marble on the other */}
      <section className={styles.hero} aria-labelledby="v4-title">
        <h1 id="v4-title" className={styles.srOnly}>
          Anyone can put a building up. Mahmoud Kronbi makes it beautiful.
        </h1>
        <Seam
          auto={false}
          start={52}
          label="Move the seam between the raw hoarding and the finished marble"
          className={styles.heroSeam}
          raw={
            <div className={styles.zinc}>
              <p className={styles.heroRaw} aria-hidden>
                Anyone can put a building up.
              </p>
              <p className={styles.sprayNote} aria-hidden>
                Drag the seam
              </p>
            </div>
          }
          finished={
            <div className={styles.marble}>
              <p className={styles.heroFinished} aria-hidden>
                He makes it beautiful.
              </p>
              <p className={styles.heroBy}>
                {site.name}
                <span>Finishing contractor, Lagos</span>
              </p>
            </div>
          }
        />
      </section>

      {/* The contractor's signboard, as it stands at the gate of every Lagos site */}
      <section className={styles.signWrap} aria-labelledby="v4-sign">
        <div className={styles.signboard}>
          <h2 id="v4-sign" className={styles.signTitle}>
            Finishing works
          </h2>
          <dl className={styles.signRows}>
            <div>
              <dt>Project</dt>
              <dd>The finishing of your building</dd>
            </div>
            <div>
              <dt>Structure</dt>
              <dd>By others</dd>
            </div>
            <div>
              <dt>Finishing contractor</dt>
              <dd>
                {site.name}, {site.company.name} (RC {site.company.rc})
              </dd>
            </div>
            <div>
              <dt>Works</dt>
              <dd>Marble and stone, bathrooms, ceilings, floors, pools, facades and landscape</dd>
            </div>
            <div>
              <dt>Experience</dt>
              <dd>More than twenty years across Nigeria</dd>
            </div>
            <div>
              <dt>Telephone</dt>
              <dd>
                <a href={site.contact.phone.href}>{site.contact.phone.label}</a>
              </dd>
            </div>
          </dl>
          <div className={styles.signActions}>
            <a href={site.contact.whatsapp} className={styles.btnPaint}>
              <WhatsAppIcon />
              WhatsApp the contractor
            </a>
            <a href={site.contact.phone.href} className={styles.btnLine}>
              <Phone aria-hidden />
              Call
            </a>
          </div>
        </div>
        <div className={styles.posts} aria-hidden>
          <span />
          <span />
        </div>
      </section>

      {/* Raw and finished, one panel per job, laid out off-centre */}
      <section className={styles.pairs} aria-labelledby="v4-pairs">
        <h2 id="v4-pairs" className={styles.sectionTitle}>
          <span className={styles.stencilWord}>Raw</span> behind, finished in front.
        </h2>
        <p className={styles.lede}>Each panel opens as you scroll past it. Take hold of the seam to look for yourself.</p>
        {pairs.map((pair, i) => (
          <article key={pair.title} className={`${styles.pair} ${i % 2 ? styles.pairRight : styles.pairLeft}`}>
            <Seam
              label={`${pair.title}: move the seam between raw and finished`}
              className={styles.pairSeam}
              raw={
                <div className={styles.rawFrame}>
                  <Fill photo={pair.raw} sizes="(max-width: 900px) 100vw, 70vw" className={styles.rawImg} />
                  <span className={styles.rawTag}>Raw</span>
                </div>
              }
              finished={
                <div className={styles.finFrame}>
                  <Fill photo={pair.finished} sizes="(max-width: 900px) 100vw, 70vw" />
                  <span className={styles.finTag}>Finished</span>
                </div>
              }
            />
            <div className={styles.pairCaption}>
              <h3 className={styles.pairTitle}>{pair.title}</h3>
              <p>
                <span className={styles.capRaw}>Raw:</span> {pair.rawCaption}.
                <br />
                <span className={styles.capFin}>Finished:</span> {pair.finishedCaption}.
              </p>
              <Link href={pair.href} className={styles.pairLink}>
                See the project
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* Made on site: the balustrade, pasted up on the hoarding */}
      <section className={styles.posters} aria-labelledby="v4-made">
        <div className={styles.postersHead}>
          <h2 id="v4-made" className={styles.posterTitle}>
            Made on site, not imported.
          </h2>
          <p className={styles.postersLede}>{madeOnSite.intro}</p>
        </div>
        <ol className={styles.posterWall}>
          {madeOnSite.steps.map((step, i) => (
            <li key={step.title} className={styles.poster} style={{ '--tilt': `${tilts[i]}deg` } as React.CSSProperties}>
              <Fill photo={step.photo} sizes="(max-width: 900px) 46vw, 300px" className={styles.posterImg} />
              <p className={styles.posterStep}>
                <span>{i + 1}</span> {step.title}
              </p>
              <p className={styles.posterText}>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* The man named on the board */}
      <section className={styles.man} aria-labelledby="v4-man">
        <div className={styles.manPhoto}>
          <Fill photo={{ src: 'him/portrait-lagoon', alt: 'Mahmoud Kronbi in a hard hat on a balcony above the lagoon' }} sizes="(max-width: 900px) 100vw, 42vw" />
        </div>
        <div className={styles.manCopy}>
          <h2 id="v4-man" className={styles.sectionTitle}>
            The name on the board is on the site every day.
          </h2>
          <p className={styles.lede}>{onSite.intro}</p>
          <ul className={styles.manStrip}>
            {[onSite.photos[0], onSite.photos[2], onSite.photos[4]].map((photo) => (
              <li key={photo.src}>
                <Fill photo={photo} sizes="(max-width: 900px) 30vw, 160px" />
              </li>
            ))}
          </ul>
          <p className={styles.manAbout}>
            He came to Nigeria from Lebanon and has worked in Lagos, Abuja, Ibadan, Kano, Lokoja and Ogbomosho. He runs {site.company.name} and speaks English,
            Arabic and French.
          </p>
        </div>
      </section>

      {/* Behind other hoardings: the structure he has run */}
      <section className={styles.structure} aria-labelledby="v4-structure">
        <h2 id="v4-structure" className={styles.structureTitle}>
          Behind other hoardings
        </h2>
        <p className={styles.structureLede}>{scale.intro}</p>
        <ul className={styles.structureRow}>
          {scale.items.map((item) => (
            <li key={item.caption}>
              <Fill photo={item.photo} sizes="(max-width: 900px) 46vw, 300px" className={styles.structureImg} />
              <span>{item.caption}</span>
            </li>
          ))}
        </ul>
        <Link href="/work/built-to-scale" className={styles.structureLink}>
          See the structural work
        </Link>
      </section>

      {/* For enquiries: the number painted across the hoarding */}
      <section className={styles.enquiries} aria-labelledby="v4-call">
        <h2 id="v4-call" className={styles.enquiriesLabel}>
          For enquiries
        </h2>
        <a href={site.contact.phone.href} className={styles.bigNumber}>
          {site.contact.phone.label.replace('+234 ', '0')}
        </a>
        <div className={styles.enquiryActions}>
          <a href={site.contact.whatsapp} className={styles.btnPaint}>
            <WhatsAppIcon />
            WhatsApp
          </a>
          <a href={`mailto:${site.contact.email}`} className={styles.btnZinc}>
            <Mail aria-hidden />
            {site.contact.email}
          </a>
          <a href={site.cv.pdf} download className={styles.btnZinc}>
            His CV (PDF)
          </a>
        </div>
      </section>
    </main>
  )
}
