import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const srcRoot = join(fileURLToPath(new URL('../../', import.meta.url)))

const ALLOWLIST_SUFFIXES = [
  'i18n/core.js',
  'i18n/dictionaries.js',
  'router/mockIssues.js',
]

const BANNED_PATTERNS = [
  { name: 'LANGUAGE_OPTIONS', re: /LANGUAGE_OPTIONS/ },
  { name: 'STATUS_LABELS', re: /STATUS_LABELS/ },
  {
    name: 'hardcoded locale code array',
    re: /\[\s*['"]et['"]\s*,\s*['"]ru['"]\s*,\s*['"]en['"]\s*\]/,
  },
  {
    name: 'duplicated language selector shape',
    re: /nativeLabel:\s*['"][^'"]+['"]\s*,\s*flagSrc:/,
  },
]

function collectSourceFiles(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) {
      if (name === '__tests__') continue
      collectSourceFiles(full, acc)
      continue
    }
    if (/\.(js|jsx)$/.test(name)) acc.push(full)
  }
  return acc
}

function isAllowlisted(relPath) {
  return ALLOWLIST_SUFFIXES.some((suffix) => relPath.endsWith(suffix))
}

describe('locale hardcode guard', () => {
  it('bans locale-hardcode patterns outside registry/dictionary/content allowlist', () => {
    const violations = []

    for (const file of collectSourceFiles(srcRoot)) {
      const rel = relative(srcRoot, file).replace(/\\/g, '/')
      if (isAllowlisted(rel)) continue

      const content = readFileSync(file, 'utf8')
      for (const pattern of BANNED_PATTERNS) {
        if (pattern.re.test(content)) {
          violations.push(`${rel}: ${pattern.name}`)
        }
      }
    }

    expect(violations, violations.join('\n')).toEqual([])
  })
})
