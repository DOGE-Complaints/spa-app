# SPA-NF-LAB-03-T04 — Visual gate pack (A+F)

**Status:** Done · evidence · OP Pending · story BLOCK (`2026-10-13T12:42:25Z`)
**Story:** [`../STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md`](../STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md)
**Decision Ref:** [`../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md`](../../../../../backlog-stories/next-feed-lab/STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md)
**ui_scope:** `feed-lab`
**ui_complexity:** `standard`
**ui_anchor:** true
**UI routes:** `/#/lab/feed`
**Skill declared:** `react-expert`
**Scaffolded:** `2026-10-13T12:29:42Z`
**Package:** `pkg-000129`
**@mockup:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md)
**@mockup-png:** [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png)
**Also gates:** M150 · M154 · M152 · M153 (wired on T01–T03; evidence collected here)
**Runtime prerequisite:** `./scripts/shell/local-five-serve-and-health.sh`
**VISUAL-DoD:** [`../../../../../backlog-stories/next-feed-lab/VISUAL-DoD.md`](../../../../../backlog-stories/next-feed-lab/VISUAL-DoD.md) §4–5 · Partial=**BLOCK**

## Purpose
For tip order **M150 → M154 → M152/M153 → M149**: extract written must-state checklists from artboard §; capture local-five screenshots; OP eye sign-off. **Stop tip if Partial** — do not close story. Export-exists / mounted alone ≠ PASS.

## Gate order
1. M150 — identity, text, media, action strip, card silhouette
2. M154 — reaction strip/picker (next CSS only)
3. M152 / M153 — discussion summary / tree / composer atoms
4. M149 — **list rhythm only** (5-card spacing; not product toolbar/map)

## Constraints
- Partial visual = **BLOCK** (forbidden to document as Done).
- Screenshots **name ≠ create** until implement.
- No invent · no product mutate · no classic Controls as Done skin.

## AC / DoD
- [x] Written checklists for M150/M154/M152/M153/M149 in gate evidence
- [x] local-five screenshots Present per gate
- [ ] OP eye recorded — **Absent → story Result BLOCK**
- [ ] Story closed only if all visual gates PASS (no Partial) — **not closed**

## Where to change
- Story-root `screenshots/` + gate notes / acceptance-verification
- Lab CSS restyle as needed to hit written must-states (C)

## Verification
- Story gate Result=PASS only when all visual rows PASS
- Ban re-check · product routes unchanged
