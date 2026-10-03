/**
 * PH-12 — prefetch Closed getThreadTree flags for filtered issue ids.
 * No invent HTTP; reuse ThreadsSocialClient + knobs cache + mapThreadTreeToBlock.
 */

import { ensureThreadsKnobsCached } from '../repositories/threadsKnobsCache.js'
import { defaultThreadsSocialClient } from '../repositories/ThreadsSocialClient.js'
import { mapThreadTreeToBlock } from '../repositories/mapThreadTreeToBlock.js'
import { isDiscussionPopulatedStatus } from './sortIssuesByDiscussionPriority.js'

/** @type {Map<string, boolean>} */
const sessionFlagCache = new Map()

/** Fail-soft budget so List cannot stall forever when threads is down. */
export const DISCUSSION_PREFETCH_BUDGET_MS = 2500

/**
 * @template T
 * @param {Promise<T>} promise
 * @param {number} ms
 * @returns {Promise<T>}
 */
async function withBudget(promise, ms) {
  let timer
  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error('discussion_prefetch_budget')), ms)
      }),
    ])
  } finally {
    clearTimeout(timer)
  }
}

/**
 * @param {Iterable<string>} ids
 * @param {number} concurrency
 * @param {(id: string) => Promise<void>} worker
 */
async function runBounded(ids, concurrency, worker) {
  const list = [...ids]
  if (list.length === 0) return
  const limit = Math.max(1, Math.min(concurrency, list.length))
  let cursor = 0
  async function pump() {
    while (cursor < list.length) {
      const idx = cursor
      cursor += 1
      await worker(list[idx])
    }
  }
  await Promise.all(Array.from({ length: limit }, () => pump()))
}

/**
 * @param {Array<{ id?: string }>} issues
 * @param {{
 *   client?: { getThreadTree: (id: string) => Promise<unknown>, getKnobs?: () => Promise<unknown> },
 *   concurrency?: number,
 *   useSessionCache?: boolean,
 *   budgetMs?: number,
 * }} [options]
 * @returns {Promise<Map<string, boolean>>}
 */
export async function prefetchDiscussionFlags(issues, options = {}) {
  const client = options.client || defaultThreadsSocialClient
  const concurrency = Number.isFinite(options.concurrency) ? Math.max(1, options.concurrency) : 4
  const useSessionCache = options.useSessionCache !== false
  const budgetMs = Number.isFinite(options.budgetMs)
    ? Math.max(0, options.budgetMs)
    : DISCUSSION_PREFETCH_BUDGET_MS

  /** @type {Map<string, boolean>} */
  const flags = new Map()
  const ids = (Array.isArray(issues) ? issues : [])
    .map((issue) => (issue?.id === undefined || issue?.id === null ? '' : String(issue.id).trim()))
    .filter((id) => id !== '')

  for (const id of ids) {
    if (useSessionCache && sessionFlagCache.has(id)) {
      flags.set(id, sessionFlagCache.get(id) === true)
    }
  }

  const pending = ids.filter((id) => !flags.has(id))
  if (pending.length === 0) {
    return flags
  }

  const markFalse = (id) => {
    flags.set(id, false)
    if (useSessionCache) sessionFlagCache.set(id, false)
  }

  try {
    await withBudget(
      (async () => {
        const knobs = await ensureThreadsKnobsCached({ client })
        if (!knobs) {
          for (const id of pending) markFalse(id)
          return
        }

        await runBounded(pending, concurrency, async (id) => {
          try {
            const treeResult = await client.getThreadTree(id)
            const mapped = mapThreadTreeToBlock(treeResult)
            const hasDiscussion = isDiscussionPopulatedStatus(mapped.status)
            flags.set(id, hasDiscussion)
            if (useSessionCache) sessionFlagCache.set(id, hasDiscussion)
          } catch {
            markFalse(id)
          }
        })
      })(),
      budgetMs,
    )
  } catch {
    for (const id of pending) {
      if (!flags.has(id)) markFalse(id)
    }
  }

  return flags
}

/** Test helper — clear session flag cache. */
export function clearDiscussionFlagSessionCache() {
  sessionFlagCache.clear()
}
