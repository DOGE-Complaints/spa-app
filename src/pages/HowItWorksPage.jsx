import { useI18n } from '../i18n/I18nProvider.jsx'
import { AppShell, Header, PublicFooter, Sidebar } from '../components/AppShell/index.js'
import { Button } from '../components/Button/Button.jsx'
import { PUBLIC_SHELL_SHOW_SIDEBAR } from '../config/publicShell.js'
import { getStoryGptHref, hasStoryGptUrl } from '../config/storyGptUrl.js'
import './HowItWorksPage.css'

const STEPS = [
  {
    id: 'civicIssues',
    icon: '/icons/story-handoff/ic-doc-new.png',
    pointKeys: ['point1', 'point2', 'point3', 'point4'],
  },
  {
    id: 'dashboard',
    icon: null,
    pointKeys: ['point1', 'point2', 'point3', 'point4'],
    inlineAction: true,
  },
  {
    id: 'story',
    icon: '/icons/story-handoff/ic-field-summary.png',
    pointKeys: ['point1', 'point2', 'point3', 'point4', 'point5'],
    privacyNote: true,
  },
  {
    id: 'submit',
    icon: null,
    pointKeys: ['point1', 'point2', 'point3'],
    warning: true,
  },
]

/**
 * Public How It Works tutorial (M133 / PH-05).
 */
export function HowItWorksPage() {
  const { t } = useI18n()
  const submitHref = getStoryGptHref()
  const submitExternal = hasStoryGptUrl()

  return (
    <div className="board-shell how-it-works-route">
      <AppShell
        className="how-it-works-shell"
        header={<Header />}
        sidebar={<Sidebar />}
        showSidebar={PUBLIC_SHELL_SHOW_SIDEBAR}
        footer={<PublicFooter />}
      >
        <div className="how-it-works" data-testid="how-it-works-page">
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
                    {step.icon ? (
                      <img
                        className="how-it-works-step-icon"
                        src={step.icon}
                        alt=""
                        aria-hidden="true"
                      />
                    ) : null}
                    <h2 className="how-it-works-step-title">{t(`${base}.title`)}</h2>
                  </div>
                  <p className="how-it-works-step-body">{t(`${base}.body`)}</p>
                  <ul className="how-it-works-step-points">
                    {step.pointKeys.map((pk) => (
                      <li key={pk}>{t(`${base}.${pk}`)}</li>
                    ))}
                  </ul>
                  {step.inlineAction ? (
                    <div className="how-it-works-inline-action">
                      <Button
                        hierarchy="secondary"
                        href="/board"
                        data-testid="how-it-works-inline-dashboard"
                      >
                        {t('howItWorks.steps.dashboard.inlineAction')}
                      </Button>
                      <p className="how-it-works-hint">
                        {t('howItWorks.steps.dashboard.inlineActionHint')}
                      </p>
                    </div>
                  ) : null}
                  {step.privacyNote ? (
                    <p className="how-it-works-privacy" role="note">
                      {t('howItWorks.steps.story.privacyNote')}
                    </p>
                  ) : null}
                  {step.warning ? (
                    <p className="how-it-works-warning" role="note">
                      {t('howItWorks.steps.submit.warning')}
                    </p>
                  ) : null}
                </li>
              )
            })}
          </ol>

          <div className="how-it-works-cta-row" data-testid="how-it-works-cta-row">
            <div className="how-it-works-cta">
              <Button
                hierarchy="primary"
                href="/board"
                data-testid="how-it-works-cta-dashboard"
              >
                {t('howItWorks.cta.dashboard')}
              </Button>
              <p className="how-it-works-hint">{t('howItWorks.cta.dashboardHint')}</p>
            </div>
            <div className="how-it-works-cta">
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
              <p className="how-it-works-hint">{t('howItWorks.cta.submitHint')}</p>
              <p className="how-it-works-hint how-it-works-handoff">
                {t('howItWorks.externalHandoff')}
              </p>
            </div>
          </div>
        </div>
      </AppShell>
    </div>
  )
}
