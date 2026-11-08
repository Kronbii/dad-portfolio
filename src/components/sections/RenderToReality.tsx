import type { Photo } from '@/content/types'
import { resolvePhoto } from '@/lib/photos'
import { cn } from '@/lib/utils'
import { Compare } from '../Compare'
import { Marked } from '../Marked'

type Content = { title: string; mark?: string; intro: string; before: Photo; after: Photo; labels?: readonly [string, string] }

/** A render and the finished work under one slider, optionally cropped, with a sweep that shows the slider moves. */
export function RenderToReality({ content, ratio, position, peek, className }: { content: Content; ratio?: string; position?: string; peek?: boolean; className?: string }) {
  const [beforeLabel, afterLabel] = content.labels ?? ['Render', 'Finished']
  return (
    <section id="render" className="section-gap">
      <div className="wrap text-center">
        <h2 className="t-h2">
          <Marked text={content.title} mark={content.mark} draw="scroll" />
        </h2>
        <p className="mx-auto mt-[18px] max-w-[62ch] text-vein">{content.intro}</p>
        <div className={cn('mx-auto mt-10 max-w-[620px] text-left', className)}>
          <div className="inlay scoop">
            <div className="inlay-gap scoop">
              <div className="inlay-media scoop">
                <Compare before={resolvePhoto(content.before)} after={resolvePhoto(content.after)} ratio={ratio} position={position} peek={peek} />
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-between text-sm text-vein">
            <span>{beforeLabel}</span>
            <span>{afterLabel}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
