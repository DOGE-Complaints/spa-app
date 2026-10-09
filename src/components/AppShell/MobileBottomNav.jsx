import { NavLink } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import './MobileBottomNav.css'

const ICON_BOARD = '/icons/next-shell/navigation/board.svg'
const ICON_PROFILE = '/icons/next-shell/navigation/profile.svg'

function navClass({ isActive }) {
  return `mobile-bottom-nav__item${isActive ? ' mobile-bottom-nav__item--active' : ''}`
}

/**
 * NS-04 — mobile bottom nav chrome-only (Component §11 subset · Board + Profile).
 * Tell-a-story / feed stress OOS → next-feed.
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
        <img src={ICON_BOARD} alt="" width={24} height={24} className="mobile-bottom-nav__icon" />
        <span>{t('nextShell.mobile.navBoard')}</span>
      </NavLink>
      <NavLink to="/profile" className={navClass} data-testid="mobile-bottom-nav-profile">
        <img src={ICON_PROFILE} alt="" width={24} height={24} className="mobile-bottom-nav__icon" />
        <span>{t('nextShell.mobile.navProfile')}</span>
      </NavLink>
    </nav>
  )
}
