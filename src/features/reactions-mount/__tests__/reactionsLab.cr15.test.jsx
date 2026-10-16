/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { ReactionsLabCanvas } from '../lab/ReactionsLabCanvas.jsx'

const dir = path.dirname(fileURLToPath(import.meta.url))

function renderLab() {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={['/lab/reactions']}>
        <Routes>
          <Route path="/lab/reactions" element={<ReactionsLabCanvas />} />
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('CR-15 lab reactions M154 composition wire', () => {
  afterEach(() => cleanup())

  it('canvas marks CR-15 wire · stress · FixtureAdapter default', () => {
    renderLab()
    const canvas = screen.getByTestId('reactions-lab-canvas')
    expect(canvas.getAttribute('data-lab-cr15-wire')).toBe('true')
    expect(canvas.getAttribute('data-lab-stress')).toBe('m160')
    expect(canvas.getAttribute('data-rm-adapter-default')).toBe('fixture')
    expect(canvas.getAttribute('data-lab-visual-done')).toBe('false')
    expect(canvas.getAttribute('data-m155-oos')).toBe('true')
    expect(screen.getByTestId('rm-lab-stress-controls')).toBeTruthy()
  })

  it('composition stand: 4-zone strip · React-always · aggregate below', () => {
    renderLab()
    const stand = screen.getByTestId('rm-lab-cr15-composition')
    expect(stand.getAttribute('data-lab-cr15-wire')).toBe('true')
    expect(stand.getAttribute('data-lab-aggregate')).toBe('below')
    const strip = within(stand).getByTestId('feed-post-action-strip')
    expect(strip.getAttribute('data-lab-strip-zones')).toBe('4')
    expect(within(stand).getByTestId('reaction-summary-react')).toBeTruthy()
    const host = within(stand).getByTestId('rm-lab-cr15-composition-aggregate-host')
    const row = within(stand).getByTestId('reaction-aggregate-row')
    expect(host.contains(row)).toBe(true)
    expect(
      within(stand)
        .getByTestId('feed-post-action-react')
        .querySelector('[data-testid="reaction-aggregate-row"]'),
    ).toBeNull()
  })

  it('picker stand: tiles open · accents data-reaction-id Present', () => {
    renderLab()
    const stand = screen.getByTestId('rm-lab-cr15-picker')
    expect(stand.getAttribute('data-lab-picker-default-open')).toBe('true')
    // Legacy M154 scenes may also defaultOpen — assert via all matching options.
    const supports = screen.getAllByTestId('rm-picker-option-support')
    expect(supports.length).toBeGreaterThanOrEqual(1)
    expect(supports.every((el) => el.getAttribute('data-reaction-id') === 'support')).toBe(true)
    expect(screen.getAllByTestId('rm-reaction-picker').length).toBeGreaterThanOrEqual(1)
  })

  it('stress theme toggle still drives data-lab-theme', () => {
    renderLab()
    const canvas = screen.getByTestId('reactions-lab-canvas')
    expect(canvas.getAttribute('data-lab-theme')).toBe('light')
    fireEvent.click(screen.getByTestId('rm-lab-theme-dark'))
    expect(canvas.getAttribute('data-lab-theme')).toBe('dark')
    fireEvent.click(screen.getByTestId('rm-lab-viewport-320'))
    expect(canvas.getAttribute('data-lab-viewport')).toBe('320')
  })

  it('source: FeedPostActionStrip import · no invent next/feed', () => {
    const src = readFileSync(path.resolve(dir, '../lab/ReactionsLabCanvas.jsx'), 'utf8')
    expect(src).toMatch(/FeedPostActionStrip/)
    expect(src).toMatch(/data-lab-cr15-wire/)
    expect(src).toMatch(/aggregatePlacement="below"/)
    expect(src).toMatch(/reactAlways/)
    expect(src).not.toMatch(/#\/next\/feed/)
  })
})
