/** Minimal lab t() — no invent API; covers DS atom keys used on #/lab/feed. */
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
 * @param {string} key
 * @returns {string}
 */
export function labT(key) {
  return LAB_STRINGS[key] ?? key
}
