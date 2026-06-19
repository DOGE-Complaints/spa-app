import { describe, expect, it } from 'vitest'
import { buildChipDescriptors } from '../buildChipDescriptors.js'
import { createBoardFilterState } from '../../../router/boardFilterState.js'

const t = (key) => {
  const map = {
    filterStatus: 'Status',
    filterType: 'Type',
    filterLabels: 'Labels',
    filterInstitution: 'Institution',
    filterDateFrom: 'From',
    filterDateTo: 'To',
    filterGeoDistrict: 'District',
    filterGeoCountry: 'Country',
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

  it('includes institution and date chips', () => {
    const chips = buildChipDescriptors(
      createBoardFilterState({
        status: [],
        type: '',
        labels: [],
        search: '',
        institution: 'Haigekassa',
        created_after: '2025-01-01',
        created_before: '2025-02-01',
      }),
      t,
      'en',
      (value) => `Inst:${value}`,
    )

    expect(chips).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'institution', value: 'Haigekassa', label: 'Institution: Inst:Haigekassa' }),
        expect.objectContaining({ field: 'created_after', value: '2025-01-01' }),
        expect.objectContaining({ field: 'created_before', value: '2025-02-01' }),
      ]),
    )
  })

  it('includes geo admin chips per selected value', () => {
    const chips = buildChipDescriptors(
      createBoardFilterState({
        status: [],
        type: '',
        labels: [],
        search: '',
        geo_district: ['Kesklinn'],
        geo_country: ['Eesti'],
      }),
      t,
      'en',
    )

    expect(chips).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'geo_district', value: 'Kesklinn', label: 'District: Kesklinn' }),
        expect.objectContaining({ field: 'geo_country', value: 'Eesti', label: 'Country: Eesti' }),
      ]),
    )
  })
})
