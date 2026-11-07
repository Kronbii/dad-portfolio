import Link from 'next/link'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="wrap py-24 text-center">
        <h1 className="t-h2">This page isn&apos;t here</h1>
        <p className="mx-auto mt-5 max-w-[50ch] text-vein">The link may be old or mistyped. His work and contact details are on the home page.</p>
        <Link href="/" className="mt-8 inline-block font-semibold text-rosso underline underline-offset-4">
          Go to the home page
        </Link>
      </main>
      <SiteFooter />
    </>
  )
}
