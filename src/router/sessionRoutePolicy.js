const PUBLIC_PATHS = new Set(['/', '/board', '/how-it-works', '/login'])

const PROTECTED_PREFIXES = ['/dashboard', '/profile', '/story/submit', '/story/compose', '/verify']

/**
 * @param {string} pathname
 */
export function isPublicPath(pathname) {
  if (PUBLIC_PATHS.has(pathname)) {
    return true
  }
  if (pathname.startsWith('/issue/')) {
    return true
  }
  return false
}

/**
 * @param {string} pathname
 */
export function isProtectedPath(pathname) {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

/**
 * @param {string} pathname
 */
export function isLoginPath(pathname) {
  return pathname === '/login'
}
