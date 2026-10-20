/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import {
  VERIFY_DENIED_UNKNOWN,
  VERIFY_GATE_TITLE,
  VERIFY_GO_CTA,
  VERIFY_HANDOFF_ROUTE,
  VERIFY_SUCCESS_BADGE,
  VERIFY_DRAFT_SESSION_KEY,
} from '../config/threadMountConfig.js'
import { ThreadMount } from '../ThreadMount.jsx'
import { M153_ILLUSTRATIVE_DRAFT } from '../composer/ThreadComposer.jsx'
import { M153_NEST_BODIES, THREAD_NEST_COMMENTS } from '../adapters/FixtureAdapter.js'
import { clearVerifyIntent, readVerifyIntent } from '../verify/verifySession.js'

describe('CT-07 VerifyWriteGate lab · no invent Identity/HTTP · no autopost', () => {
  afterEach(() => {
    cleanup()
    clearVerifyIntent()
  })

  it('V-A blocked · draft+target visible · React strip not owned by gate', () => {
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="unverified"
        verifyGateVariant="blocked"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
        initialReplyParentId="fx-a1"
       previewNodeBudget={99} />,
    )
    const gate = screen.getByTestId('tm-verify-write-gate')
    expect(gate.getAttribute('data-tm-gate-variant')).toBe('blocked')
    expect(gate.getAttribute('data-tm-identity-methods')).toBe('false')
    expect(screen.getByTestId('tm-verify-gate-title').textContent).toBe(VERIFY_GATE_TITLE)
    expect(screen.getByTestId('tm-verify-go-cta').textContent).toBe(VERIFY_GO_CTA)
    expect(screen.getByTestId('tm-verify-gate-draft').textContent).toBe(M153_ILLUSTRATIVE_DRAFT)
    expect(screen.getByTestId('tm-verify-gate-target').textContent).toMatch(
      M153_NEST_BODIES.A1.slice(0, 20),
    )
    expect(screen.queryByTestId('tm-thread-composer')).toBeNull()
    expect(screen.getByTestId('tm-thread-mount').getAttribute('data-tm-autopost')).toBe('false')
  })

  it('V-B stub handoff · /verify route · no method invent', () => {
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="unverified"
        verifyGateVariant="handoff"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
       previewNodeBudget={99} />,
    )
    expect(screen.getByTestId('tm-verify-handoff').getAttribute('data-tm-verify-route')).toBe(
      VERIFY_HANDOFF_ROUTE,
    )
    expect(screen.getByTestId('tm-verify-handoff').getAttribute('data-tm-identity-methods')).toBe(
      'false',
    )
    expect(screen.queryByTestId('tm-verify-write-gate')).toBeNull()
  })

  it('V-C verified return · draft kept · no auto-post', async () => {
    const onPost = vi.fn(async () => ({ ok: true, comment: { id: 'n1', body: 'x', parentId: null, depth: 0 } }))
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="allowed"
        verifiedReturn
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
        initialReplyParentId="fx-a1"
        onPostComment={onPost}
       previewNodeBudget={99} />,
    )
    expect(screen.getByTestId('tm-verify-result-opaque').textContent).toBe(VERIFY_SUCCESS_BADGE)
    expect(screen.getByTestId('tm-composer-textarea').value).toBe(M153_ILLUSTRATIVE_DRAFT)
    expect(screen.getByTestId('tm-thread-composer').getAttribute('data-tm-autopost')).toBe('false')
    expect(onPost).not.toHaveBeenCalled()
    expect(screen.queryByText(M153_ILLUSTRATIVE_DRAFT, { selector: '[data-testid="tm-comment-body"]' })).toBeNull()
  })

  it('V-D cancelled · still blocked · draft intact', () => {
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="unverified"
        verifyGateVariant="cancelled"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
        initialReplyParentId="fx-a1"
       previewNodeBudget={99} />,
    )
    expect(screen.getByTestId('tm-verify-write-gate').getAttribute('data-tm-gate-variant')).toBe(
      'cancelled',
    )
    expect(screen.getByTestId('tm-verify-gate-draft').textContent).toBe(M153_ILLUSTRATIVE_DRAFT)
    expect(screen.queryByTestId('tm-thread-composer')).toBeNull()
  })

  it('V-E denied-unknown · no /verify invent redirect', () => {
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="denied-unknown"
        verifyGateVariant="denied-unknown"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
       previewNodeBudget={99} />,
    )
    expect(screen.getByTestId('tm-verify-gate-title').textContent).toBe(VERIFY_DENIED_UNKNOWN)
    expect(screen.queryByTestId('tm-verify-go-cta')).toBeNull()
    expect(screen.queryByTestId('tm-verify-handoff')).toBeNull()
  })

  it('Go to verification persists session draft keys · no autopost', () => {
    const onGo = vi.fn()
    render(
      <ThreadMount
        status="populated"
        comments={THREAD_NEST_COMMENTS}
        writeCapability="unverified"
        verifyGateVariant="blocked"
        expanded
        initialDraft={M153_ILLUSTRATIVE_DRAFT}
        initialReplyParentId="fx-a1"
        onGoVerify={onGo}
       previewNodeBudget={99} />,
    )
    fireEvent.click(screen.getByTestId('tm-verify-go-cta'))
    expect(onGo).toHaveBeenCalled()
    const intent = readVerifyIntent()
    expect(intent.draft).toBe(M153_ILLUSTRATIVE_DRAFT)
    expect(intent.targetId).toBe('fx-a1')
    expect(sessionStorage.getItem(VERIFY_DRAFT_SESSION_KEY)).toBe(M153_ILLUSTRATIVE_DRAFT)
  })
})
