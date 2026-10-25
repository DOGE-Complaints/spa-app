import { useEffect, useId, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { getStoryGptHref, hasStoryGptUrl } from '../../config/storyGptUrl.js'
import { getDocumentTheme } from '../../theme/bootTheme.js'
import { ShellChromeIcon } from './ShellChromeIcon.jsx'
import './MobileAppBar.css'

const ICON_MENU = '/icons/next-shell/navigation/menu.svg'
const ICON_BACK = '/icons/next-shell/navigation/back.svg'
const ICON_CLOSE = '/icons/next-shell/actions/close.svg'
const BRAND_LOGO_LIGHT = '/assets/dogestonia-brand-light.png'
const BRAND_LOGO_DARK = '/assets/dogestonia-brand-dark.png'
const BRAND_LOGO_FALLBACK = '/assets/DOGEstonia-logo-fallback.svg'
const FEED_HOME = '/next/feed'
const PROFILE_HOME = '/profile'

function resolveBrandLogoSrc(theme) {
  return theme === 'light' ? BRAND_LOGO_LIGHT : BRAND_LOGO_DARK
}

function drawerNavClass({ isActive }) {
  return `mobile-app-bar__drawer-link${isActive ? ' mobile-app-bar__drawer-link--active' : ''}`
}

/**
 * NS-04 — compact mobile shell app bar.
 * NS-07 — theme-safe mask icons.
 * NS-17 — brand PNG (not WIP title) · left burger drawer IA · no invent Wallet.
 */
export function MobileAppBar({
  title,
  leadingAction = 'menu',
  onLeadingClick,
  className = '',
  showBrand = true,
}) {
  const { t } = useI18n()
  const drawerId = useId()
  const [documentTheme, setDocumentTheme] = useState(() => getDocumentTheme())
  const [logoFailed, setLogoFailed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const icon =
    leadingAction === 'back' ? ICON_BACK : leadingAction === 'close' ? ICON_CLOSE : ICON_MENU
  const leadingLabel =
    leadingAction === 'back'
      ? t('nextShell.mobile.back')
      : leadingAction === 'close'
        ? t('nextShell.mobile.close')
        : drawerOpen
          ? t('nextShell.header.menuClose')
          : t('nextShell.header.menuOpen')
  const logoSrc = logoFailed ? BRAND_LOGO_FALLBACK : resolveBrandLogoSrc(documentTheme)
  const submitHref = getStoryGptHref()
  const submitExternal = hasStoryGptUrl()
  const useDrawer = leadingAction === 'menu'
  const brandMode = showBrand && !title

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
    if (!drawerOpen) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKeyDown(event) {
      if (event.key === 'Escape') setDrawerOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [drawerOpen])

  function handleLeadingClick(event) {
    if (useDrawer) {
      setDrawerOpen((open) => !open)
    }
    onLeadingClick?.(event)
  }

  function closeDrawer() {
    setDrawerOpen(false)
  }

  return (
    <>
      <header
        className={`mobile-app-bar ${className}`.trim()}
        data-testid="mobile-app-bar"
        data-leading={leadingAction}
        data-lab-ns17="true"
        data-ns17-harmony="m177"
        data-ns17-drawer={drawerOpen ? 'open' : 'closed'}
      >
        <button
          type="button"
          className="mobile-app-bar__leading"
          data-testid="mobile-app-bar-leading"
          aria-label={leadingLabel}
          aria-expanded={useDrawer ? drawerOpen : undefined}
          aria-controls={useDrawer ? drawerId : undefined}
          onClick={handleLeadingClick}
        >
          <ShellChromeIcon src={icon} size={24} className="mobile-app-bar__icon" />
        </button>
        {brandMode ? (
          <Link
            to={FEED_HOME}
            className="mobile-app-bar__brand"
            data-testid="mobile-app-bar-brand"
            aria-label={t('nextShell.header.homeAria')}
          >
            <img
              src={logoSrc}
              alt=""
              className="mobile-app-bar__brand-logo"
              data-ns17-logo={documentTheme}
              data-ns17-src={logoSrc}
              onError={() => setLogoFailed(true)}
            />
          </Link>
        ) : (
          <p className="mobile-app-bar__title" data-testid="mobile-app-bar-title">
            {title ?? t('nextShell.wip.title')}
          </p>
        )}
      </header>

      {useDrawer && drawerOpen ? (
        <>
          <button
            type="button"
            className="mobile-app-bar__backdrop"
            data-testid="mobile-app-bar-drawer-backdrop"
            aria-label={t('nextShell.header.menuClose')}
            onClick={closeDrawer}
          />
          <aside
            id={drawerId}
            className="mobile-app-bar__drawer"
            data-testid="mobile-app-bar-drawer"
            data-lab-ns17-drawer="true"
            role="dialog"
            aria-modal="true"
            aria-label={t('nextShell.mobile.navAria')}
          >
            <div className="mobile-app-bar__drawer-header">
              <Link
                to={FEED_HOME}
                className="mobile-app-bar__drawer-brand"
                data-testid="mobile-app-bar-drawer-brand"
                aria-label={t('nextShell.header.homeAria')}
                onClick={closeDrawer}
              >
                <img
                  src={logoSrc}
                  alt=""
                  className="mobile-app-bar__brand-logo"
                  data-ns17-logo={documentTheme}
                  onError={() => setLogoFailed(true)}
                />
              </Link>
              <button
                type="button"
                className="mobile-app-bar__drawer-close"
                data-testid="mobile-app-bar-drawer-close"
                aria-label={t('nextShell.mobile.close')}
                onClick={closeDrawer}
              >
                <ShellChromeIcon src={ICON_CLOSE} size={24} />
              </button>
            </div>

            <nav className="mobile-app-bar__drawer-nav" aria-label={t('nextShell.mobile.navAria')}>
              <div className="mobile-app-bar__drawer-section" data-testid="mobile-app-bar-drawer-primary">
                <NavLink
                  to={PROFILE_HOME}
                  className={drawerNavClass}
                  data-testid="mobile-drawer-nav-account"
                  onClick={closeDrawer}
                >
                  {t('cabinet.section.account')}
                </NavLink>
                <NavLink
                  to={FEED_HOME}
                  end
                  className={drawerNavClass}
                  data-testid="mobile-drawer-nav-feed"
                  onClick={closeDrawer}
                >
                  {t('nextShell.rail.board')}
                </NavLink>
                <NavLink
                  to={PROFILE_HOME}
                  className={drawerNavClass}
                  data-testid="mobile-drawer-nav-my-stories"
                  onClick={closeDrawer}
                >
                  {t('nextShell.rail.myStories')}
                </NavLink>
              </div>

              <div className="mobile-app-bar__drawer-section" data-testid="mobile-app-bar-drawer-pages">
                <NavLink
                  to="/how-it-works"
                  className={drawerNavClass}
                  data-testid="mobile-drawer-nav-how-it-works"
                  onClick={closeDrawer}
                >
                  {t('publicHome.nav.howItWorks')}
                </NavLink>
                <NavLink
                  to="/about"
                  className={drawerNavClass}
                  data-testid="mobile-drawer-nav-about"
                  onClick={closeDrawer}
                >
                  {t('publicHome.footer.about')}
                </NavLink>
                <NavLink
                  to="/privacy"
                  className={drawerNavClass}
                  data-testid="mobile-drawer-nav-privacy"
                  onClick={closeDrawer}
                >
                  {t('publicHome.footer.privacy')}
                </NavLink>
                <NavLink
                  to="/contact"
                  className={drawerNavClass}
                  data-testid="mobile-drawer-nav-contact"
                  onClick={closeDrawer}
                >
                  {t('publicHome.footer.contact')}
                </NavLink>
              </div>
            </nav>

            <div className="mobile-app-bar__drawer-footer">
              <a
                href={submitHref}
                className="mobile-app-bar__drawer-cta"
                data-testid="mobile-drawer-cta-submit"
                aria-label={t('howItWorks.cta.submitAccessibleLabel')}
                rel={submitExternal ? 'noopener noreferrer' : undefined}
                target={submitExternal ? '_blank' : undefined}
                onClick={closeDrawer}
              >
                {t('publicHome.nav.submitStory')}
              </a>
            </div>
          </aside>
        </>
      ) : null}
    </>
  )
}
