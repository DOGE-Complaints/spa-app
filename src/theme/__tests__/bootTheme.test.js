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
  setThemeAttribute,
} from '../bootTheme.js'

const themeDir = path.dirname(fileURLToPath(import.meta.url))
const tokensCss = readFileSync(path.join(themeDir, '../../styles/tokens.css'), 'utf8')
const indexHtml = readFileSync(path.join(themeDir, '../../../index.html'), 'utf8')

describe('REQ21-03 theme scheme + boot', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.style.colorScheme = ''
  })

  it('tokens.css defines [data-theme=dark|light] + color-scheme (no OS prefers)', () => {
    expect(tokensCss).toMatch(/\[data-theme=['"]dark['"]\]/)
    expect(tokensCss).toMatch(/\[data-theme=['"]light['"]\]/)
    expect(tokensCss).toMatch(/color-scheme:\s*dark/)
    expect(tokensCss).toMatch(/color-scheme:\s*light/)
    expect(tokensCss).not.toMatch(/prefers-color-scheme/)
    expect(tokensCss).toMatch(/--color-bg-primary/)
    expect(tokensCss).toMatch(/--doge-bg/)
    expect(tokensCss).toMatch(/--button-primary-bg/)
    /* Light civic-yellow primary from package §4.1 */
    expect(tokensCss).toMatch(/#F5C542/)
    /* Dark signal-orange retained */
    expect(tokensCss).toMatch(/#F5A623/)
  })

  it('index.html early-sets data-theme dark before module (FOUC guard)', () => {
    expect(indexHtml).toMatch(/setAttribute\(['"]data-theme['"],\s*['"]dark['"]\)/)
    expect(indexHtml).toMatch(/REQ21-03/)
    expect(indexHtml).not.toMatch(/localStorage/)
  })

  it('applyDefaultTheme sets dark when unset (AC-SPA-REQ2103-03)', () => {
    expect(document.documentElement.getAttribute('data-theme')).toBeNull()
    expect(applyDefaultTheme(document)).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(document.documentElement.style.colorScheme).toBe('dark')
  })

  it('applyDefaultTheme does not overwrite existing light', () => {
    document.documentElement.setAttribute('data-theme', 'light')
    expect(applyDefaultTheme(document)).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('setThemeAttribute switches light/dark without persistence', () => {
    expect(setThemeAttribute('light', document)).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(document.documentElement.style.colorScheme).toBe('light')
    expect(setThemeAttribute('dark', document)).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('does not invent localStorage persistence (OOS → REQ21-04)', () => {
    expect(THEME_STORAGE_KEY).toBe('dogestonia.theme')
    applyDefaultTheme(document)
    setThemeAttribute('light', document)
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull()
  })
})
