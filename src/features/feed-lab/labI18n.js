import { THREADS_FEED_DICTIONARY_BY_LOCALE } from '../../i18n/threadsFeedDictionary.js'

/** Minimal lab t() — EN fallback for feed chrome keys outside reactions dictionary. */
const LAB_STRINGS = Object.freeze({
  'nextFeed.post.more': 'More',
  'nextFeed.post.openIssue': 'Open issue',
  'nextFeed.post.actions': 'Post actions',
  'nextFeed.post.comment': 'Comment',
  'nextFeed.post.share': 'Share',
  'threadsFeed.post.action.react': 'React',
  'threadsFeed.post.action.invite': 'Invite',
  'threadsFeed.reactions.react': 'React',
  'threadsFeed.reactions.viewReactions': 'View reactions',
  'threadsFeed.reactions.close': 'Close',
  'threadsFeed.reactions.chooseUpTo': 'Choose up to 3 reactions',
  'threadsFeed.reactions.capacityFull': 'Deselect one to choose another',
  'threadsFeed.reactions.unavailable': 'Reactions unavailable',
  'threadsFeed.reactions.peopleWhoReacted': 'People who reacted',
  'threadsFeed.reactions.loadingPeople': 'Loading people…',
  'threadsFeed.reactions.peopleUnavailable': 'People list unavailable',
  'threadsFeed.reactions.tryAgain': 'Try again',
  'threadsFeed.reactions.reactionsTitle': 'Reactions',
  'threadsFeed.reactions.viewAll': 'View all',
  'threadsFeed.reactions.tabAll': 'All',
  'threadsFeed.reactions.reactionTabs': 'Reaction types',
  'threadsFeed.reactions.you': 'You',
  'threadsFeed.reactions.connect': 'Connect',
  'threadsFeed.reactions.connectionUnavailable': 'Connection unavailable',
  'threadsFeed.reactions.connectUnavailableYet': 'Connection feature is not available yet.',
  'threadsFeed.reactions.noPeopleForReaction': 'No people for this reaction yet.',
  'threadsFeed.reactions.agreeDisagreeExclusive': 'Agree and Disagree can’t be selected together',
  'threadsFeed.reactions.rootModerationHint':
    'Thread root: Moderation reactions are available on comments only.',
  'threadsFeed.reactions.saveError': 'Couldn’t save. Selection restored.',
  'threadsFeed.reactions.reactToComment': 'React to this comment',
  'threadsFeed.reactions.reactToPost': 'React to this…',
  'threadsFeed.reactions.cancel': 'Cancel',
  'threadsFeed.reactions.addReactions': 'Add reactions',
  'threadsFeed.reactions.done': 'Done',
  'threadsFeed.reactions.layer.emotional': 'Emotional',
  'threadsFeed.reactions.layer.epistemic': 'Epistemic',
  'threadsFeed.reactions.layer.moderation': 'Moderation',
  'threadsFeed.reactions.id.acknowledge': 'Acknowledge',
  'threadsFeed.reactions.id.support': 'Support',
  'threadsFeed.reactions.id.empathy': 'Empathy',
  'threadsFeed.reactions.id.concern': 'Concern',
  'threadsFeed.reactions.id.hopeful': 'Hopeful',
  'threadsFeed.reactions.id.sad': 'Sad',
  'threadsFeed.reactions.id.outraged_situation': 'Outraged',
  'threadsFeed.reactions.id.amused': 'Amused',
  'threadsFeed.reactions.id.agree': 'Agree',
  'threadsFeed.reactions.id.disagree': 'Disagree',
  'threadsFeed.reactions.id.useful_fact': 'Useful fact',
  'threadsFeed.reactions.id.insightful': 'Insightful',
  'threadsFeed.reactions.id.needs_evidence': 'Needs evidence',
  'threadsFeed.reactions.id.off_topic': 'Off topic',
  'threadsFeed.reactions.id.aggressive': 'Aggressive',
  'threadsFeed.reactions.desc.acknowledge': 'Marks that you have seen this.',
  'threadsFeed.reactions.desc.support': 'Shows support for the idea.',
  'threadsFeed.reactions.desc.empathy': 'Shares care with the author.',
  'threadsFeed.reactions.desc.concern': 'Flags a worry about the situation.',
  'threadsFeed.reactions.desc.hopeful': 'Expresses hope for a better outcome.',
  'threadsFeed.reactions.desc.sad': 'Responds with sadness.',
  'threadsFeed.reactions.desc.outraged_situation': 'Calls out an unacceptable situation.',
  'threadsFeed.reactions.desc.amused': 'Finds this light or amusing.',
  'threadsFeed.reactions.desc.agree': 'Agrees with the claim.',
  'threadsFeed.reactions.desc.disagree': 'Disagrees with the claim.',
  'threadsFeed.reactions.desc.useful_fact': 'Highlights a useful fact.',
  'threadsFeed.reactions.desc.insightful': 'Marks a valuable insight.',
  'threadsFeed.reactions.desc.needs_evidence': 'Asks for supporting evidence.',
  'threadsFeed.reactions.desc.off_topic': 'Flags content as off-topic.',
  'threadsFeed.reactions.desc.aggressive': 'Flags aggressive tone.',
  'threadsFeed.composer.placeholder': 'Write a comment…',
  'threadsFeed.composer.cancel': 'Cancel',
  'threadsFeed.composer.submit': 'Post',
  'threadsFeed.composer.attach': 'Attach',
  'threadsFeed.composer.replyTo': 'Reply',
  'threadsFeed.composer.discardTitle': 'Discard draft?',
  'threadsFeed.composer.discardConfirm': 'Discard',
  'threadsFeed.composer.discardKeep': 'Keep editing',
})

/**
 * Nested dictionary walker (CR-04 / CR-08) — same grammar as ReactionsLabCanvas.
 * @param {Record<string, unknown>} dict
 * @returns {(key: string) => string}
 */
export function makeT(dict) {
  return (key) => {
    const parts = String(key).split('.')
    let cur = dict
    for (const p of parts) {
      if (cur == null || typeof cur !== 'object') {
        return LAB_STRINGS[key] ?? key
      }
      cur = cur[p]
    }
    if (typeof cur === 'string') return cur
    return LAB_STRINGS[key] ?? key
  }
}

/**
 * Locale-aware t for `#/lab/feed` stress — THREADS_FEED_DICTIONARY_BY_LOCALE.
 * @param {'en'|'et'|'ru'|string} locale
 * @returns {(key: string) => string}
 */
export function makeLabFeedT(locale = 'en') {
  const dict =
    THREADS_FEED_DICTIONARY_BY_LOCALE[locale] || THREADS_FEED_DICTIONARY_BY_LOCALE.en
  return makeT(dict)
}

/**
 * @param {string} key
 * @returns {string}
 */
export function labT(key) {
  return LAB_STRINGS[key] ?? key
}
