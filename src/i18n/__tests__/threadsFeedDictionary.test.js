import { describe, expect, it } from 'vitest'
import {
  THREADS_FEED_FLAT_KEYS,
  THREADS_FEED_DICTIONARY_BY_LOCALE,
} from '../threadsFeedDictionary.js'
import { UI_DICTIONARY } from '../dictionaries.js'

describe('threadsFeedDictionary', () => {
  it('exposes flat keys for en/et/ru in UI_DICTIONARY', () => {
    for (const locale of ['en', 'et', 'ru']) {
      expect(THREADS_FEED_DICTIONARY_BY_LOCALE[locale]).toBeTruthy()
      for (const key of THREADS_FEED_FLAT_KEYS) {
        const parts = key.split('.')
        let current = UI_DICTIONARY[locale]
        for (const part of parts) current = current?.[part]
        expect(typeof current).toBe('string')
      }
    }
  })
})
