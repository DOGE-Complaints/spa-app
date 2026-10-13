/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedLabPage } from '../../../pages/FeedLabPage.jsx'
import { FeedReactionPlane } from '../post/reactions/index.js'
import { LAB_FEED_FIXTURES } from '../fixtures/index.js'

const dir = path.dirname(fileURLToPath(import.meta.url))
const reactionsRoot = path.resolve(dir, '../post/reactions')
const postRoot = path.resolve(dir, '../post')

const BAN_RE =
  /^\s*import\s+.*\b(LabReactionChromeDeprecated|ReactionChrome|BoardIssuePost|FeedCivicPost)\b|^\s*import\s+.*ReactionControls\.css|^\s*import\s+.*Deprecated/

function collectJsFiles(root) {
  const out = []
  for (const name of readdirSync(root, { withFileTypes: true })) {
    const p = path.join(root, name.name)
    if (name.isDirectory()) {
      if (name.name === 'node_modules' || name.name === '__tests__') continue
      out.push(...collectJsFiles(p))
    } else if (/\.(jsx?|css)$/.test(name.name)) {
      out.push(p)
    }
  }
  return out
}

function renderLab() {
  return render(
    <I18nProvider>
      <MemoryRouter initialEntries={['/lab/feed']}>
        <Routes>
          <Route path="/lab/feed" element={<FeedLabPage />} />
        </Routes>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('FeedLab greenfield NF-LAB-08 reactions', () => {
  afterEach(() => cleanup())

  it('scaffolds reaction modules under feed-lab/post/reactions/', () => {
    expect(existsSync(path.join(reactionsRoot, 'FeedReactionPlane.jsx'))).toBe(true)
    expect(existsSync(path.join(reactionsRoot, 'FeedReactionPicker.jsx'))).toBe(true)
    expect(existsSync(path.join(reactionsRoot, 'FeedReactionAggregate.jsx'))).toBe(true)
    expect(existsSync(path.join(reactionsRoot, 'FeedReactionOption.jsx'))).toBe(true)
    expect(existsSync(path.join(reactionsRoot, 'FeedReactionLayerGroup.jsx'))).toBe(true)
    expect(existsSync(path.join(reactionsRoot, 'index.js'))).toBe(true)
    expect(typeof FeedReactionPlane).toBe('function')
  })

  it('bans Deprecated / ReactionChrome / Controls.css / classic class names on reactions path', () => {
    for (const file of collectJsFiles(reactionsRoot)) {
      const src = readFileSync(file, 'utf8')
      expect(src.split(/\n/).some((l) => BAN_RE.test(l)), file).toBe(false)
      expect(src.includes('ReactionControls.css'), file).toBe(false)
      expect(src.includes('reaction-choice'), file).toBe(false)
      expect(src.includes('reaction-open-button'), file).toBe(false)
      // no emoji soup invent on Done path
      expect(src.includes('omit-emoji-catalog'), file).toBe(false)
      expect(/[\u{1F300}-\u{1FAFF}]/u.test(src), `emoji in ${file}`).toBe(false)
    }
    // greenfield post Done path: no Controls stylesheet import lines
    for (const file of collectJsFiles(postRoot)) {
      const src = readFileSync(file, 'utf8')
      expect(
        src.split(/\n/).some((l) => /^\s*import\s+.*ReactionControls\.css/.test(l)),
        file,
      ).toBe(false)
    }
  })

  it('opens picker from strip React zone · no Moderation · no second React pill', () => {
    renderLab()
    expect(screen.getByTestId('feed-lab-page').getAttribute('data-lab-visual-done')).toBe('false')
    const card = screen.getByTestId(`feed-post-card-${LAB_FEED_FIXTURES[0].publicId}`)
    expect(card.getAttribute('data-lab-reactions')).toBe('m154')
    const strip = within(card).getByTestId('feed-post-action-strip')
    expect(strip.querySelectorAll('[data-zone="react"]')).toHaveLength(1)
    expect(within(card).queryAllByTestId('feed-reaction-picker')).toHaveLength(0)

    fireEvent.click(within(card).getByTestId('feed-post-action-react'))
    const picker = within(card).getByTestId('feed-reaction-picker')
    expect(picker).toBeTruthy()
    expect(within(card).getByTestId('feed-reaction-layer-emotional')).toBeTruthy()
    expect(within(card).getByTestId('feed-reaction-layer-epistemic')).toBeTruthy()
    expect(within(card).queryByTestId('feed-reaction-layer-moderation')).toBeNull()
    expect(within(card).getByTestId('feed-reaction-plane').getAttribute('data-lab-moderation')).toBe(
      'absent',
    )

    fireEvent.click(within(picker).getByTestId('feed-reaction-option-agree'))
    expect(within(card).getByTestId('feed-reaction-aggregate-mark-agree')).toBeTruthy()
    expect(within(card).getByTestId('feed-reaction-aggregate-count').textContent).toBe('1')

    // exclusivity
    fireEvent.click(within(picker).getByTestId('feed-reaction-option-disagree'))
    expect(within(card).queryByTestId('feed-reaction-aggregate-mark-agree')).toBeNull()
    expect(within(card).getByTestId('feed-reaction-aggregate-mark-disagree')).toBeTruthy()
  })

  it('keeps #/lab visual Done false (Partial = BLOCK until OP eye)', () => {
    renderLab()
    expect(screen.getByTestId('feed-lab-page').getAttribute('data-lab-visual-done')).toBe('false')
    expect(screen.getAllByTestId('feed-reaction-plane')).toHaveLength(5)
  })
})
