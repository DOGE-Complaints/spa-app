/** Next Feed list/toolbar L10N (NF-01). Namespace nextFeed.* */

const LIST_EN = Object.freeze({
  loading: 'Loading feed…',
  empty: 'No published issues',
  error: 'Could not load the feed',
  retry: 'Try again',
  stale: 'Showing last loaded results',
  accessible: 'Published issues feed',
  filteredEmptyTitle: 'No issues match these filters',
  filteredEmptyMessage: 'Clear filters to see published issues again.',
})

const LIST_ET = Object.freeze({
  loading: 'Voogu laadimine…',
  empty: 'Avaldatud teateid pole',
  error: 'Voogu ei õnnestunud laadida',
  retry: 'Proovi uuesti',
  stale: 'Näitan viimati laaditud tulemusi',
  accessible: 'Avaldatud teadete voog',
  filteredEmptyTitle: 'Filtritele ei vasta ühtegi teadet',
  filteredEmptyMessage: 'Lähtesta filtrid, et näha avaldatud teateid.',
})

const LIST_RU = Object.freeze({
  loading: 'Загрузка ленты…',
  empty: 'Нет опубликованных обращений',
  error: 'Не удалось загрузить ленту',
  retry: 'Повторить',
  stale: 'Показаны последние загруженные результаты',
  accessible: 'Лента опубликованных обращений',
  filteredEmptyTitle: 'Нет обращений по выбранным фильтрам',
  filteredEmptyMessage: 'Сбросьте фильтры, чтобы снова увидеть опубликованные обращения.',
})

const TOOLBAR_EN = Object.freeze({
  filters: 'Filters',
  searchUnavailable: 'Live search is not available yet',
  title: 'Feed',
  queryAria: 'Feed query state',
})

const TOOLBAR_ET = Object.freeze({
  filters: 'Filtrid',
  searchUnavailable: 'Otseotsing pole veel saadaval',
  title: 'Voog',
  queryAria: 'Voo päringu olek',
})

const TOOLBAR_RU = Object.freeze({
  filters: 'Фильтры',
  searchUnavailable: 'Живой поиск пока недоступен',
  title: 'Лента',
  queryAria: 'Состояние запроса ленты',
})

const POST_EN = Object.freeze({
  openIssue: 'Open issue',
  more: 'More actions',
  share: 'Share',
  noMedia: 'No media attached',
  schemaUnavailable: 'Structured details unavailable',
})

const POST_ET = Object.freeze({
  openIssue: 'Ava teade',
  more: 'Rohkem',
  share: 'Jaga',
  noMedia: 'Meediat pole',
  schemaUnavailable: 'Struktureeritud andmed puuduvad',
})

const POST_RU = Object.freeze({
  openIssue: 'Открыть обращение',
  more: 'Ещё',
  share: 'Поделиться',
  noMedia: 'Медиа нет',
  schemaUnavailable: 'Структурированные данные недоступны',
})

const MAP_EN = Object.freeze({
  listView: 'List',
  mapView: 'Map',
  partial: 'Some issues have no public location',
  error: 'Map could not load',
  unavailable: 'Map unavailable',
  pinLabel: 'Issue location',
})

const MAP_ET = Object.freeze({
  listView: 'Nimekiri',
  mapView: 'Kaart',
  partial: 'Mõnel teatel puudub avalik asukoht',
  error: 'Kaarti ei õnnestunud laadida',
  unavailable: 'Kaart pole saadaval',
  pinLabel: 'Teate asukoht',
})

const MAP_RU = Object.freeze({
  listView: 'Список',
  mapView: 'Карта',
  partial: 'У части обращений нет публичной геопозиции',
  error: 'Карта не загрузилась',
  unavailable: 'Карта недоступна',
  pinLabel: 'Место обращения',
})

const THREAD_EN = Object.freeze({
  empty: 'No comments yet',
  attachDenied: 'Attachments are not available',
  maxDepth: 'Reply depth limit reached',
})

const THREAD_ET = Object.freeze({
  empty: 'Kommentaare pole veel',
  attachDenied: 'Manuseid ei saa lisada',
  maxDepth: 'Vastuste sügavuse limiit',
})

const THREAD_RU = Object.freeze({
  empty: 'Пока нет комментариев',
  attachDenied: 'Вложения недоступны',
  maxDepth: 'Достигнут лимит глубины ответов',
})

const GATE_EN = Object.freeze({
  verifyRequired: 'Verify your identity to post',
  deniedGeneric: 'Could not complete this action',
  draftPreserved: 'Your draft was kept',
})

const GATE_ET = Object.freeze({
  verifyRequired: 'Postitamiseks kinnita identiteet',
  deniedGeneric: 'Toimingut ei õnnestunud lõpule viia',
  draftPreserved: 'Mustand säilitati',
})

const GATE_RU = Object.freeze({
  verifyRequired: 'Подтвердите личность, чтобы писать',
  deniedGeneric: 'Не удалось выполнить действие',
  draftPreserved: 'Черновик сохранён',
})

export const NEXT_FEED_DICTIONARY_EN = Object.freeze({
  nextFeed: {
    list: LIST_EN,
    toolbar: TOOLBAR_EN,
    post: POST_EN,
    map: MAP_EN,
    thread: THREAD_EN,
    gate: GATE_EN,
  },
})

export const NEXT_FEED_DICTIONARY_ET = Object.freeze({
  nextFeed: {
    list: LIST_ET,
    toolbar: TOOLBAR_ET,
    post: POST_ET,
    map: MAP_ET,
    thread: THREAD_ET,
    gate: GATE_ET,
  },
})

export const NEXT_FEED_DICTIONARY_RU = Object.freeze({
  nextFeed: {
    list: LIST_RU,
    toolbar: TOOLBAR_RU,
    post: POST_RU,
    map: MAP_RU,
    thread: THREAD_RU,
    gate: GATE_RU,
  },
})

export const NEXT_FEED_BY_LOCALE = Object.freeze({
  en: NEXT_FEED_DICTIONARY_EN,
  et: NEXT_FEED_DICTIONARY_ET,
  ru: NEXT_FEED_DICTIONARY_RU,
})

export const NEXT_FEED_FLAT_KEYS = Object.freeze([
  'nextFeed.list.loading',
  'nextFeed.list.empty',
  'nextFeed.list.error',
  'nextFeed.list.retry',
  'nextFeed.list.stale',
  'nextFeed.list.accessible',
  'nextFeed.list.filteredEmptyTitle',
  'nextFeed.list.filteredEmptyMessage',
  'nextFeed.toolbar.filters',
  'nextFeed.toolbar.searchUnavailable',
  'nextFeed.toolbar.title',
  'nextFeed.toolbar.queryAria',
  'nextFeed.post.openIssue',
  'nextFeed.post.more',
  'nextFeed.post.share',
  'nextFeed.post.noMedia',
  'nextFeed.post.schemaUnavailable',
  'nextFeed.map.listView',
  'nextFeed.map.mapView',
  'nextFeed.map.partial',
  'nextFeed.map.error',
  'nextFeed.map.unavailable',
  'nextFeed.map.pinLabel',
  'nextFeed.thread.empty',
  'nextFeed.thread.attachDenied',
  'nextFeed.thread.maxDepth',
  'nextFeed.gate.verifyRequired',
  'nextFeed.gate.deniedGeneric',
  'nextFeed.gate.draftPreserved',
])
