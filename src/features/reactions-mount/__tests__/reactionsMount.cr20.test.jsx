/** @vitest-environment jsdom */
import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const spaRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..')
const runtimeActions = path.join(spaRoot, 'public/icons/next-feed/actions')
const masterActions = path.join(
  spaRoot,
  'docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/actions',
)

describe('CR-20 Gap v2 chrome icons Present', () => {
  it('runtime reactions.svg dual-circle Present · currentColor', () => {
    const p = path.join(runtimeActions, 'reactions.svg')
    expect(existsSync(p)).toBe(true)
    const body = readFileSync(p, 'utf8')
    expect(body).toMatch(/circle/g)
    expect((body.match(/<circle/g) || []).length).toBeGreaterThanOrEqual(2)
    expect(body).toContain('currentColor')
    expect(body).toContain('viewBox="0 0 24 24"')
  })

  it('runtime react.svg thumbs-up Present · not smiley eyes', () => {
    const p = path.join(runtimeActions, 'react.svg')
    expect(existsSync(p)).toBe(true)
    const body = readFileSync(p, 'utf8')
    expect(body).toContain('currentColor')
    expect(body).not.toMatch(/M8\.8 9\.25h\.1m6\.2/)
    expect(body).toContain('<path')
  })

  it('master and runtime bytes match for Gap v2 pair', () => {
    for (const name of ['react.svg', 'reactions.svg']) {
      const master = readFileSync(path.join(masterActions, name), 'utf8')
      const runtime = readFileSync(path.join(runtimeActions, name), 'utf8')
      expect(runtime).toBe(master)
    }
  })

  it('strip still wires both URLs', () => {
    const src = readFileSync(
      path.join(spaRoot, 'src/features/feed-lab/post/FeedPostActionStrip.jsx'),
      'utf8',
    )
    expect(src).toContain('/icons/next-feed/actions/react.svg')
    expect(src).toContain('/icons/next-feed/actions/reactions.svg')
  })
})
