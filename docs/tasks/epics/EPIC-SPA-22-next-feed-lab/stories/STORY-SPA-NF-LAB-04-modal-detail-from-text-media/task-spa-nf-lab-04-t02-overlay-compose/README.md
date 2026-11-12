# SPA-NF-LAB-04-T02 — Overlay compose (M158)

**Status:** Done · P3 (`2026-10-13T13:06:08Z`)
**Story:** [`../STORY-SPA-NF-LAB-04-modal-detail-from-text-media.md`](../STORY-SPA-NF-LAB-04-modal-detail-from-text-media.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-04-modal-detail-from-text-media.md`](../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-04-modal-detail-from-text-media.md)
**ui_scope:** `feed-lab`
**ui_complexity:** `standard`
**ui_anchor:** true
**UI routes:** `/#/lab/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-13T12:59:05Z`
**Package:** `pkg-000130`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.png)
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
**VISUAL-DoD:** [`../../../../../backlog-stories/next-feed-lab/VISUAL-DoD.md`](../../../../../backlog-stories/next-feed-lab/VISUAL-DoD.md) §3–5 · Partial=**BLOCK**

## Purpose
Mount existing `OverlayHost` + `IssuePresentationLayout` on lab. Body = atom civic detail + discussion atoms for selected LAB-02 fixture. Lab CSS restyle to M158 written § (C). Escape / close / scrim dismiss; focus return to opener.

## Atoms / hosts to reuse (cite)
`OverlayHost` · `IssuePresentationLayout` · identity / discussion / reactions lab atoms (LAB-03) — **not** product `FeedCivicPost` / `FeedDiscussionBlock` / `BoardIssuePost` as Done chrome

## Ban on Done path
`FeedCivicPost` · `FeedDiscussionBlock` · `BoardIssuePost` · classic `ReactionControls.css` / board `*Controls.css`

## Constraints
- Same fixture object as list card · no HTTP.
- Demo publicId identity · discussion ≠ «DISCUSSION».
- No invent icons/routes.
- `#/next/feed` unchanged.
- name ≠ create until P3.

## AC / DoD
- [x] OverlayHost + IssuePresentationLayout mounted for selected fixture
- [x] Civic + discussion atoms in overlay body
- [x] Dismiss + focus return
- [x] Lab CSS aims at M158 must-states (C) · visual OP Pending
- [x] Ban-list held on overlay Done path

## Where to change
- Lab overlay module under `spa-app/src/features/feed-lab/` + `FeedLabPage` wiring
- Cite `spa-app/src/features/feed/presentation/`

## Verification
- Grep ban-list on lab overlay Done path
- local-five open/close · Path A M158 in T03
