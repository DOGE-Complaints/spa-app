/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, afterEach } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { THREADS_FEED_DICTIONARY_EN } from '../../../i18n/threadsFeedDictionary.js'
import { EscalationStub, CollaborationFeedback } from '../escalation/index.js'
import { FeedDiscussionBlock } from '../FeedDiscussionBlock.jsx'
import { resolveHarnessVl12Scene } from '../semantics/escalationStub.js'

function makeT() {
  return (key) => {
    const parts = key.split('.')
    let cur = THREADS_FEED_DICTIONARY_EN
    for (const p of parts) cur = cur?.[p]
    return typeof cur === 'string' ? cur : key
  }
}

function renderUi(ui) {
  return renderToStaticMarkup(
    <I18nProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </I18nProvider>,
  )
}

afterEach(() => {
  cleanup()
  delete window.__NF_VL12_FORCE_SCENE__
  delete window.__THR04_FORCE_SCENE__
})

describe('NF-VL-12 escalation stub chrome', () => {
  it('exports DS-named escalation surfaces', () => {
    expect(EscalationStub).toBeTypeOf('function')
    expect(CollaborationFeedback).toBeTypeOf('function')
  })

  it('idle EscalationStub mounts light DS surface without classic invite-org-stub class', () => {
    const html = renderUi(<EscalationStub t={makeT()} />)
    expect(html).toContain('data-vl-done-surface="EscalationStub"')
    expect(html).toContain('nf-escalation-stub')
    expect(html).not.toContain('invite-org-stub')
    expect(html).toContain('Invite organization')
  })

  it('activated scene shows CollaborationFeedback honesty copy', () => {
    window.__NF_VL12_FORCE_SCENE__ = 'activated'
    render(
      <I18nProvider>
        <MemoryRouter>
          <EscalationStub t={makeT()} />
        </MemoryRouter>
      </I18nProvider>,
    )
    expect(screen.getByTestId('invite-stub-feedback').getAttribute('data-vl-done-surface')).toBe(
      'CollaborationFeedback',
    )
    expect(screen.getByTestId('invite-feedback-title').textContent).toMatch(/isn.t connected/i)
    expect(screen.getByTestId('invite-feedback-body').textContent).toMatch(/No invitation was sent/i)
  })

  it('Got it dismisses feedback', () => {
    window.__NF_VL12_FORCE_SCENE__ = 'activated'
    render(
      <I18nProvider>
        <MemoryRouter>
          <EscalationStub t={makeT()} />
        </MemoryRouter>
      </I18nProvider>,
    )
    fireEvent.click(screen.getByTestId('invite-got-it'))
    expect(screen.queryByTestId('invite-stub-feedback')).toBeNull()
  })

  it('soon variant shows persistent helper and disables activate', () => {
    window.__NF_VL12_FORCE_SCENE__ = 'soon'
    render(
      <I18nProvider>
        <MemoryRouter>
          <EscalationStub t={makeT()} />
        </MemoryRouter>
      </I18nProvider>,
    )
    expect(screen.getByTestId('invite-soon-helper').textContent).toMatch(/coming soon/i)
    expect(screen.getByTestId('thread-action-invite').disabled).toBe(true)
    expect(screen.queryByTestId('invite-stub-feedback')).toBeNull()
  })

  it('FeedDiscussionBlock Done path uses EscalationStub not classic InviteOrganizationStub import', () => {
    const html = renderUi(
      <FeedDiscussionBlock status="empty" t={makeT()} showInviteStub={true} />,
    )
    expect(html).toContain('data-vl-done-surface="EscalationStub"')
    expect(html).toContain('data-vl-shelter-displaced="InviteOrganizationStub"')
    expect(html).not.toContain('invite-org-stub')
  })

  it('resolveHarnessVl12Scene prefers NF_VL12 over THR04', () => {
    window.__THR04_FORCE_SCENE__ = 'soon'
    window.__NF_VL12_FORCE_SCENE__ = 'activated'
    expect(resolveHarnessVl12Scene()).toBe('activated')
  })

  it('CollaborationFeedback standalone is honesty-only (no send CTA)', () => {
    const html = renderUi(
      <CollaborationFeedback t={makeT()} panelId="cf-test" onDismiss={() => {}} />,
    )
    expect(html).toContain('data-vl-done-surface="CollaborationFeedback"')
    expect(html).toContain('No invitation was sent')
    expect(html).not.toMatch(/send invitation/i)
  })
})
