# SPA-NF-VL-12-T02 — DS modules under features/feed/escalation/ (EscalationStub + CollaborationFeedback)

**Status:** Done · P3 (`2026-10-12T16:47:57Z`) · P1.3 (`2026-10-12T16:42:09Z`)
**Story:** [`../STORY-SPA-NF-VL-12-escalation-stub-chrome.md`](../STORY-SPA-NF-VL-12-escalation-stub-chrome.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-12-escalation-stub-chrome.md`](../../../../../backlog-stories/next-feed-vl/STORY-SPA-NF-VL-12-escalation-stub-chrome.md)
**ui_scope:** `feed`
**ui_complexity:** `standard`
**ui_anchor:** true
**UI routes:** `/#/next/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-12T16:42:09Z`
**Package:** `pkg-000126`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m156-current-collaboration-invitation-stub-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m156-current-collaboration-invitation-stub-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m156-current-collaboration-invitation-stub-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m156-current-collaboration-invitation-stub-state-sheet-spec-v1.0.png)
**@ds-ssot:** [`../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md`](../../../../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md) §10 EscalationStub / CollaborationFeedback
**Arch delta:** [`ARCH-DELTA-visual-language-plane-2026-10-12.md`](../../../../../backlog-stories/next-feed-vl/ARCH-DELTA-visual-language-plane-2026-10-12.md) · **AD-VL-01** · **AD-VL-02**
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`

## Purpose
DS modules under features/feed/escalation/ (EscalationStub + CollaborationFeedback)

## Arch anchors
- [02 DS surface map → escalation/](../../../../../../architecture/next-feed-vl/02-ds-surface-map.md)
- [01 dual plane / ban-matrix](../../../../../../architecture/next-feed-vl/01-dual-plane-and-boundaries.md)
- [03 verify / coexistence](../../../../../../architecture/next-feed-vl/03-verify-and-coexistence.md)

## Arch context
- Visual-language wave — DS-named escalation stub on `#/next/feed*` (AD-VL-01/02).
- Classic `#/board` InviteOrganizationStub chrome **OOS mutate**.
- VL-05 Done soft Related — discussion layout hosts stub slot (secondary).
- FR-VL-12.3: **not** a fifth PostActionStrip action.
- Named exports; idle/info/soon-unavailable + not-sent / handoff-not-connected; no send HTTP; M156.

## Constraints
- No invent escalation / invite send API.
- No mutate classic `#/board` invite stub.
- No send HTTP from stub (honesty).
- Not fifth civic PostActionStrip action.

## AC / DoD
- [ ] Purpose complete per backlog FR/AC for VL-12
- [ ] Anti-mixing: unre-skinned classic stub ≠ next-feed Done
- [ ] `#/board` invite stub not regressed
- [ ] No invent escalation API
- [ ] Not fifth PostActionStrip action

## Where to change
- `spa-app/src/components/threads/InviteOrganizationStub.jsx` (classic cite only)
- Target `spa-app/src/features/feed/escalation/`
- Wire: `features/feed/FeedDiscussionBlock.jsx` stub slot

## Verification
- Grep `EscalationStub` / `CollaborationFeedback` / `InviteOrganizationStub` after wire
- local-five: expanded discussion stub · activate feedback · board smoke
- vitest prior waves still meaningful; add VL-12 surface tests at implement
