import type { Photo as PhotoType } from '@/content/types'
import { Photo } from '../Photo'
import { WorkMap, type City } from './WorkMap'

const p = (src: string, alt: string): PhotoType => ({ src, alt })

const cities: (City & { photo: PhotoType })[] = [
  { name: 'Lagos', work: 'Lagoon-front residence, marble interiors, villa structures', x: 36, y: 310, photo: p('lagoon-residence/terrace-lagoon', 'Curving balustrade terrace beside the lagoon') },
  { name: 'Ibadan', work: 'Event hall and a guest house', x: 56, y: 273, photo: p('event-hall/hall-stage', 'Event hall with a polished checkered floor and stage') },
  { name: 'Ogbomosho', work: 'Waffle slab', x: 70, y: 243, labelAbove: true, photo: p('built-to-scale/waffle-slab', 'Waffle slab formwork') },
  { name: 'Lokoja', work: 'Three-storey building', x: 170, y: 256, photo: p('built-to-scale/lokoja-building', 'Three-storey building in Lokoja') },
  { name: 'Abuja', work: "Round restaurant, house finishing and a women's spa", x: 200, y: 206, photo: p('built-to-scale/restaurant-walls', 'Walls of the round restaurant going up') },
  { name: 'Kano', work: 'Box culverts at Makarfi', x: 241, y: 88, photo: p('built-to-scale/culverts-formwork', 'Timber formwork for box culverts') },
]

/** Where he has worked, on a map of Nigeria that steps through the cities until someone picks one. */
export function AcrossNigeria() {
  return (
    <section id="map" className="section-gap">
      <div className="wrap">
        <h2 className="t-h2 mb-8 md:mb-4">Across Nigeria</h2>
        <WorkMap
          cities={cities.map(({ name, work, x, y, labelAbove }) => ({ name, work, x, y, labelAbove }))}
          photos={cities.map((city) => <Photo key={city.name} photo={city.photo} sizes="(max-width: 900px) 40vw, 400px" />)}
        />
      </div>
    </section>
  )
}
