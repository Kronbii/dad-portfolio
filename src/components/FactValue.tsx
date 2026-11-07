import { isVerify, type Fact } from '@/content/types'
import { showVerify } from '@/lib/utils'

/** True when a fact should be rendered: known facts always, unconfirmed ones only in development. */
export const isShown = (fact: Fact | undefined): fact is Fact => fact !== undefined && (!isVerify(fact) || showVerify)

export function FactValue({ value }: { value: Fact }) {
  if (!isVerify(value)) return <>{value}</>
  return showVerify ? <span className="verify">[VERIFY: {value.verify}]</span> : null
}

export function Facts({ items }: { items: { label: string; value: Fact }[] }) {
  const rows = items.filter((item) => isShown(item.value))
  return (
    <dl className="facts mt-7">
      {rows.map((row) => (
        <div key={row.label} className="contents">
          <dt>{row.label}</dt>
          <dd>
            <FactValue value={row.value} />
          </dd>
        </div>
      ))}
    </dl>
  )
}
