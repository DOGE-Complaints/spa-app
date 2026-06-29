import { Link } from 'react-router-dom'
import { SESSION_SHELL_STATES } from '../../auth/sessionShellState.js'
import { formatI18nMessage } from '../../i18n/formatI18nMessage.js'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import './SessionShellState.css'

function ShellStatePanel({ title, message, code, children, state }) {
  const { t } = useI18n()

  return (
    <div
      className="session-shell-panel"
      data-session-shell-state={state}
      role="status"
      aria-live="polite"
    >
      <h2 className="session-shell-panel__title">{title}</h2>
      <p className="session-shell-panel__message">{message}</p>
      {code ? (
        <p className="session-shell-panel__code" data-testid="session-shell-code">
          {formatI18nMessage(t('session.shell.code'), { code })}
        </p>
      ) : null}
      <div className="session-shell-panel__actions">{children}</div>
    </div>
  )
}

export function RestoringSessionPanel() {
  const { t } = useI18n()

  return (
    <div
      className="session-shell-restoring"
      data-session-shell-state={SESSION_SHELL_STATES.RESTORING}
      data-testid="session-shell-restoring"
      role="status"
      aria-live="polite"
    >
      <h2 className="session-shell-panel__title">{t('session.restoring.title')}</h2>
      <p className="session-shell-panel__message">{t('session.restoring.desc')}</p>
      <p className="session-shell-panel__status">{t('session.restoring.status')}</p>
      <div className="session-shell-skeleton" aria-hidden="true">
        <div className="session-shell-skeleton__sidebar" />
        <div className="session-shell-skeleton__main">
          <div className="session-shell-skeleton__header" />
          <div className="session-shell-skeleton__card" />
          <div className="session-shell-skeleton__card" />
        </div>
      </div>
    </div>
  )
}

export function LoggedOutPanel() {
  const { t } = useI18n()

  return (
    <ShellStatePanel
      state={SESSION_SHELL_STATES.LOGGED_OUT}
      title={t('session.loggedOut.title')}
      message={t('session.loggedOut.desc')}
    >
      <Link to="/login" className="session-shell-button session-shell-button--primary">
        {t('session.cta.signIn')}
      </Link>
      <Link to="/login" className="session-shell-button session-shell-button--secondary">
        {t('session.cta.createAccount')}
      </Link>
      <Link to="/board" className="session-shell-link">
        {t('session.continuePublic')}
      </Link>
    </ShellStatePanel>
  )
}

export function SessionExpiredPanel() {
  const { t } = useI18n()

  return (
    <ShellStatePanel
      state={SESSION_SHELL_STATES.SESSION_EXPIRED}
      title={t('session.expired.title')}
      message={t('session.expired.desc')}
    >
      <div className="session-shell-context-block">
        <span className="session-shell-context-block__label">{t('session.expired.prevAction')}</span>
        <span className="session-shell-context-block__value">{t('session.expired.waiting')}</span>
      </div>
      <Link to="/login" className="session-shell-button session-shell-button--primary">
        {t('session.expired.signInAgain')}
      </Link>
      <Link to="/board" className="session-shell-button session-shell-button--secondary">
        {t('session.expired.returnPublic')}
      </Link>
    </ShellStatePanel>
  )
}

export function BackendUnavailablePanel({ onRetry, onViewStatus }) {
  const { t } = useI18n()

  return (
    <ShellStatePanel
      state={SESSION_SHELL_STATES.BACKEND_UNAVAILABLE}
      title={t('session.backend.title')}
      message={t('session.backend.desc')}
      code="BACKEND_UNAVAILABLE"
    >
      <button type="button" className="session-shell-button session-shell-button--primary" onClick={onRetry}>
        {t('session.cta.retry')}
      </button>
      <button type="button" className="session-shell-button session-shell-button--secondary" onClick={onViewStatus}>
        {t('session.viewStatus')}
      </button>
    </ShellStatePanel>
  )
}

export function NetworkErrorPanel({ onRetry }) {
  const { t } = useI18n()

  return (
    <ShellStatePanel
      state={SESSION_SHELL_STATES.NETWORK_ERROR}
      title={t('session.network.title')}
      message={t('session.network.desc')}
      code="NETWORK_ERROR"
    >
      <button type="button" className="session-shell-button session-shell-button--primary" onClick={onRetry}>
        {t('session.cta.retry')}
      </button>
    </ShellStatePanel>
  )
}
