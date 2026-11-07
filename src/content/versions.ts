/**
 * Content for the design versions v2–v4. Same facts as the live site (src/content/site.ts and
 * projects.ts), arranged for each direction. No new claims; captions name the real project.
 */
import type { Photo } from './types'

const p = (src: string, alt: string): Photo => ({ src, alt })

/* ---------- v2: the finishing package ---------- */

export type Layer = { key: string; name: string; note: string; byOthers?: boolean; photo: Photo }

/** The finishing build-up keyed on the cutaway, from the structure (by others) to the surface. */
export const layers: Layer[] = [
  { key: 'S0', name: 'Structure', note: 'Slab and blockwork, usually by others.', byOthers: true, photo: p('built-to-scale/foundations-grid', 'Pile caps on a foundation site') },
  { key: 'F2', name: 'Screed and setting bed', note: 'Levelled true before a single slab is laid.', photo: p('marble-interiors/floor-inlay-onyx', 'Onyx floor being laid on a levelled bed') },
  { key: 'F1', name: 'Marble floor, inlaid', note: 'Borders and medallions cut and set by hand.', photo: p('marble-interiors/medallion-floor', 'Gold fleur-de-lis medallion inlaid in a cream marble floor') },
  { key: 'W1', name: 'Book-matched cladding', note: 'Onyx and marble panels with ornamental borders.', photo: p('marble-interiors/onyx-bath', 'Honey onyx and white marble wall panels with ornamental borders') },
  { key: 'W2', name: 'Moulded panels and skirting', note: 'Wall mouldings set out room by room.', photo: p('marble-interiors/wall-panels', 'Hall walls with moulded panels') },
  { key: 'C1', name: 'Cornice and cove light', note: 'Suspended ceilings with a lit cove.', photo: p('marble-interiors/cove-ceiling', 'Suspended ceiling with cove lighting') },
]

export type ScheduleRow = { space: string; floor: string; walls: string; ceiling: string; photo: Photo; project: string; href: string }

export const schedule: ScheduleRow[] = [
  { space: 'Entrance and halls', floor: 'Polished marble, inlaid fleur-de-lis medallions', walls: 'Moulded panels', ceiling: 'Dome with radiating mouldings', photo: p('marble-interiors/dome-ceiling', 'Dome ceiling with radiating mouldings over a double-height hall'), project: 'Marble interiors, private residences', href: '/work/marble-interiors' },
  { space: 'Staircase', floor: 'Marble treads with shaped nosings', walls: 'Marble panels framed in grey', ceiling: 'Plaster, recessed lights', photo: p('marble-interiors/marble-staircase', 'Marble staircase with an inlaid border at its foot'), project: 'Marble interiors, private residences', href: '/work/marble-interiors' },
  { space: 'Master bathroom', floor: 'Onyx with an inlaid white panel', walls: 'Book-matched onyx and white marble, ornamental borders', ceiling: 'Suspended, lit niches', photo: p('marble-interiors/onyx-bath', 'Onyx and white marble bathroom'), project: 'Marble interiors, private residences', href: '/work/marble-interiors' },
  { space: 'Landing', floor: 'Marble with a diamond grid of inlays', walls: 'Painted plaster', ceiling: 'Backlit stained glass', photo: p('marble-interiors/stained-glass', 'Backlit stained-glass ceiling'), project: 'Marble interiors, private residences', href: '/work/marble-interiors' },
  { space: 'Terraces', floor: 'Crazy-paving stone', walls: 'Balustrades cast on site', ceiling: 'Open sky, thatched gazebos', photo: p('lagoon-residence/terraces-gazebo', 'Curving balustrades around a gazebo above the lagoon'), project: 'Lagoon-front residence, Lagos', href: '/work/lagoon-front-residence' },
  { space: 'Event hall', floor: 'High-gloss patterned tiles', walls: 'Finished around the stage and LED wall', ceiling: 'Ready for the lighting rig', photo: p('event-hall/hall-stage', 'Event hall with a polished checkered floor and stage'), project: 'Event hall, Ibadan', href: '/work/event-hall-ibadan' },
]

/* ---------- v3: the handover walkthrough ---------- */

export type Room = { name: string; project: string; href: string; photo: Photo; checks: string[]; focus?: string }

