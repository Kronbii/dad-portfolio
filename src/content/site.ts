import type { Caption, BeforeAfter, Photo, Place, Step, Tile } from './types'

const p = (src: string, alt: string): Photo => ({ src, alt })

const whatsappText = "Hello Mr Kronbi, I'd like to discuss finishing work for my project."

/** A WhatsApp chat with him, opened with the visitor's message already typed. */
const whatsappLink = (text: string) => `https://wa.me/2348134004430?text=${encodeURIComponent(text)}`

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
  headline: 'Anyone can put a building up. I make it beautiful.',
  /** Highlighted in the text-selection rosso. Non-breaking spaces keep short words with their neighbours. */
  headlineMark: 'I make it beautiful.',
  /** The rooms that take turns in the hero's frame. */
  scenes: [
    { photo: p('marble-interiors/dome-ceiling', 'A finished dome ceiling with radiating mouldings and recessed lights above a double-height hall'), caption: 'Dome ceiling, private residence' },
    { photo: p('marble-interiors/onyx-bath', 'Honey onyx and white marble wall panels with ornamental black borders'), caption: 'Onyx and marble bathroom' },
    { photo: p('lagoon-residence/terraces-from-above', 'Curving terraces, a thatched gazebo and a mosaic pool above the Lagos lagoon'), caption: 'Terraces and pool above the lagoon' },
    { photo: p('marble-interiors/marble-staircase', 'Marble staircase with an inlaid floor border at its foot'), caption: 'Marble staircase and inlaid floor' },
    { photo: p('marble-interiors/stained-glass-lit', 'Backlit stained-glass ceiling glowing above a hall'), caption: 'Stained-glass ceiling' },
  ] satisfies Caption[],
}

/** x and y are in the map's own units (see components/sections/nigeria.ts). */
export const acrossNigeria = {
  title: 'Across Nigeria',
  places: [
    { name: 'Lagos', work: 'Lagoon-front residence, marble interiors, villa structures', x: 36, y: 310, photo: p('lagoon-residence/terrace-lagoon', 'Curving balustrade terrace beside the lagoon') },
    { name: 'Ibadan', work: 'Event hall and a guest house', x: 56, y: 273, photo: p('event-hall/hall-stage', 'Event hall with a polished checkered floor and stage') },
    { name: 'Ogbomosho', work: 'Waffle slab', x: 70, y: 243, labelAbove: true, photo: p('built-to-scale/waffle-slab', 'Waffle slab formwork') },
    { name: 'Lokoja', work: 'Three-storey building', x: 170, y: 256, photo: p('built-to-scale/lokoja-building', 'Three-storey building in Lokoja') },
    { name: 'Abuja', work: "Round restaurant, house finishing and a women's spa", x: 200, y: 206, photo: p('built-to-scale/restaurant-walls', 'Walls of the round restaurant going up') },
    { name: 'Kano', work: 'Box culverts at Makarfi', x: 241, y: 88, photo: p('built-to-scale/culverts-formwork', 'Timber formwork for box culverts') },
  ] satisfies Place[],
}

/** What he finishes, as photos with names. The second photo crossfades in on hover. */
export const finishes = {
  title: 'What I finish',
  tiles: [
    { name: 'Marble and stone', photo: p('marble-interiors/onyx-bath', 'Onyx and white marble panels with ornamental borders'), second: p('marble-interiors/medallion-square', 'Square marble medallion in a red and grey border') },
    { name: 'Bathrooms and spas', photo: p('marble-interiors/master-bath', 'Master bathroom with lit niches'), second: p('marble-interiors/shower-carrara', 'White veined marble shower with a bench') },
    { name: 'Ceilings', photo: p('marble-interiors/stained-glass', 'Backlit stained-glass ceiling'), second: p('marble-interiors/dome-ceiling', 'Dome ceiling with radiating mouldings') },
    { name: 'Floors', photo: p('marble-interiors/parquet', 'Parquet in a geometric pattern'), second: p('marble-interiors/floor-diamond-grid', 'Marble floor with a diamond grid of inlays') },
    { name: 'Pools', photo: p('finishes/mosaic-pool', 'Pool with blue mosaic steps'), second: p('lagoon-residence/pool-paving', 'Pool with crazy-paving surround and gazebos') },
    { name: 'Water features', photo: p('finishes/water-wall', 'Stone water wall lit at night'), second: p('lagoon-residence/entrance-built', 'Entrance with a fountain bed') },
    { name: 'Facades and landscape', photo: p('lagoon-residence/stair-balustrade', 'Exterior stair with white balustrades'), second: p('lagoon-residence/drive-gardens', 'Planted beds and stone paving along a drive') },
    { name: 'Interior design', photo: p('finishes/kitchen-drawing', '3D design drawing of a kitchen'), second: p('lagoon-residence/entrance-render', 'Render of a villa entrance') },
  ] satisfies Tile[],
}

