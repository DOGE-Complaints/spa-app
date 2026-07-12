import { describe, expect, it } from 'vitest'
import { findMissingCabinetDictionaryKeys } from '../forbiddenVerificationTerms.js'

describe('cabinet dictionary SSOT', () => {
  it('has all CABINET_FLAT_KEYS in et/ru/en', () => {
    expect(findMissingCabinetDictionaryKeys()).toEqual([])
  })
})
