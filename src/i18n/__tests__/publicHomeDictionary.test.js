import { describe, expect, it } from 'vitest'
import { findMissingPublicHomeDictionaryKeys } from '../forbiddenVerificationTerms.js'
import { HOW_IT_WORKS_FLAT_KEYS } from '../howItWorksDictionary.js'
import { PUBLIC_HOME_FLAT_KEYS } from '../publicHomeDictionary.js'

describe('publicHome dictionary SSOT', () => {
  it('includes nav + account + footer + board + howItWorks flat keys', () => {
    expect(PUBLIC_HOME_FLAT_KEYS).toEqual(
      expect.arrayContaining([
        'publicHome.nav.dashboard',
        'publicHome.nav.howItWorks',
        'publicHome.footer.brand',
        'publicHome.board.openIssue',
        'howItWorks.title',
        'howItWorks.cta.submitAccessibleLabel',
      ]),
    )
    expect(PUBLIC_HOME_FLAT_KEYS).toEqual(
      expect.arrayContaining([...HOW_IT_WORKS_FLAT_KEYS]),
    )
  })

  it('lists PUBLIC_HOME_FLAT_KEYS including board chrome', () => {
    expect(PUBLIC_HOME_FLAT_KEYS.some((k) => k.startsWith('publicHome.board.'))).toBe(true)
  })

  it('lists howItWorks.* keys from appendix', () => {
    expect(PUBLIC_HOME_FLAT_KEYS.some((k) => k.startsWith('howItWorks.'))).toBe(true)
    expect(HOW_IT_WORKS_FLAT_KEYS.length).toBeGreaterThan(30)
  })

  it('has all PUBLIC_HOME_FLAT_KEYS in et/ru/en', () => {
    expect(findMissingPublicHomeDictionaryKeys()).toEqual([])
  })
})
