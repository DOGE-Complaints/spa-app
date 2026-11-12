# early-signal-dashboard — INDEX

> **Пакет:** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> **REQ:** [15-early-signal-pre-cluster-public-dashboard.md](../../../requirements/15-early-signal-pre-cluster-public-dashboard.md)  
> **Режим:** ADMIN queue **6/6** (01…06 Done) · **ES-01 Done** (`pkg-000066` P7) · **ES-02 Done** (`pkg-000067` P7) · **ES-03 Done** (`pkg-000068` P7) · **ES-04 Done** (`pkg-000069` P6 F1/F2 CLOSED · F3 WAIVED) · **ES-05 Done** (`pkg-000070` P3 2026-08-17T13:10:12Z) · product **5 Done**

## Admin queue

| Key | File | Status | Next |
|-----|------|--------|------|
| ADMIN-ESD-01 | [ADMIN-ESD-01-product-ux-prompts.md](ADMIN-ESD-01-product-ux-prompts.md) | **Done** | [UX-PROMPTS.md](UX-PROMPTS.md) |
| ADMIN-ESD-02 | [ADMIN-ESD-02-ux-mockup-intake.md](ADMIN-ESD-02-ux-mockup-intake.md) | **Done** | [early-discovery-dashboard/](../../../UX/mockups/early-discovery-dashboard/) M136–M140 |
| ADMIN-ESD-03 | [ADMIN-ESD-03-icon-assets-catalog.md](ADMIN-ESD-03-icon-assets-catalog.md) | **Done** | [STORY-SPA-ES-icon-assets.md](STORY-SPA-ES-icon-assets.md) |
| ADMIN-ESD-04 | [ADMIN-ESD-04-api-requirements.md](ADMIN-ESD-04-api-requirements.md) | **Done** | [STORY-SPA-ES-api-requirements.md](STORY-SPA-ES-api-requirements.md) |
| ADMIN-ESD-05 | [ADMIN-ESD-05-backlog-stories-l10n.md](ADMIN-ESD-05-backlog-stories-l10n.md) | **Done** | ES-01…05 Todo |
| ADMIN-ESD-06 | [ADMIN-ESD-06-tech-decomposition.md](ADMIN-ESD-06-tech-decomposition.md) | **Done** | [EPIC-SPA-12](../../epics/EPIC-SPA-12-early-signal-dashboard/EPIC-SPA-12-early-signal-dashboard.md) |

**Execute order:** 01 → 02 → 03 ∥ 04 → 05 → 06

## Product stories

| Key | File | Status | Epic |
|-----|------|--------|------|
| ES-01 | [STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md](STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md) | **Done** | [EPIC-SPA-12](../../epics/EPIC-SPA-12-early-signal-dashboard/EPIC-SPA-12-early-signal-dashboard.md) Wave 1 |
| ES-02 | [STORY-SPA-ES-02-network-pulse-block.md](STORY-SPA-ES-02-network-pulse-block.md) | **Done** | Wave 2 |
| ES-03 | [STORY-SPA-ES-03-emerging-signals-provisional.md](STORY-SPA-ES-03-emerging-signals-provisional.md) | **Done** | Wave 2 |
| ES-04 | [STORY-SPA-ES-04-coverage-gaps-contribution.md](STORY-SPA-ES-04-coverage-gaps-contribution.md) | **Done** | Wave 3 |
| ES-05 | [STORY-SPA-ES-05-issues-continuum-regression.md](STORY-SPA-ES-05-issues-continuum-regression.md) | **Done** | Wave 4 |

L10N namespace: `earlySignal.*` · discovery testid: `board-early-signal-discovery`

## Icon assets

- Catalog: [STORY-SPA-ES-icon-assets.md](STORY-SPA-ES-icon-assets.md) · dir `public/icons/early-signal-dashboard/`

## API requirements

- [STORY-SPA-ES-api-requirements.md](STORY-SPA-ES-api-requirements.md) — **full FE contract**: Pulse L1 · Emerging L2 · Issues L3 · bind/omit · envelopes

## Tech / epic

- ADR + subtasks: [ADMIN-ESD-06](ADMIN-ESD-06-tech-decomposition.md)
- Epic: [EPIC-SPA-12-early-signal-dashboard](../../epics/EPIC-SPA-12-early-signal-dashboard/EPIC-SPA-12-early-signal-dashboard.md)

## Cross-links

- Sibling gateway: [REQ-48](../../../../../doge-complaints-gateway/docs/requirements/48-early-signal-pre-cluster-data-readiness.md) · [REQ-49](../../../../../doge-complaints-gateway/docs/requirements/49-early-signal-network-pulse-l1-api.md) · [REQ-50](../../../../../doge-complaints-gateway/docs/requirements/50-early-signal-emerging-l2-api.md)
- Board host: PH-04 ([../public-home/STORY-SPA-PH-04-board-feed-home.md](../public-home/STORY-SPA-PH-04-board-feed-home.md))
- Local 2026-08-18 login + board fail under `npm start` is **not** an ES-01…05 / Pulse / Emerging / issues API regression (backends were not called). Follow-up bake/DX stories: [BUG-06](../bugs/STORY-SPA-BUG-06-stale-placeholder-bake-npm-start.md) · [BUG-07](../bugs/STORY-SPA-BUG-07-start-preview-docs-drift.md) · [BUG-08](../bugs/STORY-SPA-BUG-08-vite-public-env-normalize-seam.md) · [investigation](../../../analysis/investigation-local-login-issues-npm-start-placeholder-bake-2026-08-18.md)
