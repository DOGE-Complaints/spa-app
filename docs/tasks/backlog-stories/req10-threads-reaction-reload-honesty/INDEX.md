# REQ10 — threads reaction reload honesty · index

**Зона:** `spa-app/docs/tasks/backlog-stories/req10-threads-reaction-reload-honesty/`  
**Тип:** backlog (постановки; P1.3/P3 — после активации pkg).  
**Метод:** [`.cursor/rules/analysis.mdc`](../../../../.cursor/rules/analysis.mdc)  
**Parent REQ:** [`19-req10-threads-reaction-reload-honesty.md`](../../../requirements/19-req10-threads-reaction-reload-honesty.md)  
**Parent product:** [`REQ10-DOGEstonia-Threads-Board-Architecture-Hardening.md`](../../../../../docs/requirements%20backlog/REQ10-DOGEstonia-Threads-Board-Architecture-Hardening.md) §3.1, §3.5, §3.7, §6.2, §7.1 H1/H5(client), §7.2 H7/H9  
**Dashboard:** [`spa-mvp-dashboard.md`](../../spa-mvp-dashboard.md)  
**Naming:** `STORY-SPA-REQ10-*`  
**Updated:** 2026-09-28T18:22:01Z · P3 REQ10-02 Done (`pkg-000088`)  


**Operator locks (interview):**
| Theme | Decision |
|-------|----------|
| H5 wire shape | **Option A** — consume optional Bearer tree `selected[]`; **no** Option B path invent in spa |
| `selected` targets | **thread-root + comments** (both levels) |
| Story order | **REQ10-01** Done; **REQ10-02** P3 Done (`pkg-000088`) |

---

## Контекст одной фразой

Spa: убрать Cursor ingest; после reload (auth) восстановить «мои» реакции из tree Option A `selected`; counts из summaries; Keep empty strip; не invent HTTP.

---

## Stories

| Status | Key | Title | Depends |
|--------|-----|-------|---------|
| Done · P3 | [STORY-SPA-REQ10-01-debug-ingest-cleanup](STORY-SPA-REQ10-01-debug-ingest-cleanup.md) · [pipeline](../../epics/EPIC-SPA-16-req10-threads-reaction-reload-honesty/stories/STORY-SPA-REQ10-01-debug-ingest-cleanup/STORY-SPA-REQ10-01-debug-ingest-cleanup.md) | Remove Cursor debug ingest from spa `src` | — · `pkg-000087` · gate PASS |
| Done · P3 | [STORY-SPA-REQ10-02-reaction-selected-reload](STORY-SPA-REQ10-02-reaction-selected-reload.md) · [pipeline](../../epics/EPIC-SPA-16-req10-threads-reaction-reload-honesty/stories/STORY-SPA-REQ10-02-reaction-selected-reload/STORY-SPA-REQ10-02-reaction-selected-reload.md) | Propagate actor `selected` on reload (root + comments) | threads REQ10-05 **Done** · `pkg-000088` · gate PASS |

## Out of package / stretch

- Optional `useEffect` prop-sync smell (REQ §2 — not Pass)  
- H9 puppeteer harden (stretch — not Pass blocker)  
- Threads server half / Option A implement (sibling)  
- Gateway lifecycle (REQ-54)  
- Reopen REQ-17 chrome / ADMIN / mockups  
