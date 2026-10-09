/** Next Shell host + header + rail + mobile chrome (NS-01…04). Feed product body → next-feed. */

const RAIL_EN = Object.freeze({
  profile: 'Profile',
  myStories: 'My stories',
  board: 'Board',
  metricsSubmitted: 'Submitted',
  metricsPublished: 'Published',
  metricsUnderReview: 'Under review',
  empty: 'No stories yet',
  navAria: 'Profile rail navigation',
})

const RAIL_ET = Object.freeze({
  profile: 'Profiil',
  myStories: 'Minu lood',
  board: 'Tahvel',
  metricsSubmitted: 'Esitatud',
  metricsPublished: 'Avaldatud',
  metricsUnderReview: 'Ülevaatamisel',
  empty: 'Lugusid pole veel',
  navAria: 'Profiilirea navigatsioon',
})

const RAIL_RU = Object.freeze({
  profile: 'Профиль',
  myStories: 'Мои истории',
  board: 'Доска',
  metricsSubmitted: 'Отправлено',
  metricsPublished: 'Опубликовано',
  metricsUnderReview: 'На проверке',
  empty: 'Пока нет историй',
  navAria: 'Навигация профиля',
})

const MOBILE_EN = Object.freeze({
  back: 'Back',
  close: 'Close',
  navBoard: 'Board',
  navProfile: 'Profile',
  navAria: 'Mobile shell navigation',
})

const MOBILE_ET = Object.freeze({
  back: 'Tagasi',
  close: 'Sulge',
  navBoard: 'Tahvel',
  navProfile: 'Profiil',
  navAria: 'Mobiilse ümbrise navigatsioon',
})

const MOBILE_RU = Object.freeze({
  back: 'Назад',
  close: 'Закрыть',
  navBoard: 'Доска',
  navProfile: 'Профиль',
  navAria: 'Навигация мобильной оболочки',
})

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
    rail: RAIL_EN,
    mobile: MOBILE_EN,
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
    rail: RAIL_ET,
    mobile: MOBILE_ET,
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
    rail: RAIL_RU,
    mobile: MOBILE_RU,
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
])
