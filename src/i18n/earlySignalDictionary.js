/** Early Signal discovery chrome — STORY-SPA-ES-01 L10N table (en canon M136). */

export const EARLY_SIGNAL_DICTIONARY_EN = Object.freeze({
  earlySignal: {
    discovery: {
      rootLabel: 'Early Signal discovery',
      intro: 'Stories are entering the system and beginning to form a shared picture.',
    },
    pulse: {
      title: 'Network Pulse',
    },
    forming: {
      title: 'The Picture Is Forming',
    },
    emerging: {
      title: 'Emerging Signals',
    },
    missing: {
      title: "What's Missing",
    },
    help: {
      title: 'Help Complete the Picture',
    },
  },
})

export const EARLY_SIGNAL_DICTIONARY_ET = Object.freeze({
  earlySignal: {
    discovery: {
      rootLabel: 'Varajase signaali avastus',
      intro: 'Lood sisenevad süsteemi ja hakkavad looma ühist pilti.',
    },
    pulse: {
      title: 'Võrgu pulss',
    },
    forming: {
      title: 'Pilt kujuneb',
    },
    emerging: {
      title: 'Ilmnevad signaalid',
    },
    missing: {
      title: 'Mis puudub',
    },
    help: {
      title: 'Aita pilti täiendada',
    },
  },
})

export const EARLY_SIGNAL_DICTIONARY_RU = Object.freeze({
  earlySignal: {
    discovery: {
      rootLabel: 'Обнаружение раннего сигнала',
      intro: 'Истории поступают в систему и начинают формировать общую картину.',
    },
    pulse: {
      title: 'Пульс сети',
    },
    forming: {
      title: 'Картина формируется',
    },
    emerging: {
      title: 'Формирующиеся сигналы',
    },
    missing: {
      title: 'Чего не хватает',
    },
    help: {
      title: 'Помогите дополнить картину',
    },
  },
})

export const EARLY_SIGNAL_DICTIONARY_BY_LOCALE = Object.freeze({
  en: EARLY_SIGNAL_DICTIONARY_EN,
  et: EARLY_SIGNAL_DICTIONARY_ET,
  ru: EARLY_SIGNAL_DICTIONARY_RU,
})

export const EARLY_SIGNAL_FLAT_KEYS = Object.freeze([
  'earlySignal.discovery.rootLabel',
  'earlySignal.discovery.intro',
  'earlySignal.pulse.title',
  'earlySignal.forming.title',
  'earlySignal.emerging.title',
  'earlySignal.missing.title',
  'earlySignal.help.title',
])
