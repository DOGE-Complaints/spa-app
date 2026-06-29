import { useI18n } from '../../i18n/I18nProvider.jsx'

/**
 * @param {{
 *   draftId: string,
 *   lastSavedAt: string,
 *   onContinueVerification: () => void,
 *   onReturnToStory: () => void,
 * }} props
 */
export function DraftSavedPanel({
  draftId,
  lastSavedAt,
  onContinueVerification,
  onReturnToStory,
}) {
  const { t } = useI18n()

  return (
    <section
      className="story-gate-panel story-gate-panel--draft-saved"
      data-testid="story-gate-draft-saved"
    >
      <h2>{t('storyGate.draftSaved.title')}</h2>
      <p>{t('storyGate.draftSaved.message')}</p>
      <dl className="story-gate-panel__meta">
        <div>
          <dt>{t('storyGate.draftSaved.idLabel')}</dt>
          <dd data-testid="story-gate-draft-id">{draftId}</dd>
        </div>
        <div>
          <dt>{t('storyGate.draftSaved.lastSaved')}</dt>
          <dd data-testid="story-gate-last-saved">{lastSavedAt}</dd>
        </div>
      </dl>
      <div className="story-gate-panel__actions">
        <button
          type="button"
          data-testid="story-gate-continue-verification"
          onClick={onContinueVerification}
        >
          {t('storyGate.draftSaved.continueVerification')}
        </button>
        <button type="button" data-testid="story-gate-return-to-story" onClick={onReturnToStory}>
          {t('storyGate.draftSaved.returnToStory')}
        </button>
      </div>
    </section>
  )
}
