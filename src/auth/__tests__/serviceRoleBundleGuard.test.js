import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const spaRoot = join(fileURLToPath(new URL('../../', import.meta.url)))
const distAssetsDir = join(spaRoot, 'dist/assets')

const BANNED_PATTERNS = [
  { name: 'service_role substring', re: /service_role/i },
  { name: 'JWT service_role claim', re: /"role"\s*:\s*"service_role"/ },
]

describe('service role bundle guard', () => {
  it('bans service_role in dist/assets when build output exists (audit F2)', () => {
    if (!existsSync(distAssetsDir)) {
      return
    }

    const jsFiles = readdirSync(distAssetsDir).filter((name) => name.endsWith('.js'))
    if (jsFiles.length === 0) {
      return
    }

    const violations = []

    for (const file of jsFiles) {
      const content = readFileSync(join(distAssetsDir, file), 'utf8')
      for (const pattern of BANNED_PATTERNS) {
        if (pattern.re.test(content)) {
          violations.push(`${file}: ${pattern.name}`)
        }
      }
    }

    expect(violations, violations.join('\n')).toEqual([])
  })
})
