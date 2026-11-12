# STORY-SPA-NF-LAB-03 — Atom compose: post + reactions + thread

## Meta
- **Key:** `STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread`
- **Package:** [next-feed-lab](INDEX.md) · [VISUAL-DoD.md](VISUAL-DoD.md)
- **Status:** Todo · P1.3 scaffolded (`2026-10-13T12:29:42Z`) · pipeline [EPIC-SPA-22](../../epics/EPIC-SPA-22-next-feed-lab/stories/STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread/STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md) · `pkg-000129` · Partial visual=**BLOCK**
- **Depends on:** LAB-02
- **Code boundary:** lab composes **DS atoms only** — **ban** `FeedCivicPost`, `FeedDiscussionBlock`, `BoardIssuePost`, classic `ReactionControls` / `CommentTree` as Done chrome (Q2 A); **ban** classic `ReactionControls.css` / board `*Controls.css` on lab Done path (A+C)
- **Process:** A+C+F — **primary visual tip** for M150 → M154 → M152/M153 → M149 rhythm

## Зачем
Собрать карточку «с нуля» из уже существующих VL-атомов и **перекрасить** CSS в lab (C), чтобы визуально отладить пост/реакции/тред без product host wrappers и shelter — иначе снова Present-shallow.

## Artboards (gate tip order)
1. [M150](../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md) — identity, text, media, action strip, card silhouette  
2. [M154](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md) — reaction strip / picker (**next CSS only**)  
3. [M152](../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) / [M153](../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md) — discussion summary / tree / composer atoms  
4. [M149](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) — **list rhythm only** (lab list spacing; not product toolbar/map)

Full rules: [VISUAL-DoD.md](VISUAL-DoD.md) §4–5.

## Past failures this tip must not repeat
| Failure | Hard rule |
|---------|-----------|
| Named atom Present = Done | Checklist + screenshot + OP required |
| `ReactionChrome` + `ReactionControls.css` | Ban classic reaction CSS import on lab Done |
| `BoardIssuePost` shelter silhouette | Ban mount/import |
| DISCUSSION classic i18n | DS/lab copy only |
| «Partial visual OK to document» | **Forbidden** — Partial = **BLOCK** |
| Extra wrapper without look | No new wrapper as Done |

## Existing atoms to mount (cite `features/feed/`)

**Civic:** `IssueIdentityHeader` · `IssueTypeIcon` (omit OK) · `IssueStatusBadge` · `IssueMetadataRow` · lab-local title/summary/labels/media/actions  

**Reactions:** `ReactionChrome` / strip+picker atoms — **prefer next CSS**, **must not** import classic `ReactionControls.css` as Done skin  

**Discussion:** `DiscussionHeader` · `DiscussionSummaryChrome` / `ThreadSummary` · `CommentPreview` · `ViewDiscussionAction` · `DiscussionLayout` · `CommentTree` · `CommentNode` · composer atoms as needed  

**Related only (do not mount on lab Done path):** `FeedCivicPost`, `FeedDiscussionBlock`, `FeedListArea`+`BoardIssuePost`

## Функциональные требования (FR)
- **FR-LAB-03.1** Lab list renders 5 cards via atom composition + LAB-02 fixtures.
- **FR-LAB-03.2** Each card shows identity (demo id), text, media stub, post action strip, reactions atoms, collapsed discussion summary (expandable).
- **FR-LAB-03.3** Reactions selection is **local in-memory** only — no PUT/HTTP.
- **FR-LAB-03.4** Ban-list classic/product hosts **and** classic Controls CSS on lab Done path ([VISUAL-DoD.md](VISUAL-DoD.md) §3).
- **FR-LAB-03.5** `#/next/feed` unchanged (port = LAB-05 only after gates).
- **FR-LAB-03.6** Visual Done for tip artboards in § Artboards: restyle lab CSS to written must-states (C); Partial visual = **BLOCK**.
- **FR-LAB-03.7** Evidence: written checklist bullets + local-five screenshots + OP eye ([VISUAL-DoD.md](VISUAL-DoD.md) §5).

## Acceptance Criteria
### Structure / anti-mixing
- [ ] 5 atom-composed cards visible on `#/lab/feed`
- [ ] No `BoardIssuePost` / `FeedCivicPost` / `FeedDiscussionBlock` imports on lab Done path
- [ ] No classic `ReactionControls.css` (or board `*Controls.css`) on lab Done reaction path
- [ ] No threads/gateway HTTP
- [ ] Visible identity = fixture `DOGEstonia-UusVeerenni-00N` (not UUID-first)
- [ ] Discussion header copy ≠ classic «DISCUSSION» i18n as Done

### Visual gates (Partial = BLOCK)
- [ ] **M150** must-state checklist extracted from written § + PASS vs lab screenshot + OP
- [ ] **M154** must-state checklist + PASS (strip/picker look next, not classic Controls)
- [ ] **M152/M153** summary/tree must-states + PASS
- [ ] **M149** list rhythm (5-card spacing) must-states + PASS
- [ ] Evidence paths named in gate notes (screenshots **name ≠ create** until implement)

### Explicit non-AC
- [ ] ~~Partial visual OK to document~~ — **removed**; BLOCK if incomplete
- [ ] Export-exists / “mounted” alone — **not** PASS

## Вне scope
Modal (LAB-04) · invent icons · M155 · shell · product port (LAB-05) · Playwright pixeldiff (process D optional later)

## Technical subtasks

### t01 — Lab card composer
- New lab module (e.g. `FeedLabIssueCard.jsx`) assembling atoms; media `<img src="/assets/dogefeed.png">` with clickable region for LAB-04.
- Lab-owned CSS module(s) for card chrome; do not re-skin via classic board CSS.

### t02 — Reactions local seam
- Use `semantics/reactionsV1` catalog if useful; state stays in lab memory.
- Strip classic CSS import; restyle to M154 written § (C).

### t03 — Discussion atoms
- Collapsed summary in list; honest fixture comment bodies; DS header copy preferred over classic `DISCUSSION` i18n.

### t04 — Visual gate pack (A+F)
- For M150 → M154 → M152/M153 → M149: write checklist from artboard written § into gate evidence; local-five screenshots; OP pair sign-off.
- Stop tip if Partial — do not close story.
