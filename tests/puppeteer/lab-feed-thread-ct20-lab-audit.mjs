/**
 * CT-20 puppeteer — LAB-1…4 + dual-append + picker.
 * Delegates to scripts/tmp-ct20-capture.mjs.
 *
 *   PUBLIC_BOARD_URL=http://127.0.0.1:5173 \
 *   PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
 *   node tests/puppeteer/lab-feed-thread-ct20-lab-audit.mjs
 */
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const script = path.resolve(__dirname, '../../scripts/tmp-ct20-capture.mjs')
const env = {
  ...process.env,
  CT20_BASE: process.env.PUBLIC_BOARD_URL || process.env.CT20_BASE || 'http://127.0.0.1:5173',
}

const child = spawn(process.execPath, [script], { stdio: 'inherit', env })
child.on('exit', (code) => process.exit(code ?? 1))
