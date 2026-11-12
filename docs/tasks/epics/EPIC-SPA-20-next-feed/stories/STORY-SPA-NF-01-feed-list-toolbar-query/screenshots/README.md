# STORY-SPA-NF-01 — story-root screenshots

**Primary pack:** `full-cycle/`  
**Anchor archive:** `../task-spa-nf-01-t01-features-feed-host/ui-baseline/`  
**Date:** `2026-10-10T18:08:39Z` · live SPA `127.0.0.1:4173` · gateway `:8000` **DOWN**  
**Capture:** Puppeteer request-intercept harness (empty / demo-fixture populated / hold-loading / fail-error / stale via filter refetch). Populated cards use labelled `DEMO-NF01-*` fixtures — **not** live gateway invent.

## full-cycle/ matrix (Path A)

| File | Route / harness | State claim |
|------|-----------------|-------------|
| `01-feed-list-error-retry-1536x1024.png` | `#/next/feed` · abort `/node/issues` | Error + Retry (M149 D1) · honest DOWN |
| `02-feed-toolbar-search-unavailable-1536x1024.png` | `#/next/feed` | DUI-Q12 search unavailable + Filters |
| `03-hash-root-lands-next-feed.png` | `#/` | Default entry → feed host |
| `04-feed-list-loading-1536x1024.png` | `#/next/feed` · held issues request | Loading skeletons (`aria-busy`) |
| `05-feed-list-empty-1536x1024.png` | `#/next/feed` · `issues: []` | Empty published list |
| `06-feed-list-filtered-empty-1536x1024.png` | `#/next/feed?type=INCIDENT` · `[]` | Filtered empty + clear |
| `07-feed-list-populated-demo-fixture-1536x1024.png` | `#/next/feed` · `DEMO-NF01-*` | Populated (**demo fixture** provenance) |
| `08-feed-list-stale-1536x1024.png` | filter refetch fail after populate | Stale banner + cached cards + Retry |

**Removed (F2):** `01-feed-list-happy-1536x1024.png` (misnamed error frame).

**Not claimed:** live search enable · shell chrome ownership · unlabelled fake production cards.
