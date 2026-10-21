/**
 * CT-31 policy A — authenticated GET of published attach URL → blob → objectURL.
 * No invent CDN / HTTP-09 / signed public GET (policy B).
 *
 * @param {{
 *   url: string,
 *   getAccessToken: () => Promise<string|null|undefined>,
 *   fetchImpl?: typeof fetch,
 * }} args
 * @returns {Promise<{ ok: true, objectUrl: string } | { ok: false, reason: string }>}
 */
export async function fetchPublishedAttachmentObjectUrl({
  url,
  getAccessToken,
  fetchImpl = globalThis.fetch,
}) {
  const trimmed = typeof url === 'string' ? url.trim() : ''
  if (!trimmed) return { ok: false, reason: 'missing-url' }
  if (typeof getAccessToken !== 'function') return { ok: false, reason: 'missing-token-fn' }
  if (typeof fetchImpl !== 'function') return { ok: false, reason: 'missing-fetch' }

  let token = null
  try {
    token = await getAccessToken()
  } catch {
    return { ok: false, reason: 'token-error' }
  }
  if (!token) return { ok: false, reason: 'no-token' }

  let res
  try {
    res = await fetchImpl(trimmed, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch {
    return { ok: false, reason: 'fetch-failed' }
  }
  if (!res || !res.ok) {
    const status = res && Number.isFinite(Number(res.status)) ? Number(res.status) : 0
    return { ok: false, reason: status ? `http-${status}` : 'http-error' }
  }

  let blob
  try {
    blob = await res.blob()
  } catch {
    return { ok: false, reason: 'blob-error' }
  }
  if (!blob) return { ok: false, reason: 'empty-blob' }

  const objectUrl = URL.createObjectURL(blob)
  return { ok: true, objectUrl }
}
