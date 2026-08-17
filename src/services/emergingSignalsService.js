import { createGatewayEmergingSignalsRepository } from '../repositories/GatewayEmergingSignalsRepository.js'
import { bindEmergingSignals } from '../domain/bindEmergingSignals.js'

const REALITY_MODE = import.meta.env.VITE_LIFE_REALITY_MODE ?? 'FAKE-OLD'
const GATEWAY_BASE_URL = import.meta.env.VITE_GATEWAY_BASE_URL ?? ''

export function resolveEmergingSignalsRepositoryForMode(mode, gatewayBaseUrl = '') {
  const url = typeof gatewayBaseUrl === 'string' ? gatewayBaseUrl.trim() : ''
  if (mode === 'GFL-DRIVEN' && url) {
    return createGatewayEmergingSignalsRepository(url)
  }
  return null
}

export function createEmergingSignalsService(repository) {
  return {
    async getEmergingSignals() {
      if (!repository || typeof repository.getEmergingSignals !== 'function') {
        return { status: 'empty', cards: [] }
      }
      try {
        const data = await repository.getEmergingSignals()
        const cards = bindEmergingSignals(data)
        if (cards.length === 0) {
          return { status: 'empty', cards: [] }
        }
        return { status: 'cards', cards }
      } catch {
        return { status: 'empty', cards: [] }
      }
    },
  }
}

export function resolveEmergingSignalsRepository() {
  return resolveEmergingSignalsRepositoryForMode(REALITY_MODE, GATEWAY_BASE_URL)
}

const defaultService = createEmergingSignalsService(resolveEmergingSignalsRepository())

export function getEmergingSignals() {
  return defaultService.getEmergingSignals()
}
