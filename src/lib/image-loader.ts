/**
 * next/image loader for the site's photos. Every size is prepared at build time by
 * scripts/build-photos.mjs, so this only points at a ready-made file on the CDN:
 * /images/marble-interiors/onyx-bath.jpg at 640px -> /img/marble-interiors/onyx-bath-640.webp
 */
export default function photoLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith('/images/') || !src.endsWith('.jpg')) return src
  return `/img/${src.slice('/images/'.length, -'.jpg'.length)}-${width}.webp`
}
