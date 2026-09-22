import { useId, useRef, useState } from 'react'
import { resolveHarnessThr04Scene } from './inviteOrganizationHarness.js'
import './InviteOrganizationStub.css'

/**
 * M146 Invite organization stub — secondary chrome control.
 * Click → informational feedback only. No invent escalate HTTP. No false success.
 *
 * @param {(k: string) => string} t
 * @param {'preview'|'soon'} [availability] product mode; harness may override to soon/activated
 */
export function InviteOrganizationStub({ t, availability = 'preview' }) {
  const scene = resolveHarnessThr04Scene(availability === 'soon' ? 'soon' : 'idle')
  const isSoon = scene === 'soon' || availability === 'soon'
  const [open, setOpen] = useState(scene === 'activated')
  const buttonRef = useRef(null)
  const panelId = useId()

  function handleOpen() {
    if (isSoon) return
    setOpen(true)
  }

  function handleDismiss() {
    setOpen(false)
    setTimeout(() => buttonRef.current?.focus(), 0)
  }

  const label = t('threadsFeed.escalate.inviteOrganization')
  const shortLabel = t('threadsFeed.escalate.inviteShort')

  return (
    <div
      className={`invite-org-stub${isSoon ? ' invite-org-stub--soon' : ''}${open ? ' invite-org-stub--open' : ''}`}
      data-testid="invite-organization-stub"
      data-thr04-scene={scene}
      data-stub-mode={isSoon ? 'soon' : 'preview'}
    >
      <button
        ref={buttonRef}
        type="button"
        className="issue-thread-action issue-thread-action--secondary invite-org-button"
        data-testid="thread-action-invite"
        aria-expanded={isSoon ? undefined : open}
        aria-controls={isSoon ? undefined : panelId}
        aria-describedby={isSoon ? `${panelId}-helper` : undefined}
        aria-label={label}
        disabled={isSoon}
        onClick={handleOpen}
      >
        <img src="/icons/threads-feed/ic-invite-organization.png" alt="" aria-hidden="true" />
        <span className="invite-org-label-full">{label}</span>
        <span className="invite-org-label-short">{shortLabel}</span>
        {isSoon ? (
          <span className="invite-org-soon-badge" data-testid="invite-soon-badge">
            {t('threadsFeed.escalate.comingSoon')}
          </span>
        ) : null}
      </button>

      {isSoon ? (
        <p
          id={`${panelId}-helper`}
          className="invite-org-soon-helper"
          data-testid="invite-soon-helper"
        >
          {t('threadsFeed.escalate.soonHelper')}
        </p>
      ) : null}

      {open && !isSoon ? (
        <div
          id={panelId}
          className="invite-org-feedback"
          data-testid="invite-stub-feedback"
          role="dialog"
          aria-labelledby={`${panelId}-title`}
          aria-describedby={`${panelId}-body`}
        >
          <div className="invite-org-feedback-head">
            <img src="/icons/story-handoff/ic-info.png" alt="" aria-hidden="true" />
            <p id={`${panelId}-title`} className="invite-org-feedback-title" data-testid="invite-feedback-title">
              {t('threadsFeed.escalate.notConnectedYet')}
            </p>
          </div>
          <p id={`${panelId}-body`} className="invite-org-feedback-body" data-testid="invite-feedback-body">
            {t('threadsFeed.escalate.noInvitationSent')}
          </p>
          <button
            type="button"
            className="invite-org-got-it"
            data-testid="invite-got-it"
            onClick={handleDismiss}
          >
            {t('threadsFeed.escalate.gotIt')}
          </button>
        </div>
      ) : null}
    </div>
  )
}
