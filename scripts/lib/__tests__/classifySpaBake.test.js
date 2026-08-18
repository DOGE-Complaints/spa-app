import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  classifyJsContents,
  classifySpaBakeFromRoot,
  extractHostnames,
} from '../classifySpaBake.mjs'

const dirs = []

function fixtureRoot(jsBody) {
  const root = mkdtempSync(join(tmpdir(), 'spa-bake-'))
  dirs.push(root)
  mkdirSync(join(root, 'dist', 'assets'), { recursive: true })
  writeFileSync(join(root, 'dist', 'assets', 'index-fixture.js'), jsBody, 'utf8')
  return root
}

afterEach(() => {
  while (dirs.length) {
    rmSync(dirs.pop(), { recursive: true, force: true })
  }
})

describe('classifySpaBake', () => {
  it('extracts hostnames and drops overlong tokens', () => {
    const hosts = extractHostnames(
      'fetch("https://gateway.example.invalid/tallinn/issues"); fetch("https://project.supabase.co/auth/v1/token")',
    )
    expect(hosts).toContain('gateway.example.invalid')
    expect(hosts).toContain('project.supabase.co')
  })

  it('classifies placeholder needles', () => {
    const result = classifyJsContents([
      'https://gateway.example.invalid https://identity.example.invalid https://project.supabase.co public-anon-key-bake-reconfirm',
    ])
    expect(result.kind).toBe('placeholder')
  })

  it('classifies local HL-02 needles', () => {
    const result = classifyJsContents(['const g="http://127.0.0.1:8000"; const i="http://localhost:8100"'])
    expect(result.kind).toBe('local')
  })

  it('classifies public https without placeholder', () => {
    const result = classifyJsContents(['https://api.dogestonia.example/tallinn/issues https://id.dogestonia.example'])
    expect(result.kind).toBe('public')
  })

  it('classifies unknown when no js', () => {
    expect(classifyJsContents([]).kind).toBe('unknown')
  })

  it('reads dist/assets from a root', () => {
    const root = fixtureRoot('https://gateway.example.invalid/x')
    expect(classifySpaBakeFromRoot(root).kind).toBe('placeholder')
  })
})
