// Writes src/content/photos.json: width, height and a tiny blur placeholder for every photo
// in public/images, keyed by its path without extension ("lagoon-residence/terrace-lagoon").
// Run after adding or replacing photos: npm run photos
import { readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const imagesDir = path.join(root, 'public', 'images')
const out = path.join(root, 'src', 'content', 'photos.json')

const files = (await readdir(imagesDir, { recursive: true })).filter((f) => f.endsWith('.jpg')).sort()

const manifest = {}
for (const file of files) {
  const full = path.join(imagesDir, file)
  const { width, height } = await sharp(full).metadata()
  const blur = await sharp(full).resize(12).jpeg({ quality: 50 }).toBuffer()
  manifest[file.replace(/\.jpg$/, '')] = { w: width, h: height, blur: `data:image/jpeg;base64,${blur.toString('base64')}` }
}

await writeFile(out, JSON.stringify(manifest, null, 1) + '\n')
console.log(`photos.json: ${files.length} photos`)
