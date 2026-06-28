import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const spaRoot = join(fileURLToPath(new URL('../../../', import.meta.url)))

const ALLOWLIST_SUFFIXES = ['src/auth/__tests__/debugIngestGuard.test.js']

const BANNED_RES = [
  /ingest\/4e2a7ee6/i,
  /X-Debug-Session-Id/i,
  /127\.0\.0\.1:7840\/ingest/i,
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

function scanFile(absPath, relPath, violations) {
  if (isAllowlisted(relPath)) return
  const content = readFileSync(absPath, 'utf8')
  for (const banned of BANNED_RES) {
    if (banned.test(content)) {
      violations.push(`${relPath}: ${banned}`)
    }
  }
}

describe('debug ingest guard', () => {
  it('bans debug-ingest patterns in src/', () => {
    const violations = []
    const srcRoot = join(spaRoot, 'src')

    for (const file of collectSourceFiles(srcRoot)) {
      const rel = relative(spaRoot, file).replace(/\\/g, '/')
      scanFile(file, rel, violations)
    }

    expect(violations, violations.join('\n')).toEqual([])
  })
})
