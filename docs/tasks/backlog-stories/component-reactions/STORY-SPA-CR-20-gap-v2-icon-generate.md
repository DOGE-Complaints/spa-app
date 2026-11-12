# STORY-SPA-CR-20 — Gap v2 icon generate + promote (reactions + react thumbs-up)

## Meta

- **Key:** `STORY-SPA-CR-20-gap-v2-icon-generate`
- **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Status:** P3 Done · `pkg-000156` · gate **BLOCK** (OP eye) · Gap v2 Present · docs `2026-10-18T11:41:29Z`
- **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md)
- **Depends on:** [CR-icon §Gap v2](STORY-SPA-CR-icon-assets.md) (open) · CR-11 URL wire Present
- **Blocks:** CR-21 / CR-17…19 visual PASS · CR-11/15 glyph AC
- **UX mirror:** [OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md](OP-UX-MIRROR-gap-v2-people-media-residual-2026-10-18.md) §3  
- **Analysis:** [analysis-component-reactions-missing…2026-10-18.md](../../../analysis/analysis-component-reactions-missing-reactions-icon-and-people-ux-2026-10-18.md)  
- **Code / asset home:** icon-system `icons/actions/` · `spa-app/public/icons/next-feed/actions/` · strip consumers

## Зачем

Разрыв 2026-10-18: URL `reactions.svg` wired, файл **Absent** → broken img. `react.svg` = smiley, не thumbs-up. Прошлые волны **запрещали** invent SVG и откладывали generate — файл так и не появился. Эта стори **явно авторизует Write** двух chrome SVG + promote.

**Supersedes:** «separate OP icon dialog later» as the only delivery path for Gap v2 · CR-17 t04 «wire only / Absent OK».

## UX SSOT

- Mirror §3 · M154/M160 strip chrome glyphs  
- CR-icon §Gap v2 generator handoff (bodies now **in scope**)  
- Non-goal: multicolor marks (CSS accents hold)

## FR

- **FR-CR-20.1** Master `icons/actions/reactions.svg` Present: two overlapping circles · `currentColor` · viewBox 24 · stroke 2.  
- **FR-CR-20.2** Runtime `public/icons/next-feed/actions/reactions.svg` Present (promote from master).  
- **FR-CR-20.3** Master+runtime `react.svg` replaced with outline thumbs-up (not smiley).  
- **FR-CR-20.4** Strip zone Reactions shows dual-circle glyph (no broken `<img>`).  
- **FR-CR-20.5** Strip zone React (slot / fallback) shows thumbs-up glyph.  
- **FR-CR-20.6** Manifest / SHA / ICON #10 / CR-icon §Gap v2 → §Reuse updated after promote.  
- **FR-CR-20.7** Vitest no longer asserts file Absent; asserts file Present + URL still wired.  

## Вне scope

Multicolor mark SVG · Lucide · people UX (CR-21) · media flush (CR-22) · invent HTTP · `#/next/feed`

## Acceptance Criteria

- [x] `ls` runtime: `reactions.svg` Present · `react.svg` thumbs-up (visual/OP or SVG path inspection)  
- [x] `#/lab/feed` Reactions zone: no broken image icon  
- [x] Manifest + CR-icon Gap v2 closed → Reuse  
- [x] Vitest: `existsSync(reactions.svg) === true` · strip URL retained  
- [x] Verify: `http://127.0.0.1:5173/#/lab/feed`  
- [ ] OP eye gate (Absent = BLOCK · no invent PASS)

## Technical subtasks

> Skill: `react-expert` (+ SVG handoff) · P3 Done `2026-10-18T12:07:24Z` · Gap v2 Written + promoted · Await **P4**  
> **Constraint flip applied:** two Gap v2 SVG bodies Present (unlike CR-11…19 wire-only).

| ID | Status | Purpose | Where | FR / AC |
|----|--------|---------|-------|---------|
| `task-spa-cr-20-t01-master-reactions-svg` | Todo | NEW master dual-circle `reactions.svg` | `docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/actions/reactions.svg` | 20.1 |
| `task-spa-cr-20-t02-master-react-thumbs` | Todo | REPLACE master `react.svg` thumbs-up outline | same `icons/actions/react.svg` | 20.3 |
| `task-spa-cr-20-t03-promote-runtime` | Todo | Copy/promote both into `public/icons/next-feed/actions/` | `spa-app/public/icons/next-feed/actions/{react,reactions}.svg` | 20.2–20.5 |
| `task-spa-cr-20-t04-manifest-cr-icon` | Todo | SHA/manifest · CR-icon Gap v2 → Reuse · ICON #10 tip | icon-system manifest · `STORY-SPA-CR-icon-assets.md` · `ICON-GENERATION-INDEX.md` | 20.6 |
| `task-spa-cr-20-t05-strip-test-hygiene` | Todo | Remove Absent-OK comment; flip cr11/cr17 Absent tests → Present | `FeedPostActionStrip.css` · `*cr11*` / `*cr17*` tests | 20.7 |

### Constraints (all tasks)

- **Do** Write only `react` + `reactions` chrome SVG (Gap v2)  
- **Do not** Write multicolor mark set / Lucide / emoji  
- No invent people HTTP · no invent OP PASS  
- No `#/next/feed` cutover  

### Suggested P1.3 order

`t01` → `t02` → `t03` → `t04` → `t05`

## DoD

Broken Reactions icon gone; React is thumbs-up; Gap v2 closed on disk + catalog; tests encode Present.
