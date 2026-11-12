# 03 — Sidecar process, coexistence, verify

Parent: [`00-overview.md`](00-overview.md) · REQ [`21`](../../requirements/21-ui-modularity-theme-and-redesign-prep.md) §5, FR-21.4–21.5, locks L5/L7

---

## 1) Process phases (prep documents; does not deliver redesign here)

| Phase | Name | Tech notes |
|-------|------|------------|
| **0** | Modularize current UI | Shell ownership; extract to `features/`; CSS move; theme-capable L0 + `data-theme` + Header toggle; behavior-preserving |
| **1** | Design foundation (next lane) | Tokens already SSOT in package; next shell/components consume semantics; tokens→shell→leaves |
| **2** | Sidecar clickable UI | Hash routes **`#/next/...`** (lock L5-B); fixtures via existing services / in-memory mode; user test on those URLs |
| **3** | Wire live backends | Same repositories; `GFL-DRIVEN` / threads; reuse auth providers — **no** parallel data clients |
| **4** | Cutover | **In-place** (lock L7-A): canonical `#/board` (etc.) render next UI; retire v1 chrome; regress tests |

Operator step mapping: see REQ §5.

---

## 2) Routing (HashRouter)

- Register `#/next/*` routes in `App.jsx` **above** catch-all `*` → `/board`.
- Update [`spa-url-page-map.md`](../../spa-url-page-map.md) when routes exist (implement wave).
- Production paths unchanged until Phase 4.

**«Endpoints» for UAT** = hash paths on same SPA origin (not new HTTP API).

---

## 3) Coexistence rules

1. One data plane (`services` / `repositories` / `auth` / `i18n`).  
2. Visual planes: v1 prod + next under `#/next` until cutover.  
3. Pages do not own chrome after Phase 0.  
4. No greenfield app by default.  
5. Name ≠ create for future paths until explicit implement.  
6. i18n for ThemeToggle and new chrome strings.

---

## 4) Verify surfaces

| Surface | Role |
|---------|------|
| Vitest (src unit / component) | Theme module, shell ownership, feature extract, no dual-palette in components |
| Existing shell / board puppeteer | Update when chrome DOM moves (Phase 0); new baselines for `#/next` in Phase 2 |
| Production entry | Vite build / `npm start` or preview — smoke Hash routes including `#/next` when present; not “src-only” as sole gate for route registration |

Packaging seam: **N/A** for this focus.

---

## 5) Env / fail-closed

No new theme-related secrets. Theme preference is client-local. Existing `VITE_*` / reality mode for fixtures unchanged (REQ FR-21.5).

---

## 6) Not in this doc

NEW STORY/pkg; deploying a second SPA service; inventing APIs for Phase 3.
