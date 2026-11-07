import { cn } from '@/lib/utils'

export function SectionHead({ title, intro, className, as: Tag = 'h2' }: { title: string; intro?: string; className?: string; as?: 'h1' | 'h2' }) {
  return (
    <div className={cn('mb-9 grid items-end gap-x-16 gap-y-6 md:mb-14 md:grid-cols-2', className)}>
      <Tag className="t-h2">{title}</Tag>
      {intro && <p className="max-w-[62ch] text-vein">{intro}</p>}
    </div>
  )
}
