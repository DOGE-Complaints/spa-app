import { execSync } from 'node:child_process'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const distAssetsDir = join(process.cwd(), 'dist/assets')

const FORBIDDEN_LOCALHOST = [
  '127.0.0.1:8000',
  '127.0.0.1:8100',
  'localhost:8000',
  'localhost:8100',
  'http://127.0.0.1:8000',
  'http://127.0.0.1:8100',
]

function fail(message) {
  console.error(`[verify-build-env-bake] ${message}`)
  process.exit(1)
}

const gatewayUrl = String(process.env.VITE_GATEWAY_BASE_URL ?? '').trim()
const identityUrl = String(process.env.VITE_IDENTITY_SERVICE_URL ?? '').trim()
const supabaseUrl = String(process.env.VITE_SUPABASE_URL ?? '').trim()
const supabaseAnonKey = String(process.env.VITE_SUPABASE_ANON_KEY ?? '').trim()
const storyGptUrl = String(process.env.VITE_STORY_GPT_URL ?? '').trim()

if (!gatewayUrl || !identityUrl || !supabaseUrl || !supabaseAnonKey || !storyGptUrl) {
  fail(
    'set VITE_GATEWAY_BASE_URL, VITE_IDENTITY_SERVICE_URL, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_STORY_GPT_URL before verify',
  )
}

for (const [label, value] of [
  ['VITE_GATEWAY_BASE_URL', gatewayUrl],
  ['VITE_IDENTITY_SERVICE_URL', identityUrl],
  ['VITE_SUPABASE_URL', supabaseUrl],
]) {
  if (/localhost|127\.0\.0\.1/i.test(value)) {
    fail(`${label} must use public URL, not localhost`)
  }
}

if (/localhost|127\.0\.0\.1/i.test(storyGptUrl)) {
  fail('VITE_STORY_GPT_URL must not be localhost')
}

console.log('[verify-build-env-bake] building with public env URLs')
execSync('npm run build', { stdio: 'inherit', env: process.env })

const jsFiles = readdirSync(distAssetsDir).filter((name) => name.endsWith('.js'))
if (jsFiles.length === 0) {
  fail('dist/assets has no .js files after build')
}

const violations = []
const requiredBaked = [
  { label: 'gateway', needle: gatewayUrl },
  { label: 'identity', needle: identityUrl },
  { label: 'supabase', needle: supabaseUrl },
  { label: 'supabase-anon', needle: supabaseAnonKey },
  { label: 'story-gpt', needle: storyGptUrl },
]
const bakedFound = new Set()

for (const file of jsFiles) {
  const content = readFileSync(join(distAssetsDir, file), 'utf8')
  for (const needle of FORBIDDEN_LOCALHOST) {
    if (content.includes(needle)) {
      violations.push(`${file}: contains ${needle}`)
    }
  }
  for (const { label, needle } of requiredBaked) {
    if (content.includes(needle)) {
      bakedFound.add(label)
    }
  }
}

if (violations.length > 0) {
  fail(`localhost URLs baked into bundle:\n${violations.join('\n')}`)
}

const missing = requiredBaked.filter(({ label }) => !bakedFound.has(label)).map(({ label }) => label)
if (missing.length > 0) {
  fail(`expected public env values in dist bundle — missing: ${missing.join(', ')}`)
}

console.log('[verify-build-env-bake] ok: no localhost; gateway/identity/supabase/gpt URLs present in bundle')
