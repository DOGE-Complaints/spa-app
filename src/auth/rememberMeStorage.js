export const REMEMBER_ME_PREFERENCE_KEY = 'dogestonia-remember-me'

export function readRememberMePreference() {
  return localStorage.getItem(REMEMBER_ME_PREFERENCE_KEY) !== 'false'
}

export function writeRememberMePreference(value) {
  localStorage.setItem(REMEMBER_ME_PREFERENCE_KEY, value ? 'true' : 'false')
}

function activeStorage() {
  return readRememberMePreference() ? localStorage : sessionStorage
}

/** Supabase auth storage adapter: localStorage when Remember Me on, sessionStorage when off. */
export const rememberMeAuthStorage = {
  getItem(key) {
    const persisted = localStorage.getItem(key)
    if (persisted !== null && readRememberMePreference()) {
      return persisted
    }
    return sessionStorage.getItem(key)
  },
  setItem(key, value) {
    const store = activeStorage()
    if (store === sessionStorage) {
      localStorage.removeItem(key)
    } else {
      sessionStorage.removeItem(key)
    }
    store.setItem(key, value)
  },
  removeItem(key) {
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
  },
}
