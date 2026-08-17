/**
 * @vitest-environment jsdom
 * SPA-ES-04 — Picture Forming is CSS viz only (no ic-*, no fake metrics).
 */
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { PictureFormingBlock } from '../PictureFormingBlock.jsx'
import { LOCALE_STORAGE_KEY } from '../../../i18n/core.js'

function renderForming() {
  return render(
    <I18nProvider>
      <PictureFormingBlock />
    </I18nProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('PictureFormingBlock viz', () => {
  beforeEach(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'en')
  })

  it('renders explanatory copy + decorative CSS field — no metrics or ic-*', () => {
    renderForming()
    expect(screen.getByTestId('picture-forming')).toBeTruthy()
    expect(
      screen.getByText('Different Stories are beginning to reveal relationships across shared experiences.'),
    ).toBeTruthy()
    expect(document.querySelector('.picture-forming-viz')).toBeTruthy()
    expect(document.querySelectorAll('img')).toHaveLength(0)
    expect(screen.queryByText(/%/)).toBeNull()
    expect(screen.queryByText(/N more Stories/i)).toBeNull()
    expect(screen.queryByText(/confidence/i)).toBeNull()
    expect(screen.queryByText(/Offer/i)).toBeNull()
  })
})
