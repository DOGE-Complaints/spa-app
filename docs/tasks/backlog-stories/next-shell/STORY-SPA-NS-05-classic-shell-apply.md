# STORY-SPA-NS-05 — Classic shell apply (D2.3)

## Meta
- **Key:** `STORY-SPA-NS-05-classic-shell-apply`
- **Package:** [next-shell](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · **`pkg-000101`**
- **Epic:** [EPIC-SPA-19-next-shell](../../epics/EPIC-SPA-19-next-shell/EPIC-SPA-19-next-shell.md)
- **Pipeline:** [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-05-classic-shell-apply/STORY-SPA-NS-05-classic-shell-apply.md)
- **Status:** Done · P3 (`2026-10-09T17:21:55Z`) · gate PASS
- **Depends on:** NS-01…04 shell composition working on next
- **Brief:** [UX-PROMPTS.md](UX-PROMPTS.md) · NS-X · UX ready Arch D2.3

## Зачем
Тот же новый shell на classic shelter (`#/board`, `#/issue/:id`). Контент board может остаться старым — это **не** Feed Product Done.

## Текущее состояние (verified)
- Classic routes under AppShellLayout with current Header/Sidebar/Footer.
- Hybrid new chrome + old board content is expected until next-feed.

## UX SSOT
- Spec: [arch 01 §3 D2.3](../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md) · [arch 03 risks](../../../architecture/feed-visual-redesign-phase-1/03-verify-shelter-retire.md)
- Register: [NS-shell-mockup-intake-register.md](NS-shell-mockup-intake-register.md) row NS-X → NS-05

## Icons
| UI slot | Logical ID | Runtime URL |
|---------|------------|-------------|
| Reuse shell set | (NS-02/03/04) | `/icons/next-shell/…` same catalog |

> No additional glyphs for classic-only.

## Logo
- N/A · header owns (NS-02) — same logo on classic

## Функциональные требования (FR)
- **FR-NS-05.1** Classic `/board`, `/issue/:id` (and other shelter public/protected under shell) use the **same** AppShell composition as next (header/rail/grid/mobile chrome).
- **FR-NS-05.2** Shelter-list / board content may remain legacy UI inside main slot.
- **FR-NS-05.3** Brand home still → `/next/feed` (product home), not classic board.
- **FR-NS-05.L10N** No new marketing copy; reuse `nextShell.*` / `appShell.*` / `publicHome.*`.

## Routes / API
- [api-req §3.1](STORY-SPA-NS-api-requirements.md) — ✅ none new. Session reuse unchanged.

## Вне scope
- Retire classic; feed content cutover; invent dual shell frameworks.
- next-feed body on classic.

## Тексты и переводы (en / et / ru)

> Prefer **reuse** existing keys. Optional shelter label:

### `nextShell.shelter.*`

| key | en | et | ru |
|-----|----|----|----|
| `nextShell.shelter.classicHint` | Classic board (temporary shelter) | Klassikaline tahvel (ajutine) | Классическая доска (временный shelter) |

## Acceptance Criteria
- [x] Classic routes render new shell chrome (D2.3); content may stay old board
- [x] Brand/home → feed; classic is not product home
- [x] Hybrid ≠ Feed Product Done documented in story OOS
- [x] Icons/logo same as next shell paths
