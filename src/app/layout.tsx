import type { Metadata, Viewport } from 'next'
import { Figtree, Marcellus } from 'next/font/google'
import { site } from '@/content/site'
import './globals.css'

const marcellus = Marcellus({ weight: '400', subsets: ['latin'], variable: '--font-marcellus', display: 'swap' })
const figtree = Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}, finishing contractor in Lagos`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { type: 'website', siteName: site.name, locale: 'en_NG' },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = { themeColor: '#EDE6DA' }

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: 'Finishing contractor and construction project manager',
  url: site.url,
  email: `mailto:${site.contact.email}`,
  telephone: site.contact.phone.label,
  address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
  worksFor: { '@type': 'Organization', name: site.company.name },
  knowsLanguage: ['en', 'ar', 'fr'],
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${marcellus.variable} ${figtree.variable}`} suppressHydrationWarning>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  )
}
