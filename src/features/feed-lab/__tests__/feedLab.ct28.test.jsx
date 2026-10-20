/** @vitest-environment jsdom */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.dirname(fileURLToPath(import.meta.url))

describe('CT-28 lab FixtureAdapter held', () => {
  it('FeedLabThreadMount still uses createFixtureAdapter · not LiveAdapter', () => {
    const src = readFileSync(path.resolve(dir, '../post/thread/FeedLabThreadMount.jsx'), 'utf8')
    expect(src).toMatch(/createFixtureAdapter/)
    expect(src).toMatch(/data-lab-thread-host="fixture"/)
    expect(src).not.toMatch(/createLiveAdapter/)
    expect(src).not.toMatch(/FeedDiscussionBlock/)
  })

  it('lab card/detail still host FeedLabThreadMount', () => {
    const card = readFileSync(path.resolve(dir, '../post/FeedPostCard.jsx'), 'utf8')
    const detail = readFileSync(path.resolve(dir, '../post/FeedIssueDetailBody.jsx'), 'utf8')
    expect(card).toMatch(/FeedLabThreadMount/)
    expect(detail).toMatch(/FeedLabThreadMount/)
  })

  it('CT-28 Path A stand Present · does not replace Fixture host', () => {
    const stand = readFileSync(path.resolve(dir, '../post/thread/FeedLabCt28Stand.jsx'), 'utf8')
    expect(stand).toMatch(/FeedThreadMount/)
    expect(stand).toMatch(/data-lab-ct28/)
    const page = readFileSync(path.resolve(dir, '../../../pages/FeedLabPage.jsx'), 'utf8')
    expect(page).toMatch(/FeedLabCt28Stand/)
  })
})
