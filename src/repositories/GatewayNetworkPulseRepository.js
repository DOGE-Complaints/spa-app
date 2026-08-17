function assertBaseUrl(baseUrl) {
  const trimmed = typeof baseUrl === 'string' ? baseUrl.trim() : ''
  if (!trimmed) {
    throw new Error('GatewayNetworkPulseRepository: VITE_GATEWAY_BASE_URL is required in GFL-DRIVEN mode')
  }
  return trimmed.replace(/\/+$/, '')
}

async function readJsonOrThrow(response) {
  if (!response.ok) {
    throw new Error(`Gateway error: ${response.status}`)
  }
  return response.json()
}

/**
 * Public Pulse L1 client — GET /tallinn/network-pulse (REQ-49). No invented path.
 */
export function createGatewayNetworkPulseRepository(baseUrl) {
  const normalizedBaseUrl = assertBaseUrl(baseUrl)

  return {
    async getNetworkPulse() {
      const url = `${normalizedBaseUrl}/tallinn/network-pulse`
      const response = await fetch(url)
      const envelope = await readJsonOrThrow(response)
      return envelope?.data ?? null
    },
  }
}
