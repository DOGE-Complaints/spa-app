/**
 * @vitest-environment jsdom
 * BUG-09 — MapLibre v4 Promise boot for loadImage / pin layers.
 */
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { act, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { BoardIssuesMap } from '../BoardIssuesMap.jsx'

vi.mock('../MapLibreMap.jsx', () => ({
  MapLibreMap: ({ onMapReady, children }) => {
    // Expose hook for tests via global callback set by each test
    if (typeof globalThis.__boardMapReady === 'function') {
      // defer so BoardIssuesMap can register onMapReady cleanup
      queueMicrotask(() => globalThis.__boardMapReady(onMapReady))
    }
    return <div data-testid="maplibre-map-mock">{children}</div>
  },
}))

function makeT() {
  return (key) => key
}

function pinIssue(id = 'ISSUE-1') {
  return {
    id,
    title: { en: 'Pin issue' },
    labels: ['waste'],
    geo: { lat: 59.43, lon: 24.75 },
  }
}

function createMockMap({ hasImageInitially = false } = {}) {
  const sources = new Map()
  const layers = new Set()
  const images = new Set(hasImageInitially ? ['ssr03-ic-map-pin'] : [])
  const handlers = {}
  const map = {
    hasImage: (id) => images.has(id),
    addImage: vi.fn((id) => {
      images.add(id)
    }),
    loadImage: vi.fn(async () => ({ data: { __bitmap: true } })),
    getSource: (id) => sources.get(id) ?? null,
    addSource: vi.fn((id, spec) => {
      sources.set(id, {
        ...spec,
        setData: vi.fn(),
        getClusterExpansionZoom: vi.fn(async () => 12),
      })
    }),
    addLayer: vi.fn((layer) => {
      layers.add(layer.id)
    }),
    on: vi.fn((event, layerOrFn, maybeFn) => {
      const key = typeof layerOrFn === 'string' ? `${event}:${layerOrFn}` : event
      handlers[key] = typeof maybeFn === 'function' ? maybeFn : layerOrFn
    }),
    getCanvas: () => ({ style: { cursor: '' } }),
    easeTo: vi.fn(),
    fitBounds: vi.fn(),
    queryRenderedFeatures: vi.fn(() => []),
    __sources: sources,
    __layers: layers,
    __handlers: handlers,
  }
  return map
}

describe('BoardIssuesMap MapLibre v4 Promise boot', () => {
  beforeEach(() => {
    globalThis.__boardMapReady = null
  })
  afterEach(() => {
    delete globalThis.__boardMapReady
  })

  it('shows empty-pins when no pin-capable issues', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <BoardIssuesMap issues={[{ id: 'x', geo: {} }]} resolveLocalizedText={(v) => v?.en ?? ''} t={makeT()} />
      </MemoryRouter>,
    )
    expect(getByTestId('board-map-empty-pins')).toBeTruthy()
  })

  it('awaits loadImage Promise then adds source/layers', async () => {
    const map = createMockMap({ hasImageInitially: false })
    globalThis.__boardMapReady = (onMapReady) => {
      act(() => {
        onMapReady(map)
      })
    }

    render(
      <MemoryRouter>
        <BoardIssuesMap
          issues={[pinIssue()]}
          resolveLocalizedText={(v) => v?.en ?? String(v)}
          t={makeT()}
        />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(map.loadImage).toHaveBeenCalledWith('/icons/semantic-schema-runtime/ic-map-pin.png')
      expect(map.addImage).toHaveBeenCalled()
      expect(map.addSource).toHaveBeenCalledWith(
        'ssr03-issue-pins',
        expect.objectContaining({ type: 'geojson', cluster: true }),
      )
      expect(map.addLayer).toHaveBeenCalled()
    })
  })

  it('short-circuits loadImage when hasImage already true but still mounts layers', async () => {
    const map = createMockMap({ hasImageInitially: true })
    globalThis.__boardMapReady = (onMapReady) => {
      act(() => {
        onMapReady(map)
      })
    }

    render(
      <MemoryRouter>
        <BoardIssuesMap
          issues={[pinIssue()]}
          resolveLocalizedText={(v) => v?.en ?? String(v)}
          t={makeT()}
        />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(map.loadImage).not.toHaveBeenCalled()
      expect(map.addSource).toHaveBeenCalled()
    })
  })
})
