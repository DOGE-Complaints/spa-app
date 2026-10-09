import { describe, expect, it } from 'vitest'
import {
  NEXT_SHELL_DICTIONARY_BY_LOCALE,
  NEXT_SHELL_FLAT_KEYS,
} from '../nextShellDictionary.js'

describe('nextShell dictionary SSOT (NS-01/NS-02)', () => {
  it('lists nextShell.wip + nextShell.header flat keys', () => {
    expect(NEXT_SHELL_FLAT_KEYS).toEqual([
      'nextShell.wip.title',
      'nextShell.wip.body',
      'nextShell.header.homeAria',
      'nextShell.header.searchAria',
      'nextShell.header.menuOpen',
      'nextShell.header.menuClose',
      'nextShell.header.notificationsAria',
    ])
  })

  it('has en/et/ru values for all flat keys', () => {
    for (const locale of ['en', 'et', 'ru']) {
      const dict = NEXT_SHELL_DICTIONARY_BY_LOCALE[locale]
      expect(dict.nextShell.wip.title).toBeTruthy()
      expect(dict.nextShell.wip.body).toBeTruthy()
      expect(dict.nextShell.header.homeAria).toBeTruthy()
      expect(dict.nextShell.header.searchAria).toBeTruthy()
      expect(dict.nextShell.header.menuOpen).toBeTruthy()
      expect(dict.nextShell.header.menuClose).toBeTruthy()
      expect(dict.nextShell.header.notificationsAria).toBeTruthy()
    }
  })
})
