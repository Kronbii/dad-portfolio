import type { Metadata } from 'next'
import { FactValue, isShown } from '@/components/FactValue'
import { cv } from '@/content/cv'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'CV',
  description: `${cv.name}, ${cv.title}. Experience, selected projects, education and languages.`,
}

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 break-after-avoid border-b border-rosso/50 pb-1.5 font-display text-[20px] text-rosso print:text-[15pt]">{children}</h2>
}

/** The CV as a page: reads on screen, and prints to two A4 pages (scripts/cv-pdf.mjs). */
export default function CvPage() {
  const experience = cv.experience.filter((job) => isShown(job.company))
  return (
    <div className="wrap pb-6 print:max-w-none print:p-0">
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-vein">This is my CV as a web page. You can also download it.</p>
        <a href={site.cv.pdf} download className="inline-flex min-h-11 items-center rounded-[2px] border-[1.5px] border-ink bg-ink px-5 font-semibold text-field no-underline hover:border-rosso hover:bg-rosso">
          Download PDF
        </a>
      </div>

      <article className="mx-auto max-w-[820px] bg-paper p-[clamp(24px,5vw,56px)] text-[15px] leading-[1.55] print:max-w-none print:bg-white print:p-0 print:text-[10pt]">
        <header className="double-rule p-6 print:p-[6mm]">
          <h1 className="font-display text-[clamp(34px,5vw,46px)] leading-none print:text-[28pt]">{cv.name}</h1>
          <p className="mt-2 text-[17px] font-semibold text-rosso print:text-[12pt]">{cv.title}</p>
          <ul className="m-0 mt-4 flex list-none flex-wrap gap-x-6 gap-y-1 p-0 text-[14px] print:text-[9.5pt]">
            {cv.contact.map((c) => (
              <li key={c.label}>
                <span className="text-vein">{c.label}: </span>
                {c.value}
              </li>
            ))}
          </ul>
        </header>

        <section className="mt-7 print:mt-[6mm]">
          <Heading>Profile</Heading>
          <p className="max-w-none">{cv.summary}</p>
        </section>

        <section className="mt-7 print:mt-[6mm]">
          <Heading>Expertise</Heading>
          <ul className="m-0 grid list-disc gap-x-8 gap-y-1 pl-5 sm:grid-cols-2 print:grid-cols-2">
            {cv.expertise.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-7 print:mt-[6mm]">
          <Heading>Experience</Heading>
          {experience.map((job) => (
            <div key={job.role} className="mb-4 break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-sans text-[16px] font-semibold print:text-[11pt]">
                  {job.role}, <FactValue value={job.company} />
                </h3>
                <span className="text-vein">
                  {isShown(job.period) ? (
                    <>
                      <FactValue value={job.period} />
                      {job.current ? ' to present' : ''}
                    </>
                  ) : job.current ? (
                    'Current'
                  ) : null}
                </span>
              </div>
              <ul className="m-0 mt-1.5 list-disc space-y-1 pl-5">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-7 print:mt-[6mm]">
          <Heading>Selected projects</Heading>
          <div className="grid gap-6 sm:grid-cols-[1.4fr_1fr] print:grid-cols-[1.4fr_1fr]">
            {cv.projects.map((group) => (
              <div key={group.group}>
                <h3 className="mb-1.5 break-after-avoid font-sans text-[15px] font-semibold print:text-[10.5pt]">{group.group}</h3>
                <ul className="m-0 list-disc space-y-1 pl-5">
                  {group.items.map((item) => (
                    <li key={item} className="break-inside-avoid">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-7 grid gap-6 sm:grid-cols-3 print:mt-[6mm] print:grid-cols-3">
          <section className="break-inside-avoid">
            <Heading>Education</Heading>
            <ul className="m-0 list-none space-y-2 p-0">
              {cv.education.map((e) => (
                <li key={e.degree}>
                  {e.degree}
                  <br />
                  <span className="text-vein">{e.school}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="break-inside-avoid">
            <Heading>Languages</Heading>
            <ul className="m-0 list-none space-y-1 p-0">
              {cv.languages.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </section>
          <section className="break-inside-avoid">
            <Heading>Also</Heading>
            <p>{cv.tools}</p>
            <p className="mt-2 text-vein">{cv.references}</p>
          </section>
        </div>
      </article>
    </div>
  )
}
