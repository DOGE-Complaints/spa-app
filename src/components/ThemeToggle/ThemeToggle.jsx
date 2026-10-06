import { useCallback, useEffect, useState } from 'react'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import {
  getDocumentTheme,
  setThemeAttribute,
} from '../../theme/bootTheme.js'
import './ThemeToggle.css'

/**
 * Public Header theme control (mockup-150).
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
      <span className="header-theme-toggle-text">
        {isDark ? t('appShell.theme.light') : t('appShell.theme.dark')}
      </span>
    </button>
  )
}
