import {
  PHONE_VERIFICATION_RULES,
  resendCooldownRemainingSeconds,
} from './verificationFlowState.js'
import {
  VERIFICATION_ERROR_ACTION_LABEL_KEYS,
  VERIFICATION_ERROR_COPY_KEYS,
  VERIFICATION_ERROR_KINDS,
} from '../components/PhoneVerification/phoneVerificationErrorLabels.js'
import {
  findForbiddenVerificationTerm,
  scanIdentityDictionaryForbiddenTerms,
} from '../i18n/forbiddenVerificationTerms.js'
import { UI_DICTIONARY } from '../i18n/dictionaries.js'

/** @typedef {import('../components/PhoneVerification/phoneVerificationErrorLabels.js').VerificationErrorActionId} VerificationErrorActionId */

/** @typedef {typeof VERIFICATION_ERROR_KINDS[keyof typeof VERIFICATION_ERROR_KINDS]} VerificationErrorKind */

/**
 * @typedef {object} VerificationErrorAction
 * @property {VerificationErrorActionId} id
 * @property {string} labelKey
 * @property {boolean} [disabled]
 */

/**
 * @typedef {object} ResolvedVerificationError
 * @property {VerificationErrorKind} errorKind
 * @property {string} titleKey
 * @property {string} messageKey
 * @property {VerificationErrorAction} primaryAction
 * @property {VerificationErrorAction | null} secondaryAction
 * @property {number | null} cooldownSecondsRemaining
 * @property {number | null} attemptsRemaining
 * @property {string | null} technicalCode
 * @property {string | null} traceId
 */

/** @type {Record<string, VerificationErrorKind>} */
export const API_CODE_TO_ERROR_KIND = Object.freeze({
  COUNTRY_NOT_ALLOWED: VERIFICATION_ERROR_KINDS.COUNTRY_NOT_ALLOWED,
  RATE_LIMITED: VERIFICATION_ERROR_KINDS.RATE_LIMITED,
  CODE_MISMATCH: VERIFICATION_ERROR_KINDS.CODE_MISMATCH,
  CODE_EXPIRED: VERIFICATION_ERROR_KINDS.CODE_EXPIRED,
  TOO_MANY_ATTEMPTS: VERIFICATION_ERROR_KINDS.TOO_MANY_ATTEMPTS,
  PROVIDER_UNAVAILABLE: VERIFICATION_ERROR_KINDS.SMS_UNAVAILABLE,
  SEND_FAILED: VERIFICATION_ERROR_KINDS.SMS_UNAVAILABLE,
  profile_conflict: VERIFICATION_ERROR_KINDS.PHONE_CONFLICT,
  AUTHENTICATION_REQUIRED: VERIFICATION_ERROR_KINDS.SIGN_IN_REQUIRED,
  session_expired: VERIFICATION_ERROR_KINDS.SIGN_IN_REQUIRED,
  network_error: VERIFICATION_ERROR_KINDS.CONNECTION_PROBLEM,
})

/**
 * @param {string | null | undefined} apiCode
 * @returns {VerificationErrorKind | null}
 */
export function mapApiCodeToErrorKind(apiCode) {
  if (!apiCode) return null
  return API_CODE_TO_ERROR_KIND[apiCode] ?? null
}

/**
 * @param {number} lastRequestAtMs
 * @param {number} [nowMs]
 * @returns {number}
 */
export function computeResendCooldownRemainingSeconds(lastRequestAtMs, nowMs = Date.now()) {
  if (!lastRequestAtMs) return 0
  return resendCooldownRemainingSeconds(lastRequestAtMs, nowMs)
}

/**
 * @param {number} mismatchCount
 * @returns {number}
 */
export function computeAttemptsRemaining(mismatchCount) {
  return Math.max(0, PHONE_VERIFICATION_RULES.MAX_ATTEMPTS - mismatchCount)
}

/**
 * @param {number} seconds
 * @returns {string}
 */
