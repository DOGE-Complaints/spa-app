/** Threads feed L10N (en canon M143/M144/M148). Namespace threadsFeed.* */

const COMPOSER_EN = Object.freeze({
  placeholder: 'Write a comment',
  replyPlaceholder: 'Write a reply',
  replyingTo: 'Replying to',
  reply: 'Reply',
  attach: 'Attach',
  removeAttachment: 'Remove attachment',
  attachedFile: 'Attached file',
  postReply: 'Post reply',
  cancel: 'Cancel',
  keepEditing: 'Keep editing',
  attachDenied: 'This attachment can’t be added.',
  tryAgain: 'Try again',
  maxDepthReached: 'Maximum reply depth reached',
  postFailed: 'Comment wasn’t posted.',
  postFailedHelper: 'Your text is still here. Try again.',
})

const COMPOSER_ET = Object.freeze({
  placeholder: 'Kirjuta kommentaar',
  replyPlaceholder: 'Kirjuta vastus',
  replyingTo: 'Vastamine',
  reply: 'Vasta',
  attach: 'Lisa fail',
  removeAttachment: 'Eemalda manus',
  attachedFile: 'Lisatud fail',
  postReply: 'Postita vastus',
  cancel: 'Tühista',
  keepEditing: 'Jätka redigeerimist',
  attachDenied: 'Seda manust ei saa lisada.',
  tryAgain: 'Proovi uuesti',
  maxDepthReached: 'Maksimaalne vastuste sügavus on saavutatud',
  postFailed: 'Kommentaari ei postitatud.',
  postFailedHelper: 'Sinu tekst on endiselt siin. Proovi uuesti.',
})

const COMPOSER_RU = Object.freeze({
  placeholder: 'Написать комментарий',
  replyPlaceholder: 'Написать ответ',
  replyingTo: 'Ответ на',
  reply: 'Ответить',
  attach: 'Прикрепить',
  removeAttachment: 'Удалить вложение',
  attachedFile: 'Прикреплённый файл',
  postReply: 'Отправить ответ',
  cancel: 'Отмена',
  keepEditing: 'Продолжить редактирование',
  attachDenied: 'Это вложение нельзя добавить.',
  tryAgain: 'Попробовать снова',
  maxDepthReached: 'Достигнута максимальная глубина ответов',
  postFailed: 'Комментарий не отправлен.',
  postFailedHelper: 'Ваш текст всё ещё здесь. Попробуйте снова.',
})

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
    composer: COMPOSER_EN,
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
    composer: COMPOSER_ET,
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
    composer: COMPOSER_RU,
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
  'threadsFeed.composer.placeholder',
  'threadsFeed.composer.replyPlaceholder',
  'threadsFeed.composer.replyingTo',
  'threadsFeed.composer.reply',
  'threadsFeed.composer.attach',
  'threadsFeed.composer.removeAttachment',
  'threadsFeed.composer.attachedFile',
  'threadsFeed.composer.postReply',
  'threadsFeed.composer.cancel',
  'threadsFeed.composer.keepEditing',
  'threadsFeed.composer.attachDenied',
  'threadsFeed.composer.tryAgain',
  'threadsFeed.composer.maxDepthReached',
  'threadsFeed.composer.postFailed',
  'threadsFeed.composer.postFailedHelper',
])
