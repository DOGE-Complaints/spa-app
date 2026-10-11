import { describe, expect, it } from 'vitest'
import {
  NEXT_FEED_BY_LOCALE,
  NEXT_FEED_FLAT_KEYS,
} from '../nextFeedDictionary.js'
import { UI_DICTIONARY } from '../dictionaries.js'

describe('nextFeedDictionary', () => {
  it('lists nextFeed.list + toolbar + post + map + thread flat keys', () => {
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
      'nextFeed.post.actions',
      'nextFeed.post.comment',
      'nextFeed.post.share',
      'nextFeed.post.noMedia',
      'nextFeed.post.schemaUnavailable',
      'nextFeed.map.listView',
      'nextFeed.map.mapView',
      'nextFeed.map.partial',
      'nextFeed.map.error',
      'nextFeed.map.unavailable',
      'nextFeed.map.pinLabel',
      'nextFeed.thread.empty',
      'nextFeed.thread.attachDenied',
      'nextFeed.thread.maxDepth',
      'nextFeed.gate.verifyRequired',
      'nextFeed.gate.deniedGeneric',
      'nextFeed.gate.draftPreserved',
      'nextFeed.mount.close',
      'nextFeed.mount.openAsPage',
      'nextFeed.verify.smokeNote',
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
      expect(dict.nextFeed.post.actions).toBeTruthy()
      expect(dict.nextFeed.post.comment).toBeTruthy()
      expect(dict.nextFeed.post.share).toBeTruthy()
      expect(dict.nextFeed.post.noMedia).toBeTruthy()
      expect(dict.nextFeed.post.schemaUnavailable).toBeTruthy()
      expect(dict.nextFeed.map.listView).toBeTruthy()
      expect(dict.nextFeed.map.mapView).toBeTruthy()
      expect(dict.nextFeed.map.partial).toBeTruthy()
      expect(dict.nextFeed.map.error).toBeTruthy()
      expect(dict.nextFeed.map.unavailable).toBeTruthy()
      expect(dict.nextFeed.map.pinLabel).toBeTruthy()
      expect(dict.nextFeed.thread.empty).toBeTruthy()
      expect(dict.nextFeed.thread.attachDenied).toBeTruthy()
      expect(dict.nextFeed.thread.maxDepth).toBeTruthy()
      expect(dict.nextFeed.gate.verifyRequired).toBeTruthy()
      expect(dict.nextFeed.gate.deniedGeneric).toBeTruthy()
      expect(dict.nextFeed.gate.draftPreserved).toBeTruthy()
      expect(dict.nextFeed.mount.close).toBeTruthy()
      expect(dict.nextFeed.mount.openAsPage).toBeTruthy()
      expect(dict.nextFeed.verify.smokeNote).toBeTruthy()
      expect(NEXT_FEED_BY_LOCALE[locale].nextFeed.list.loading).toBe(
        dict.nextFeed.list.loading,
      )
      expect(NEXT_FEED_BY_LOCALE[locale].nextFeed.post.openIssue).toBe(
        dict.nextFeed.post.openIssue,
      )
      expect(NEXT_FEED_BY_LOCALE[locale].nextFeed.map.mapView).toBe(
        dict.nextFeed.map.mapView,
      )
      expect(NEXT_FEED_BY_LOCALE[locale].nextFeed.mount.close).toBe(
        dict.nextFeed.mount.close,
      )
    }
  })
})
