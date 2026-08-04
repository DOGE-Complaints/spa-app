export const PUBLIC_HOME_DICTIONARY_EN = Object.freeze({
  publicHome: {
    nav: {
      dashboard: 'Dashboard',
      howItWorks: 'How it works',
      submitStory: 'Submit a story',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
    },
    account: {
      signIn: 'Sign in',
      profile: 'Profile',
      logOut: 'Log out',
      openMenu: 'Open account menu',
    },
    footer: {
      brand: 'DOGEstonia',
      tagline: '[TAGLINE_TBD]',
      about: 'About',
      privacy: 'Privacy',
      contact: 'Contact',
    },
    board: {
      empty: {
        title: 'No Issues Yet',
        message: 'Public civic issues will appear here when they become available.',
      },
      filteredEmpty: {
        title: 'No Issues Match These Filters',
        message: 'Adjust your search or reset the active filters to see more issues.',
        reset: 'Reset filters',
      },
      error: {
        title: 'Unable To Load The Board',
        message: "We couldn't load public issues right now. Please try again.",
        retry: 'Try Again',
      },
      loading: {
        accessible: 'Loading board…',
      },
      openIssue: 'Open issue →',
    },
  },
})

export const PUBLIC_HOME_DICTIONARY_ET = Object.freeze({
  publicHome: {
    nav: {
      dashboard: 'Juhtpaneel',
      howItWorks: 'Kuidas see töötab',
      submitStory: 'Esita lugu',
      menuOpen: 'Ava menüü',
      menuClose: 'Sulge menüü',
    },
    account: {
      signIn: 'Logi sisse',
      profile: 'Profiil',
      logOut: 'Logi välja',
      openMenu: 'Ava konto menüü',
    },
    footer: {
      brand: 'DOGEstonia',
      tagline: '[TAGLINE_TBD]',
      about: 'Meist',
      privacy: 'Privaatsus',
      contact: 'Kontakt',
    },
    board: {
      empty: {
        title: 'Teemasid veel pole',
        message: 'Avalikud ühiskondlikud teemad ilmuvad siia, kui need muutuvad kättesaadavaks.',
      },
      filteredEmpty: {
        title: 'Filtritele vastavaid teemasid pole',
        message: 'Muuda otsingut või lähtesta aktiivsed filtrid, et näha rohkem teemasid.',
        reset: 'Lähtesta filtrid',
      },
      error: {
        title: 'Juhtpaneeli ei õnnestunud laadida',
        message: 'Avalikke teemasid ei õnnestunud praegu laadida. Proovi uuesti.',
        retry: 'Proovi uuesti',
      },
      loading: {
        accessible: 'Juhtpaneeli laadimine…',
      },
      openIssue: 'Ava teema →',
    },
  },
})

export const PUBLIC_HOME_DICTIONARY_RU = Object.freeze({
  publicHome: {
    nav: {
      dashboard: 'Доска',
      howItWorks: 'Как это работает',
      submitStory: 'Подать историю',
      menuOpen: 'Открыть меню',
      menuClose: 'Закрыть меню',
    },
    account: {
      signIn: 'Войти',
      profile: 'Профиль',
      logOut: 'Выйти',
      openMenu: 'Открыть меню аккаунта',
    },
    footer: {
      brand: 'DOGEstonia',
      tagline: '[TAGLINE_TBD]',
      about: 'О проекте',
      privacy: 'Конфиденциальность',
      contact: 'Контакты',
    },
    board: {
      empty: {
        title: 'Тем пока нет',
        message: 'Публичные гражданские темы появятся здесь, когда станут доступны.',
      },
      filteredEmpty: {
        title: 'Нет тем по этим фильтрам',
        message: 'Измените поиск или сбросьте активные фильтры, чтобы увидеть больше тем.',
        reset: 'Сбросить фильтры',
      },
      error: {
        title: 'Не удалось загрузить доску',
        message: 'Сейчас не удалось загрузить публичные темы. Попробуйте снова.',
        retry: 'Повторить',
      },
      loading: {
        accessible: 'Загрузка доски…',
      },
      openIssue: 'Открыть тему →',
    },
  },
})

export const PUBLIC_HOME_DICTIONARY_BY_LOCALE = Object.freeze({
  en: PUBLIC_HOME_DICTIONARY_EN,
  et: PUBLIC_HOME_DICTIONARY_ET,
  ru: PUBLIC_HOME_DICTIONARY_RU,
})

export const PUBLIC_HOME_FLAT_KEYS = Object.freeze([
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
  'publicHome.board.openIssue',
])
