#!/usr/bin/env node
/**
 * Render one Lucide SVG to a padded RGBA PNG via @resvg/resvg-js.
 * Usage:
 *   node render-lucide.mjs --svg <path> --out <path> --color #hex --size 256 --padding 0.15 --stroke 2
 */
import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

function arg(name, fallback = undefined) {
  const i = process.argv.indexOf(`--${name}`)
  if (i === -1) return fallback
  return process.argv[i + 1]
}

const svgPath = arg('svg')
const outPath = arg('out')
const color = arg('color', '#f5f7fa')
const size = Number(arg('size', '256'))
const padding = Number(arg('padding', '0.15'))
const stroke = Number(arg('stroke', '2'))

if (!svgPath || !outPath) {
  console.error('Usage: render-lucide.mjs --svg <path> --out <path> [--color #hex] [--size 256] [--padding 0.15] [--stroke 2]')
  process.exit(2)
}

const glyph = Math.round(size * (1 - 2 * padding))
const raw = readFileSync(svgPath, 'utf8')

// Lucide puts stroke attrs on the root <svg>; children inherit. Extract inner markup
// and re-apply stroke on a wrapping <g> so color survives after we drop the root.
const innerMatch = raw.match(/<svg[^>]*>([\s\S]*)<\/svg>/i)
if (!innerMatch) {
  console.error('Could not parse SVG root:', svgPath)
  process.exit(1)
}
const inner = innerMatch[1].trim()

// Lucide viewBox is 0 0 24 24 — scale into the padded glyph box.
const scale = glyph / 24
const pad = (size - glyph) / 2

const paddedSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <g
    transform="translate(${pad}, ${pad}) scale(${scale})"
    fill="none"
    stroke="${color}"
    stroke-width="${stroke}"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    ${inner}
  </g>
</svg>`

const resvg = new Resvg(paddedSvg, {
  fitTo: { mode: 'width', value: size },
  background: 'rgba(0,0,0,0)',
})
const png = resvg.render().asPng()
mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, png)
console.log(JSON.stringify({ out: outPath, bytes: png.length, size, color, stroke }))
