/**
 * Capture M123 anchor post-implement screenshot (state A only).
 * For all states A–D use: node ./tests/puppeteer/waitlist-all-states-screenshot.mjs
 */
import { spawn } from 'node:child_process'
import process from 'node:process'

const child = spawn(process.execPath, ['./tests/puppeteer/waitlist-all-states-screenshot.mjs'], {
  cwd: process.cwd(),
  stdio: 'inherit',
})

child.on('exit', (code) => {
  process.exitCode = code ?? 0
})
