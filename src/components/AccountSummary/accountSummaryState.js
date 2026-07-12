export const ACCOUNT_SUMMARY_STATES = Object.freeze({
  COMPLETE: 'complete',
  MINIMAL_DATA: 'minimal-data',
  MISSING_EMAIL: 'missing-email',
})

/**
 * Derive AccountSummary UX state (M24 / M25 / M26).
 * @param {Record<string, unknown> | null | undefined} profile
 */
export function deriveAccountSummaryState(profile) {
  const email = profile?.email
  const hasEmail = email != null && String(email).trim() !== ''

  if (!hasEmail) {
    return ACCOUNT_SUMMARY_STATES.MISSING_EMAIL
  }

  const hasCreated =
    profile?.created_at != null && String(profile.created_at).trim() !== ''
  const hasRole = profile?.role != null && String(profile.role).trim() !== ''
  const status = profile?.account_status ?? profile?.status
  const hasStatus = status != null && String(status).trim() !== ''

  if (hasEmail && hasCreated && hasRole && hasStatus) {
    return ACCOUNT_SUMMARY_STATES.COMPLETE
  }

  return ACCOUNT_SUMMARY_STATES.MINIMAL_DATA
}

/**
 * @param {string | null | undefined} email
 * @returns {string | null}
 */
export function maskEmail(email) {
  if (!email || typeof email !== 'string') return null
  const trimmed = email.trim()
  const at = trimmed.indexOf('@')
  if (at <= 0) return null
  const local = trimmed.slice(0, at)
  const domain = trimmed.slice(at + 1)
  if (!domain) return null
  const maskedLocal = local.length <= 1 ? '*' : `${local[0]}***`
  return `${maskedLocal}@${domain}`
}

/**
 * @param {string | null | undefined} iso
 * @param {string} [locale]
 * @returns {string | null}
 */
export function formatAccountCreated(iso, locale) {
  if (!iso) return null
  try {
    return new Intl.DateTimeFormat(locale || undefined, { dateStyle: 'medium' }).format(new Date(iso))
  } catch {
    return null
  }
}

const ROLE_KEY_MAP = Object.freeze({
  citizen: 'cabinet.account.role.authenticatedUser',
  authenticated_user: 'cabinet.account.role.authenticatedUser',
  authenticated: 'cabinet.account.role.authenticatedUser',
  moderator: 'cabinet.account.role.moderator',
  administrator: 'cabinet.account.role.administrator',
  admin: 'cabinet.account.role.administrator',
  support: 'cabinet.account.role.support',
})

/**
 * @param {string | null | undefined} role
 * @returns {string}
 */
export function mapRoleTranslationKey(role) {
  const normalized = String(role ?? '')
    .trim()
    .toLowerCase()
    .replace(/-/g, '_')
  return ROLE_KEY_MAP[normalized] ?? 'cabinet.account.role.authenticatedUser'
}

const STATUS_KEY_MAP = Object.freeze({
  active: 'cabinet.account.status.active',
  pending: 'cabinet.account.status.pending',
  suspended: 'cabinet.account.status.suspended',
  archived: 'cabinet.account.status.archived',
})

/**
 * @param {string | null | undefined} status
 * @returns {string | null}
 */
export function mapStatusTranslationKey(status) {
  if (status == null || String(status).trim() === '') return null
  const normalized = String(status).trim().toLowerCase()
  return STATUS_KEY_MAP[normalized] ?? null
}
