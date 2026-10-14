/**
 * PostActionStrip slot contract (AC-24-08 / FR-CR-01.4).
 *
 * Composition lock (PRODUCT-BRIEF · Component & Variants §§22, 29):
 *   media → PostActionStrip (four zones) → discussion/comment nodes
 * Slot for ReactionsMount = zone inside PostActionStrip (`react` + `reactions`)
 * or a comment-node reactions host — NOT a fifth free-floating strip between
 * media and actions. No DS amend of zone count/tokens.
 *
 * Root vs comment (FR-CR-01.3):
 *   thread-root → Emotional + Epistemic only (moderation marks omitted)
 *   comment     → same package + config; moderation eligible
 */

export const POST_ACTION_STRIP_ZONES = Object.freeze([
  'react',
  'comment',
  'share',
  'reactions',
])

/** Zones that may host / open the reactions mount. */
export const REACTIONS_MOUNT_STRIP_ZONES = Object.freeze(['react', 'reactions'])

export const REACTIONS_MOUNT_SLOT_KINDS = Object.freeze({
  POST_ACTION_STRIP: 'post-action-strip',
  COMMENT_NODE: 'comment-node',
})

/**
 * @param {'thread-root'|'comment'} target
 * @returns {{ moderationSelectable: boolean, slotHint: string }}
 */
export function resolveReactionsMountTargetConfig(target) {
  const isRoot = target === 'thread-root'
  return {
    moderationSelectable: !isRoot,
    slotHint: isRoot
      ? 'Moderation reactions are available on comments only.'
      : 'Comment node — Emotional + Epistemic + Moderation when enabled.',
  }
}

/**
 * True when zone id is a valid PostActionStrip reactions host zone.
 * @param {string} zoneId
 */
export function isReactionsMountStripZone(zoneId) {
  return REACTIONS_MOUNT_STRIP_ZONES.includes(zoneId)
}
