import Image from 'next/image'
import type { Photo as PhotoType } from '@/content/types'
import { resolvePhoto } from '@/lib/photos'
import { cn } from '@/lib/utils'

/** An unframed photo (tiles, thumbnails, galleries), cropped to fill its box. */
export function Photo({ photo, sizes, ratio, className, priority }: { photo: PhotoType; sizes: string; ratio?: string; className?: string; priority?: boolean }) {
  const img = resolvePhoto(photo)
  return (
    <Image
      src={img.src}
      alt={img.alt}
      width={img.width}
      height={img.height}
      sizes={sizes}
      placeholder="blur"
      blurDataURL={img.blurDataURL}
      priority={priority}
      className={cn('block h-full w-full object-cover', className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    />
  )
}
