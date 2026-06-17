import { LOCALE_CODES } from '../i18n/core.js'

export const ISSUE_STATUS = Object.freeze({
  NEW: 'NEW',
  IN_REVIEW: 'IN_REVIEW',
  PUBLISHED: 'PUBLISHED',
})

export const ISSUE_TYPE = Object.freeze({
  IMPROVEMENT: 'IMPROVEMENT',
  SERVICE_REQUEST: 'SERVICE_REQUEST',
  INCIDENT: 'INCIDENT',
})

export const ISSUE_TIME_TYPE = Object.freeze({
  EXACT: 'exact',
  DATE: 'date',
  DATE_RANGE: 'date_range',
  TIME_INTERVAL: 'time_interval',
  DATETIME_RANGE: 'datetime_range',
  APPROX_PERIOD: 'approx_period',
})

export const ISSUE_TIME_TYPE_ALIASES = Object.freeze({
  exact_date: ISSUE_TIME_TYPE.EXACT,
  approximate_period: ISSUE_TIME_TYPE.APPROX_PERIOD,
})

export const SEVERITY = Object.freeze({
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
})

export const IMPACT_ESTIMATION = Object.freeze({
  PERSONAL: 'personal',
  CITY_TOWN: 'city/town',
  STATE: 'state',
  COUNTRY: 'country',
  EARTH: 'Earth',
})

export const PROBLEM_STATUS = Object.freeze({
  ONGOING: 'ongoing',
  RESOLVED: 'resolved',
  WORSENED: 'worsened',
})

/**
 * @typedef {'NEW'|'IN_REVIEW'|'PUBLISHED'} IssueStatus
 * @typedef {'IMPROVEMENT'|'SERVICE_REQUEST'|'INCIDENT'} IssueType
 * @typedef {'exact'|'date'|'date_range'|'time_interval'|'datetime_range'|'approx_period'} IssueTimeType
 *
 * @typedef {Object} Issue
 * @property {string} id
 * @property {IssueType} type
 * @property {string} title
 * @property {string=} description
 * @property {string|{et?:string,ru?:string,en?:string}=} summary — краткий текст для карточки (fallback: title)
 * @property {string|{et?:string,ru?:string,en?:string}=} institution — инстанция/ведомство
 * @property {IssueStatus} status
 * @property {string[]} labels
 * @property {string=} arweave_txid
 * @property {string=} image_txid
 * @property {string=} image_hash
 * @property {string=} created_at
 * @property {('et'|'ru'|'en')[]=} original_locale — human-submitted locales from backend projection
 *
 * @typedef {Object} IssueIntakePayload
 * @property {{ first_name: string, last_name: string }} user
 * @property {string[]} problem_categories
 * @property {string} description
 * @property {{ details: string }} location
 * @property {{ type: 'image'|'video', url: string }[]=} media_files
 * @property {{ type: IssueTimeType, value: unknown }=} time
 * @property {'low'|'medium'|'high'|'critical'} severity
 * @property {'personal'|'city/town'|'state'|'country'|'Earth'} impact_estimation
 * @property {'ongoing'|'resolved'|'worsened'} problem_status
 * @property {string[]=} related_events
 * @property {{ source: string, tokenized: boolean }=} metadata
 *
 * @typedef {Object} CreateIssueCommand
 * @property {string} title
 * @property {string=} description
 * @property {IssueType} type
 * @property {string[]} labels
 * @property {{ kind: 'url'|'blob', value: string }=} image
 * @property {IssueIntakePayload=} intake_payload
 *
 * @typedef {Object} CreateIssueResult
 * @property {string} issue_id
 * @property {string} content_hash
 * @property {boolean} duplicate
 * @property {string=} existing_issue_id
 * @property {string=} arweave_txid
 * @property {string=} image_txid
 * @property {string=} tx_hash
 * @property {string} status
 */

export function normalizeIssueTimeType(value) {
  if (typeof value !== 'string') return null
  return ISSUE_TIME_TYPE_ALIASES[value] ?? value
}

