import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.dirname(fileURLToPath(import.meta.url))

describe('CT-29 feed-lab Path A stand wire', () => {
  it('FeedLabPage mounts FeedLabCt29Stand', () => {
    const page = readFileSync(
      path.resolve(dir, '../../../pages/FeedLabPage.jsx'),
      'utf8',
    )
    expect(page).toMatch(/FeedLabCt29Stand/)
  })

  it('stand mounts FeedCivicPost list+detail surfaces', () => {
    const stand = readFileSync(
      path.resolve(dir, '../../feed/FeedLabCt29Stand.jsx'),
      'utf8',
    )
    expect(stand).toMatch(/feed-lab-ct29-stand/)
    expect(stand).toMatch(/FeedCivicPost/)
    expect(stand).toMatch(/data-ct29-surface="list"/)
    expect(stand).toMatch(/data-ct29-surface="detail"/)
    expect(stand).toMatch(/CIVIC_MEDIA_STUB_PATH/)
  })
})
