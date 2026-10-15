# CR-05 — Strip open / dismiss (structure Present · visual BLOCKED)

> **UTC:** 2026-10-15T10:38:10Z  
> **Package:** `pkg-000141` · EPIC-SPA-23  
> **Code home:** `src/features/reactions-mount/`  
> **Normative:** OP-UX-MIRROR §3.1–3.2 · M154 artboard tone  
> **Status:** structure **Present** · gate **BLOCK** (OP eye Absent · Partial visual)

## Behavior (Facebook-like)

| Strip state | Affordance | Open | Dismiss |
|-------------|------------|------|---------|
| Empty | `reaction-summary-react` | Click → picker | Outside · icon-only NS close · Escape |
| Populated | Aggregate only (React **hidden**) | Hover highlight + open · click open | Same |

Close icon SSOT: `/icons/next-shell/actions/close.svg` · icon-only + a11y name · no visible «Close» label.

## Touchpoints

- `ReactionSummaryStrip.jsx` — empty/populated split · aggregate hover/focus/click
- `ReactionsMount.jsx` — open path (normative over CR-02 «React always»)
- `ReactionPicker.jsx` — outside `pointerdown` · Escape · icon-only close
- Tests: `reactionsMount.cr05.test.jsx` (+ cr01/cr02 adjustments)
- Lab verify: `#/lab/reactions`

## OOS

M155 people · invent HTTP · `#/next/feed` cutover · CR-06 hug/hint · invent close SVG

## Evidence

- Vitest suite reactions-mount **30/30** (cr05 **6**)
- Path A shots md5: `3d437929c60a` · `36a4f5a4e551` · `bf22eae2b206` · `a3ed48e785f8` · `fe6ed236ee5d`
- Audit: `docs/analysis/audit-STORY-SPA-CR-05-execution-2026-10-15.md`
- P5: F1–F4 **WAIVED** · TASKED=0 · P6 not needed
