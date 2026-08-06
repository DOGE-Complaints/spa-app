/**
 * @vitest-environment node
 * PH-06 T06 — Submit product paths must use helper; no hardcoded GPT id.
 */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

function readSrc(rel) {
  return readFileSync(path.join(root, rel), 'utf8')
}

const HARDCODED = /g-RkVU9xLWN|chatgpt\.com\/g\/g-/i

describe('PH-06 Submit paths — env helper, no hardcode', () => {
  it('BoardPage Submit uses helper and publicHome.nav.submitStory', () => {
    const src = readSrc('pages/BoardPage.jsx')
    expect(src).toContain('getStoryGptHref')
    expect(src).toContain("publicHome.nav.submitStory")
    expect(src).toContain('board-submit-cta')
    expect(src).not.toMatch(HARDCODED)
    expect(src).not.toContain("t('createIssue')")
  })

  it('Header Submit uses helper + a11y label', () => {
    const src = readSrc('components/AppShell/Header.jsx')
    expect(src).toContain('getStoryGptHref')
    expect(src).toContain('howItWorks.cta.submitAccessibleLabel')
    expect(src).not.toMatch(HARDCODED)
  })

  it('HowItWorksPage Submit uses helper', () => {
    const src = readSrc('pages/HowItWorksPage.jsx')
    expect(src).toContain('getStoryGptHref')
    expect(src).not.toMatch(HARDCODED)
  })

  it('storyGptUrl helper has no GPT-id fallback', () => {
    const src = readSrc('config/storyGptUrl.js')
    expect(src).toContain('VITE_STORY_GPT_URL')
    expect(src).not.toMatch(HARDCODED)
  })
})
