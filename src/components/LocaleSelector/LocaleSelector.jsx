import { useState } from 'react'
import { LOCALE_SELECTOR_MENU_OPTIONS, LOCALE_SELECTOR_OPTIONS } from '../../i18n/core.js'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { ShellChromeIcon } from '../AppShell/ShellChromeIcon.jsx'
import { Button, MenuAction } from '../Button'
import './LocaleSelector.css'

const CHEVRON_ICON = '/icons/next-shell/actions/chevron-down.svg'

const LOCALE_SELECTOR_VARIANTS = {
  default: {
    root: 'locale-selector',
    trigger: 'locale-selector__trigger',
    menu: 'locale-selector__menu',
    option: 'locale-selector__option',
    optionActive: 'locale-selector__option--active',
    optionFrozen: 'locale-selector__option--frozen',
    flag: 'locale-selector__flag',
    text: 'locale-selector__text',
    chevron: 'locale-selector__chevron',
  },
  header: {
    root: 'header-locale',
    trigger: 'header-locale-trigger',
    menu: 'header-locale-menu',
    option: 'header-locale-option',
    optionActive: 'header-locale-option-active',
    optionFrozen: 'header-locale-option-frozen',
    flag: 'header-locale-flag',
    text: 'header-locale-text',
    chevron: 'header-locale-chevron',
  },
}

export function LocaleSelector({ className = '', variant = 'default' }) {
  const { locale, setLocale, t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const classes = LOCALE_SELECTOR_VARIANTS[variant] ?? LOCALE_SELECTOR_VARIANTS.default
  const selected =
    LOCALE_SELECTOR_OPTIONS.find((option) => option.value === locale) ?? LOCALE_SELECTOR_OPTIONS[0]
  const esFrozenTooltip = t('nextShell.locale.esFrozenTooltip')

  function handleSelect(nextLocale, frozen) {
    if (frozen) return
    setLocale(nextLocale)
    setIsOpen(false)
  }

  return (
    <div
      className={`${classes.root} ${className}`.trim()}
      data-open={isOpen ? 'yes' : 'no'}
      data-testid="locale-selector"
      data-ns08="locale"
    >
      <Button
        type="button"
        hierarchy="tertiary"
        className={classes.trigger}
        ariaLabel="Language selector"
        aria-expanded={isOpen}
        data-testid="locale-selector-trigger"
        onClick={() => setIsOpen(!isOpen)}
        leadingIcon={<img src={selected.flagSrc} alt="" className={classes.flag} />}
        trailingIcon={
          <ShellChromeIcon
            src={CHEVRON_ICON}
            size={12}
            className={[classes.chevron, isOpen ? `${classes.chevron}--open` : ''].filter(Boolean).join(' ')}
            testId="locale-selector-chevron"
          />
        }
      >
        {selected.nativeLabel}
      </Button>
      {isOpen ? (
        <ul className={classes.menu} role="listbox" aria-label="Locale options" data-testid="locale-selector-menu">
          {LOCALE_SELECTOR_MENU_OPTIONS.map((option) => {
            const frozen = Boolean(option.frozen)
            const optionClass = [
              classes.option,
              locale === option.value ? classes.optionActive : '',
              frozen ? classes.optionFrozen : '',
            ]
              .filter(Boolean)
              .join(' ')
            return (
              <li
                key={option.value}
                title={frozen ? esFrozenTooltip : undefined}
                data-locale={option.value}
                data-ns08-frozen={frozen ? 'true' : undefined}
              >
                <MenuAction
                  intent="action"
                  className={optionClass}
                  disabled={frozen}
                  title={frozen ? esFrozenTooltip : undefined}
                  aria-label={
                    frozen ? `${option.nativeLabel}. ${esFrozenTooltip}` : undefined
                  }
                  data-testid={frozen ? 'locale-option-es-frozen' : `locale-option-${option.value}`}
                  onSelect={() => handleSelect(option.value, frozen)}
                  icon={
                    option.flagSrc ? (
                      <img src={option.flagSrc} alt="" className={classes.flag} />
                    ) : (
                      <span className={`${classes.flag} ${classes.flag}--omit`} aria-hidden="true" data-ns08-flag="omit" />
                    )
                  }
                >
                  <span className={classes.text}>{option.nativeLabel}</span>
                </MenuAction>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
