# STORY-SPA-NF-13-issue-type-identity-icon — pipeline mirror

> **Epic:** [EPIC-SPA-20-next-feed](../../EPIC-SPA-20-next-feed.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/next-feed/STORY-SPA-NF-13-issue-type-identity-icon.md`](../../../../backlog-stories/next-feed/STORY-SPA-NF-13-issue-type-identity-icon.md)  
> **Status:** P3 Execute Done · gate **BLOCK** · `2026-10-21T11:33:57Z` · tip · activation **active** · Await **P4/P5**  
> **Package:** `pkg-000189` · next-feed · REQ-22 · M161  
> **ui_scope:** `feed` · **mixed** · Path A M161 ready-artboard · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** NF-02 / NF-07 Present · types SVG Present  
> **Runtime:** T01–T04 **Done** · vitest **451/451** · shots 01–05 Present · no invent type aliases/HTTP/OP PASS

## Purpose

Live card shows grey omit square beside issue id. OP: show icon matching `issue.type` (e.g. INCIDENT), not author avatar.

## L1 — FR (backlog verbatim)

- **FR-NF-13.1** Identity slot binds `iconSrc` from explicit catalog map keyed by **exact** `issue.type` wire string (case-sensitive; `incident` ≠ `INCIDENT`).  
- **FR-NF-13.2** Catalog URLs (M161 §3 · §8):

  | Exact key | Runtime URL |
  |-----------|-------------|
  | `INCIDENT` | `/icons/next-feed/types/ic-issue-type-INCIDENT.svg` |
  | `complaint` | `/icons/next-feed/types/ic-issue-type-complaint.svg` |
  | `system_bug` | `/icons/next-feed/types/ic-issue-type-system_bug.svg` |
  | `observation` | `/icons/next-feed/types/ic-issue-type-observation.svg` |
  | `absurdity` | `/icons/next-feed/types/ic-issue-type-absurdity.svg` |

- **FR-NF-13.3** Geometry: slot **48×48** · radius **12** · glyph render **24×24** centered (M161 §4).  
- **FR-NF-13.4** Unknown / missing / unmapped type → honest omit (grey slot OK) · no invent glyph · `data-civic-identity-icon` honesty.  
- **FR-NF-13.5** No invent synonyms / glob discovery / HTTP.  
- **FR-NF-13.6** Glyph decorative vs type label: keep textual type badge authoritative (M161 §5 · §9).  
- **FR-NF-13.7** Vitest: each of 5 keys → src Present · unknown → omit.  
- **FR-NF-13.8** [NF-icon-assets](../../../../backlog-stories/next-feed/STORY-SPA-NF-icon-assets.md) rows for `types/*` Present after promote (intake already promoted files).

## Acceptance Criteria (backlog verbatim)

- [x] Known type shows catalog icon in 48×48 slot (glyph 24)  
- [x] Exact key map only (no silent lowercase alias)  
- [x] Unknown omit held  
- [x] Map module explicit · no glob  
- [x] Vitest 5+1  
- [x] Icon catalog docs updated  
- [ ] OP eye after Apply (Absent = BLOCK)

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-NF-13-issue-type-identity-icon.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-nf-13-t01-catalog-docs](task-spa-nf-13-t01-catalog-docs/README.md) | Register 5 type icons in NF-icon-assets + disk count | **Done** |
| T02 | [task-spa-nf-13-t02-map](task-spa-nf-13-t02-map/README.md) | `issueTypeIconForType(type)` exact Object.freeze map | **Done** |
| T03 | [task-spa-nf-13-t03-bind](task-spa-nf-13-t03-bind/README.md) | FeedCivicPost `iconSrc` bind · IssueTypeIcon geometry | **Done** |
| T04 | [task-spa-nf-13-t04-vitest](task-spa-nf-13-t04-vitest/README.md) | 5 keys + unknown omit | **Done** |

**Order:** t01 → t02 → t03 → t04

## Out of scope (backlog verbatim)

Author avatar · topic-label chip rewrite · image-gen posters · NF-14…16 · invent OP PASS · invent type aliases

## DoD (backlog verbatim)

Identity slot shows type icon for the five catalogued exact keys; omit otherwise.

## @mockup handoff

- Continuity: [M161](../../../../UX/next/feed/artboards/DOGEstonia-M161-issue-type-icon-catalog-spec-v1.0.md) · [M161 PNG](../../../../UX/next/feed/artboards/DOGEstonia-M161-issue-type-icon-catalog-spec-v1.0.png) · [ARCH-DELTA §1](../../../../backlog-stories/next-feed/ARCH-DELTA-live-civic-residual-2026-10-21.md) · intake PASS
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen
- Shots: [visual-checklists](./visual-checklists-issue-type-identity-icon.md) · [screenshots/full-cycle](./screenshots/full-cycle/README.md)
- `@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M161-issue-type-icon-catalog-spec-v1.0.md`
- `@mockup: spa-app/docs/UX/next/feed/artboards/DOGEstonia-M161-issue-type-icon-catalog-spec-v1.0.png`
