/**
 * CR-icon §Reuse Runtime URLs — 13 selectable marks + chrome.
 * Do not invent filenames; do not emoji interim for selectable marks.
 * SSOT: STORY-SPA-CR-icon-assets.md
 */

/** @type {Readonly<Record<string, string>>} */
export const CR_REACTION_MARK_ICONS = Object.freeze({
  acknowledge: '/icons/next-feed/reactions/acknowledge.svg',
  support: '/icons/next-feed/reactions/support.svg',
  empathy: '/icons/next-feed/reactions/empathy.svg',
  concern: '/icons/next-feed/reactions/concern.svg',
  sad: '/icons/next-feed/reactions/sad.svg',
  outraged_situation: '/icons/next-feed/reactions/outraged-situation.svg',
  agree: '/icons/next-feed/reactions/agree.svg',
  disagree: '/icons/next-feed/reactions/disagree.svg',
  useful_fact: '/icons/next-feed/reactions/useful-fact.svg',
  insightful: '/icons/next-feed/reactions/insightful.svg',
  needs_evidence: '/icons/next-feed/reactions/needs-evidence.svg',
  off_topic: '/icons/next-feed/reactions/off-topic.svg',
  aggressive: '/icons/next-feed/reactions/aggressive.svg',
})

/** @type {Readonly<Record<string, string>>} */
export const CR_REACTION_CHROME_ICONS = Object.freeze({
  react: '/icons/next-feed/actions/react.svg',
  /** CR-28 M176 peer empty affordance — existing catalog reactions/people chrome */
  people: '/icons/next-feed/actions/reactions.svg',
  retry: '/icons/next-feed/actions/retry.svg',
  unavailable: '/icons/next-feed/status/unavailable.svg',
  warning: '/icons/next-feed/status/warning.svg',
  error: '/icons/next-feed/status/error.svg',
  success: '/icons/next-feed/status/success.svg',
  info: '/icons/next-feed/status/info.svg',
  close: '/icons/next-shell/actions/close.svg',
  chevronDown: '/icons/next-shell/actions/chevron-down.svg',
})

/** Full icon pack for strip / mount (marks + chrome). */
export const CR_REACTION_ICON_PACK = Object.freeze({
  ...CR_REACTION_MARK_ICONS,
  ...CR_REACTION_CHROME_ICONS,
})

export const CR_SELECTABLE_MARK_IDS = Object.freeze(Object.keys(CR_REACTION_MARK_ICONS))

/** Topic-guarded defaults — never selectable (M154). */
export const CR_OMIT_SELECTABLE_IDS = Object.freeze(['hopeful', 'amused'])
