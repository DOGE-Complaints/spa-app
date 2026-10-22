import {
  HOW_IT_WORKS_EN,
  HOW_IT_WORKS_ET,
  HOW_IT_WORKS_RU,
  HOW_IT_WORKS_FLAT_KEYS,
} from './howItWorksDictionary.js'

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
      brandHomeAccessible: 'DOGEstonia — go to feed',
      tagline: 'Civic issues, structured.',
      navLabel: 'Site information',
      about: 'About',
      privacy: 'Privacy',
      contact: 'Contact',
    },
    static: {
      about: {
        title: 'About',
        pending: 'About copy — OP to supply (placeholder)',
      },
      privacy: {
        title: 'Privacy',
        pending: 'Privacy policy — OP to supply (placeholder)',
      },
      contact: {
        title: 'Contact',
        pending: 'Contact details — OP to supply (placeholder)',
      },
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
  howItWorks: HOW_IT_WORKS_EN,
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
      brandHomeAccessible: 'DOGEstonia — mine voogu',
      tagline: 'Kodanikuteemad, struktureeritult.',
      navLabel: 'Saiditeave',
      about: 'Meist',
      privacy: 'Privaatsus',
      contact: 'Kontakt',
    },
    static: {
      about: {
        title: 'Meist',
        pending: 'About-tekst — OP täidab (placeholder)',
      },
      privacy: {
        title: 'Privaatsus',
        pending: 'Privaatsuspoliitika — OP täidab (placeholder)',
      },
      contact: {
        title: 'Kontakt',
        pending: 'Kontaktandmed — OP täidab (placeholder)',
      },
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
  howItWorks: HOW_IT_WORKS_ET,
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
      brandHomeAccessible: 'DOGEstonia — к ленте',
      tagline: 'Гражданские темы — структурировано.',
      navLabel: 'Информация о сайте',
      about: 'О проекте',
      privacy: 'Конфиденциальность',
      contact: 'Контакты',
    },
    static: {
      about: {
        title: 'О проекте',
        pending: 'Текст About — OP заполнит (placeholder)',
      },
      privacy: {
        title: 'Конфиденциальность',
        pending: 'Политика конфиденциальности — OP заполнит (placeholder)',
      },
      contact: {
        title: 'Контакты',
        pending: 'Контактные данные — OP заполнит (placeholder)',
      },
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
  howItWorks: HOW_IT_WORKS_RU,
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
  'publicHome.footer.brandHomeAccessible',
  'publicHome.footer.tagline',
  'publicHome.footer.navLabel',
  'publicHome.footer.about',
  'publicHome.footer.privacy',
  'publicHome.footer.contact',
  'publicHome.static.about.title',
  'publicHome.static.about.pending',
  'publicHome.static.privacy.title',
  'publicHome.static.privacy.pending',
  'publicHome.static.contact.title',
  'publicHome.static.contact.pending',
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
  ...HOW_IT_WORKS_FLAT_KEYS,
])
