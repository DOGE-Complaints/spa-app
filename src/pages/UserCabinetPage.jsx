import { SESSION_SHELL_STATES } from '../auth/sessionShellState.js'
import { useSessionShell } from '../auth/SessionShellContext.jsx'
import { AccountSummary } from '../components/AccountSummary/index.js'
import { useI18n } from '../i18n/I18nProvider.jsx'
import './UserCabinetPage.css'

export function UserCabinetPage() {
  const { t } = useI18n()
  const { profile, shellState } = useSessionShell()
  const isLoading = shellState === SESSION_SHELL_STATES.RESTORING

  return (
    <div className="user-cabinet-page" data-testid="user-cabinet-page">
      <header className="user-cabinet-page__header">
        <h1 className="user-cabinet-page__title">{t('cabinet.page.title')}</h1>
      </header>

      {isLoading ? (
        <p className="user-cabinet-page__loading" data-testid="cabinet-shell-loading">
          {t('cabinet.shell.loading')}
        </p>
      ) : (
        <section
          className="user-cabinet-page__slot user-cabinet-page__slot--account"
          data-testid="cabinet-slot-account"
          aria-label={t('cabinet.section.account')}
        >
          <AccountSummary profile={profile} />
        </section>
      )}
    </div>
  )
}
