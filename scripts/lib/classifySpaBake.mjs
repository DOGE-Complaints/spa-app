/**
 * Classify an already-built spa-app dist (FR-BUG-06.3).
 * Reads dist/assets/*.js only — not dotenv, not a second bake.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export const PLACEHOLDER_NEEDLES = Object.freeze([
  'gateway.example.invalid',
  'identity.example.invalid',
  'project.supabase.co',
  'public-anon-key-bake-reconfirm',
])

/** Same needles as HL-02 FORBIDDEN_LOCALHOST (ports 8000/8100). */
export const LOCAL_NEEDLES = Object.freeze([
  'localhost:8000',
  'localhost:8100',
  '127.0.0.1:8000',
  '127.0.0.1:8100',
])

const URL_HOST_RE = /https?:\/\/([^/?#"'\s]+)/gi

const IGNORE_HOSTNAMES = new Set([
  'github.com',
  'reactjs.org',
  'reactrouter.com',
  'www.w3.org',
  'chatgpt.com',
  'unpkg.com',
  'cdn.jsdelivr.net',
])

/**
 * @param {string} text
 * @returns {string[]} unique host[:port] values, no secrets/anon keys
 */
export function extractHostnames(text) {
  const found = new Set()
  for (const match of text.matchAll(URL_HOST_RE)) {
    const host = String(match[1] ?? '')
      .trim()
      .replace(/[),.;]+$/, '')
    if (!host) continue
    if (host.length > 253) continue
    if (IGNORE_HOSTNAMES.has(host.split(':')[0])) continue
    if (!host.includes('.') && !host.startsWith('localhost') && !host.startsWith('127.')) continue
    found.add(host)
  }
  return [...found].sort()
}

/**
 * @param {string[]} contents
 * @returns {{ kind: 'placeholder'|'local'|'public'|'unknown', hostnames: string[] }}
 */
export function classifyJsContents(contents) {
  if (!Array.isArray(contents) || contents.length === 0) {
    return { kind: 'unknown', hostnames: [] }
  }
  const joined = contents.join('\n')
  const hostnames = extractHostnames(joined)
  if (PLACEHOLDER_NEEDLES.some((needle) => joined.includes(needle))) {
    return { kind: 'placeholder', hostnames }
  }
  if (LOCAL_NEEDLES.some((needle) => joined.includes(needle))) {
    return { kind: 'local', hostnames }
  }
  const hasHttpsPublic = /https:\/\//i.test(joined)
  if (hasHttpsPublic) {
    return { kind: 'public', hostnames }
  }
  return { kind: 'unknown', hostnames }
}

/**
 * @param {string} rootDir spa-app root
 */
export function readDistJsContents(rootDir) {
  const assetsDir = join(rootDir, 'dist', 'assets')
  if (!existsSync(assetsDir)) return []
  const names = readdirSync(assetsDir).filter((name) => name.endsWith('.js'))
  return names.map((name) => readFileSync(join(assetsDir, name), 'utf8'))
}

/**
 * @param {string} rootDir
 */
export function classifySpaBakeFromRoot(rootDir) {
  return classifyJsContents(readDistJsContents(rootDir))
}

function main() {
  const root = process.cwd()
  const result = classifySpaBakeFromRoot(root)
  console.log(`[classifySpaBake] kind=${result.kind} hostnames=${result.hostnames.join(',') || '(none)'}`)
}

const invoked = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('classifySpaBake.mjs')
if (invoked) {
  main()
}
