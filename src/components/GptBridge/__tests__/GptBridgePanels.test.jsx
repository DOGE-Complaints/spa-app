/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { GptBridgeSuccessPanel } from '../GptBridgeSuccessPanel.jsx'
import { GptDraftBanner } from '../GptDraftBanner.jsx'

vi.mock('../../../i18n/I18nProvider.jsx', () => ({
  useI18n: () => ({
    t: (key) => key,
  }),
}))

function renderWithRouter(node) {
  return render(<MemoryRouter>{node}</MemoryRouter>)
}

describe('GptBridge panels', () => {
  it('renders draft banner test ids', () => {
    renderWithRouter(<GptDraftBanner />)
    expect(screen.getByTestId('gpt-bridge-draft-banner')).toBeTruthy()
    expect(screen.getByTestId('gpt-bridge-draft-status').textContent).toContain('gptBridge.draft.statusSaved')
  })

  it('renders success panel CTA', () => {
    renderWithRouter(<GptBridgeSuccessPanel redirectUrl="https://chatgpt.com/mock" />)
    expect(screen.getByTestId('gpt-bridge-success')).toBeTruthy()
    expect(screen.getByTestId('gpt-bridge-return-chatgpt')).toBeTruthy()
  })
})
