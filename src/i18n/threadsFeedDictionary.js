/** Threads feed L10N (en canon M143/M148). Namespace threadsFeed.* */

export const THREADS_FEED_DICTIONARY_EN = Object.freeze({
  threadsFeed: {
    post: {
      action: {
        react: 'React',
        discussion: 'Discussion',
        inviteOrganization: 'Invite organization',
      },
      empty: {
        title: 'No comments yet',
        helper: 'Start a constructive discussion about this Issue.',
      },
      composerPlaceholder: 'Write a comment',
      discussionUnavailable: 'Discussion unavailable',
      discussionUnavailableHelper: 'The Issue is still available. Try again later.',
      tryAgain: 'Try again',
      discussionLoading: 'Loading discussion…',
      existingDiscussion: 'Existing discussion',
      openTree: 'Open discussion',
      reactionSummarySlot: 'Reactions',
    },
  },
})

export const THREADS_FEED_DICTIONARY_ET = Object.freeze({
  threadsFeed: {
    post: {
      action: {
        react: 'Reageeri',
        discussion: 'Arutelu',
        inviteOrganization: 'Kutsu organisatsioon',
      },
      empty: {
        title: 'Kommentaare pole veel',
        helper: 'Alusta konstruktiivset arutelu selle teema üle.',
      },
      composerPlaceholder: 'Kirjuta kommentaar',
      discussionUnavailable: 'Arutelu pole saadaval',
      discussionUnavailableHelper: 'Teema on endiselt saadaval. Proovi hiljem uuesti.',
      tryAgain: 'Proovi uuesti',
      discussionLoading: 'Arutelu laadimine…',
      existingDiscussion: 'Olemasolev arutelu',
      openTree: 'Ava arutelu',
      reactionSummarySlot: 'Reaktsioonid',
    },
  },
})

export const THREADS_FEED_DICTIONARY_RU = Object.freeze({
  threadsFeed: {
    post: {
      action: {
        react: 'Реакция',
        discussion: 'Обсуждение',
        inviteOrganization: 'Пригласить организацию',
      },
      empty: {
        title: 'Пока нет комментариев',
        helper: 'Начните конструктивное обсуждение этой темы.',
      },
      composerPlaceholder: 'Написать комментарий',
      discussionUnavailable: 'Обсуждение недоступно',
      discussionUnavailableHelper: 'Тема по-прежнему доступна. Попробуйте позже.',
      tryAgain: 'Попробовать снова',
      discussionLoading: 'Загрузка обсуждения…',
      existingDiscussion: 'Существующее обсуждение',
      openTree: 'Открыть обсуждение',
      reactionSummarySlot: 'Реакции',
    },
  },
})

export const THREADS_FEED_DICTIONARY_BY_LOCALE = Object.freeze({
  en: THREADS_FEED_DICTIONARY_EN,
  et: THREADS_FEED_DICTIONARY_ET,
  ru: THREADS_FEED_DICTIONARY_RU,
})

export const THREADS_FEED_FLAT_KEYS = Object.freeze([
  'threadsFeed.post.action.react',
  'threadsFeed.post.action.discussion',
  'threadsFeed.post.action.inviteOrganization',
  'threadsFeed.post.empty.title',
  'threadsFeed.post.empty.helper',
  'threadsFeed.post.composerPlaceholder',
  'threadsFeed.post.discussionUnavailable',
  'threadsFeed.post.discussionUnavailableHelper',
  'threadsFeed.post.tryAgain',
  'threadsFeed.post.discussionLoading',
  'threadsFeed.post.existingDiscussion',
  'threadsFeed.post.openTree',
  'threadsFeed.post.reactionSummarySlot',
])
