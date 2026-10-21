import { useCallback, useEffect, useState } from 'react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import {
  getDocumentTheme,
  setThemeAttribute,
} from '../../theme/bootTheme.js'
import { ShellChromeIcon } from '../AppShell/ShellChromeIcon.jsx'
import './ThemeToggle.css'

const THEME_LIGHT_ICON = '/icons/next-shell/navigation/theme-light.svg'
const THEME_DARK_ICON = '/icons/next-shell/navigation/theme-dark.svg'

/**
 * Public Header theme control (mockup-150 + NS-02 next-shell glyphs).
 * Toggles light/dark; persists `dogestonia.theme`. No OS theme.
 */
export function ThemeToggle({ className = '' }) {
  const { t } = useI18n()
  const [theme, setTheme] = useState(() => getDocumentTheme())

  useEffect(() => {
    setTheme(getDocumentTheme())
  }, [])

  const onToggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setThemeAttribute(next, document, { persist: true })
    setTheme(next)
  }, [theme])

  const isDark = theme === 'dark'
  const label = isDark
    ? t('appShell.theme.switchToLight')
    : t('appShell.theme.switchToDark')
  const iconSrc = isDark ? THEME_LIGHT_ICON : THEME_DARK_ICON

  return (
    <button
      type="button"
      className={`header-theme-toggle ${className}`.trim()}
      data-testid="public-header-theme-toggle"
      aria-pressed={isDark}
      aria-label={label}
      title={label}
      onClick={onToggle}
    >
      <ShellChromeIcon src={iconSrc} size={16} className="header-theme-toggle-icon" />
      <span className="header-theme-toggle-text">
        {isDark ? t('appShell.theme.light') : t('appShell.theme.dark')}
      </span>
    </button>
  )
}
