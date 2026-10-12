import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import maplibregl from 'maplibre-gl'
import { MapLibreMap } from './MapLibreMap.jsx'
import { issuesToPinGeoJson, listPinCapableIssues } from '../../map/issueGeo.js'
import './BoardIssuesMap.css'

const SOURCE_ID = 'ssr03-issue-pins'
const CLUSTER_LAYER = 'ssr03-clusters'
const CLUSTER_COUNT_LAYER = 'ssr03-cluster-count'
const UNCLUSTERED_LAYER = 'ssr03-unclustered'
const PIN_IMAGE_ID = 'ssr03-ic-map-pin'

function fitToFeatures(map, featureCollection) {
  const bounds = new maplibregl.LngLatBounds()
  let hasPoint = false
  for (const f of featureCollection.features) {
    bounds.extend(f.geometry.coordinates)
    hasPoint = true
  }
  if (hasPoint) {
    map.fitBounds(bounds, { padding: 48, maxZoom: 14, duration: 0 })
  }
}

/**
 * Board map of pin-capable Issues (ADR D2–D8 · Architecture §3–4).
 * Cluster tap = zoom only; pin → popup → Open (not direct navigate).
 */
/**
 * @param {object} props
 * @param {import('../../domain/types.js').Issue[]} props.issues
 * @param {(field: unknown) => string} props.resolveLocalizedText
 * @param {(k: string) => string} props.t
 * @param {string} [props.boardUrlForBack]
 * @param {string} [props.pinImageUrl] — runtime pin asset (NF-03: `/icons/next-feed/map/map-pin.svg`)
 * @param {string} [props.issuePathPrefix] — Open-issue path prefix (`/issue` or `/next/feed/issue`)
 * @param {boolean} [props.showPartialHint] — classic board default true; next-feed BoardMap uses MapSubsetNotice
 * @param {(args: { popup: { id: string, title: string, label: string }, onClose: () => void, openHref: string, openLabel: string }) => import('react').ReactNode} [props.renderPinPreview]
 */
