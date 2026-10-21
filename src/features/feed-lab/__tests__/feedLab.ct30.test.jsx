/** @vitest-environment jsdom */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.dirname(fileURLToPath(import.meta.url))

describe('CT-30 lab FixtureAdapter held', () => {
  it('FeedLabThreadMount still FixtureAdapter · not Live upload wire', () => {
    const src = readFileSync(path.resolve(dir, '../post/thread/FeedLabThreadMount.jsx'), 'utf8')
    expect(src).toMatch(/createFixtureAdapter/)
    expect(src).toMatch(/data-lab-thread-host="fixture"/)
    expect(src).not.toMatch(/createLiveAdapter/)
    expect(src).not.toMatch(/uploadAttachment/)
  })

  it('FixtureAdapter postComment local Ready attach unchanged · no HTTP', () => {
    const src = readFileSync(
      path.resolve(dir, '../../thread-mount/adapters/FixtureAdapter.js'),
      'utf8',
    )
    expect(src).toMatch(/Fixture write only — no HTTP/)
    expect(src).toMatch(/readyAttach/)
    expect(src).not.toMatch(/uploadAttachment/)
  })
})
