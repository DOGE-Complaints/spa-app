/** Lab fixture EN labels (M154) — ids never shown as user copy. No emoji. */
export const FEED_REACTION_LABELS_EN = Object.freeze({
  acknowledge: 'Acknowledge',
  support: 'Support',
  empathy: 'Empathy',
  concern: 'Concerned',
  hopeful: 'Hopeful',
  sad: 'Sad',
  outraged_situation: 'This is unacceptable',
  amused: 'Amusing',
  agree: 'Agree',
  disagree: 'Disagree',
  useful_fact: 'Useful fact',
  insightful: 'Insightful',
  needs_evidence: 'Needs evidence',
  off_topic: 'Off-topic',
  aggressive: 'Aggressive',
})

export const FEED_REACTION_LAYER_LABELS_EN = Object.freeze({
  emotional: 'Emotional',
  epistemic: 'Epistemic',
  moderation: 'Moderation',
})

export function feedReactionLabel(id) {
  return FEED_REACTION_LABELS_EN[id] || id
}
