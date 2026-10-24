import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AccountControlSlot } from '../AccountControl/AccountControlSlot.jsx'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { getStoryGptHref, hasStoryGptUrl } from '../../config/storyGptUrl.js'
import { getDocumentTheme } from '../../theme/bootTheme.js'
import { LanguageSelector } from './LanguageSelector.jsx'
import { ShellChromeIcon } from './ShellChromeIcon.jsx'
import './Header.css'

const NEXT_SHELL_MENU_ICON = '/icons/next-shell/navigation/menu.svg'
const NEXT_SHELL_SEARCH_ICON = '/icons/next-shell/navigation/search.svg'
const NEXT_SHELL_NOTIFICATIONS_ICON = '/icons/next-shell/navigation/notifications.svg'
/** NS-13: hide search + notifications chrome; keep markup/handlers behind gate (do not delete). */
export const NS13_SHOW_SEARCH_NOTIFICATIONS = false
const FEED_HOME = '/next/feed'
/** NS-15: OP tip masters promoted to public/assets (copy only · no invent PNG). */
const BRAND_LOGO_LIGHT = '/assets/dogestonia-brand-light.png'
const BRAND_LOGO_DARK = '/assets/dogestonia-brand-dark.png'
const BRAND_LOGO_FALLBACK = '/assets/DOGEstonia-logo-fallback.svg'

function resolveBrandLogoSrc(theme) {
  return theme === 'light' ? BRAND_LOGO_LIGHT : BRAND_LOGO_DARK
}

function primaryNavClassName({ isActive }) {
  return `header-nav-item${isActive ? ' header-nav-item-active' : ''}`
}

/**
 * Public header chrome (M129 + NS-02 next-shell icons / brand → feed home).
 * Account slot host — default content = PH-02 AccountControl (override via accountSlot).
 */
export function Header({ className = '', accountSlot }) {
  const { t } = useI18n()
  const [documentTheme, setDocumentTheme] = useState(() => getDocumentTheme())
  const [logoFailed, setLogoFailed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const rootRef = useRef(null)
  const menuId = useId()
  const submitHref = getStoryGptHref()
  const submitExternal = hasStoryGptUrl()
  const logoSrc = logoFailed ? BRAND_LOGO_FALLBACK : resolveBrandLogoSrc(documentTheme)

  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    const root = document.documentElement
    const sync = () => {
      setDocumentTheme(getDocumentTheme())
      setLogoFailed(false)
    }
    sync()
    const obs = new MutationObserver(sync)
    obs.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined

    function onKeyDown(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    function onPointerDown(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  const navItems = (
    <>
      <NavLink
        to="/next/feed"
        end
        className={primaryNavClassName}
        data-testid="public-nav-dashboard"
        onClick={closeMenu}
      >
        {t('publicHome.nav.dashboard')}
      </NavLink>
      <NavLink
        to="/how-it-works"
        className={primaryNavClassName}
        data-testid="public-nav-how-it-works"
        onClick={closeMenu}
      >
        {t('publicHome.nav.howItWorks')}
      </NavLink>
      <a
        href={submitHref}
        className="header-nav-item header-nav-item--submit"
        data-testid="public-nav-submit"
        aria-label={t('howItWorks.cta.submitAccessibleLabel')}
        rel={submitExternal ? 'noopener noreferrer' : undefined}
        target={submitExternal ? '_blank' : undefined}
        onClick={closeMenu}
      >
        <span>{t('publicHome.nav.submitStory')}</span>
        {submitExternal ? (
          <img
            className="header-nav-external-icon"
            src="/icons/public-home/ic-external-link.png"
            alt=""
            aria-hidden="true"
          />
        ) : null}
      </a>
    </>
  )

  return (
    <div
      ref={rootRef}
      className={`public-header ${className}`.trim()}
      data-testid="public-header"
      data-menu-open={menuOpen ? 'yes' : 'no'}
      data-ns13={NS13_SHOW_SEARCH_NOTIFICATIONS ? 'search-notifications-on' : 'search-notifications-gated'}
    >
      <Link
        to={FEED_HOME}
        className="header-brand"
        data-testid="public-header-brand"
        data-ns10="brand"
        aria-label={t('nextShell.header.homeAria')}
        onClick={closeMenu}
      >
        <img
          src={logoSrc}
          alt="DOGEstonia logo"
          className="header-brand-logo"
          data-ns10-logo={documentTheme}
          data-ns10-src={logoSrc}
          data-ns15-logo={documentTheme}
          data-ns15-src={logoSrc}
          onError={() => setLogoFailed(true)}
        />
      </Link>

      <nav className="header-primary-nav" aria-label={t('appShell.aria.primaryNav')} data-testid="public-header-nav">
        {navItems}
      </nav>

      <div className="header-controls">
        {NS13_SHOW_SEARCH_NOTIFICATIONS ? (
          <button
            type="button"
            className="header-chrome-icon-btn"
            data-testid="public-header-search-affordance"
            aria-label={t('nextShell.header.searchAria')}
            title={t('nextShell.header.searchAria')}
          >
            <ShellChromeIcon src={NEXT_SHELL_SEARCH_ICON} size={20} className="header-chrome-icon" />
          </button>
        ) : null}
        <LanguageSelector />
        <ThemeToggle />
        {NS13_SHOW_SEARCH_NOTIFICATIONS ? (
          <button
            type="button"
            className="header-chrome-icon-btn"
            data-testid="public-header-notifications-chrome"
            aria-label={t('nextShell.header.notificationsAria')}
            title={t('nextShell.header.notificationsAria')}
          >
            <ShellChromeIcon src={NEXT_SHELL_NOTIFICATIONS_ICON} size={20} className="header-chrome-icon" />
          </button>
        ) : null}
        <div className="header-account-slot" data-testid="header-account-slot">
          {accountSlot !== undefined ? accountSlot : <AccountControlSlot />}
        </div>
        <button
          type="button"
          className="header-menu-toggle"
          data-testid="public-header-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? t('nextShell.header.menuClose') : t('nextShell.header.menuOpen')}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <ShellChromeIcon src={NEXT_SHELL_MENU_ICON} size={20} className="header-menu-toggle-icon" />
        </button>
      </div>

      {menuOpen ? (
        <nav
          id={menuId}
          className="header-mobile-nav"
          aria-label={t('appShell.aria.primaryNav')}
          data-testid="public-header-mobile-nav"
        >
          {navItems}
        </nav>
      ) : null}
    </div>
  )
}

/** Alias for M129 public chrome naming. */
export const PublicHeader = Header
