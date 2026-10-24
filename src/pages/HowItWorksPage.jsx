import { useI18n } from '../i18n/I18nProvider.jsx'
import { Button } from '../components/Button/Button.jsx'
import { getStoryGptHref, hasStoryGptUrl } from '../config/storyGptUrl.js'
import { getLandingFaqHref, hasLandingFaqUrl } from '../config/landingFaqUrl.js'
import { HOW_IT_WORKS_STEP_VISUALS } from '../i18n/howItWorksDictionary.js'
import './HowItWorksPage.css'

const STEPS = [
  {
    id: 'observation',
    bodyKeys: ['body1'],
  },
  {
    id: 'telegramStory',
    bodyKeys: ['body1', 'body2'],
    telegramCta: true,
  },
  {
    id: 'publicIssue',
    bodyKeys: ['body1', 'body2'],
    inlineFeed: true,
  },
  {
    id: 'profileDialogue',
    bodyKeys: ['body1', 'body2'],
  },
]

/**
 * Public How It Works tutorial (M171 / PH-14 · PH-16 env CTAs).
 */
export function HowItWorksPage() {
  const { t } = useI18n()
  const interviewHref = getStoryGptHref()
  const interviewExternal = hasStoryGptUrl()
  const landingHref = getLandingFaqHref()
  const landingExternal = hasLandingFaqUrl()

  return (
    <div className="board-shell how-it-works-route">
      <div
        className="how-it-works"
        data-testid="how-it-works-page"
        data-ph14="true"
        data-ph16="true"
        data-feed-ph14="hydrate"
      >
        <header className="how-it-works-intro">
          <p className="how-it-works-eyebrow">{t('howItWorks.eyebrow')}</p>
          <h1 className="how-it-works-title">{t('howItWorks.title')}</h1>
          <p className="how-it-works-lead">{t('howItWorks.intro')}</p>
        </header>

        <ol className="how-it-works-steps" data-testid="how-it-works-steps">
          {STEPS.map((step) => {
            const base = `howItWorks.steps.${step.id}`
            const visualSrc = HOW_IT_WORKS_STEP_VISUALS[step.id]
            return (
              <li
                key={step.id}
                className="how-it-works-step"
                data-testid="how-it-works-step"
                data-step={step.id}
              >
                <div className="how-it-works-step-grid">
                  <div className="how-it-works-step-copy">
                    <div className="how-it-works-step-head">
                      <span className="how-it-works-step-number" aria-hidden="true">
                        {t(`${base}.number`)}
                      </span>
                      <h2 className="how-it-works-step-title">{t(`${base}.title`)}</h2>
                    </div>
                    {step.bodyKeys.map((bk) => (
                      <p key={bk} className="how-it-works-step-body">
                        {t(`${base}.${bk}`)}
                      </p>
                    ))}
                    {step.telegramCta ? (
                      <div className="how-it-works-inline-action">
                        <Button
                          hierarchy="secondary"
                          href={interviewHref}
                          external
                          target={interviewExternal ? '_blank' : '_self'}
                          ariaLabel={t('howItWorks.cta.telegramAccessibleLabel')}
                          trailingIcon={
                            interviewExternal ? (
                              <img
                                className="how-it-works-external-icon"
                                src="/icons/public-home/ic-external-link.png"
                                alt=""
                                aria-hidden="true"
                              />
                            ) : null
                          }
                          data-testid="how-it-works-cta-telegram"
                        >
                          {t('howItWorks.cta.telegram')}
                        </Button>
                      </div>
                    ) : null}
                    {step.inlineFeed ? (
                      <div className="how-it-works-inline-action">
                        <Button
                          hierarchy="secondary"
                          href="/next/feed"
                          data-testid="how-it-works-inline-feed"
                        >
                          {t('howItWorks.steps.publicIssue.inlineAction')}
                        </Button>
                      </div>
                    ) : null}
                  </div>
                  {visualSrc ? (
                    <figure className="how-it-works-step-visual">
                      <img
                        src={visualSrc}
                        alt=""
                        className="how-it-works-step-visual-img"
                        data-testid={`how-it-works-visual-${step.id}`}
                      />
                    </figure>
                  ) : null}
                </div>
              </li>
            )
          })}
        </ol>

        <div
          className="how-it-works-cta-row how-it-works-cta-row--left"
          data-testid="how-it-works-cta-row"
        >
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
              href={landingHref}
              external
              target={landingExternal ? '_blank' : '_self'}
              ariaLabel={t('howItWorks.cta.landingAccessibleLabel')}
              trailingIcon={
                landingExternal ? (
                  <img
                    className="how-it-works-external-icon"
                    src="/icons/public-home/ic-external-link.png"
                    alt=""
                    aria-hidden="true"
                  />
                ) : null
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
