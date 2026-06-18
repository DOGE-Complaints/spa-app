/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest'
import { act, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { useBoardFilterDraft } from '../useBoardFilterDraft.js'
import { createBoardFilterState } from '../../router/boardFilterState.js'

function mountHook(applied, navigate) {
  const container = document.createElement('div')
  const root = createRoot(container)
  const state = { current: null }

  function Probe() {
    state.current = useBoardFilterDraft({ applied, navigate })
    return null
  }

  act(() => {
    root.render(createElement(Probe))
  })

  return {
    get current() {
      return state.current
    },
    unmount() {
      act(() => root.unmount())
    },
  }
}

describe('useBoardFilterDraft', () => {
  it('apply navigates with pending server filters and keeps applied search', () => {
    const navigate = vi.fn()
    const applied = createBoardFilterState({
      status: [],
      type: '',
      labels: [],
      search: 'bridge',
    })

    const hook = mountHook(applied, navigate)

    act(() => {
      hook.current.setPending((current) => ({ ...current, status: ['NEW'] }))
    })

    expect(hook.current.isDirty).toBe(true)

    act(() => {
      hook.current.apply()
    })

    expect(navigate).toHaveBeenCalledWith(
      { pathname: '/board', search: '?status=NEW&search=bridge' },
      { replace: true },
    )

    hook.unmount()
  })

  it('reset clears all filters including search', () => {
    const navigate = vi.fn()
    const applied = createBoardFilterState({
      status: ['NEW'],
      type: 'INCIDENT',
      labels: ['waste'],
      search: 'road',
    })

    const hook = mountHook(applied, navigate)

    act(() => {
      hook.current.reset()
    })

    expect(navigate).toHaveBeenCalledWith({ pathname: '/board', search: '' }, { replace: true })
    hook.unmount()
  })

  it('removeChip updates applied immediately', () => {
    const navigate = vi.fn()
    const applied = createBoardFilterState({
      status: ['NEW', 'PUBLISHED'],
      type: '',
      labels: [],
      search: '',
    })

    const hook = mountHook(applied, navigate)

    act(() => {
      hook.current.removeChip('status', 'NEW')
    })

    expect(navigate).toHaveBeenCalledWith(
      { pathname: '/board', search: '?status=PUBLISHED' },
      { replace: true },
    )
    hook.unmount()
  })

  it('removeChip clears institution and date bounds', () => {
    const navigate = vi.fn()
    const applied = createBoardFilterState({
      status: [],
      type: '',
      labels: [],
      search: '',
      institution: 'Haigekassa',
      created_after: '2025-01-01',
      created_before: '2025-02-01',
    })

    const hook = mountHook(applied, navigate)

    act(() => {
      hook.current.removeChip('institution', 'Haigekassa')
    })

    expect(navigate).toHaveBeenCalledWith(
      { pathname: '/board', search: '?created_after=2025-01-01&created_before=2025-02-01' },
      { replace: true },
    )
    hook.unmount()
  })
})
