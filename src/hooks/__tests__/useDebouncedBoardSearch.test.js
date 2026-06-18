/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createElement, act } from 'react'
import { createRoot } from 'react-dom/client'
import { useDebouncedBoardSearch, BOARD_SEARCH_DEBOUNCE_MS } from '../useDebouncedBoardSearch.js'

function mountHook(appliedSearch, onCommit, delayMs) {
  const state = { current: null }
  function Harness() {
    state.current = useDebouncedBoardSearch(appliedSearch, onCommit, delayMs)
    return null
  }
  const container = document.createElement('div')
  const root = createRoot(container)
  act(() => {
    root.render(createElement(Harness))
  })
  return {
    get hook() {
      return state.current
    },
    unmount() {
      act(() => root.unmount())
    },
  }
}

describe('useDebouncedBoardSearch', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('debounces onCommit until delay elapses', () => {
    const onCommit = vi.fn()
    const { hook, unmount } = mountHook('', onCommit)

    act(() => {
      hook.setSearchDraft('a')
      hook.setSearchDraft('ab')
    })

    expect(onCommit).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(BOARD_SEARCH_DEBOUNCE_MS)
    })

    expect(onCommit).toHaveBeenCalledTimes(1)
    expect(onCommit).toHaveBeenCalledWith('ab')
    unmount()
  })

  it('syncs draft immediately when appliedSearch changes externally', () => {
    const onCommit = vi.fn()
    let applied = 'initial'
    const container = document.createElement('div')
    const root = createRoot(container)
    const state = { current: null }

    function Harness() {
      state.current = useDebouncedBoardSearch(applied, onCommit)
      return null
    }

    act(() => {
      root.render(createElement(Harness))
    })
    expect(state.current.searchDraft).toBe('initial')

    applied = 'from-url'
    act(() => {
      root.render(createElement(Harness))
    })
    expect(state.current.searchDraft).toBe('from-url')
    act(() => root.unmount())
  })
})
