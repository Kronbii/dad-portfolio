import { site } from './site'
import { verify, type Fact } from './types'

/** Single source for the /cv page, its PDF and the Word file (scripts/cv-docx.mjs). */
export const cv = {
  name: site.name,
  title: 'Finishing & Construction Project Manager',
  contact: [
    { label: 'Phone and WhatsApp', value: site.contact.phone.label },
    { label: 'Email', value: site.contact.email },
    { label: 'Based in', value: site.contact.city },
    { label: 'Website', value: site.url.replace(/^https?:\/\//, '') },
  ],
  summary:
    'Finishing and construction project manager with more than twenty years of work across Nigeria. Takes buildings from structure to final finish: marble and stone, bathrooms, ceilings, floors, pools, facades and landscape. Runs the crews on site every day, holds work to an exact standard, and makes on site what cannot be bought locally.',
  expertise: [
    'Finishing management for villas, halls and large buildings',
    'Marble, onyx and stone: book-matched walls, inlays, medallions',
    'Bathrooms, spas, pools and water features',
    'Ceilings: domes, suspended ceilings, cove lighting, stained glass',
    'Facades, balustrades, paving and landscape',
    'Interior design drawings and kitchen layouts',
    'On-site manufacturing of elements not available locally',
    'Site management, crew leadership, quality and safety control',
  ],
  experience: [
    {
      role: 'General Manager',
      company: 'RAZANCO Nigeria Limited, Lagos',
      period: verify('Start year: 2018 (old CV) or 2020 (incorporation)?') as Fact,
      current: true,
      points: [
        'Runs finishing and construction projects from design to handover for private owners, consultants and construction firms.',
        'Leads site teams of masons, tilers, carpenters and labourers, and coordinates with architects, engineers and consultants.',
        'Inspects work daily and sets the quality and safety standard on every site.',
        'Designs and makes elements that cannot be bought locally, such as cast balustrades and lighting poles.',
      ],
    },
    {
      role: 'Earlier career',
      company: verify('Roles, companies and years before RAZANCO') as Fact,
      period: verify('Years') as Fact,
      current: false,
      points: [],
    },
  ],
  projects: [
    {
      group: 'Finishing and interiors',
      items: [
        'Lagoon-front private residence, Lagos: exterior finishing, balustrades made on site, terraces, pool and landscape',
        'Triplex villa, Banana Island, Lagos: finishing, for Console Consultant',
        'Marble interiors for private homes: inlaid floors, onyx and marble walls, bathrooms, staircases, dome and stained-glass ceilings',
        'Event hall, Ibadan: interior finishing',
        'House renovation, pool and gate, Victoria Island, Lagos',
        "Women's spa, Wuse 2, Abuja",
        'House finishing, Gwarinpa, Abuja',
        'Three-storey building, Lokoja: finishing, for Unicane',
        'RCC guest house, Ibadan: finishing, with Gazco Construction',
        'Finishing works for KRAFT Construction, Ibadan',
        'Factory tiling, Mile 2, Lagos',
      ],
    },
    {
      group: 'Structure and infrastructure',
      items: [
        'Box culverts, Makarfi, Kano: concrete works',
        'Round restaurant, Abuja: structure',
        'Waffle slab, Ogbomosho: concrete works',
        'Industrial borehole and water treatment plant, Victoria Island, Lagos',
        'Automatic iron gate, Ikoyi, Lagos',
        'Plumbing works for Jet Ceramics, Abuja',
      ],
    },
  ],
  education: [
    { degree: "Master's degree in Sociology", school: 'Lebanese University' },
    { degree: 'BS in Biology', school: 'American University of Beirut' },
  ],
  languages: ['Arabic (native)', 'English (fluent)', 'French (intermediate)'],
  tools: 'Microsoft Word and Excel',
  references: 'References are available on request.',
}
