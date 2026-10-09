import { NavLink } from 'react-router-dom'
import { LocaleSelector } from '../LocaleSelector/LocaleSelector.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import './AppShell.css'

function navItemClassName({ isActive }) {
  return `board-nav-item${isActive ? ' board-nav-item-active' : ''}`
}

/**
 * Shared DOGEstonia app shell (M124 §6): logo, sidebar, header, footer slots.
 * @param {{ showSidebar?: boolean, showRightSlot?: boolean, rightSlot?: import('react').ReactNode, mobileTop?: import('react').ReactNode, mobileBottom?: import('react').ReactNode }} props
 * — showSidebar false omits left aside (PH-09). showRightSlot = empty/omit right column host (NS-04 Q16 · no product module).
 */
export function AppShell({
  header,
  sidebar,
  footer,
  showFooter = true,
  showSidebar = true,
  showRightSlot = false,
  rightSlot = null,
  mobileTop = null,
  mobileBottom = null,
  children,
  className = '',
}) {
  const { t } = useI18n()
  const bodyClassName = [
    'app-shell__body',
    'board-main',
    showSidebar ? null : 'board-main--no-sidebar',
    showRightSlot ? 'board-main--with-right' : null,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={`app-shell ${className}`.trim()} data-testid="app-shell">
      {mobileTop}
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

      <div
        className={bodyClassName}
        data-show-sidebar={showSidebar ? 'yes' : 'no'}
        data-right-slot={showRightSlot ? 'yes' : 'no'}
      >
        {showSidebar ? (
          <aside className="app-shell__sidebar board-sidebar" aria-label={t('appShell.aria.sidebar')}>
            {sidebar ?? (
              <>
                <p className="board-sidebar-workspace">{t('appShell.nav.workspace')}</p>
                <nav className="board-nav" aria-label={t('appShell.aria.primaryNav')}>
                  <NavLink to="/board" className={navItemClassName} data-testid="app-shell-nav-board" end>
                    {t('appShell.nav.board')}
                  </NavLink>
                  <NavLink to="/profile" className={navItemClassName} data-testid="app-shell-nav-profile">
                    {t('appShell.nav.profile')}
                  </NavLink>
                </nav>
              </>
            )}
          </aside>
        ) : null}

        <section className="app-shell__main board-workspace">{children}</section>

        {showRightSlot ? (
          <aside
            className="app-shell__right next-shell-right-slot"
            data-testid="next-shell-right-slot"
            aria-hidden={rightSlot == null ? 'true' : undefined}
          >
            {rightSlot}
          </aside>
        ) : null}
      </div>

      {mobileBottom}

      {showFooter ? (
        footer !== undefined && footer !== null ? (
          footer
        ) : (
          <footer className="app-shell__footer board-footer" aria-label={t('appShell.aria.systemStatus')}>
            <span>{t('appShell.footer')}</span>
          </footer>
        )
      ) : null}
    </div>
  )
}
