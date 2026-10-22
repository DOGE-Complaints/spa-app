import { useI18n } from '../i18n/I18nProvider.jsx'
import { Button } from '../components/Button/Button.jsx'
import { getStoryGptHref, hasStoryGptUrl } from '../config/storyGptUrl.js'
import { HOW_IT_WORKS_LANDING_FAQ_HREF } from '../i18n/howItWorksDictionary.js'
import './HowItWorksPage.css'

const STEPS = [
  {
    id: 'civicIssues',
    pointKeys: ['point1', 'point2', 'point3'],
  },
  {
    id: 'dashboard',
    pointKeys: ['point1', 'point2', 'point3'],
    inlineFeed: true,
  },
  {
    id: 'story',
    pointKeys: ['point1', 'point2', 'point3'],
    privacyNote: true,
  },
  {
    id: 'submit',
    pointKeys: [],
    submitCta: true,
  },
]

/**
 * Public How It Works tutorial (M133 / PH-05 · M168 / PH-13 content+CTA).
 */
export function HowItWorksPage() {
  const { t } = useI18n()
  const submitHref = getStoryGptHref()
  const submitExternal = hasStoryGptUrl()

  return (
    <div className="board-shell how-it-works-route">
      <div
        className="how-it-works"
        data-testid="how-it-works-page"
        data-ph13="true"
        data-feed-ph13="hydrate"
      >
        <header className="how-it-works-intro">
          <p className="how-it-works-eyebrow">{t('howItWorks.eyebrow')}</p>
          <h1 className="how-it-works-title">{t('howItWorks.title')}</h1>
          <p className="how-it-works-lead">{t('howItWorks.intro')}</p>
        </header>

        <ol className="how-it-works-steps" data-testid="how-it-works-steps">
          {STEPS.map((step) => {
            const base = `howItWorks.steps.${step.id}`
            return (
              <li
                key={step.id}
                className="how-it-works-step"
                data-testid="how-it-works-step"
                data-step={step.id}
              >
                <div className="how-it-works-step-head">
                  <span className="how-it-works-step-number" aria-hidden="true">
                    {t(`${base}.number`)}
                  </span>
                  <h2 className="how-it-works-step-title">{t(`${base}.title`)}</h2>
                </div>
                <p className="how-it-works-step-body">{t(`${base}.body`)}</p>
                {step.pointKeys.length > 0 ? (
                  <ul className="how-it-works-step-points">
                    {step.pointKeys.map((pk) => (
                      <li key={pk}>{t(`${base}.${pk}`)}</li>
                    ))}
                  </ul>
                ) : null}
                {step.inlineFeed ? (
                  <div className="how-it-works-inline-action">
                    <Button
                      hierarchy="secondary"
                      href="/next/feed"
                      data-testid="how-it-works-inline-feed"
                    >
                      {t('howItWorks.steps.dashboard.inlineAction')}
                    </Button>
                  </div>
                ) : null}
                {step.privacyNote ? (
                  <p className="how-it-works-privacy" role="note">
                    {t('howItWorks.steps.story.privacyNote')}
                  </p>
                ) : null}
                {step.submitCta ? (
                  <div className="how-it-works-inline-action how-it-works-submit-block">
                    <p className="how-it-works-warning" role="note">
                      {t('howItWorks.steps.submit.warning')}
                    </p>
                    <Button
                      hierarchy="secondary"
                      href={submitHref}
                      external={submitExternal}
                      ariaLabel={t('howItWorks.cta.submitAccessibleLabel')}
                      trailingIcon={
                        <img
                          className="how-it-works-external-icon"
                          src="/icons/public-home/ic-external-link.png"
                          alt=""
                          aria-hidden="true"
                        />
                      }
                      data-testid="how-it-works-cta-submit"
                    >
                      {t('howItWorks.cta.submit')}
                    </Button>
                  </div>
                ) : null}
              </li>
            )
          })}
        </ol>

        <div className="how-it-works-cta-row" data-testid="how-it-works-cta-row">
          <div className="how-it-works-cta">
            <Button
              hierarchy="primary"
              href="/next/feed"
              data-testid="how-it-works-cta-feed"
            >
              {t('howItWorks.cta.feed')}
            </Button>
          </div>
          <div className="how-it-works-cta">
            <Button
              hierarchy="secondary"
              href={HOW_IT_WORKS_LANDING_FAQ_HREF}
              external
              ariaLabel={t('howItWorks.cta.landingAccessibleLabel')}
              trailingIcon={
                <img
                  className="how-it-works-external-icon"
                  src="/icons/public-home/ic-external-link.png"
                  alt=""
                  aria-hidden="true"
                />
              }
              data-testid="how-it-works-cta-landing"
            >
              {t('howItWorks.cta.landing')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
