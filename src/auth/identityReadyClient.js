const IDENTITY_SERVICE_URL =
  import.meta.env.VITE_IDENTITY_SERVICE_URL ?? 'http://localhost:8100'

/**
 * GET /ready — optional for «View System Status» (FR-02.4).
 * @returns {Promise<{ status: string, db_ready?: boolean }>}
 */
export async function fetchIdentityReady() {
  const response = await fetch(`${IDENTITY_SERVICE_URL}/ready`)
  const body = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(body?.error?.code ?? 'ready_unavailable')
  }
  return body?.data ?? body
}
