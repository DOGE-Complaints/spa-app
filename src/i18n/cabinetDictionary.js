export const CABINET_DICTIONARY_EN = Object.freeze({
  cabinet: {
    page: {
      title: 'Profile',
    },
    shell: {
      loading: 'Loading profile…',
    },
    section: {
      account: 'Account',
      civicStatus: 'Civic Status',
      storyActivity: 'Story Activity',
      wallet: 'Wallet',
      contribution: 'Contribution Layer',
    },
    common: {
      notAvailable: 'Not Available',
      comingLater: 'Coming Later',
      retry: 'Retry',
      codeLabel: 'Code: {code}',
      discardDraft: 'Discard Draft',
    },
    account: {
      title: 'Account',
      field: {
        email: 'Email',
        created: 'Account Created',
        role: 'Role',
        status: 'Account Status',
      },
      role: {
        authenticatedUser: 'Authenticated User',
        moderator: 'Moderator',
        administrator: 'Administrator',
        support: 'Support',
      },
      status: {
        active: 'Active',
        pending: 'Pending',
        suspended: 'Suspended',
        archived: 'Archived',
      },
    },
  },
})

export const CABINET_DICTIONARY_ET = Object.freeze({
  cabinet: {
    page: {
      title: 'Profiil',
    },
    shell: {
      loading: 'Profiili laadimine…',
    },
    section: {
      account: 'Konto',
      civicStatus: 'Kodaniku staatus',
      storyActivity: 'Lugude tegevus',
      wallet: 'Rahakott',
      contribution: 'Panustamise kiht',
    },
    common: {
      notAvailable: 'Pole saadaval',
      comingLater: 'Tulekul',
      retry: 'Proovi uuesti',
      codeLabel: 'Kood: {code}',
      discardDraft: 'Loobu mustandist',
    },
    account: {
      title: 'Konto',
      field: {
        email: 'E-post',
        created: 'Konto loodud',
        role: 'Roll',
        status: 'Konto olek',
      },
      role: {
        authenticatedUser: 'Autenditud kasutaja',
        moderator: 'Moderaator',
        administrator: 'Administraator',
        support: 'Tugi',
      },
      status: {
        active: 'Aktiivne',
        pending: 'Ootel',
        suspended: 'Peatatud',
        archived: 'Arhiveeritud',
      },
    },
  },
})

export const CABINET_DICTIONARY_RU = Object.freeze({
  cabinet: {
    page: {
      title: 'Профиль',
    },
    shell: {
      loading: 'Загрузка профиля…',
    },
    section: {
      account: 'Аккаунт',
      civicStatus: 'Гражданский статус',
      storyActivity: 'Активность историй',
      wallet: 'Кошелёк',
      contribution: 'Слой вклада',
    },
    common: {
      notAvailable: 'Недоступно',
      comingLater: 'Скоро',
      retry: 'Повторить',
      codeLabel: 'Код: {code}',
      discardDraft: 'Отменить черновик',
    },
    account: {
      title: 'Аккаунт',
      field: {
        email: 'Эл. почта',
        created: 'Аккаунт создан',
        role: 'Роль',
        status: 'Статус аккаунта',
      },
      role: {
        authenticatedUser: 'Аутентифицированный пользователь',
        moderator: 'Модератор',
        administrator: 'Администратор',
        support: 'Поддержка',
      },
      status: {
        active: 'Активен',
        pending: 'Ожидает',
        suspended: 'Приостановлен',
        archived: 'Архивирован',
      },
    },
  },
})

export const CABINET_DICTIONARY_BY_LOCALE = Object.freeze({
  en: CABINET_DICTIONARY_EN,
  et: CABINET_DICTIONARY_ET,
  ru: CABINET_DICTIONARY_RU,
})

export const CABINET_FLAT_KEYS = Object.freeze([
  'cabinet.page.title',
  'cabinet.shell.loading',
  'cabinet.section.account',
  'cabinet.section.civicStatus',
  'cabinet.section.storyActivity',
  'cabinet.section.wallet',
  'cabinet.section.contribution',
  'cabinet.common.notAvailable',
  'cabinet.common.comingLater',
  'cabinet.common.retry',
  'cabinet.common.codeLabel',
  'cabinet.common.discardDraft',
  'cabinet.account.title',
  'cabinet.account.field.email',
  'cabinet.account.field.created',
  'cabinet.account.field.role',
  'cabinet.account.field.status',
  'cabinet.account.role.authenticatedUser',
  'cabinet.account.role.moderator',
  'cabinet.account.role.administrator',
  'cabinet.account.role.support',
  'cabinet.account.status.active',
  'cabinet.account.status.pending',
  'cabinet.account.status.suspended',
  'cabinet.account.status.archived',
])
