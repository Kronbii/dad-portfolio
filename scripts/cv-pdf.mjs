// Prints the /cv page to public/cv/mahmoud-kronbi-cv.pdf with headless Chrome.
// Needs a production server running: npx next build && npx next start -p 3200
// Usage: npm run cv:pdf  (CV_URL overrides the page address)
import { execFileSync } from 'node:child_process'
import { mkdirSync, statSync } from 'node:fs'
import path from 'node:path'

const url = process.env.CV_URL ?? 'http://127.0.0.1:3200/cv'
const out = path.resolve(import.meta.dirname, '..', 'public', 'cv', 'mahmoud-kronbi-cv.pdf')
const chrome = process.env.CHROME ?? 'google-chrome'

const res = await fetch(url).catch(() => null)
if (!res?.ok) {
  console.error(`Couldn't load ${url}. Start the production server first: npx next build && npx next start -p 3200`)
  process.exit(1)
}

mkdirSync(path.dirname(out), { recursive: true })
execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=5000', `--print-to-pdf=${out}`, url], { stdio: 'ignore' })
console.log(`Wrote ${path.relative(process.cwd(), out)} (${Math.round(statSync(out).size / 1024)} KB)`)
