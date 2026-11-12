# Component Thread — Product Brief (M152 / M153 / M157 · lab-first)

> **Дата:** 2026-10-18  
> **Статус:** locked for story wave (Variant B — UX artboards provided)  
> **Пакет:** [INDEX.md](INDEX.md)  
> **Parent REQ:** [22-feed-visual-redesign-phase-1.md](../../../requirements/22-feed-visual-redesign-phase-1.md) — **FR-22.4** / AC-SPA-REQ22-05 · thread under post; related FR-22.12 · M157 verify slice  
> **Sibling:** [component-reactions](../component-reactions/INDEX.md) ([REQ-24](../../../requirements/24-reactions-mount-lab.md)) — reactions plug-in only  
> **Prior skin:** [REQ-17](../../../requirements/17-issue-thread-feed-ux-and-reactions.md) / threads-feed — semantic scaffold, not visual SSOT  
> **Lab tip prior:** [LAB-09](../next-feed-lab/STORY-SPA-NF-LAB-09-greenfield-discussion-plane.md) — structure tip; this package **supersedes** lab discussion residual for M152–157 depth  
> **OP sync:** [arch-mirror-component-thread-sync-2026-10-18.md](../../../analysis/arch-mirror-component-thread-sync-2026-10-18.md) · reactions layers locked

## UX assets at package start (Variant B)

| Artboard | Spec | Role |
|----------|------|------|
| [M152 PNG](../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.png) | [M152 md](../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) | IssueThreadBlock states under strip (THR-P) |
| [M153 PNG](../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.png) | [M153 md](../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md) | Tree · composer · attachments (THR-T) |
| [M157 PNG](../../../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.png) | [M157 md](../../../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.md) | Verify-before-write (THR-V) · lab fixtures + stub handoff |
| [M153a v1.1 PNG](../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.png) | [M153a v1.1 md](../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md) | Attach picker residual A–F · tip (v1.0 superseded) |
| [M153b PNG](../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.png) | [M153b md](../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) | Depth 2.0 tokens A–E · §7 chip paint SSOT |
| [M152c PNG](../../../UX/next/feed/artboards/DOGEstonia-M152c-thread-first-paint-expand-truncate-spec-v1.0.png) | [M152c md](../../../UX/next/feed/artboards/DOGEstonia-M152c-thread-first-paint-expand-truncate-spec-v1.0.md) | First paint expand + truncate · CT-21 |
| [M152d PNG](../../../UX/next/feed/artboards/DOGEstonia-M152d-post-share-residual-states-spec-v1.0.png) | [M152d md](../../../UX/next/feed/artboards/DOGEstonia-M152d-post-share-residual-states-spec-v1.0.md) | Share popover/sheet · CT-24 |
| [M153c PNG](../../../UX/next/feed/artboards/DOGEstonia-M153c-composer-attachment-filename-chip-spec-v1.0.png) | [M153c md](../../../UX/next/feed/artboards/DOGEstonia-M153c-composer-attachment-filename-chip-spec-v1.0.md) | Composer chip filename + preview · CT-25 |
| [M153d PNG](../../../UX/next/feed/artboards/DOGEstonia-M153d-comment-tree-density-v2-spec-v1.0.png) | [M153d md](../../../UX/next/feed/artboards/DOGEstonia-M153d-comment-tree-density-v2-spec-v1.0.md) | Density v2 borderless fill · CT-26 |

**Normative tip (M153a/b gaps):** [OP-UX-MIRROR-m153a-m153b-thread-gaps-2026-10-20.md](OP-UX-MIRROR-m153a-m153b-thread-gaps-2026-10-20.md)  
**Prior chrome residual tip:** [OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md](OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md)  
**Prior structure tip:** [OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md](OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md)  
**Gap analysis:** [analysis-component-thread-m152-m153-ux-gaps-2026-10-19.md](../../../analysis/analysis-component-thread-m152-m153-ux-gaps-2026-10-19.md) · [puppeteer](../../../analysis/analysis-lab-feed-thread-puppeteer-gaps-2026-10-20.md) · [intake M153a/b](../../../analysis/analysis-m153a-m153b-generation-intake-gaps-2026-10-20.md) · [intake M153c/d](../../../analysis/analysis-m153c-m153d-generation-intake-2026-10-20.md)  
**Architecture:** [ARCHITECTURE.md](ARCHITECTURE.md) · [ARCHITECTURE-human-guide.md](ARCHITECTURE-human-guide.md)

## Locked intent

1. Greenfield pluggable **ThreadMount** (`IssueThreadBlock` + tree + composer + attachments + lab VerifyWriteGate).  
2. First host: `#/lab/feed` post card / detail — continuous card under `PostActionStrip`.  
3. Host-agnostic: post is first use case; same package mounts later on modal / other parents without fork.  
4. Strip: **Comment** → host opens/focuses thread (same orchestration pattern as Reactions→people). React/Reactions stay in `reactions-mount`.  
5. Comment nodes: attach existing `ReactionsMount` (`target=comment`) — no second reactions stack.  
6. Nesting: visual indent **cap 3**; reply eligibility = `depth` vs configurable `max_depth` (knobs/fixture).  
7. Attachments: **max attachments per node = configurable constant/param** (not hardcoded `1` in JSX). Lab fixtures only until media API; honest D/E/partial-success.  
8. M157 lab: fixture gate + stub `/verify` handoff · no invent Identity · no auto-post on return · bare 403 ≠ verify redirect.  
9. No invent threads HTTP fields/endpoints · no fake authors/avatars/times · literal `body` text only.

