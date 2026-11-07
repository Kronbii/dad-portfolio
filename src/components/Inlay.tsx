import Image from 'next/image'
import type { Photo } from '@/content/types'
import { resolvePhoto } from '@/lib/photos'
import { cn } from '@/lib/utils'

type Props = {
  photo: Photo
  /** next/image sizes for this slot, e.g. "(max-width: 760px) 100vw, 420px" */
  sizes: string
  /** CSS aspect ratio for the photo, e.g. "3 / 4". Defaults to the photo's own. */
  ratio?: string
  small?: boolean
  paper?: boolean
  priority?: boolean
  /** Unveil from the frame edge when scrolled into view. Off for the hero. */
  reveal?: boolean
  className?: string
  imageClassName?: string
}

/** A photo set in the scooped marble-inlay frame: rosso line, field gap, then the photo. */
export function Inlay({ photo, sizes, ratio, small, paper, priority, reveal = true, className, imageClassName }: Props) {
  const img = resolvePhoto(photo)
  const media = (
    <Image
      src={img.src}
      alt={img.alt}
      width={img.width}
      height={img.height}
      sizes={sizes}
      placeholder="blur"
      blurDataURL={img.blurDataURL}
      priority={priority}
      quality={priority ? 60 : undefined}
      className={imageClassName}
      style={ratio ? { aspectRatio: ratio } : undefined}
    />
  )
  return (
    <figure className={cn('inlay scoop m-0', small && 'inlay-sm', paper && 'inlay-paper', className)}>
      <div className="inlay-gap scoop">
        <div className="inlay-media scoop">{reveal ? <div className="reveal h-full">{media}</div> : media}</div>
      </div>
    </figure>
  )
}
