# STORY-SPA-PH-13-how-it-works-content-cta — pipeline mirror

> **Epic:** [EPIC-SPA-09-public-shell-home](../../EPIC-SPA-09-public-shell-home.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/public-home/STORY-SPA-PH-13-how-it-works-content-cta.md`](../../../../backlog-stories/public-home/STORY-SPA-PH-13-how-it-works-content-cta.md)  
> **Status:** P8 local close · T01–T04 **Done** · structure Present · gate **BLOCK** · Story **BLOCKED** (OP eye) OK · `2026-10-22T18:06:33Z` · `pkg-000210` closed · `activation: none`  
> **Package:** `pkg-000210` · public-home · Interview **H10** · M168 + wave3 intake · wave `OP-spa ns08-10-nf21-23-ct33-cr24-25-ph13-11-20261022`  
> **ui_scope:** `how-it-works` / public-home · **mixed** · Path A p13UxReady · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Depends:** PH-05 How it works Present · soft NF-23 board deprecate · tip after `pkg-000209` CR-25 P8  
> **Runtime:** P8 local close · Path A shots Present · CAPTURE-META `fails: []` · OP eye Absent → gate **BLOCK** · no invent OP PASS · no invent landing HTML · no invent GPT URL · NO PUSH

## Purpose

How It Works content + CTA residual (M168): remove board-open hints, CTAs → `/next/feed`, landing FAQ link, compact step-head, EN/ET/RU via existing i18n — Interview H10 · no invent landing HTML/GPT URL.

## L1 — FR (backlog verbatim)

- **FR-PH-13.1** Remove all `Opens '/board'` / `inlineActionHint` board opens / monospace route helpers from UI.  
- **FR-PH-13.2** Both feed CTAs: label `Go to Feed` → `/next/feed`.  
- **FR-PH-13.3** Step headers: compact badge+title (M168 proposal 40×40 badge · 12 gap — review before hard lock).  
- **FR-PH-13.4** Secondary CTA `Concept & FAQ on landing` + external icon → `https://uus-veerenni-civic.dogestonia.me/#how-it-works`.  
- **FR-PH-13.5** Apply M168 EN copy proposal; localize ET/RU via existing i18n (no invent long FAQ).  
- **FR-PH-13.6** Vitest · OP eye — no invent PASS.

## Acceptance Criteria (backlog verbatim)

- [x] M168 + intake cited  
- [x] No Opens `/board` — structure Present · OP eye Absent  
- [x] CTA → next/feed · landing link Present — structure Present · OP eye Absent  
- [x] Vitest · OP eye — vitest green · OP Absent → Partial=**BLOCK**

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-PH-13-how-it-works-content-cta.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ph-13-t01-copy](task-spa-ph-13-t01-copy/README.md) | Dictionary EN(M168)+ET/RU · remove board hints | **Done** |
| T02 | [task-spa-ph-13-t02-cta](task-spa-ph-13-t02-cta/README.md) | Feed CTAs → `/next/feed` · landing FAQ link | **Done** |
| T03 | [task-spa-ph-13-t03-css](task-spa-ph-13-t03-css/README.md) | Step-head density (M168 proposal) | **Done** |
| T04 | [task-spa-ph-13-t04-vitest](task-spa-ph-13-t04-vitest/README.md) | Markers · Path A · gate | **Done** |

**Order:** Intake PASS (held) → t01 → t02 → t03 → t04

## Out of scope (backlog verbatim)

PH-11 static pages · invent landing HTML · invent GPT URL

## DoD (backlog verbatim)

M168 + intake cited · no Opens `/board` · CTA → next/feed · landing link Present · Vitest · OP eye — no invent PASS.

## @mockup handoff

- Continuity: Interview **H10** · [M168](../../../../UX/mockups/home/DOGEstonia-M168-how-it-works-content-cta-spec-v1.0.md) · [wave3 intake](../../../../analysis/analysis-wave3-ux-intake-m163-m168-2026-10-22.md) · Path A p13UxReady  
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen  
- Shots: [visual-checklists](./visual-checklists-how-it-works-content-cta.md) · [screenshots/](./screenshots/README.md) · [full-cycle](./screenshots/full-cycle/README.md)
