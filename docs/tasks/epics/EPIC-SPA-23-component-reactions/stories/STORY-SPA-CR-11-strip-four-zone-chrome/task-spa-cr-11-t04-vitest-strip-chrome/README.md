# SPA-CR-11-T04 — Vitest four-zone strip chrome + gate/shots

**Status:** Done · `2026-10-16T10:32:31Z`  
**Story:** [`../STORY-SPA-CR-11-strip-four-zone-chrome.md`](../STORY-SPA-CR-11-strip-four-zone-chrome.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-reactions/STORY-SPA-CR-11-strip-four-zone-chrome.md`](../../../../../backlog-stories/component-reactions/STORY-SPA-CR-11-strip-four-zone-chrome.md)  
**ui_scope:** `feed-lab` · **mixed**  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-16T10:27:28Z`  
**Package:** `pkg-000147`  
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md)  
**@mirror:** [`../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md`](../../../../../backlog-stories/component-reactions/OP-UX-MIRROR-m154-strip-picker-visual-2026-10-16.md) §3.1–3.4

## Purpose
AC vitest + Path A shots + gate: zones=4 · testids react/comment/share/reactions · icon presence; update nflab/cr09 assumptions of 3-zone.

## Code Facts (verified at scaffold)
- `feedLab.cr09` / nflab07 assert zones=3 — must update
- Gate stub PENDING · Gap v2 residual → visual BLOCK

## Implement notes
- New or extend `feedLab.cr11.test.jsx` as needed
- Gate Result stays **BLOCK** if OP eye Absent or Gap v2 glyphs still wrong/Absent — no invent PASS
- Document Gap v2 residual in gate note

## Constraints
- Partial visual = BLOCK · no invent OP PASS · no invent SVG
- `data-lab-visual-done=false` until OP PASS (+ Gap promote)

## AC / DoD
- [x] Vitest: `data-lab-strip-zones="4"` · four action testids · icon wiring
- [x] Screenshots + checklist filled; gate Date from live `--print-utc-now` at P3
- [x] Story visual Done not claimed without OP eye / Gap v2

## Where to change
`spa-app/src/features/feed-lab/__tests__/*` · gate/checklist/shots under story root

## Verification
```bash
cd spa-app && npx vitest run src/features/feed-lab
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
```