export function isIssueTimeType(value) {
  const normalized = normalizeIssueTimeType(value)
  return Object.values(ISSUE_TIME_TYPE).includes(normalized)
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function isOptionalString(value) {
  return value === undefined || typeof value === 'string'
}

function isOptionalStringArray(value) {
  return value === undefined || (Array.isArray(value) && value.every((item) => typeof item === 'string'))
}

function isOptionalStringOrI18n(value) {
  if (value === undefined || typeof value === 'string') return true
  if (!isRecord(value)) return false
  return typeof value.et === 'string' || typeof value.ru === 'string' || typeof value.en === 'string'
}

function isOptionalOriginalLocaleArray(value) {
  if (value === undefined) return true
  if (!Array.isArray(value)) return false
  const allowed = new Set(LOCALE_CODES)
  return value.every((item) => typeof item === 'string' && allowed.has(item))
}

export function isIssue(value) {
  if (!isRecord(value)) return false

  return (
    typeof value.id === 'string' &&
    Object.values(ISSUE_TYPE).includes(value.type) &&
    (typeof value.title === 'string' || isOptionalStringOrI18n(value.title)) &&
    (isOptionalString(value.description) || isOptionalStringOrI18n(value.description)) &&
    (value.summary === undefined || isOptionalString(value.summary) || isOptionalStringOrI18n(value.summary)) &&
    (value.institution === undefined || isOptionalString(value.institution) || isOptionalStringOrI18n(value.institution)) &&
    Object.values(ISSUE_STATUS).includes(value.status) &&
    Array.isArray(value.labels) &&
    value.labels.every((item) => typeof item === 'string') &&
    isOptionalString(value.arweave_txid) &&
    isOptionalString(value.image_txid) &&
    isOptionalString(value.image_hash) &&
    isOptionalString(value.created_at) &&
    isOptionalOriginalLocaleArray(value.original_locale)
  )
}

export function isIssueIntakePayload(value) {
  if (!isRecord(value)) return false
  if (!isRecord(value.user) || typeof value.user.first_name !== 'string' || typeof value.user.last_name !== 'string') {
    return false
  }

  const hasValidProblemCategories =
    Array.isArray(value.problem_categories) && value.problem_categories.every((item) => typeof item === 'string')
  const hasValidLocation = isRecord(value.location) && typeof value.location.details === 'string'
  const hasValidTime =
    value.time === undefined ||
    (isRecord(value.time) && isIssueTimeType(value.time.type))
  const hasValidMedia =
    value.media_files === undefined ||
    (Array.isArray(value.media_files) &&
      value.media_files.every(
        (item) =>
          isRecord(item) &&
          (item.type === 'image' || item.type === 'video') &&
          typeof item.url === 'string',
      ))
  const hasValidMetadata =
    value.metadata === undefined ||
    (isRecord(value.metadata) && typeof value.metadata.source === 'string' && typeof value.metadata.tokenized === 'boolean')

  return (
    hasValidProblemCategories &&
    typeof value.description === 'string' &&
    hasValidLocation &&
    hasValidMedia &&
    hasValidTime &&
    Object.values(SEVERITY).includes(value.severity) &&
    Object.values(IMPACT_ESTIMATION).includes(value.impact_estimation) &&
    Object.values(PROBLEM_STATUS).includes(value.problem_status) &&
    isOptionalStringArray(value.related_events) &&
    hasValidMetadata
  )
}

export function isCreateIssueCommand(value) {
  if (!isRecord(value)) return false

  const hasValidImage =
    value.image === undefined ||
    (isRecord(value.image) &&
      (value.image.kind === 'url' || value.image.kind === 'blob') &&
      typeof value.image.value === 'string')

  return (
    typeof value.title === 'string' &&
    isOptionalString(value.description) &&
    Object.values(ISSUE_TYPE).includes(value.type) &&
    Array.isArray(value.labels) &&
    value.labels.every((item) => typeof item === 'string') &&
    hasValidImage &&
    (value.intake_payload === undefined || isIssueIntakePayload(value.intake_payload))
  )
}

export function isCreateIssueResult(value) {
  if (!isRecord(value)) return false

  return (
    typeof value.issue_id === 'string' &&
    typeof value.content_hash === 'string' &&
    typeof value.duplicate === 'boolean' &&
    isOptionalString(value.existing_issue_id) &&
    isOptionalString(value.arweave_txid) &&
    isOptionalString(value.image_txid) &&
    isOptionalString(value.tx_hash) &&
    typeof value.status === 'string'
  )
}

export function assertIssue(value) {
  if (!isIssue(value)) throw new Error('Invalid Issue')
  return value
}

export function assertIssueIntakePayload(value) {
  if (!isIssueIntakePayload(value)) throw new Error('Invalid IssueIntakePayload')
  return value
}

export function assertCreateIssueCommand(value) {
  if (!isCreateIssueCommand(value)) throw new Error('Invalid CreateIssueCommand')
  return value
}

export function assertCreateIssueResult(value) {
  if (!isCreateIssueResult(value)) throw new Error('Invalid CreateIssueResult')
  return value
}
