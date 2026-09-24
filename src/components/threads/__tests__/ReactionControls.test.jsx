/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, afterEach } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  REACTIONS_V1_ENTRIES,
  REACTIONS_V1_IDS,
  listReactionsV1,
  toggleReactionSelection,
  isReactionsV1Id,
} from '../reactionsV1Catalog.js'
import { ReactionControls } from '../ReactionControls.jsx'
import { THREADS_FEED_DICTIONARY_EN } from '../../../i18n/threadsFeedDictionary.js'

function makeT() {
  return (key) => {
    const parts = key.split('.')
    let cur = THREADS_FEED_DICTIONARY_EN
    for (const p of parts) cur = cur?.[p]
    return typeof cur === 'string' ? cur : key
  }
}

afterEach(() => cleanup())

describe('reactions.v1 catalog', () => {
  it('filters by knobs reactions_enable without inventing ids', () => {
    const enabled = listReactionsV1({
      target: 'comment',
      reactionsEnable: { agree: true, disagree: false, hopeful: true },
    })
    const ids = enabled.map((e) => e.id)
    expect(ids).toContain('agree')
    expect(ids).toContain('hopeful')
    expect(ids).not.toContain('disagree')
    expect(ids.every((id) => isReactionsV1Id(id))).toBe(true)
  })

  it('exposes only catalog ids — no like/love invent', () => {
    expect(REACTIONS_V1_IDS).toEqual([
      'acknowledge',
      'support',
      'empathy',
      'concern',
      'hopeful',
      'sad',
      'outraged_situation',
      'amused',
      'agree',
      'disagree',
      'useful_fact',
      'insightful',
      'needs_evidence',
      'off_topic',
      'aggressive',
    ])
    expect(isReactionsV1Id('like')).toBe(false)
    expect(isReactionsV1Id('love')).toBe(false)
    expect(REACTIONS_V1_ENTRIES.every((e) => typeof e.emoji === 'string')).toBe(true)
  })

  it('lists enabled-only by default; omits hopeful/amused', () => {
    const enabled = listReactionsV1({ target: 'comment' })
    const ids = enabled.map((e) => e.id)
    expect(ids).not.toContain('hopeful')
    expect(ids).not.toContain('amused')
    expect(ids).toContain('acknowledge')
    expect(ids).toContain('agree')
    expect(ids).toContain('off_topic')
  })

  it('omits moderation on thread-root', () => {
    const root = listReactionsV1({ target: 'thread-root' })
    expect(root.every((e) => e.layer !== 'moderation')).toBe(true)
    expect(root.some((e) => e.id === 'off_topic')).toBe(false)
  })

  it('enforces agree ⟂ disagree and capacity 3', () => {
    const a = toggleReactionSelection(['agree'], 'disagree')
    expect(a.selected).toEqual(['disagree'])
    const full = toggleReactionSelection(['acknowledge', 'support', 'empathy'], 'agree')
    expect(full.error).toBe('capacity')
    expect(full.selected).toEqual(['acknowledge', 'support', 'empathy'])
    const bad = toggleReactionSelection([], 'like')
    expect(bad.error).toBe('unknown-id')
  })
})

describe('ReactionControls', () => {
  it('SSR strip + open button chrome (ic-react path)', () => {
    const html = renderToStaticMarkup(<ReactionControls t={makeT()} target="comment" />)
    expect(html).toContain('data-testid="reaction-summary-strip"')
    expect(html).toContain('data-testid="reaction-open-button"')
    expect(html).toContain('/icons/threads-feed/ic-react.png')
    expect(html).toContain('data-catalog="reactions.v1"')
  })

  it('renders strip and opens three labelled layers (enabled-only)', () => {
    render(<ReactionControls t={makeT()} target="comment" />)
    expect(screen.getByTestId('reaction-summary-strip')).toBeTruthy()
    fireEvent.click(screen.getByTestId('reaction-open-button'))
    expect(screen.getByTestId('reaction-picker')).toBeTruthy()
    expect(screen.getByTestId('reaction-layer-emotional')).toBeTruthy()
    expect(screen.getByTestId('reaction-layer-epistemic')).toBeTruthy()
    expect(screen.getByTestId('reaction-layer-moderation')).toBeTruthy()
    expect(screen.queryByTestId('reaction-choice-hopeful')).toBeNull()
    expect(screen.queryByTestId('reaction-choice-amused')).toBeNull()
    expect(screen.getByTestId('reaction-catalog-version').textContent).toBe('reactions.v1')
  })

  it('omits moderation layer on thread-root', () => {
    render(<ReactionControls t={makeT()} target="thread-root" />)
    fireEvent.click(screen.getByTestId('reaction-open-button'))
    expect(screen.queryByTestId('reaction-layer-moderation')).toBeNull()
  })

  it('clears agree when disagree selected and shows exclusive hint', () => {
    render(<ReactionControls t={makeT()} target="comment" initialSelected={['agree']} />)
    fireEvent.click(screen.getByTestId('reaction-open-button'))
    fireEvent.click(screen.getByTestId('reaction-choice-disagree'))
    expect(screen.getByTestId('reaction-choice-disagree').getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByTestId('reaction-choice-agree').getAttribute('aria-pressed')).toBe('false')
    expect(screen.getByTestId('reaction-agree-disagree-hint')).toBeTruthy()
  })
})
