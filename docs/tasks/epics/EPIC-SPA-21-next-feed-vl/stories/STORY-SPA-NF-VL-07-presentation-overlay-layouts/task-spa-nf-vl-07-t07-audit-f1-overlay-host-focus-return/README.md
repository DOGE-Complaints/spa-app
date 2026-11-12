# SPA-NF-VL-07-T07 — Audit F1 OverlayHost focus-return to opener

**Status:** Done · P6 (`2026-10-12T15:34:56Z`) · P5 scaffold (`2026-10-12T15:33:31Z`) · `run_mode=spa_nf_vl_07_audit_2026_10_12`  
**Story:** [`../STORY-SPA-NF-VL-07-presentation-overlay-layouts.md`](../STORY-SPA-NF-VL-07-presentation-overlay-layouts.md)  
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-07-presentation-overlay-layouts.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-07-presentation-overlay-layouts.md)  
**Audit:** [`../../../../../../analysis/audit-STORY-SPA-NF-VL-07-execution-2026-10-12.md`](../../../../../../analysis/audit-STORY-SPA-NF-VL-07-execution-2026-10-12.md) · **F1 Medium**  
**Package:** `pkg-000121` · **unchanged**  
**Skill declared:** `react-expert`  
**ui_scope:** `feed` · **ui_anchor:** false  
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose

Close FR-VL-07.2 / DS §2 OverlayHost gap: on dismiss (Escape / close / unmount), restore focus to the element that opened the overlay (`previousActiveElement` or explicit `restoreFocusRef`).

## AC / DoD

- [x] `OverlayHost` captures opener on open and restores focus on cleanup/dismiss
- [x] Vitest (jsdom) asserts focus returns to opener after unmount
- [x] `data-focus-return="true"` marker Present when host open
- [x] No invent mounts API · no mutate `#/board` · no git push

## Out of scope

Invent routes · shell chrome · Info F2–F5 · Path A full re-capture (optional)

## Implement notes (P6)

`OverlayHost.jsx` stores opener (`restoreFocusRef.current` || `document.activeElement`) on open; cleanup calls `focus({ preventScroll: true })` when target still in document. Marker `data-focus-return="true"`. Vitest: `OverlayHost.focusReturn.nfvl07.test.jsx` (3) + source assert in `FeedMounts.nfvl07`.

**Closed:** `2026-10-12T15:34:56Z`
