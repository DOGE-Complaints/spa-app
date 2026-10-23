import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import './PublicFooter.css'

/**
 * Public Footer (M131 / PH-03 · M166 / PH-11 · M169 / NS-14): brand ≥40px · no tagline beside brand · About/Privacy/Contact.
 * NS-14: footer tagline omitted (M169). Dual transparent brand PNG masters still soft-BLOCK until clean assets Present.
 */
export function PublicFooter({ className = '' }) {
  const { t } = useI18n()

  return (
    <footer
      className={`public-footer app-shell__footer board-footer ${className}`.trim()}
      data-testid="public-footer"
      data-ph11="true"
      data-ns14="no-tagline"
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
              src="/assets/DOGEstonia-logo-big.png"
              alt=""
              className="public-footer__logo"
              width={40}
              height={40}
              data-testid="public-footer-logo"
              onError={(event) => {
                event.currentTarget.src = '/assets/DOGEstonia-logo-fallback.svg'
              }}
            />
            <span className="public-footer__brand-text">
              <span className="public-footer__brand-name">{t('publicHome.footer.brand')}</span>
            </span>
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
