import { NavLink } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { ShellChromeIcon } from './ShellChromeIcon.jsx'
import './MobileBottomNav.css'

const ICON_BOARD = '/icons/next-shell/navigation/board.svg'
const ICON_PROFILE = '/icons/next-shell/navigation/profile.svg'
const ICON_WALLET = '/icons/next-shell/navigation/wallet-doge.svg'

function navClass({ isActive }) {
  return `mobile-bottom-nav__item${isActive ? ' mobile-bottom-nav__item--active' : ''}`
}

/**
 * NS-04 — mobile bottom nav chrome-only (Component §11 subset · Feed + Profile).
 * NS-09 — soft label Feed (was Board). Tell-a-story / feed stress OOS → next-feed.
 * NS-12 — soft: no My stories affordance (Feed + Profile live · held).
 * NS-07 — theme-safe mask icons.
 * NS-19 / M179 — compact density · frozen Wallet slot · no CAB-08 unfreeze · no Wallet API/route.
 */
export function MobileBottomNav({ className = '' }) {
  const { t } = useI18n()
  const walletLabel = t('cabinet.section.wallet')
  const comingSoon = t('cabinet.common.comingSoon')

  return (
    <nav
      className={`mobile-bottom-nav ${className}`.trim()}
      data-testid="mobile-bottom-nav"
      data-lab-ns19="true"
      data-ns19-harmony="m179"
      data-ns12="no-my-stories"
      data-ns19-cab08="held"
      aria-label={t('nextShell.mobile.navAria')}
    >
      <NavLink
        to="/next/feed"
        end
        className={navClass}
        data-testid="mobile-bottom-nav-board"
      >
        <ShellChromeIcon src={ICON_BOARD} size={20} className="mobile-bottom-nav__icon" />
        <span>{t('nextShell.mobile.navBoard')}</span>
      </NavLink>
      <NavLink to="/profile" className={navClass} data-testid="mobile-bottom-nav-profile">
        <ShellChromeIcon src={ICON_PROFILE} size={20} className="mobile-bottom-nav__icon" />
        <span>{t('nextShell.mobile.navProfile')}</span>
      </NavLink>
      <span
        className="mobile-bottom-nav__item mobile-bottom-nav__item--frozen"
        data-testid="mobile-bottom-nav-wallet"
        data-ns19-wallet="frozen"
        role="link"
        aria-disabled="true"
        aria-label={`${walletLabel}. ${comingSoon}`}
        title={comingSoon}
      >
        <ShellChromeIcon
          src={ICON_WALLET}
          size={20}
          className="mobile-bottom-nav__icon"
          testId="mobile-bottom-nav-wallet-icon"
        />
        <span>{walletLabel}</span>
      </span>
    </nav>
  )
}
