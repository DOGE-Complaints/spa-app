import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { getDocumentTheme } from '../../theme/bootTheme.js'
import './PublicFooter.css'

/** NS-15: same OP tip family as Header · copy-only masters · no invent PNG. */
const BRAND_LOGO_LIGHT = '/assets/dogestonia-brand-light.png'
const BRAND_LOGO_DARK = '/assets/dogestonia-brand-dark.png'
const BRAND_LOGO_FALLBACK = '/assets/DOGEstonia-logo-fallback.svg'

function resolveBrandLogoSrc(theme) {
  return theme === 'light' ? BRAND_LOGO_LIGHT : BRAND_LOGO_DARK
}

/**
 * Public Footer (M131 / PH-03 · M166 / PH-11 · M169 / NS-14 · NS-15):
 * dual PNG brand · no adjacent text/tagline · About/Privacy/Contact.
 */
export function PublicFooter({ className = '' }) {
  const { t } = useI18n()
  const [documentTheme, setDocumentTheme] = useState(() => getDocumentTheme())
  const [logoFailed, setLogoFailed] = useState(false)
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

  return (
    <footer
      className={`public-footer app-shell__footer board-footer ${className}`.trim()}
      data-testid="public-footer"
      data-ph11="true"
      data-ns14="no-tagline"
      data-ns15="brand-png-dual"
      aria-label={t('publicHome.footer.brand')}
    >
      <div className="public-footer__inner">
        <div className="public-footer__brand-block" data-testid="public-footer-brand">
          <Link
            to="/next/feed"
            className="public-footer__brand-link"
            data-testid="public-footer-brand-link"
            aria-label={t('publicHome.footer.brandHomeAccessible')}
          >
            <img
              src={logoSrc}
              alt=""
              className="public-footer__logo"
              height={40}
              data-testid="public-footer-logo"
              data-ns15-logo={documentTheme}
              data-ns15-src={logoSrc}
              onError={() => setLogoFailed(true)}
            />
          </Link>
        </div>

        <nav
          className="public-footer__links"
          data-testid="public-footer-links"
          aria-label={t('publicHome.footer.navLabel')}
        >
          <Link to="/about" className="public-footer__link" data-testid="public-footer-about">
            {t('publicHome.footer.about')}
          </Link>
          <span className="public-footer__sep" aria-hidden="true">
            ·
          </span>
          <Link to="/privacy" className="public-footer__link" data-testid="public-footer-privacy">
            {t('publicHome.footer.privacy')}
          </Link>
          <span className="public-footer__sep" aria-hidden="true">
            ·
          </span>
          <Link to="/contact" className="public-footer__link" data-testid="public-footer-contact">
            {t('publicHome.footer.contact')}
          </Link>
        </nav>
      </div>
    </footer>
  )
}
