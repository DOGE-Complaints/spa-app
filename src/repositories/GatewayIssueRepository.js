import { assertIssueRepository } from '../domain/IssueRepository.js'

function assertBaseUrl(baseUrl) {
  if (typeof baseUrl !== 'string' || !baseUrl.trim()) {
    throw new Error('GatewayIssueRepository: VITE_GATEWAY_BASE_URL is required in GFL-DRIVEN mode')
  }
  return baseUrl.replace(/\/+$/, '')
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
  return params
}

async function readJsonOrThrow(response) {
  if (!response.ok) {
    throw new Error(`Gateway error: ${response.status}`)
  }
  return response.json()
}

export function createGatewayIssueRepository(baseUrl) {
  const normalizedBaseUrl = assertBaseUrl(baseUrl)

  const repository = {
    async getIssues(options = undefined) {
      const params = buildIssuesQuery(options)
      const query = params.toString()
      const url = `${normalizedBaseUrl}/tallinn/issues${query ? `?${query}` : ''}`
      const response = await fetch(url)
      const envelope = await readJsonOrThrow(response)
      return envelope?.data?.issues ?? []
    },

    async getIssue(id) {
      const safeId = encodeURIComponent(String(id))
      const url = `${normalizedBaseUrl}/tallinn/issues/${safeId}`
      const response = await fetch(url)
      if (response.status === 404) {
        return null
      }
      const envelope = await readJsonOrThrow(response)
      return envelope?.data?.issue ?? null
    },
  }

  return assertIssueRepository(repository)
}
