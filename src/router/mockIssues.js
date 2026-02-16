import { ISSUE_STATUS, ISSUE_TYPE } from '../domain/types.js'

export const ROUTING_DEMO_ISSUES = Object.freeze([
  {
    id: 'DE-042',
    status: ISSUE_STATUS.NEW,
    type: ISSUE_TYPE.COMPLAINT,
    labels: ['bureaucracy', 'infrastructure'],
    title: {
      et: 'Silla remondi viivitus',
      ru: 'Задержка ремонта моста',
      en: 'Bridge repair delay',
    },
    description: {
      et: 'Objektil puudub liikumine juba teist nädalat.',
      ru: 'На объекте нет движения уже вторую неделю.',
      en: 'No activity on site for the second week.',
    },
  },
])

export function findDemoIssueById(id) {
  return ROUTING_DEMO_ISSUES.find((item) => item.id === id) ?? null
}
