# STORY-SPA-NF-LAB-06 — Deprecate lab shallow plane (`*Deprecated`)

## Meta
- **Key:** `STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane`
- **Package:** [next-feed-lab](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · [VISUAL-DoD.md](VISUAL-DoD.md)
- **Status:** Done · P3 (`2026-10-13T15:09:44Z`) · `pkg-000132` · gate PASS · NOT visual PASS · NOT greenfield
- **Depends on:** LAB-01…02 Done (route + fixtures Present)
- **Blocks:** LAB-07…10 cutover (greenfield must not share Done path with pre-deprecate mounts)
- **Code boundary:** rename / move **lab-owned** modules only · **do not** rename shared `features/feed/**` VL atoms used by `#/next/feed`
- **Process delta:** OP 2026-10-13 — greenfield lab plane (E-adjacent **scoped**) after shallow residual; still lab-first before LAB-05 port
- **ui_scope:** `feed-lab`

## Зачем
Текущий lab compose (обёртки + shallow VL chrome + classic CSS leak) доказал структуру, но **не** дал artboard mood. Чтобы не красить старое под новым именем, фиксируем старую lab-плоскость как **Deprecated** и освобождаем `#/lab/feed` Done path для greenfield (LAB-07…10).

## Risk lock (read before implement)

| Risk | Rule in this story |
|------|-------------------|
| Rename VL atoms → break `#/next/feed` / board | **Forbidden.** Shared `IssueIdentityHeader`, `ReactionChrome`, `ReactionPicker`, `CommentTree`, `DiscussionSummaryChrome`, etc. stay at current paths for product |
| Two live Done mounts of same card | After cutover tip, `#/lab/feed` mounts **only** greenfield (LAB-10). Deprecated = import-ban on lab Done |
| Spaghetti dual CSS | Deprecated modules keep their CSS; greenfield **new** CSS modules — no sharing classic `ReactionControls.css` |
| name ≠ create | Target deprecate paths named here; materialize only in implement wave |

## Scope of rename (lab-owned only)

Rename (or move under `features/feed-lab/deprecated/`) at minimum:

| Current | Deprecated name (target) |
|---------|--------------------------|
| `FeedLabIssueCard` | `FeedLabIssueCardDeprecated` |
| `LabReactionChrome` | `LabReactionChromeDeprecated` |
| `FeedLabDiscussion` | `FeedLabDiscussionDeprecated` |
| `FeedLabDetailOverlay` | `FeedLabDetailOverlayDeprecated` |
| paired `.css` | same `*Deprecated.css` or `deprecated/` folder |

**Related (document, do not rename in this tip):** shared VL Present-shallow modules — mark in story evidence as **Borrow-forbidden for lab Done** after LAB-07+ (may stay mounted on `#/next/feed` until LAB-05).

## Функциональные требования (FR)
- **FR-LAB-06.1** Lab-owned card/reactions/discussion/overlay modules renamed to `*Deprecated` (or moved under `deprecated/`) with exports updated.
- **FR-LAB-06.2** `#/next/feed` and `#/board` **unchanged** (no shared VL rename).
- **FR-LAB-06.3** Until LAB-10 cutover, `#/lab/feed` may still mount Deprecated (honest `data-lab-plane="deprecated"`); after LAB-10, Deprecated **ban** on lab Done import path.
- **FR-LAB-06.4** Index/barrel (`feed-lab/index.js`) exports Deprecated names explicitly; no silent alias as Done.
- **FR-LAB-06.5** Vitest: rename smoke · product routes not broken by this tip.

## Acceptance Criteria
- [x] Lab-owned modules listed above exist only under Deprecated names/paths
- [x] Grep: no shared `features/feed/**` file renamed solely for this tip
- [x] `#/next/feed` / `#/board` smoke unchanged
- [x] Deprecated exports documented in package INDEX
- [x] **Not** visual Done · **not** greenfield create (LAB-07+)

## Вне scope
Greenfield components · invent SVG/API · LAB-05 port · reopen NF/VL story bodies · rename product hosts

## Technical subtasks (постановка)

### t01 — Inventory
- List all `features/feed-lab/*` mounts from `FeedLabPage` / overlay; cite shared imports as Borrow-forbidden list for LAB-07+.

### t02 — Rename lab-owned
- Apply `*Deprecated` rename/move; update imports; `data-lab-plane="deprecated"` on roots.

### t03 — Verify
- local-five · lab still opens · next/feed smoke · ban shared rename.
