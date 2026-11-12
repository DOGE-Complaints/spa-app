# OP UX mirror — M152 / M153 UX gaps residual (2026-10-19)

> **UTC:** 2026-10-19T11:49:09Z  
> **Package:** [component-thread](INDEX.md)  
> **Authority:** OP deep eye + hard analysis [analysis-component-thread-m152-m153-ux-gaps-2026-10-19.md](../../../analysis/analysis-component-thread-m152-m153-ux-gaps-2026-10-19.md) · written M152 §8 · M153 C/D tone · PNG = tone  
> **Stories:** [CT-10](STORY-SPA-CT-10-empty-entry-chrome.md) · [CT-11](STORY-SPA-CT-11-composer-icon-chrome.md) · [CT-12](STORY-SPA-CT-12-inline-reply-placement.md) · [CT-13](STORY-SPA-CT-13-comment-action-chrome.md) · [CT-14](STORY-SPA-CT-14-spine-bubbles-fixtures.md) · [CT-15](STORY-SPA-CT-15-lab-host-residual.md)  
> **Prior tip (structure):** [OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md](OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md) — **this file is tip normative for chrome residual**  
> **Method:** [analysis.mdc](../../../../../.cursor/rules/analysis.mdc)

---

## 1. Зачем

CT-01…09 закрыли **structure** ThreadMount на `#/lab/feed` (gate **BLOCK**). OP eye 2026-10-19 видит **visual chrome BLOCK-class residual**: ответ пишется под всем деревом; React/Reply не pill-пара; композер без иконок; spine почти невидим; пузыри/отступы другие; empty показывает full form вместо entry-only.

Эта волна **фиксирует locks + stories** без invent OP PASS и без runtime apply в docs-only pass.

---

## 2. AS-IS (verified in analysis)

| Fact | Gap | Evidence |
|------|-----|----------|
| Empty → full `ThreadComposer` | G-H1 | `ThreadMount.jsx` `showComposer` includes `status === 'empty'` |
| Text Attach + labelled Post · no SVG | G-H2 · G-H6 | `ThreadComposer.jsx` ~197–225 |
| Composer after entire `IssueThreadBlock` | G-H4 | `ThreadMount` render order |
| React = full reactions plug · Reply = underline link | G-H5 | `CommentNode.jsx` / CSS |
| Connector only `indent > 0` · no continuous spine | G-H7 | `CommentNode` · `CommentTree.css` |
| White bubble `#e7e4dc` | G-H8 | `CommentNode.css` |
| Empty = text only · no speech icon | G-M1 | `IssueThreadBlock` |
| No «Reactions from residents» row | G-M2 | collapsed chrome |
| Card does not pass `narrow` | G-M3 | `FeedLabThreadMount` / card |
| Lab `branchDisclosure={false}` | G-M4 | host default |
| Most fixtures depth-0 | G-L2 | `labFeedFixtures` |
| Card heading `Discussion` only | G-L5 | IssueThreadBlock |
| Attach logic Present when composer open | — | chrome/placement gap only |
| Structure Done ≠ visual PASS | G-H3 | process · CT gate BLOCK |

---

## 3. Locked targets (no «or»)

| ID | Lock |
|----|------|
| **G-H1** | Empty = **entry-only** (`Write a comment` pill) · **not** inline full composer (M152 §8) |
| **G-H2** | Empty path after entry open / artboard B: paperclip + yellow **circle** send |
| **G-H4** | Reply composer **under parent** in tree (+ L-connector) · not sibling after all comments |
| **G-H5** | Paired icon+label pills **React** \| **Reply** + vertical separator · blue grammar · React stays `reactions-mount` plug (density wrap) · **no** people/picker in thread-mount |
| **G-H6** | Open root/reply composer: paperclip Attach + labelled **Post comment/reply** with **plane** · reuse Present `attach.svg` / `send.svg` (no silent invent) |
| **G-H7** | Continuous left grey spine + L-elbows into bubbles (readable nest) |
| **G-H8** | Light blue-grey bubble wash + denser action rhythm (M153 tone) |
| **G-M1** | Large speech-bubble empty icon (artboard B) |
| **G-M2** | Collapsed «Reactions from residents» **only when aggregate confirmed** · no invent |
| **G-M3** | Wire `narrow` (or always-on 390 stress) on lab card / stands |
| **G-M4** | Lab path shows branch disclosure when fixture needs it (`branchDisclosure` on) |
| **G-L2** | Default feed fixtures include nest depth ≥1 so spine/OP eye testable |
| **G-L5** | Expanded heading can show issue id on card when fixture provides it |

### Attach nuance (hold)

Attach **Present** when composer open (`attachmentsAvailable` + `onAttach`). Gap = chrome/placement/discoverability — not missing feature code.

### Skip (mirror note only · no story)

| ID | Why |
|----|-----|
| **G-H3** | Process: P3 Done + gate BLOCK ≠ invent OP PASS |
| **G-L1** | Written prefers skeletons · lab Match |
| **G-L3** | Tombstones future-contract OK |
| **G-L4** | Orphan modules not Done-path |

---

## 4. Story map

| Story | Gaps | Focus |
|-------|------|-------|
| **CT-12** | G-H4 | Inline reply under parent |
| **CT-13** | G-H5 | Comment React/Reply chrome |
| **CT-11** | G-H2 · G-H6 | Composer icon chrome |
| **CT-14** | G-H7 · G-H8 · G-L2 | Spine · bubbles · nest fixtures |
| **CT-10** | G-H1 · G-M1 | Empty entry-only + empty icon |
| **CT-15** | G-M2 · G-M3 · G-M4 · G-L5 | Lab host residual |

**Order:** CT-12 → CT-13 → CT-11 → CT-14 → CT-10 → CT-15.

---

## 5. Forbidden

- Invent threads/attachment/Identity HTTP  
- People/picker inside thread-mount  
- Invent OP PASS  
- Production `#/next/feed` cutover in this residual docs wave  
- Silent invent SVG (reuse `attach`/`send`/`reply`/`react` Present; promote-only if path missing)  
- Name≠create runtime until apply / P1.3  

---

## 6. Related

- Analysis: [analysis-component-thread-m152-m153-ux-gaps-2026-10-19.md](../../../analysis/analysis-component-thread-m152-m153-ux-gaps-2026-10-19.md)  
- Arch: [ARCHITECTURE.md](ARCHITECTURE.md) · [human guide](ARCHITECTURE-human-guide.md)  
- Prior structure mirror: [OP-UX 10-18](OP-UX-MIRROR-m152-m153-m157-thread-2026-10-18.md)
