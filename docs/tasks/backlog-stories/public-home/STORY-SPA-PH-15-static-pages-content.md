# STORY-SPA-PH-15 — About / Privacy / Contact content frames

## Meta

- **Key:** `STORY-SPA-PH-15-static-pages-content`
- **Package:** [public-home](INDEX.md)
- **Status:** P8 local close · T01–T04 Done · gate **BLOCK** · Story **BLOCKED** (OP eye) · `2026-10-23T15:25:39Z` · `pkg-000219` · SHAs `f7b5af4`/`e83b984`/`6738486` · `activation: none` · NO PUSH · [pipeline](../../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-15-static-pages-content/STORY-SPA-PH-15-static-pages-content.md) · [disposition](../../run-reports/p5-disposition-STORY-SPA-PH-15-2026-10-23.md) · [arch](../../../architecture/public-home/15-static-pages-content.md)
- **Interview:** [INTERVIEW-NF-24-plus…](../next-feed/INTERVIEW-NF-24-plus-op-residual-wave4-2026-10-23.md) **S8**
- **UX tip:** [M172](../../../UX/mockups/home/DOGEstonia-M172-static-pages-copy-RU-EN-ET-spec-v2.0.md) · [Privacy downloads](../../../UX/mockups/home/DOGEstonia-M172-privacy-document-downloads-spec-v1.0.md) · [intake](../../../analysis/analysis-wave4-ux-intake-m169-m172-2026-10-23.md) · soft [UX-PROMPTS…](UX-PROMPTS-wave4-static-pages-content-2026-10-23.md) · soft M166 / PH-11 · icons [m172-svg-icons-v1.0/](../../../UX/mockups/home/m172-svg-icons-v1.0/) · PDFs [`public/docs/`](../../../../public/docs/)
- **Depends on:** PH-11 routes Present
- **Code home:** `StaticPublicPage.jsx` · `AboutPage` / `PrivacyPage` / `ContactPage` · `publicHomeDictionary.js`

## L1 — FR

- **FR-PH-15.1** About / Contact: tip-structured sections · **RU verbatim** + EN/ET from M172 (no invent paraphrase).  
- **FR-PH-15.2** Privacy: H1 (`privacy.title`) + **three download cards** per [privacy downloads tip](../../../UX/mockups/home/DOGEstonia-M172-privacy-document-downloads-spec-v1.0.md) — Privacy Notice → `/docs/privacy.pdf` · Terms of Use → `/docs/terms.pdf` · Participant Information → `/docs/participation_information.pdf` · EN card/CTA labels from artboard · **no invent** RU/ET card strings · **no invent** in-page legal body (PDF only).  
- **FR-PH-15.3** i18n keys for About/Contact RU/EN/ET per M172 · Privacy H1 held · download row labels soft TBD for RU/ET.  
- **FR-PH-15.4** Shared header/footer held (M169 no-tagline) · Vitest · OP eye — no invent PASS · no invent form POST.

## OOS

PH-14 HIW · invent GDPR page prose · invent email · invent RU/ET download labels

## AC

- [x] UX tip cited / intake PASS (M172 + privacy downloads)  
- [x] About / Contact structured beyond pending stub (structure · OP Absent)  
- [x] Privacy: three PDF downloads · no fake in-page legal (structure · OP Absent)  
- [x] Vitest · OP eye Absent → gate **BLOCK**  

## L2 — Technical subtasks

| ID | Status | Purpose | FR |
|----|--------|---------|-----|
| `task-spa-ph-15-t01-about` | Done | About sections + dict | 15.1 · 15.3 |
| `task-spa-ph-15-t02-privacy` | Done | Download cards + `/docs/` links + tip icons | 15.2 · 15.3 |
| `task-spa-ph-15-t03-contact` | Done | Contact outline | 15.1 · 15.3 |
| `task-spa-ph-15-t04-vitest` | Done | Markers | 15.4 |

### Order

UX intake → `t01` → `t02` → `t03` → `t04` · skill `react-expert`
