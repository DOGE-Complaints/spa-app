import { useId, useRef, useState } from 'react'
import { NEXT_FEED_THREAD_ICONS } from '../feedThreadIcons.js'
import { resolveHarnessVl12Scene } from '../semantics/escalationStub.js'
import { CollaborationFeedback } from './CollaborationFeedback.jsx'
import './EscalationChrome.css'

/**
 * DS §10 EscalationStub — secondary Invite organization inside Discussion (M156).
 * Variants: idle · activated feedback · soon/unavailable.
 * Not a fifth PostActionStrip action. No invent invite send HTTP.
 * Classic `components/threads/InviteOrganizationStub.jsx` remains `#/board` Done path.
 *
 * @param {(k: string) => string} t
 * @param {'preview'|'soon'} [availability]
 */
export function EscalationStub({ t, availability = 'preview', iconPack = null }) {
  const icons = iconPack || NEXT_FEED_THREAD_ICONS
  const inviteSrc = icons.invite || '/icons/threads-feed/ic-invite-organization.png'
  const scene = resolveHarnessVl12Scene(availability === 'soon' ? 'soon' : 'idle')
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
      className={`nf-escalation-stub${isSoon ? ' nf-escalation-stub--soon' : ''}${
        open ? ' nf-escalation-stub--open' : ''
      }`}
      data-ds-surface="EscalationStub"
      data-vl-done-surface="EscalationStub"
      data-testid="invite-organization-stub"
      data-vl12-scene={scene}
      data-stub-mode={isSoon ? 'soon' : 'preview'}
      data-plane="light"
    >
      <button
        ref={buttonRef}
        type="button"
        className="nf-escalation-stub__button"
        data-testid="thread-action-invite"
        aria-expanded={isSoon ? undefined : open}
        aria-controls={isSoon ? undefined : panelId}
        aria-describedby={isSoon ? `${panelId}-helper` : undefined}
        aria-label={label}
        disabled={isSoon}
        onClick={handleOpen}
      >
        <img src={inviteSrc} alt="" aria-hidden="true" />
        <span className="nf-escalation-stub__label-full">{label}</span>
        <span className="nf-escalation-stub__label-short">{shortLabel}</span>
        {isSoon ? (
          <span className="nf-escalation-stub__soon-badge" data-testid="invite-soon-badge">
            {t('threadsFeed.escalate.comingSoon')}
          </span>
        ) : null}
      </button>

      {isSoon ? (
        <p
          id={`${panelId}-helper`}
          className="nf-escalation-stub__soon-helper"
          data-testid="invite-soon-helper"
        >
          {t('threadsFeed.escalate.soonHelper')}
        </p>
      ) : null}

      {open && !isSoon ? (
        <CollaborationFeedback t={t} panelId={panelId} onDismiss={handleDismiss} />
      ) : null}
    </div>
  )
}
