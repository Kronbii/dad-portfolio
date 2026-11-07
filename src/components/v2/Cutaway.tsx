'use client'

import Image from 'next/image'
import { useState } from 'react'
import styles from './v2.module.css'

type Img = { src: string; alt: string; width: number; height: number; blurDataURL: string }
export type CutawayLayer = { key: string; name: string; note: string; byOthers?: boolean; photo: Img }

/* Isometric projection: x runs right-down, y runs left-down, z up. Units are drawing units. */
const OX = 300
const OY = 196
const iso = (x: number, y: number, z: number): [number, number] => [OX + (x - y) * 0.866, OY + (x + y) * 0.5 - z]
const pts = (...p: [number, number, number][]) => p.map((q) => iso(...q).map((n) => n.toFixed(1)).join(',')).join(' ')

const W = 240 // room width along x
const D = 240 // room depth along y
const H = 168 // wall height
const T = 22 // wall thickness
// The floor build-up, top down: marble, setting bed, screed, slab (by others)
const Z = { marble: 0, bed: -8, screed: -13, slab: -29, base: -56 }
// The front corner is cut back in steps to show each layer
const A = { marble: 112, bed: 78, screed: 44 }

/** One floor layer: its two outer section faces and the two faces of its stepped notch. */
function LayerSides({ top, bottom, notch, cls }: { top: number; bottom: number; notch: number; cls: string }) {
  return (
    <g className={cls}>
      <polygon points={pts([W, 0, top], [W, D - notch, top], [W, D - notch, bottom], [W, 0, bottom])} />
      <polygon points={pts([0, D, top], [W - notch, D, top], [W - notch, D, bottom], [0, D, bottom])} />
      {notch > 0 && (
        <>
          <polygon points={pts([W - notch, D - notch, top], [W - notch, D, top], [W - notch, D, bottom], [W - notch, D - notch, bottom])} />
          <polygon points={pts([W - notch, D - notch, top], [W, D - notch, top], [W, D - notch, bottom], [W - notch, D - notch, bottom])} />
        </>
      )}
    </g>
  )
}

/** The visible top of a layer inside the notch above it: an L-shaped strip. */
const lTop = (z: number, outer: number, inner: number) =>
  pts([W - outer, D - outer, z], [W, D - outer, z], [W, D - inner, z], [W - inner, D - inner, z], [W - inner, D, z], [W - outer, D, z])

/** Where each key's leader line lands, and where its label sits. */
const anchors: Record<string, { at: [number, number, number]; label: [number, number] }> = {
  C1: { at: [150, 0, H - 9], label: [548, 52] },
  W2: { at: [120, 0, 88], label: [560, 150] },
  W1: { at: [0, 70, 96], label: [40, 118] },
  F1: { at: [97, 97, 0], label: [36, 330] },
  F2: { at: [W - 64, D - 12, Z.screed], label: [560, 432] },
  S0: { at: [W - 18, D - 18, Z.slab], label: [512, 508] },
}

