# CR-06 — Picker chrome / layout (structure Present · visual BLOCKED)

> **UTC:** 2026-10-15T10:58:18Z  
> **Package:** `pkg-000142` · EPIC-SPA-23  
> **Code home:** `src/features/reactions-mount/picker/`  
> **Normative:** OP-UX-MIRROR §3.3 · M154 panels B/C  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Chrome

| Piece | Rule |
|-------|------|
| Header | Capacity left · icon-only NS close top-right |
| Root hint | `rootModerationHint` **footer** after layer body |
| Desktop popover | `width: max-content` · hug longest option label |
| Mobile sheet | Full-bleed retained |

## Touchpoints

- `ReactionPicker.jsx` — hint footer DOM order · icon-only close
- `ReactionPicker.css` — popover hug-width · sheet full-bleed · footer border
- `ReactionPickerOption.css` — label flex baseline (popover override)
- Tests: `reactionsMount.cr06.test.jsx`
- Lab verify: `#/lab/reactions` picker scenes

## OOS

CR-05 open/dismiss · CR-07 lab-feed cutover · invent L10N · M155 · invent HTTP · `#/next/feed`

## Evidence

- Vitest suite reactions-mount **34/34** (cr06 **4**)
- Path A shots md5: `7030e3ecbf61` · `ac247678fe99` · `e64db58bca30` · `6e5b43c43af1` · `cb2e1f30fed6`
- Audit: `docs/analysis/audit-STORY-SPA-CR-06-execution-2026-10-15.md`
- P5: F1–F4 **WAIVED** · TASKED=0 · P6 not needed
