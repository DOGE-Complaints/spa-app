import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { COUNTRIES, getCountryLabel, isSupportedDialPrefix } from '../../utils/countriesDataset.js'

/**
 * @param {{
 *   selectedCountry: import('../../utils/countriesDataset.js').CountryRecord,
 *   onSelect: (country: import('../../utils/countriesDataset.js').CountryRecord) => void,
 * }} props
 */
/** DS-BTN: combobox/listbox exception (G10 T11) — not product CTA; keep native buttons. */
export function CountrySelector({ selectedCountry, onSelect }) {
  const { t, locale } = useI18n()
  const listboxId = useId()
  const rootRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const filteredCountries = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return COUNTRIES
    return COUNTRIES.filter((country) => {
      const label = getCountryLabel(country, locale).toLowerCase()
      return (
        label.includes(normalized) ||
        country.dialPrefix.includes(normalized) ||
        country.code.toLowerCase().includes(normalized)
      )
    })
  }, [locale, query])

  useEffect(() => {
    if (!open) return undefined
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query, open])

  const selectCountry = (country) => {
    onSelect(country)
    setOpen(false)
    setQuery('')
  }

  const handleTriggerKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen(true)
    }
  }

  const getOptionId = (countryCode) => `${listboxId}-option-${countryCode}`

  const activeCountry = filteredCountries[activeIndex]
  const activeDescendantId = activeCountry ? getOptionId(activeCountry.code) : undefined

  const handleListKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
      setQuery('')
      return
    }
    if (event.key === 'Tab') {
      const focusables = rootRef.current?.querySelectorAll(
        '.phone-country-selector__dropdown input, .phone-country-selector__dropdown button[role="option"]',
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => Math.min(index + 1, filteredCountries.length - 1))
      return
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => Math.max(index - 1, 0))
      return
    }
    if (event.key === 'Enter' && filteredCountries[activeIndex]) {
      event.preventDefault()
      selectCountry(filteredCountries[activeIndex])
    }
  }

  return (
    <div className="phone-country-selector" ref={rootRef}>
      <button
        type="button"
        className="phone-country-selector__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        data-testid="phone-country-selector-trigger"
        onClick={() => setOpen((value) => !value)}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className="phone-country-selector__flag" aria-hidden="true">
          {selectedCountry.flag}
        </span>
        <span className="phone-country-selector__label">
          {getCountryLabel(selectedCountry, locale)}
        </span>
        <span className="phone-country-selector__dial" aria-hidden="true">
          {selectedCountry.dialPrefix}
        </span>
        <span className="phone-country-selector__chevron" aria-hidden="true">
          ▾
        </span>
      </button>

      {open ? (
        <div
          className="phone-country-selector__dropdown"
          data-testid="phone-country-selector-dropdown"
          onKeyDown={handleListKeyDown}
        >
          <div className="phone-country-selector__search-wrap">
            <input
              type="search"
              className="phone-country-selector__search"
              role="combobox"
              aria-autocomplete="list"
              aria-controls={listboxId}
              aria-expanded={open}
              aria-activedescendant={activeDescendantId}
              placeholder={t('phone.country.search')}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              data-testid="phone-country-selector-search"
              autoFocus
            />
          </div>
          <p className="phone-country-selector__dropdown-title">{t('phone.country.chooseTitle')}</p>
          <ul className="phone-country-selector__list" id={listboxId} role="listbox">
            {filteredCountries.map((country, index) => {
              const supported = isSupportedDialPrefix(country.dialPrefix)
              const selected = country.code === selectedCountry.code
              return (
                <li key={country.code} role="presentation">
                  <button
                    type="button"
                    id={getOptionId(country.code)}
                    role="option"
                    aria-selected={selected}
                    className={`phone-country-selector__option${
                      selected ? ' phone-country-selector__option--selected' : ''
                    }${index === activeIndex ? ' phone-country-selector__option--active' : ''}`}
                    data-testid={`phone-country-option-${country.code}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => selectCountry(country)}
                  >
                    <span className="phone-country-selector__flag" aria-hidden="true">
                      {country.flag}
                    </span>
                    <span className="phone-country-selector__option-label">
                      {getCountryLabel(country, locale)}
                    </span>
                    <span className="phone-country-selector__option-dial">{country.dialPrefix}</span>
                    <span
                      className={`phone-country-selector__badge${
                        supported
                          ? ' phone-country-selector__badge--supported'
                          : ' phone-country-selector__badge--soon'
                      }`}
                    >
                      {supported ? t('phone.country.badgeSupported') : t('phone.country.badgeAvailableSoon')}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
