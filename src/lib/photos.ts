import manifest from '@/content/photos.json'
import type { Photo } from '@/content/types'

type Meta = { w: number; h: number; blur: string }
const photos = manifest as Record<string, Meta>

/** Resolves a content photo to what next/image needs. Fails the build if a photo is missing. */
export function resolvePhoto(photo: Photo) {
  const meta = photos[photo.src]
  if (!meta) throw new Error(`Photo not found in photos.json: ${photo.src} (run npm run photos)`)
  return { src: `/images/${photo.src}.jpg`, alt: photo.alt, width: meta.w, height: meta.h, blurDataURL: meta.blur }
}
