import Image from 'next/image'
import Link from 'next/link'
import { WhatsAppIcon } from '@/components/ContactActions'
import { AsBuilt } from '@/components/v2/AsBuilt'
import { Cutaway } from '@/components/v2/Cutaway'
import { Diazo } from '@/components/v2/Diazo'
import styles from '@/components/v2/v2.module.css'
import { projects } from '@/content/projects'
import { madeOnSite, onSite, renderToReality, scale, site } from '@/content/site'
import { layers, schedule } from '@/content/versions'
import { resolvePhoto } from '@/lib/photos'

const sheetList = [
  { no: 'A-101', slug: 'lagoon-front-residence' },
  { no: 'A-102', slug: 'marble-interiors' },
  { no: 'A-103', slug: 'event-hall-ibadan' },
  { no: 'S-001', slug: 'built-to-scale' },
].map((s) => ({ ...s, title: projects.find((p) => p.slug === s.slug)?.title ?? s.slug }))

/** The strip every sheet opens with: number, title, scale. The drawing set's own wayfinding. */
function SheetHead({ no, title, scale: sheetScale, id }: { no: string; title: string; scale: string; id?: string }) {
  return (
    <header className={styles.sheetHead} id={id}>
      <span className={styles.sheetNo}>{no}</span>
      <h2 className={styles.sheetTitle}>{title}</h2>
      <span className={styles.sheetScale}>Scale: {sheetScale}</span>
    </header>
  )
}

function Stamp({ className }: { className?: string }) {
  return (
    <a href={site.contact.whatsapp} className={`${styles.stamp} ${className ?? ''}`}>
      <span className={styles.stampInner}>
        <WhatsAppIcon className={styles.stampIcon} />
        <span>
          Discuss your building
          <small>on WhatsApp</small>
        </span>
      </span>
    </a>
  )
}

