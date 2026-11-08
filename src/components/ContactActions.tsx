import { Mail, Phone } from 'lucide-react'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

const btn =
  'inline-flex min-h-12 items-center gap-2.5 rounded-[2px] border-[1.5px] border-ink px-[22px] text-base font-semibold no-underline transition-colors'
export const btnSolid = cn(btn, 'bg-ink text-field hover:border-rosso hover:bg-rosso')
export const btnLine = cn(btn, 'hover:bg-paper')

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn('size-[18px] shrink-0', className)}>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"
      />
    </svg>
  )
}

export function WhatsAppButton({ className }: { className?: string }) {
  return (
    <a className={cn(btnSolid, className)} href={site.contact.whatsapp}>
      <WhatsAppIcon />
      Chat on WhatsApp
    </a>
  )
}

/** All three ways to reach me: WhatsApp first, then a call, then email. */
export function ContactActions({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      <WhatsAppButton />
      <a className={btnLine} href={site.contact.phone.href}>
        <Phone className="size-[18px]" aria-hidden />
        Call {site.contact.phone.label}
      </a>
      <a className={btnLine} href={`mailto:${site.contact.email}`}>
        <Mail className="size-[18px]" aria-hidden />
        Email me
      </a>
    </div>
  )
}
