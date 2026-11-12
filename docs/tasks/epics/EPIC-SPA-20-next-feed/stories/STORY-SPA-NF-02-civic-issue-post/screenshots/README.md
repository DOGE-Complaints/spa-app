# STORY-SPA-NF-02 — story-root screenshots

**Primary pack:** `full-cycle/`  
**Anchor archive:** `../task-spa-nf-02-t01-civic-post-card/ui-baseline/`  
**Date:** `2026-10-10T18:41:45Z` · live SPA `127.0.0.1:4173` · gateway `:8000` **DOWN**  
**Capture:** Puppeteer request-intercept harness (`data.issues` envelope + CORS). Populated cards use labelled `DEMO-NF02-*` fixtures — **not** live gateway invent.

## full-cycle/ matrix (Path A · M150)

| File | Route / harness | State claim |
|------|-----------------|-------------|
| `01-feed-civic-error-retry-1536x1024.png` | `#/next/feed` · abort `/node/issues` | Error + Retry · honest DOWN |
| `02-feed-civic-empty-1536x1024.png` | `#/next/feed` · `issues: []` | Empty published list |
| `03-feed-civic-populated-demo-fixture-1536x1024.png` | `#/next/feed` · `DEMO-NF02-*` | Populated FeedCivicPost no-media (**demo fixture**) |
| `04-feed-civic-ssr-c-civic-no-schema-1536x1024.png` | fixture with `schema_card` present | SSR-C-civic — **no** schema overlay chrome |

**Not claimed:** schema/media production · NF-04/05 write · shell chrome ownership · unlabelled fake production cards.
