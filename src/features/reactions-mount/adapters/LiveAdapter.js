/**
 * LiveAdapter — thin wrap of ThreadsSocialClient only (CR-api · FR-22.15).
 * No second HTTP client · no invent paths/fields.
 * Lab default remains FixtureAdapter; Live is optional toggle.
 */

import { defaultThreadsSocialClient } from '../../../repositories/ThreadsSocialClient.js'
import { DEFAULT_MAX_REACTIONS_PER_ACTOR } from '../../feed/semantics/reactionsV1.js'

/**
 * @param {{
 *   client?: { react: Function, getKnobs: Function },
 *   issueId?: string,
 *   maxReactions?: number,
 * }} [opts]
 */
export function createLiveAdapter(opts = {}) {
  const client = opts.client || defaultThreadsSocialClient
  const issueId = opts.issueId ? String(opts.issueId) : ''
  let maxReactions =
    Number.isFinite(Number(opts.maxReactions)) && Number(opts.maxReactions) > 0
      ? Math.floor(Number(opts.maxReactions))
      : DEFAULT_MAX_REACTIONS_PER_ACTOR

  /**
   * Mount onReact seam → ThreadsSocialClient.react (Closed PUT).
   * @param {{ reactionId: string, op: 'add'|'remove', target?: string, commentId?: string|null }} args
   */
  async function onReact(args) {
    if (!issueId) {
      return { status: 'fail', failKind: 'missing_issue', data: null }
    }
    const targetKind = args?.target === 'thread-root' ? 'thread_root' : 'comment'
    const result = await client.react({
      issueId,
      targetKind,
      commentId: targetKind === 'thread_root' ? null : args?.commentId ?? null,
      reactionId: args?.reactionId,
      op: args?.op,
    })
    // Pass through Closed client result shape; map selected/marks when Present.
    if (result && result.status === 'ok' && result.data) {
      return {
        status: 'ok',
        data: {
          selected: Array.isArray(result.data.selected)
            ? result.data.selected.map(String)
            : [],
          summary_marks: result.data.summary_marks ?? result.data.summaryMarks ?? null,
          aggregate_count:
            result.data.aggregate_count ?? result.data.aggregateCount ?? null,
        },
      }
    }
    return result
  }

  async function loadKnobs() {
    const result = await client.getKnobs()
    if (result && result.status === 'ok' && result.data) {
      const raw = result.data.max_reactions_per_actor ?? result.data.maxReactions
      if (Number.isFinite(Number(raw)) && Number(raw) > 0) {
        maxReactions = Math.floor(Number(raw))
      }
    }
    return result
  }

  /**
   * CR-17 — Live people fail-closed until real API (DUI-Q08).
   * Never fabricate people from aggregate counts · no invent /threads people HTTP.
   */
  function listReactors() {
    return {
      status: 'fail',
      failKind: 'unavailable',
      data: { state: 'error', people: [], live: true, inventHttp: false },
    }
  }

  return {
    kind: 'live',
    issueId,
    get maxReactions() {
      return maxReactions
    },
    onReact,
    loadKnobs,
    listReactors,
    /** Aggregate / Reactions zone → people path fail-closed */
    onAggregateActivate() {
      return listReactors()
    },
  }
}
