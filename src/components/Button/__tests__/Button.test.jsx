/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Button } from '../Button.jsx'
import { IconButton } from '../IconButton.jsx'
import { ButtonGroup } from '../ButtonGroup.jsx'
import { MenuAction } from '../MenuAction.jsx'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Button', () => {
  it('defaults hierarchy to secondary (not primary)', () => {
    render(<Button>Save</Button>)
    const el = screen.getByRole('button', { name: 'Save' })
    expect(el.getAttribute('data-hierarchy')).toBe('secondary')
    expect(el.className).toContain('ds-btn--secondary')
  })

  it('renders primary hierarchy class and size', () => {
    render(
      <Button hierarchy="primary" size="large">
        Submit
      </Button>,
    )
    const el = screen.getByRole('button', { name: 'Submit' })
    expect(el.className).toContain('ds-btn--primary')
    expect(el.className).toContain('ds-btn--large')
  })

  it('blocks repeat click while loading and sets aria-busy', () => {
    const onClick = vi.fn()
    render(
      <Button hierarchy="primary" loading loadingLabel="Submitting…" onClick={onClick}>
        Submit
      </Button>,
    )
    const el = screen.getByRole('button', { name: 'Submitting…' })
    expect(el.getAttribute('aria-busy')).toBe('true')
    expect(el.disabled).toBe(true)
    fireEvent.click(el)
    expect(onClick).not.toHaveBeenCalled()
    expect(screen.getByTestId('ds-btn-spinner')).toBeTruthy()
  })

  it('applies destructive intent class independently of hierarchy', () => {
    render(
      <Button hierarchy="secondary" intent="destructive">
        Delete
      </Button>,
    )
    const el = screen.getByRole('button', { name: 'Delete' })
    expect(el.className).toContain('ds-btn--destructive')
    expect(el.className).toContain('ds-btn--secondary')
  })

  it('renders external anchor with noopener noreferrer', () => {
    render(
      <Button hierarchy="primary" href="https://chatgpt.com" external intent="external">
        Open GPT
      </Button>,
    )
    const el = screen.getByRole('link', { name: 'Open GPT' })
    expect(el.getAttribute('target')).toBe('_blank')
    expect(el.getAttribute('rel')).toContain('noopener')
  })

  it('renders internal Link for app href', () => {
    render(
      <MemoryRouter>
        <Button href="/board" intent="navigate">
          Board
        </Button>
      </MemoryRouter>,
    )
    const el = screen.getByRole('link', { name: 'Board' })
    expect(el.getAttribute('href')).toBe('/board')
  })
})

describe('IconButton', () => {
  it('requires accessible name via label', () => {
    render(<IconButton icon={<span>☰</span>} label="Open menu" />)
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeTruthy()
  })

  it('warns in DEV when label missing', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    render(<IconButton icon={<span>×</span>} label="" />)
    expect(warn).toHaveBeenCalled()
  })
})

describe('ButtonGroup', () => {
  it('renders group role and orientation', () => {
    render(
      <ButtonGroup orientation="vertical" mobileStack>
        <Button hierarchy="primary">A</Button>
        <Button>B</Button>
      </ButtonGroup>,
    )
    const group = screen.getByRole('group')
    expect(group.getAttribute('data-orientation')).toBe('vertical')
    expect(group.className).toContain('ds-btn-group--mobile-stack')
  })
})

describe('MenuAction', () => {
  it('fires onSelect for action rows', () => {
    const onSelect = vi.fn()
    render(
      <MenuAction intent="logout" onSelect={onSelect}>
        Log out
      </MenuAction>,
    )
    fireEvent.click(screen.getByRole('menuitem', { name: 'Log out' }))
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('navigates via href for profile pattern', () => {
    render(
      <MemoryRouter>
        <MenuAction intent="navigate" href="/profile" icon={<span>👤</span>}>
          Profile
        </MenuAction>
      </MemoryRouter>,
    )
    expect(screen.getByRole('menuitem', { name: 'Profile' }).getAttribute('href')).toBe('/profile')
  })
})
