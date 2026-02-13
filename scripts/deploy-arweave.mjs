import { spawn } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

function fail(message) {
  console.error(`[deploy-arweave] ${message}`)
  process.exit(1)
}

function resolveWalletPath(inputPath) {
  if (!inputPath) return null

  const candidates = [
    inputPath,
    path.resolve(process.cwd(), inputPath),
    path.resolve(process.cwd(), '..', inputPath),
  ]

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate
    }
  }

  return null
}

function loadEnvFromDotFile(dotEnvPath = '.env') {
  if (!existsSync(dotEnvPath)) return

  const content = readFileSync(dotEnvPath, 'utf8')
  const lines = content.split(/\r?\n/)

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const separatorIndex = trimmed.indexOf('=')
    if (separatorIndex === -1) continue

    const key = trimmed.slice(0, separatorIndex).trim()
    const rawValue = trimmed.slice(separatorIndex + 1).trim()
    const value = rawValue.replace(/^['"]|['"]$/g, '')

    if (!process.env[key]) {
      process.env[key] = value
    }
  }
}

loadEnvFromDotFile('.env')

if (!existsSync('dist')) {
  fail('dist/ not found. Run "npm run build" first.')
}

const walletPath = process.env.ARWEAVE_WALLET_PATH
if (!walletPath) {
  fail('ARWEAVE_WALLET_PATH is required. See .env.example.')
}

const resolvedWalletPath = resolveWalletPath(walletPath)
if (!resolvedWalletPath) {
  fail(
    `Wallet file not found: ${walletPath}. ` +
      'Use absolute path or relative path from spa-app (for your setup: ../keys/arweave-wallet.json).',
  )
}

const args = ['arkb', 'deploy', 'dist', '--wallet', resolvedWalletPath]

if (process.env.ARWEAVE_USE_BUNDLER === 'true') {
  args.push('--use-bundler')
  if (process.env.ARWEAVE_BUNDLER_NODE) {
    args.push(process.env.ARWEAVE_BUNDLER_NODE)
  }
}

args.push('--tag-name', 'App-Name', '--tag-value', 'dogeestonia-spa')
args.push('--tag-name', 'App-Env', '--tag-value', 'mvp')

console.log(`[deploy-arweave] wallet: ${resolvedWalletPath}`)
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

  if (/don't have enough balance/i.test(output) || /not enough balance/i.test(output)) {
    fail('Deploy failed: wallet has insufficient AR balance.')
  }

  const urlMatch = output.match(/https:\/\/arweave\.net\/([a-zA-Z0-9_-]{43})/i)
  const labeledMatch =
    output.match(/(?:manifest id|deployment id|txid|transaction id)\s*[:=]\s*([a-zA-Z0-9_-]{43})/i) ?? null
  const txid = (urlMatch && urlMatch[1]) || (labeledMatch && labeledMatch[1]) || null

  if (!txid) {
    fail('Deploy finished, but txid was not auto-detected from CLI output.')
  }

  console.log(`[deploy-arweave] txid: ${txid}`)
  console.log(`[deploy-arweave] url: https://arweave.net/${txid}`)
})
