/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import {
  THEME_STORAGE_KEY,
  applyDefaultTheme,
  getDocumentTheme,
  readStoredTheme,
  setThemeAttribute,
  writeStoredTheme,
} from '../bootTheme.js'

const themeDir = path.dirname(fileURLToPath(import.meta.url))
const tokensCss = readFileSync(path.join(themeDir, '../../styles/tokens.css'), 'utf8')
const indexHtml = readFileSync(path.join(themeDir, '../../../index.html'), 'utf8')

describe('REQ21-03/04 theme scheme + boot + persistence', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.style.colorScheme = ''
    localStorage.clear()
  })

  it('tokens.css defines [data-theme=dark|light] + color-scheme (no OS prefers)', () => {
    expect(tokensCss).toMatch(/\[data-theme=['"]dark['"]\]/)
    expect(tokensCss).toMatch(/\[data-theme=['"]light['"]\]/)
    expect(tokensCss).toMatch(/color-scheme:\s*dark/)
    expect(tokensCss).toMatch(/color-scheme:\s*light/)
    expect(tokensCss).not.toMatch(/prefers-color-scheme/)
  })

  it('index.html FOUC reads dogestonia.theme or defaults dark', () => {
    expect(indexHtml).toMatch(/dogestonia\.theme/)
    expect(indexHtml).toMatch(/localStorage/)
    expect(indexHtml).not.toMatch(/prefers-color-scheme/)
  })

  it('applyDefaultTheme sets dark when unset and no storage', () => {
    expect(applyDefaultTheme(document)).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('applyDefaultTheme prefers stored light', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'light')
    expect(applyDefaultTheme(document)).toBe('light')
    expect(getDocumentTheme(document)).toBe('light')
  })

  it('setThemeAttribute without persist does not write storage', () => {
    setThemeAttribute('light', document)
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull()
  })

  it('setThemeAttribute with persist writes dogestonia.theme', () => {
    expect(setThemeAttribute('light', document, { persist: true })).toBe('light')
    expect(readStoredTheme()).toBe('light')
    expect(setThemeAttribute('dark', document, { persist: true })).toBe('dark')
    expect(writeStoredTheme('light')).toBe('light')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light')
  })
})
