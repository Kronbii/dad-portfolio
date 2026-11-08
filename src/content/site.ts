import type { Caption, Photo, Step, Trade } from './types'

const p = (src: string, alt: string): Photo => ({ src, alt })

const whatsappText = "Hello Mr Kronbi, I'd like to discuss finishing work for my project."

/** A WhatsApp chat with him, opened with the visitor's message already typed. */
export const whatsappLink = (text: string) => `https://wa.me/2348134004430?text=${encodeURIComponent(text)}`

export const site = {
  name: 'Mahmoud Kronbi',
  role: 'Finishing contractor, Lagos',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mahmoud-kronbi.vercel.app',
  description:
    'I finish luxury homes and large buildings across Nigeria: marble, bathrooms, ceilings, floors, pools and facades.',
  company: { name: 'RAZANCO Nigeria Limited', rc: '168931' },
  contact: {
    whatsapp: whatsappLink(whatsappText),
    phone: { href: 'tel:+2348134004430', label: '+234 813 400 4430' },
    email: 'Mahmoud.kronbi@gmail.com',
    city: 'Lagos, Nigeria',
  },
  cv: { pdf: '/cv/mahmoud-kronbi-cv.pdf' },
  /** His contact card, so a visitor can save the number in one tap. */
  vcard: '/mahmoud-kronbi.vcf',
}

export const hero = {
  headline: 'Anyone can put a building up. I\u00a0make it beautiful.',
  /** Highlighted in the design versions, in the text-selection rosso. Non-breaking spaces keep short words with their neighbours. */
  headlineMark: 'I\u00a0make it beautiful.',
  lede:
    'For more than twenty years I have finished villas, halls and large buildings across Nigeria: marble, bathrooms, ceilings, floors, pools and facades. I run the work from the first tile to the final polish, and I am on site every day until it is right.',
  photo: p('marble-interiors/dome-ceiling', 'A finished dome ceiling with radiating mouldings and recessed lights above a double-height hall'),
}

export const finishes = {
  title: 'What I finish',
  intro: 'Structure makes a building stand. Finishing is what people see, touch and remember. I take on all of it, inside and out.',
  trades: [
    { title: 'Marble and stone', text: 'Book-matched walls, inlaid borders and medallions, cut and set by hand.', photo: p('marble-interiors/onyx-bath', 'Honey onyx and white marble wall panels with ornamental black borders') },
    { title: 'Bathrooms and spas', text: 'Wet rooms, showers and spa suites in marble, onyx and porcelain.', photo: p('marble-interiors/master-bath', 'Master bathroom with stone-clad walls, lit niches and a sunken bath') },
    { title: 'Ceilings', text: 'Domes, suspended ceilings, cove lighting and stained glass.', photo: p('marble-interiors/stained-glass', 'Backlit stained-glass ceiling panels') },
    { title: 'Floors', text: 'Marble inlays and parquet, laid flat and true across every room.', photo: p('marble-interiors/parquet', 'Parquet floor laid in a geometric pattern in a bright room') },
    { title: 'Pools and water', text: 'Pools, mosaic work and water walls, indoors and out.', photo: p('finishes/mosaic-pool', 'Swimming pool with blue mosaic steps and a diamond pattern on the floor') },
    { title: 'Facades and landscape', text: 'Balustrades, stone cladding, paving and gardens that finish the outside.', photo: p('lagoon-residence/stair-balustrade', 'Exterior staircase with white balustrades and stone treads') },
    { title: 'Interior design', text: 'I draw the design too, from kitchen layouts to whole rooms.', photo: p('finishes/kitchen-drawing', '3D design drawing of a kitchen with curved cabinets and a stone floor') },
  ] satisfies Trade[],
  note: "When a material can't be found in Nigeria, I make it myself: balustrades cast on site, or lighting poles for a garage when none were for sale.",
}

export const madeOnSite = {
  title: 'Made on site, not imported',
  intro:
    'Instead of importing balustrades for the lagoon-front residence, I made them. Every baluster and every curved coping was produced on site, from a profile drawn for the house.',
  steps: [
    { title: 'The profile', text: 'Drawn full size and cut from board, with each height marked and corrected.', photo: p('lagoon-residence/baluster-profile', 'Baluster profile cut from board, with pencil dimensions and a red correction at the top') },
    { title: 'The master', text: 'A wooden master shaped to the profile and trimmed until the proportions were right.', photo: p('lagoon-residence/baluster-master', 'Wooden master baluster standing on site, marked in red where it will be trimmed') },
    { title: 'The mould', text: 'A rubber mould taken from the master, so every piece comes out the same.', photo: p('lagoon-residence/baluster-mould', 'Rubber baluster mould in a timber box on the site workbench') },
    { title: 'Casting', text: 'Balusters cast on site, checked and racked to cure.', photo: p('lagoon-residence/balusters-cast', 'Freshly cast white balusters lying in a timber rack') },
    { title: 'Curved copings', text: 'Handrails and copings cast to follow each curve of the terrace.', photo: p('lagoon-residence/coping-curves', 'Curved coping pieces laid out along the terrace steps') },
    { title: 'Installed', text: 'Set along the terraces above the lagoon.', photo: p('lagoon-residence/terraces-gazebo', 'Finished curving balustrades around a gazebo above the lagoon') },
  ] satisfies Step[],
}

export const renderToReality = {
  title: 'From render to reality',
  intro: "The architect's render of a villa entrance on Banana Island, and the same entrance after my team finished it. Drag to compare.",
  before: p('lagoon-residence/entrance-render', "The architect's render of the villa entrance"),
  after: p('lagoon-residence/entrance-built', 'The finished entrance: arched porch, fountain and planted bed'),
}

