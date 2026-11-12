# STORY-SPA-PH-14 — How It Works deep redesign

## Meta

- **Key:** `STORY-SPA-PH-14-how-it-works-deep-redesign`
- **Package:** [public-home](INDEX.md)
- **Status:** P8 local close · T01–T04 Done · gate **BLOCK** · Story **BLOCKED** (OP eye) · `2026-10-23T15:12:12Z` · `pkg-000218` · SHAs `0b32ab9`/`8c49690`/`6c1cec0` · `activation: none` · NO PUSH · [pipeline](../../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-14-how-it-works-deep-redesign/STORY-SPA-PH-14-how-it-works-deep-redesign.md) · [disposition](../../run-reports/p5-disposition-STORY-SPA-PH-14-2026-10-23.md) · [arch](../../../architecture/public-home/14-how-it-works-deep-redesign.md)
- **Interview:** [INTERVIEW-NF-24-plus…](../next-feed/INTERVIEW-NF-24-plus-op-residual-wave4-2026-10-23.md) **H6**
- **UX tip:** [M171](../../../UX/mockups/home/DOGEstonia-M171-how-it-works-approved-copy-spec-v1.0.md) · [intake](../../../analysis/analysis-wave4-ux-intake-m169-m172-2026-10-23.md) · soft [UX-PROMPTS…](UX-PROMPTS-wave4-how-it-works-deep-2026-10-23.md) · soft M168 routes
- **Depends on:** PH-13 structure Present
- **Code home:** `HowItWorksPage.jsx` · `howItWorksDictionary.js` · `HowItWorksPage.css`

## L1 — FR

- **FR-PH-14.1** Apply deep layout/visual tip (step visuals + density) per M171 after intake PASS.  
- **FR-PH-14.2** Copy: **RU verbatim** from M171 §3 · **EN** from M171 §4 · **no invent ET** (editorially reviewed later).  
- **FR-PH-14.3** Final CTA row: landing FAQ control grouped **leftward** with Go to Feed (not orphan far-right).  
- **FR-PH-14.4** Held: four steps (observation → Telegram private Story → public Issues → profile/discussion) · Feed→`/next/feed` · landing URL · Telegram CTA at step 02 · no Opens `/board` · no invent GPT URL.  
- **FR-PH-14.5** Vitest · OP eye — no invent PASS.

## OOS

PH-15 static pages · invent landing HTML

## AC

- [x] UX tip cited / intake PASS (M171)  
- [x] Visuals + copy tip (structure · OP Absent)  
- [x] CTA grouping leftward (structure · OP Absent)  
- [x] Routes held · Vitest · OP eye Absent → gate **BLOCK**  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-ph-14-t01-layout` | Done | Step visuals + CSS density | 14.1 |
| `task-spa-ph-14-t02-copy` | Done | Dictionary update | 14.2 |
| `task-spa-ph-14-t03-cta` | Done | CTA row grouping | 14.3 |
| `task-spa-ph-14-t04-vitest` | Done | Markers | 14.4 · 14.5 |

### Order

UX intake → `t01` → `t02` → `t03` → `t04` · skill `react-expert`
