import { createContext, useCallback, useContext, useMemo, useRef } from 'react'

const FeedReactionOpenContext = createContext(null)

/**
 * Per-card bridge: civic Reactions/React zones → thread-root picker open.
 * AD-VP-02: no second HTTP plane — only UI open signal.
 */
export function FeedReactionOpenProvider({ children }) {
  const openers = useRef(new Map())

  const registerThreadRootOpener = useCallback((issueId, openFn) => {
    if (!issueId || typeof openFn !== 'function') return () => {}
    openers.current.set(String(issueId), openFn)
    return () => {
      if (openers.current.get(String(issueId)) === openFn) {
        openers.current.delete(String(issueId))
      }
    }
  }, [])

  const openThreadRootPicker = useCallback((issueId) => {
    const fn = openers.current.get(String(issueId))
    if (typeof fn === 'function') fn()
  }, [])

  const value = useMemo(
    () => ({ registerThreadRootOpener, openThreadRootPicker }),
    [registerThreadRootOpener, openThreadRootPicker],
  )

  return (
    <FeedReactionOpenContext.Provider value={value}>{children}</FeedReactionOpenContext.Provider>
  )
}

export function useFeedReactionOpen() {
  return useContext(FeedReactionOpenContext)
}
