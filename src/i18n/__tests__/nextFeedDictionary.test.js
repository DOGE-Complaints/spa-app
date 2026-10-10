import { describe, expect, it } from 'vitest'
import {
  NEXT_FEED_BY_LOCALE,
  NEXT_FEED_FLAT_KEYS,
} from '../nextFeedDictionary.js'
import { UI_DICTIONARY } from '../dictionaries.js'

describe('nextFeedDictionary', () => {
  it('lists nextFeed.list + toolbar + post flat keys', () => {
    expect(NEXT_FEED_FLAT_KEYS).toEqual([
      'nextFeed.list.loading',
      'nextFeed.list.empty',
      'nextFeed.list.error',
      'nextFeed.list.retry',
      'nextFeed.list.stale',
      'nextFeed.list.accessible',
      'nextFeed.list.filteredEmptyTitle',
      'nextFeed.list.filteredEmptyMessage',
      'nextFeed.toolbar.filters',
      'nextFeed.toolbar.searchUnavailable',
      'nextFeed.toolbar.title',
      'nextFeed.toolbar.queryAria',
      'nextFeed.post.openIssue',
      'nextFeed.post.more',
      'nextFeed.post.share',
      'nextFeed.post.noMedia',
      'nextFeed.post.schemaUnavailable',
    ])
  })

  it('materializes en/et/ru in UI_DICTIONARY', () => {
    for (const locale of ['en', 'et', 'ru']) {
      const dict = UI_DICTIONARY[locale]
      expect(dict.nextFeed.list.loading).toBeTruthy()
      expect(dict.nextFeed.list.empty).toBeTruthy()
      expect(dict.nextFeed.list.error).toBeTruthy()
      expect(dict.nextFeed.list.retry).toBeTruthy()
      expect(dict.nextFeed.list.stale).toBeTruthy()
      expect(dict.nextFeed.toolbar.filters).toBeTruthy()
      expect(dict.nextFeed.toolbar.searchUnavailable).toBeTruthy()
      expect(dict.nextFeed.post.openIssue).toBeTruthy()
      expect(dict.nextFeed.post.more).toBeTruthy()
      expect(dict.nextFeed.post.share).toBeTruthy()
      expect(dict.nextFeed.post.noMedia).toBeTruthy()
      expect(dict.nextFeed.post.schemaUnavailable).toBeTruthy()
      expect(NEXT_FEED_BY_LOCALE[locale].nextFeed.list.loading).toBe(
        dict.nextFeed.list.loading,
      )
      expect(NEXT_FEED_BY_LOCALE[locale].nextFeed.post.openIssue).toBe(
        dict.nextFeed.post.openIssue,
      )
    }
  })
})
