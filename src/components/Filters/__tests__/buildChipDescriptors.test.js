import { describe, expect, it } from 'vitest'
import { buildChipDescriptors } from '../buildChipDescriptors.js'
import { createBoardFilterState } from '../../../router/boardFilterState.js'

const t = (key) => {
  const map = {
    filterStatus: 'Status',
    filterType: 'Type',
    filterLabels: 'Labels',
    searchPlaceholder: 'Search issues…',
    clear: 'Clear',
    'status.NEW': 'NEW',
    'status.PUBLISHED': 'PUBLISHED',
    'issueType.INCIDENT': 'Incident',
    'labels.infrastructure': 'Infrastructure',
  }
  return map[key] ?? key
}

describe('buildChipDescriptors', () => {
  it('creates one chip per status value and label', () => {
    const chips = buildChipDescriptors(
      createBoardFilterState({
        status: ['NEW', 'PUBLISHED'],
        type: '',
        labels: [],
        search: '',
      }),
      t,
      'en',
    )

    expect(chips).toHaveLength(2)
    expect(chips[0]).toMatchObject({ field: 'status', value: 'NEW', label: 'Status: NEW' })
    expect(chips[1]).toMatchObject({ field: 'status', value: 'PUBLISHED' })
  })

  it('creates single type chip when type is set', () => {
    const chips = buildChipDescriptors(
      createBoardFilterState({ status: [], type: 'INCIDENT', labels: [], search: '' }),
      t,
      'en',
    )

    expect(chips).toHaveLength(1)
    expect(chips[0]).toMatchObject({ field: 'type', value: 'INCIDENT', label: 'Type: Incident' })
  })

  it('includes search chip when search is active', () => {
    const chips = buildChipDescriptors(
      createBoardFilterState({ status: [], type: '', labels: [], search: 'road' }),
      t,
      'en',
    )

    expect(chips[0]).toMatchObject({ field: 'search', value: 'road' })
  })
})
