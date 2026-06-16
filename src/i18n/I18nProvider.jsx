import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { UI_DICTIONARY } from './dictionaries.js'
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  localeDictionaryFallbackOrder,
  resolveLanguage,
  resolveLocalizedText,
  resolveLocalizedTextWithMeta,
} from './core.js'

const I18nContext = createContext(null)

function readStoredLocale() {
  try {
    return localStorage.getItem(LOCALE_STORAGE_KEY)
  } catch {
    return null
  }
}

function detectInitialLocale() {
  const stored = readStoredLocale()
  if (stored) {
    return resolveLanguage([stored])
  }

  if (typeof navigator === 'undefined') {
    return DEFAULT_LOCALE
  }

  return resolveLanguage([...(navigator.languages || []), navigator.language].filter(Boolean))
}

function persistLocale(locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    // localStorage может быть недоступен в ограниченном окружении.
  }
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(() => detectInitialLocale())

  const setLocale = useCallback((nextLocale) => {
    const normalized = resolveLanguage([nextLocale])
    setLocaleState(normalized)
    persistLocale(normalized)
  }, [])

  const t = useCallback(
    (key) => {
      const parts = String(key).split('.')
      const fallbackChain = localeDictionaryFallbackOrder(locale).map(
        (code) => UI_DICTIONARY[code],
      )

      for (const dictionary of fallbackChain) {
        let current = dictionary
        for (const part of parts) {
          current = current?.[part]
        }

        if (typeof current === 'string') {
          return current
        }
      }

      return key
    },
    [locale],
  )

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      resolveLocalizedText: (field) => resolveLocalizedText(field, locale),
      resolveLocalizedTextWithMeta: (field) => resolveLocalizedTextWithMeta(field, locale),
    }),
    [locale, setLocale, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }

  return context
}
