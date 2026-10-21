import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { getDocumentTheme } from '../../theme/bootTheme.js'
import './MapLibreMap.css'

/** Free dark vector style — no Mapbox/Google paid key (ADR D1/D3). */
export const MAPLIBRE_FREE_DARK_STYLE_URL =
  'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'

/** Free light vector style — Carto positron (NF-19 · ARCH-DELTA §7). */
export const MAPLIBRE_FREE_LIGHT_STYLE_URL =
  'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'

/**
 * Resolve basemap style URL from document theme (NF-19).
 * @param {'light' | 'dark' | string} [theme]
 * @returns {string}
 */
export function resolveMapLibreStyleUrl(theme) {
  return theme === 'light' ? MAPLIBRE_FREE_LIGHT_STYLE_URL : MAPLIBRE_FREE_DARK_STYLE_URL
}

/**
 * Thin MapLibre mount wrapper (Architecture §3). No business filters.
 * Basemap follows `data-theme` unless `styleUrl` override is passed (NF-19).
 *
 * @param {object} props
 * @param {string} [props.styleUrl] — optional override; omit to bind theme
 * @param {(map: import('maplibre-gl').Map) => void | (() => void)} [props.onMapReady]
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.children] — overlay UI (e.g. popup chrome outside canvas)
 */
export function MapLibreMap({
  styleUrl: styleUrlProp,
  onMapReady,
  className = '',
  children,
}) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const onMapReadyRef = useRef(onMapReady)
  onMapReadyRef.current = onMapReady

  const [documentTheme, setDocumentTheme] = useState(() => getDocumentTheme())

  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    const root = document.documentElement
    const sync = () => setDocumentTheme(getDocumentTheme())
    sync()
    const obs = new MutationObserver(sync)
    obs.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  const styleUrl =
    typeof styleUrlProp === 'string' && styleUrlProp.length > 0
      ? styleUrlProp
      : resolveMapLibreStyleUrl(documentTheme)

  const basemapTheme =
    styleUrl === MAPLIBRE_FREE_LIGHT_STYLE_URL
      ? 'light'
      : styleUrl === MAPLIBRE_FREE_DARK_STYLE_URL
        ? 'dark'
        : documentTheme

  useEffect(() => {
    if (!containerRef.current) return undefined

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: styleUrl,
      center: [24.7536, 59.437],
      zoom: 10,
      attributionControl: true,
    })
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
    mapRef.current = map

    let cleanupReady
    map.on('load', () => {
      if (typeof onMapReadyRef.current === 'function') {
        cleanupReady = onMapReadyRef.current(map)
      }
    })

    return () => {
      if (typeof cleanupReady === 'function') cleanupReady()
      map.remove()
      mapRef.current = null
    }
  }, [styleUrl])

  return (
    <div
      className={`maplibre-map-root ${className}`.trim()}
      data-testid="maplibre-map"
      data-nf19-basemap={basemapTheme}
      data-map-style-url={styleUrl}
    >
      <div ref={containerRef} className="maplibre-map-canvas" />
      {children}
    </div>
  )
}
