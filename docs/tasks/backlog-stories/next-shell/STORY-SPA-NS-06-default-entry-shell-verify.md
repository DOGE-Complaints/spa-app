# STORY-SPA-NS-06 — Default entry + shell verify

## Meta
- **Key:** `STORY-SPA-NS-06-default-entry-shell-verify`
- **Package:** [next-shell](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · **`pkg-000102`**
- **Epic:** [EPIC-SPA-19-next-shell](../../epics/EPIC-SPA-19-next-shell/EPIC-SPA-19-next-shell.md)
- **Pipeline:** [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-06-default-entry-shell-verify/STORY-SPA-NS-06-default-entry-shell-verify.md)
- **Status:** Done · P3 gate PASS (`2026-10-09T17:50:50Z`) · `pkg-000102`
- **Depends on:** NS-01…05 shell working on next (+ classic apply)
- **Brief:** [UX-PROMPTS.md](UX-PROMPTS.md) · _(verify)_ · UX ready Arch 03

## Зачем
После рабочего next shell + route: flip `/` и `*` → `/next/feed`; Vitest + browser-smoke **shell**; spa-url-page-map; icon promote 404 check.

## Текущее состояние (verified)

### Historical (pre-P3 · P1.3 intake)
- `/` → `/board` in [`App.jsx`](../../../../src/App.jsx).
- `public/icons/next-shell/` may be **Absent** until promote ([icon catalog](STORY-SPA-NS-icon-assets.md)).

### As-of-Done (P3 · `2026-10-09T17:50:50Z` · P6 SSOT `2026-10-09T17:58:56Z`)
- `/` and `*` → `/next/feed` in [`App.jsx`](../../../../src/App.jsx) (`Navigate` replace)
- Classic `#/board` still reachable (shelter; **not** product home; not permanently retired)
- `public/icons/next-shell/{navigation,actions,status}/` **Present** (NS-02 promote) · logo `/assets/DOGEstonia-logo-horizontal.png` reuse
- Gate PASS · story-root `screenshots/full-cycle/` Present · no BoardFeed invent

## UX SSOT
- Spec: [arch 03 verify/shelter](../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md) · PRODUCT-BRIEF verify lock
- Register: [NS-shell-mockup-intake-register.md](NS-shell-mockup-intake-register.md) row _(verify)_ → NS-06

## Icons
| UI slot | Logical ID | Runtime URL |
|---------|------------|-------------|
| Promote verify (all shell subset) | see catalog | `/icons/next-shell/navigation|actions|status/*.svg` |

> AC: after promote, listed runtime URLs return 200 in smoke (or fixture). Masters remain under docs icon-system.

## Logo
- Reuse `/assets/DOGEstonia-logo-horizontal.png` (+ fallback) — 404-free in shell smoke

## Функциональные требования (FR)
- **FR-NS-06.1** Default entry: `/` and catch-all `*` → `/next/feed` (after NS-01…05 ready).
- **FR-NS-06.2** Update spa-url-page-map for next shell routes + home flip.
- **FR-NS-06.3** Vitest + browser-smoke cover **shell** chrome/routes (extend/repair theme/shell tests); not full feed E2E.
- **FR-NS-06.4** Icon promote completed for shell subset; smoke no 404 on catalog URLs.
- **FR-NS-06.L10N** Reuse keys; no new marketing strings required beyond verify labels if any.

## Routes / API
- [api-req §3](STORY-SPA-NS-api-requirements.md) — ✅ none HTTP for flip/verify.

## Вне scope
- Retire classic permanently; full feed product verify; invent CI beyond existing patterns.

## Тексты и переводы (en / et / ru)

> No new user-facing copy required. Optional verify-only:

### `nextShell.verify.*` (test/a11y if needed)

| key | en | et | ru |
|-----|----|----|----|
| `nextShell.verify.shellReady` | Shell ready | Ümbris valmis | Оболочка готова |

## Acceptance Criteria
- [x] `/` and `*` land on `#/next/feed`
- [x] spa-url-page-map updated for next shell
- [x] Vitest + browser-smoke pass for shell scope
- [x] Shell icon runtime URLs 404-free after promote; logo reuse verified
- [x] Feed body E2E not required for this story
