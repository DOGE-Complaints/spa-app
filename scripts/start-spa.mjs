/**
 * npm start wrapper (FR-BUG-06.5). Never blind-serve an incompatible bake.
 * Does not change HL-02 FORBIDDEN_LOCALHOST / railway.toml.
 */
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { decideStartAction } from './lib/spaStartDecision.mjs'

const rootDir = process.cwd()
const decision = decideStartAction({ rootDir })

if (decision.action === 'exit') {
  console.error(decision.message)
  process.exit(decision.code)
}

const port = process.env.PORT || '4173'
const serveBin = join(rootDir, 'node_modules', '.bin', 'serve')
if (!existsSync(serveBin)) {
  console.error('[start-spa] missing node_modules/.bin/serve — run npm install')
  process.exit(1)
}

const child = spawn(serveBin, ['-s', 'dist', '-l', `tcp://0.0.0.0:${port}`], {
  cwd: rootDir,
  stdio: 'inherit',
  env: process.env,
})

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal)
  process.exit(code ?? 1)
})
