# SPA-CR-03-T04 — Two fixture hosts: thread-root + comment

**Status:** Done
**Story:** [`../STORY-SPA-CR-03-lab-reactions-page.md`](../STORY-SPA-CR-03-lab-reactions-page.md)
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-03-lab-reactions-page.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-03-lab-reactions-page.md)
**ui_scope:** `reactions-mount`
**ui_anchor:** false
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-14T09:58:29Z`
**Package:** `pkg-000139`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png)

## Purpose
Lab page mounts CR-01/CR-02 on two hosts (thread-root + comment) driven by FixtureAdapter (AC-24-06). No M155 people.

## Arch context
- Code home: `src/features/reactions-mount/` (EPIC-23 lock).
- Data plane: reuse `ThreadsSocialClient` / knobs / `reactions.v1` catalog — PRODUCT-BRIEF · CR-api.
- Lab host `#/lab/reactions` (pattern `#/lab/feed`); production next-feed cutover OOS unless operator expands.
- M155 people UI OOS — no implement.

## Implement notes
- Touch: lab page hosts under `features/reactions-mount/` or lab page module
- Follow backlog FR/AC for CR-03; cite CR-icon / CR-api refs.
- OOS: invent HTTP; people sheets; Gap-8 SVG generate (emoji interim OK per CR-icon).

## Constraints
- No new SocialClient / invent `/threads/*` paths or fields.
- No M155 people UI.
- No mandatory `#/next/feed` cutover in this epic.
- No DS amend / fifth strip between media and actions.
- Hopeful/amused not selectable.
- Lab-first; FixtureAdapter default; LiveAdapter = thin wrap of `ThreadsSocialClient` only.

## AC / DoD
- [ ] Purpose complete per backlog FR/AC for CR-03
- [ ] No second HTTP client; no invent paths/fields
- [ ] M155 people not implemented
- [ ] Icons from CR-icon (Reuse `/icons/next-feed/reactions/…` or Gap emoji interim)

## Where to change
lab page hosts under `features/reactions-mount/` or lab page module

## Verification
```bash
rg -n "thread-root|comment|host" spa-app/src/features/reactions-mount spa-app/src/pages || true
```
