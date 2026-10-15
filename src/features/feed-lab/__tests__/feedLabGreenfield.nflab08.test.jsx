/** @vitest-environment jsdom */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { FeedLabPage } from '../../../pages/FeedLabPage.jsx'
import { FeedLabReactionsMount } from '../post/reactions/index.js'
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

describe('FeedLab greenfield NF-LAB-08 reactions (CR-07 cutover)', () => {
  afterEach(() => cleanup())

  it('keeps Deprecated FeedReaction* modules on disk · live host is FeedLabReactionsMount', () => {
    expect(existsSync(path.join(reactionsRoot, 'FeedLabReactionsMount.jsx'))).toBe(true)
    expect(existsSync(path.join(reactionsRoot, 'FeedReactionPlaneDeprecated.jsx'))).toBe(true)
    expect(existsSync(path.join(reactionsRoot, 'FeedReactionPickerDeprecated.jsx'))).toBe(true)
    expect(existsSync(path.join(reactionsRoot, 'FeedReactionAggregateDeprecated.jsx'))).toBe(true)
    expect(existsSync(path.join(reactionsRoot, 'RETIRE.md'))).toBe(true)
    expect(typeof FeedLabReactionsMount).toBe('function')
    expect(existsSync(path.join(reactionsRoot, 'FeedReactionPlane.jsx'))).toBe(false)
  })

  it('bans ReactionChrome / Controls.css / classic class names on reactions + post path', () => {
    for (const file of collectJsFiles(reactionsRoot)) {
      if (file.includes('Deprecated')) continue
      const src = readFileSync(file, 'utf8')
      expect(src.split(/\n/).some((l) => BAN_RE.test(l)), file).toBe(false)
      expect(src.includes('ReactionControls.css'), file).toBe(false)
      expect(src.includes('reaction-choice'), file).toBe(false)
      expect(src.includes('reaction-open-button'), file).toBe(false)
      expect(src.includes('omit-emoji-catalog'), file).toBe(false)
      expect(/[\u{1F300}-\u{1FAFF}]/u.test(src), `emoji in ${file}`).toBe(false)
    }
    for (const file of collectJsFiles(postRoot)) {
      if (file.includes('Deprecated')) continue
      const src = readFileSync(file, 'utf8')
      expect(
        src.split(/\n/).some((l) => /^\s*import\s+.*ReactionControls\.css/.test(l)),
        file,
      ).toBe(false)
      expect(src.includes('ReactionChrome'), file).toBe(false)
    }
  })

  it('opens ReactionsMount picker from strip React zone · no Moderation on root', () => {
    renderLab()
    expect(screen.getByTestId('feed-lab-page').getAttribute('data-lab-visual-done')).toBe('false')
    const card = screen.getByTestId(`feed-post-card-${LAB_FEED_FIXTURES[0].publicId}`)
    expect(card.getAttribute('data-lab-reactions')).toBe('m154')
    expect(within(card).getByTestId('feed-lab-reactions-mount')).toBeTruthy()
    expect(within(card).getByTestId('reactions-mount')).toBeTruthy()
    expect(within(card).queryByTestId('feed-reaction-plane')).toBeNull()
    expect(within(card).queryAllByTestId('rm-reaction-picker')).toHaveLength(0)

    fireEvent.click(within(card).getByTestId('reaction-summary-react'))
    const picker = within(card).getByTestId('rm-reaction-picker')
    expect(picker).toBeTruthy()
    expect(within(card).getByTestId('rm-picker-layer-emotional')).toBeTruthy()
    expect(within(card).getByTestId('rm-picker-layer-epistemic')).toBeTruthy()
    expect(within(card).queryByTestId('rm-picker-layer-moderation')).toBeNull()
    expect(within(card).getByTestId('reactions-mount').getAttribute('data-rm-moderation')).toBe(
      'absent',
    )
  })

  it('keeps #/lab visual Done false (Partial = BLOCK until OP eye)', () => {
    renderLab()
    expect(screen.getByTestId('feed-lab-page').getAttribute('data-lab-visual-done')).toBe('false')
    expect(screen.getAllByTestId('feed-lab-reactions-mount')).toHaveLength(5)
    expect(screen.queryAllByTestId('feed-reaction-plane')).toHaveLength(0)
  })
})
