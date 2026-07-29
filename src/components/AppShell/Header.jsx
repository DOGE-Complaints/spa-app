import { useState } from 'react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { LanguageSelector } from './LanguageSelector.jsx'

/**
 * Board/Issue header chrome: brand logo + sync status + flag locale selector.
 */
export function Header({ syncLabel, className = '' }) {
  const { t } = useI18n()
  const [logoSrc, setLogoSrc] = useState('/assets/DOGEstonia-logo-big.png')

  return (
    <>
      <div className={`header-brand ${className}`.trim()}>
        <img
          src={logoSrc}
          alt="DOGEstonia logo"
          className="header-brand-logo"
          onError={() => setLogoSrc('/assets/DOGEstonia-logo-fallback.svg')}
        />
      </div>

      <div className="header-controls">
        <span className="header-status" aria-label="Sync status">
          {syncLabel ?? t('synced')}
        </span>
        <LanguageSelector />
      </div>
    </>
  )
}
