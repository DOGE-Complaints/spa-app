/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach } from 'vitest'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'
import { CABINET_DICTIONARY_EN } from '../../../i18n/cabinetDictionary.js'
import { AppErrorState } from '../AppErrorState.jsx'

afterEach(cleanup)

describe('AppErrorState', () => {
  it('renders M22 title/message/retry/back and warning+retry icons', () => {
    render(
      <I18nProvider>
        <AppErrorState code="PROFILE_LOAD_FAILED" onRetry={() => {}} onBackToBoard={() => {}} />
      </I18nProvider>,
    )
    expect(screen.getByTestId('cabinet-profile-error').textContent).toContain(
      CABINET_DICTIONARY_EN.cabinet.error.profileLoad.title,
    )
    expect(screen.getByTestId('cabinet-profile-error-icon').getAttribute('src')).toContain(
      'ic-warning-triangle.png',
    )
    const retry = screen.getByTestId('cabinet-profile-error-retry')
    expect(retry.querySelector('img')?.getAttribute('src')).toContain('ic-auto-resubmit.png')
    expect(screen.getByTestId('cabinet-profile-error-back')).toBeTruthy()
  })
})
