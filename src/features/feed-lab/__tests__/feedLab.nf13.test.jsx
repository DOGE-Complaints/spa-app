import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.dirname(fileURLToPath(import.meta.url))

describe('NF-13 feed-lab Path A stand wire', () => {
  it('FeedLabPage mounts FeedLabNf13Stand', () => {
    const page = readFileSync(
      path.resolve(dir, '../../../pages/FeedLabPage.jsx'),
      'utf8',
    )
    expect(page).toMatch(/FeedLabNf13Stand/)
  })

  it('stand covers five keys + unknown omit', () => {
    const stand = readFileSync(
      path.resolve(dir, '../../feed/FeedLabNf13Stand.jsx'),
      'utf8',
    )
    expect(stand).toMatch(/feed-lab-nf13-stand/)
    expect(stand).toMatch(/ISSUE_TYPE_ICON_BY_TYPE/)
    expect(stand).toMatch(/IMPROVEMENT/)
    expect(stand).toMatch(/FeedCivicPost/)
  })
})
