# SPA-CR-05-T04 — Vitest open/dismiss + gate notes

**Status:** Done
**Story:** [`../STORY-SPA-CR-05-strip-open-dismiss.md`](../STORY-SPA-CR-05-strip-open-dismiss.md)
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-05-strip-open-dismiss.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-05-strip-open-dismiss.md)
**ui_scope:** `reactions-mount`
**ui_anchor:** false
**Skill declared:** `test-master`
**Scaffolded:** `2026-10-15T10:10:34Z`
**Package:** `pkg-000141`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md) §3.1–3.2

## Purpose
Vitest covers empty/populated open + outside dismiss; lab `#/lab/reactions` demonstrates before CR-07; update gate/checklist evidence after structure (Result stays BLOCK without OP eye).

## Arch context
- Tests under `src/features/reactions-mount/__tests__/`
- Preserve testids where possible
- Path A screenshots stub → fill in P3
- Partial visual = BLOCK · no invent OP PASS

## Implement notes
- Add `reactionsMount.cr05*.test.jsx` (or extend Present suite)
- Cases: empty React open · populated no React · aggregate open · outside dismiss · Escape · icon-only close present
- FixtureAdapter only · no invent HTTP
- Gate: structure AC vs OP eye Absent → BLOCK

## Constraints
- No M155 · no `#/next/feed` cutover · no invent OP PASS
- Do not advance gate to PASS without OP eye

## AC / DoD
- [x] Vitest empty/populated open + outside dismiss
- [x] Lab demo path documented
- [x] Gate checklist updated with structure evidence; Result BLOCK if OP Absent

## Where to change
`spa-app/src/features/reactions-mount/__tests__/` · gate/checklist after P3

## Verification
```bash
cd spa-app && npx vitest run src/features/reactions-mount
```
