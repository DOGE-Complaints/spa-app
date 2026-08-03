/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MenuAction } from '../MenuAction.jsx'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('MenuAction', () => {
  it('supports destructive intent styling hook', () => {
    const onSelect = vi.fn()
    render(
      <MenuAction intent="destructive" onSelect={onSelect}>
        Delete draft
      </MenuAction>,
    )
    const el = screen.getByRole('menuitem', { name: 'Delete draft' })
    expect(el.className).toContain('ds-menu-action--destructive')
    fireEvent.click(el)
    expect(onSelect).toHaveBeenCalled()
  })
})
