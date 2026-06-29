import { useI18n } from '../../i18n/I18nProvider.jsx'

/**
 * @param {{
 *   draftId: string,
 *   onSubmit: () => void,
 *   onReview: () => void,
 * }} props
 */
export function VerificationCompletePanel({ draftId, onSubmit, onReview }) {
  const { t } = useI18n()

  return (
    <section
      className="story-gate-panel story-gate-panel--complete"
      data-testid="story-gate-verification-complete"
    >
      <h2>{t('storyGate.complete.title')}</h2>
      <p>{t('storyGate.complete.message')}</p>
      <p className="story-gate-panel__status" data-testid="story-gate-status-ready">
        {t('storyGate.complete.statusReady')}
      </p>
      <p className="story-gate-panel__meta" data-testid="story-gate-draft-id">
        {draftId}
      </p>
      <div className="story-gate-panel__actions">
        <button type="button" data-testid="story-gate-submit-story" onClick={onSubmit}>
          {t('storyGate.complete.submit')}
        </button>
        <button type="button" data-testid="story-gate-review-story" onClick={onReview}>
          {t('storyGate.complete.review')}
        </button>
      </div>
    </section>
  )
}
