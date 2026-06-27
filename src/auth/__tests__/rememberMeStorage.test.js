/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, beforeEach } from 'vitest'
import {
  readRememberMePreference,
  rememberMeAuthStorage,
  REMEMBER_ME_PREFERENCE_KEY,
  writeRememberMePreference,
} from '../rememberMeStorage.js'

const TEST_KEY = 'dogestonia-auth-test'

describe('rememberMeAuthStorage', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it('uses sessionStorage when Remember Me preference is false', () => {
    writeRememberMePreference(false)
    rememberMeAuthStorage.setItem(TEST_KEY, 'session-token')
    expect(sessionStorage.getItem(TEST_KEY)).toBe('session-token')
    expect(localStorage.getItem(TEST_KEY)).toBeNull()
  })

  it('uses localStorage when Remember Me preference is true', () => {
    writeRememberMePreference(true)
    rememberMeAuthStorage.setItem(TEST_KEY, 'persist-token')
    expect(localStorage.getItem(TEST_KEY)).toBe('persist-token')
    expect(sessionStorage.getItem(TEST_KEY)).toBeNull()
  })

  it('defaults Remember Me preference to true', () => {
    expect(readRememberMePreference()).toBe(true)
    expect(localStorage.getItem(REMEMBER_ME_PREFERENCE_KEY)).toBeNull()
  })

  it('removeItem clears both storages', () => {
    localStorage.setItem(TEST_KEY, 'a')
    sessionStorage.setItem(TEST_KEY, 'b')
    rememberMeAuthStorage.removeItem(TEST_KEY)
    expect(localStorage.getItem(TEST_KEY)).toBeNull()
    expect(sessionStorage.getItem(TEST_KEY)).toBeNull()
  })
})
