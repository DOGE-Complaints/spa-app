# ADMIN-NS-02 — UX mockup intake register (existing SSOT)

## Meta

- **Key:** `ADMIN-NS-02-ux-mockup-intake`
- **Status:** Done (2026-10-09) — [NS-shell-mockup-intake-register.md](NS-shell-mockup-intake-register.md)
- **Depends on:** [ADMIN-NS-01](ADMIN-NS-01-product-ux-prompts.md) Done
- **Blocks:** ADMIN-NS-03, ADMIN-NS-05; freeze для ADMIN-NS-04
- **Skill:** docs / UX SSOT curation — **register, don’t author mockups**
- **Pattern:** [ADMIN-PH-02](../public-home/ADMIN-PH-02-ux-mockup-intake.md) (structure only)

## Цель

Зафиксировать shell SSOT как **register** на уже лежащие файлы в `docs/UX/next/feed/`.  
Папка [`artboards/`](../../../UX/next/feed/artboards/) — **read-only** для этого ADMIN (не создавать specs/PNG).

## Целевая директория (факт)

```text
spa-app/docs/UX/next/feed/artboards/
spa-app/docs/UX/next/feed/   ← layout, mobile, component packs
```

## Deliverable

1. **`NS-shell-mockup-intake-register.md`** в этой папке — таблица:

| NS surface | Future story | Spec / pack path | § / panels | PNG (if any) | Notes |
|------------|--------------|------------------|------------|--------------|-------|
| NS-H | NS-02 | `artboards/mockup-m149-…` | §4 Header | same stem `.png` | written > PNG |
| NS-R | NS-03 | M149 + DUI-Q15 | ProfileRail | … | metrics/nav only |
| NS-G | NS-04 | Layout + DUI-Q16 | grid / right | … | omit production right rail |
| NS-M | NS-04 | M149 E · Mobile · M159 chrome | narrow | … | shell only |
| NS-X | NS-05 | Arch 01 D2.3 | classic+shell | — | hybrid honesty |

2. В [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) — подтверждение «Mockup SSOT = feed UX; no new files» (если ещё не явно).  
3. Feed-body artboards (M150–M158 content) — строка **deferred → next feed package**.  
4. INDEX: ADMIN-NS-02 → Done.

## Acceptance

- [x] All NS-H/R/G/M/X mapped; zero «TBD create artboard»
- [x] No files added under `artboards/`
- [x] Feed-content artboards marked deferred, not missing
- [x] INDEX updated

## Как выполнять

«Выполни ADMIN-NS-02 — register существующих feed artboards/packs; без новых specs/PNG».
