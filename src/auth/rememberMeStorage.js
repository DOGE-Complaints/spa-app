export const REMEMBER_ME_PREFERENCE_KEY = 'dogestonia-remember-me'

function canUseWebStorage() {
  try {
    return typeof localStorage !== 'undefined' && typeof sessionStorage !== 'undefined'
  } catch {
    return false
  }
}

export function readRememberMePreference() {
  if (!canUseWebStorage()) return true
  return localStorage.getItem(REMEMBER_ME_PREFERENCE_KEY) !== 'false'
}

export function writeRememberMePreference(value) {
  if (!canUseWebStorage()) return
  localStorage.setItem(REMEMBER_ME_PREFERENCE_KEY, value ? 'true' : 'false')
}

function activeStorage() {
  return readRememberMePreference() ? localStorage : sessionStorage
}

/** Supabase auth storage adapter: localStorage when Remember Me on, sessionStorage when off. */
export const rememberMeAuthStorage = {
  getItem(key) {
    if (!canUseWebStorage()) return null
    const persisted = localStorage.getItem(key)
    if (persisted !== null && readRememberMePreference()) {
      return persisted
    }
    return sessionStorage.getItem(key)
  },
  setItem(key, value) {
    if (!canUseWebStorage()) return
    const store = activeStorage()
    if (store === sessionStorage) {
      localStorage.removeItem(key)
    } else {
      sessionStorage.removeItem(key)
    }
    store.setItem(key, value)
  },
  removeItem(key) {
    if (!canUseWebStorage()) return
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
  },
}
