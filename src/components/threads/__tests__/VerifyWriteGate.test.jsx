/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, afterEach } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { CommentComposer } from '../CommentComposer.jsx'
import {
  buildVerifyHandoffHref,
  isIdentityVerifiedForWrite,
} from '../verifyWriteGate.js'
import { THREADS_FEED_DICTIONARY_EN } from '../../../i18n/threadsFeedDictionary.js'

function makeT() {
  return (key) => {
    const parts = key.split('.')
    let cur = THREADS_FEED_DICTIONARY_EN
    for (const p of parts) cur = cur?.[p]
    return typeof cur === 'string' ? cur : key
  }
}

afterEach(() => {
  cleanup()
  delete window.__THR05_FORCE_SCENE__
})

describe('isIdentityVerifiedForWrite', () => {
  it('requires identity_verified true — phone_verified alone is insufficient', () => {
    expect(isIdentityVerifiedForWrite({ phone_verified: true, identity_verified: false })).toBe(false)
    expect(isIdentityVerifiedForWrite({ phone_verified: true })).toBe(false)
    expect(isIdentityVerifiedForWrite({ identity_verified: true })).toBe(true)
    expect(isIdentityVerifiedForWrite(null)).toBe(false)
  })
})

describe('CommentComposer verify gate', () => {
  it('unverified post opens gate and preserves draft — no auto-submit', () => {
    render(<CommentComposer t={makeT()} identityVerified={false} initialDraft="Keep me" />)
    fireEvent.click(screen.getByTestId('comment-composer-post'))
    expect(screen.getByTestId('verify-write-gate')).toBeTruthy()
    expect(screen.getByTestId('verify-gate-title').textContent).toMatch(/Verify to participate/i)
    expect(screen.getByTestId('comment-composer-input').value).toBe('Keep me')
  })

  it('CTA builds handoff to existing /verify with returnTo', () => {
    const nav = []
    render(
      <CommentComposer
        t={makeT()}
        identityVerified={false}
        returnTo="#/board"
        onNavigateVerify={(href) => nav.push(href)}
      />,
    )
    fireEvent.click(screen.getByTestId('comment-composer-post'))
    fireEvent.click(screen.getByTestId('verify-go-cta'))
    expect(nav[0]).toBe(buildVerifyHandoffHref('#/board'))
    expect(nav[0]).toMatch(/^#\/verify\?returnTo=/)
  })

  it('verified chrome is opaque Verified — no phone/eID method', () => {
    window.__THR05_FORCE_SCENE__ = 'verified'
    render(<CommentComposer t={makeT()} />)
    const result = screen.getByTestId('verify-result-opaque')
    expect(result.textContent).toBe('Verified')
    expect(result.textContent).not.toMatch(/phone|eID|Smart-ID|method/i)
  })

  it('civic optional line appears near CTA only — not in verified result', () => {
    window.__THR05_FORCE_SCENE__ = 'civic'
    render(<CommentComposer t={makeT()} />)
    expect(screen.getByTestId('verify-civic-line').textContent).toMatch(/DOGEstonia Identity/)
    expect(screen.queryByTestId('verify-result-opaque')).toBeNull()
  })
})
