/**
 * reactions.v1 catalog mirror (M145 §2 / Emotional reactions SSOT).
 * Do NOT invent ids outside this list.
 */

export const REACTIONS_V1_VERSION = 'reactions.v1'

/** @typedef {'emotional'|'epistemic'|'moderation'} ReactionLayer */

/**
 * @type {ReadonlyArray<{ id: string, layer: ReactionLayer, enabledDefault: boolean, emoji: string }>}
 */
export const REACTIONS_V1_ENTRIES = Object.freeze([
  { id: 'acknowledge', layer: 'emotional', enabledDefault: true, emoji: '👀' },
  { id: 'support', layer: 'emotional', enabledDefault: true, emoji: '🙌' },
  { id: 'empathy', layer: 'emotional', enabledDefault: true, emoji: '🫶' },
  { id: 'concern', layer: 'emotional', enabledDefault: true, emoji: '⚠️' },
  { id: 'hopeful', layer: 'emotional', enabledDefault: false, emoji: '🌱' },
  { id: 'sad', layer: 'emotional', enabledDefault: true, emoji: '😔' },
  { id: 'outraged_situation', layer: 'emotional', enabledDefault: true, emoji: '⚡' },
  { id: 'amused', layer: 'emotional', enabledDefault: false, emoji: '🙂' },
  { id: 'agree', layer: 'epistemic', enabledDefault: true, emoji: '✅' },
  { id: 'disagree', layer: 'epistemic', enabledDefault: true, emoji: '↔️' },
  { id: 'useful_fact', layer: 'epistemic', enabledDefault: true, emoji: '📌' },
  { id: 'insightful', layer: 'epistemic', enabledDefault: true, emoji: '💡' },
  { id: 'needs_evidence', layer: 'epistemic', enabledDefault: true, emoji: '🔎' },
  { id: 'off_topic', layer: 'moderation', enabledDefault: true, emoji: '🧭' },
  { id: 'aggressive', layer: 'moderation', enabledDefault: true, emoji: '🛑' },
])

export const REACTIONS_V1_IDS = Object.freeze(REACTIONS_V1_ENTRIES.map((e) => e.id))

export const REACTION_LAYERS = Object.freeze(['emotional', 'epistemic', 'moderation'])

export const DEFAULT_MAX_REACTIONS_PER_ACTOR = 3

/**
 * @param {{ includeDisabled?: boolean, target?: 'comment'|'thread-root' }} [opts]
 */
export function listReactionsV1(opts = {}) {
  const includeDisabled = Boolean(opts.includeDisabled)
  const target = opts.target || 'comment'
  return REACTIONS_V1_ENTRIES.filter((entry) => {
    if (!includeDisabled && !entry.enabledDefault) return false
    if (target === 'thread-root' && entry.layer === 'moderation') return false
    return true
  })
}

export function isReactionsV1Id(id) {
  return REACTIONS_V1_IDS.includes(id)
}

/**
 * Toggle selection with agree⟂disagree exclusivity and capacity.
 * @param {string[]} current
 * @param {string} id
 * @param {number} [max=3]
 */
export function toggleReactionSelection(current, id, max = DEFAULT_MAX_REACTIONS_PER_ACTOR) {
  if (!isReactionsV1Id(id)) return { selected: current, error: 'unknown-id' }
  let next = [...current]
  if (next.includes(id)) {
    next = next.filter((x) => x !== id)
    return { selected: next, error: null }
  }
  if (id === 'agree') next = next.filter((x) => x !== 'disagree')
  if (id === 'disagree') next = next.filter((x) => x !== 'agree')
  if (next.length >= max) return { selected: current, error: 'capacity' }
  next.push(id)
  return { selected: next, error: null }
}

export function resolveHarnessThr03Scene(fallback = 'strip') {
  if (typeof window === 'undefined') return fallback
  const forced = window.__THR03_FORCE_SCENE__
  const allowed = new Set(['strip', 'picker', 'enabled-only', 'exclusive', 'mobile', 'keyboard'])
  return allowed.has(forced) ? forced : fallback
}
