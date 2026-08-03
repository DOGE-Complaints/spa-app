/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { Button } from '../Button.jsx'
import { ButtonGroup } from '../ButtonGroup.jsx'

afterEach(cleanup)

describe('ButtonGroup', () => {
  it('supports horizontal align and children', () => {
    render(
      <ButtonGroup align="end">
        <Button hierarchy="primary">Primary</Button>
        <Button>Secondary</Button>
      </ButtonGroup>,
    )
    expect(screen.getByRole('group').className).toContain('ds-btn-group--align-end')
    expect(screen.getByRole('button', { name: 'Primary' })).toBeTruthy()
  })
})
