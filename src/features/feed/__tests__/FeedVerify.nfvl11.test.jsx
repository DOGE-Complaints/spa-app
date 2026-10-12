/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, afterEach } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { THREADS_FEED_DICTIONARY_EN, THREADS_FEED_FLAT_KEYS } from '../../../i18n/threadsFeedDictionary.js'
import { NEXT_FEED_THREAD_ICONS } from '../feedThreadIcons.js'
import { ThreadComposer } from '../composer/ThreadComposer.jsx'
import {
  VerifyWriteGate,
  VerifyReturnFeedback,
  WriteDeniedNotice,
} from '../verify/index.js'
import {
  buildVerifyHandoffHref,
  isIdentityVerifiedForWrite,
  resolveHarnessVl11Scene,
} from '../semantics/verifyWriteGate.js'

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
  delete window.__THR05_FORCE_SCENE__
  delete window.__NF_VL11_FORCE_SCENE__
})

describe('NF-VL-11 verify gate chrome', () => {
  it('exports DS-named verify surfaces', () => {
    expect(VerifyWriteGate).toBeTypeOf('function')
    expect(VerifyReturnFeedback).toBeTypeOf('function')
    expect(WriteDeniedNotice).toBeTypeOf('function')
    expect(renderUi(<VerifyWriteGate t={makeT()} onGoVerify={() => {}} onDismiss={() => {}} />)).toContain(
      'data-vl-done-surface="VerifyWriteGate"',
    )
    expect(renderUi(<VerifyReturnFeedback t={makeT()} variant="verified" />)).toContain(
      'data-vl-done-surface="VerifyReturnFeedback"',
    )
    expect(renderUi(<WriteDeniedNotice t={makeT()} />)).toContain('data-vl-done-surface="WriteDeniedNotice"')
  })

  it('semantics seam reuses opaque identity_verified — no invent fields', () => {
    expect(isIdentityVerifiedForWrite({ phone_verified: true })).toBe(false)
    expect(isIdentityVerifiedForWrite({ identity_verified: true })).toBe(true)
    expect(THREADS_FEED_FLAT_KEYS).toContain('threadsFeed.verify.writeDeniedHelper')
  })

  it('ThreadComposer unverified post opens DS gate and preserves draft — no auto-submit', () => {
    render(
      <ThreadComposer
        t={makeT()}
        identityVerified={false}
        initialDraft="Keep me"
        iconPack={NEXT_FEED_THREAD_ICONS}
      />,
    )
    fireEvent.click(screen.getByTestId('comment-composer-post'))
    expect(screen.getByTestId('verify-write-gate')).toBeTruthy()
    expect(screen.getByTestId('verify-write-gate').getAttribute('data-vl-done-surface')).toBe('VerifyWriteGate')
    expect(screen.getByTestId('verify-gate-title').textContent).toMatch(/Verify to participate/i)
    expect(screen.getByTestId('comment-composer-input').value).toBe('Keep me')
  })

  it('CTA builds handoff to existing /verify with returnTo — no invent verify route', () => {
    const nav = []
    render(
      <ThreadComposer
        t={makeT()}
        identityVerified={false}
        returnTo="#/next/feed"
        onNavigateVerify={(href) => nav.push(href)}
        iconPack={NEXT_FEED_THREAD_ICONS}
      />,
    )
    fireEvent.click(screen.getByTestId('comment-composer-post'))
    fireEvent.click(screen.getByTestId('verify-go-cta'))
    expect(nav[0]).toBe(buildVerifyHandoffHref('#/next/feed'))
    expect(nav[0]).toMatch(/^#\/verify\?returnTo=/)
  })

  it('verified return is opaque Verified via VerifyReturnFeedback — no auto-send', () => {
    window.__NF_VL11_FORCE_SCENE__ = 'verified'
    expect(resolveHarnessVl11Scene()).toBe('verified')
    render(<ThreadComposer t={makeT()} iconPack={NEXT_FEED_THREAD_ICONS} initialDraft="Draft stays" />)
    const result = screen.getByTestId('verify-result-opaque')
    expect(result.textContent).toBe('Verified')
    expect(result.textContent).not.toMatch(/phone|eID|Smart-ID|method/i)
    expect(screen.getByTestId('verify-return-feedback').getAttribute('data-return-variant')).toBe('verified')
    expect(screen.getByTestId('comment-composer-input').value).toBe('Draft stays')
    expect(screen.getByTestId('comment-composer-post').disabled).toBe(false)
  })

  it('cancelled / failed return keeps draft and does not claim Verified', () => {
    window.__NF_VL11_FORCE_SCENE__ = 'cancelled'
    render(<ThreadComposer t={makeT()} iconPack={NEXT_FEED_THREAD_ICONS} initialDraft="Still here" />)
    expect(screen.getByTestId('verify-return-feedback').getAttribute('data-return-variant')).toBe('cancelled')
    expect(screen.queryByTestId('verify-result-opaque')).toBeNull()
    expect(screen.getByTestId('comment-composer-input').value).toBe('Still here')
    expect(screen.getByTestId('comment-composer-post').disabled).toBe(true)
  })

  it('WriteDeniedNotice does not claim unverified', () => {
    window.__NF_VL11_FORCE_SCENE__ = 'write_denied'
    render(<ThreadComposer t={makeT()} iconPack={NEXT_FEED_THREAD_ICONS} />)
    expect(screen.getByTestId('write-denied-notice')).toBeTruthy()
    expect(screen.getByTestId('write-denied-title').textContent).toMatch(/unavailable/i)
    expect(screen.getByTestId('write-denied-notice').textContent).toMatch(/does not mean you are unverified/i)
    expect(screen.queryByTestId('verify-write-gate')).toBeNull()
    expect(screen.queryByTestId('verify-go-cta')).toBeNull()
  })

  it('next Done path does not import classic threads VerifyWriteGate chrome class', () => {
    window.__NF_VL11_FORCE_SCENE__ = 'unverified'
    const html = renderUi(<ThreadComposer t={makeT()} iconPack={NEXT_FEED_THREAD_ICONS} />)
    expect(html).toContain('data-vl-done-surface="VerifyWriteGate"')
    expect(html).toContain('nf-verify-write-gate')
    expect(html).not.toContain('class="verify-write-gate')
  })
})
