/**
 * Arweave GraphQL-ready read contract (no network logic here).
 *
 * @typedef {{ name: string, values: string[] }} ArweaveTagFilter
 *
 * @typedef {Object} ArweaveGraphQueryParams
 * @property {ArweaveTagFilter[]} tags
 * @property {number} first
 * @property {string|null=} after
 *
 * @typedef {Object} ArweaveGraphPageResult
 * @property {import('../../domain/types.js').Issue[]} items
 * @property {string|null} nextCursor
 * @property {boolean} hasNextPage
 */

import { isIssue } from '../../domain/types.js'

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export function isArweaveTagFilter(value) {
  return (
    isRecord(value) &&
    typeof value.name === 'string' &&
    Array.isArray(value.values) &&
    value.values.every((item) => typeof item === 'string')
  )
}

export function isArweaveGraphQueryParams(value) {
  return (
    isRecord(value) &&
    Array.isArray(value.tags) &&
    value.tags.every(isArweaveTagFilter) &&
    typeof value.first === 'number' &&
    value.first > 0 &&
    value.first <= 1000 &&
    (value.after === undefined || value.after === null || typeof value.after === 'string')
  )
}

export function isArweaveGraphPageResult(value) {
  return (
    isRecord(value) &&
    Array.isArray(value.items) &&
    value.items.every(isIssue) &&
    (value.nextCursor === null || typeof value.nextCursor === 'string') &&
    typeof value.hasNextPage === 'boolean'
  )
}

export function assertArweaveGraphQueryParams(value) {
  if (!isArweaveGraphQueryParams(value)) {
    throw new Error('Invalid ArweaveGraphQueryParams')
  }
  return value
}

export function assertArweaveGraphPageResult(value) {
  if (!isArweaveGraphPageResult(value)) {
    throw new Error('Invalid ArweaveGraphPageResult')
  }
  return value
}
