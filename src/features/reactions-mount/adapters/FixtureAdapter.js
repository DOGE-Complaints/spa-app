/**
 * Lab FixtureAdapter (CR-api reuse map · REQ-24 L6).
 * Simulates aggregate/selection props — no HTTP. Same onReact result shape as
 * ReactionChrome / LiveIssueThreadMount.
 */

import { DEFAULT_MAX_REACTIONS_PER_ACTOR, toggleReactionSelection } from '../../feed/semantics/reactionsV1.js'

/** @typedef {'empty'|'loading'|'populated'|'unavailable'} StripFixtureState */

/**
 * @type {Readonly<Record<StripFixtureState, {
 *   stripStatus: 'ready'|'loading'|'error',
 *   summaryMarks: Array<{ reaction_id: string, count: number }>|null,
 *   aggregateCount: number|null,
 *   selected: string[],
 * }>>}
 */
export const STRIP_STATE_FIXTURES = Object.freeze({
  empty: {
    stripStatus: 'ready',
    summaryMarks: [],
    aggregateCount: 0,
    selected: [],
  },
  loading: {
    stripStatus: 'loading',
    summaryMarks: null,
    aggregateCount: null,
    selected: [],
  },
  populated: {
    stripStatus: 'ready',
    summaryMarks: [
      { reaction_id: 'acknowledge', count: 4 },
      { reaction_id: 'support', count: 2 },
      { reaction_id: 'agree', count: 1 },
    ],
    aggregateCount: 7,
    selected: ['acknowledge'],
  },
  unavailable: {
    stripStatus: 'error',
    summaryMarks: null,
    aggregateCount: null,
    selected: [],
  },
})

/** @typedef {'ready'|'loading'|'error'} PeopleFixtureState */

/** Illustrative lab people — labeled fixture · never for Live fabricate-from-counts */
export const PEOPLE_STATE_FIXTURES = Object.freeze({
  ready: Object.freeze([
    {
      id: 'you',
      name: 'You',
      reaction_id: 'acknowledge',
      isYou: true,
      fixture: true,
    },
    {
      id: 'member-a',
      name: 'Member A',
      reaction_id: 'support',
      fixture: true,
    },
    {
      id: 'member-b',
      name: 'Member B',
      reaction_id: 'agree',
      fixture: true,
    },
    {
      id: 'member-c',
      name: 'Member C',
      reaction_id: 'acknowledge',
      connectionUnavailable: true,
      fixture: true,
    },
  ]),
  loading: Object.freeze([]),
  error: Object.freeze([]),
})

/**
 * Create a mutable lab fixture adapter (local selection + aggregate).
 * @param {{
 *   initialState?: StripFixtureState,
 *   peopleState?: PeopleFixtureState,
 *   maxReactions?: number,
 *   target?: 'thread-root'|'comment',
 *   failNext?: boolean,
 * }} [opts]
 */
export function createFixtureAdapter(opts = {}) {
  const maxReactions =
    Number.isFinite(Number(opts.maxReactions)) && Number(opts.maxReactions) > 0
      ? Math.floor(Number(opts.maxReactions))
      : DEFAULT_MAX_REACTIONS_PER_ACTOR
  const target = opts.target || 'thread-root'
  const seed = STRIP_STATE_FIXTURES[opts.initialState || 'populated'] || STRIP_STATE_FIXTURES.populated

  let stripStatus = seed.stripStatus
  let summaryMarks = seed.summaryMarks ? seed.summaryMarks.map((m) => ({ ...m })) : seed.summaryMarks
  let aggregateCount = seed.aggregateCount
  let selected = [...seed.selected]
  /** When true, next onReact returns fail (CR-02 save-error restore lab). */
  let failNext = Boolean(opts.failNext)
  /** @type {PeopleFixtureState} */
  let peopleState =
    opts.peopleState === 'loading' || opts.peopleState === 'error' ? opts.peopleState : 'ready'

  function snapshot() {
    return {
      stripStatus,
      summaryMarks: summaryMarks ? summaryMarks.map((m) => ({ ...m })) : summaryMarks,
      aggregateCount,
      selected: [...selected],
      maxReactions,
      target,
    }
  }

  function setFailNext(value = true) {
    failNext = Boolean(value)
  }

  /**
   * Compatible with ReactionChrome onReact seam.
   * @param {{ reactionId: string, op: 'add'|'remove', target?: string, commentId?: string|null }} args
   */
  async function onReact(args) {
    if (failNext) {
      failNext = false
      return { status: 'fail', failKind: 'save', data: snapshot() }
    }
    const id = String(args?.reactionId || '')
    const before = [...selected]
    const { selected: next, error } = toggleReactionSelection(before, id, maxReactions)
    if (error === 'unknown-id' || error === 'capacity') {
      return { status: 'fail', failKind: error, data: snapshot() }
    }
    selected = next
    if (!Array.isArray(summaryMarks)) summaryMarks = []
    const existing = summaryMarks.find((m) => m.reaction_id === id)
    if (args.op === 'add') {
      if (existing) existing.count = (Number(existing.count) || 0) + 1
      else summaryMarks.push({ reaction_id: id, count: 1 })
    } else if (existing) {
      existing.count = Math.max(0, (Number(existing.count) || 0) - 1)
      if (existing.count === 0) {
        summaryMarks = summaryMarks.filter((m) => m.reaction_id !== id)
      }
    }
    aggregateCount = summaryMarks.reduce((n, m) => n + (Number(m.count) || 0), 0)
    stripStatus = 'ready'
    return {
      status: 'ok',
      data: {
        selected: [...selected],
        summary_marks: summaryMarks.map((m) => ({ ...m })),
        aggregate_count: aggregateCount,
      },
    }
  }

  function setStripState(/** @type {StripFixtureState} */ state) {
    const next = STRIP_STATE_FIXTURES[state]
    if (!next) return snapshot()
    stripStatus = next.stripStatus
    summaryMarks = next.summaryMarks ? next.summaryMarks.map((m) => ({ ...m })) : next.summaryMarks
    aggregateCount = next.aggregateCount
    selected = [...next.selected]
    return snapshot()
  }

  function setPeopleState(/** @type {PeopleFixtureState} */ state) {
    if (state === 'loading' || state === 'error' || state === 'ready') {
      peopleState = state
    }
    return peopleState
  }

  /**
   * CR-17 — lab people list (FixtureAdapter only · labeled fixture).
   * @returns {{ status: 'ok'|'fail', failKind?: string, data: { state: PeopleFixtureState, people: object[], fixture: true } }}
   */
  function listReactors() {
    if (peopleState === 'loading') {
      return {
        status: 'ok',
        data: { state: 'loading', people: [], fixture: true },
      }
    }
    if (peopleState === 'error') {
      return {
        status: 'fail',
        failKind: 'unavailable',
        data: { state: 'error', people: [], fixture: true },
      }
    }
    const people = (PEOPLE_STATE_FIXTURES.ready || []).map((p) => ({ ...p }))
    return {
      status: 'ok',
      data: { state: 'ready', people, fixture: true },
    }
  }

  return {
    kind: 'fixture',
    maxReactions,
    target,
    snapshot,
    onReact,
    setStripState,
    setFailNext,
    setPeopleState,
    listReactors,
    /** Aggregate / Reactions zone → people path (not picker) */
    onAggregateActivate() {
      return listReactors()
    },
  }
}
