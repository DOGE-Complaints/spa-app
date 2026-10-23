/**
 * M171 / PH-14 — howItWorks.* (top-level namespace, not under publicHome).
 * RU steps §3 verbatim · EN §4 + §5 shell · ET: EN structural fill (no invent ET).
 * Shell RU (eyebrow/title/intro/feed/landing): reuse prior approved PH-13 strings (§5).
 * Telegram CTA RU: EN tip held until editorial RU (§5 / §11) — no invent RU button prose.
 */

export const HOW_IT_WORKS_EN = Object.freeze({
  eyebrow: 'HOW DOGESTONIA WORKS',
  title: 'How It Works',
  intro:
    'Your experience can help bring shared problems and ideas into view.',
  steps: {
    observation: {
      number: '01',
      title: 'Notice what matters',
      body1:
        'A problem you have faced. Something missing nearby. An idea that could make life better. It starts with something you notice—even if you do not yet know how to put it into words.',
    },
    telegramStory: {
      number: '02',
      title: 'Tell your story to the Telegram bot',
      body1:
        'The bot asks questions, helps you work through the details and submit your story. You do not need a perfect draft—just tell it in your own words.',
      body2:
        'Your story stays private: other users cannot see it. It is saved in a clear, organised form in your account, so you can return to it.',
    },
    publicIssue: {
      number: '03',
      title: 'See how personal experience becomes a shared topic',
      body1:
        'Similar stories are brought together into public topics called Issues. In the feed, you may discover that others face the same problem, or that your idea meets a shared need.',
      body2:
        'A public topic shows the problem or proposal while keeping its authors anonymous and their personal details private. This makes important things visible: problems can be discussed and addressed, and ideas developed and put into practice.',
      inlineAction: 'Go to Feed',
    },
    profileDialogue: {
      number: '04',
      title: 'Take part where you have experience',
      body1:
        'Your stories gradually help shape your profile: the topics you know and the situations you have experienced. They inform your profile metrics and open access to discussions of related Issues.',
      body2:
        'Your experience helps both bring a topic into view and contribute to the conversation about what to do next.',
    },
  },
  visualLabels: {
    privateStory: 'Private story',
    privateStories: 'Private stories',
    publicIssue: 'Public Issue',
  },
  cta: {
    feed: 'Go to Feed',
    landing: 'Concept & FAQ on landing',
    landingAccessibleLabel:
      'Concept and FAQ on landing. Opens external landing page.',
    telegram: 'Start interview in Telegram',
    telegramAccessibleLabel:
      'Start interview in Telegram. Opens Telegram when configured.',
    /** Kept for Header / Board PH-06 Submit (not used on HIW after M171). */
    submit: 'Submit a story',
    submitAccessibleLabel:
      'Submit a story. Opens DOGEstonia GPT in an external service.',
  },
})

/** ET: structural parity with EN; no invented Estonian editorial (M171 §1 / §11). */
export const HOW_IT_WORKS_ET = Object.freeze({
  ...HOW_IT_WORKS_EN,
})

