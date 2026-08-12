# UI mockup spec — CivicStatusCard (M28 anchor)

- **Story:** STORY-SPA-ID-03-civic-status-component
- **Task:** SPA-ID-03-T02 (ui_anchor)
- **Mockup SSOT:** [mockup-28-civic-status-state-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.md)
- **PNG:** [mockup-28-civic-status-state-sheet-spec.png](../../../../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.png)
- **Scaffolded:** 2026-06-28T09:45:56Z

## Layout hierarchy (FR-03.4)

1. Icon / status indicator (trust, not achievement badge)
2. Title (heading)
3. Description (supporting copy)
4. Primary action (CTA slot)
5. Metadata row (optional secondary info)

## Canonical status labels (FR-03.3 — do not paraphrase)

- `Civic account not verified yet`
- `Verified civic participant`
- `Wallet not linked` (future wallet block only)

## States on artboard (runtime: one at a time)

| State | Artboard ref |
|-------|----------------|
| A Unverified | M28 State A |
| B Verification Available | M28 State B |
| C Verification In Progress | M28 State C |
| D Verified | M28 State D + wallet placeholder |
| E Verification Failed | M28 State E |

## P3 UI gate checklist

- [x] UI-0 baseline capture in `ui-baseline/` (deferred — component absent at intake)
- [x] UI-1 compare regions vs this spec + PNG
- [x] UI-2 implement states T03–T04 in shell
- [x] UI-3 spot-check on `/dashboard` host (T05)
