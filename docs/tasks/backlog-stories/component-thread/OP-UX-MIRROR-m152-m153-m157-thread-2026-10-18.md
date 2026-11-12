# OP UX mirror — Thread mount M152 / M153 / M157 (2026-10-18)

> **UTC:** 2026-10-18T12:47:19Z  
> **Package:** [component-thread](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> **Authority:** written M152 / M153 / M157 specs (PNG = tone) · OP sync lock · reactions layer lock  
> **Stories:** CT-01…09 · CT-api  
> **Superseded tip (chrome residual):** [OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md](OP-UX-MIRROR-m152-m153-ux-gaps-residual-2026-10-19.md) · CT-10…15  
> **Method:** [analysis.mdc](../../../../../.cursor/rules/analysis.mdc)  
> **AS-IS analysis:** [arch-mirror-component-thread-sync](../../../analysis/arch-mirror-component-thread-sync-2026-10-18.md)

---

## 1. Зачем

Lab `#/lab/feed` имеет тонкий discussion tip (LAB-09). Нужен **полноценный пристегиваемый тред** по M152→M153→M157 с тем же паттерном оркестрации, что Reactions→people: **Comment→thread host surface**, reactions остаются отдельным пакетом.

---

## 2. AS-IS (verified)

| Факт | Путь |
|------|------|
| Collapsed/expanded only | `FeedDiscussionPlane.jsx` |
| Flat comments · no Reply/nest | `FeedCommentTree.jsx` / `FeedCommentNode.jsx` |
| Local composer stub | `FeedComposerEntry.jsx` |
| Comment zone → expand + focus | `FeedPostCard.handleZone` |
| Comment reactions Present | `FeedLabReactionsMount` `target=comment` |
| M152 A/B/D · M153 · M157 | **Absent** on lab plane |
| Product VerifyWriteGate | `features/feed/verify/` (reference · not lab default) |
| Classic IssueThreadBlock | `components/threads/IssueThreadBlock.jsx` (prior skin) |

---

## 3. Composition lock

```text
BoardIssuePost / FeedPostCard (host)
├─ Issue chrome (identity · title · summary · media · Open issue)
├─ PostActionStrip: React | Comment | Share | Reactions
│     React / Reactions → reactions-mount (existing)
│     Comment → host → ThreadMount open/expand/focus
└─ ThreadMount / IssueThreadBlock (THIS PACKAGE)
   ├─ M152 state region (loading|empty|collapsed|unavailable)
   ├─ M153 CommentTree + CommentNode (+ ReactionsMount plug)
   ├─ M153 ThreadComposer + AttachmentRef
   └─ M157 VerifyWriteGate (lab fixture / stub handoff)
```

Thread region: hairline under strip · same card · not a second competing card.

---

## 4. Mockup checklist → story map (Phase 1 SSOT)

### 4.1 M152 — THR-P (CT-01 · CT-02)

| ID | Detail | Story |
|----|--------|-------|
| P-A | Loading discussion · skeletons only in thread region · civic intact | CT-01 |
| P-B | Empty · «No comments yet» · invitation · composer entry if capability | CT-01 |
| P-C | Collapsed · literal body previews · View discussion · optional reaction summary if confirmed | CT-01 |
| P-D | Unavailable · Try again · no fake content | CT-01 |
| P-E | 390 narrow stack · same C semantics | CT-01 |
| P-strip | Four zones held · Comment opens/focuses discussion | CT-02 |
| P-compose | Continuous card under strip · divider | CT-02 |
| P-forbid | No fake authors/counts · no gray bars for loaded bodies | CT-01 |

### 4.2 M153 — THR-T (CT-03…06)

| ID | Detail | Story |
|----|--------|-------|
| T-A | Nested tree · literal bodies · connectors · indent ~44/24 | CT-03 |
| T-cap | Visual indent **max 3 levels** | CT-03 |
| T-depth | Reply iff `depth < max_depth` (config/knobs) · not confused with visual cap | CT-03 |
| T-react | Comment **React** = reactions-mount · no Share/Reactions on node | CT-09 |
| T-B | Max depth reached copy · no Reply | CT-03 |
| T-tomb | Tombstones future-contract only | CT-03 (OOS prod) |
| T-C | Reply mode · parent excerpt · Cancel · draft · Post reply | CT-04 |
| T-root | Write a comment / Post comment | CT-04 |
| T-draft | Draft survival · no silent destroy · no auto-post | CT-04 |
| T-F | Post fail inline · Try again / Keep editing | CT-04 |
| T-G | Mobile keyboard-open composer | CT-04 |
| T-D | Attachment ready chip · Remove | CT-05 |
| T-E | Attachment denied · draft intact | CT-05 |
| T-maxA | **maxAttachments** configurable constant/param per node | CT-05 |
| T-coll | Branch collapsed · derived count when complete | CT-06 |
| T-exp | Branch expanding local · no invent branch HTTP | CT-06 |
| T-err | Branch error local Try again | CT-06 |

### 4.3 M157 — THR-V lab A (CT-07)

| ID | Detail | Story |
|----|--------|-------|
| V-A | Gate blocked · draft+target visible · Go to verification / Not now | CT-07 |
| V-B | Stub handoff notice (existing `/verify` · no method UI invent) | CT-07 |
| V-C | Verified return · draft restored · **no auto-post** | CT-07 |
| V-D | Cancel/fail return · still blocked | CT-07 |
| V-E | Stale / WRITE-DENIED-UNKNOWN · no guess redirect on bare 403 | CT-07 |
| V-F | Mobile gate | CT-07 |
| V-scope | Read/React/Share unaffected | CT-07 |

### 4.4 Lab cutover + reactions (CT-08 · CT-09)

| ID | Detail | Story |
|----|--------|-------|
| L-cut | FeedPostCard / detail use ThreadMount · retire tip plane or wrap | CT-08 |
| L-fix | FixtureAdapter default · stands for A–E / tree / gate | CT-08 |
| R-plug | Every CommentNode mounts reactions-mount comment target | CT-09 |
| R-bound | Thread never opens picker/people | CT-09 |

---

## 5. Forbidden

- Invent threads/attachment/verify HTTP or Identity methods  
- People/picker inside thread-mount  
- Hardcoded `max_depth` / `maxAttachments` magic numbers without config seam  
- Gray bars for successful `body`  
- Fake author/avatar/time · sort claims · invent branch pagination  
- Auto-post after verify  
- Production `#/next/feed` cutover in docs-only wave  
- Name≠create: do not Write `src/features/thread-mount/**` until apply

---

## 6. Story order

```text
CT-01 → CT-02 → CT-03 → CT-04 → CT-05 → CT-06 → CT-07 → CT-08 → CT-09
```

CT-api docs parallel (knobs/adapter). Soft: CT-09 can wire early once CommentNode exists in CT-03/08.
