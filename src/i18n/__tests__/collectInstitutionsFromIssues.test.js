import { describe, expect, it } from 'vitest'
import {
  collectInstitutionsFromIssues,
  institutionFilterValue,
} from '../collectInstitutionsFromIssues.js'

describe('collectInstitutionsFromIssues', () => {
  it('returns unique sorted canonical institution values', () => {
    const result = collectInstitutionsFromIssues([
      { institution: { et: 'Haigekassa', ru: 'Haigekassa', en: 'Health Insurance Fund' } },
      { institution: { et: 'Haigekassa', ru: 'Haigekassa', en: 'Health Insurance Fund' } },
      { institution: { et: 'Riigikantselei', ru: 'Riigikantselei', en: 'Government Office' } },
    ])

    expect(result).toEqual(['Haigekassa', 'Riigikantselei'])
  })

  it('supports legacy scalar institution', () => {
    expect(institutionFilterValue(' Local government ')).toBe('Local government')
  })

  it('ignores empty issues', () => {
    const result = collectInstitutionsFromIssues([null, {}, { institution: null }])
    expect(result).toEqual([])
  })
})
