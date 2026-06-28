import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const distAssetsDir = join(process.cwd(), 'dist/assets')

const BANNED_PATTERNS = [
  { name: 'service_role substring', re: /service_role/i },
  { name: 'JWT service_role claim', re: /"role"\s*:\s*"service_role"/ },
]

function fail(message) {
  console.error(`[verify-bundle-no-service-role] ${message}`)
  process.exit(1)
}

if (!existsSync(distAssetsDir)) {
  fail('dist/assets missing — run `npm run build` first')
}

const jsFiles = readdirSync(distAssetsDir).filter((name) => name.endsWith('.js'))
if (jsFiles.length === 0) {
  fail('dist/assets has no .js files — run `npm run build` first')
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

if (violations.length > 0) {
  fail(`bundle contains service_role:\n${violations.join('\n')}`)
}

console.log('[verify-bundle-no-service-role] ok: bundle clean')
