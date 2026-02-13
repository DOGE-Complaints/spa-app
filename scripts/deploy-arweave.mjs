import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'

function fail(message) {
  console.error(`[deploy-arweave] ${message}`)
  process.exit(1)
}

if (!existsSync('dist')) {
  fail('dist/ not found. Run "npm run build" first.')
}

const walletPath = process.env.ARWEAVE_WALLET_PATH
if (!walletPath) {
  fail('ARWEAVE_WALLET_PATH is required. See .env.example.')
}

if (!existsSync(walletPath)) {
  fail(`Wallet file not found: ${walletPath}`)
}

const args = ['arkb', 'deploy', 'dist', '--wallet', walletPath]

if (process.env.ARWEAVE_USE_BUNDLER === 'true') {
  args.push('--use-bundler')
  if (process.env.ARWEAVE_BUNDLER_NODE) {
    args.push(process.env.ARWEAVE_BUNDLER_NODE)
  }
}

args.push('--tag-name', 'App-Name', '--tag-value', 'dogeestonia-spa')
args.push('--tag-name', 'App-Env', '--tag-value', 'mvp')

console.log(`[deploy-arweave] running: npx ${args.join(' ')}`)

const child = spawn('npx', args, {
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: process.platform === 'win32',
})

let output = ''

child.stdout.on('data', (chunk) => {
  const text = chunk.toString()
  output += text
  process.stdout.write(text)
})

child.stderr.on('data', (chunk) => {
  const text = chunk.toString()
  output += text
  process.stderr.write(text)
})

child.on('close', (code) => {
  if (code !== 0) {
    process.exit(code ?? 1)
  }

  const matches = output.match(/\b[a-zA-Z0-9_-]{43}\b/g) ?? []
  const txid = matches.at(-1)
  if (!txid) {
    console.log('[deploy-arweave] deploy finished, but txid was not auto-detected from CLI output.')
    process.exit(0)
  }

  console.log(`[deploy-arweave] txid: ${txid}`)
  console.log(`[deploy-arweave] url: https://arweave.net/${txid}`)
})
