# STORY-SPA-PH-13 — How It Works content + CTA + landing link

## Meta

- **Key:** `STORY-SPA-PH-13-how-it-works-content-cta`
- **Package:** [public-home](INDEX.md)
- **Status:** P8 local close · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `pkg-000210` closed · `activation: none`
- **Interview:** [INTERVIEW-NF-21-plus…](../next-feed/INTERVIEW-NF-21-plus-op-residual-spa-wide-2026-10-22.md) **H10**
- **UX tip:** [M168](../../../UX/mockups/home/DOGEstonia-M168-how-it-works-content-cta-spec-v1.0.md) · [intake](../../../analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md)
- **Analysis:** [disposition](../../../analysis/p5-disposition-STORY-SPA-PH-13-2026-10-22.md) · [p7](../../../analysis/reaudit-STORY-SPA-PH-13-p7-2026-10-22.md) · [arch](../../../architecture/public-home/13-how-it-works-content-cta.md)
- **Pipeline:** [STORY-SPA-PH-13…](../../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-13-how-it-works-content-cta/STORY-SPA-PH-13-how-it-works-content-cta.md)
- **Code home:** `HowItWorksPage.jsx` · `howItWorksDictionary.js` · `HowItWorksPage.css`

## L1 — FR

- **FR-PH-13.1** Remove all `Opens '/board'` / `inlineActionHint` board opens / monospace route helpers from UI.  
- **FR-PH-13.2** Both feed CTAs: label `Go to Feed` → `/next/feed`.  
- **FR-PH-13.3** Step headers: compact badge+title (M168 proposal 40×40 badge · 12 gap — review before hard lock).  
- **FR-PH-13.4** Secondary CTA `Concept & FAQ on landing` + external icon → `https://uus-veerenni-civic.dogestonia.me/#how-it-works`.  
- **FR-PH-13.5** Apply M168 EN copy proposal; localize ET/RU via existing i18n (no invent long FAQ).  
- **FR-PH-13.6** Vitest · OP eye — no invent PASS.

## OOS

PH-11 static pages · invent landing HTML · invent GPT URL

## AC

- [x] M168 + intake cited  
- [x] No Opens `/board` — structure Present · OP Absent  
- [x] CTA → next/feed · landing link Present — structure Present · OP Absent  
- [ ] Vitest · OP eye — Vitest green · OP Absent → **BLOCK**  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-ph-13-t01-copy` | Done | Dictionary + remove hints | 13.1 · 13.5 |
| `task-spa-ph-13-t02-cta` | Done | href next/feed + landing link | 13.2 · 13.4 |
| `task-spa-ph-13-t03-css` | Done | Step-head density | 13.3 |
| `task-spa-ph-13-t04-vitest` | Done | Markers | 13.6 |

### Order

Intake PASS → `t01` → `t02` → `t03` → `t04` · skill `react-expert`
