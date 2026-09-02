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
export function BoardIssuesMap({ issues, resolveLocalizedText, t, boardUrlForBack = '/board' }) {
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

        map.addLayer({
          id: UNCLUSTERED_LAYER,
          type: 'symbol',
          source: SOURCE_ID,
          filter: ['!', ['has', 'point_count']],
          layout: {
            'icon-image': PIN_IMAGE_ID,
            'icon-size': 0.45,
            'icon-allow-overlap': true,
            'icon-anchor': 'bottom',
          },
        })

        map.on('click', CLUSTER_LAYER, (e) => {
          const features = map.queryRenderedFeatures(e.point, { layers: [CLUSTER_LAYER] })
          const clusterId = features[0]?.properties?.cluster_id
          const source = map.getSource(SOURCE_ID)
          if (clusterId == null || !source?.getClusterExpansionZoom) return
          source.getClusterExpansionZoom(clusterId, (error, zoom) => {
            if (error) return
            map.easeTo({ center: features[0].geometry.coordinates, zoom })
          })
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

      const boot = () => {
        if (cancelled) return
        if (!map.hasImage(PIN_IMAGE_ID)) {
          map.loadImage('/icons/semantic-schema-runtime/ic-map-pin.png', (err, image) => {
            if (!cancelled && !err && image && !map.hasImage(PIN_IMAGE_ID)) {
              map.addImage(PIN_IMAGE_ID, image)
            }
            if (!cancelled) {
              ensureLayers()
              syncSource(map, geojsonRef.current)
            }
          })
        } else {
          ensureLayers()
          syncSource(map, geojsonRef.current)
        }
      }

      boot()

      return () => {
        cancelled = true
        mapRef.current = null
      }
    },
    [syncSource],
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

  return (
    <section className="board-issues-map" data-testid="board-issues-map" aria-label={t('schemaRuntime.map.toggle.map')}>
      {partial ? (
        <p className="board-issues-map-partial" data-testid="board-map-partial-hint">
          {t('schemaRuntime.map.partialHint')}
        </p>
      ) : null}
      <MapLibreMap onMapReady={onMapReady}>
        {popup ? (
          <div className="board-issues-map-popup" data-testid="board-map-pin-popup" role="dialog">
            <h3>{popup.title}</h3>
            {popup.label ? <p className="board-issues-map-popup-label">{popup.label}</p> : null}
            <Link
              className="board-issues-map-popup-open"
              to={`/issue/${popup.id}?from=${encodeURIComponent(boardUrlForBack)}`}
            >
              {t('schemaRuntime.map.pinOpen')}
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
        ) : null}
      </MapLibreMap>
    </section>
  )
}
