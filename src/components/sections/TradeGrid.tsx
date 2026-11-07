import { finishes } from '@/content/site'
import { Inlay } from '../Inlay'
import { SectionHead } from '../SectionHead'

export function TradeGrid() {
  return (
    <section id="finishes" className="section-gap">
      <div className="wrap">
        <SectionHead title={finishes.title} intro={finishes.intro} />
        <div className="grid grid-cols-2 gap-[clamp(20px,2.4vw,32px)] lg:grid-cols-4">
          {finishes.trades.map((trade) => (
            <article key={trade.title}>
              <Inlay photo={trade.photo} small ratio="3 / 4" sizes="(max-width: 1024px) 45vw, 280px" />
              <h3 className="t-h3 mt-[18px]">{trade.title}</h3>
              <p className="mt-1.5 text-[15px] text-vein">{trade.text}</p>
            </article>
          ))}
          <article className="double-rule col-span-2 flex flex-col justify-center bg-paper p-7 lg:col-span-1">
            <p className="font-display text-[22px] leading-[1.35]">{finishes.note}</p>
          </article>
        </div>
      </div>
    </section>
  )
}
