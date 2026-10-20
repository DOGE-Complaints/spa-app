/**
 * CT-24 — resolve canonical public Issue URL for Share surface.
 * Lab: honesty when Absent · no invent production domain / gateway HTTP.
 */

/** Narrow share surface — M152d E (~390 CSS px). */
export const SHARE_NARROW_MQ = '(max-width: 430px)'

export const SHARE_ICON_URLS = Object.freeze({
  telegram: '/icons/next-feed/share/telegram.svg',
  instagram: '/icons/next-feed/share/instagram.svg',
  x: '/icons/next-feed/share/x.svg',
  whatsapp: '/icons/next-feed/share/whatsapp.svg',
  facebook: '/icons/next-feed/share/facebook.svg',
})

/** Six rows · order locked M152d B/E. */
export const SHARE_ROWS = Object.freeze([
  { id: 'telegram', label: 'Telegram', kind: 'network', iconSrc: SHARE_ICON_URLS.telegram },
  {
    id: 'instagram',
    label: 'Instagram',
    kind: 'network',
    iconSrc: SHARE_ICON_URLS.instagram,
    hint: 'Copy link fallback',
    copyFallback: true,
  },
  { id: 'x', label: 'X', kind: 'network', iconSrc: SHARE_ICON_URLS.x },
  { id: 'whatsapp', label: 'WhatsApp', kind: 'network', iconSrc: SHARE_ICON_URLS.whatsapp },
  { id: 'facebook', label: 'Facebook', kind: 'network', iconSrc: SHARE_ICON_URLS.facebook },
  { id: 'copy', label: 'Copy link', kind: 'copy', iconSrc: null },
])

export const SHARE_UNAVAILABLE_TITLE = 'Sharing is unavailable here.'
export const SHARE_UNAVAILABLE_BODY = 'No public Issue link is available.'
export const SHARE_COPIED_LABEL = 'Link copied'

/**
 * @param {{ publicIssueUrl?: string|null }|null|undefined} fixture
 * @returns {string|null}
 */
export function resolvePublicIssueUrl(fixture) {
  if (!fixture || typeof fixture !== 'object') return null
  const raw = fixture.publicIssueUrl
  if (typeof raw !== 'string') return null
  const trimmed = raw.trim()
  return trimmed.length > 0 ? trimmed : null
}

/**
 * Open-intent URLs for networks · Instagram uses copy fallback (no private API).
 * @param {'telegram'|'x'|'whatsapp'|'facebook'} networkId
 * @param {string} url
 * @returns {string|null}
 */
export function buildNetworkShareHref(networkId, url) {
  if (typeof url !== 'string' || !url) return null
  const enc = encodeURIComponent(url)
  switch (networkId) {
    case 'telegram':
      return `https://t.me/share/url?url=${enc}`
    case 'x':
      return `https://twitter.com/intent/tweet?url=${enc}`
    case 'whatsapp':
      return `https://wa.me/?text=${enc}`
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${enc}`
    default:
      return null
  }
}

/**
 * @param {string} url
 * @returns {Promise<boolean>}
 */
export async function copyTextToClipboard(url) {
  if (typeof url !== 'string' || !url) return false
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url)
      return true
    }
  } catch {
    /* fall through */
  }
  try {
    if (typeof document === 'undefined') return false
    const ta = document.createElement('textarea')
    ta.value = url
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.left = '-9999px'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return Boolean(ok)
  } catch {
    return false
  }
}
