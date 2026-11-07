import Image from 'next/image'
import type { Photo } from '@/content/types'
import { resolvePhoto } from '@/lib/photos'

/**
 * A grid of photos, rendered on the server. Each one links to its full-size file, so it works
 * without scripts; the page's single <Lightbox /> picks up the clicks and opens a viewer.
 */
export function GalleryGrid({ id, photos }: { id: string; photos: Photo[] }) {
  return (
    <ul data-gallery={id} className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-4">
      {photos.map((photo) => {
        const img = resolvePhoto(photo)
        return (
          <li key={photo.src}>
            <a
              href={img.src}
              data-lightbox=""
              data-w={img.width}
              data-h={img.height}
              data-alt={img.alt}
              className="group block overflow-hidden"
              aria-label={`Open photo: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                placeholder="blur"
                blurDataURL={img.blurDataURL}
                className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
