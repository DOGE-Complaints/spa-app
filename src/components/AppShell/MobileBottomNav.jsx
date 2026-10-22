import { NavLink } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { ShellChromeIcon } from './ShellChromeIcon.jsx'
import './MobileBottomNav.css'

const ICON_BOARD = '/icons/next-shell/navigation/board.svg'
const ICON_PROFILE = '/icons/next-shell/navigation/profile.svg'

function navClass({ isActive }) {
  return `mobile-bottom-nav__item${isActive ? ' mobile-bottom-nav__item--active' : ''}`
}

/**
 * NS-04 — mobile bottom nav chrome-only (Component §11 subset · Feed + Profile).
 * NS-09 — soft label Feed (was Board). Tell-a-story / feed stress OOS → next-feed.
 * NS-07 — theme-safe mask icons.
 */
export function MobileBottomNav({ className = '' }) {
  const { t } = useI18n()

  return (
    <nav
      className={`mobile-bottom-nav ${className}`.trim()}
      data-testid="mobile-bottom-nav"
      aria-label={t('nextShell.mobile.navAria')}
    >
      <NavLink
        to="/next/feed"
        end
        className={navClass}
        data-testid="mobile-bottom-nav-board"
      >
        <ShellChromeIcon src={ICON_BOARD} size={24} className="mobile-bottom-nav__icon" />
        <span>{t('nextShell.mobile.navBoard')}</span>
      </NavLink>
      <NavLink to="/profile" className={navClass} data-testid="mobile-bottom-nav-profile">
        <ShellChromeIcon src={ICON_PROFILE} size={24} className="mobile-bottom-nav__icon" />
        <span>{t('nextShell.mobile.navProfile')}</span>
      </NavLink>
    </nav>
  )
}
