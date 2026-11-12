# REQ-21 — UI modularity, theme & redesign-prep (Phase 0) · index

**Зона:** `spa-app/docs/tasks/backlog-stories/ui-modularity-theme-redesign-prep/`  
**Тип:** backlog (Phase 0 prep only; P1.3/P3 — после активации pkg).  
**Метод:** [`.cursor/rules/analysis.mdc`](../../../../.cursor/rules/analysis.mdc)  
**Parent REQ:** [`21-ui-modularity-theme-and-redesign-prep.md`](../../../requirements/21-ui-modularity-theme-and-redesign-prep.md)  
**Architecture:** [`ui-modularity-theme-redesign-prep/00-overview.md`](../../../architecture/ui-modularity-theme-redesign-prep/00-overview.md)  
**Interview:** [`zeya888.target-tech-arch-interview-ui-modularity-theme-redesign-prep-2026-10-06.md`](../../../analysis/zeya888.target-tech-arch-interview-ui-modularity-theme-redesign-prep-2026-10-06.md)  
**Tokens SSOT:** [`DOGEstonia-design-tokens-package-v1.0.md`](../../../UX/next/feed/DOGEstonia-design-tokens-package-v1.0.md) · [feed INDEX](../../../UX/next/feed/INDEX.md)  
**Dashboard:** [`spa-mvp-dashboard.md`](../../spa-mvp-dashboard.md)  
**Naming:** `STORY-SPA-REQ21-*`  
**Updated:** 2026-10-06T20:59:52Z · REQ21-05 P3 Done `pkg-000096` · EPIC-SPA-18  

**Operator locks (Architect Studio + backlog clarify):**

| Theme | Decision |
|-------|----------|
| Default theme | **dark** |
| Persistence | `localStorage` key **`dogestonia.theme`**; account sync OOS |
| OS theme | **none** — user toggle only |
| Light/Dark SSOT | tokens package (light) + Night dark in package |
| Sidecar prefix (later) | `#/next/*` — **Out of this package** |
| Folders | `components/` + `features/` |
| Cutover (later) | in-place — **Out of this package** |
| DOM | `data-theme` |
| Toggle host | Public Header (locale \| theme \| …) |
| REQ21-05 in package | **yes** |
| Dashboard Remaining | Todo stories listed |

---

## Контекст одной фразой

Phase 0: один владелец chrome, модульный CSS, theme-capable tokens + Header toggle — подготовка к sidecar-редизайну **без** delivery next UI / `#/next` / cutover.

---

## Stories

| Status | Key | Title | Depends |
|--------|-----|-------|---------|
| **Done** | [STORY-SPA-REQ21-01-shell-chrome-ownership](STORY-SPA-REQ21-01-shell-chrome-ownership.md) | Layout owns AppShell chrome; pages content-only · `pkg-000092` PASS | — |
| **Done** · P3 | [STORY-SPA-REQ21-02-css-ownership-board-migrate](STORY-SPA-REQ21-02-css-ownership-board-migrate.md) | Migrate board CSS out of `index.css` · `pkg-000093` PASS · UX SKIP | 01 soft |
| **Done** · P3 | [STORY-SPA-REQ21-03-theme-tokens-data-theme](STORY-SPA-REQ21-03-theme-tokens-data-theme.md) | Scheme tokens + `data-theme` · `pkg-000094` PASS · UX SKIP | G4/G9 Done · after 02 |
| **Done** · P3 | [STORY-SPA-REQ21-04-theme-toggle-header](STORY-SPA-REQ21-04-theme-toggle-header.md) | ThemeToggle Header + `dogestonia.theme` · `pkg-000095` PASS · mockup-150 | **03** Done |
| **Done** · P3 | [STORY-SPA-REQ21-05-board-features-extract](STORY-SPA-REQ21-05-board-features-extract.md) | Extract board UI into `features/` · `pkg-000096` PASS · UX SKIP | **01** Done |

## Out of package

- `#/next/*` sidecar routes, next shell/components, Phase 4 cutover (REQ §5 Phase 1–4)  
- Account theme sync API  
- ADMIN / mockups / visual redesign pixels  
- MapLibre basemap theme swap  
- Invent gateway/threads HTTP / duplicate data clients (AC-21-06)  
- pkg activation / P3 from this INDEX alone  
