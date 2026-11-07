import { renderToReality } from '@/content/site'
import { resolvePhoto } from '@/lib/photos'
import { Compare } from '../Compare'

export function RenderToReality() {
  return (
    <section id="render" className="section-gap">
      <div className="wrap text-center">
        <h2 className="t-h2">{renderToReality.title}</h2>
        <p className="mx-auto mt-[18px] max-w-[62ch] text-vein">{renderToReality.intro}</p>
        <div className="mx-auto mt-10 max-w-[620px] text-left">
          <div className="inlay scoop">
            <div className="inlay-gap scoop">
              <div className="inlay-media scoop">
                <Compare before={resolvePhoto(renderToReality.before)} after={resolvePhoto(renderToReality.after)} />
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-between text-sm text-vein">
            <span>Render</span>
            <span>Finished</span>
          </div>
        </div>
      </div>
    </section>
  )
}
