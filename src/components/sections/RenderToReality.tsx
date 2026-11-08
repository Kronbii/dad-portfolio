import type { BeforeAfter } from '@/content/types'
import { resolvePhoto } from '@/lib/photos'
import { Compare } from '../Compare'
import { Marked } from '../Marked'

type Content = { title: string; mark?: string; intro: string; pairs: BeforeAfter[] }

/** Each pair under its own slider, side by side on wide screens: render against finished, then before against after. */
export function RenderToReality({ content }: { content: Content }) {
  return (
    <section id="render" className="section-gap">
      <div className="wrap">
        <div className="text-center">
          <h2 className="t-h2">
            <Marked text={content.title} mark={content.mark} draw="scroll" />
          </h2>
          <p className="mx-auto mt-[18px] max-w-[62ch] text-vein">{content.intro}</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-[1040px] gap-x-[clamp(20px,3vw,40px)] gap-y-10 md:grid-cols-2">
          {content.pairs.map((pair) => (
            <figure key={pair.after.src} className="m-0">
              <div className="inlay scoop">
                <div className="inlay-gap scoop">
                  <div className="inlay-media scoop">
                    <Compare before={resolvePhoto(pair.before)} after={resolvePhoto(pair.after)} ratio="1 / 1" labels={pair.labels} peek sizes="(max-width: 768px) 100vw, 500px" />
                  </div>
                </div>
              </div>
              <figcaption className="mt-3 flex justify-between text-sm text-vein">
                <span>{pair.labels[0]}</span>
                <span>{pair.labels[1]}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
