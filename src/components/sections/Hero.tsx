import Link from 'next/link'
import { hero, site } from '@/content/site'
import { Inlay } from '../Inlay'
import { WhatsAppButton, btnLine } from '../ContactActions'

const corners = ['left-[9px] top-[9px]', 'left-[calc(100%-9px)] top-[9px]', 'left-[9px] top-[calc(100%-9px)]', 'left-[calc(100%-9px)] top-[calc(100%-9px)]']

/** The opening: framed like a floor border, with the corners set last. */
export function Hero() {
  return (
    <div className="wrap" id="top">
      <div className="relative mt-2 p-[clamp(28px,5vw,72px)]">
        <div className="hero-frame" aria-hidden />
        <div className="hero-frame-inner" aria-hidden />
        {corners.map((pos) => (
          <span key={pos} className={`hero-corner ${pos}`} aria-hidden />
        ))}
        <div className="relative grid items-center gap-[clamp(28px,5vw,80px)] md:grid-cols-[1.25fr_.75fr]">
          <div>
            <p className="hero-rise mb-[22px] text-[15px] font-semibold text-rosso">{site.role}</p>
            <h1 className="hero-rise hero-rise-2 t-h1 max-w-[13ch]">{hero.headline}</h1>
            <p className="hero-rise hero-rise-3 t-lede mt-[26px] max-w-[62ch]">{hero.lede}</p>
            <div className="hero-rise hero-rise-3 mt-8 flex flex-wrap gap-3">
              <WhatsAppButton />
              <Link className={btnLine} href="#work">
                See his work
              </Link>
            </div>
          </div>
          <Inlay
            photo={hero.photo}
            sizes="(max-width: 768px) 360px, 420px"
            ratio="9 / 15"
            priority
            reveal={false}
            className="w-full max-w-[360px] justify-self-center md:max-w-[420px] md:justify-self-end"
          />
        </div>
      </div>
    </div>
  )
}
