import { cn } from '@/lib/utils'

/**
 * A line with one phrase highlighted in the text-selection colour (rosso, paper text).
 * `draw` wipes the highlight in once: "load" after the hero has risen, "scroll" as the heading comes into view.
 */
export function Marked({ text, mark, draw }: { text: string; mark?: string; draw?: 'load' | 'scroll' }) {
  const at = mark ? text.indexOf(mark) : -1
  if (!mark || at < 0) return text
  return (
    <>
      {text.slice(0, at)}
      <mark className={cn('mark', draw === 'load' && 'mark-load', draw === 'scroll' && 'mark-scroll')}>{mark}</mark>
      {text.slice(at + mark.length)}
    </>
  )
}
