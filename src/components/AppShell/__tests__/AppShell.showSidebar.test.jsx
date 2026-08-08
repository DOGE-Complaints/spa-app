import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '../AppShell.jsx'
import { I18nProvider } from '../../../i18n/I18nProvider.jsx'

function renderShell(props = {}) {
  return renderToStaticMarkup(
    <I18nProvider>
      <MemoryRouter>
        <AppShell {...props}>
          <div data-testid="shell-child">main</div>
        </AppShell>
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('AppShell showSidebar (PH-09)', () => {
  it('default showSidebar=true renders aside.board-sidebar', () => {
    const html = renderShell()
    expect(html).toContain('board-sidebar')
    expect(html).toContain('data-show-sidebar="yes"')
    expect(html).not.toContain('board-main--no-sidebar')
  })

  it('showSidebar=false omits aside and uses full-width body class', () => {
    const html = renderShell({ showSidebar: false, sidebar: <div>unused</div> })
    expect(html).not.toContain('board-sidebar')
    expect(html).not.toContain('<aside')
    expect(html).toContain('board-main--no-sidebar')
    expect(html).toContain('data-show-sidebar="no"')
    expect(html).toContain('shell-child')
  })
})
