// Writes cv/mahmoud-kronbi-cv.docx, an editable Word version of the CV, from src/content/cv.ts.
// Facts still to confirm appear highlighted ("[To confirm: …]") so they can be filled in Word.
// Usage: npm run cv:docx
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import ts from 'typescript'
import { AlignmentType, BorderStyle, Document, LevelFormat, Packer, Paragraph, TabStopType, TextRun } from 'docx'

const root = path.resolve(import.meta.dirname, '..')
const out = path.join(root, 'cv', 'mahmoud-kronbi-cv.docx')

// The content lives in TypeScript; transpile just those files so this script needs no extra tooling.
async function loadCv() {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'cv-content-'))
  for (const name of ['types', 'site', 'cv']) {
    const source = await readFile(path.join(root, 'src', 'content', `${name}.ts`), 'utf8')
    const js = ts
      .transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } })
      .outputText.replace(/from '\.\/(\w+)'/g, "from './$1.mjs'")
    await writeFile(path.join(dir, `${name}.mjs`), js)
  }
  return (await import(pathToFileURL(path.join(dir, 'cv.mjs')).href)).cv
}

const cv = await loadCv()

const ROSSO = '8A2D22'
const INK = '211E1B'
const VEIN = '6F675D'
const isVerify = (v) => typeof v === 'object' && v !== null && 'verify' in v

/** Runs for a fact: plain text, or a highlighted note to fill in. */
const fact = (value, opts = {}) =>
  isVerify(value) ? [new TextRun({ text: `[To confirm: ${value.verify}]`, highlight: 'yellow', ...opts })] : [new TextRun({ text: value, ...opts })]

const heading = (text) =>
  new Paragraph({
    heading: 'Heading1',
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ROSSO, space: 2 } },
    children: [new TextRun(text)],
  })

const bullet = (children) => new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: typeof children === 'string' ? [new TextRun(children)] : children })
const para = (children, opts = {}) => new Paragraph({ children: typeof children === 'string' ? [new TextRun(children)] : children, ...opts })

const children = [
  new Paragraph({ heading: 'Title', children: [new TextRun(cv.name)] }),
  para([new TextRun({ text: cv.title, bold: true, color: ROSSO, size: 24 })], { spacing: { after: 120 } }),
  ...cv.contact.map((c) => para([new TextRun({ text: `${c.label}: `, color: VEIN }), new TextRun(c.value)])),

  heading('Profile'),
  para(cv.summary),

  heading('Expertise'),
  ...cv.expertise.map((item) => bullet(item)),

  heading('Experience'),
  ...cv.experience.flatMap((job) => [
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: 9000 }],
      spacing: { before: 120, after: 40 },
      keepNext: true,
      children: [
        new TextRun({ text: `${job.role}, `, bold: true }),
        ...fact(job.company, { bold: true }),
        new TextRun({ text: '\t' }),
        ...fact(job.period, { color: VEIN }),
        ...(job.current ? [new TextRun({ text: ' to present', color: VEIN })] : []),
      ],
    }),
    ...job.points.map((point) => bullet(point)),
  ]),

  heading('Selected projects'),
  ...cv.projects.flatMap((group) => [
    para([new TextRun({ text: group.group, bold: true })], { spacing: { before: 120, after: 40 }, keepNext: true }),
    ...group.items.map((item) => bullet(item)),
  ]),

  heading('Education'),
  ...cv.education.map((e) => para([new TextRun(e.degree), new TextRun({ text: `, ${e.school}`, color: VEIN })])),

  heading('Languages'),
  para(cv.languages.join(' · ')),

  heading('Also'),
  para(cv.tools),
  para([new TextRun({ text: cv.references, color: VEIN })], { spacing: { before: 80 } }),
]

const doc = new Document({
  creator: cv.name,
  title: `${cv.name} CV`,
  styles: {
    default: { document: { run: { font: 'Calibri', size: 21, color: INK }, paragraph: { spacing: { after: 60, line: 276 } } } },
    paragraphStyles: [
      { id: 'Title', name: 'Title', basedOn: 'Normal', next: 'Normal', run: { font: 'Georgia', size: 52, color: INK }, paragraph: { spacing: { before: 0, after: 60 }, keepNext: true } },
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: 'Georgia', size: 28, color: ROSSO }, paragraph: { spacing: { before: 280, after: 100 }, keepNext: true, outlineLevel: 0 } },
    ],
  },
  numbering: {
    config: [{ reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 240 } } } }] }],
  },
  sections: [{ properties: { page: { margin: { top: 1000, bottom: 1000, left: 1100, right: 1100 } } }, children }],
})

await mkdir(path.dirname(out), { recursive: true })
await writeFile(out, await Packer.toBuffer(doc))
console.log(`Wrote ${path.relative(process.cwd(), out)}`)
