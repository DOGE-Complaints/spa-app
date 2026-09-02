import { describe, expect, it } from 'vitest'
import {
  IMPACT_ESTIMATION,
  ISSUE_STATUS,
  ISSUE_TYPE,
  PROBLEM_STATUS,
  SEVERITY,
  assertCreateIssueCommand,
  assertCreateIssueResult,
  assertIssue,
  assertIssueIntakePayload,
  isCreateIssueCommand,
  isCreateIssueResult,
  isIssue,
  isIssueIntakePayload,
  normalizeIssueTimeType,
} from '../types.js'

describe('domain types: Issue', () => {
  it('accepts valid Issue shape', () => {
    const issue = {
      id: 'DE-0001',
      type: ISSUE_TYPE.INCIDENT,
      title: 'Road lights broken',
      status: ISSUE_STATUS.NEW,
      labels: ['infrastructure'],
      description: 'No lights on two streets',
      arweave_txid: 'ar://abc123',
      image_txid: 'ar://img123',
      image_hash: 'sha256:deadbeef',
      created_at: '2026-02-09T12:00:00Z',
    }

    expect(isIssue(issue)).toBe(true)
    expect(assertIssue(issue)).toEqual(issue)
  })

  it('rejects invalid Issue type/status', () => {
    const issue = {
      id: 'DE-0001',
      type: 'invalid',
      title: 'Broken',
      status: 'INVALID',
      labels: [],
    }

    expect(isIssue(issue)).toBe(false)
    expect(() => assertIssue(issue)).toThrow('Invalid Issue')
  })

  it('accepts Issue with i18n title and description', () => {
    const issue = {
      id: 'DE-042',
      type: ISSUE_TYPE.INCIDENT,
      title: { et: 'Silla remondi viivitus', ru: 'Задержка ремонта моста', en: 'Bridge repair delay' },
      description: { et: 'Objektil puudub liikumine.', ru: 'На объекте нет движения.', en: 'No activity on site.' },
      status: ISSUE_STATUS.NEW,
      labels: ['waste', 'infrastructure'],
    }

    expect(isIssue(issue)).toBe(true)
    expect(assertIssue(issue)).toEqual(issue)
  })

  it('accepts Issue with optional summary and institution (i18n)', () => {
    const issue = {
      id: 'DE-001',
      type: ISSUE_TYPE.INCIDENT,
      title: { et: 'Pensionide indekseerimine', ru: 'Пенсионная индексация', en: 'Pension indexation' },
      summary: { et: 'Pension tõusis, kuid kulud tõusid.', ru: 'Пенсия выросла, но расходы выросли.', en: 'Pension increased but costs rose.' },
      description: { et: 'Pikk tekst.', ru: 'Полный текст.', en: 'Full text.' },
      institution: { et: 'Sotsiaalkindlustusamet', ru: 'Sotsiaalkindlustusamet', en: 'Social Insurance Board' },
      status: ISSUE_STATUS.PUBLISHED,
      labels: ['district', 'safety'],
      created_at: '2025-01-15T10:00:00Z',
    }

    expect(isIssue(issue)).toBe(true)
    expect(assertIssue(issue)).toEqual(issue)
  })

  it('accepts optional original_locale from backend projection', () => {
    const issue = {
      id: 'DE-002',
      type: ISSUE_TYPE.INCIDENT,
      title: { en: 'Title' },
      status: ISSUE_STATUS.NEW,
      labels: ['district'],
      original_locale: ['ru'],
    }

    expect(isIssue(issue)).toBe(true)
    expect(isIssue({ ...issue, original_locale: ['xx'] })).toBe(false)
  })

  it('accepts optional schema_card + public geo (incl. detail_level)', () => {
    const issue = {
      id: 'DE-SSR-01',
      type: ISSUE_TYPE.INCIDENT,
      title: 'Schema sidecar',
      status: ISSUE_STATUS.PUBLISHED,
      labels: ['district'],
      schema_card: {
        'signals.desired_outcome': 'fix',
        'signals.affected_group': null,
        'signals.service_object': 1,
      },
      geo: {
        lat: 59.437,
        lon: 24.753,
        label: 'Tallinn',
        district: 'Kesklinn',
        detail_level: 'district',
      },
    }

    expect(isIssue(issue)).toBe(true)
    expect(assertIssue(issue)).toEqual(issue)
  })

  it('rejects invent admin_* keys on public geo', () => {
    const issue = {
      id: 'DE-SSR-bad',
      type: ISSUE_TYPE.INCIDENT,
      title: 'Bad geo',
      status: ISSUE_STATUS.NEW,
      labels: [],
      geo: { admin_district: 'Kesklinn' },
    }

    expect(isIssue(issue)).toBe(false)
  })

  it('accepts civic-only Issue without schema_card or geo', () => {
    const issue = {
      id: 'DE-CIVIC',
      type: ISSUE_TYPE.IMPROVEMENT,
      title: 'Civic only',
      status: ISSUE_STATUS.NEW,
      labels: [],
    }

    expect(isIssue(issue)).toBe(true)
  })
})

