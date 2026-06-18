import { useCallback, useEffect, useRef, useState } from 'react'

export const BOARD_SEARCH_DEBOUNCE_MS = 300

/**
 * Local search draft with debounced commit to URL/applied filters.
 * External URL changes sync draft immediately (no debounce).
 *
 * @param {string} appliedSearch
 * @param {(search: string) => void} onCommit
 * @param {number} [delayMs]
 */
export function useDebouncedBoardSearch(appliedSearch, onCommit, delayMs = BOARD_SEARCH_DEBOUNCE_MS) {
  const [draft, setDraft] = useState(appliedSearch)
  const timerRef = useRef(null)
  const onCommitRef = useRef(onCommit)
  onCommitRef.current = onCommit

  useEffect(() => {
    setDraft(appliedSearch)
  }, [appliedSearch])

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const setSearchDraft = useCallback(
    (next) => {
      setDraft(next)
      clearTimer()
      timerRef.current = setTimeout(() => {
        onCommitRef.current(next)
        timerRef.current = null
      }, delayMs)
    },
    [clearTimer, delayMs],
  )

  useEffect(() => clearTimer, [clearTimer])

  return { searchDraft: draft, setSearchDraft }
}
