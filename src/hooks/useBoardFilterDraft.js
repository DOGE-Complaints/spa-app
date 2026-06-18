import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  areServerFiltersEqual,
  createBoardFilterState,
  EMPTY_BOARD_FILTERS,
  hasActiveBoardFilters,
} from '../router/boardFilterState.js'
import { serializeBoardQuery } from '../router/boardQuery.js'

/**
 * Pending vs applied filter draft for batch panel apply (D-S4).
 *
 * @param {{
 *   applied: import('../router/boardFilterState.js').BoardFilterState,
 *   navigate: (to: { pathname: string, search: string }, options?: { replace?: boolean }) => void,
 *   pathname?: string,
 * }} options
 */
export function useBoardFilterDraft({ applied, navigate, pathname = '/board' }) {
  const [pending, setPending] = useState(() => createBoardFilterState(applied))
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const appliedKey = useMemo(
    () =>
      [
        applied.status.join(','),
        applied.type,
        applied.labels.join(','),
        applied.institution.trim(),
        applied.created_after.trim(),
        applied.created_before.trim(),
        applied.search.trim(),
      ].join('::'),
    [
      applied.status.join(','),
      applied.type,
      applied.labels.join(','),
      applied.institution,
      applied.created_after,
      applied.created_before,
      applied.search,
    ],
  )

  useEffect(() => {
    setPending(createBoardFilterState(applied))
  }, [appliedKey])

  const isDirty = useMemo(() => !areServerFiltersEqual(pending, applied), [pending, applied])

  const hasActiveFilters = useMemo(() => hasActiveBoardFilters(applied), [applied])

  const navigateWithFilters = useCallback(
    (nextFilters) => {
      const q = serializeBoardQuery(nextFilters)
      navigate({ pathname, search: q }, { replace: true })
    },
    [navigate, pathname],
  )

  const openPanel = useCallback(() => {
    setPending(createBoardFilterState(applied))
    setIsPanelOpen(true)
  }, [applied])

  const closePanel = useCallback(() => {
    setIsPanelOpen(false)
  }, [])

  const togglePanel = useCallback(() => {
    if (isPanelOpen) {
      closePanel()
      return
    }
    openPanel()
  }, [closePanel, isPanelOpen, openPanel])

  const setPendingFilters = useCallback((updater) => {
    setPending((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater
      return createBoardFilterState(next)
    })
  }, [])

  const apply = useCallback(() => {
    const next = createBoardFilterState({
      ...pending,
      search: applied.search,
    })
    navigateWithFilters(next)
    setPending(next)
    setIsPanelOpen(false)
  }, [applied.search, navigateWithFilters, pending])

  const reset = useCallback(() => {
    const cleared = createBoardFilterState(EMPTY_BOARD_FILTERS)
    setPending(cleared)
    navigateWithFilters(cleared)
    setIsPanelOpen(false)
  }, [navigateWithFilters])

  const removeChip = useCallback(
    (field, value) => {
      const current = createBoardFilterState(applied)
      let next = current

      if (field === 'status') {
        next = createBoardFilterState({
          ...current,
          status: current.status.filter((item) => item !== value),
        })
      } else if (field === 'type') {
        next = createBoardFilterState({ ...current, type: '' })
      } else if (field === 'labels') {
        next = createBoardFilterState({
          ...current,
          labels: current.labels.filter((item) => item !== value),
        })
      } else if (field === 'institution') {
        next = createBoardFilterState({ ...current, institution: '' })
      } else if (field === 'created_after') {
        next = createBoardFilterState({ ...current, created_after: '' })
      } else if (field === 'created_before') {
        next = createBoardFilterState({ ...current, created_before: '' })
      } else if (field === 'search') {
        next = createBoardFilterState({ ...current, search: '' })
      }

      setPending(next)
      navigateWithFilters(next)
    },
    [applied, navigateWithFilters],
  )

  return {
    pending,
    setPending: setPendingFilters,
    isPanelOpen,
    setIsPanelOpen,
    openPanel,
    closePanel,
    togglePanel,
    isDirty,
    hasActiveFilters,
    apply,
    reset,
    removeChip,
  }
}
