import { LocaleSelector } from '../LocaleSelector/LocaleSelector.jsx'

/**
 * Board/Issue header chrome locale control (flag + native label).
 * Re-exports LocaleSelector for cabinet / default AppShell consumers.
 */
export function LanguageSelector({ className = '' }) {
  return <LocaleSelector className={className} variant="header" />
}

export { LocaleSelector }
