/** Early Signal discovery + Pulse L10N (en canon M136/M137). */

export const EARLY_SIGNAL_DICTIONARY_EN = Object.freeze({
  earlySignal: {
    discovery: {
      rootLabel: 'Early Signal discovery',
      intro: 'Stories are entering the system and beginning to form a shared picture.',
    },
    pulse: {
      title: 'Network Pulse',
      omitMessage: 'Stories are already shaping a collective picture.',
      metric: {
        stories: 'Stories',
        areas: 'Areas',
        languages: 'Languages',
        topics: 'Topics',
        activity: 'Recent activity',
      },
      areasHonesty: 'A small sample of areas is not city-wide coverage.',
      listening: 'The network is listening for civic Stories.',
    },
    forming: {
      title: 'The Picture Is Forming',
    },
    emerging: {
      title: 'Emerging Signals',
      provisionalBadge: 'Provisional',
      cardHelper: 'A provisional relationship is beginning to appear across submitted Stories.',
      empty: 'No provisional patterns to show yet.',
      storyCount: '{count} Stories',
      weaken: 'This pattern is becoming less clear as new Stories arrive.',
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
      omitMessage: 'Lood kujundavad juba ühist pilti.',
      metric: {
        stories: 'Lood',
        areas: 'Piirkonnad',
        languages: 'Keeled',
        topics: 'Teemad',
        activity: 'Hiljutine aktiivsus',
      },
      areasHonesty: 'Väike piirkondade valim ei ole linna katvus.',
      listening: 'Võrk kuulab kodanike lugusid.',
    },
    forming: {
      title: 'Pilt kujuneb',
    },
    emerging: {
      title: 'Ilmnevad signaalid',
      provisionalBadge: 'Esialgne',
      cardHelper: 'Esialgne seos hakkab ilmnema esitatud lugude vahel.',
      empty: 'Esialgseid mustreid pole veel näidata.',
      storyCount: '{count} lugu',
      weaken: 'See muster muutub uute lugudega ebaselgemaks.',
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
      omitMessage: 'Истории уже формируют общую картину.',
      metric: {
        stories: 'Истории',
        areas: 'Районы',
        languages: 'Языки',
        topics: 'Темы',
        activity: 'Недавняя активность',
      },
      areasHonesty: 'Небольшая выборка районов — не покрытие всего города.',
      listening: 'Сеть принимает гражданские истории.',
    },
    forming: {
      title: 'Картина формируется',
    },
    emerging: {
      title: 'Формирующиеся сигналы',
      provisionalBadge: 'Предварительно',
      cardHelper: 'Между поданными историями начинает проявляться предварительная связь.',
      empty: 'Пока нет предварительных паттернов для показа.',
      storyCount: '{count} историй',
      weaken: 'Этот паттерн становится менее ясным по мере новых историй.',
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
  'earlySignal.pulse.omitMessage',
  'earlySignal.pulse.metric.stories',
  'earlySignal.pulse.metric.areas',
  'earlySignal.pulse.metric.languages',
  'earlySignal.pulse.metric.topics',
  'earlySignal.pulse.metric.activity',
  'earlySignal.pulse.areasHonesty',
  'earlySignal.pulse.listening',
  'earlySignal.forming.title',
  'earlySignal.emerging.title',
  'earlySignal.emerging.provisionalBadge',
  'earlySignal.emerging.cardHelper',
  'earlySignal.emerging.empty',
  'earlySignal.emerging.storyCount',
  'earlySignal.emerging.weaken',
  'earlySignal.missing.title',
  'earlySignal.help.title',
])
