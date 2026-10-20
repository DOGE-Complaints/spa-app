/**
 * CT-16 puppeteer regression — dual-append BUG-1.
 * Delegates to scripts/tmp-ct16-capture.mjs (asserts + Path A shots).
 *
 *   PUBLIC_BOARD_URL=http://127.0.0.1:5173 \
 *   PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
 *   node tests/puppeteer/lab-feed-thread-ct16-dual-append.mjs
 */
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const script = path.resolve(__dirname, '../../scripts/tmp-ct16-capture.mjs')
const env = {
  ...process.env,
  CT16_BASE: process.env.PUBLIC_BOARD_URL || process.env.CT16_BASE || 'http://127.0.0.1:5173',
}

const child = spawn(process.execPath, [script], { stdio: 'inherit', env })
child.on('exit', (code) => process.exit(code ?? 1))
