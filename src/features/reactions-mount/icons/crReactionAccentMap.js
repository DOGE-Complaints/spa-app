/**
 * CR-14 — mark-id → CSS custom property aliases (reactions.v1).
 * SSOT values live in `src/styles/tokens.css` (`--rm-mark-accent-*` / `--rm-mark-soft-*`).
 * Package §6 lists representative ids; full selectable set extended for catalog.
 * No multicolor SVG generate — masks keep currentColor.
 */

import { CR_SELECTABLE_MARK_IDS } from './crReactionIcons.js'

/** @type {ReadonlyArray<string>} */
export const CR_REACTION_ACCENT_IDS = CR_SELECTABLE_MARK_IDS

/**
 * @param {string} id
 * @returns {string} CSS var name for accent (without var())
 */
export function markAccentVar(id) {
  return `--rm-mark-accent-${id}`
}

/**
 * @param {string} id
 * @returns {string} CSS var name for soft bg
 */
export function markSoftVar(id) {
  return `--rm-mark-soft-${id}`
}

/**
 * @param {string} id
 * @returns {boolean}
 */
export function hasMarkAccent(id) {
  return CR_REACTION_ACCENT_IDS.includes(id)
}
