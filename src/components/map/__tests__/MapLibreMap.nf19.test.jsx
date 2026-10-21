/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, act, waitFor, cleanup } from '@testing-library/react'
import {
  MAPLIBRE_FREE_DARK_STYLE_URL,
  MAPLIBRE_FREE_LIGHT_STYLE_URL,
  resolveMapLibreStyleUrl,
  MapLibreMap,
} from '../MapLibreMap.jsx'

const mapInstances = []

vi.mock('maplibre-gl', () => {
  class Map {
    constructor(opts) {
      this.style = opts.style
      this._loadHandlers = []
      mapInstances.push(this)
      queueMicrotask(() => {
        for (const fn of this._loadHandlers) fn()
      })
    }
    on(event, fn) {
      if (event === 'load') this._loadHandlers.push(fn)
    }
    addControl() {}
    remove() {
      this.removed = true
    }
    setStyle(url) {
      this.style = url
    }
  }
  class NavigationControl {
    constructor() {}
  }
  return {
    default: { Map, NavigationControl },
    Map,
    NavigationControl,
  }
})

describe('NF-19 MapLibre basemap follows theme', () => {
  beforeEach(() => {
    mapInstances.length = 0
    document.documentElement.setAttribute('data-theme', 'dark')
  })

  afterEach(() => {
    cleanup()
    document.documentElement.removeAttribute('data-theme')
  })

  it('resolveMapLibreStyleUrl picks positron for light and dark-matter for dark', () => {
    expect(resolveMapLibreStyleUrl('light')).toBe(MAPLIBRE_FREE_LIGHT_STYLE_URL)
    expect(resolveMapLibreStyleUrl('dark')).toBe(MAPLIBRE_FREE_DARK_STYLE_URL)
    expect(resolveMapLibreStyleUrl('light')).toContain('positron')
    expect(resolveMapLibreStyleUrl('dark')).toContain('dark-matter')
  })

  it('mounts with dark-matter when data-theme=dark', async () => {
    document.documentElement.setAttribute('data-theme', 'dark')
    const { getByTestId } = render(<MapLibreMap />)
    await act(async () => {
      await Promise.resolve()
    })
    const root = getByTestId('maplibre-map')
    expect(root.getAttribute('data-nf19-basemap')).toBe('dark')
    expect(root.getAttribute('data-map-style-url')).toBe(MAPLIBRE_FREE_DARK_STYLE_URL)
    expect(mapInstances[0]?.style).toBe(MAPLIBRE_FREE_DARK_STYLE_URL)
  })

  it('mounts with positron when data-theme=light', async () => {
    document.documentElement.setAttribute('data-theme', 'light')
    const { getByTestId } = render(<MapLibreMap />)
    await act(async () => {
      await Promise.resolve()
    })
    const root = getByTestId('maplibre-map')
    expect(root.getAttribute('data-nf19-basemap')).toBe('light')
    expect(root.getAttribute('data-map-style-url')).toBe(MAPLIBRE_FREE_LIGHT_STYLE_URL)
    expect(mapInstances[0]?.style).toBe(MAPLIBRE_FREE_LIGHT_STYLE_URL)
  })

  it('theme change after mount remounts with new style (not mount-once ignore)', async () => {
    document.documentElement.setAttribute('data-theme', 'dark')
    const { getByTestId } = render(<MapLibreMap />)
    await act(async () => {
      await Promise.resolve()
    })
    expect(mapInstances[0]?.style).toBe(MAPLIBRE_FREE_DARK_STYLE_URL)

    await act(async () => {
      document.documentElement.setAttribute('data-theme', 'light')
    })

    await waitFor(() => {
      expect(getByTestId('maplibre-map').getAttribute('data-nf19-basemap')).toBe('light')
    })

    expect(getByTestId('maplibre-map').getAttribute('data-map-style-url')).toBe(
      MAPLIBRE_FREE_LIGHT_STYLE_URL,
    )
    expect(mapInstances.length).toBeGreaterThanOrEqual(2)
    expect(mapInstances.at(-1)?.style).toBe(MAPLIBRE_FREE_LIGHT_STYLE_URL)
    expect(mapInstances[0]?.removed).toBe(true)
  })

  it('explicit styleUrl override wins over data-theme', async () => {
    document.documentElement.setAttribute('data-theme', 'light')
    const { getByTestId } = render(
      <MapLibreMap styleUrl={MAPLIBRE_FREE_DARK_STYLE_URL} />,
    )
    await act(async () => {
      await Promise.resolve()
    })
    expect(getByTestId('maplibre-map').getAttribute('data-map-style-url')).toBe(
      MAPLIBRE_FREE_DARK_STYLE_URL,
    )
    expect(mapInstances[0]?.style).toBe(MAPLIBRE_FREE_DARK_STYLE_URL)
  })
})
