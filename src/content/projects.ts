import { madeOnSite } from './site'
import { verify, type Photo, type Project } from './types'

const p = (src: string, alt: string): Photo => ({ src, alt })
const lagoon = (name: string, alt: string) => p(`lagoon-residence/${name}`, alt)
const marble = (name: string, alt: string) => p(`marble-interiors/${name}`, alt)
const scale = (name: string, alt: string) => p(`built-to-scale/${name}`, alt)

export const projects: Project[] = [
  {
    slug: 'lagoon-front-residence',
    title: 'Lagoon-front residence, Lagos',
    summary:
      "A private residence on the Lagos lagoon, finished outside to the architect's design: balustrades he made on site, curving terraces, a pool with gazebos, stone paving and gardens down to the water.",
    story: [
      'The work was the whole outside of a lagoon-front house: terraces that curve down towards the water, a pool with thatched gazebos, a stair to the jetty, stone paving, planting, and balustrades along every edge.',
      'Importing that many balustrades, in curves that matched the terraces, would have been slow and expensive. He made them on site instead, from a profile drawn for the house, and cast the curved copings to fit each bend.',
      'He ran the crews from setting out to the last planted bed, and was on site through all of it.',
    ],
    facts: [
      { label: 'Location', value: verify('Lagos lagoon. Is it Banana Island?') },
      { label: 'Client', value: 'Private, name withheld' },
      { label: 'Scope', value: 'Exterior finishing, balustrades, terraces, pool and landscape' },
      { label: 'His role', value: 'Construction and project manager' },
      { label: 'Year', value: verify('Year completed') },
    ],
    cover: lagoon('lagoon-pool', 'Pool, thatched gazebos and curved balustrades on a terrace above the Lagos lagoon'),
    thumbs: [
      lagoon('terrace-planter', 'Curved balustrade terrace with planting'),
      lagoon('terrace-curves', 'Balustrades curving down the terrace towards the pool'),
      lagoon('stair-balustrade-side', 'Exterior stair with white balustrades'),
    ],
    steps: { title: madeOnSite.title, intro: madeOnSite.intro, items: madeOnSite.steps },
    onSite: [
      p('him/instructing', 'Mahmoud Kronbi directing a worker at the edge of the pool'),
      p('him/crew-pool', 'Mahmoud Kronbi with his crew inside the pool shell'),
      p('him/crew-pool-shell', 'Mahmoud Kronbi and the crew setting out the curved pool wall'),
    ],
    gallery: [
      {
        title: 'Terraces and pool',
        photos: [
          lagoon('terrace-lagoon', 'Curving balustrade terrace beside the lagoon'),
          lagoon('terraces-from-above', 'The terraces, gazebos and pool seen from above'),
          lagoon('pool-gazebo', 'Pool and gazebo with balustrades curving past'),
          lagoon('terrace-pool-curve', 'Balustrade sweeping around a planted bed beside the pool'),
          lagoon('pool-paving', 'Pool surrounded by crazy-paving stone and gazebos'),
          lagoon('pool-balustrade-path', 'Balustraded path leading down to the pool'),
          lagoon('pool-facade', 'Round pool in front of the house'),
          lagoon('terrace-walk', 'Balustraded walkway along the side of the house'),
        ],
      },
      {
        title: 'Stairs and the jetty',
        photos: [
          lagoon('stair-balustrade', 'Exterior stair with balustrades and stone treads'),
          lagoon('lagoon-stairs', 'Stairs leading down from the terrace to the water'),
          lagoon('jetty-steps', 'Steps and walls down to the jetty'),
          lagoon('terrace-path', 'Curved terrace path with balustrades'),
          lagoon('terrace-evening', 'Balustraded terrace in the evening'),
        ],
      },
      {
        title: 'Making the balustrades',
        photos: [
          lagoon('baluster-sketch', 'Baluster photo marked up with heights and the base width'),
          lagoon('baluster-profile-clean', 'Baluster profile cut from board'),
          lagoon('baluster-master-marked', 'Wooden master baluster with the top marked for trimming'),
          lagoon('baluster-cast-single', 'A single cast baluster on the workshop floor'),
          lagoon('balusters-racked', 'Cast balusters in timber racks on site'),
          lagoon('coping-forms', 'Forms for the curved copings laid along the terrace'),
          lagoon('coping-pieces', 'Coping pieces laid out along the terrace before fixing'),
          lagoon('balusters-under-rail', 'Balusters set under the handrail'),
          lagoon('balustrade-close', 'Close view of the finished balusters and rail'),
          lagoon('balustrade-pool-edge', 'Balustrade going in along the pool terrace'),
          lagoon('stair-installing', 'Stair balustrade being installed'),
        ],
      },
      {
        title: 'Paving',
        photos: [
          lagoon('crazy-paving', 'Crazy-paving stone path through the garden'),
          lagoon('stair-paving-crew', 'Crew laying stone paving at the foot of the stair'),
        ],
      },
    ],
    featured: true,
  },
  {
    slug: 'marble-interiors',
    title: 'Marble interiors, private residences',
    summary:
      'Whole floors of marble and onyx: inlaid floors, book-matched walls, bathrooms and staircases, with dome and stained-glass ceilings above.',
    story: [
      'Marble is unforgiving. A border that drifts a few millimetres shows across a whole room, and a slab set the wrong way breaks the run of the veins. That is why he stays on site while it is laid, checking lines, joints and levels as the work goes.',
      'These photos come from several private homes: onyx and white marble walls with ornamental borders, inlaid medallions, rose and grey marble bathrooms, marble staircases, parquet, a dome ceiling and stained glass.',
    ],
    facts: [
      { label: 'Location', value: verify('Lagos and Abuja? Which homes?') },
      { label: 'Client', value: 'Private homes' },
      { label: 'Scope', value: 'Floors, walls, bathrooms, staircases, ceilings' },
      { label: 'His role', value: 'Finishing manager, on site daily' },
      { label: 'Year', value: verify('Years') },
    ],
    cover: marble('marble-staircase', 'Marble staircase with an inlaid floor border at its foot'),
    thumbs: [
      marble('floor-lagoon-view', 'Polished marble floor leading to windows over the lagoon'),
      marble('bath-white-marble', 'White marble bathroom with a dark marble border'),
      marble('bath-black-marble', 'Black marble bathroom with wall-hung fittings'),
    ],
    onSite: [
      p('him/kneeling-onyx', 'Mahmoud Kronbi kneeling on a newly laid onyx floor'),
      p('him/with-craftsman', 'Mahmoud Kronbi with one of his craftsmen beside a marble panel'),
      p('him/marble-room', 'Mahmoud Kronbi in a finished marble room'),
      p('him/white-room', 'Mahmoud Kronbi in a finished white marble room'),
    ],
    gallery: [
      {
        title: 'Floors and inlays',
        photos: [
          marble('medallion-floor', 'Gold fleur-de-lis medallion inlaid in a cream marble floor'),
          marble('inlay-frame', 'Inlaid floor frame with leaf motifs at each corner'),
          marble('medallion-square', 'Square marble medallion inside a red and grey border'),
          marble('floor-diamond-grid', 'Marble floor with a diamond grid of small inlays'),
          marble('floor-medallion-corner', 'Medallion inlays at the corners of a marble floor'),
          marble('inlay-border-floor', 'Grey marble border framing cream tiles'),
          marble('marble-corridor', 'Long marble corridor with a continuous border'),
          marble('floor-inlay-onyx', 'Onyx floor with a white inlaid panel, newly laid'),
          marble('floor-inlay-blue', 'Patterned blue border inlaid in a white floor'),
        ],
      },
      {
        title: 'Bathrooms and spa',
        photos: [
          marble('onyx-bath', 'Onyx and white marble bathroom with ornamental borders'),
          marble('onyx-vanity', 'Curved vanity against onyx walls'),
          marble('master-bath', 'Master bathroom with lit niches'),
          marble('master-bath-wide', 'Master bathroom with stone feature walls'),
          marble('bath-dark-niches', 'Bathroom with dark marble and lit niches'),
          marble('shower-rose-marble', 'Shower wall in rose marble with a grey border'),
          marble('bath-rose-marble', 'Rose marble bathroom with a grey border'),
          marble('shower-panel', 'Shower panel framed in grey marble'),
          marble('shower-cream', 'Cream marble shower with a brown border'),
          marble('shower-grey', 'Shower framed in grey marble'),
          marble('shower-carrara', 'White veined marble shower with a bench'),
          marble('bath-grey-porcelain', 'Grey porcelain bathroom with a wall niche'),
          marble('shower-glass', 'Glass shower with a mosaic band'),
          marble('spa-benches', 'Spa benches with lit edges'),
        ],
      },
      {
        title: 'Staircases and halls',
        photos: [
          marble('stair-hall', 'Marble stair hall with an inlaid border'),
          marble('stair-hall-inlay', 'Stair hall with an inlaid panel at the foot of the stairs'),
          marble('stair-nosing', 'Marble stair treads with shaped nosings'),
          marble('wall-panels', 'Hall walls with moulded panels'),
          marble('marble-panels', 'Marble wall panels with grey borders'),
        ],
      },
      {
        title: 'Ceilings and wood',
        photos: [
          marble('dome-ceiling', 'Dome ceiling with radiating mouldings'),
          marble('stained-glass', 'Backlit stained-glass ceiling'),
          marble('stained-glass-lit', 'Stained-glass ceiling panels, lit'),
          marble('cove-ceiling', 'Suspended ceiling with cove lighting'),
          marble('parquet', 'Parquet floor in a geometric pattern'),
        ],
      },
    ],
    featured: true,
  },
  {
    slug: 'event-hall-ibadan',
    title: 'Event hall, Ibadan',
    summary:
      'A large event hall finished for lighting and crowds: a high-gloss patterned floor, wall finishes and a ceiling ready for stage rigging.',
    story: [
      'A hall that hosts events has to look right under coloured stage light and hold up to crowds. The floor is a high-gloss pattern laid across the whole room, and the walls and ceiling were finished around the lighting rig and the LED wall.',
    ],
    facts: [
      { label: 'Location', value: 'Ibadan, Oyo State' },
      { label: 'Client', value: verify('Client, or "Private"') },
      { label: 'Scope', value: 'Interior finishing: floor, walls, ceiling' },
      { label: 'His role', value: 'Construction and project manager' },
      { label: 'Year', value: verify('Year completed') },
    ],
    cover: p('event-hall/hall-stage', 'Event hall with a polished checkered floor, stage and LED wall'),
    thumbs: [
      p('event-hall/hall-floor', "Long view of the hall's glossy patterned floor"),
      p('event-hall/hall-with-client', 'Mahmoud Kronbi with the client in the hall during fit-out'),
    ],
    gallery: [
      {
        title: 'The hall',
        photos: [
          p('event-hall/hall-stage', 'The finished hall with stage lighting'),
          p('event-hall/hall-floor', 'The patterned floor running the length of the hall'),
          p('event-hall/hall-with-client', 'Walking the hall with the client during fit-out'),
        ],
      },
    ],
    featured: true,
  },
  {
    slug: 'built-to-scale',
    title: 'Built to scale',
    summary:
      'Finishing a large building means running large crews. These are structural jobs he has managed, from pile foundations on the Lagos lagoon to box culverts in Kano.',
    story: [
      'His main work is finishing, but he has run whole builds, and that is why a large site does not worry him. He knows how a structure was made before the first tile goes on.',
    ],
    facts: [
      { label: 'Locations', value: 'Lagos, Kano, Abuja, Lokoja, Ogbomosho' },
      { label: 'Scope', value: 'Foundations, culverts, concrete frames and slabs' },
      { label: 'His role', value: 'Construction manager' },
    ],
    cover: scale('foundations-wide', 'Large foundation site beside the Lagos lagoon'),
    thumbs: [
      scale('culverts-formwork', 'Timber formwork for box culverts'),
      scale('restaurant-roof-rebar', 'Radial roof reinforcement on a round building'),
      scale('villa-structure', 'Three-storey villa under scaffolding'),
    ],
    gallery: [
      {
        title: 'Lagoon-front foundations, Lagos',
        text: verify('Project name and year'),
        photos: [
          scale('foundations-lagoon', 'Pile caps across a large site beside the lagoon'),
          scale('foundations-grid', 'Grid of pile caps with machines on site'),
          scale('foundations-city', 'The foundation site with the city behind'),
        ],
      },
      {
        title: 'Box culverts, Makarfi, Kano',
        photos: [
          scale('culverts-slab', 'Concrete base slab for the culverts, with starter bars'),
          scale('culverts-formwork', 'Timber formwork for the culvert walls'),
        ],
      },
      {
        title: 'Round restaurant, Abuja',
        photos: [
          scale('restaurant-roof-rebar', 'Radial reinforcement for the round roof slab'),
          scale('restaurant-walls', 'Circular block walls and roof formwork'),
        ],
      },
      {
        title: 'Buildings and slabs',
        photos: [
          scale('villa-structure', 'Three-storey villa under scaffolding, Lagos'),
          scale('villa-structure-side', 'The villa from the side, with the pool shape set out'),
          scale('lokoja-building', 'Three-storey building in Lokoja'),
          scale('duplex-scaffold', 'Duplex under scaffolding, Abuja'),
          scale('waffle-slab', 'Waffle slab reinforcement in Ogbomosho'),
        ],
      },
    ],
    featured: false,
  },
]

export const getProject = (slug: string) => projects.find((project) => project.slug === slug)
