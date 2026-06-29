import { describe, expect, it } from 'vitest'
import { formatI18nMessage } from '../formatI18nMessage.js'
import {
  findForbiddenVerificationTerm,
  findMissingIdentityDictionaryKeys,
  scanIdentityDictionaryForbiddenTerms,
} from '../forbiddenVerificationTerms.js'

describe('formatI18nMessage', () => {
  it('substitutes known placeholders', () => {
    expect(formatI18nMessage('Resend code ({seconds}s)', { seconds: 42 })).toBe('Resend code (42s)')
    expect(formatI18nMessage('Attempts remaining: {n}', { n: 3 })).toBe('Attempts remaining: 3')
  })

  it('leaves unknown placeholders intact', () => {
    expect(formatI18nMessage('Hello {missing}', {})).toBe('Hello {missing}')
  })
})

describe('identity dictionary SSOT', () => {
  it('has all identity keys in et/ru/en', () => {
    expect(findMissingIdentityDictionaryKeys()).toEqual([])
  })

  it('has no forbidden terms in any locale dictionary', () => {
    expect(scanIdentityDictionaryForbiddenTerms()).toEqual([])
  })

  it('detects forbidden terms in runtime text', () => {
    expect(findForbiddenVerificationTerm('No KYC required')).toBe('KYC')
    expect(findForbiddenVerificationTerm('Verified civic participant')).toBeNull()
  })
})
