# STORY-SPA-NF-03 — story-root screenshots

**Primary pack:** `full-cycle/`  
**Anchor archive:** `../task-spa-nf-03-t01-list-map-toggle/ui-baseline/`  
**Date:** `2026-10-10T19:03:46Z` · live SPA `127.0.0.1:4173` · gateway `:8000` **DOWN**  
**Capture:** Puppeteer intercept (`data.issues` + CORS). Populated = labelled `DEMO-NF03-*` fixtures — **not** live gateway invent.  
**P6:** F1 MAP-ERROR + F2 pins visible (`run_mode=spa_nf_03_audit_2026_10_10`)

## full-cycle/ matrix (Path A · M151)

| File | Route / harness | State claim |
|------|-----------------|-------------|
| `00-feed-host-error-retry-1536x1024.png` | abort `/node/issues` | Host feed error + Retry (**not** MAP-ERROR) |
| `01-feed-map-error-retry-1536x1024.png` | DEMO-NF03 · Map · `sessionStorage nf03-demo-map-error=1` | **MAP-ERROR** · `feed-map-error` + List return |
| `02-feed-list-view-demo-fixture-1536x1024.png` | DEMO-NF03 · List active | SSR-M-list · toggle + cards |
| `03-feed-map-view-partial-demo-fixture-1536x1024.png` | Map · 2/3 pins | SSR-M-map/partial · **≥1 pin visible** + partial helper |
| `04-feed-map-ineligible-demo-fixture-1536x1024.png` | no lat/lon | SSR-M-ineligible · Map disabled |

**Not claimed:** invent map HTTP · shell ownership · unlabelled production pins · Q14 privacy product decision.
