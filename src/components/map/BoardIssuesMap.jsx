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
/** Soft cap for getClusterLeaves (NF-20 · all N reachable). */
const CLUSTER_LEAVES_LIMIT = 200

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
 * @param {GeoJSON.Feature[]} features
 * @returns {{ id: string, title: string, label: string }[]}
 */
export function mapFeaturesToClusterLeaves(features) {
  if (!Array.isArray(features)) return []
  return features.map((f) => ({
    id: String(f?.properties?.id ?? ''),
    title: String(f?.properties?.title ?? f?.properties?.id ?? ''),
    label: typeof f?.properties?.label === 'string' ? f.properties.label : '',
  })).filter((leaf) => leaf.id)
}

/**
 * Board map of pin-capable Issues (ADR D2–D8 · Architecture §3–4).
 * NF-20: cluster tap → getClusterLeaves → list/sheet (zoom-only alone ≠ Done).
 * Pin → popup → Open (not direct navigate).
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
  /** @type {[null | { leaves: { id: string, title: string, label: string }[], clusterId: number | string | null }, Function]} */
  const [leavesSheet, setLeavesSheet] = useState(null)
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

      const openLeavesFromFeatures = (features, clusterId = null) => {
        const leaves = mapFeaturesToClusterLeaves(features)
        if (leaves.length === 0) return
        if (leaves.length === 1) {
          setLeavesSheet(null)
          setPopup(leaves[0])
          return
        }
        setPopup(null)
        setLeavesSheet({ leaves, clusterId })
      }

      const openClusterLeaves = (clusterFeature) => {
        const clusterId = clusterFeature?.properties?.cluster_id
        const source = map.getSource(SOURCE_ID)
        const pointCount = Number(clusterFeature?.properties?.point_count) || CLUSTER_LEAVES_LIMIT
        if (clusterId == null || !source?.getClusterLeaves) return
        const limit = Math.min(Math.max(pointCount, 1), CLUSTER_LEAVES_LIMIT)
        void source
          .getClusterLeaves(clusterId, limit, 0)
          .then((leafFeatures) => {
            if (cancelled) return
            openLeavesFromFeatures(leafFeatures, clusterId)
          })
          .catch(() => {})
      }

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

        const onClusterAffordance = (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: [CLUSTER_LAYER, CLUSTER_COUNT_LAYER],
          })
          const clusterFeature = features.find((f) => f?.properties?.cluster_id != null) || features[0]
          if (!clusterFeature) return
          // NF-20: getClusterLeaves → list/sheet (zoom-only alone ≠ Done). Soft ease for context.
          openClusterLeaves(clusterFeature)
          const source = map.getSource(SOURCE_ID)
          const clusterId = clusterFeature.properties?.cluster_id
          if (clusterId != null && source?.getClusterExpansionZoom) {
            void source
              .getClusterExpansionZoom(clusterId)
              .then((zoom) => {
                if (cancelled) return
                map.easeTo({ center: clusterFeature.geometry.coordinates, zoom })
              })
              .catch(() => {})
          }
        }

        map.on('click', CLUSTER_LAYER, onClusterAffordance)
        map.on('click', CLUSTER_COUNT_LAYER, onClusterAffordance)

        map.on('click', UNCLUSTERED_LAYER, (e) => {
          // FR-NF-20.4: co-located N>1 → multi-path list (not silent features[0] only).
          const hits = map.queryRenderedFeatures(e.point, { layers: [UNCLUSTERED_LAYER] })
          if (!hits.length) return
          if (hits.length > 1) {
            openLeavesFromFeatures(hits, null)
            return
          }
          const feature = hits[0]
          setLeavesSheet(null)
          setPopup({
            id: feature.properties.id,
            title: feature.properties.title,
            label: feature.properties.label || '',
          })
        })

        map.on('click', (e) => {
          const hits = map.queryRenderedFeatures(e.point, {
            layers: [UNCLUSTERED_LAYER, CLUSTER_LAYER, CLUSTER_COUNT_LAYER],
          })
          if (!hits.length) {
            setPopup(null)
            setLeavesSheet(null)
          }
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
        setPointer(CLUSTER_COUNT_LAYER)
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
  const leavesTitle = t('schemaRuntime.map.clusterLeavesTitle')
  const leavesClose = t('schemaRuntime.map.clusterLeavesClose')

  return (
    <section
      className="board-issues-map"
      data-testid="board-issues-map"
      data-nf20-leaves={leavesSheet ? String(leavesSheet.leaves.length) : '0'}
      aria-label={t('schemaRuntime.map.toggle.map')}
    >
      {showPartialHint && partial ? (
        <p className="board-issues-map-partial" data-testid="board-map-partial-hint">
          {t('schemaRuntime.map.partialHint')}
        </p>
      ) : null}
      <MapLibreMap onMapReady={onMapReady}>
        {leavesSheet ? (
          <div
            className="board-issues-map-leaves"
            data-nf24="true"
            data-testid="board-map-cluster-leaves"
            data-nf20-basemap="leaves-sheet"
            role="dialog"
            aria-label={leavesTitle}
          >
            <h3>{leavesTitle}</h3>
            <ul className="board-issues-map-leaves-list" data-testid="board-map-cluster-leaves-list">
              {leavesSheet.leaves.map((leaf) => {
                const href = `${issuePathPrefix}/${leaf.id}?from=${encodeURIComponent(boardUrlForBack)}`
                return (
                  <li key={leaf.id}>
                    <Link
                      className="board-issues-map-leaves-link"
                      to={href}
                      data-testid={`board-map-cluster-leaf-${leaf.id}`}
                    >
                      <span className="board-issues-map-leaves-title">{leaf.title}</span>
                      {leaf.label ? (
                        <span className="board-issues-map-leaves-label">{leaf.label}</span>
                      ) : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <button
              type="button"
              className="board-issues-map-popup-close"
              onClick={() => setLeavesSheet(null)}
              aria-label={leavesClose}
            >
              ×
            </button>
          </div>
        ) : popup
          ? typeof renderPinPreview === 'function'
            ? renderPinPreview({
                popup,
                onClose: () => setPopup(null),
                openHref,
                openLabel,
              })
            : (
              <div
                className="board-issues-map-popup"
                data-testid="board-map-pin-popup"
                data-nf24="true"
                role="dialog"
              >
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
