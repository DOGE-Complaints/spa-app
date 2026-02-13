import { assertIssueRepository } from '../domain/IssueRepository.js'
import { createInMemoryIssueRepository } from '../repositories/InMemoryIssueRepository.js'

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

export const issueService = createIssueService(createInMemoryIssueRepository())
