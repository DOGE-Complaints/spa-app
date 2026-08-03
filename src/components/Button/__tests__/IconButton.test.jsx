/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { IconButton } from '../IconButton.jsx'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('IconButton', () => {
  it('exposes aria-expanded / aria-controls when provided', () => {
    render(
      <IconButton
        icon={<span>☰</span>}
        label="Open navigation menu"
        expanded
        controls="nav-drawer"
      />,
    )
    const el = screen.getByRole('button', { name: 'Open navigation menu' })
    expect(el.getAttribute('aria-expanded')).toBe('true')
    expect(el.getAttribute('aria-controls')).toBe('nav-drawer')
  })
})