describe('domain types: IssueIntakePayload', () => {
  it('accepts valid intake payload with canonical time type', () => {
    const intake = {
      user: { first_name: 'John', last_name: 'Doe' },
      problem_categories: ['infrastructure', 'road safety'],
      description: 'Street is blocked after storm',
      location: { details: 'Tallinn center' },
      media_files: [{ type: 'image', url: 'https://example.com/photo.jpg' }],
      time: { type: 'date_range', value: { start_date: '2026-01-10', end_date: '2026-01-15' } },
      severity: SEVERITY.HIGH,
      impact_estimation: IMPACT_ESTIMATION.CITY_TOWN,
      problem_status: PROBLEM_STATUS.ONGOING,
      related_events: ['#storm', '#transport'],
      metadata: { source: 'GPT-system', tokenized: false },
    }

    expect(isIssueIntakePayload(intake)).toBe(true)
    expect(assertIssueIntakePayload(intake)).toEqual(intake)
  })

  it('accepts alias time types via normalization', () => {
    const intakeExactDate = {
      user: { first_name: 'A', last_name: 'B' },
      problem_categories: ['infrastructure'],
      description: 'Issue text',
      location: { details: 'Location text' },
      time: { type: 'exact_date', value: '2026-01-10' },
      severity: SEVERITY.MEDIUM,
      impact_estimation: IMPACT_ESTIMATION.STATE,
      problem_status: PROBLEM_STATUS.ONGOING,
    }

    const intakeApproximate = {
      user: { first_name: 'A', last_name: 'B' },
      problem_categories: ['infrastructure'],
      description: 'Issue text',
      location: { details: 'Location text' },
      time: { type: 'approximate_period', value: 'winter 2025' },
      severity: SEVERITY.MEDIUM,
      impact_estimation: IMPACT_ESTIMATION.STATE,
      problem_status: PROBLEM_STATUS.ONGOING,
    }

    expect(isIssueIntakePayload(intakeExactDate)).toBe(true)
    expect(isIssueIntakePayload(intakeApproximate)).toBe(true)
  })

  it('rejects invalid enum values', () => {
    const intake = {
      user: { first_name: 'John', last_name: 'Doe' },
      problem_categories: ['infrastructure'],
      description: 'Issue text',
      location: { details: 'Tallinn' },
      severity: 'urgent',
      impact_estimation: IMPACT_ESTIMATION.COUNTRY,
      problem_status: PROBLEM_STATUS.ONGOING,
    }

    expect(isIssueIntakePayload(intake)).toBe(false)
    expect(() => assertIssueIntakePayload(intake)).toThrow('Invalid IssueIntakePayload')
  })
})

describe('domain types: CreateIssueCommand', () => {
  it('accepts valid command', () => {
    const command = {
      title: 'Water supply delay',
      description: 'District has no water for 8 hours',
      type: ISSUE_TYPE.INCIDENT,
      labels: ['utilities', 'city'],
      image: { kind: 'url', value: 'https://example.com/image.png' },
      intake_payload: {
        user: { first_name: 'John', last_name: 'Doe' },
        problem_categories: ['infrastructure'],
        description: 'District has no water for 8 hours',
        location: { details: 'Tallinn' },
        severity: SEVERITY.HIGH,
        impact_estimation: IMPACT_ESTIMATION.CITY_TOWN,
        problem_status: PROBLEM_STATUS.ONGOING,
      },
    }

    expect(isCreateIssueCommand(command)).toBe(true)
    expect(assertCreateIssueCommand(command)).toEqual(command)
  })

  it('rejects invalid command type', () => {
    const command = {
      title: 'Water supply delay',
      type: 'invalid_type',
      labels: [],
    }

    expect(isCreateIssueCommand(command)).toBe(false)
    expect(() => assertCreateIssueCommand(command)).toThrow('Invalid CreateIssueCommand')
  })
})

describe('domain types: CreateIssueResult', () => {
  it('accepts created result', () => {
    const result = {
      issue_id: 'DE-0042',
      content_hash: 'sha256:abc123',
      duplicate: false,
      arweave_txid: 'ar://content42',
      image_txid: 'ar://image42',
      tx_hash: 'doge_tx_42',
      status: 'created',
    }

    expect(isCreateIssueResult(result)).toBe(true)
    expect(assertCreateIssueResult(result)).toEqual(result)
  })

  it('accepts duplicate result with existing_issue_id', () => {
    const result = {
      issue_id: 'DE-0018',
      content_hash: 'sha256:dup',
      duplicate: true,
      existing_issue_id: 'DE-0018',
      status: 'duplicate',
    }

    expect(isCreateIssueResult(result)).toBe(true)
    expect(assertCreateIssueResult(result)).toEqual(result)
  })

  it('rejects result without required fields', () => {
    const result = {
      issue_id: 'DE-0002',
      duplicate: false,
      status: 'created',
    }

    expect(isCreateIssueResult(result)).toBe(false)
    expect(() => assertCreateIssueResult(result)).toThrow('Invalid CreateIssueResult')
  })
})

describe('normalizeIssueTimeType', () => {
  it('normalizes exact_date to exact', () => {
    expect(normalizeIssueTimeType('exact_date')).toBe('exact')
  })

  it('normalizes approximate_period to approx_period', () => {
    expect(normalizeIssueTimeType('approximate_period')).toBe('approx_period')
  })

  it('keeps canonical value unchanged', () => {
    expect(normalizeIssueTimeType('date_range')).toBe('date_range')
  })

  it('returns null for non-string input', () => {
    expect(normalizeIssueTimeType(null)).toBe(null)
    expect(normalizeIssueTimeType(undefined)).toBe(null)
  })
})
