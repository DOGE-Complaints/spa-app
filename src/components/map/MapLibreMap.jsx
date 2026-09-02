import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import './MapLibreMap.css'

/** Free dark vector style — no Mapbox/Google paid key (ADR D1/D3). Recorded T00. */
export const MAPLIBRE_FREE_DARK_STYLE_URL =
  'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'

/**
 * Thin MapLibre mount wrapper (Architecture §3). No business filters.
 *
 * @param {object} props
 * @param {string} [props.styleUrl]
 * @param {(map: import('maplibre-gl').Map) => void | (() => void)} [props.onMapReady]
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.children] — overlay UI (e.g. popup chrome outside canvas)
 */
export function MapLibreMap({
  styleUrl = MAPLIBRE_FREE_DARK_STYLE_URL,
  onMapReady,
  className = '',
  children,
}) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return undefined

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
      if (typeof onMapReady === 'function') {
        cleanupReady = onMapReady(map)
      }
    })

    return () => {
      if (typeof cleanupReady === 'function') cleanupReady()
      map.remove()
      mapRef.current = null
    }
    // styleUrl / onMapReady: mount once per container lifecycle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`maplibre-map-root ${className}`.trim()} data-testid="maplibre-map">
      <div ref={containerRef} className="maplibre-map-canvas" />
      {children}
    </div>
  )
}
