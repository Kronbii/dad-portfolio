import Image from 'next/image'
import type { Photo } from '@/content/types'
import { resolvePhoto } from '@/lib/photos'
import { cn } from '@/lib/utils'
import styles from './v2.module.css'

/**
 * A photo that arrives as a blue-line diazo print and develops into full colour as it scrolls
 * into view (CSS scroll-driven animation; browsers without it simply show the colour photo).
 */
export function Diazo({ photo, sizes, ratio, className, priority }: { photo: Photo; sizes: string; ratio?: string; className?: string; priority?: boolean }) {
  const img = resolvePhoto(photo)
  const common = { src: img.src, width: img.width, height: img.height, sizes }
  return (
    <div className={cn(styles.diazo, className)} style={ratio ? { aspectRatio: ratio } : undefined}>
      <Image {...common} alt={img.alt} placeholder="blur" blurDataURL={img.blurDataURL} priority={priority} className={styles.diazoImg} />
      <div className={styles.diazoPrint} aria-hidden>
        <Image {...common} alt="" priority={priority} className={styles.diazoImg} />
      </div>
    </div>
  )
}
