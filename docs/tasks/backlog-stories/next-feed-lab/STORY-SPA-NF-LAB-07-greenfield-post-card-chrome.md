# STORY-SPA-NF-LAB-07 — Greenfield post card chrome (M150)

## Meta
- **Key:** `STORY-SPA-NF-LAB-07-greenfield-post-card-chrome`
- **Package:** [next-feed-lab](INDEX.md) · [VISUAL-DoD.md](VISUAL-DoD.md)
- **Status:** Blocked · P3 structure Done (`2026-10-13T15:48:00Z`) · `pkg-000133` · gate BLOCK · OP eye Absent · Path A M150 · Partial=BLOCK
- **Depends on:** LAB-06 (Deprecated plane named)
- **Code boundary:** **new** modules under `features/feed-lab/post/` (name fixed as target home) · **zero** import of `*Deprecated` · **zero** classic `*Controls.css` · **zero** product hosts (`FeedCivicPost`, `BoardIssuePost`, `FeedDiscussionBlock`)
- **Related learn-only:** Closed semantics, fixture module LAB-02, written M150 § — may cite props/contracts from VL identity **without** mounting shallow VL chrome as Done
- **ui_scope:** `feed-lab`

## Зачем
Собрать civic post **с чистого листа** под written M150 (identity, title/summary, Open issue, media 16:9, 56px four-zone strip) — без второго React-pill и без classic class DNA.

## Artboards
- [M150](../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md) — primary  
- [M149](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) — list rhythm only (spacing; not toolbar/map)

## Target module catalog (name ≠ create until implement)

| Working name | Role |
|--------------|------|
| `FeedPostCard` | Continuous warm card shell (`#FFFDF8` light / theme tokens) |
| `FeedPostIdentity` | Demo publicId + status/type + geo (fixture ids; IssueTypeIcon omit OK) |
| `FeedPostTitle` / `FeedPostSummary` | Hit targets for detail (LAB-10) |
| `FeedPostOpenIssue` | Explicit open affordance |
| `FeedPostMedia` | `/assets/dogefeed.png` · 16:9 · radius ~10px · no carousel |
| `FeedPostActionStrip` | Exactly React \| Comment \| Share \| Reactions · ~56px · one entry to reactions (LAB-08) · Comment → discussion (LAB-09) |

## Past failures this tip prevents
- Dual React pill under strip  
- Summary = geoHint-only (author fixture `summary` field if needed — fixture-only, not Closed invent)  
- Importing Deprecated / VL shallow as Done skin  
- PASS by export-exists without M150 checklist

## Функциональные требования (FR)
- **FR-LAB-07.1** Greenfield card renders from LAB-02 fixtures on a **dev/staging mount path** inside lab (may be parallel route section or feature flag until LAB-10 cutover — implement chooses one; must not claim package visual Done).
- **FR-LAB-07.2** Action strip = four zones only; **no** second open-pill in this tip.
- **FR-LAB-07.3** Media stub contract unchanged (1600×900; Absent → honest).
- **FR-LAB-07.4** New CSS modules only; ban classic Controls CSS import.
- **FR-LAB-07.5** `#/next/feed` unchanged.
- **FR-LAB-07.6** Visual Done for M150 card anatomy: written checklist + screenshot + OP; Partial = **BLOCK**.

## Acceptance Criteria
- [x] Target modules named + implemented under `feed-lab/post/`
- [x] No `*Deprecated` import on greenfield Done path
- [x] No `ReactionControls.css` / product hosts
- [x] Strip = 4 zones · no second React pill
- [x] Fixture ids visible · media 16:9
- [ ] M150 checklist + local-five shots + OP eye (Partial = BLOCK) — checklist+shots Present · **OP eye Absent** → BLOCK

## Вне scope
Reactions picker UI (LAB-08) · discussion tree (LAB-09) · modal (LAB-10) · invent icons · schema overlay · port

## Technical subtasks
### t01 — Scaffold `feed-lab/post/`
### t02 — Compose `FeedPostCard` + strip/media/identity
### t03 — Lab preview mount (pre-cutover)
### t04 — M150 visual gate pack
