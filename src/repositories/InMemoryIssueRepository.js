import { assertIssueRepository } from '../domain/IssueRepository.js'
import { assertIssue } from '../domain/types.js'

function normalizeSeed(issues) {
  if (!Array.isArray(issues)) return []
  return issues.map((issue) => assertIssue(issue))
}

function applyReadFilters(items, options) {
  if (!options || typeof options !== 'object') return items

  let result = items

  if (Array.isArray(options.status) && options.status.length > 0) {
    const statusSet = new Set(options.status)
    result = result.filter((item) => statusSet.has(item.status))
  } else if (typeof options.status === 'string') {
    result = result.filter((item) => item.status === options.status)
  }

  if (typeof options.type === 'string') {
    result = result.filter((item) => item.type === options.type)
  }

  if (Array.isArray(options.labels) && options.labels.length > 0) {
    result = result.filter((item) =>
      options.labels.some((label) => item.labels && item.labels.includes(label)),
    )
  }

  return result
}

export function createInMemoryIssueRepository(seedIssues = []) {
  const issues = normalizeSeed(seedIssues)

  const repository = {
    async getIssues(options = undefined) {
      const filtered = applyReadFilters(issues, options)
      return filtered.map((item) => ({ ...item, labels: [...item.labels] }))
    },

    async getIssue(id) {
      const found = issues.find((item) => item.id === id)
      if (!found) return null
      return { ...found, labels: [...found.labels] }
    },
  }

  return assertIssueRepository(repository)
}
