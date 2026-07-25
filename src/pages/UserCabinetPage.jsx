import { SESSION_SHELL_STATES } from '../auth/sessionShellState.js'
import { useSessionShell } from '../auth/SessionShellContext.jsx'
import { AccountSummary } from '../components/AccountSummary/index.js'
import { useI18n } from '../i18n/I18nProvider.jsx'
import './UserCabinetPage.css'

const SECTION_SLOTS = [
  { id: 'civic', testId: 'cabinet-slot-civic', labelKey: 'cabinet.section.civicStatus' },
  { id: 'story', testId: 'cabinet-slot-story', labelKey: 'cabinet.section.storyActivity' },
  { id: 'contribution', testId: 'cabinet-slot-contribution', labelKey: 'cabinet.section.contribution' },
  { id: 'account', testId: 'cabinet-slot-account', labelKey: 'cabinet.section.account' },
  { id: 'wallet', testId: 'cabinet-slot-wallet', labelKey: 'cabinet.section.wallet' },
]

function CabinetShellSkeleton({ t }) {
  return (
    <div
      className="user-cabinet-page__skeleton"
      data-testid="cabinet-shell-skeleton"
      aria-busy="true"
      aria-label={t('cabinet.shell.loading')}
    >
      <div className="user-cabinet-page__grid user-cabinet-page__grid--skeleton" data-testid="cabinet-grid">
        {SECTION_SLOTS.map((slot) => (
          <section
            key={slot.id}
            className={`user-cabinet-page__slot user-cabinet-page__slot--${slot.id} user-cabinet-page__slot--skeleton`}
            data-testid={slot.testId}
            aria-hidden="true"
          >
            <div className="user-cabinet-page__skeleton-block" />
          </section>
        ))}
      </div>
      <p className="user-cabinet-page__loading" data-testid="cabinet-shell-loading">
        {t('cabinet.shell.loading')}
      </p>
    </div>
  )
}

function CabinetSectionSlot({ slot, t, children }) {
  return (
    <section
      className={`user-cabinet-page__slot user-cabinet-page__slot--${slot.id}`}
      data-testid={slot.testId}
      aria-label={t(slot.labelKey)}
    >
      <header className="user-cabinet-page__slot-header">
        <h2 className="user-cabinet-page__slot-title">{t(slot.labelKey)}</h2>
      </header>
      <div className="user-cabinet-page__slot-body">{children}</div>
    </section>
  )
}

export function UserCabinetPage() {
  const { t } = useI18n()
  const { profile, shellState } = useSessionShell()
  const forceLoading =
    import.meta.env.DEV &&
    typeof sessionStorage !== 'undefined' &&
    sessionStorage.getItem('doge.force-cabinet-loading') === '1'
  const isLoading = forceLoading || shellState === SESSION_SHELL_STATES.RESTORING

  return (
    <div className="user-cabinet-page" data-testid="user-cabinet-page">
      <header className="user-cabinet-page__header">
        <h1 className="user-cabinet-page__title">{t('cabinet.page.title')}</h1>
      </header>

      {isLoading ? (
        <CabinetShellSkeleton t={t} />
      ) : (
        <div className="user-cabinet-page__grid" data-testid="cabinet-grid">
          {SECTION_SLOTS.map((slot) => {
            if (slot.id === 'account') {
              return (
                <section
                  key={slot.id}
                  className={`user-cabinet-page__slot user-cabinet-page__slot--${slot.id}`}
                  data-testid={slot.testId}
                  aria-label={t(slot.labelKey)}
                >
                  <AccountSummary profile={profile} />
                </section>
              )
            }
            return (
              <CabinetSectionSlot key={slot.id} slot={slot} t={t}>
                <p className="user-cabinet-page__slot-placeholder">{t('cabinet.common.comingLater')}</p>
              </CabinetSectionSlot>
            )
          })}
        </div>
      )}
    </div>
  )
}
