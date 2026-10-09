/** Next Shell host + header copy (NS-01/NS-02). Feed product body → next-feed. */

export const NEXT_SHELL_DICTIONARY_EN = Object.freeze({
  nextShell: {
    wip: {
      title: 'Feed coming soon',
      body: 'Shell is ready. Feed content ships in a later package.',
    },
    header: {
      homeAria: 'Go to feed home',
      searchAria: 'Search (coming later)',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      notificationsAria: 'Notifications (coming later)',
    },
  },
})

export const NEXT_SHELL_DICTIONARY_ET = Object.freeze({
  nextShell: {
    wip: {
      title: 'Voog peagi',
      body: 'Ümbris on valmis. Voosisu tuleb hiljem.',
    },
    header: {
      homeAria: 'Mine voo avalehele',
      searchAria: 'Otsing (hiljem)',
      menuOpen: 'Ava menüü',
      menuClose: 'Sulge menüü',
      notificationsAria: 'Teavitused (hiljem)',
    },
  },
})

export const NEXT_SHELL_DICTIONARY_RU = Object.freeze({
  nextShell: {
    wip: {
      title: 'Лента скоро',
      body: 'Оболочка готова. Контент ленты — в следующем пакете.',
    },
    header: {
      homeAria: 'На главную ленты',
      searchAria: 'Поиск (позже)',
      menuOpen: 'Открыть меню',
      menuClose: 'Закрыть меню',
      notificationsAria: 'Уведомления (позже)',
    },
  },
})

export const NEXT_SHELL_DICTIONARY_BY_LOCALE = Object.freeze({
  en: NEXT_SHELL_DICTIONARY_EN,
  et: NEXT_SHELL_DICTIONARY_ET,
  ru: NEXT_SHELL_DICTIONARY_RU,
})

export const NEXT_SHELL_FLAT_KEYS = Object.freeze([
  'nextShell.wip.title',
  'nextShell.wip.body',
  'nextShell.header.homeAria',
  'nextShell.header.searchAria',
  'nextShell.header.menuOpen',
  'nextShell.header.menuClose',
  'nextShell.header.notificationsAria',
])
