import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { decideStartAction, envHasLocalBackend, readLocalBackendEnv } from '../spaStartDecision.mjs'
import { writeBakeMeta } from '../../write-bake-meta.mjs'

const dirs = []

function makeRoot({ js, envText } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'spa-start-'))
  dirs.push(root)
  if (js != null) {
    mkdirSync(join(root, 'dist', 'assets'), { recursive: true })
    writeFileSync(join(root, 'dist', 'assets', 'index-fixture.js'), js, 'utf8')
  }
  if (envText != null) {
    writeFileSync(join(root, '.env'), envText, 'utf8')
  }
  return root
}

afterEach(() => {
  while (dirs.length) {
    rmSync(dirs.pop(), { recursive: true, force: true })
  }
})

describe('spaStartDecision FR-BUG-06.5 / 06.8 a–d', () => {
  it('exits when dist is missing', () => {
    const root = makeRoot()
    const d = decideStartAction({ rootDir: root })
    expect(d.action).toBe('exit')
    expect(d.code).toBe(1)
    expect(d.message).toMatch(/no dist/)
  })

  it('(a) placeholder bake refuses start', () => {
    const root = makeRoot({
      js: 'https://gateway.example.invalid https://project.supabase.co public-anon-key-bake-reconfirm',
    })
    const meta = writeBakeMeta(root, '2026-08-18T10:13:24Z')
    expect(meta.bakeKind).toBe('placeholder')
    const d = decideStartAction({ rootDir: root })
    expect(d.action).toBe('exit')
    expect(d.code).toBe(1)
    expect(d.message).toMatch(/placeholder/)
    expect(d.message).toMatch(/not verify:build:env-bake/)
  })

  it('(b) public bake + .env localhost refuses start', () => {
    const root = makeRoot({
      js: 'https://api.example.com/tallinn/issues https://id.example.com',
      envText: 'VITE_GATEWAY_BASE_URL=http://127.0.0.1:8000\nVITE_IDENTITY_SERVICE_URL=http://127.0.0.1:8100\n',
    })
    expect(writeBakeMeta(root).bakeKind).toBe('public')
    const d = decideStartAction({ rootDir: root })
    expect(d.action).toBe('exit')
    expect(d.code).toBe(1)
    expect(d.message).toMatch(/public\/HL-02/)
  })

  it('(c) public bake without localhost .env allows serve (Railway-like)', () => {
    const root = makeRoot({
      js: 'https://api.example.com/tallinn/issues https://id.example.com',
    })
    expect(writeBakeMeta(root).bakeKind).toBe('public')
    expect(decideStartAction({ rootDir: root })).toEqual({ action: 'serve' })
  })

  it('(d) local bake after local .env allows serve', () => {
    const root = makeRoot({
      js: 'http://127.0.0.1:8000/tallinn/issues http://127.0.0.1:8100/me',
      envText: 'VITE_GATEWAY_BASE_URL=http://127.0.0.1:8000\nVITE_IDENTITY_SERVICE_URL=http://127.0.0.1:8100\n',
    })
    expect(writeBakeMeta(root).bakeKind).toBe('local')
    expect(decideStartAction({ rootDir: root })).toEqual({ action: 'serve' })
  })

  it('exits when bake-meta is missing', () => {
    const root = makeRoot({ js: 'https://api.example.com' })
    const d = decideStartAction({ rootDir: root })
    expect(d.action).toBe('exit')
    expect(d.message).toMatch(/bake-meta/)
  })

  it('detects localhost in env with trim (no secret dump)', () => {
    const root = makeRoot({
      envText: 'VITE_GATEWAY_BASE_URL=http://127.0.0.1:8000  \n# comment\nVITE_IDENTITY_SERVICE_URL=https://id.example.com\n',
    })
    const env = readLocalBackendEnv(join(root, '.env'))
    expect(env.exists).toBe(true)
    expect(envHasLocalBackend(env)).toBe(true)
    expect(env.gateway).toBe('http://127.0.0.1:8000')
  })
})
