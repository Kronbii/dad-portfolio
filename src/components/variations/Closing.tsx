import { aboutShort, contactCard, site } from '@/content/site'
import { cv } from '@/content/cv'
import { WhatsAppButton, btnLine } from '../ContactActions'
import { Inlay } from '../Inlay'
import { Marked } from '../Marked'
import styles from './variations.module.css'

/** About, cut to a greeting (English, Arabic, Yoruba), one line, and three facts. A snapshot from site overlaps the portrait. */
export function AboutShort() {
  return (
    <section id="about" className="section-gap">
      <div className={`wrap ${styles.about}`}>
        <div className={styles.aboutPhotos}>
          <Inlay photo={aboutShort.photo} ratio="3 / 4" sizes="(max-width: 900px) 80vw, 420px" />
          <div className={styles.aboutSnapshot}>
            <Inlay photo={aboutShort.snapshot} ratio="1 / 1" small paper reveal={false} sizes="(max-width: 900px) 40vw, 200px" />
          </div>
        </div>
        <div>
          <h2 className={styles.greeting}>
            {aboutShort.greeting.map((word, i) => (
              <span key={word} style={{ '--i': i } as React.CSSProperties}>
                {word}
              </span>
            ))}
          </h2>
          <p className="t-lede mt-7 max-w-[44ch]">{aboutShort.lede}</p>
          <ul className={styles.aboutFacts}>
            {aboutShort.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/** The contact: his visiting card lying on his CV. Tap the CV to download it, or save his number to your phone. */
export function ContactCard() {
  return (
    <section id="contact" className={styles.desk}>
      <div className={`wrap ${styles.deskGrid}`}>
        <div>
          <h2 className="t-h2 max-w-[16ch]">
            <Marked text={contactCard.title} mark={contactCard.mark} draw="scroll" />
          </h2>
          <p className="mt-5 max-w-[46ch] text-vein">{contactCard.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton />
            <a className={btnLine} href={site.vcard} download>
              Save my number
            </a>
          </div>
        </div>
        <div className={styles.cards}>
          <a href={site.cv.pdf} download className={styles.cvSheet}>
            <span className={styles.cvName}>{cv.name}</span>
            <span className={styles.cvRole}>{cv.title}</span>
            <span className={styles.cvTag}>Download my CV (PDF)</span>
            <span className={styles.cvLines} aria-hidden>
              {[92, 78, 86, 60, 0, 70, 88, 54, 0, 82, 66].map((w, i) => (
                <i key={i} style={{ width: `${w}%` }} />
              ))}
            </span>
          </a>
          <div className={`double-rule ${styles.card}`}>
            <span className={styles.cardMark} aria-hidden />
            <p className={styles.cardName}>{site.name}</p>
            <p className={styles.cardRole}>{site.role}</p>
            <p className={styles.cardCompany}>
              {site.company.name}
              <br />
              RC {site.company.rc}
            </p>
            <ul className={styles.cardLines}>
              <li>
                <a href={site.contact.phone.href}>{site.contact.phone.label}</a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
