# STORY-SPA-NF-24 — Map leaves sheet / pin popup theme

## Meta

- **Key:** `STORY-SPA-NF-24-map-leaves-sheet-theme`
- **Package:** [next-feed](INDEX.md)
- **Layers:** L1 · L1.5 ARCH-DELTA §12 · L2
- **Status:** P8 local close · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000212` closed · `activation: none`
- **Interview:** [INTERVIEW-NF-24-plus…](INTERVIEW-NF-24-plus-op-residual-wave4-2026-10-23.md) **M1**
- **Evidence:** [01-map-leaves-sheet…](../../../analysis/evidence/op-residual-wave4-2026-10-23/01-map-leaves-sheet-dark-on-light.png)
- **Code home:** `BoardIssuesMap.css` · soft `MapIssuePreview` / `MapChrome.css`
- **Analysis:** [disposition](../../run-reports/p5-disposition-STORY-SPA-NF-24-2026-10-23.md) · [p7](../../../analysis/reaudit-STORY-SPA-NF-24-p7-2026-10-23.md) · [arch](../../../architecture/next-feed-vl/24-map-leaves-sheet-theme.md)
- **Pipeline:** [STORY-SPA-NF-24…](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-24-map-leaves-sheet-theme/STORY-SPA-NF-24-map-leaves-sheet-theme.md)
- **Naming:** pin atom = `IssueMapPin` · cluster multi-issue UI = **leaves sheet** (`board-issues-map-leaves`)

## L1 — FR

- **FR-NF-24.1** Leaves sheet (`.board-issues-map-leaves`) follows `data-theme` — light theme uses light surface/text tokens (no hardcoded navy `rgba(12,18,30,…)` as sole fill).  
- **FR-NF-24.2** Default pin popup (`.board-issues-map-popup`) same theme bind.  
- **FR-NF-24.3** Soft: `MapIssuePreview` / feed pin card — remove dark-only CSS fallback when theme light.  
- **FR-NF-24.4** Dark theme readability held.  
- **FR-NF-24.5** Vitest · OP eye — no invent PASS.

## OOS

Cluster leaves logic (NF-20) · invent basemap · invent OP PASS

## AC

- [ ] Light theme: leaves sheet light  
- [ ] Pin popup themed  
- [ ] Dark held · Vitest · OP eye  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-nf-24-t01-leaves-css` | Todo | Theme tokens on leaves sheet | 24.1 |
| `task-spa-nf-24-t02-popup` | Todo | Theme tokens on pin popup | 24.2 |
| `task-spa-nf-24-t03-preview` | Todo | MapIssuePreview light honesty | 24.3 |
| `task-spa-nf-24-t04-vitest` | Todo | CSS/theme markers | 24.4 · 24.5 |

### Order

`t01` → `t02` → `t03` → `t04` · skill `react-expert`
