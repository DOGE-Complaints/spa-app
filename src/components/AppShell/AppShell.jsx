import { LocaleSelector } from '../LocaleSelector/LocaleSelector.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import './AppShell.css'

/**
 * Shared DOGEstonia app shell (M124 §6): logo, sidebar, header, footer slots.
 */
export function AppShell({ header, sidebar, footer, children, className = '' }) {
  const { t } = useI18n()

  return (
    <div className={`app-shell ${className}`.trim()} data-testid="app-shell">
      <header className="app-shell__header header-strip" aria-label={t('appShell.aria.header')}>
        {header ?? (
          <div className="app-shell__header-default">
            <div className="header-brand">
              <img
                src="/assets/DOGEstonia-logo-big.png"
                alt={t('auth.brand.logoAlt')}
                className="header-brand-logo"
                onError={(event) => {
                  event.currentTarget.src = '/assets/DOGEstonia-logo-fallback.svg'
                }}
              />
            </div>
            <LocaleSelector className="app-shell__locale" />
          </div>
        )}
      </header>

      <div className="app-shell__body board-main">
        <aside className="app-shell__sidebar board-sidebar" aria-label={t('appShell.aria.sidebar')}>
          {sidebar ?? (
            <>
              <p className="board-sidebar-workspace">{t('appShell.nav.workspace')}</p>
              <nav className="board-nav" aria-label={t('appShell.aria.primaryNav')}>
                <span className="board-nav-item board-nav-item-active">{t('appShell.nav.board')}</span>
              </nav>
            </>
          )}
        </aside>

        <section className="app-shell__main board-workspace">{children}</section>
      </div>

      <footer className="app-shell__footer board-footer" aria-label={t('appShell.aria.systemStatus')}>
        {footer ?? <span>{t('appShell.footer')}</span>}
      </footer>
    </div>
  )
}
