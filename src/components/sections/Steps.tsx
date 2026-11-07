import type { Step } from '@/content/types'
import { Inlay } from '../Inlay'
import { SectionHead } from '../SectionHead'

/** A real sequence (how the balustrades were made), so the steps are numbered. */
export function Steps({ id, title, intro, items }: { id?: string; title: string; intro: string; items: Step[] }) {
  return (
    <section id={id} className="section-gap">
      <div className="wrap">
        <SectionHead title={title} intro={intro} />
        <ol className="steps m-0 grid list-none grid-cols-2 gap-x-[clamp(20px,2.4vw,32px)] gap-y-[clamp(28px,3.4vw,48px)] p-0 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.title}>
              <Inlay photo={item.photo} small ratio="3 / 4" sizes="(max-width: 1024px) 45vw, 380px" />
              <h3 className="step-title t-h3 mt-[18px]">{item.title}</h3>
              <p className="mt-1.5 text-[15px] text-vein">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