## Data plane (reuse · do not fork)

| Layer | Reuse | Do not |
|-------|-------|--------|
| Threads read/write (future Live) | existing `ThreadsSocialClient` / knobs patterns | Second client / invent paths |
| Knobs | `max_depth` · `media_allowed_types` (+ package `maxAttachments` config) | Hardcode depth/attach limits in UI literals |
| Reactions | [component-reactions](../component-reactions/INDEX.md) `reactions-mount` | Embed picker/people in thread package |
| Verify product chrome | existing `/verify` route · next-feed `VerifyWriteGate` as **reference** | New verify product · method UI in thread |

**This package owns:** greenfield presentation + FixtureAdapter (lab default) + thin LiveAdapter later fail-closed.  
**Lab default:** fixtures labelled illustrative.  
**Not presentation reuse mandate:** classic `IssueThreadBlock` CSS wholesale; product `FeedDiscussionBlock` banned on lab Done path.

## Out of scope

- Classic `#/board` retire · Early Signal continuum (next/feed cutover = CT-28…29 / CR-23 only)  
- Real Identity method flow · invent upload/bind attachment APIs as “done”  
- Tombstones as production inference (future-contract only until backend field)  
- Invent author/name/avatar/time · sort/pagination claims · branch-fetch invent endpoint  
- People/picker inside thread package  
- Image-gen HTTP (interim stub `/assets/dogefeed.png` via CT-29)  
- Amend REQ-22 FR matrix beyond delivery of FR-22.4 + next/feed presentation cutover  
- ADMIN-01 / ADMIN-02 (UX provided)

## Code home (acceptance targets · name ≠ create until apply)

| Role | Path |
|------|------|
| Package | `spa-app/src/features/thread-mount/` |
| Lab host | `spa-app/src/features/feed-lab/post/thread/FeedLabThreadMount.jsx` (or equivalent) |
| Replace tip | evolve/replace `feed-lab/post/discussion/*` under CT-08 |

## Target story keys

| Key | Surface |
|-----|---------|
| CT-01 | M152 IssueThreadBlock states A–E |
| CT-02 | Host Comment zone + composition under strip |
| CT-03 | M153 CommentTree nest · max_depth · Reply |
| CT-04 | M153 ThreadComposer · draft · fail · mobile |
| CT-05 | AttachmentRef · `maxAttachments` config |
| CT-06 | Branch collapse / expand / error (local) |
| CT-07 | M157 VerifyWriteGate lab fixtures + stub handoff |
| CT-08 | Lab feed cutover → ThreadMount |
| CT-09 | Reactions plug on CommentNode |
| CT-10 | Empty entry-only + empty icon (G-H1 · G-M1) |
| CT-11 | Composer icon chrome (G-H2 · G-H6) |
| CT-12 | Inline reply placement (G-H4) |
| CT-13 | Comment React/Reply chrome (G-H5) |
| CT-14 | Spine · bubbles · nest fixtures (G-H7 · G-H8 · G-L2) |
| CT-15 | Lab host residual (G-M2 · G-M3 · G-M4 · G-L5) |
| CT-16 | Dual-append post ownership (BUG-1) |
| CT-17 | M153a attachment picker path |
| CT-18 | M153b depth-2 token chrome A–D |
| CT-19 | AttachmentRef Ready/Denied paint (M153b §7) |
| CT-20 | Lab audit fixtures + Puppeteer residual |
| CT-21 | Preview node budget · default expanded · no Discussion heading |
| CT-22 | Comment attachment preview (+ `.md` family) |
| CT-23 | Thread density · remove extra frames (artboard SSOT) |
| CT-24 | Share public Issue link sheet (TG/IG/X/WA/FB) |
| CT-25 | Composer attach chip preview + filename |
| CT-26 | Density v2 borderless fill (supersede CT-23 borders) |
| CT-27 | Share Instagram disabled · Copy link text-only |
| CT-28 | `#/next/feed` ThreadMount Live cutover |
| CT-29 | `#/next/feed` civic media stub dogefeed |
| CT-api | Knobs / adapter contracts (docs) |

**Residual 2026-10-19:** CT-10…15.  
**Gaps / interview 2026-10-20:** CT-16…27 code Present (lab).  
**Manual residual:** CT-25…27 Present · [code check](../../../analysis/analysis-ct25-ct27-code-present-vs-intake-2026-10-20.md).  
**Next/feed cutover docs:** CT-28…29 · CR-23 — [interview CT-28+](INTERVIEW-CT-28-plus-next-feed-cutover-2026-10-20.md) · media stub `/assets/dogefeed.png` supersede M150 no-media interim. Reaction summary HOLD.
