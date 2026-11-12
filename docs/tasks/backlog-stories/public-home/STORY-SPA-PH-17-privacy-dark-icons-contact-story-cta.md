# STORY-SPA-PH-17 — Privacy dark icons + Contact story CTA

## Meta

- **Key:** `STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta`
- **Package:** [public-home](INDEX.md)
- **Status:** **P5 APPLY** · T01–T03 Done · gate **BLOCK** · Story **BLOCKED** (OP eye) · `pkg-000223` · `activation: none` · Await P8 · soft [wave5 intake](../../../analysis/analysis-wave5-ux-intake-m173-m176-2026-10-24.md)  
- **Interview:** [INTERVIEW-NF-25-plus…](../next-feed/INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md) **M6·M7**
- **Depends on:** PH-15 Present · PH-16 soft (CTA URL)  
- **Code home:** `StaticPublicPage.jsx` · privacy CSS · soft Contact dict  
- **L1.5:** [arch](../../../architecture/public-home/17-privacy-dark-icons-contact-story-cta.md)
- **Evidence:** [06…](../../../analysis/evidence/op-residual-wave5-2026-10-24/06-privacy-icons-dark-invisible.png) · [07…](../../../analysis/evidence/op-residual-wave5-2026-10-24/07-contact-story-hint-no-cta.png)

## L1 — FR

- **FR-PH-17.1** Privacy card icons + download glyph readable on **dark** theme (contrast · currentColor / theme assets — no invent new art set).  
- **FR-PH-17.2** Contact: under `storyHint`, add typical primary CTA → story-create URL (`VITE_STORY_GPT_URL` / same helper as Header · PH-16).  
- **FR-PH-17.3** i18n CTA label: reuse existing story-submit / HIW CTA keys if Present · **no invent** RU/ET strings beyond OP tip.  
- **FR-PH-17.4** Vitest · OP eye — no invent PASS.

## OOS

Brand PNG · invent legal body · invent form POST

## AC

- [x] Privacy icons visible dark (structure)  
- [x] Contact CTA button Present · env href (structure)  
- [x] Vitest · OP eye Absent → **BLOCK**  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-ph-17-t01-privacy-icons` | Done | Dark-readable icons/CSS | 17.1 |
| `task-spa-ph-17-t02-contact-cta` | Done | Button under storyHint | 17.2 · 17.3 |
| `task-spa-ph-17-t03-vitest` | Done | Markers | 17.4 |

### Order

`t01` ‖ `t02` → `t03` · skill `react-expert`
