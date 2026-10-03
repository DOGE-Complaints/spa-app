/**
 * @vitest-environment jsdom
 * SPA-PH-12 — List discussion-priority after SEARCH filter.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { BoardPage } from '../BoardPage.jsx'
import { I18nProvider } from '../../i18n/I18nProvider.jsx'
import { LOCALE_STORAGE_KEY } from '../../i18n/core.js'
import { ISSUE_STATUS, ISSUE_TYPE } from '../../domain/types.js'
import { issueService } from '../../services/issueService.js'
import { clearDiscussionFlagSessionCache } from '../../board/prefetchDiscussionFlags.js'

vi.mock('../../services/issueService.js', () => ({
  issueService: {
    getIssues: vi.fn(),
    getIssue: vi.fn(),
  },
}))

vi.mock('../../services/networkPulseService.js', () => ({
  getNetworkPulse: vi.fn().mockResolvedValue({ status: 'omit', slots: [] }),
}))

vi.mock('../../services/emergingSignalsService.js', () => ({
  getEmergingSignals: vi.fn().mockResolvedValue({ status: 'empty', cards: [] }),
}))

vi.mock('../../components/threads/LiveIssueThreadMount.jsx', () => ({
  LiveIssueThreadMount: () => <div data-testid="thread-mount-stub" />,
}))

vi.mock('../../board/prefetchDiscussionFlags.js', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    prefetchDiscussionFlags: vi.fn(async (issues) => {
      const flags = new Map()
      for (const issue of issues ?? []) {
        const id = String(issue?.id ?? '')
        flags.set(id, id === 'DISCUSSED')
      }
      return flags
    }),
  }
})

function issue(id, titleEn) {
  return {
    id,
    status: ISSUE_STATUS.PUBLISHED,
    type: ISSUE_TYPE.IMPROVEMENT,
    labels: ['waste'],
    title: { en: titleEn, et: titleEn, ru: titleEn },
    summary: { en: titleEn, et: titleEn, ru: titleEn },
    created_at: '2026-08-01T00:00:00Z',
  }
}

function renderBoard(pathName = '/board') {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={[pathName]}>
        <BoardPage />
      </MemoryRouter>
    </I18nProvider>,
  )
}

function feedIssueIds() {
  const feed = screen.getByTestId('board-feed')
  return [...feed.querySelectorAll('.issue-card-id')].map((el) => el.textContent)
}

afterEach(() => {
  cleanup()
  clearDiscussionFlagSessionCache()
})

describe('BoardPage PH-12 discussion priority', () => {
  beforeEach(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
    clearDiscussionFlagSessionCache()
    issueService.getIssues.mockReset()
  })

  it('orders List discussion-first after gateway order (AC-PH-12-01/02)', async () => {
    issueService.getIssues.mockResolvedValue([
      issue('SILENT', 'Silent road'),
      issue('DISCUSSED', 'Discussed waste'),
      issue('OTHER', 'Other park'),
    ])
    renderBoard('/board')

    await waitFor(() => {
      expect(screen.getByTestId('board-feed').getAttribute('data-discussion-sort')).toBe('ready')
      expect(feedIssueIds()).toEqual(['DISCUSSED', 'SILENT', 'OTHER'])
    })

    expect(screen.queryByText(/с обсуждением|with discussion/i)).toBeNull()
  })

  it('keeps discussion priority among SEARCH-filtered visible set (AC-PH-12-03)', async () => {
    issueService.getIssues.mockResolvedValue([
      issue('SILENT', 'Silent alpha'),
      issue('DISCUSSED', 'Discussed alpha'),
      issue('NOISE', 'Unrelated beta'),
    ])
    renderBoard('/board?search=alpha')

    await waitFor(() => {
      expect(screen.getByTestId('board-feed').getAttribute('data-discussion-sort')).toBe('ready')
      expect(feedIssueIds()).toEqual(['DISCUSSED', 'SILENT'])
    })

    expect(screen.queryByText('Unrelated beta')).toBeNull()
  })

  it('PH-04 load-error unchanged when trees would fail (AC-PH-12-04)', async () => {
    issueService.getIssues.mockRejectedValue(new Error('Gateway error: 500'))
    renderBoard('/board')

    await waitFor(() => {
      expect(screen.getByTestId('board-load-error')).toBeTruthy()
    })
    expect(screen.queryByTestId('board-continuum')).toBeNull()
  })

  it('PH-04 filtered-empty unchanged (AC-PH-12-04)', async () => {
    issueService.getIssues.mockResolvedValue([issue('SILENT', 'Silent road')])
    renderBoard('/board?search=zzzz-no-match')

    await waitFor(() => {
      expect(screen.getByTestId('board-filtered-empty')).toBeTruthy()
    })
  })
})
