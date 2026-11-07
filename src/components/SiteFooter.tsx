import { site } from '@/content/site'

export function SiteFooter() {
  return (
    <footer className="wrap no-print flex flex-wrap justify-between gap-4 pb-14 pt-10 text-sm text-vein">
      <span>
        {site.name}, {site.company.name}
      </span>
      <span>{site.contact.city}</span>
    </footer>
  )
}
