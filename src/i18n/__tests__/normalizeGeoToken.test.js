import { describe, expect, it } from 'vitest'
import { normalizeGeoToken } from '../normalizeGeoToken.js'

describe('normalizeGeoToken', () => {
  it('strips punctuation and lowercases while preserving diacritics', () => {
    expect(normalizeGeoToken('Põhja-Tallinn')).toBe('põhjatallinn')
    expect(normalizeGeoToken('põhja tallinn')).toBe('põhjatallinn')
    expect(normalizeGeoToken('pohja-tallinn')).toBe('pohjatallinn')
    expect(normalizeGeoToken('pohja-tallinn')).not.toBe(normalizeGeoToken('Põhja-Tallinn'))
  })
})
