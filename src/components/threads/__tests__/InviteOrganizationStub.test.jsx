/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, afterEach, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { InviteOrganizationStub } from '../InviteOrganizationStub.jsx'
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
  delete window.__THR04_FORCE_SCENE__
})

describe('InviteOrganizationStub', () => {
  it('idle click opens informational feedback — no invitation-sent claim', () => {
    render(<InviteOrganizationStub t={makeT()} />)
    expect(screen.queryByTestId('invite-stub-feedback')).toBeNull()
    fireEvent.click(screen.getByTestId('thread-action-invite'))
    expect(screen.getByTestId('invite-stub-feedback')).toBeTruthy()
    expect(screen.getByTestId('invite-feedback-title').textContent).toMatch(/isn.t connected yet/i)
    expect(screen.getByTestId('invite-feedback-body').textContent).toMatch(/No invitation was sent/i)
    expect(screen.getByTestId('invite-feedback-body').textContent).not.toMatch(/Invitation sent|Request saved|We will contact/i)
  })

  it('Got it dismisses feedback', () => {
    render(<InviteOrganizationStub t={makeT()} />)
    fireEvent.click(screen.getByTestId('thread-action-invite'))
    fireEvent.click(screen.getByTestId('invite-got-it'))
    expect(screen.queryByTestId('invite-stub-feedback')).toBeNull()
  })

  it('soon mode disables control and shows helper without feedback', () => {
    window.__THR04_FORCE_SCENE__ = 'soon'
    render(<InviteOrganizationStub t={makeT()} />)
    const btn = screen.getByTestId('thread-action-invite')
    expect(btn.disabled).toBe(true)
    expect(screen.getByTestId('invite-soon-helper').textContent).toMatch(/coming soon/i)
    fireEvent.click(btn)
    expect(screen.queryByTestId('invite-stub-feedback')).toBeNull()
  })

  it('does not call fetch on activate', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}'))
    render(<InviteOrganizationStub t={makeT()} />)
    fireEvent.click(screen.getByTestId('thread-action-invite'))
    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })
})
