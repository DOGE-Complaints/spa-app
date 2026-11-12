# STORY-SPA-NF-LAB-10 — Greenfield overlay + lab cutover + visual gates

## Meta
- **Key:** `STORY-SPA-NF-LAB-10-greenfield-overlay-cutover-gates`
- **Package:** [next-feed-lab](INDEX.md) · [VISUAL-DoD.md](VISUAL-DoD.md)
- **Status:** Blocked · P3 structure Done (`pkg-000136` · `2026-10-13T19:24:46Z`) · gate BLOCK · OP eye Absent
- **Depends on:** LAB-07 · LAB-08 · LAB-09 (greenfield post + reactions + discussion Present)
- **Supersedes for lab Done compose:** LAB-03 / LAB-04 structure path (Deprecated residual) — visual PASS moves here
- **Unblocks:** LAB-05 port (after this tip’s visual gates PASS)
- **Code boundary:** new overlay compose under `features/feed-lab/post/` · cutover `#/lab/feed` to greenfield only · **ban** `*Deprecated` imports on lab Done · may reuse `OverlayHost` / layout shells as presentation chrome if they stay theme-token clean (cite; no classic issue host)
- **ui_scope:** `feed-lab`

## Зачем
Собрать M158 detail overlay на greenfield civic+discussion; переключить `#/lab/feed` полностью на новую плоскость; закрыть visual gates (checklist + screenshot + OP) — иначе LAB-05 снова портит shallow.

## Artboards
- [M158](../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md)  
- Re-gate pack: M150 → M154 → M152/M153 → M158 → M149 rhythm ([VISUAL-DoD.md](VISUAL-DoD.md) §4)

## Target module catalog (name ≠ create)

| Working name | Role |
|--------------|------|
| `FeedIssueDetailOverlay` | Modal/sheet host · Escape/scrim/close · focus return |
| `FeedIssueDetailBody` | Same greenfield civic + discussion atoms as list (parity) |

## Hit / behavior rules (LAB-04 locks retained)
- Open from **title / summary / media / Open issue** only.  
- Action strip clicks do **not** open Issue modal (React opens picker; Comment expands thread).  
- Fixture-only data · no HTTP.

## Cutover rules
1. `FeedLabPage` mounts **only** greenfield `FeedPostCard` list (+ overlay).  
2. Grep ban: `*Deprecated` import under lab Done page/modules.  
3. Deprecated code may remain on disk for archaeology until explicit delete tip (OOS here).  
4. `data-lab-plane="greenfield"` · `data-lab-visual-done` stays `false` until OP eye PASS.

## Функциональные требования (FR)
- **FR-LAB-10.1** Overlay open/close matrix + focus return.
- **FR-LAB-10.2** Lab route cutover to greenfield; Deprecated ban on Done path.
- **FR-LAB-10.3** Full visual gate tip order with written checklists + local-five screenshots + OP eye; Partial = **BLOCK**.
- **FR-LAB-10.4** `#/next/feed` still unchanged (port = LAB-05 after PASS).
- **FR-LAB-10.5** Document supersession: LAB-03/04 no longer lab visual SSOT.

## Acceptance Criteria
- [ ] Greenfield overlay Present · hit targets correct · strip excluded from Issue open
- [ ] `#/lab/feed` uses greenfield only · Deprecated import ban held
- [ ] Gate rows M150/M154/M152–M153/M158/M149: checklist + shots Present
- [ ] OP eye PASS recorded (date/who) — **Absent = BLOCK** (no invent)
- [ ] LAB-05 prerequisite language updated to depend on **LAB-10** visual PASS

## Вне scope
LAB-05 implement · delete Deprecated files · invent API/SVG · `#/board` mutate · Playwright D as OP substitute

## Technical subtasks
### t01 — Overlay compose + hit targets
### t02 — Cutover FeedLabPage · Deprecated ban grep
### t03 — Full visual evidence pack + OP pair
### t04 — Cross-link LAB-05 / INDEX / VISUAL-DoD tip SSOT
