# next-feed-vl — dual plane & boundaries

> Parent: [00-overview.md](00-overview.md) · Interview locks Q1–Q3 · AD-VL-01 / AD-VL-02

---

## 1) Dual plane (product → tech)

| Route plane | Presentation Done means | Backend / data |
|-------------|-------------------------|----------------|
| `#/board` | Classic chrome (threads / Filters / existing board UI) | Same **one** semantic seam (after move) |
| `#/next/feed*` | **DS-named** modules under `features/feed/<concern>/` | Same seam |

Anti-mixing (PRODUCT-BRIEF rules 1–4 · AD-VL-01): classic components **remain** for board; next Done **must not** accept unre-skinned classic as PASS.

---

## 2) Ban-matrix (next Done path)

**Forbidden as Done presentation** on `#/next/feed*` (import/mount as the visible chrome):

| Classic module / pattern | Cited by |
|--------------------------|----------|
| `BoardIssuePost` / unre-skinned issue card shell | AD-VL-02 · as-is wrap in `FeedListArea.jsx` |
| `IssueThreadBlock` (classic thread chrome as Done) | AD-VL-02 |
| `ReactionControls` | STORY-SPA-NF-VL-03 Code boundary · AD-VL-02 |
| Filters `SearchInput` / `board-search-*` chrome | STORY-SPA-NF-VL-02 |
| Classic `IssueCard` / UUID-first header as Done | STORY-SPA-NF-VL-01 |
| Classic `CommentTree` dark board skin as Done | STORY-SPA-NF-VL-05 |
| Classic `CommentComposer` alone as Done | STORY-SPA-NF-VL-06 |
| Classic invite / verify chrome as next Done without DS atoms | STORY-SPA-NF-VL-11 · VL-12 |

**Allowed:**

- Import **semantic-only** helpers from the next-owned seam (`features/feed/semantics/` target).  
- Temporary shelter wrappers until replaced (Q7) — **not** claimable as VL Done.  
- Classic `#/board` continuing to use classic presentation.

**Not allowed (“кривости”):**

- Next presentation importing a classic module that **also renders chrome**, even “just for layout”.  
- Leaving backend clients forever inside classic UI files so that deleting `#/board` presentation deletes next’s API path.

---

## 3) Semantic / backend seam (Q2 + Q3 + OP refine)

| Rule | Detail |
|------|--------|
| What moves | Connection layer to gateway/threads / Closed mapping / reaction catalog access — **without UI** |
| Target owner | **next** — pocket under `features/feed/semantics/` (name fixed as target home; exact file split = implement wave) |
| Who calls during transition | **Both** `#/board` and `#/next/feed*` call **this one seam** |
| After classic UI cleanup | Deleting classic **presentation** must **not** remove the seam; next keeps working |
| Contracts | Closed only — no invent APIs/fields (stories FR + PRODUCT-BRIEF OOS) |

Extract rule: if logic today lives inside a classic chrome file, **extract** into the seam (or stop using it from next Done path). Do not “reach through” classic UI to get data.

---

## 4) Trust boundary sketch

```text
[ User ]
   │
   ├─ #/board ──► classic presentation ──┐
   │                                       ├──► features/feed/semantics/ ──► gateway / threads (Closed)
   └─ #/next/feed* ► DS presentation ─────┘
```

Shell / next-shell / M155 / schema-media: **OOS** (package INDEX).
