/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, afterEach } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { CABINET_DICTIONARY_EN } from '../../../i18n/cabinetDictionary.js'
import { IDENTITY_DICTIONARY_EN } from '../../../i18n/identityDictionary.js'
import { StoryActivityCard } from '../StoryActivityCard.jsx'
import { STORY_ACTIVITY_STATES } from '../storyActivityState.js'

afterEach(cleanup)

function renderCard(props = {}) {
  return render(
    <MemoryRouter>
      <I18nProvider>
        <StoryActivityCard {...props} />
      </I18nProvider>
    </MemoryRouter>,
  )
}

describe('StoryActivityCard', () => {
  it('renders five runtime states A–E', () => {
    const states = [
      STORY_ACTIVITY_STATES.ACTIVE,
      STORY_ACTIVITY_STATES.EMPTY,
      STORY_ACTIVITY_STATES.DRAFT,
      STORY_ACTIVITY_STATES.VERIFY_REQUIRED,
      STORY_ACTIVITY_STATES.UNAVAILABLE,
    ]
    for (const state of states) {
      cleanup()
      renderCard({ state })
      expect(screen.getByTestId('story-activity-card').getAttribute('data-story-activity-state')).toBe(
        state,
      )
    }
  })

  it('empty state primary is Go to Board, not Submit', () => {
    const onGoToBoard = vi.fn()
    renderCard({ state: STORY_ACTIVITY_STATES.EMPTY, onGoToBoard })
    const cta = screen.getByTestId('story-activity-go-to-board')
    expect(cta.textContent).toBe(IDENTITY_DICTIONARY_EN.storyHandoff.cta.goToBoard)
    expect(cta.textContent).not.toMatch(/Submit/i)
    fireEvent.click(cta)
    expect(onGoToBoard).toHaveBeenCalledTimes(1)
  })

  it('resume draft and retry show comingSoon (no navigation)', () => {
    renderCard({ state: STORY_ACTIVITY_STATES.DRAFT })
    fireEvent.click(screen.getByTestId('story-activity-resume-draft'))
    expect(screen.getByTestId('story-activity-coming-soon').textContent).toBe(
      CABINET_DICTIONARY_EN.cabinet.common.comingSoon,
    )
    cleanup()
    renderCard({ state: STORY_ACTIVITY_STATES.UNAVAILABLE })
    fireEvent.click(screen.getByTestId('story-activity-retry'))
    expect(screen.getByTestId('story-activity-coming-soon').textContent).toBe(
      CABINET_DICTIONARY_EN.cabinet.common.comingSoon,
    )
  })

  it('verify CTA calls onVerify', () => {
    const onVerify = vi.fn()
    renderCard({ state: STORY_ACTIVITY_STATES.VERIFY_REQUIRED, onVerify })
    fireEvent.click(screen.getByTestId('story-activity-verify'))
    expect(onVerify).toHaveBeenCalledTimes(1)
    expect(screen.getByTestId('story-activity-verify').textContent).toBe(
      IDENTITY_DICTIONARY_EN.civic.unverified.cta,
    )
  })

  it('active history shows metadata only (privacy)', () => {
    renderCard({ state: STORY_ACTIVITY_STATES.ACTIVE })
    const text = screen.getByTestId('story-activity-card').textContent
    expect(text).toContain('DE-ST-2041')
    expect(text).toContain(CABINET_DICTIONARY_EN.cabinet.story.status.published)
    expect(text).not.toMatch(/moderation/i)
    expect(text).not.toMatch(/\+372/)
    expect(text).not.toMatch(/0x[a-fA-F0-9]{8}/)
    expect(text).not.toMatch(/full story|story body|wallet address/i)
  })

  it('source has no gateway fetch to story-activity endpoints', async () => {
    const { readFile } = await import('node:fs/promises')
    const { fileURLToPath } = await import('node:url')
    const path = await import('node:path')
    const filePath = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      '../StoryActivityCard.jsx',
    )
    const src = await readFile(filePath, 'utf8')
    expect(src).not.toMatch(/\bfetch\s*\(/)
    expect(src).not.toMatch(/\/story-activity|\/story-drafts/)
  })

  it('wires catalog icon paths on header', () => {
    renderCard({ state: STORY_ACTIVITY_STATES.EMPTY })
    const icon = screen.getByTestId('story-activity-header-icon')
    expect(icon.getAttribute('src')).toBe('/icons/user-cabinet/ic-story-empty.png')
  })
})
