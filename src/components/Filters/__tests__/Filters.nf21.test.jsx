/**
 * @vitest-environment jsdom
 * NF-21 — date native color-scheme follows data-theme (not hardcoded dark sole rule).
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('Filters NF-21 date color-scheme', () => {
  const css = readFileSync(resolve(process.cwd(), 'src/components/Filters/Filters.css'), 'utf8')

  it('binds .board-filter-date-native color-scheme to light and dark themes', () => {
    expect(css).toMatch(
      /\[data-theme=['"]light['"]\]\s+\.board-filter-date-native[\s\S]*?color-scheme:\s*light/,
    )
    expect(css).toMatch(
      /\[data-theme=['"]dark['"]\]\s+\.board-filter-date-native[\s\S]*?color-scheme:\s*dark/,
    )
  })

  it('does not keep hardcoded color-scheme dark as the sole rule on the base selector', () => {
    // Base block ends before theme selectors; must not be the only scheme rule.
    const baseMatch = css.match(
      /\.board-filter-date-native\s*\{[^}]*\}/,
    )
    expect(baseMatch).toBeTruthy()
    expect(baseMatch[0]).not.toMatch(/color-scheme:\s*dark/)
    expect(css).toMatch(/NF-21|color-scheme follows data-theme/i)
  })
})