export function Cutaway({ layers }: { layers: CutawayLayer[] }) {
  const [active, setActiveKey] = useState('F1')
  // The drawing shows in full until the visitor picks a layer; then the others step back.
  const [touched, setTouched] = useState(false)
  const setActive = (key: string) => {
    setActiveKey(key)
    setTouched(true)
  }
  const current = layers.find((l) => l.key === active) ?? layers[0]
  const on = (key: string) => (touched && active === key ? styles.layerOn : undefined)

  return (
    <div className={styles.cutaway}>
      <svg viewBox="0 0 600 540" className={styles.drawing} data-active={touched ? active : undefined} role="img" aria-label="Isometric cutaway of a finished room corner showing the finishing layers, from the structure up to the marble floor, wall cladding and ceiling cornice">
        <defs>
          <pattern id="v2-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" className={styles.hatchLine} />
          </pattern>
          <pattern id="v2-screed" width="5" height="5" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.7" className={styles.stipple} />
          </pattern>
          <filter id="v2-glow" x="-20%" y="-200%" width="140%" height="500%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <clipPath id="v2-floor-clip">
            <polygon points={pts([0, 0, 0], [W, 0, 0], [W, D - A.marble, 0], [W - A.marble, D - A.marble, 0], [W - A.marble, D, 0], [0, D, 0])} />
          </clipPath>
        </defs>

        {/* Walls: structure (by others) behind, finishes on the room side */}
        <g data-layer="S0" className={on('S0')}>
          <polygon className={styles.hatch} points={pts([-T, 0, H], [-T, D, H], [0, D, H], [0, 0, H])} />
          <polygon className={styles.hatch} points={pts([-T, -T, H], [W, -T, H], [W, 0, H], [-T, 0, H])} />
          <polygon className={styles.hatch} points={pts([-T, D, H], [-7, D, H], [-7, D, 0], [-T, D, 0])} />
          <polygon className={styles.hatch} points={pts([W, -T, H], [W, -7, H], [W, -7, 0], [W, -T, 0])} />
        </g>

        <g data-layer="W1" className={on('W1')}>
          <polygon className={styles.wallLeft} points={pts([0, 0, H], [0, D, H], [0, D, 0], [0, 0, 0])} />
          <polygon className={styles.cladEdge} points={pts([-7, D, H], [0, D, H], [0, D, 0], [-7, D, 0])} />
          {/* two book-matched panels, veins mirrored about the joint */}
          {[
            [16, 114],
            [126, 224],
          ].map(([y0, y1], i) => (
            <g key={y0}>
              <polygon className={styles.panelFrame} points={pts([0, y0, 150], [0, y1, 150], [0, y1, 18], [0, y0, 18])} />
              <polygon className={styles.panelField} points={pts([0, y0 + 6, 144], [0, y1 - 6, 144], [0, y1 - 6, 24], [0, y0 + 6, 24])} />
              <path
                className={styles.vein}
                d={`M${iso(0, i ? y0 + 8 : y1 - 8, 130).join(',')} C${iso(0, i ? y0 + 40 : y1 - 40, 104).join(',')} ${iso(0, i ? y0 + 30 : y1 - 30, 70).join(',')} ${iso(0, i ? y0 + 80 : y1 - 80, 34).join(',')}`}
              />
              <path
                className={styles.vein}
                d={`M${iso(0, i ? y0 + 26 : y1 - 26, 142).join(',')} C${iso(0, i ? y0 + 60 : y1 - 60, 118).join(',')} ${iso(0, i ? y0 + 52 : y1 - 52, 92).join(',')} ${iso(0, i ? y0 + 92 : y1 - 92, 60).join(',')}`}
              />
            </g>
          ))}
        </g>

        <g data-layer="W2" className={on('W2')}>
          <polygon className={styles.wallRight} points={pts([0, 0, H], [W, 0, H], [W, 0, 0], [0, 0, 0])} />
          <polygon className={styles.cladEdge} points={pts([W, -7, H], [W, 0, H], [W, 0, 0], [W, -7, 0])} />
          {[
            [18, 112],
            [128, 222],
          ].map(([x0, x1]) => (
            <g key={x0}>
              <polygon className={styles.moulding} points={pts([x0, 0, 142], [x1, 0, 142], [x1, 0, 22], [x0, 0, 22])} />
              <polygon className={styles.moulding} points={pts([x0 + 8, 0, 134], [x1 - 8, 0, 134], [x1 - 8, 0, 30], [x0 + 8, 0, 30])} />
            </g>
          ))}
          <polygon className={styles.skirting} points={pts([0, 0, 10], [W, 0, 10], [W, 0, 0], [0, 0, 0])} />
          <polygon className={styles.skirting} points={pts([0, 0, 10], [0, D, 10], [0, D, 0], [0, 0, 0])} />
        </g>

        <g data-layer="C1" className={on('C1')}>
          <polygon className={styles.cornice} points={pts([0, 0, H], [W, 0, H], [W, 0, H - 16], [0, 0, H - 16])} />
          <polygon className={styles.cornice} points={pts([0, 0, H], [0, D, H], [0, D, H - 16], [0, 0, H - 16])} />
          <polyline className={styles.coveGlow} filter="url(#v2-glow)" points={pts([W, 0, H - 18], [0, 0, H - 18], [0, D, H - 18])} />
          <polyline className={styles.coveLine} points={pts([W, 0, H - 18], [0, 0, H - 18], [0, D, H - 18])} />
        </g>

        {/* Floor build-up, lowest first */}
        <g data-layer="S0" className={on('S0')}>
          <LayerSides top={Z.slab} bottom={Z.base} notch={0} cls={styles.hatch} />
          <polygon className={styles.hatch} points={pts([W - A.screed, D - A.screed, Z.slab], [W, D - A.screed, Z.slab], [W, D, Z.slab], [W - A.screed, D, Z.slab])} />
        </g>
        <g data-layer="F2" className={on('F2')}>
          <LayerSides top={Z.screed} bottom={Z.slab} notch={A.screed} cls={styles.screed} />
          <polygon className={styles.screedTop} points={lTop(Z.screed, A.bed, A.screed)} />
          <LayerSides top={Z.bed} bottom={Z.screed} notch={A.bed} cls={styles.bed} />
          <polygon className={styles.bedTop} points={lTop(Z.bed, A.marble, A.bed)} />
        </g>
        <g data-layer="F1" className={on('F1')}>
          <LayerSides top={Z.marble} bottom={Z.bed} notch={A.marble} cls={styles.marbleSide} />
          <polygon className={styles.marbleTop} points={pts([0, 0, 0], [W, 0, 0], [W, D - A.marble, 0], [W - A.marble, D - A.marble, 0], [W - A.marble, D, 0], [0, D, 0])} />
          <g clipPath="url(#v2-floor-clip)">
            <polygon className={styles.inlay} points={pts([18, 18, 0], [W - 18, 18, 0], [W - 18, D - 18, 0], [18, D - 18, 0])} />
            <polygon className={styles.marbleTop} points={pts([27, 27, 0], [W - 27, 27, 0], [W - 27, D - 27, 0], [27, D - 27, 0])} />
            <polygon className={styles.medallion} points={pts([70, 70, 0], [124, 70, 0], [124, 124, 0], [70, 124, 0])} />
            <polygon className={styles.medallionInner} points={pts([97, 76, 0], [118, 97, 0], [97, 118, 0], [76, 97, 0])} />
            <polygon className={styles.medallion} points={pts([97, 88, 0], [106, 97, 0], [97, 106, 0], [88, 97, 0])} />
          </g>
        </g>

        {/* Keys and leader lines */}
        {layers.map((layer) => {
          const a = anchors[layer.key]
          if (!a) return null
          const [ax, ay] = iso(...a.at)
          const [lx, ly] = a.label
          return (
            <g key={layer.key} className={`${styles.key} ${active === layer.key ? styles.keyOn : ''}`}>
              <polyline className={styles.leader} points={`${lx},${ly} ${ax.toFixed(1)},${ay.toFixed(1)}`} />
              <circle cx={ax} cy={ay} r="2.6" className={styles.leaderDot} />
              <circle cx={lx} cy={ly} r="15" className={styles.keyCircle} />
              <text x={lx} y={ly + 4.5} textAnchor="middle" className={styles.keyText}>
                {layer.key}
              </text>
            </g>
          )
        })}
      </svg>

      <div className={styles.legend}>
        <ul className={styles.legendList} aria-label="Finishing layers">
          {layers.map((layer) => (
            <li key={layer.key}>
              <button
                type="button"
                aria-pressed={active === layer.key}
                onClick={() => setActive(layer.key)}
                onMouseEnter={() => setActive(layer.key)}
                onFocus={() => setActive(layer.key)}
                className={styles.legendItem}
              >
                <span className={styles.legendKey}>{layer.key}</span>
                <span className={styles.legendName}>
                  {layer.name}
                  {layer.byOthers && <em className={styles.byOthers}> by others</em>}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <figure className={styles.legendPhoto} aria-live="polite">
          <Image
            key={current.photo.src}
            src={current.photo.src}
            alt={current.photo.alt}
            width={current.photo.width}
            height={current.photo.height}
            sizes="(max-width: 900px) 40vw, 220px"
            placeholder="blur"
            blurDataURL={current.photo.blurDataURL}
            className={styles.legendImg}
          />
          <figcaption>
            <strong>{current.key}</strong> {current.note}
          </figcaption>
        </figure>
      </div>
    </div>
  )
}
