import { getLocaleEndonym } from '../../i18n/translationMarkers.js'
import './TranslationMarker.css'

/**
 * @param {{ kind: 'mt' | 'fallback' | 'untranslated-label', locale?: string, resolvedLocale?: string, t: (k: string) => string, className?: string }} props
 */
export function TranslationMarker({ kind, locale, resolvedLocale, t, className = '' }) {
  let label = ''
  if (kind === 'mt') {
    label = t('markers.machineTranslation')
  } else if (kind === 'fallback' && resolvedLocale) {
    label = `${t('markers.shownInPrefix')} ${getLocaleEndonym(resolvedLocale)}`
  } else if (kind === 'untranslated-label') {
    label = t('markers.untranslatedLabel')
  }

  if (!label) return null

  return (
    <span
      className={['translation-marker', `translation-marker-${kind}`, className].filter(Boolean).join(' ')}
      data-marker-kind={kind}
      data-locale={locale}
    >
      {label}
    </span>
  )
}
