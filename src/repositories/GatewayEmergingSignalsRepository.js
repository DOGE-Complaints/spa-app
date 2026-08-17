function assertBaseUrl(baseUrl) {
  const trimmed = typeof baseUrl === 'string' ? baseUrl.trim() : ''
  if (!trimmed) {
    throw new Error('GatewayEmergingSignalsRepository: VITE_GATEWAY_BASE_URL is required in GFL-DRIVEN mode')
  }
  return trimmed.replace(/\/+$/, '')
}

export function clampEmergingTopN(topN) {
  const numeric = Number(topN)
  if (!Number.isFinite(numeric)) return 10
  return Math.min(50, Math.max(1, Math.floor(numeric)))
}

async function readJsonOrThrow(response) {
  if (!response.ok) {
    throw new Error(`Gateway error: ${response.status}`)
  }
  return response.json()
}

/**
 * Public Emerging L2 client — GET /tallinn/emerging-signals (REQ-50). No invented path.
 * Default top_n=10, clamp [1,50]. Do not reuse GET /tallinn/issues.
 */
export function createGatewayEmergingSignalsRepository(baseUrl) {
  const normalizedBaseUrl = assertBaseUrl(baseUrl)

  return {
    async getEmergingSignals({ topN = 10 } = {}) {
      const clamped = clampEmergingTopN(topN)
      const url = `${normalizedBaseUrl}/tallinn/emerging-signals?top_n=${clamped}`
      const response = await fetch(url)
      const envelope = await readJsonOrThrow(response)
      return envelope?.data ?? null
    },
  }
}
