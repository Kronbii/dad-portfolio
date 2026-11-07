import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ContactActions'
import styles from '@/components/v3/v3.module.css'
import { WalkRail } from '@/components/v3/WalkRail'
import { madeOnSite, onSite, scale, site } from '@/content/site'
import type { Photo } from '@/content/types'
import { rooms } from '@/content/versions'
import { resolvePhoto } from '@/lib/photos'

/** The same photo twice: sharp in the doorway, and blurred as the room's ambient light around it. */
function RoomPhoto({ photo, focus, priority }: { photo: Photo; focus?: string; priority?: boolean }) {
  const img = resolvePhoto(photo)
  return (
    <>
      <Image src={img.src} alt="" width={img.width} height={img.height} sizes="256px" priority={priority} className={styles.ambient} aria-hidden />
      <div className={styles.doorway}>
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          sizes="(max-width: 900px) 100vw, 60vh"
          priority={priority}
          placeholder="blur"
          blurDataURL={img.blurDataURL}
          className={styles.doorwayImg}
          style={focus ? { objectPosition: focus } : undefined}
        />
      </div>
    </>
  )
}

const stages = ['Drawn', 'Shaped', 'Moulded', 'Cast', 'Fitted to the curve', 'Installed']

export default function V3Home() {
  const [arrival, ...walk] = rooms
  const total = rooms.length
  return (
    <main className={styles.page}>
      {/* Arrival: the front door and the clipboard */}
      <section id="room-1" data-room={0} className={styles.arrival} aria-labelledby="v3-title">
        <RoomPhoto photo={arrival.photo} focus={arrival.focus} priority />
        <div className={styles.arrivalShade} aria-hidden />
        <p className={styles.brand}>
          {site.name}
          <span>Finishing contractor, Lagos</span>
        </p>
        <div className={styles.arrivalCopy}>
          <h1 id="v3-title" className={styles.arrivalTitle}>
            Walk through a finished building.
          </h1>
          <p className={styles.arrivalLede}>
            Mahmoud Kronbi has finished villas, halls and large buildings across Nigeria for more than twenty years. Inspect his work the way a client does
            at handover: room by room.
          </p>
        </div>
        <div className={styles.clipboard}>
          <span className={styles.clip} aria-hidden />
          <p className={styles.clipTitle}>Handover walkthrough</p>
          <dl className={styles.clipRows}>
            <div>
              <dt>Work</dt>
              <dd>His finished rooms, {total} stops</dd>
            </div>
            <div>
              <dt>Inspector</dt>
              <dd>You</dd>
            </div>
            <div>
              <dt>First stop</dt>
              <dd>{arrival.project}</dd>
            </div>
            <div>
              <dt>Snags</dt>
              <dd>None so far</dd>
            </div>
          </dl>
          <div className={styles.clipActions}>
            <a href="#room-2" className={styles.btnSnag}>
              Start the walkthrough
            </a>
            <a href={site.contact.whatsapp} className={styles.btnBone}>
              <WhatsAppIcon />
              WhatsApp him
            </a>
          </div>
        </div>
      </section>

      {/* The rooms */}
      <div data-walk className={styles.walk}>
        <WalkRail names={rooms.map((r) => r.name)} />
        {walk.map((room, w) => {
          const i = w + 1
          return (
            <section key={room.name} id={`room-${i + 1}`} data-room={i} className={styles.room} aria-labelledby={`v3-room-${i}`}>
              <div className={styles.stage}>
                <RoomPhoto photo={room.photo} focus={room.focus} />
                <div className={styles.roomShade} aria-hidden />
                <div className={styles.roomCopy}>
                  <p className={styles.roomCount}>
                    Room {i + 1} of {total}
                  </p>
                  <h2 id={`v3-room-${i}`} className={styles.roomName}>
                    {room.name}
                  </h2>
                  <Link href={room.href} className={styles.roomProject}>
                    {room.project}
                  </Link>
                </div>
                <ul className={styles.checks} aria-label={`Checks in ${room.name}`}>
                  {room.checks.map((check, n) => (
                    <li key={check} className={styles.check} style={{ '--n': n } as React.CSSProperties}>
                      <svg viewBox="0 0 22 22" className={styles.box} aria-hidden>
                        <rect x="1" y="1" width="20" height="20" rx="3" className={styles.boxRect} />
                        <path d="M5.5 11.5 9.5 15.5 16.5 7" className={styles.tick} />
                      </svg>
                      <span>{check}</span>
                      <em className={styles.passed}>passed</em>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )
        })}
      </div>

      {/* The snag list */}
      <section className={styles.snags} aria-labelledby="v3-snags">
        <h2 id="v3-snags" className={styles.sectionTitle}>
          Snag list: nothing to report.
        </h2>
        <p className={styles.sectionLede}>
          {total * 3} checks across {total} rooms, the kind a client makes at handover. The rooms come from several of his projects, and each one is named.
        </p>
        <ol className={styles.snagForm}>
          {rooms.flatMap((room) =>
            room.checks.map((check) => (
              <li key={room.name + check}>
                <span className={styles.snagRoom}>{room.name}</span>
                <span>{check}</span>
                <svg viewBox="0 0 22 22" className={styles.snagTick} aria-label="passed">
                  <path d="M5.5 11.5 9.5 15.5 16.5 7" />
                </svg>
              </li>
            )),
          )}
        </ol>
        <p className={styles.signoff}>
          <span>
            Inspected by <strong>you</strong>
          </span>
          <span>
            Finished by <strong>{site.name}</strong>
          </span>
        </p>
      </section>

      {/* Made on site, in named stages */}
      <section className={styles.made} aria-labelledby="v3-made">
        <div className={styles.madeHead}>
          <h2 id="v3-made" className={styles.sectionTitle}>
            Some finishes can&apos;t be bought. He makes them.
          </h2>
          <p className={styles.sectionLede}>{madeOnSite.intro}</p>
        </div>
        <ol className={styles.stages}>
          {madeOnSite.steps.map((step, i) => {
            const img = resolvePhoto(step.photo)
            return (
              <li key={step.title} className={styles.stageCard}>
                <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(max-width: 900px) 70vw, 280px" placeholder="blur" blurDataURL={img.blurDataURL} className={styles.stageImg} />
                <p className={styles.stageState}>{stages[i]}</p>
                <p className={styles.stageText}>{step.text}</p>
              </li>
            )
          })}
        </ol>
      </section>

      {/* Him, on site */}
      <section className={styles.him} aria-labelledby="v3-him">
        <div className={styles.himPhotos}>
          {[onSite.photos[4], onSite.photos[0], onSite.photos[2]].map((photo, i) => {
            const img = resolvePhoto(photo)
            return (
              <Image
                key={photo.src}
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes={i === 0 ? '(max-width: 900px) 100vw, 40vw' : '(max-width: 900px) 50vw, 20vw'}
                placeholder="blur"
                blurDataURL={img.blurDataURL}
                className={i === 0 ? styles.himMain : styles.himSmall}
              />
            )
          })}
        </div>
        <div className={styles.himCopy}>
          <h2 id="v3-him" className={styles.sectionTitle}>
            He walks every room before you do.
          </h2>
          <p className={styles.sectionLede}>{onSite.intro}</p>
          <p className={styles.himScale}>
            {scale.intro}{' '}
            <Link href="/work/built-to-scale" className={styles.inlineLink}>
              See the structural work
            </Link>
          </p>
        </div>
      </section>

      {/* Close: book your own handover */}
      <section className={styles.close} aria-labelledby="v3-close">
        <h2 id="v3-close" className={styles.closeTitle}>
          Book a walkthrough of your building.
        </h2>
        <p className={styles.sectionLede}>Send him your drawings or photos on WhatsApp, or call. He finishes villas and large buildings anywhere in Nigeria.</p>
        <div className={styles.closeActions}>
          <a href={site.contact.whatsapp} className={styles.btnSnag}>
            <WhatsAppIcon />
            Chat on WhatsApp
          </a>
          <a href={site.contact.phone.href} className={styles.btnBone}>
            <Phone aria-hidden />
            {site.contact.phone.label}
          </a>
          <a href={`mailto:${site.contact.email}`} className={styles.btnBone}>
            <Mail aria-hidden />
            Email
          </a>
        </div>
        <p className={styles.closeMeta}>
          {site.company.name}, RC {site.company.rc}. Based in {site.contact.city}. Speaks English, Arabic and French.{' '}
          <a href={site.cv.pdf} download className={styles.inlineLink}>
            Download his CV
          </a>
        </p>
      </section>
    </main>
  )
}
