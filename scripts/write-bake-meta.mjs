/**
 * Write dist/bake-meta.json from the already-built dist (FR-BUG-06.4).
 * Hostnames only — no anon key / secrets.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { classifySpaBakeFromRoot } from './lib/classifySpaBake.mjs'

const SCHEMA = 'spa-bake-meta/v1'

export function buildBakeMeta(rootDir, builtAt = new Date().toISOString()) {
  const classified = classifySpaBakeFromRoot(rootDir)
  return {
    schema: SCHEMA,
    builtAt,
    bakeKind: classified.kind,
    hostnames: classified.hostnames,
    source: 'dist/assets/*.js',
  }
}

export function writeBakeMeta(rootDir, builtAt) {
  const distDir = join(rootDir, 'dist')
  mkdirSync(distDir, { recursive: true })
  const meta = buildBakeMeta(rootDir, builtAt)
  writeFileSync(join(distDir, 'bake-meta.json'), `${JSON.stringify(meta, null, 2)}\n`, 'utf8')
  return meta
}

const invoked = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('write-bake-meta.mjs')
if (invoked) {
  const meta = writeBakeMeta(process.cwd())
  console.log(`[write-bake-meta] bakeKind=${meta.bakeKind} hostnames=${meta.hostnames.join(',') || '(none)'}`)
}
