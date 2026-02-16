import { ISSUE_STATUS, ISSUE_TYPE } from '../domain/types.js'

/**
 * Точные моки по модели Issue для финальной внешней фазы (InMemoryIssueRepository).
 * Optional поля: created_at — один issue с датой; arweave_txid/image_txid/image_hash — отсутствуют (не подставляем фиктивные).
 */
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
    created_at: '2025-02-01T12:00:00Z',
  },
  {
    id: 'DE-001',
    status: ISSUE_STATUS.VERIFIED,
    type: ISSUE_TYPE.OBSERVATION,
    labels: ['healthcare'],
    title: {
      et: 'Tervishoiuteenuse kvaliteet',
      ru: 'Качество медицинских услуг',
      en: 'Healthcare service quality',
    },
    description: {
      et: 'Vaatlused haigla tingimuste kohta.',
      ru: 'Наблюдения по условиям в больнице.',
      en: 'Observations on hospital conditions.',
    },
  },
])

export function findDemoIssueById(id) {
  return ROUTING_DEMO_ISSUES.find((item) => item.id === id) ?? null
}
