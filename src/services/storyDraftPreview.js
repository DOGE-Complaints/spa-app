import { LOCALE_CODES } from '../i18n/core.js'

const SUPPORTED_LANGS = LOCALE_CODES

/**
 * @param {Record<string, string> | null | undefined} field
 * @param {string} lang
 * @returns {string | null}
 */
function pickLocalized(field, lang) {
  if (!field || typeof field !== 'object') {
    return null
  }
  const normalized = SUPPORTED_LANGS.includes(lang) ? lang : 'en'
  const value = field[normalized] ?? field.en ?? field.et ?? field.ru
  if (typeof value !== 'string' || !value.trim()) {
    return null
  }
  return value.trim()
}

/**
 * @param {Record<string, unknown>} payload
 * @returns {Record<string, unknown>}
 */
function narrativeBlock(payload) {
  const narrative = payload?.narrative
  return narrative && typeof narrative === 'object' ? narrative : {}
}

/**
 * @param {unknown} payload
 * @returns {{ sessionLanguage: string, languageBadge: string }}
 */
function resolveLanguage(payload) {
  const narrative = narrativeBlock(payload)
  const raw =
    payload?.narrative_session_language ??
    payload?.session_language ??
    payload?.narrativeSessionLanguage ??
    narrative.session_language ??
    narrative.language ??
    'en'
  const lang = String(raw).trim().toLowerCase()
  const sessionLanguage = SUPPORTED_LANGS.includes(lang) ? lang : 'en'
  return {
    sessionLanguage,
    languageBadge: sessionLanguage.toUpperCase(),
  }
}

/**
 * Map opaque gateway draft payload to read-only preview viewmodel.
 * @param {Record<string, unknown>} [payload]
 * @returns {{
 *   sessionLanguage: string,
 *   languageBadge: string,
 *   title: string | null,
 *   summary: string | null,
 *   description: string | null,
 *   category: string | null,
 *   labels: string[],
 *   institution: string | null,
 *   location: string | null,
 * }}
 */
export function mapDraftPayloadToPreview(payload = {}) {
  const narrative = narrativeBlock(payload)
  const { sessionLanguage, languageBadge } = resolveLanguage(payload)

  const labelsRaw =
    payload.narrative_canonical_labels ?? payload.labels ?? narrative.canonical_labels
  /** @type {string[]} */
  const labels = Array.isArray(labelsRaw)
    ? labelsRaw.map((item) => String(item).trim()).filter(Boolean)
    : typeof labelsRaw === 'string' && labelsRaw.trim()
      ? [labelsRaw.trim()]
      : []

  const categoryRaw =
    payload.narrative_canonical_type ?? payload.category ?? narrative.canonical_type
  const category =
    typeof categoryRaw === 'string' && categoryRaw.trim() ? categoryRaw.trim() : null

  const locationRaw =
    payload.narrative_location_query ?? payload.location ?? narrative.location_query
  const location =
    typeof locationRaw === 'string' && locationRaw.trim() ? locationRaw.trim() : null

  const titleField = payload.narrative_title ?? narrative.title
  const summaryField = payload.narrative_summary ?? narrative.summary
  const descriptionField = payload.narrative_description ?? narrative.description
  const institutionField = payload.narrative_institution ?? narrative.institution

  return {
    sessionLanguage,
    languageBadge,
    title: pickLocalized(titleField, sessionLanguage),
    summary: pickLocalized(summaryField, sessionLanguage),
    description: pickLocalized(descriptionField, sessionLanguage),
    institution: pickLocalized(institutionField, sessionLanguage),
    category,
    labels,
    location,
  }
}
