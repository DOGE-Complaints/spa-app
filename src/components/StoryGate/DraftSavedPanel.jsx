import { useI18n } from '../../i18n/I18nProvider.jsx'
import { Button } from '../Button'

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
        <Button
          type="button"
          hierarchy="primary"
          fullWidth
          data-testid="story-gate-continue-verification"
          onClick={onContinueVerification}
        >
          {t('storyGate.draftSaved.continueVerification')}
        </Button>
        <Button type="button" hierarchy="secondary" fullWidth data-testid="story-gate-return-to-story" onClick={onReturnToStory}>
          {t('storyGate.draftSaved.returnToStory')}
        </Button>
      </div>
    </section>
  )
}
