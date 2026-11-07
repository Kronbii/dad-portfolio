/**
 * A fact we don't know yet. In development it renders as "[VERIFY: note]";
 * production builds leave the row or sentence out, so placeholders never go live.
 */
export type Verify = { readonly verify: string }
export const verify = (note: string): Verify => ({ verify: note })
export const isVerify = (value: unknown): value is Verify =>
  typeof value === 'object' && value !== null && 'verify' in value

/** A fact that is either known (text) or still to be confirmed. */
export type Fact = string | Verify

/** A photo in public/images, by its path without extension, e.g. "lagoon-residence/terrace-lagoon". */
export type Photo = { src: string; alt: string }

export type Caption = { photo: Photo; caption: string }

export type Trade = { title: string; text: string; photo: Photo }

export type Step = { title: string; text: string; photo: Photo }

export type GallerySection = { title: string; text?: Fact; photos: Photo[] }

export type Project = {
  slug: string
  title: string
  /** One or two sentences for the home page feature and the page intro. */
  summary: string
  /** Longer copy for the project page. */
  story: string[]
  facts: { label: string; value: Fact }[]
  cover: Photo
  thumbs: Photo[]
  steps?: { title: string; intro: string; items: Step[] }
  onSite?: Photo[]
  gallery: GallerySection[]
  /** Shown in "Selected work" on the home page. */
  featured: boolean
}
