import { describe, expect, it } from 'vitest'
import { findMissingPublicHomeDictionaryKeys } from '../forbiddenVerificationTerms.js'
import { PUBLIC_HOME_FLAT_KEYS } from '../publicHomeDictionary.js'

describe('publicHome dictionary SSOT', () => {
  it('lists PUBLIC_HOME_FLAT_KEYS for nav + account + footer labels', () => {
    expect(PUBLIC_HOME_FLAT_KEYS).toEqual([
      'publicHome.nav.dashboard',
      'publicHome.nav.howItWorks',
      'publicHome.nav.submitStory',
      'publicHome.nav.menuOpen',
      'publicHome.nav.menuClose',
      'publicHome.account.signIn',
      'publicHome.account.profile',
      'publicHome.account.logOut',
      'publicHome.account.openMenu',
      'publicHome.footer.brand',
      'publicHome.footer.tagline',
      'publicHome.footer.about',
      'publicHome.footer.privacy',
      'publicHome.footer.contact',
      'publicHome.board.empty.title',
      'publicHome.board.empty.message',
      'publicHome.board.filteredEmpty.title',
      'publicHome.board.filteredEmpty.message',
      'publicHome.board.filteredEmpty.reset',
      'publicHome.board.error.title',
      'publicHome.board.error.message',
      'publicHome.board.error.retry',
      'publicHome.board.loading.accessible',
    ])
  })

  it('lists PUBLIC_HOME_FLAT_KEYS including board chrome', () => {
    expect(PUBLIC_HOME_FLAT_KEYS.some((k) => k.startsWith('publicHome.board.'))).toBe(true)
  })

  it('has all PUBLIC_HOME_FLAT_KEYS in et/ru/en', () => {
    expect(findMissingPublicHomeDictionaryKeys()).toEqual([])
  })
})
