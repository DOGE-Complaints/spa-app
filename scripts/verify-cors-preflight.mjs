function fail(message) {
  console.error(`[verify-cors-preflight] ${message}`)
  process.exit(1)
}

function requireEnv(name) {
  const value = String(process.env[name] ?? '').trim().replace(/\/+$/, '')
  if (!value) {
    fail(`set ${name}`)
  }
  return value
}

function normalizeOrigin(origin) {
  return origin.replace(/\/+$/, '')
}

function assertAllowOrigin(header, spaOrigin, label) {
  if (!header) {
    fail(`${label}: missing Access-Control-Allow-Origin`)
  }
  if (header !== '*' && header !== spaOrigin) {
    fail(`${label}: Access-Control-Allow-Origin=${header} (expected ${spaOrigin} or *)`)
  }
}

function assertHeaderContains(header, needle, label) {
  if (!header || !header.toLowerCase().includes(needle.toLowerCase())) {
    fail(`${label}: expected header to include ${needle}, got ${header ?? '(missing)'}`)
  }
}

/**
 * @param {string} baseUrl
 * @param {string} path
 * @param {Record<string, string>} headers
 * @param {string} label
 * @param {string} spaOrigin
 * @param {{ method: string, allowHeaders?: string }} expect
 */
async function verifyPreflight(baseUrl, path, headers, label, spaOrigin, expect) {
  const url = `${baseUrl}${path}`
  const response = await fetch(url, { method: 'OPTIONS', headers })
  if (!response.ok && response.status !== 204) {
    fail(`${label}: OPTIONS ${url} returned ${response.status}`)
  }

  assertAllowOrigin(response.headers.get('access-control-allow-origin'), spaOrigin, label)
  assertHeaderContains(response.headers.get('access-control-allow-methods'), expect.method, label)
  if (expect.allowHeaders) {
    assertHeaderContains(
      response.headers.get('access-control-allow-headers'),
      expect.allowHeaders,
      label,
    )
  }

  console.log(`[verify-cors-preflight] ${label} ok: OPTIONS ${path}`)
}

const spaOrigin = normalizeOrigin(requireEnv('SPA_ORIGIN'))
const gatewayBase = requireEnv('GATEWAY_BASE_URL')
const identityBase = requireEnv('IDENTITY_SERVICE_URL')

await verifyPreflight(
  gatewayBase,
  '/tallinn/issues',
  {
    Origin: spaOrigin,
    'Access-Control-Request-Method': 'GET',
  },
  'gateway',
  spaOrigin,
  { method: 'GET' },
)

await verifyPreflight(
  identityBase,
  '/me',
  {
    Origin: spaOrigin,
    'Access-Control-Request-Method': 'GET',
    'Access-Control-Request-Headers': 'authorization',
  },
  'identity',
  spaOrigin,
  { method: 'GET', allowHeaders: 'authorization' },
)

console.log('[verify-cors-preflight] ok')
process.exit(0)
