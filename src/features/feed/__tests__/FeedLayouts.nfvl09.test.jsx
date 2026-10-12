import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { BoardLayout, PageContentLayout } from '../board/index.js'
import { selectBoardLayoutVariant } from '../semantics/boardLayoutVariant.js'

describe('NF-VL-09 BoardLayout / PageContentLayout', () => {
  it('selectBoardLayoutVariant maps DS width bands', () => {
    expect(selectBoardLayoutVariant(390)).toBe('compact')
    expect(selectBoardLayoutVariant(767)).toBe('compact')
    expect(selectBoardLayoutVariant(768)).toBe('medium')
    expect(selectBoardLayoutVariant(1024)).toBe('medium')
    expect(selectBoardLayoutVariant(1199)).toBe('medium')
    expect(selectBoardLayoutVariant(1200)).toBe('wide')
    expect(selectBoardLayoutVariant(1440)).toBe('wide')
  })

  it('BoardLayout exports named surface and omits empty side columns', () => {
    const html = renderToStaticMarkup(
      <BoardLayout variant="wide">
        <div data-testid="feed-main">main</div>
      </BoardLayout>,
    )
    expect(html).toContain('data-vl-done-surface="BoardLayout"')
    expect(html).toContain('data-layout-variant="wide"')
    expect(html).toContain('data-has-side-start="false"')
    expect(html).toContain('data-has-side-end="false"')
    expect(html).not.toContain('data-slot="side-start"')
    expect(html).not.toContain('data-slot="side-end"')
    expect(html).toContain('data-slot="main"')
  })

  it('BoardLayout renders side slots only when provided', () => {
    const html = renderToStaticMarkup(
      <BoardLayout variant="wide" sideStart={<div>rail</div>} sideEnd={<div>ctx</div>}>
        <div>main</div>
      </BoardLayout>,
    )
    expect(html).toContain('data-has-side-start="true"')
    expect(html).toContain('data-has-side-end="true"')
    expect(html).toContain('data-slot="side-start"')
    expect(html).toContain('data-slot="side-end"')
  })

  it('PageContentLayout exposes density and DS surface', () => {
    const html = renderToStaticMarkup(
      <PageContentLayout density="compact">
        <span>body</span>
      </PageContentLayout>,
    )
    expect(html).toContain('data-vl-done-surface="PageContentLayout"')
    expect(html).toContain('data-content-density="compact"')
  })

  it('layout modules do not invent endpoints or shell chrome', async () => {
    const fs = await import('node:fs')
    const path = await import('node:path')
    const { fileURLToPath } = await import('node:url')
    const dir = path.dirname(fileURLToPath(import.meta.url))
    for (const name of ['BoardLayout.jsx', 'PageContentLayout.jsx']) {
      const src = fs.readFileSync(path.resolve(dir, `../board/${name}`), 'utf8')
      expect(src).not.toMatch(/fetch\(|axios|PublicHeader|ProfileRail|\/api\//i)
    }
  })
})
