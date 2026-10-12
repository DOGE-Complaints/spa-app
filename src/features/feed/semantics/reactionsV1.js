/**
 * Feed semantics seam for reactions.v1 — no JSX.
 * Re-exports Closed catalog helpers (SSOT under components/threads).
 * Board ReactionControls may keep direct catalog import until full cutover.
 */
export {
  REACTIONS_V1_VERSION,
  REACTIONS_V1_ENTRIES,
  REACTIONS_V1_IDS,
  REACTION_LAYERS,
  DEFAULT_MAX_REACTIONS_PER_ACTOR,
  listReactionsV1,
  mapSummaryMarksToEntries,
  isReactionsV1Id,
  toggleReactionSelection,
  resolveHarnessThr03Scene,
} from '../../../components/threads/reactionsV1Catalog.js'