export function formatCooldownTimer(seconds) {
  const safe = Math.max(0, Math.floor(seconds))
  const minutes = Math.floor(safe / 60)
  const remainder = safe % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`
}

/**
 * @param {string} locale
 * @param {string} key
 * @returns {string|undefined}
 */
function resolveDictionaryKey(locale, key) {
  const parts = String(key).split('.')
  const chain = [locale, 'en', 'et']
  for (const code of chain) {
    let current = UI_DICTIONARY[code]
    for (const part of parts) {
      current = current?.[part]
    }
    if (typeof current === 'string') {
      return current
    }
  }
  return undefined
}

/**
 * @param {VerificationErrorActionId} actionId
 * @param {{ disabled?: boolean }} [options]
 * @returns {VerificationErrorAction}
 */
function buildAction(actionId, { disabled = false } = {}) {
  return {
    id: actionId,
    labelKey: VERIFICATION_ERROR_ACTION_LABEL_KEYS[actionId],
    disabled,
  }
}

/**
 * @param {string} apiCode
 * @param {{
 *   mismatchCount?: number,
 *   lastRequestAtMs?: number | null,
 *   traceId?: string | null,
 *   nowMs?: number,
 * }} [context]
 * @returns {ResolvedVerificationError | null}
 */
export function resolveVerificationError(apiCode, context = {}) {
  const errorKind = mapApiCodeToErrorKind(apiCode)
  if (!errorKind) return null

  const copy = VERIFICATION_ERROR_COPY_KEYS[errorKind]
  if (!copy) return null

  const mismatchCount = context.mismatchCount ?? 0
  const lastRequestAtMs = context.lastRequestAtMs ?? null
  const traceId = context.traceId ?? null
  const nowMs = context.nowMs ?? Date.now()

  let cooldownSecondsRemaining = null
  let attemptsRemaining = null
  let primaryDisabled = false

  if (errorKind === VERIFICATION_ERROR_KINDS.RATE_LIMITED) {
    cooldownSecondsRemaining = computeResendCooldownRemainingSeconds(lastRequestAtMs, nowMs)
    primaryDisabled = cooldownSecondsRemaining > 0
  }

  if (errorKind === VERIFICATION_ERROR_KINDS.CODE_MISMATCH) {
    attemptsRemaining = computeAttemptsRemaining(mismatchCount)
  }

  const primaryAction = buildAction(copy.primary, { disabled: primaryDisabled })
  const secondaryAction = copy.secondary
    ? buildAction(copy.secondary)
    : null

  return {
    errorKind,
    titleKey: copy.titleKey,
    messageKey: copy.messageKey,
    primaryAction,
    secondaryAction,
    cooldownSecondsRemaining,
    attemptsRemaining,
    technicalCode: apiCode,
    traceId,
  }
}

/**
 * @param {unknown} error
 * @returns {{ apiCode: string, traceId: string | null, status: number }}
 */
export function extractVerificationApiError(error) {
  if (error && typeof error === 'object') {
    const maybeError = /** @type {{ code?: string, body?: { error?: { trace_id?: string } }, status?: number, name?: string }} */ (
      error
    )
    if (maybeError.name === 'AuthenticationRequiredError' || maybeError.code === 'AUTHENTICATION_REQUIRED') {
      return {
        apiCode: 'AUTHENTICATION_REQUIRED',
        traceId: maybeError.body?.error?.trace_id ?? null,
        status: maybeError.status ?? 401,
      }
    }
    if (typeof maybeError.code === 'string') {
      return {
        apiCode: maybeError.code,
        traceId: maybeError.body?.error?.trace_id ?? null,
        status: maybeError.status ?? 0,
      }
    }
  }
  return { apiCode: 'unknown_error', traceId: null, status: 0 }
}

/**
 * Validate phoneError label keys resolve without forbidden terms (story AC #5).
 * @returns {string[]} offending entries
 */
export function findForbiddenTermsInErrorLabels() {
  const offenders = new Set()

  for (const hit of scanIdentityDictionaryForbiddenTerms()) {
    offenders.add(`${hit.locale}:${hit.term}`)
  }

  for (const [kind, copy] of Object.entries(VERIFICATION_ERROR_COPY_KEYS)) {
    for (const locale of ['en', 'et', 'ru']) {
      const title = resolveDictionaryKey(locale, copy.titleKey)
      const message = resolveDictionaryKey(locale, copy.messageKey)
      const blob = `${title ?? ''} ${message ?? ''}`
      const term = findForbiddenVerificationTerm(blob)
      if (term) {
        offenders.add(kind)
      }
    }
  }

  for (const labelKey of Object.values(VERIFICATION_ERROR_ACTION_LABEL_KEYS)) {
    for (const locale of ['en', 'et', 'ru']) {
      const label = resolveDictionaryKey(locale, labelKey)
      const term = findForbiddenVerificationTerm(label ?? '')
      if (term) {
        offenders.add(`action:${labelKey}`)
      }
    }
  }

  return [...offenders]
}
