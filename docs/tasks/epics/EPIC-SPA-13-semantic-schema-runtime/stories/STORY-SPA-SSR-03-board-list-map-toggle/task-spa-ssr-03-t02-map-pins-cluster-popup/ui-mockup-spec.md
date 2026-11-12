# UI mockup spec — SPA-SSR-03-T02 (extends M142)

**Path A ready** — no invent artboard.

```text
extends mockup: spa-app/docs/UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.md
extends mockup: spa-app/docs/UX/mockups/semantic-schema/mockup-142-board-list-map-toggle-state-sheet-spec.png
```

## Delta (this task)

| Item | Target |
|------|--------|
| Host | `/#/board` continuum when Issues present |
| Toggle | List\|Map text + catalog glyphs; Map disabled when \|P\|=0 |
| Map | MapLibre free dark vector; pins from lat+lon; cluster zoom; popup→Open; fitBounds |
| List | Full resultset R (T03) |
| OOS | bbox invent · pack.json · Mapbox/Google |

## Stack (T00)

- `maplibre-gl` ^4.7.1
- Style: `https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json` (no paid key)
- Cluster: MapLibre GeoJSON `cluster: true` · expand = zoom only