export const HOW_IT_WORKS_RU = Object.freeze({
  eyebrow: 'КАК РАБОТАЕТ DOGESTONIA',
  title: 'Как это работает',
  intro:
    'Превращайте реальный гражданский опыт в публичные темы, которые другие могут понять, рассмотреть и по которым можно действовать.',
  steps: {
    observation: {
      number: '01',
      title: 'Заметьте то, что важно',
      body1:
        'Проблема, с которой вы столкнулись. То, чего не хватает рядом. Идея, которая могла бы сделать жизнь лучше. Всё начинается с вашего наблюдения — даже если пока трудно подобрать слова.',
    },
    telegramStory: {
      number: '02',
      title: 'Расскажите свою историю Telegram-боту',
      body1:
        'Бот задаст вопросы, поможет разобраться в деталях и отправить историю. Не нужно заранее готовить идеальный текст — достаточно рассказать своими словами.',
      body2:
        'Ваша история останется приватной: другие пользователи её не увидят. Она сохранится в понятном, упорядоченном виде в вашем аккаунте, чтобы вы могли к ней вернуться.',
    },
    publicIssue: {
      number: '03',
      title: 'Посмотрите, как личный опыт становится общей темой',
      body1:
        'Похожие истории объединяются в публичные темы — Issues. В ленте можно увидеть, что ваша проблема знакома другим или ваша идея отвечает общей потребности.',
      body2:
        'Публичная тема показывает суть проблемы или предложения, сохраняя анонимность авторов и не раскрывая личные детали их историй. Так важное становится заметным: проблемы можно обсуждать и решать, а идеи — развивать и воплощать.',
      inlineAction: 'Перейти в ленту',
    },
    profileDialogue: {
      number: '04',
      title: 'Участвуйте там, где у вас есть опыт',
      body1:
        'Ваши истории постепенно помогают сформировать профиль: какие темы вам близки и с какими ситуациями вы сталкивались. На этой основе рассчитываются показатели профиля и открывается доступ к обсуждению связанных Issues.',
      body2:
        'Так ваш опыт помогает не только обозначить тему, но и включиться в разговор о том, что с ней делать дальше.',
    },
  },
  visualLabels: {
    privateStory: 'Private story',
    privateStories: 'Private stories',
    publicIssue: 'Public Issue',
  },
  cta: {
    feed: 'Перейти в ленту',
    landing: 'Концепция и FAQ на лендинге',
    landingAccessibleLabel:
      'Концепция и FAQ на лендинге. Открывает внешнюю посадочную страницу.',
    telegram: 'Start interview in Telegram',
    telegramAccessibleLabel:
      'Start interview in Telegram. Opens Telegram when configured.',
    submit: 'Подать историю',
    submitAccessibleLabel:
      'Подать историю. Открывает DOGEstonia GPT во внешнем сервисе.',
  },
})

export const HOW_IT_WORKS_FLAT_KEYS = Object.freeze([
  'howItWorks.eyebrow',
  'howItWorks.title',
  'howItWorks.intro',
  'howItWorks.steps.observation.number',
  'howItWorks.steps.observation.title',
  'howItWorks.steps.observation.body1',
  'howItWorks.steps.telegramStory.number',
  'howItWorks.steps.telegramStory.title',
  'howItWorks.steps.telegramStory.body1',
  'howItWorks.steps.telegramStory.body2',
  'howItWorks.steps.publicIssue.number',
  'howItWorks.steps.publicIssue.title',
  'howItWorks.steps.publicIssue.body1',
  'howItWorks.steps.publicIssue.body2',
  'howItWorks.steps.publicIssue.inlineAction',
  'howItWorks.steps.profileDialogue.number',
  'howItWorks.steps.profileDialogue.title',
  'howItWorks.steps.profileDialogue.body1',
  'howItWorks.steps.profileDialogue.body2',
  'howItWorks.visualLabels.privateStory',
  'howItWorks.visualLabels.privateStories',
  'howItWorks.visualLabels.publicIssue',
  'howItWorks.cta.feed',
  'howItWorks.cta.landing',
  'howItWorks.cta.landingAccessibleLabel',
  'howItWorks.cta.telegram',
  'howItWorks.cta.telegramAccessibleLabel',
  'howItWorks.cta.submit',
  'howItWorks.cta.submitAccessibleLabel',
])

/** Landing Concept & FAQ destination (operator-supplied · M168 / M171). */
export const HOW_IT_WORKS_LANDING_FAQ_HREF =
  'https://uus-veerenni-civic.dogestonia.me/#how-it-works'

/** Soft M171 step illustration public paths (docs tip → public). */
export const HOW_IT_WORKS_STEP_VISUALS = Object.freeze({
  observation: '/illustrations/how-it-works/m171-step-01-observation.png',
  telegramStory: '/illustrations/how-it-works/m171-step-02-telegram-story.png',
  publicIssue: '/illustrations/how-it-works/m171-step-03-public-issue.png',
  profileDialogue: '/illustrations/how-it-works/m171-step-04-profile-dialogue.png',
})
