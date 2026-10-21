/**
 * @vitest-environment jsdom
 * NF-20 — getClusterLeaves → all N reachable · count+circle · co-located multi-path
 */
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { act, render, waitFor, cleanup, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { BoardIssuesMap, mapFeaturesToClusterLeaves } from '../BoardIssuesMap.jsx'

vi.mock('../MapLibreMap.jsx', () => ({
  MapLibreMap: ({ onMapReady, children }) => {
    if (typeof globalThis.__boardMapReady === 'function') {
      queueMicrotask(() => globalThis.__boardMapReady(onMapReady))
    }
    return <div data-testid="maplibre-map-mock">{children}</div>
  },
}))

function makeT() {
  return (key) => key
}

function pinIssue(id, title = `Issue ${id}`) {
  return {
    id,
    title: { en: title },
    labels: ['waste'],
    geo: { lat: 59.43, lon: 24.75, label: 'Tallinn' },
  }
}

function createMockMap({ leaves = [] } = {}) {
  const sources = new Map()
  const layers = new Set()
  const images = new Set(['ssr03-ic-map-pin'])
  const handlers = {}
  const getClusterLeaves = vi.fn(async () => leaves)
  const getClusterExpansionZoom = vi.fn(async () => 12)
  const map = {
    hasImage: (id) => images.has(id),
    addImage: vi.fn((id) => {
      images.add(id)
    }),
    loadImage: vi.fn(async () => ({ data: { __bitmap: true } })),
    getSource: (id) => sources.get(id) ?? null,
    getLayer: (id) => (layers.has(id) ? { id, type: 'symbol' } : null),
    addSource: vi.fn((id, spec) => {
      sources.set(id, {
        ...spec,
        setData: vi.fn(),
        getClusterExpansionZoom,
        getClusterLeaves,
      })
    }),
    addLayer: vi.fn((layer) => {
      layers.add(layer.id)
    }),
    removeLayer: vi.fn((id) => {
      layers.delete(id)
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
    __getClusterLeaves: getClusterLeaves,
  }
  return map
}

describe('NF-20 BoardIssuesMap cluster leaves', () => {
  beforeEach(() => {
    globalThis.__boardMapReady = null
  })
  afterEach(() => {
    delete globalThis.__boardMapReady
    cleanup()
  })

  it('mapFeaturesToClusterLeaves maps id/title/label and drops empty ids', () => {
    expect(
      mapFeaturesToClusterLeaves([
        { properties: { id: 'a', title: 'A', label: 'L' } },
        { properties: { id: '', title: 'X' } },
        { properties: { id: 'b', title: 'B' } },
      ]),
    ).toEqual([
      { id: 'a', title: 'A', label: 'L' },
      { id: 'b', title: 'B', label: '' },
    ])
  })

  it('cluster click calls getClusterLeaves and shows all N in sheet', async () => {
    const leaves = [
      { properties: { id: 'ISSUE-1', title: 'One', label: '' } },
      { properties: { id: 'ISSUE-2', title: 'Two', label: 'X' } },
      { properties: { id: 'ISSUE-3', title: 'Three', label: '' } },
    ]
    const map = createMockMap({ leaves })
    map.queryRenderedFeatures = vi.fn(() => [
      {
        properties: { cluster_id: 42, point_count: 3 },
        geometry: { coordinates: [24.75, 59.43] },
      },
    ])

    globalThis.__boardMapReady = (onMapReady) => {
      act(() => {
        onMapReady(map)
      })
    }

    const { getByTestId, findByTestId } = render(
      <MemoryRouter>
        <BoardIssuesMap
          issues={[pinIssue('ISSUE-1'), pinIssue('ISSUE-2'), pinIssue('ISSUE-3')]}
          resolveLocalizedText={(v) => v?.en ?? String(v)}
          t={makeT()}
        />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(map.__handlers['click:ssr03-clusters']).toBeTypeOf('function')
      expect(map.__handlers['click:ssr03-cluster-count']).toBeTypeOf('function')
    })

    await act(async () => {
      map.__handlers['click:ssr03-clusters']({ point: { x: 10, y: 10 } })
    })

    await waitFor(() => {
      expect(map.__getClusterLeaves).toHaveBeenCalledWith(42, 3, 0)
    })

    const sheet = await findByTestId('board-map-cluster-leaves')
    expect(sheet).toBeTruthy()
    expect(getByTestId('board-issues-map').getAttribute('data-nf20-leaves')).toBe('3')
    expect(getByTestId('board-map-cluster-leaf-ISSUE-1')).toBeTruthy()
    expect(getByTestId('board-map-cluster-leaf-ISSUE-2')).toBeTruthy()
    expect(getByTestId('board-map-cluster-leaf-ISSUE-3')).toBeTruthy()
  })

  it('count layer click uses same leaves affordance', async () => {
    const leaves = [
      { properties: { id: 'A', title: 'A' } },
      { properties: { id: 'B', title: 'B' } },
    ]
    const map = createMockMap({ leaves })
    map.queryRenderedFeatures = vi.fn(() => [
      {
        properties: { cluster_id: 7, point_count: 2 },
        geometry: { coordinates: [24.7, 59.4] },
      },
    ])

    globalThis.__boardMapReady = (onMapReady) => {
      act(() => {
        onMapReady(map)
      })
    }

    const { findByTestId } = render(
      <MemoryRouter>
        <BoardIssuesMap
          issues={[pinIssue('A'), pinIssue('B')]}
          resolveLocalizedText={(v) => v?.en ?? String(v)}
          t={makeT()}
        />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(map.__handlers['click:ssr03-cluster-count']).toBeTypeOf('function')
    })

    await act(async () => {
      map.__handlers['click:ssr03-cluster-count']({ point: { x: 1, y: 1 } })
    })

    expect(await findByTestId('board-map-cluster-leaves')).toBeTruthy()
    expect(map.__getClusterLeaves).toHaveBeenCalled()
  })

  it('co-located unclustered N>1 opens multi-path sheet (not features[0] only)', async () => {
    const map = createMockMap()
    map.queryRenderedFeatures = vi.fn(() => [
      { properties: { id: 'P1', title: 'Pin 1', label: '' } },
      { properties: { id: 'P2', title: 'Pin 2', label: '' } },
    ])

    globalThis.__boardMapReady = (onMapReady) => {
      act(() => {
        onMapReady(map)
      })
    }

    const { findByTestId, getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <BoardIssuesMap
          issues={[pinIssue('P1'), pinIssue('P2')]}
          resolveLocalizedText={(v) => v?.en ?? String(v)}
          t={makeT()}
        />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(map.__handlers['click:ssr03-unclustered']).toBeTypeOf('function')
    })

    await act(async () => {
      map.__handlers['click:ssr03-unclustered']({ point: { x: 5, y: 5 }, features: [] })
    })

    expect(await findByTestId('board-map-cluster-leaves')).toBeTruthy()
    expect(getByTestId('board-map-cluster-leaf-P1')).toBeTruthy()
    expect(getByTestId('board-map-cluster-leaf-P2')).toBeTruthy()
    expect(queryByTestId('board-map-pin-popup')).toBeNull()
  })

  it('single unclustered hit keeps pin popup path', async () => {
    const map = createMockMap()
    map.queryRenderedFeatures = vi.fn(() => [
      { properties: { id: 'ONLY', title: 'Only', label: 'here' } },
    ])

    globalThis.__boardMapReady = (onMapReady) => {
      act(() => {
        onMapReady(map)
      })
    }

    const { findByTestId, queryByTestId } = render(
      <MemoryRouter>
        <BoardIssuesMap
          issues={[pinIssue('ONLY')]}
          resolveLocalizedText={(v) => v?.en ?? String(v)}
          t={makeT()}
        />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(map.__handlers['click:ssr03-unclustered']).toBeTypeOf('function')
    })

    await act(async () => {
      map.__handlers['click:ssr03-unclustered']({
        point: { x: 2, y: 2 },
        features: [{ properties: { id: 'ONLY', title: 'Only', label: 'here' } }],
      })
    })

    expect(await findByTestId('board-map-pin-popup')).toBeTruthy()
    expect(queryByTestId('board-map-cluster-leaves')).toBeNull()
  })

  it('closing leaves sheet clears dialog', async () => {
    const leaves = [
      { properties: { id: 'X', title: 'X' } },
      { properties: { id: 'Y', title: 'Y' } },
    ]
    const map = createMockMap({ leaves })
    map.queryRenderedFeatures = vi.fn(() => [
      {
        properties: { cluster_id: 1, point_count: 2 },
        geometry: { coordinates: [24.75, 59.43] },
      },
    ])

    globalThis.__boardMapReady = (onMapReady) => {
      act(() => {
        onMapReady(map)
      })
    }

    const { findByTestId, queryByTestId, getByLabelText } = render(
      <MemoryRouter>
        <BoardIssuesMap
          issues={[pinIssue('X'), pinIssue('Y')]}
          resolveLocalizedText={(v) => v?.en ?? String(v)}
          t={makeT()}
        />
      </MemoryRouter>,
    )

    await waitFor(() => expect(map.__handlers['click:ssr03-clusters']).toBeTypeOf('function'))
    await act(async () => {
      map.__handlers['click:ssr03-clusters']({ point: { x: 1, y: 1 } })
    })
    await findByTestId('board-map-cluster-leaves')

    fireEvent.click(getByLabelText('schemaRuntime.map.clusterLeavesClose'))
    expect(queryByTestId('board-map-cluster-leaves')).toBeNull()
  })
})