/** The balustrade story: the lagoon-front project page shows it as numbered steps. */
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

/** The home page tells the same story on posters, with the reason behind it. */
export const madeOnSitePosters = {
  title: 'Made on site, not imported.',
  mark: 'not imported.',
  why: 'The terraces of the lagoon-front residence curve down to the water, with balustrades along every edge. Importing that many, in curves that matched the terraces, would have been slow and expensive.',
  how: 'So I made them on site: a profile drawn for the house, a master shaped from it, a mould taken from the master, then every baluster and coping cast and fitted by my crew.',
  link: { href: '/work/lagoon-front-residence', label: 'See the whole residence' },
}

/** The lagoon-front residence's entrance: the architect's render against the built gate, and the site before and after. */
export const renderToReality = {
  title: 'From render to reality',
  mark: 'reality',
  intro: "The architect's render of the lagoon-front residence's entrance gate against the gate as my team built it, and the same entrance before and after the work. Drag to compare.",
  pairs: [
    {
      before: p('lagoon-residence/gate-render', "The architect's render of the entrance gate"),
      after: p('lagoon-residence/gate-built', 'The finished entrance gate, with vertical bars and patterned panels'),
      labels: ['Render', 'Finished'],
    },
    {
      before: p('lagoon-residence/gate-before', 'The old iron gate before the work'),
      after: p('lagoon-residence/gate-after', 'The new entrance: a tiled roof over the gate and the pedestrian door'),
      labels: ['Before', 'After'],
    },
  ] satisfies BeforeAfter[],
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

/** The structural work, shown as proof he can run a large site. */
export const scale = {
  title: 'Behind other hoardings',
  intro: 'The structure is usually by others. I have run that too, from pile foundations on the Lagos lagoon to box culverts in Kano.',
  link: { href: '/work/built-to-scale', label: 'See the structural work' },
  items: [
    { photo: p('built-to-scale/foundations-wide', 'Large foundation site beside the Lagos lagoon'), caption: 'Lagoon-front foundations, Lagos' },
    { photo: p('built-to-scale/culverts-formwork', 'Timber formwork for box culverts'), caption: 'Box culverts, Makarfi, Kano' },
    { photo: p('built-to-scale/restaurant-roof-rebar', 'Radial roof reinforcement on a round building'), caption: 'Round restaurant, Abuja' },
    { photo: p('built-to-scale/villa-structure', 'Three-storey villa under scaffolding'), caption: 'Villa structure, Lagos' },
  ] satisfies Caption[],
}

/** A short about that opens with hello in English, Arabic and Yoruba. */
export const about = {
  greeting: ['Hello.', 'Marhaba.', 'Báwo.'],
  lede: "I'm Mahmoud. I came to Nigeria from Lebanon and have spent more than twenty years building and finishing here, for private owners, consultants and construction firms.",
  facts: ['RAZANCO Nigeria Limited, RC 168931', 'English, Arabic and French', 'References on request'],
  photo: p('him/portrait-lagoon', 'Mahmoud Kronbi in a hard hat on a balcony above the lagoon'),
  snapshot: p('him/with-worker', 'Mahmoud Kronbi with one of his workers on site, both in hard hats'),
}

/** The contact, as his visiting card lying on his CV. It closes the home page and every project page. */
export const contactCard = {
  title: 'Planning a building? Talk to me about the finish.',
  mark: 'the finish.',
  text: 'Send drawings or photos of your project on WhatsApp, or call me directly. Save my number so it is there when the project starts.',
}
