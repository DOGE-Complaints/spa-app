/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import { act, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nProvider, syncDocumentElementLang, useI18n } from '../I18nProvider.jsx'

function mountI18nProbe() {
  const container = document.createElement('div')
  const root = createRoot(container)
  const state = { current: null }

  function Probe() {
    state.current = useI18n()
    return null
  }

  act(() => {
    root.render(createElement(I18nProvider, null, createElement(Probe)))
  })

  return {
    get current() {
      return state.current
    },
    unmount() {
      act(() => root.unmount())
    },
  }
}

describe('I18nProvider document lang sync', () => {
  it('syncDocumentElementLang sets html lang attribute', () => {
    syncDocumentElementLang('ru')
    expect(document.documentElement.lang).toBe('ru')
    syncDocumentElementLang('et')
    expect(document.documentElement.lang).toBe('et')
  })

  it('updates document.documentElement.lang when locale changes', () => {
    localStorage.setItem('doge.locale', 'en')
    const probe = mountI18nProbe()

    expect(document.documentElement.lang).toBe('en')

    act(() => {
      probe.current.setLocale('ru')
    })

    expect(document.documentElement.lang).toBe('ru')

    probe.unmount()
    localStorage.removeItem('doge.locale')
  })

  it('syncs document lang on initial mount from stored locale', () => {
    localStorage.setItem('doge.locale', 'ru')
    const probe = mountI18nProbe()
    expect(document.documentElement.lang).toBe('ru')
    probe.unmount()
    localStorage.removeItem('doge.locale')
  })
})
