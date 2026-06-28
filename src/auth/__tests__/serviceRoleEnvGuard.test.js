import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const spaRoot = join(fileURLToPath(new URL('../../../', import.meta.url)))

const TRACKED_ROOT_FILES = ['.env.example', 'package.json']

const ALLOWLIST_SUFFIXES = ['src/auth/__tests__/serviceRoleEnvGuard.test.js']

const BANNED_RE = /VITE_[A-Z0-9_]*SERVICE_ROLE/i

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

function scanEnvExample(absPath, relPath, violations) {
  const lines = readFileSync(absPath, 'utf8').split('\n')
  lines.forEach((line, index) => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) return
    if (BANNED_RE.test(line)) {
      violations.push(`${relPath}:${index + 1}: VITE_*SERVICE_ROLE*`)
    }
  })
}

function collectLocalEnvFiles(root) {
  if (!existsSync(root)) return []
  return readdirSync(root)
    .filter((name) => name === '.env' || name.startsWith('.env.'))
    .map((name) => join(root, name))
}

function scanFile(absPath, relPath, violations) {
  if (isAllowlisted(relPath)) return
  if (relPath === '.env.example') {
    scanEnvExample(absPath, relPath, violations)
    return
  }
  const content = readFileSync(absPath, 'utf8')
  if (BANNED_RE.test(content)) {
    violations.push(`${relPath}: VITE_*SERVICE_ROLE*`)
  }
}

describe('service role env guard', () => {
  it('bans VITE_*SERVICE_ROLE* in tracked env example, package.json, and src/', () => {
    const violations = []

    for (const name of TRACKED_ROOT_FILES) {
      const abs = join(spaRoot, name)
      if (!existsSync(abs)) continue
      scanFile(abs, name, violations)
    }

    const srcRoot = join(spaRoot, 'src')
    for (const file of collectSourceFiles(srcRoot)) {
      const rel = relative(spaRoot, file).replace(/\\/g, '/')
      scanFile(file, rel, violations)
    }

    expect(violations, violations.join('\n')).toEqual([])
  })

  it('bans VITE_*SERVICE_ROLE* in local .env* when present (audit F1)', () => {
    const violations = []

    for (const abs of collectLocalEnvFiles(spaRoot)) {
      const rel = relative(spaRoot, abs).replace(/\\/g, '/')
      scanEnvExample(abs, rel, violations)
    }

    expect(violations, violations.join('\n')).toEqual([])
  })
})
