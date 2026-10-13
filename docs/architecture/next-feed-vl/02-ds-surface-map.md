# next-feed-vl — DS surface map (logical)

> Parent: [00-overview.md](00-overview.md) · Interview lock Q4 · **no** stub files created here  
> Paths below are **target logical homes**, not a claim that files already exist.

---

## 1) Folder convention

Root: `spa-app/src/features/feed/`

| Concern folder | Role |
|----------------|------|
| `semantics/` | Backend / Closed clients / mapping — **no UI** (Q2–Q3) |
| `identity/` | Civic identity chrome |
| `search/` | Board search field chrome · **Present** `BoardSearchField` (VL-02 P3 · `#/next/feed*` Done; `#/board` keeps Filters `SearchInput`) |
| `reactions/` | Reaction aggregate / picker / footer / hints · **Present** `ReactionChrome` + DS atoms (VL-03 P3 · `#/next/feed*` Done; `#/board` keeps classic `ReactionControls`) |
| `comments/` | Discussion summary + light CommentTree plane · **Present** summary (VL-04) + layout/tree (VL-05 P3 · `#/next/feed*` Done; `#/board` classic unchanged; composer → VL-06) |
| `composer/` | Composer entry / thread composer / reply / discard · **Present** DS atoms (VL-06 P3 · `#/next/feed*` Done; `#/board` classic CommentComposer; verify chrome → VL-11 **Present**) |
| `presentation/` | Issue presentation + overlay host/layout · **Present** `IssuePresentationLayout` + `OverlayHost`/`OverlayLayout` + `KeyboardComposerLayout` (VL-07 P3 · `#/next/feed*` Done; `#/board` classic mounts unchanged) |
| `board/` | Board heading / results / page layouts · **Present** `BoardHeading` + `ResultsContext` + `StaleResultsNotice` + `BoardFeedState` (VL-08) + `BoardLayout` + `PageContentLayout` (VL-09 P3 · `#/next/feed*` Done; `#/board` classic unchanged; shell rails next-shell OOS) |
| `map/` | Map notices / preview chrome · **Present** `BoardMap` + `MapSubsetNotice` + `MapIssuePreview` + `MapAttribution` + `MapStatePanel` + `IssueMapPin` (VL-10 P3 · `#/next/feed*` Done; `#/board` classic map unchanged) |
| `verify/` | Verify write-gate chrome · **Present** `VerifyWriteGate` + `VerifyReturnFeedback` + `WriteDeniedNotice` (VL-11 P3 · `#/next/feed*` Done; `#/board` keeps classic `VerifyWriteGate`) |
| `escalation/` | Escalation stub / collaboration feedback · **Present** `EscalationStub` + `CollaborationFeedback` (VL-12 P3 · `#/next/feed*` Done; `#/board` keeps classic `InviteOrganizationStub`) |

Core groups named in interview Q4: `identity`, `search`, `reactions`, `comments`, `composer`, `thread` → **`thread` intent covered by `comments/` + `presentation/`** (discussion vs overlay mounts). Additional concern folders above map remaining VL-07…12 without new STORY keys.

**Do not** mirror `components/threads` tree shape as the organizing principle.

---

## 2) STORY → DS surfaces → concern

| STORY | DS surfaces (from story UX elements) | Concern folder |
|-------|--------------------------------------|----------------|
| STORY-SPA-NF-VL-01 | `IssueIdentityHeader`, `IssueTypeIcon`, `IssueStatusBadge`, `IssueMetadataRow` | `identity/` |
| STORY-SPA-NF-VL-02 | `BoardSearchField` | `search/` |
| STORY-SPA-NF-VL-03 | `ReactionAggregateStrip`, `ReactionPicker`, `ReactionSelectionFooter`, `ReactionScopeHint` (+ related DS atoms in story) | `reactions/` |
| STORY-SPA-NF-VL-04 | `DiscussionHeader`, `ThreadSummary`, `CommentPreview` | `comments/` |
| STORY-SPA-NF-VL-05 | `DiscussionLayout`, light `CommentTree`, `ThreadConnector`, `ReplyDepthNotice` | `comments/` |
| STORY-SPA-NF-VL-06 | `ComposerEntry`, `ThreadComposer`, `ReplyContext`, `DraftDiscardDialog` | `composer/` |
| STORY-SPA-NF-VL-07 | `IssuePresentationLayout`, `OverlayLayout`, `OverlayHost`, `KeyboardComposerLayout` | `presentation/` |
| STORY-SPA-NF-VL-08 | `BoardHeading`, `ResultsContext`, `StaleResultsNotice` | `board/` |
| STORY-SPA-NF-VL-09 | `BoardLayout`, `PageContentLayout` | `board/` |
| STORY-SPA-NF-VL-10 | `MapSubsetNotice`, `MapIssuePreview` (+ map chrome atoms in story) | `map/` |
| STORY-SPA-NF-VL-11 | `VerifyWriteGate`, `VerifyReturnFeedback`, `WriteDeniedNotice` | `verify/` |
| STORY-SPA-NF-VL-12 | `EscalationStub`, `CollaborationFeedback` | `escalation/` |

Exact filename per surface = implement wave; arch requires **named exports matching DS names** used in story AC.

---

## 2b) Related — feed lab (EPIC-SPA-22 · not VL Done)

| STORY | Surface | Home |
|-------|---------|------|
| STORY-SPA-NF-LAB-01 | `FeedLabPage` blank canvas `#/lab/feed` | `pages/FeedLabPage` · **Present** foundation (LAB-01 P3) · **not** visual package PASS · product `#/next/feed*` / `#/board` unchanged |
| STORY-SPA-NF-LAB-02 | Lab fixtures + media stub contract | `features/feed-lab/fixtures/` · **Present** 5× `DOGEstonia-UusVeerenni-00N` + `/assets/dogefeed.png` (LAB-02 P3) · data foundation · **not** full visual Done |

Lab is Related-only to this VL map — do not treat lab chrome as next-feed VL Done.

---

## 3) Icons (Q6)

| Surface | Arch status |
|---------|-------------|
| `IssueTypeIcon` / reaction paw-orb style icons | **Open** — Promote path **or** Operator-lock Absent/collapse; **no invent** SVG masters (FR-VL-01.2 · PRODUCT-BRIEF) |

Fill lock table in a later operator pass; until then honest collapse is valid must-state, not “borrow classic icon for PASS”.
