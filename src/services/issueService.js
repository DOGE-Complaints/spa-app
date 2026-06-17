import { assertIssueRepository } from '../domain/IssueRepository.js'
import { createInMemoryIssueRepository } from '../repositories/InMemoryIssueRepository.js'
import { createGatewayIssueRepository } from '../repositories/GatewayIssueRepository.js'
import { ROUTING_DEMO_ISSUES } from '../router/mockIssues.js'

/**
 * @typedef {Object} IssueService
 * @property {(options?: unknown) => Promise<import('../domain/types.js').Issue[]>} getIssues
 * @property {(id: string) => Promise<import('../domain/types.js').Issue | null>} getIssue
 */

/**
 * @param {import('../domain/IssueRepository.js').IssueRepository} repository
 * @returns {IssueService}
 */
export function createIssueService(repository) {
  const resolvedRepository = assertIssueRepository(repository)

  return {
    async getIssues(options = undefined) {
      return resolvedRepository.getIssues(options)
    },

    async getIssue(id) {
      return resolvedRepository.getIssue(id)
    },
  }
}

const REALITY_MODE = import.meta.env.VITE_LIFE_REALITY_MODE ?? 'FAKE-OLD'
const GATEWAY_BASE_URL = import.meta.env.VITE_GATEWAY_BASE_URL ?? ''

export function resolveIssueRepositoryForMode(mode, gatewayBaseUrl = '') {
  if (mode === 'GFL-DRIVEN') {
    return createGatewayIssueRepository(gatewayBaseUrl)
  }
  return createInMemoryIssueRepository([...ROUTING_DEMO_ISSUES])
}

export function resolveIssueRepository() {
  return resolveIssueRepositoryForMode(REALITY_MODE, GATEWAY_BASE_URL)
}

export const issueService = createIssueService(resolveIssueRepository())
