# UI-0 baseline — SPA-PH-10-T02

- **Captured:** 2026-08-07T20:50:39Z (pre-Header wire; assets already on disk from T01)
- **Route:** `http://127.0.0.1:4173/#/board`
- **Viewport:** `1536×1024`
- **Selectors:** `[data-testid="public-header-brand"]`, `img.header-brand-logo`, `.header-brand-name`
- **Env:** `npm run dev -- --host 127.0.0.1 --port 4173`
- **FAKE-OLD / known pre-state:** circular `DOGEstonia-logo-big.png` + visible text span `DOGEstonia`

## DOM snapshot (pre)

```json
{
  "href": "#/board",
  "imgSrc": "/assets/DOGEstonia-logo-big.png",
  "imgAlt": "DOGEstonia logo",
  "hasNameSpan": true,
  "nameText": "DOGEstonia"
}
```

## Files

| File | Role |
|------|------|
| [`01-board-default.png`](./01-board-default.png) | Full board chrome baseline |
| [`02-header-brand.png`](./02-header-brand.png) | Brand link crop (circular + text) |
| [`post-implement/`](./post-implement/) | Filled at UI-3 after T02 |

## Capture method

Primary: MCP `user-puppeteer` navigate + screenshot. On-disk copies: Puppeteer script → this folder.
