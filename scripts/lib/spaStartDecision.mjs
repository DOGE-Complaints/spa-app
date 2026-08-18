/**
 * Decide whether `npm start` may spawn serve (FR-BUG-06.5).
 * Does not spawn. Does not weaken HL-02.
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const LOCAL_BACKEND_RE = /localhost|127\.0\.0\.1/i

/**
 * Parse VITE_GATEWAY_BASE_URL / VITE_IDENTITY_SERVICE_URL from a dotenv file.
 * Trim values; ignore other keys (no secrets logged).
 * @param {string} envPath
 * @returns {{ gateway: string, identity: string, exists: boolean }}
 */
export function readLocalBackendEnv(envPath) {
  if (!existsSync(envPath)) {
    return { gateway: '', identity: '', exists: false }
  }
  const text = readFileSync(envPath, 'utf8')
  let gateway = ''
  let identity = ''
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq < 1) continue
    const key = line.slice(0, eq).trim()
    const value = line.slice(eq + 1).trim()
    if (key === 'VITE_GATEWAY_BASE_URL') gateway = value
    if (key === 'VITE_IDENTITY_SERVICE_URL') identity = value
  }
  return { gateway, identity, exists: true }
}

export function envHasLocalBackend(env) {
  return LOCAL_BACKEND_RE.test(env.gateway) || LOCAL_BACKEND_RE.test(env.identity)
}

/**
 * @param {{ rootDir: string }} opts
 * @returns {{ action: 'serve' } | { action: 'exit', code: 1, message: string }}
 */
export function decideStartAction({ rootDir }) {
  const distDir = join(rootDir, 'dist')
  const metaPath = join(distDir, 'bake-meta.json')
  if (!existsSync(distDir)) {
    return {
      action: 'exit',
      code: 1,
      message:
        '[start-spa] no dist/ — rebuild: npm run dev  OR  npm run build (from .env). Do not use npm run verify:build:env-bake for local backends.',
    }
  }
  if (!existsSync(metaPath)) {
    return {
      action: 'exit',
      code: 1,
      message:
        '[start-spa] missing dist/bake-meta.json — rebuild: npm run build (from .env) so provenance is written. Do not use npm run verify:build:env-bake for local backends.',
    }
  }

  let meta
  try {
    meta = JSON.parse(readFileSync(metaPath, 'utf8'))
  } catch {
    return {
      action: 'exit',
      code: 1,
      message: '[start-spa] dist/bake-meta.json is not valid JSON — rebuild with npm run build.',
    }
  }

  const kind = meta.bakeKind
  if (kind === 'placeholder' || kind === 'unknown') {
    return {
      action: 'exit',
      code: 1,
      message: `[start-spa] refusing bakeKind=${kind}. Use npm run dev or npm run build from .env (not verify:build:env-bake).`,
    }
  }

  const env = readLocalBackendEnv(join(rootDir, '.env'))
  if (kind === 'public' && envHasLocalBackend(env)) {
    return {
      action: 'exit',
      code: 1,
      message:
        '[start-spa] public/HL-02 bake cannot talk to local backends in .env. Use npm run dev or npm run build from .env (not verify:build:env-bake).',
    }
  }

  return { action: 'serve' }
}
