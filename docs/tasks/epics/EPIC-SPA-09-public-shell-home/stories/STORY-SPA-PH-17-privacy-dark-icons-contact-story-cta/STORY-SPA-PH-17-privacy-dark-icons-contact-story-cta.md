# STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta — pipeline mirror

> **Epic:** [EPIC-SPA-09-public-shell-home](../../EPIC-SPA-09-public-shell-home.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/public-home/STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta.md`](../../../../backlog-stories/public-home/STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta.md)  
> **Status:** P5 APPLY · T01–T03 **Done** · gate **BLOCK** · Story **BLOCKED** (OP eye) · `2026-10-24T10:15:21Z` · `pkg-000223` · `activation: none` · Await P8  
> **Package:** `pkg-000223` · public-home · Interview **M6·M7** · wave `OP-spa nf25-wave5-20261024`  
> **ui_scope:** static-pages / public-home · **mixed** · Path A arch Present · Partial visual=**BLOCK** · NO BRIEF · no invent PASS  
> **Skill declared:** `react-expert`  
> **Depends:** PH-15 Present · PH-16 soft (CTA URL) · tip after `pkg-000222`  
> **Runtime:** P5 Done · [disposition](../../../../run-reports/p5-disposition-STORY-SPA-PH-17-2026-10-24.md) · P6 skipped · Await **P8** · CAPTURE-META `fails: []` · OP eye Absent → gate **BLOCK**

## Purpose

Privacy dark-readable icons · Contact primary CTA under `storyHint` → `VITE_STORY_GPT_URL` · Vitest · OP eye — no invent PASS / legal / RU-ET invent.

## L1 — FR (backlog verbatim)

- **FR-PH-17.1** Privacy card icons + download glyph readable on **dark** theme (contrast · currentColor / theme assets — no invent new art set).  
- **FR-PH-17.2** Contact: under `storyHint`, add typical primary CTA → story-create URL (`VITE_STORY_GPT_URL` / same helper as Header · PH-16).  
- **FR-PH-17.3** i18n CTA label: reuse existing story-submit / HIW CTA keys if Present · **no invent** RU/ET strings beyond OP tip.  
- **FR-PH-17.4** Vitest · OP eye — no invent PASS.

## Acceptance Criteria (backlog verbatim)

- [x] Privacy icons visible dark (structure)  
- [x] Contact CTA button Present · env href (structure)  
- [x] Vitest · OP eye Absent → **BLOCK**  

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-PH-17-privacy-dark-icons-contact-story-cta.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ph-17-t01-privacy-icons](task-spa-ph-17-t01-privacy-icons/README.md) | Dark-readable icons/CSS | **Done** |
| T02 | [task-spa-ph-17-t02-contact-cta](task-spa-ph-17-t02-contact-cta/README.md) | Button under storyHint | **Done** |
| T03 | [task-spa-ph-17-t03-vitest](task-spa-ph-17-t03-vitest/README.md) | Markers | **Done** |

**Order:** t01 ‖ t02 → t03

## Out of scope (backlog verbatim)

Brand PNG · invent legal body · invent form POST

## @mockup handoff

```text
@mockup: spa-app/docs/architecture/public-home/17-privacy-dark-icons-contact-story-cta.md
@mockup: spa-app/docs/tasks/backlog-stories/next-feed/INTERVIEW-NF-25-plus-op-residual-wave5-2026-10-24.md
@mockup: spa-app/docs/analysis/evidence/op-residual-wave5-2026-10-24/06-privacy-icons-dark-invisible.png
@mockup: spa-app/docs/analysis/evidence/op-residual-wave5-2026-10-24/07-contact-story-hint-no-cta.png
```

Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen  
Shots: [visual-checklists](./visual-checklists-privacy-dark-icons-contact-story-cta.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/)
