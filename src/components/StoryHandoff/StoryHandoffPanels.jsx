import { GptDraftBanner } from '../GptBridge/GptDraftBanner.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import './StoryHandoff.css'

/**
 * @param {{ src: string, alt?: string, decorative?: boolean }} props
 */
export function StoryHandoffIcon({ src, alt = '', decorative = true }) {
  return (
    <img
      className="story-handoff__icon"
      src={src}
      alt={decorative ? '' : alt}
      aria-hidden={decorative ? 'true' : undefined}
    />
  )
}

/**
 * @param {{ statusKey?: string }} props
 */
export function StoryHandoffDraftChips({ statusKey = 'gptBridge.draft.statusSaved' }) {
  const { t } = useI18n()
  return (
    <div className="story-handoff__chips" data-testid="story-handoff-draft-chips">
      <span className="story-handoff__chip">{t('gptBridge.draft.label')}</span>
      <span className="story-handoff__chip">{t(statusKey)}</span>
      <span className="story-handoff__chip">{t('gptBridge.resolving.draftPreserved')}</span>
      <span className="story-handoff__chip">{t('gptBridge.draft.sourceGpt')}</span>
    </div>
  )
}

/**
 * @param {{ titleKey: string, messageKey: string, iconSrc: string, testId: string, children?: import('react').ReactNode }} props
 */
export function StoryHandoffStatePanel({
  titleKey,
  messageKey,
  iconSrc,
  testId,
  children,
}) {
  const { t } = useI18n()
  return (
    <section className="story-handoff__panel" data-testid={testId}>
      <StoryHandoffIcon src={iconSrc} />
      <h1 className="story-handoff__title">{t(titleKey)}</h1>
      <p className="story-handoff__message">{t(messageKey)}</p>
      {children}
    </section>
  )
}

/**
 * @param {{ preview: ReturnType<import('../../services/storyDraftPreview.js').mapDraftPayloadToPreview>, onSubmit: () => void, onBack: () => void, busy?: boolean }} props
 */
export function StoryHandoffPreviewPanel({ preview, onSubmit, onBack, busy = false }) {
  const { t } = useI18n()
  const fields = [
    { key: 'title', icon: 'ic-field-title', value: preview.title },
    { key: 'summary', icon: 'ic-field-summary', value: preview.summary },
    { key: 'description', icon: 'ic-field-description', value: preview.description },
    { key: 'category', icon: 'ic-field-category', value: preview.category },
    { key: 'institution', icon: 'ic-field-institution', value: preview.institution },
    { key: 'location', icon: 'ic-field-location', value: preview.location },
  ].filter((field) => field.value)

  return (
    <section className="story-handoff__panel" data-testid="story-handoff-preview">
      <GptDraftBanner statusKey="gptBridge.draft.statusReady" />
      <StoryHandoffIcon src="/icons/story-handoff/ic-info.png" />
      <h1 className="story-handoff__title">{t('storyHandoff.preview.title')}</h1>
      <p className="story-handoff__message">{t('storyHandoff.preview.message')}</p>
      <span className="story-handoff__language-badge" data-testid="story-handoff-language-badge">
        {preview.languageBadge}
      </span>
      <div className="story-handoff__fields">
        {fields.map((field) => (
          <div className="story-handoff__field" key={field.key}>
            <img
              className="story-handoff__field-icon"
              src={`/icons/story-handoff/${field.icon}.png`}
              alt=""
              aria-hidden="true"
            />
            <div>
              <div className="story-handoff__field-label">
                {t(`storyHandoff.preview.field.${field.key}`)}
              </div>
              {field.key === 'labels' && Array.isArray(preview.labels) ? (
                <div className="story-handoff__labels">
                  {preview.labels.map((label) => (
                    <span className="story-handoff__label-chip" key={label}>
                      {label}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="story-handoff__field-value">{field.value}</p>
              )}
            </div>
          </div>
        ))}
        {preview.labels.length > 0 && !fields.some((f) => f.key === 'labels') ? (
          <div className="story-handoff__field">
            <img
              className="story-handoff__field-icon"
              src="/icons/story-handoff/ic-field-labels.png"
              alt=""
              aria-hidden="true"
            />
            <div>
              <div className="story-handoff__field-label">{t('storyHandoff.preview.field.labels')}</div>
              <div className="story-handoff__labels">
                {preview.labels.map((label) => (
                  <span className="story-handoff__label-chip" key={label}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <p className="story-handoff__helper">{t('storyHandoff.preview.helper')}</p>
      <div className="story-handoff__actions">
        <button
          type="button"
          className="story-handoff__btn story-handoff__btn--primary"
          data-testid="story-handoff-submit"
          disabled={busy}
          onClick={onSubmit}
        >
          {t('storyHandoff.preview.submit')}
        </button>
        <button
          type="button"
          className="story-handoff__btn story-handoff__btn--secondary"
          data-testid="story-handoff-back-board"
          onClick={onBack}
        >
          {t('storyHandoff.cta.backToBoard')}
        </button>
      </div>
    </section>
  )
}

/**
 * @param {{ submissionId: string, onGoToBoard: () => void, onMyStories: () => void, onSubmitAnother: () => void }} props
 */
export function StoryHandoffSuccessPanel({ submissionId, onGoToBoard, onMyStories, onSubmitAnother }) {
  const { t } = useI18n()
  return (
    <section className="story-handoff__panel" data-testid="story-handoff-success">
      <StoryHandoffIcon
        src="/icons/story-handoff/ic-success-check.png"
        decorative={false}
        alt={t('storyHandoff.success.title')}
      />
      <h1 className="story-handoff__title">{t('storyHandoff.success.title')}</h1>
      <p className="story-handoff__message">{t('storyHandoff.success.message')}</p>
      <div>
        <div className="story-handoff__field-label">{t('storyHandoff.success.submissionIdLabel')}</div>
        <div className="story-handoff__submission-id" data-testid="story-handoff-submission-id">
          <span>{submissionId}</span>
          <img
            src="/icons/story-handoff/ic-copy.png"
            alt=""
            aria-hidden="true"
            width={16}
            height={16}
          />
        </div>
        <div className="story-handoff__field-label">{t('storyHandoff.success.statusLabel')}</div>
        <p className="story-handoff__field-value">{t('storyHandoff.success.statusUnderReview')}</p>
      </div>
      <div className="story-handoff__actions">
        <button
          type="button"
          className="story-handoff__btn story-handoff__btn--primary"
          data-testid="story-handoff-go-board"
          onClick={onGoToBoard}
        >
          {t('storyHandoff.cta.goToBoard')}
        </button>
        <button
          type="button"
          className="story-handoff__btn story-handoff__btn--secondary"
          data-testid="story-handoff-my-stories"
          onClick={onMyStories}
        >
          {t('storyHandoff.cta.myStories')}
        </button>
        <button
          type="button"
          className="story-handoff__btn story-handoff__btn--secondary"
          data-testid="story-handoff-submit-another"
          onClick={onSubmitAnother}
        >
          {t('storyHandoff.success.submitAnother')}
        </button>
      </div>
    </section>
  )
}
