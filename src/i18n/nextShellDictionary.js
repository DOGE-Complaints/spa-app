/** Next Shell WIP / host copy (NS-01). Feed product body → next-feed. */

export const NEXT_SHELL_DICTIONARY_EN = Object.freeze({
  nextShell: {
    wip: {
      title: 'Feed coming soon',
      body: 'Shell is ready. Feed content ships in a later package.',
    },
  },
})

export const NEXT_SHELL_DICTIONARY_ET = Object.freeze({
  nextShell: {
    wip: {
      title: 'Voog peagi',
      body: 'Ümbris on valmis. Voosisu tuleb hiljem.',
    },
  },
})

export const NEXT_SHELL_DICTIONARY_RU = Object.freeze({
  nextShell: {
    wip: {
      title: 'Лента скоро',
      body: 'Оболочка готова. Контент ленты — в следующем пакете.',
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
])
