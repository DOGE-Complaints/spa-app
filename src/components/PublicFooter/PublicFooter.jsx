import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import './PublicFooter.css'

/**
 * Public Footer A (M131): brand + [TAGLINE_TBD] + About · Privacy · Contact.
 * Link hrefs are `#` placeholders until /about|/privacy|/contact routes exist.
 */
export function PublicFooter({ className = '' }) {
  const { t } = useI18n()

  return (
    <footer
      className={`public-footer app-shell__footer board-footer ${className}`.trim()}
      data-testid="public-footer"
      aria-label={t('publicHome.footer.brand')}
    >
      <div className="public-footer__inner">
        <div className="public-footer__brand-block" data-testid="public-footer-brand">
          <Link to="/board" className="public-footer__brand-link">
            <img
              src="/assets/DOGEstonia-logo-big.png"
              alt=""
              className="public-footer__logo"
              width={28}
              height={28}
              onError={(event) => {
                event.currentTarget.src = '/assets/DOGEstonia-logo-fallback.svg'
              }}
            />
            <span className="public-footer__brand-name">{t('publicHome.footer.brand')}</span>
          </Link>
          <p className="public-footer__tagline" data-testid="public-footer-tagline">
            {t('publicHome.footer.tagline')}
          </p>
        </div>

        <nav className="public-footer__links" data-testid="public-footer-links" aria-label={t('publicHome.footer.brand')}>
          <a href="#about" className="public-footer__link" data-testid="public-footer-about">
            {t('publicHome.footer.about')}
          </a>
          <span className="public-footer__sep" aria-hidden="true">
            ·
          </span>
          <a href="#privacy" className="public-footer__link" data-testid="public-footer-privacy">
            {t('publicHome.footer.privacy')}
          </a>
          <span className="public-footer__sep" aria-hidden="true">
            ·
          </span>
          <a href="#contact" className="public-footer__link" data-testid="public-footer-contact">
            {t('publicHome.footer.contact')}
          </a>
        </nav>
      </div>
    </footer>
  )
}