export const rooms: Room[] = [
  { name: 'Arrival', project: 'Villa entrance, Banana Island', href: '/#render', photo: p('lagoon-residence/entrance-built', 'The finished entrance: arched porch, fountain and planted bed'), checks: ['Arches true and plumb', 'Fountain bed edged clean', 'Paving falls to the drains'], focus: '50% 40%' },
  { name: 'The hall', project: 'Marble interiors, private residences', href: '/work/marble-interiors', photo: p('marble-interiors/medallion-floor', 'Inlaid fleur-de-lis medallion in a marble hall floor'), checks: ['Border meets without a gap', 'Medallion sits dead centre', 'Joints line up with the next room'], focus: '50% 70%' },
  { name: 'The staircase', project: 'Marble interiors, private residences', href: '/work/marble-interiors', photo: p('marble-interiors/marble-staircase', 'Marble staircase with an inlaid border at its foot'), checks: ['Every tread level', 'Nosings shaped and matched', 'Inlay squared to the first step'] },
  { name: 'Under the dome', project: 'Marble interiors, private residences', href: '/work/marble-interiors', photo: p('marble-interiors/dome-ceiling', 'Dome ceiling with radiating mouldings'), checks: ['Ribs evenly spaced', 'Mouldings meet at the crown', 'Lights set on the rings'], focus: '50% 30%' },
  { name: 'The master bathroom', project: 'Marble interiors, private residences', href: '/work/marble-interiors', photo: p('marble-interiors/onyx-bath', 'Onyx and white marble bathroom with ornamental borders'), checks: ['Onyx book-matched across the wall', 'Borders mitred at every corner', 'Fittings centred on the panels'] },
  { name: 'The landing', project: 'Marble interiors, private residences', href: '/work/marble-interiors', photo: p('marble-interiors/stained-glass', 'Backlit stained-glass ceiling'), checks: ['Glass panels aligned', 'Light even behind every pane', 'Frames square'] },
  { name: 'The terraces', project: 'Lagoon-front residence, Lagos', href: '/work/lagoon-front-residence', photo: p('lagoon-residence/terrace-curves', 'Balustrades curving down the terrace towards the pool'), checks: ['Balusters evenly spaced', 'Copings follow every curve', 'Paving laid tight to the edge'], focus: '50% 45%' },
  { name: 'The pool', project: 'Lagoon-front residence, Lagos', href: '/work/lagoon-front-residence', photo: p('lagoon-residence/lagoon-pool', 'Pool and thatched gazebos on a terrace above the Lagos lagoon'), checks: ['Mosaic lines straight', 'Coping level all round', 'Steps finished and safe'], focus: '50% 55%' },
]

/* ---------- v4: the hoarding ---------- */

export type Pair = { title: string; raw: Photo; finished: Photo; rawCaption: string; finishedCaption: string; href: string }

/** Raw site behind, finished work in front. Each caption says what each photo actually is. */
export const pairs: Pair[] = [
  {
    title: 'The pool',
    raw: p('him/crew-pool', 'The pool shell under construction, with Mahmoud Kronbi and his crew'),
    finished: p('lagoon-residence/lagoon-pool', 'The finished pool and thatched gazebos above the lagoon'),
    rawCaption: 'Pool shell, lagoon-front residence',
    finishedCaption: 'The same terrace, finished',
    href: '/work/lagoon-front-residence',
  },
  {
    title: 'The onyx',
    raw: p('him/kneeling-onyx', 'Mahmoud Kronbi kneeling on a newly laid onyx floor in a bare room'),
    finished: p('marble-interiors/onyx-bath', 'A finished onyx and marble bathroom'),
    rawCaption: 'Onyx going down in a bare shell',
    finishedCaption: 'Onyx and marble, finished',
    href: '/work/marble-interiors',
  },
  {
    title: 'The inlay',
    raw: p('marble-interiors/floor-inlay-blue', 'An inlaid border being set on a floor between bare walls'),
    finished: p('marble-interiors/floor-diamond-grid', 'A finished marble floor with a diamond grid of inlays'),
    rawCaption: 'Setting out an inlaid border',
    finishedCaption: 'An inlaid floor, finished',
    href: '/work/marble-interiors',
  },
  {
    title: 'The entrance',
    raw: p('lagoon-residence/entrance-render', "The architect's render of a villa entrance"),
    finished: p('lagoon-residence/entrance-built', 'The same entrance, built and finished'),
    rawCaption: "The architect's render",
    finishedCaption: 'The entrance, as built',
    href: '/#render',
  },
]
