# STORY-SPA-NF-LAB-04 — Modal detail from text + media click

## Meta
- **Key:** `STORY-SPA-NF-LAB-04-modal-detail-from-text-media`
- **Package:** [next-feed-lab](INDEX.md) · [VISUAL-DoD.md](VISUAL-DoD.md)
- **Status:** Todo · P1.3 scaffolded (`2026-10-13T12:59:05Z`) · `pkg-000130` · Await P2/P3
- **Depends on:** LAB-03 structure Present (visual residual Blocked · OP eye Absent — not invent PASS)
- **Code boundary:** reuse `OverlayHost` + `IssuePresentationLayout` (+ `OverlayLayout`); open only from **title/summary + media** hit targets (Q4 A); same ban-list as LAB-03 (no product hosts / classic Controls CSS as Done)
- **Process:** A+C+F — visual tip **M158** (+ discussion body in overlay)

## Зачем
Как в social feed: клик по тексту/картинке открывает детали; React/Comment/Share/Reactions остаются своими действиями — и modal должен читаться как M158, не как classic issue overlay.

## Artboards
- [M158](../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md) — modal/sheet (**gate**)  
- M150 detail context · M152–M153 discussion in overlay  

## Past failures this tip prevents
- Opening modal from whole card / action strip (wrong hit model)
- Claiming overlay Done when structure mounts but chrome stays classic / UUID
- Porting modal patterns to product before lab M158 gate (use LAB-05 after)

## Функциональные требования (FR)
- **FR-LAB-04.1** Click on card **title**, **summary**, or **media stub** opens modal/sheet with that fixture’s civic + discussion atoms.
- **FR-LAB-04.2** Click on post **action strip** does **not** open modal (reactions/comment/share stay local behaviors).
- **FR-LAB-04.3** Overlay uses existing `OverlayHost` + `IssuePresentationLayout` (narrow → sheet, wide → modal per existing patterns).
- **FR-LAB-04.4** Escape / close / scrim dismisses; focus return to opener.
- **FR-LAB-04.5** Still **no** HTTP — same fixture object as list card.
- **FR-LAB-04.6** Overlay Done path obeys [VISUAL-DoD.md](VISUAL-DoD.md) §3 bans (no shelter hosts / classic Controls CSS as Done skin).
- **FR-LAB-04.7** Visual Done for **M158**: written must-state checklist + screenshot + OP; Partial = **BLOCK**.

## Acceptance Criteria
### Behavior
- [ ] Text/media of 5 cards opens modal; action strip excluded from open hit
- [ ] Close / Escape / scrim works; focus return
- [ ] Fixture-only data in modal; no gateway/threads HTTP

### Anti-mixing / anti-shallow
- [ ] No `BoardIssuePost` / `FeedCivicPost` / `FeedDiscussionBlock` as modal body Done chrome
- [ ] No classic `ReactionControls.css` on overlay reaction path as Done
- [ ] Identity in overlay shows fixture demo id (not UUID-first)
- [ ] Discussion copy ≠ classic DISCUSSION as Done

### Visual gate (Partial = BLOCK)
- [ ] **M158** must-state checklist from written § + local-five screenshot(s) + OP eye PASS
- [ ] Overlay reads as M158 sheet/modal — not classic board issue chrome
- [ ] Evidence named per [VISUAL-DoD.md](VISUAL-DoD.md) §5

### Explicit non-AC
- [ ] Structure-only mount without M158 checklist — **not** PASS
- [ ] «Partial visual OK» — **BLOCK**

## Вне scope
Route-mode full page detail · invent routes beyond lab · product `FeedIssueMount` mandatory (may Related-learn patterns, not required Mount) · product port (LAB-05)

## Technical subtasks

### t01 — Hit targets
- Wrap title/summary/media in button/link-like controls with `onOpenDetail(fixtureId)`; stopPropagation on action strip.

### t02 — Overlay compose
- Mount OverlayHost; body = atom civic detail + discussion atoms for selected fixture; lab CSS restyle to M158 § (C).

### t03 — Verify + visual gate
- local-five · `#/lab/feed` · open/close matrix · no gateway calls in network panel.
- M158 checklist + screenshots + OP pair; stop if Partial.
