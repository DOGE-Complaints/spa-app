# REQ11 — demo life sim board + threads verify · index

**Зона:** `spa-app/docs/tasks/backlog-stories/req11-demo-life-sim-board-threads-verify/`  
**Тип:** backlog (verify-only; P1.3/P3 — после активации pkg).  
**Метод:** [`.cursor/rules/analysis.mdc`](../../../../.cursor/rules/analysis.mdc)  
**Parent REQ:** [`20-req11-demo-life-sim-board-threads-verify.md`](../../../requirements/20-req11-demo-life-sim-board-threads-verify.md)  
**Parent product:** [`REQ11-DOGEstonia-Uus-Veerenni-Demo-Life-Simulation.md`](../../../../../docs/requirements%20backlog/REQ11-DOGEstonia-Uus-Veerenni-Demo-Life-Simulation.md) §3.6, §5 spa, §6.3 X-11-01, §7.1 S1–S3, §8 Wave E  
**Dashboard:** [`spa-mvp-dashboard.md`](../../spa-mvp-dashboard.md)  
**Naming:** `STORY-SPA-REQ11-*`  
**Updated:** 2026-09-29T13:42:10Z · P3 REQ11-01 **BLOCKED** (`pkg-000089`)  

**Operator locks (interview):**
| Theme | Decision |
|-------|----------|
| Canonical SPA paths | **1A** — `#/board` · `#/issue/:id` (origin from profile `local` / Uus Veerenni) |
| Verify session | **2A** — Pass = **anonymous**; own login not in DoD (REQ10 orthogonal) |

---

## Контекст одной фразой

После sibling replay на named profile оператор открывает существующий SPA URL и видит живую доску + треды с реакциями — без новой chrome и без логина демо-жителей.

---

## Stories

| Status | Key | Title | Depends |
|--------|-----|-------|---------|
| **BLOCKED** · P3 | [STORY-SPA-REQ11-01-board-threads-demo-verify](STORY-SPA-REQ11-01-board-threads-demo-verify.md) · [pipeline](../../epics/EPIC-SPA-17-req11-demo-life-sim-board-threads-verify/stories/STORY-SPA-REQ11-01-board-threads-demo-verify/STORY-SPA-REQ11-01-board-threads-demo-verify.md) | Demo verify board + threads on profile SPA URL | GW55 Todo · threads 01 Done / 02–04 Todo · `pkg-000089` · gate BLOCKED |

## Out of package

- New FE / ADMIN / mockups  
- Invent gateway/threads HTTP  
- CI / screenshot pack as Pass (S3)  
- Identity login as fixture residents (K1)  
- Gateway fixtures / threads seed implement (siblings)  
- REQ10 selected honesty rework  
