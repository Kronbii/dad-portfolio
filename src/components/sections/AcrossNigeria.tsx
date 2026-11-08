import { acrossNigeria } from '@/content/site'
import { Photo } from '../Photo'
import { WorkMap } from './WorkMap'

/** Where he has worked, on a map of Nigeria that steps through the places until someone picks one. */
export function AcrossNigeria() {
  return (
    <section id="map" className="section-gap">
      <div className="wrap">
        <h2 className="t-h2 mb-8 md:mb-4">{acrossNigeria.title}</h2>
        <WorkMap
          cities={acrossNigeria.places.map(({ name, work, x, y, labelAbove }) => ({ name, work, x, y, labelAbove }))}
          photos={acrossNigeria.places.map((place) => <Photo key={place.name} photo={place.photo} sizes="(max-width: 900px) 40vw, 400px" />)}
        />
      </div>
    </section>
  )
}
