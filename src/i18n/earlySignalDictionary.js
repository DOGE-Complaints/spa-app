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
      message: 'Different Stories are beginning to reveal relationships across shared experiences.',
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
      intro: 'Some parts of the picture are still uncertain.',
      areas: 'Areas',
      languages: 'Languages',
      groups: 'Groups',
      themes: 'Themes',
    },
    help: {
      title: 'Help Complete the Picture',
      message: 'Share a civic Story to strengthen what the network can see.',
      submit: 'Submit a story',
      submitAccessible: 'Submit a story. Opens DOGEstonia GPT in an external service.',
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
      message: 'Erinevad lood hakkavad paljastama seoseid ühiste kogemuste vahel.',
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
      intro: 'Mõned osa pildist on endiselt ebaselged.',
      areas: 'Piirkonnad',
      languages: 'Keeled',
      groups: 'Rühmad',
      themes: 'Teemad',
    },
    help: {
      title: 'Aita pilti täiendada',
      message: 'Jaga kodanikulugu, et tugevdada seda, mida võrk näeb.',
      submit: 'Esita lugu',
      submitAccessible: 'Esita lugu. Avab DOGEstonia GPT välises teenuses.',
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
      message: 'Разные истории начинают выявлять связи между общим опытом.',
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
      intro: 'Некоторые части картины ещё неясны.',
      areas: 'Районы',
      languages: 'Языки',
      groups: 'Группы',
      themes: 'Темы',
    },
    help: {
      title: 'Помогите дополнить картину',
      message: 'Поделитесь гражданской историей, чтобы усилить то, что видит сеть.',
      submit: 'Подать историю',
      submitAccessible: 'Подать историю. Открывает DOGEstonia GPT во внешнем сервисе.',
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
  'earlySignal.forming.message',
  'earlySignal.emerging.title',
  'earlySignal.emerging.provisionalBadge',
  'earlySignal.emerging.cardHelper',
  'earlySignal.emerging.empty',
  'earlySignal.emerging.storyCount',
  'earlySignal.emerging.weaken',
  'earlySignal.missing.title',
  'earlySignal.missing.intro',
  'earlySignal.missing.areas',
  'earlySignal.missing.languages',
  'earlySignal.missing.groups',
  'earlySignal.missing.themes',
  'earlySignal.help.title',
  'earlySignal.help.message',
  'earlySignal.help.submit',
  'earlySignal.help.submitAccessible',
])
