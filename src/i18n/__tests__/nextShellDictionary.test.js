import { describe, expect, it } from 'vitest'
import {
  NEXT_SHELL_DICTIONARY_BY_LOCALE,
  NEXT_SHELL_FLAT_KEYS,
} from '../nextShellDictionary.js'

describe('nextShell dictionary SSOT (NS-01…05)', () => {
  it('lists nextShell.wip + header + rail + mobile + shelter flat keys', () => {
    expect(NEXT_SHELL_FLAT_KEYS).toEqual([
      'nextShell.wip.title',
      'nextShell.wip.body',
      'nextShell.header.homeAria',
      'nextShell.header.searchAria',
      'nextShell.header.menuOpen',
      'nextShell.header.menuClose',
      'nextShell.header.notificationsAria',
      'nextShell.locale.esFrozenTooltip',
      'nextShell.rail.profile',
      'nextShell.rail.myStories',
      'nextShell.rail.board',
      'nextShell.rail.metricsSubmitted',
      'nextShell.rail.metricsPublished',
      'nextShell.rail.metricsUnderReview',
      'nextShell.rail.empty',
      'nextShell.rail.navAria',
      'nextShell.mobile.back',
      'nextShell.mobile.close',
      'nextShell.mobile.navBoard',
      'nextShell.mobile.navProfile',
      'nextShell.mobile.navAria',
      'nextShell.shelter.classicHint',
    ])
  })

  it('has en/et/ru values for all flat keys', () => {
    for (const locale of ['en', 'et', 'ru']) {
      const dict = NEXT_SHELL_DICTIONARY_BY_LOCALE[locale]
      expect(dict.nextShell.wip.title).toBeTruthy()
      expect(dict.nextShell.header.homeAria).toBeTruthy()
      expect(dict.nextShell.rail.profile).toBeTruthy()
      expect(dict.nextShell.rail.myStories).toBeTruthy()
      expect(dict.nextShell.rail.board).toBeTruthy()
      expect(dict.nextShell.rail.empty).toBeTruthy()
      expect(dict.nextShell.rail.navAria).toBeTruthy()
      expect(dict.nextShell.mobile.back).toBeTruthy()
      expect(dict.nextShell.mobile.close).toBeTruthy()
      expect(dict.nextShell.mobile.navBoard).toBeTruthy()
      expect(dict.nextShell.mobile.navProfile).toBeTruthy()
      expect(dict.nextShell.mobile.navAria).toBeTruthy()
      expect(dict.nextShell.shelter.classicHint).toBeTruthy()
    }
  })
})
