import './EscalationChrome.css'

/**
 * DS §10 CollaborationFeedback — honesty: handoff not connected · no invitation sent (M156 B).
 * Local dismiss only — no invent invite POST / persistence.
 */
export function CollaborationFeedback({
  t,
  panelId,
  onDismiss,
  infoSrc = '/icons/story-handoff/ic-info.png',
}) {
  return (
    <div
      id={panelId}
      className="nf-collaboration-feedback"
      data-ds-surface="CollaborationFeedback"
      data-vl-done-surface="CollaborationFeedback"
      data-testid="invite-stub-feedback"
      role="dialog"
      aria-labelledby={`${panelId}-title`}
      aria-describedby={`${panelId}-body`}
    >
      <div className="nf-collaboration-feedback__head">
        <img src={infoSrc} alt="" aria-hidden="true" />
        <p
          id={`${panelId}-title`}
          className="nf-collaboration-feedback__title"
          data-testid="invite-feedback-title"
        >
          {t('threadsFeed.escalate.notConnectedYet')}
        </p>
      </div>
      <p
        id={`${panelId}-body`}
        className="nf-collaboration-feedback__body"
        data-testid="invite-feedback-body"
      >
        {t('threadsFeed.escalate.noInvitationSent')}
      </p>
      <button
        type="button"
        className="nf-collaboration-feedback__got-it"
        data-testid="invite-got-it"
        onClick={onDismiss}
      >
        {t('threadsFeed.escalate.gotIt')}
      </button>
    </div>
  )
}
