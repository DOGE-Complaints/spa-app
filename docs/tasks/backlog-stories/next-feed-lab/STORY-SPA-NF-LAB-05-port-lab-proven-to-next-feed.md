# STORY-SPA-NF-LAB-05 — Port lab-proven chrome to `#/next/feed`

## Meta
- **Key:** `STORY-SPA-NF-LAB-05-port-lab-proven-to-next-feed`
- **Package:** [next-feed-lab](INDEX.md) · [VISUAL-DoD.md](VISUAL-DoD.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** Todo · P1.3 scaffolded (`2026-10-13T13:13:55Z`) · `pkg-000131` · **Blocked until LAB-10 visual PASS** (LAB-10 P3 structure Present `2026-10-13T19:24:46Z` · OP eye Absent · Partial=BLOCK)
- **Depends on:** **LAB-10** visual gates PASS (greenfield M150 → M154 → M152/M153 → M158 → M149) per [VISUAL-DoD.md](VISUAL-DoD.md) · LAB-06…10 Done structure · **not** LAB-03/04 Deprecated residual as SSOT
- **Code boundary:** apply **LAB-10 lab-proven greenfield** compose/CSS to product next path; **remove** `BoardIssuePost` shelter; **drop** classic `ReactionControls.css` from next reaction Done path; Closed contracts only — no invent API/SVG · do **not** port `*Deprecated` modules
- **Process:** lab-first greenfield (LAB-06…10) → port **after** LAB-10 OP eye PASS
- **Package note:** Interview Q6 locked 4 stories; process A added LAB-05; OP 2026-10-13 greenfield wave adds LAB-06…10 before port

## Зачем
Lab доказал вид на fixtures. Product `#/next/feed` всё ещё Present-shallow / shelter — переносим **проверенное**, не добавляем «ещё один wrapper».

## Artboards
- Same as lab gates: M150 · M154 · M152/M153 · M158 · M149 (product list/host context)
- Related product hosts: `FeedListArea` · `FeedCivicPost` / atom path · `FeedDiscussionBlock` — **displace shelter**, do not claim classic hosts as Done

## Past failures this tip must not repeat
| Failure | Hard rule |
|---------|-----------|
| Port before lab look | Block start until **LAB-10** visual AC PASS (not Deprecated LAB-03/04) |
| Port Deprecated modules | Port **greenfield** `feed-lab/post/**` only |
| Keep `BoardIssuePost` with `data-vl-done-claim="false"` forever | Shelter **removed** from next list Done path |
| Re-import classic reaction CSS on next | Drop `ReactionControls.css` from next Done reaction path |
| New wrapper story without checklist | Port = proven compose/CSS only |
| Invent Closed `publicLabel` | Product may still show honest empty/UUID until API; do not invent field — fixture ids stay lab-only unless Closed exposes label |

## Функциональные требования (FR)
- **FR-LAB-05.1** Start only after **LAB-10** lab visual gates PASS (documented evidence · greenfield plane).
- **FR-LAB-05.2** Next list Done path no longer mounts `BoardIssuePost` as card shell (shelter displaced).
- **FR-LAB-05.3** Next reaction Done path does not import classic `ReactionControls.css` as skin.
- **FR-LAB-05.4** Ported chrome matches lab-proven must-states for tip artboards (written §); Partial = **BLOCK**.
- **FR-LAB-05.5** `#/board` classic plane preserved (dual plane); no invent APIs.
- **FR-LAB-05.6** `#/lab/feed` remains available as reference SSOT after port.

## Acceptance Criteria
- [ ] Prerequisite: **LAB-10** visual gate evidence Present (checklists + screenshots + OP) · greenfield not Deprecated
- [ ] `FeedListArea` (or successor) next list Done path: **no** `BoardIssuePost` shelter mount
- [ ] Next reaction Done path: **no** classic `ReactionControls.css` import
- [ ] local-five `#/next/feed` screenshots vs same written must-states (M150/M154/M152/M158 as in scope) + OP eye
- [ ] Partial visual = **BLOCK**
- [ ] `#/board` smoke not regressed; Closed contracts unchanged (no invent)
- [ ] Lab route still works as reference

### Explicit non-AC
- [ ] «Shelter still there but flagged non-Done» — **not** PASS
- [ ] Wrapper-only rename without CSS/compose port — **not** PASS

## Вне scope
Lab route removal · M155 people · schema overlay · invent icons/API · Playwright D as substitute for OP (optional later only) · reopen NF/VL story bodies unless Required for port cite

## Technical subtasks

### t01 — Displace shelter
- Replace `BoardIssuePost` wrap on next list with lab-proven atom card compose / CSS.

### t02 — Reaction CSS plane
- Remove classic Controls CSS from next reaction Done path; use lab-proven next CSS.

### t03 — Discussion copy / depth
- Align DISCUSSION → DS copy where lab already fixed; keep Closed honesty for missing public labels.

### t04 — Verify
- local-five `#/next/feed` + `#/lab/feed` + `#/board` smoke; import ban grep; visual evidence pack.
