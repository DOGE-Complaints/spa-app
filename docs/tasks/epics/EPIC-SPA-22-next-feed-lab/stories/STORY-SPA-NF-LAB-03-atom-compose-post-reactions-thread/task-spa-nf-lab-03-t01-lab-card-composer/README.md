# SPA-NF-LAB-03-T01 — Lab card composer (DS atoms)

**Status:** Done · P3 (`2026-10-13T12:42:25Z`)
**Story:** [`../STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md`](../STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md`](../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md)
**ui_scope:** `feed-lab`
**ui_complexity:** `standard`
**ui_anchor:** true
**UI routes:** `/#/lab/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-13T12:29:42Z`
**Package:** `pkg-000129`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.png)
**Depends on:** LAB-02 fixtures Present
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
**VISUAL-DoD:** [`../../../../../backlog-stories/next-feed-lab/VISUAL-DoD.md`](../../../../../backlog-stories/next-feed-lab/VISUAL-DoD.md) §3–5 · Partial=**BLOCK**

## Purpose
New lab module (e.g. `FeedLabIssueCard.jsx`) assembling DS atoms from `features/feed/` — identity, text, media stub, action strip. Lab-owned CSS. Media `<img src="/assets/dogefeed.png">` with clickable region for LAB-04. Ban product hosts.

## Atoms to mount (cite)
`IssueIdentityHeader` · `IssueTypeIcon` (omit OK) · `IssueStatusBadge` · `IssueMetadataRow` · lab-local title/summary/labels/media/actions

## Ban on Done path
`FeedCivicPost` · `FeedDiscussionBlock` · `BoardIssuePost` · classic board `*Controls.css`

## Constraints
- Exactly 5 cards from LAB-02 fixtures.
- No gateway/threads HTTP.
- No invent icons.
- `#/next/feed` unchanged.
- name ≠ create until P3.

## AC / DoD
- [x] Lab card composer mounts DS atoms (not product hosts)
- [x] 5 cards on `#/lab/feed` with fixture demo ids
- [x] Media stub wired; clickable region reserved for LAB-04
- [x] Lab-owned CSS (not classic Controls skin)
- [x] Ban-list imports held

## Where to change
- Target: `spa-app/src/features/feed-lab/` (e.g. `FeedLabIssueCard.jsx` + CSS)
- Wire list from `FeedLabPage.jsx`
- Reuse atoms under `spa-app/src/features/feed/` (identity / presentation / …)

## Verification
- Grep ban-list on lab Done path
- local-five: 5 cards · M150 Path A later (T04)
