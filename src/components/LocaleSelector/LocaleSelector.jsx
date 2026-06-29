import { useState } from 'react'
import { LOCALE_SELECTOR_OPTIONS } from '../../i18n/core.js'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import './LocaleSelector.css'

export function LocaleSelector({ className = '' }) {
  const { locale, setLocale } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const selected =
    LOCALE_SELECTOR_OPTIONS.find((option) => option.value === locale) ?? LOCALE_SELECTOR_OPTIONS[0]

  function handleSelect(nextLocale) {
    setLocale(nextLocale)
    setIsOpen(false)
  }

  return (
    <div className={`locale-selector ${className}`.trim()} data-open={isOpen ? 'yes' : 'no'}>
      <button
        type="button"
        className="locale-selector__trigger"
        aria-label="Language selector"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={selected.flagSrc} alt="" className="locale-selector__flag" />
        <span className="locale-selector__text">{selected.nativeLabel}</span>
        <span aria-hidden="true">{isOpen ? '^' : 'v'}</span>
      </button>
      {isOpen ? (
        <ul className="locale-selector__menu" role="listbox" aria-label="Locale options">
          {LOCALE_SELECTOR_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={`locale-selector__option ${locale === option.value ? 'locale-selector__option--active' : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                <img src={option.flagSrc} alt="" className="locale-selector__flag" />
                <span className="locale-selector__text">{option.nativeLabel}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
