# SPA-CR-06-T04 — Vitest chrome layout + gate notes

**Status:** Done
**Story:** [`../STORY-SPA-CR-06-picker-chrome-layout.md`](../STORY-SPA-CR-06-picker-chrome-layout.md)
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-06-picker-chrome-layout.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-06-picker-chrome-layout.md)
**ui_scope:** `reactions-mount`
**ui_anchor:** false
**Skill declared:** `test-master`
**Scaffolded:** `2026-10-15T10:45:11Z`
**Package:** `pkg-000142`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md) §3.3

## Purpose
Vitest: thread-root hint DOM order after layer groups; close control has no visible «Close» text. Lab `#/lab/reactions` root host before CR-07. Gate stays BLOCK without OP eye.

## Arch context
- Tests under `src/features/reactions-mount/__tests__/`
- Path A screenshots stub → fill in P3
- Partial visual = BLOCK · no invent OP PASS

## Implement notes
- Add `reactionsMount.cr06*.test.jsx` (or extend Present)
- Assert hint follows last layer group in DOM
- Assert `rm-picker-close` text empty / aria-label only
- Gate: structure vs OP Absent → BLOCK

## Constraints
- No M155 · no `#/next/feed` · no invent OP PASS

## AC / DoD
- [x] Vitest hint order on thread-root
- [x] Vitest close has no visible Close text
- [x] Gate checklist updated after P3; Result BLOCK if OP Absent

## Where to change
`spa-app/src/features/reactions-mount/__tests__/` · gate/checklist after P3

## Verification
```bash
cd spa-app && npx vitest run src/features/reactions-mount
```
