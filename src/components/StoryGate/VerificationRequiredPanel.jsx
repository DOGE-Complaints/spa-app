import { useI18n } from '../../i18n/I18nProvider.jsx'
import { Button } from '../Button'

/**
 * @param {{
 *   draftId: string | null,
 *   onVerifyContinue: () => void,
 *   onSaveDraft: () => void,
 *   onCancel: () => void,
 * }} props
 */
export function VerificationRequiredPanel({
  draftId,
  onVerifyContinue,
  onSaveDraft,
  onCancel,
}) {
  const { t } = useI18n()

  return (
    <section
      className="story-gate-panel story-gate-panel--required"
      data-testid="story-gate-verification-required"
    >
      <h2>{t('storyGate.required.title')}</h2>
      <p>{t('storyGate.required.message')}</p>
      {draftId ? (
        <div className="story-gate-panel__meta" data-testid="story-gate-draft-meta">
          <p>
            <strong>{t('storyGate.required.draftLabel')}</strong>
            {' '}
            <span data-testid="story-gate-draft-id">{draftId}</span>
          </p>
          <p data-testid="story-gate-status-waiting">{t('storyGate.required.statusWaiting')}</p>
        </div>
      ) : null}
      <div className="story-gate-panel__actions">
        <Button type="button" hierarchy="primary" fullWidth data-testid="story-gate-verify-continue" onClick={onVerifyContinue}>
          {t('storyGate.required.verifyContinue')}
        </Button>
        <Button type="button" hierarchy="secondary" fullWidth data-testid="story-gate-save-draft" onClick={onSaveDraft}>
          {t('storyGate.required.saveDraft')}
        </Button>
        <Button type="button" hierarchy="tertiary" fullWidth data-testid="story-gate-cancel" onClick={onCancel}>
          {t('storyGate.required.cancel')}
        </Button>
      </div>
    </section>
  )
}
