import { useI18n } from '../../i18n/I18nProvider.jsx'
import { Button } from '../Button'

/**
 * @param {{
 *   submissionId: string,
 *   onSubmitAnother: () => void,
 * }} props
 */
export function SubmissionSuccessPanel({ submissionId, onSubmitAnother }) {
  const { t } = useI18n()

  return (
    <section
      className="story-gate-panel story-gate-panel--success"
      data-testid="story-gate-submission-success"
    >
      <h2>{t('storyGate.success.title')}</h2>
      <p>{t('storyGate.success.message')}</p>
      <dl className="story-gate-panel__meta">
        <div>
          <dt>{t('storyGate.success.idLabel')}</dt>
          <dd data-testid="story-gate-submission-id">{submissionId}</dd>
        </div>
        <div>
          <dt>{t('storyGate.success.statusUnderReview')}</dt>
          <dd data-testid="story-gate-status-under-review">
            {t('storyGate.success.statusUnderReview')}
          </dd>
        </div>
      </dl>
      <div className="story-gate-panel__actions">
        <Button type="button" hierarchy="secondary" fullWidth data-testid="story-gate-view-activity" disabled>
          {t('storyGate.success.viewActivity')}
        </Button>
        <Button type="button" hierarchy="primary" fullWidth data-testid="story-gate-submit-another" onClick={onSubmitAnother}>
          {t('storyGate.success.submitAnother')}
        </Button>
      </div>
    </section>
  )
}
