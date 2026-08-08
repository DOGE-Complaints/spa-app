import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AccountControlSlot } from '../AccountControl/AccountControlSlot.jsx'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { getStoryGptHref, hasStoryGptUrl } from '../../config/storyGptUrl.js'
import { LanguageSelector } from './LanguageSelector.jsx'
import './Header.css'

function primaryNavClassName({ isActive }) {
  return `header-nav-item${isActive ? ' header-nav-item-active' : ''}`
}

/**
 * Public header chrome (M129): Brand | Primary nav | Session & locale.
 * Account slot host — default content = PH-02 AccountControl (override via accountSlot).
 */
export function Header({ className = '', accountSlot }) {
  const { t } = useI18n()
  const [logoSrc, setLogoSrc] = useState('/assets/DOGEstonia-logo-horizontal.png')
  const [menuOpen, setMenuOpen] = useState(false)
  const rootRef = useRef(null)
  const menuId = useId()
  const submitHref = getStoryGptHref()
  const submitExternal = hasStoryGptUrl()

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
        to="/board"
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
    >
      <Link to="/board" className="header-brand" data-testid="public-header-brand" onClick={closeMenu}>
        <img
          src={logoSrc}
          alt="DOGEstonia logo"
          className="header-brand-logo"
          onError={() => setLogoSrc('/assets/DOGEstonia-logo-fallback.svg')}
        />
      </Link>

      <nav className="header-primary-nav" aria-label={t('appShell.aria.primaryNav')} data-testid="public-header-nav">
        {navItems}
      </nav>

      <div className="header-controls">
        <div className="header-account-slot" data-testid="header-account-slot">
          {accountSlot !== undefined ? accountSlot : <AccountControlSlot />}
        </div>
        <LanguageSelector />
        <button
          type="button"
          className="header-menu-toggle"
          data-testid="public-header-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-label={menuOpen ? t('publicHome.nav.menuClose') : t('publicHome.nav.menuOpen')}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <img src="/icons/public-home/ic-nav-menu.png" alt="" className="header-menu-toggle-icon" />
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
