# SPA-CR-05-T01 — Empty React / populated hide React

**Status:** Done
**Story:** [`../STORY-SPA-CR-05-strip-open-dismiss.md`](../STORY-SPA-CR-05-strip-open-dismiss.md)
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-05-strip-open-dismiss.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-05-strip-open-dismiss.md)
**ui_scope:** `reactions-mount`
**ui_anchor:** true
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-15T10:10:34Z`
**Package:** `pkg-000141`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-reactions-mount-interaction-2026-10-15.md) §3.1

## Purpose
FR-05.1 / FR-05.2: empty strip shows `reaction-summary-react` (click opens picker); populated strip **hides** React and shows aggregate.

## Arch context
- Code home: `src/features/reactions-mount/` (Present CR-01/02).
- Normative: OP-UX-MIRROR §3.1 over prior CR-02 «React always opens».
- Lab host `#/lab/reactions`; FixtureAdapter default.
- M155 / `#/next/feed` cutover OOS.

## Implement notes
- Touch: `ReactionSummaryStrip.jsx` (+ CSS)
- Empty = no marks / no count → React affordance
- Populated → aggregate only (OP choice 3)
- OOS: CR-06 hug/hint · invent close SVG · invent HTTP

## Constraints
- No new SocialClient / invent `/threads/*`.
- No M155 people UI.
- No `#/next/feed` cutover.
- Hopeful/amused not selectable.
- Partial visual = BLOCK · no invent OP PASS.

## AC / DoD
- [x] Empty: React visible; opens picker on click
- [x] Populated: React absent; aggregate shown
- [x] testids `reaction-summary-react` / `reaction-summary-aggregate` preserved where possible

## Where to change
`spa-app/src/features/reactions-mount/` — strip component + styles

## Verification
```bash
rg -n "reaction-summary-react|reaction-summary-aggregate" spa-app/src/features/reactions-mount
```