/** The design versions compare the terraces instead. The render was modelled afterwards to match the finished photo, so it is labelled as an illustration. */
export const terracesRender = {
  title: 'From render to reality',
  mark: 'reality',
  intro: 'A render shows the plan. The finished terrace shows the work: real stone underfoot, the mosaic pool, the balustrades I cast on site, and the lagoon behind. Drag to compare.',
  before: p('lagoon-residence/terraces-render', '3D render of the terraces, gazebo and pool'),
  after: p('lagoon-residence/terraces-from-above', 'The finished terraces, gazebo and pool above the lagoon, with the city across the water'),
  labels: ['Render (illustration)', 'Finished'] as const,
}

export const details = {
  title: 'In the details',
  intro: 'Look closely. Borders meet without a gap, medallions sit dead centre, and each joint lines up with the next room.',
  photos: [
    p('marble-interiors/medallion-floor', 'Gold fleur-de-lis medallion inlaid in a cream marble floor'),
    p('marble-interiors/medallion-square', 'Square marble medallion set inside a red and grey border'),
    p('marble-interiors/inlay-frame', 'Inlaid floor frame with leaf motifs at each corner'),
    p('marble-interiors/inlay-border-floor', 'Grey marble border framing a field of cream tiles'),
    p('marble-interiors/floor-diamond-grid', 'Marble floor with a diamond grid of small dark inlays'),
    p('marble-interiors/marble-corridor', 'Long marble corridor with a continuous inlaid border'),
  ],
}

export const onSite = {
  title: 'On site, every day',
  intro: "I don't manage from an office. I check every slab, line and joint myself, and stay with the crew until it's right.",
  photos: [
    p('him/kneeling-onyx', 'Mahmoud Kronbi kneeling to inspect a newly laid onyx floor'),
    p('him/inspecting-inlay', 'Mahmoud Kronbi checking an inlaid corridor floor'),
    p('him/instructing', 'Mahmoud Kronbi directing a worker at the edge of a pool'),
    p('him/crew-pool', 'Mahmoud Kronbi with his crew inside a pool under construction'),
    p('him/marble-room', 'Mahmoud Kronbi standing in a finished marble room'),
  ],
}

export const scale = {
  title: 'Built to scale',
  intro:
    'Finishing a large building means running large crews. I have managed whole builds, from pile foundations on the Lagos lagoon to box culverts in Kano, so a big site is familiar ground.',
  items: [
    { photo: p('built-to-scale/foundations-wide', 'Large foundation site beside the Lagos lagoon'), caption: 'Lagoon-front foundations, Lagos' },
    { photo: p('built-to-scale/culverts-formwork', 'Timber formwork for box culverts'), caption: 'Box culverts, Makarfi, Kano' },
    { photo: p('built-to-scale/restaurant-roof-rebar', 'Radial roof reinforcement on a round building'), caption: 'Round restaurant, Abuja' },
    { photo: p('built-to-scale/villa-structure', 'Three-storey villa under scaffolding'), caption: 'Villa structure, Lagos' },
  ] satisfies Caption[],
}

export const about = {
  title: 'About me',
  lede: 'I came to Nigeria from Lebanon and have spent more than twenty years building and finishing across the country, in Lagos, Abuja, Ibadan, Kano, Lokoja and Ogbomosho.',
  body: 'I run my own company, RAZANCO Nigeria Limited (RC 168931), and work with private owners, consultants and construction firms on villas, halls, guest houses, factories and infrastructure. I speak English, Arabic and French.',
  references: 'References are available on request.',
  photo: p('him/portrait-lagoon', 'Mahmoud Kronbi in a hard hat on a balcony above the lagoon'),
}

export const contactBlock = {
  title: 'Planning a building? Talk to me about the finish.',
  text: 'Send drawings or photos of your project on WhatsApp, or call me directly.',
}

/** The design versions: the balustrade story told on posters, with the reason behind it. */
export const madeOnSitePosters = {
  title: 'Made on site, not\u00a0imported.',
  mark: 'not\u00a0imported.',
  why: 'The terraces of the lagoon-front residence curve down to the water, with balustrades along every edge. Importing that many, in curves that matched the terraces, would have been slow and expensive.',
  how: 'So I made them on site: a profile drawn for the house, a master shaped from it, a mould taken from the master, then every baluster and coping cast and fitted by my crew.',
  link: { href: '/work/lagoon-front-residence', label: 'See the whole residence' },
}

/** The design versions: a shorter about that opens with hello in English, Arabic and Yoruba. */
export const aboutShort = {
  greeting: ['Hello.', 'Marhaba.', 'Báwo.'],
  lede: "I'm Mahmoud. I came to Nigeria from Lebanon and have spent more than twenty years building and finishing here, for private owners, consultants and construction firms.",
  facts: ['RAZANCO Nigeria Limited, RC 168931', 'English, Arabic and French', 'References on request'],
  photo: p('him/portrait-lagoon', 'Mahmoud Kronbi in a hard hat on a balcony above the lagoon'),
  snapshot: p('him/with-worker', 'Mahmoud Kronbi with one of his workers on site, both in hard hats'),
}

/** The design versions: the contact as a visiting card lying on the CV. */
export const contactCard = {
  title: 'Planning a building? Talk to me about the\u00a0finish.',
  mark: 'the\u00a0finish.',
  text: 'Send drawings or photos of your project on WhatsApp, or call me directly. Save my number so it is there when the project starts.',
}
