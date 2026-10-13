/** @vitest-environment node */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  LAB_FEED_FIXTURES,
  LAB_MEDIA_STUB_PATH,
  LAB_MEDIA_STUB_TARGET,
  loadLabFeedFixtures,
} from '../fixtures/index.js'

const dir = path.dirname(fileURLToPath(import.meta.url))
const fixturesSrc = readFileSync(path.resolve(dir, '../fixtures/labFeedFixtures.js'), 'utf8')
const mediaSrc = readFileSync(path.resolve(dir, '../fixtures/labMediaStub.js'), 'utf8')

const EXPECTED_IDS = [
  'DOGEstonia-UusVeerenni-001',
  'DOGEstonia-UusVeerenni-002',
  'DOGEstonia-UusVeerenni-003',
  'DOGEstonia-UusVeerenni-004',
  'DOGEstonia-UusVeerenni-005',
]

describe('labFeedFixtures NF-LAB-02', () => {
  it('loads exactly five fixtures with branded public ids (not UUID-first)', () => {
    const list = loadLabFeedFixtures()
    expect(list).toHaveLength(5)
    expect(LAB_FEED_FIXTURES).toHaveLength(5)
    expect(list.map((f) => f.publicId)).toEqual(EXPECTED_IDS)
    for (const fx of list) {
      expect(fx.fixtureOnly).toBe(true)
      expect(fx.dataFixture).toBe(true)
      expect(fx.status).toBe('PUBLISHED')
      expect(fx.type).toBe('INCIDENT')
      expect(fx.comments.length).toBeGreaterThanOrEqual(1)
      expect(fx.comments.length).toBeLessThanOrEqual(2)
      expect(/^[0-9a-f-]{36}$/i.test(fx.publicId)).toBe(false)
    }
  })

  it('shares media stub path and authored alts (1600×900 target)', () => {
    for (const fx of LAB_FEED_FIXTURES) {
      expect(fx.media.src).toBe(LAB_MEDIA_STUB_PATH)
      expect(fx.media.src).toBe('/assets/dogefeed.png')
      expect(fx.media.alt.length).toBeGreaterThan(8)
      expect(fx.media.targetWidth).toBe(1600)
      expect(fx.media.targetHeight).toBe(900)
      expect(fx.media.fixtureOnly).toBe(true)
    }
    expect(LAB_MEDIA_STUB_TARGET).toEqual({ width: 1600, height: 900 })
  })

  it('fixture modules hold no HTTP / gateway / threads invent', () => {
    expect(fixturesSrc.includes('fetch(')).toBe(false)
    expect(mediaSrc.includes('fetch(')).toBe(false)
    expect(/from ['"][^'"]*(gateway|threads)/i.test(fixturesSrc + mediaSrc)).toBe(false)
    expect(fixturesSrc.includes('publicLabel')).toBe(false)
  })
})
