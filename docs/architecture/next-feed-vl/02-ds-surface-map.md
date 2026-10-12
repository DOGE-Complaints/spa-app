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
| `comments/` | Discussion summary + light CommentTree plane |
| `composer/` | Composer entry / thread composer / reply / discard |
| `presentation/` | Issue presentation + overlay host/layout (VL-07) |
| `board/` | Board heading / results context / page layouts (VL-08…09) |
| `map/` | Map notices / preview chrome (VL-10) |
| `verify/` | Verify write-gate chrome (VL-11) |
| `escalation/` | Escalation stub / collaboration feedback (VL-12) |

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

## 3) Icons (Q6)

| Surface | Arch status |
|---------|-------------|
| `IssueTypeIcon` / reaction paw-orb style icons | **Open** — Promote path **or** Operator-lock Absent/collapse; **no invent** SVG masters (FR-VL-01.2 · PRODUCT-BRIEF) |

Fill lock table in a later operator pass; until then honest collapse is valid must-state, not “borrow classic icon for PASS”.
