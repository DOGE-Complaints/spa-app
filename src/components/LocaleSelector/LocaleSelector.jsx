import { useState } from 'react'
import { LOCALE_SELECTOR_OPTIONS } from '../../i18n/core.js'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { Button, MenuAction } from '../Button'
import './LocaleSelector.css'

const LOCALE_SELECTOR_VARIANTS = {
  default: {
    root: 'locale-selector',
    trigger: 'locale-selector__trigger',
    menu: 'locale-selector__menu',
    option: 'locale-selector__option',
    optionActive: 'locale-selector__option--active',
    flag: 'locale-selector__flag',
    text: 'locale-selector__text',
  },
  header: {
    root: 'header-locale',
    trigger: 'header-locale-trigger',
    menu: 'header-locale-menu',
    option: 'header-locale-option',
    optionActive: 'header-locale-option-active',
    flag: 'header-locale-flag',
    text: 'header-locale-text',
  },
}

export function LocaleSelector({ className = '', variant = 'default' }) {
  const { locale, setLocale } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const classes = LOCALE_SELECTOR_VARIANTS[variant] ?? LOCALE_SELECTOR_VARIANTS.default
  const selected =
    LOCALE_SELECTOR_OPTIONS.find((option) => option.value === locale) ?? LOCALE_SELECTOR_OPTIONS[0]

  function handleSelect(nextLocale) {
    setLocale(nextLocale)
    setIsOpen(false)
  }

  return (
    <div className={`${classes.root} ${className}`.trim()} data-open={isOpen ? 'yes' : 'no'}>
      <Button
        type="button"
        hierarchy="tertiary"
        className={classes.trigger}
        ariaLabel="Language selector"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        leadingIcon={<img src={selected.flagSrc} alt="" className={classes.flag} />}
        trailingIcon={<span aria-hidden="true">{isOpen ? '^' : 'v'}</span>}
      >
        {selected.nativeLabel}
      </Button>
      {isOpen ? (
        <ul className={classes.menu} role="listbox" aria-label="Locale options">
          {LOCALE_SELECTOR_OPTIONS.map((option) => (
            <li key={option.value}>
              <MenuAction
                intent="action"
                className={`${classes.option} ${locale === option.value ? classes.optionActive : ''}`}
                onSelect={() => handleSelect(option.value)}
                icon={<img src={option.flagSrc} alt="" className={classes.flag} />}
              >
                {option.nativeLabel}
              </MenuAction>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
