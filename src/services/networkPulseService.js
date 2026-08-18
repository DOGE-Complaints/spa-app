import { createGatewayNetworkPulseRepository } from '../repositories/GatewayNetworkPulseRepository.js'
import { bindNetworkPulse } from '../domain/bindNetworkPulse.js'
import { getVitePublicString, getVitePublicUrl } from '../config/publicEnv.js'

const REALITY_MODE = getVitePublicString('VITE_LIFE_REALITY_MODE') || 'FAKE-OLD'
const GATEWAY_BASE_URL = getVitePublicUrl('VITE_GATEWAY_BASE_URL')

export function resolveNetworkPulseRepositoryForMode(mode, gatewayBaseUrl = '') {
  const url = typeof gatewayBaseUrl === 'string' ? gatewayBaseUrl.trim() : ''
  if (mode === 'GFL-DRIVEN' && url) {
    return createGatewayNetworkPulseRepository(url)
  }
  return null
}

export function createNetworkPulseService(repository) {
  return {
    async getNetworkPulse() {
      if (!repository || typeof repository.getNetworkPulse !== 'function') {
        return { status: 'omit', slots: [] }
      }
      try {
        const data = await repository.getNetworkPulse()
        const slots = bindNetworkPulse(data)
        if (slots.length === 0) {
          return { status: 'omit', slots: [] }
        }
        return { status: 'bound', slots }
      } catch {
        return { status: 'omit', slots: [] }
      }
    },
  }
}

export function resolveNetworkPulseRepository() {
  return resolveNetworkPulseRepositoryForMode(REALITY_MODE, GATEWAY_BASE_URL)
}

const defaultService = createNetworkPulseService(resolveNetworkPulseRepository())

export function getNetworkPulse() {
  return defaultService.getNetworkPulse()
}