export default function V2Home() {
  const cutawayLayers = layers.map((l) => ({ ...l, photo: resolvePhoto(l.photo) }))
  return (
    <main className={styles.page}>
      {/* A-000: the cover sheet */}
      <section className={styles.cover} aria-labelledby="v2-title">
        <div className={styles.zonesTop} aria-hidden>
          {['A', 'B', 'C', 'D', 'E', 'F'].map((z) => (
            <span key={z}>{z}</span>
          ))}
        </div>
        <div className={styles.coverGrid}>
          <div className={styles.coverText}>
            <p className={styles.coverName}>
              {site.name}
              <span>Finishing contractor, Lagos</span>
            </p>
            <h1 id="v2-title" className={styles.coverTitle}>
              The structure is by others. Everything you see is by Mahmoud Kronbi.
            </h1>
            <p className={styles.coverLede}>
              Marble and stone, bathrooms, ceilings, floors, pools, facades and landscape, finished on site for villas and large buildings across Nigeria
              for more than twenty years.
            </p>
          </div>
          <Cutaway layers={cutawayLayers} />
          <nav className={styles.sheetList} aria-label="Projects">
              <h2>Sheet list</h2>
              <ol>
                {sheetList.map((s) => (
                  <li key={s.no}>
                    <Link href={`/work/${s.slug}`}>
                      <span>{s.no}</span>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ol>
          </nav>
        </div>
        <footer className={styles.titleBlock}>
          <dl>
            <div>
              <dt>Contractor</dt>
              <dd>{site.name}</dd>
            </div>
            <div>
              <dt>Company</dt>
              <dd>
                {site.company.name}, RC {site.company.rc}
              </dd>
            </div>
            <div>
              <dt>Sheet</dt>
              <dd>A-000 Cover</dd>
            </div>
            <div>
              <dt>Scale</dt>
              <dd>As built</dd>
            </div>
          </dl>
          <Stamp />
        </footer>
      </section>

      {/* A-001: the finish schedule */}
      <section className={styles.sheet} aria-labelledby="v2-schedule">
        <SheetHead no="A-001" title="Finish schedule" scale="by room" id="v2-schedule" />
        <p className={styles.sheetIntro}>
          On a drawing set, finishing is specified space by space: what goes on the floor, the walls and the ceiling. These are rooms he has finished.
        </p>
        <div className={styles.scheduleWrap}>
          <table className={styles.schedule}>
            <thead>
              <tr>
                <th scope="col">Space</th>
                <th scope="col">Floor</th>
                <th scope="col">Walls</th>
                <th scope="col">Ceiling</th>
                <th scope="col">
                  <span className={styles.srOnly}>Photo</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.space}>
                  <th scope="row">
                    <Link href={row.href}>{row.space}</Link>
                    <span className={styles.rowProject}>{row.project}</span>
                  </th>
                  <td data-label="Floor">{row.floor}</td>
                  <td data-label="Walls">{row.walls}</td>
                  <td data-label="Ceiling">{row.ceiling}</td>
                  <td className={styles.rowPhoto}>
                    <Diazo photo={row.photo} ratio="4 / 3" sizes="(max-width: 900px) 92vw, 220px" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* A-101: the balustrade detail */}
      <section className={styles.sheet} aria-labelledby="v2-detail">
        <SheetHead no="A-101" title="Detail 1: baluster, cast on site" scale="not to scale" id="v2-detail" />
        <div className={styles.detailGrid}>
          <div className={styles.detailCopy}>
            <p className={styles.detailLead}>{madeOnSite.intro}</p>
            <figure className={styles.markup}>
              <Image {...resolvePhoto({ src: 'lagoon-residence/baluster-sketch', alt: 'His mark-up of a baluster, with heights and the base width' })} alt="His mark-up of a baluster, with heights and the base width" sizes="(max-width: 900px) 40vw, 180px" className={styles.markupImg} />
              <figcaption>His mark-up: heights and the base width</figcaption>
            </figure>
          </div>
          <svg viewBox="0 0 220 420" className={styles.elevation} role="img" aria-label="Elevation drawing of a turned baluster">
            <path
              className={styles.elevationLine}
              d="M70 404 H150 V384 H140 V372 C140 360 128 352 126 340 C150 316 156 270 146 236 C138 208 124 196 120 184 C134 178 136 166 126 160 C122 150 122 140 128 132 H134 V118 H86 V132 H92 C98 140 98 150 94 160 C84 166 86 178 100 184 C96 196 82 208 74 236 C64 270 70 316 94 340 C92 352 80 360 80 372 V384 H70 Z M84 118 H136 V104 H84 Z M76 104 H144 V90 H76 Z"
            />
            <line x1="110" y1="80" x2="110" y2="414" className={styles.centreLine} />
            <text x="110" y="70" textAnchor="middle" className={styles.elevationNote}>
              Elevation
            </text>
          </svg>
          <ol className={styles.sequence} aria-label="Construction sequence">
            {madeOnSite.steps.map((step, i) => (
              <li key={step.title}>
                <Diazo photo={step.photo} ratio="3 / 4" sizes="(max-width: 900px) 45vw, 200px" />
                <p>
                  <span className={styles.seqNo}>{i + 1}</span>
                  <strong>{step.title}.</strong> {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* A-201: design intent against as built */}
      <section className={styles.sheet} aria-labelledby="v2-asbuilt">
        <SheetHead no="A-201" title="Design intent and as built" scale="1:1" id="v2-asbuilt" />
        <div className={styles.asBuiltGrid}>
          <AsBuilt intent={resolvePhoto(renderToReality.before)} built={resolvePhoto(renderToReality.after)} />
          <div className={styles.asBuiltCopy}>
            <p className={styles.detailLead}>A villa entrance on Banana Island: the architect&apos;s render, and the entrance his team finished.</p>
            <p>Drag the line to compare the arches, the fountain bed and the paving.</p>
            <dl className={styles.legendDl}>
              <div>
                <dt>Left of the line</dt>
                <dd>Design intent</dd>
              </div>
              <div>
                <dt>Right of the line</dt>
                <dd>As built</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* A-301: on site */}
      <section className={styles.sheet} aria-labelledby="v2-site">
        <SheetHead no="A-301" title="Site inspection" scale="daily" id="v2-site" />
        <p className={styles.sheetIntro}>{onSite.intro}</p>
        <ul className={styles.siteGrid}>
          {[onSite.photos[0], onSite.photos[2], onSite.photos[3], onSite.photos[4]].map((photo) => (
            <li key={photo.src}>
              <Diazo photo={photo} ratio="3 / 4" sizes="(max-width: 900px) 46vw, 280px" />
            </li>
          ))}
        </ul>
      </section>

      {/* S-001: structure, when it is needed */}
      <section className={`${styles.sheet} ${styles.structure}`} aria-labelledby="v2-structure">
        <SheetHead no="S-001" title="Structure, when it is needed" scale="large sites" id="v2-structure" />
        <div className={styles.structureGrid}>
          <p className={styles.sheetIntro}>{scale.intro}</p>
          <ul className={styles.structurePhotos}>
            {scale.items.map((item) => (
              <li key={item.caption}>
                <Diazo photo={item.photo} ratio="4 / 3" sizes="(max-width: 900px) 46vw, 240px" />
                <span>{item.caption}</span>
              </li>
            ))}
          </ul>
          <Link href="/work/built-to-scale" className={styles.textLink}>
            See sheet S-001 in full
          </Link>
        </div>
      </section>

      {/* The title block, at full size: who issues this set and how to reach him */}
      <section className={styles.closing} aria-labelledby="v2-contact">
        <h2 id="v2-contact" className={styles.closingTitle}>
          Issued for your building.
        </h2>
        <div className={styles.bigBlock}>
          <dl>
            <div>
              <dt>Contractor</dt>
              <dd>{site.name}</dd>
            </div>
            <div>
              <dt>Company</dt>
              <dd>
                {site.company.name}, RC {site.company.rc}
              </dd>
            </div>
            <div>
              <dt>Telephone and WhatsApp</dt>
              <dd>
                <a href={site.contact.phone.href}>{site.contact.phone.label}</a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>{site.contact.city}</dd>
            </div>
            <div>
              <dt>Documents</dt>
              <dd>
                <a href={site.cv.pdf} download>
                  CV (PDF)
                </a>
              </dd>
            </div>
          </dl>
          <Stamp className={styles.stampLarge} />
        </div>
      </section>
    </main>
  )
}
