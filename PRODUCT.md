# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** developers and owners of large buildings who need a finishing contractor. They usually arrive from a link Mahmoud Kronbi sends them himself on WhatsApp, on a phone, often mid-conversation about a job. The job of the site is to make them believe he can finish their building beautifully and to start a conversation.
- **Secondary:** private clients building or renovating luxury homes; a general audience hearing his name; possible employers.

## Product Purpose

The personal portfolio of Mahmoud Kronbi, a Lebanese finishing contractor and construction project manager with more than twenty years of work across Nigeria, who runs RAZANCO Nigeria Limited (RC 168931). Right now he is pursuing the finishing contracts for three large buildings. Success is a visitor who contacts him (WhatsApp first, then a call or email) or downloads his CV.

## Positioning

He is the person who makes a building beautiful once it stands: marble and stone inlay, bathrooms and spas, ceilings, floors, pools, facades and landscape. Structure is supporting proof only, to show he can run large sites. He is on site every day and holds work to an exact standard. When a material cannot be bought in Nigeria, he makes it himself: the cast balustrades of a lagoon-front residence, from his profile to the finished terraces, are photographed step by step.

## Operating Context

Visitors open the site from WhatsApp on Android phones and iPhones, often on slow or expensive mobile data in Nigeria. English only. Contact happens on WhatsApp (pre-filled message), by phone, or by email. The CV is downloaded as a PDF.

## Capabilities and Constraints

- Next.js on Vercel. Photos are pre-built at every size (`scripts/build-photos.mjs`); pages must stay light.
- Copy may be rewritten per design, but facts are fixed. Unconfirmed facts (project years, total project count, exact locations) stay hidden in production.
- Clients stay anonymous ("Private, name withheld"). Never call him "Engr." (no engineering degree). No date of birth, home address or reference phone numbers.
- Some project material is confidential; see `.media-work/CONFIDENTIAL.md` before using any photo or story.

## Brand Commitments

- Name: Mahmoud Kronbi. Company: RAZANCO Nigeria Limited, "Where Ideas Come Home…".
- Voice: plain, confident, specific; third person on the site. No hype.

## Evidence on Hand

- 113 curated photos in `public/images/` (finishing work, interiors, the lagoon-front residence and its balustrade-making sequence, the event hall in Ibadan, structural sites, photos of him on site).
- A render of a villa entrance next to the finished entrance.
- His CV content (`src/content/cv.ts`), project list, and the RAZANCO profile.
- Absent and not to be fabricated: testimonials, client names, project counts and years, awards, budgets.

## Product Principles

1. Finishing first: every surface leads with finished, beautiful work.
2. Prove, don't claim: real photos of his work and of him on site carry every claim.
3. Phone first, data light: the WhatsApp visitor on mobile data is the default case.
4. One clear action: talk to him on WhatsApp.
