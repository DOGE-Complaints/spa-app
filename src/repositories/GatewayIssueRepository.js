import { assertIssueRepository } from '../domain/IssueRepository.js'
import { GEO_ADMIN_FILTER_KEYS } from '../i18n/geoAdminFilterKeys.js'
import { normalizePublicBaseUrl } from '../config/publicEnv.js'
import {
  normalizeCreatedAfterParam,
  normalizeCreatedBeforeParam,
} from './issueReadFilters.js'

function assertBaseUrl(baseUrl) {
  const trimmed = normalizePublicBaseUrl(baseUrl)
  if (!trimmed) {
    throw new Error('GatewayIssueRepository: VITE_GATEWAY_BASE_URL is required in GFL-DRIVEN mode')
  }
  return trimmed
}

function appendArrayParams(params, key, values) {
  if (!Array.isArray(values) || values.length === 0) return
  values.forEach((value) => {
    if (typeof value === 'string' && value.trim()) {
      params.append(key, value)
    }
  })
}

function buildIssuesQuery(options = undefined) {
  const params = new URLSearchParams()
  if (!options || typeof options !== 'object') return params

  if (Array.isArray(options.status) && options.status.length > 0) {
    appendArrayParams(params, 'status', options.status)
  } else if (typeof options.status === 'string' && options.status.trim()) {
    params.append('status', options.status)
  }

  if (typeof options.type === 'string' && options.type.trim()) {
    params.set('type', options.type)
  }

  appendArrayParams(params, 'labels', options.labels)

  if (typeof options.institution === 'string' && options.institution.trim()) {
    params.set('institution', options.institution.trim())
  }

  if (typeof options.created_after === 'string' && options.created_after.trim()) {
    const normalized = normalizeCreatedAfterParam(options.created_after)
    if (normalized) params.set('created_after', normalized)
  }

  if (typeof options.created_before === 'string' && options.created_before.trim()) {
    const normalized = normalizeCreatedBeforeParam(options.created_before)
    if (normalized) params.set('created_before', normalized)
  }

  for (const key of GEO_ADMIN_FILTER_KEYS) {
    appendArrayParams(params, key, options[key])
  }

  return params
}

async function readJsonOrThrow(response) {
  if (!response.ok) {
    throw new Error(`Gateway error: ${response.status}`)
  }
  return response.json()
}

/**
 * Return gateway Issue objects verbatim from the public envelope.
 * MUST preserve optional sidecars `schema_card` and `geo` when present.
 * MUST NOT remap to `admin_*`, fetch `structured_payload`, or load pack.json.
 * @param {unknown} issue
 * @returns {unknown}
 */
function passThroughPublicIssue(issue) {
  return issue
}

export function createGatewayIssueRepository(baseUrl) {
  const normalizedBaseUrl = assertBaseUrl(baseUrl)

  const repository = {
    async getIssues(options = undefined) {
      const params = buildIssuesQuery(options)
      const query = params.toString()
      const url = `${normalizedBaseUrl}/node/issues${query ? `?${query}` : ''}`
      const response = await fetch(url)
      const envelope = await readJsonOrThrow(response)
      const issues = envelope?.data?.issues
      if (!Array.isArray(issues)) return []
      return issues.map(passThroughPublicIssue)
    },

    async getIssue(id) {
      const safeId = encodeURIComponent(String(id))
      const url = `${normalizedBaseUrl}/node/issues/${safeId}`
      const response = await fetch(url)
      if (response.status === 404) {
        return null
      }
      const envelope = await readJsonOrThrow(response)
      const issue = envelope?.data?.issue
      if (issue == null) return null
      return passThroughPublicIssue(issue)
    },
  }

  return assertIssueRepository(repository)
}
