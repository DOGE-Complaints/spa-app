# public-home icons

## Functional `ic-*`

Generated via Lucide pipeline (256×256 RGBA):

```bash
npm run icons:generate
# or: python3 scripts/generate-icons-from-lucide.py --catalog ph
```

Source mapping: [icon-manifest.yaml](../../../scripts/icons/icon-manifest.yaml)  
Catalog: [STORY-SPA-PH-icon-assets.md](../../../docs/tasks/backlog-stories/public-home/STORY-SPA-PH-icon-assets.md)

## Cultural `etm-*`

Photo-derived from Estonian textile references (preserves wool/thread realism):

- [floral-band-reference.png](../../../docs/UX/eesti/floral-band-reference.png) → floral band, divider, rosettes, watermark, step shell
- [skirt_ornament_reference.png](../../../docs/UX/eesti/skirt_ornament_reference.png) → vertical stripe + stripe-cap

```bash
npm run icons:etm
```

Generator: [generate-etm-from-refs.py](../../../scripts/generate-etm-from-refs.py)  
Contact sheet: [etm-contact-sheet.png](../../../docs/tasks/backlog-stories/icons/etm-contact-sheet.png)