export function BoardIssuesMap({
  issues,
  resolveLocalizedText,
  t,
  boardUrlForBack = '/board',
  pinImageUrl = '/icons/semantic-schema-runtime/ic-map-pin.png',
  issuePathPrefix = '/issue',
  showPartialHint = true,
  renderPinPreview = null,
}) {
  const pinIssues = useMemo(() => listPinCapableIssues(issues), [issues])
  const geojson = useMemo(
    () => issuesToPinGeoJson(pinIssues, resolveLocalizedText),
    [pinIssues, resolveLocalizedText],
  )
  const [popup, setPopup] = useState(null)
  const mapRef = useRef(null)
  const geojsonRef = useRef(geojson)
  geojsonRef.current = geojson
  const partial = pinIssues.length > 0 && pinIssues.length < issues.length

  // Path A / local-five demo harness (mirrors nf03-demo-map-error) — no invent map HTTP.
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      if (window.sessionStorage?.getItem('nf-vl-10-demo-pin-preview') !== '1') return
      const issue = pinIssues[0]
      if (!issue) return
      const title =
        typeof resolveLocalizedText === 'function'
          ? resolveLocalizedText(issue.title) || String(issue.title ?? issue.id)
          : String(issue.title ?? issue.id)
      setPopup({
        id: String(issue.id),
        title,
        label: issue.geo?.label ? String(issue.geo.label) : '',
      })
    } catch {
      /* ignore */
    }
  }, [pinIssues, resolveLocalizedText])

  const syncSource = useCallback((map, data) => {
    const source = map.getSource(SOURCE_ID)
    if (source) {
      source.setData(data)
      fitToFeatures(map, data)
    }
  }, [])

  const onMapReady = useCallback(
    (map) => {
      mapRef.current = map
      let cancelled = false

      const ensureLayers = () => {
        if (map.getSource(SOURCE_ID)) return

        map.addSource(SOURCE_ID, {
          type: 'geojson',
          data: geojsonRef.current,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 42,
        })

        map.addLayer({
          id: CLUSTER_LAYER,
          type: 'circle',
          source: SOURCE_ID,
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': '#F5A623',
            'circle-radius': ['step', ['get', 'point_count'], 16, 8, 20, 25, 26],
            'circle-opacity': 0.85,
          },
        })

        map.addLayer({
          id: CLUSTER_COUNT_LAYER,
          type: 'symbol',
          source: SOURCE_ID,
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-size': 12,
          },
          paint: { 'text-color': '#0b121e' },
        })

        if (map.hasImage(PIN_IMAGE_ID)) {
          map.addLayer({
            id: UNCLUSTERED_LAYER,
            type: 'symbol',
            source: SOURCE_ID,
            filter: ['!', ['has', 'point_count']],
            layout: {
              'icon-image': PIN_IMAGE_ID,
              'icon-size': 0.55,
              'icon-allow-overlap': true,
              'icon-anchor': 'bottom',
            },
          })
        } else {
          // Fail-visible: circle markers when pin raster not ready (NF-03 / MapLibre SVG/PNG race).
          map.addLayer({
            id: UNCLUSTERED_LAYER,
            type: 'circle',
            source: SOURCE_ID,
            filter: ['!', ['has', 'point_count']],
            paint: {
              'circle-color': '#E11D48',
              'circle-radius': 9,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#ffffff',
            },
          })
        }

        map.on('click', CLUSTER_LAYER, (e) => {
          const features = map.queryRenderedFeatures(e.point, { layers: [CLUSTER_LAYER] })
          const clusterId = features[0]?.properties?.cluster_id
          const source = map.getSource(SOURCE_ID)
          if (clusterId == null || !source?.getClusterExpansionZoom) return
          // MapLibre v4: Promise API (callback arity ignored)
          void source
            .getClusterExpansionZoom(clusterId)
            .then((zoom) => {
              map.easeTo({ center: features[0].geometry.coordinates, zoom })
            })
            .catch(() => {})
          setPopup(null)
        })

        map.on('click', UNCLUSTERED_LAYER, (e) => {
          const feature = e.features?.[0]
          if (!feature) return
          setPopup({
            id: feature.properties.id,
            title: feature.properties.title,
            label: feature.properties.label || '',
          })
        })

        map.on('click', (e) => {
          const hits = map.queryRenderedFeatures(e.point, {
            layers: [UNCLUSTERED_LAYER, CLUSTER_LAYER],
          })
          if (!hits.length) setPopup(null)
        })

        const setPointer = (layer) => {
          map.on('mouseenter', layer, () => {
            map.getCanvas().style.cursor = 'pointer'
          })
          map.on('mouseleave', layer, () => {
            map.getCanvas().style.cursor = ''
          })
        }
        setPointer(CLUSTER_LAYER)
        setPointer(UNCLUSTERED_LAYER)
      }

      const loadPinImage = async () => {
        if (map.hasImage(PIN_IMAGE_ID)) return true
        try {
          // Prefer HTMLImageElement so catalog SVG/PNG pins can load in Chromium.
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.src = pinImageUrl
          await Promise.race([
            img.decode(),
            new Promise((_, reject) => {
              setTimeout(() => reject(new Error('pin decode timeout')), 2500)
            }),
          ])
          if (!cancelled && !map.hasImage(PIN_IMAGE_ID)) {
            map.addImage(PIN_IMAGE_ID, img, { pixelRatio: 2 })
          }
          return map.hasImage(PIN_IMAGE_ID)
        } catch (err) {
          console.warn('[BoardIssuesMap] pin Image decode failed', err)
          try {
            const response = await map.loadImage(pinImageUrl)
            const image = response?.data
            if (!cancelled && image && !map.hasImage(PIN_IMAGE_ID)) {
              map.addImage(PIN_IMAGE_ID, image)
            }
            return map.hasImage(PIN_IMAGE_ID)
          } catch (fallbackErr) {
            console.warn('[BoardIssuesMap] loadImage fallback failed', fallbackErr)
            return false
          }
        }
      }

      const boot = async () => {
        if (cancelled) return
        // Mount source/layers first so pins are never basemap-only while decode hangs.
        ensureLayers()
        syncSource(map, geojsonRef.current)
        const ok = await loadPinImage()
        if (cancelled || !ok || typeof map.getLayer !== 'function') return
        // Upgrade circle fallback → symbol pin when raster arrives after first paint.
        const layer = map.getLayer(UNCLUSTERED_LAYER)
        if (layer && layer.type === 'circle') {
          map.removeLayer(UNCLUSTERED_LAYER)
          map.addLayer({
            id: UNCLUSTERED_LAYER,
            type: 'symbol',
            source: SOURCE_ID,
            filter: ['!', ['has', 'point_count']],
            layout: {
              'icon-image': PIN_IMAGE_ID,
              'icon-size': 0.55,
              'icon-allow-overlap': true,
              'icon-anchor': 'bottom',
            },
          })
        }
      }

      void boot()

      return () => {
        cancelled = true
        mapRef.current = null
      }
    },
    [syncSource, pinImageUrl],
  )

  useEffect(() => {
    if (mapRef.current?.getSource(SOURCE_ID)) {
      syncSource(mapRef.current, geojson)
    }
  }, [geojson, syncSource])

  if (pinIssues.length === 0) {
    return (
      <div className="board-issues-map-empty" data-testid="board-map-empty-pins" role="status">
        {t('schemaRuntime.map.emptyPins')}
      </div>
    )
  }

  const openHref = popup
    ? `${issuePathPrefix}/${popup.id}?from=${encodeURIComponent(boardUrlForBack)}`
    : ''
  const openLabel = t('schemaRuntime.map.pinOpen')

  return (
    <section className="board-issues-map" data-testid="board-issues-map" aria-label={t('schemaRuntime.map.toggle.map')}>
      {showPartialHint && partial ? (
        <p className="board-issues-map-partial" data-testid="board-map-partial-hint">
          {t('schemaRuntime.map.partialHint')}
        </p>
      ) : null}
      <MapLibreMap onMapReady={onMapReady}>
        {popup
          ? typeof renderPinPreview === 'function'
            ? renderPinPreview({
                popup,
                onClose: () => setPopup(null),
                openHref,
                openLabel,
              })
            : (
              <div className="board-issues-map-popup" data-testid="board-map-pin-popup" role="dialog">
                <h3>{popup.title}</h3>
                {popup.label ? <p className="board-issues-map-popup-label">{popup.label}</p> : null}
                <Link className="board-issues-map-popup-open" to={openHref}>
                  {openLabel}
                </Link>
                <button
                  type="button"
                  className="board-issues-map-popup-close"
                  onClick={() => setPopup(null)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            )
          : null}
      </MapLibreMap>
    </section>
  )
}
