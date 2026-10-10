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

export const NEXT_FEED_DICTIONARY_EN = Object.freeze({
  nextFeed: {
    list: LIST_EN,
    toolbar: TOOLBAR_EN,
  },
})

export const NEXT_FEED_DICTIONARY_ET = Object.freeze({
  nextFeed: {
    list: LIST_ET,
    toolbar: TOOLBAR_ET,
  },
})

export const NEXT_FEED_DICTIONARY_RU = Object.freeze({
  nextFeed: {
    list: LIST_RU,
    toolbar: TOOLBAR_RU,
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
])
