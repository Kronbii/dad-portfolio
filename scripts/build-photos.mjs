// Prepares every photo in public/images ahead of time, so visitors never wait for on-demand resizing:
// - public/img/<path>-<width>.webp for each width next/image can ask for (see next.config.ts)
// - src/content/photos.json with each photo's size and a tiny blur placeholder
// Encoded files are cached in .next/cache/photos by content hash (Vercel keeps that folder between
// builds), so only new or changed photos are encoded again. Runs before `dev` and `build`.
import { createHash } from 'node:crypto'
import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

// Must match images.deviceSizes + images.imageSizes in next.config.ts.
export const WIDTHS = [256, 384, 640, 828, 1080, 1280, 1600, 2000]
// WebP 78: indistinguishable from 82 at normal viewing size, about 15% smaller.
const QUALITY = 78

const root = path.resolve(import.meta.dirname, '..')
const imagesDir = path.join(root, 'public', 'images')
const outDir = path.join(root, 'public', 'img')
const cacheDir = path.join(root, '.next', 'cache', 'photos')
const manifestPath = path.join(root, 'src', 'content', 'photos.json')

await mkdir(cacheDir, { recursive: true })
const files = (await readdir(imagesDir, { recursive: true })).filter((f) => f.endsWith('.jpg')).sort()

const manifest = {}
let encoded = 0
for (const file of files) {
  const source = await readFile(path.join(imagesDir, file))
  const hash = createHash('sha1').update(source).digest('hex').slice(0, 16)
  const { width, height } = await sharp(source).metadata()
  const name = file.replace(/\.jpg$/, '')

  for (const w of WIDTHS) {
    // Never enlarge: widths above the original reuse the full-size encode.
    const target = Math.min(w, width)
    const cached = path.join(cacheDir, `${hash}-q${QUALITY}-${target}.webp`)
    if (!existsSync(cached)) {
      await sharp(source).resize({ width: target, withoutEnlargement: true }).webp({ quality: QUALITY, effort: 5, smartSubsample: true }).toFile(cached)
      encoded++
    }
    const out = path.join(outDir, `${name}-${w}.webp`)
    await mkdir(path.dirname(out), { recursive: true })
    await copyFile(cached, out)
  }

  const blur = await sharp(source).resize(12).jpeg({ quality: 50 }).toBuffer()
  manifest[name] = { w: width, h: height, blur: `data:image/jpeg;base64,${blur.toString('base64')}` }
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 1) + '\n')
console.log(`photos: ${files.length} photos, ${files.length * WIDTHS.length} sizes in public/img (${encoded} newly encoded)`)
