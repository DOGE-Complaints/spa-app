# STORY-SPA-CT-31-live-attach-preview-consumable — pipeline mirror

> **Epic:** [EPIC-SPA-24-component-thread](../../EPIC-SPA-24-component-thread.md)  
> **Backlog SSOT / source:** [`../../../../backlog-stories/component-thread/STORY-SPA-CT-31-live-attach-preview-consumable.md`](../../../../backlog-stories/component-thread/STORY-SPA-CT-31-live-attach-preview-consumable.md)  
> **Status:** P5 APPLY Done · structure **Present** · gate **BLOCK** · `2026-10-21T18:10:28Z` · tip · activation **none** · Await **P8** · P6 not needed  
> **Package:** `pkg-000195` · component-thread · ARCH §17 · policy **A** locked  
> **ui_scope:** `thread-mount` / `feed` · **mixed** · Path A **code lock** · Partial visual=**BLOCK** · NO BRIEF · no UX gen  
> **Skill declared:** `react-expert`  
> **Policy lock:** **A** — authenticated `fetch` + blob → objectURL · **no invent B** · **no invent HTTP-09**  
> **Depends:** CT-30 structure Present · CT-22 preview host · HTTP-07/08 Done  
> **Runtime:** T01–T05 **Done** · no invent OP PASS / CDN

## Purpose

CT-30 maps `published_url` into preview, but browser `<img src>` cannot send Bearer → GET **401**. Policy **A**: SPA auth fetch → blob → objectURL so citizen sees attachment bytes on Live `#/next/feed`.

## L1 — FR (backlog verbatim)

- **FR-CT-31.1** When a comment attachment has image `published_url` (or mapped `publishedUrl`), citizen sees a rendered image on Live `#/next/feed` discussion — not a broken icon.  
- **FR-CT-31.2** Must not invent CDN / storage vendor; honesty when bytes/floor deny or URL null (CT-22 / CT-30.4 held).  
- **FR-CT-31.3** Lab FixtureAdapter path unchanged.  
- **FR-CT-31.4** Chosen strategy (**A**) documented in ARCH §17 · Vitest covers happy path for that strategy.  
- **FR-CT-31.5** Do not duplicate HTTP contract in SPA story — **link** REQ-05 / HTTP-07/08; **no** HTTP-09 (policy B not chosen).  
- **FR-CT-31.6** **Supersedes** CT-30 DoD claim that bare `<img src={publishedUrl}>` alone = Done live preview E2E.

## Acceptance Criteria (backlog · policy A)

- [x] OP locked **A** (P1.3 APPLY Meta)  
- [x] Live discussion shows image for tree attachment with `published_url` (structure · Path A / vitest) · OP eye Absent → visual **BLOCK**  
- [x] Honesty when null / deny  
- [x] Lab held  
- [x] Vitest for strategy **A**  
- [x] No invent CDN / OP PASS

Gate: [story-acceptance-gate](./story-acceptance-gate-STORY-SPA-CT-31-live-attach-preview-consumable.md) · **BLOCK**.

## Tasks

| ID | Folder | Purpose | Status |
|----|--------|---------|--------|
| T01 | [task-spa-ct-31-t01-policy-branch](task-spa-ct-31-t01-policy-branch/README.md) | Implement tip **A** auth fetch+blob→objectURL | Done |
| T02 | [task-spa-ct-31-t02-preview-lifecycle](task-spa-ct-31-t02-preview-lifecycle/README.md) | objectURL revoke / loading / error honesty | Done |
| T03 | [task-spa-ct-31-t03-host-wire](task-spa-ct-31-t03-host-wire/README.md) | Live host passes auth context for A | Done |
| T04 | [task-spa-ct-31-t04-vitest](task-spa-ct-31-t04-vitest/README.md) | Mock fetch/blob · Lab held | Done |
| T05 | [task-spa-ct-31-t05-docs-link](task-spa-ct-31-t05-docs-link/README.md) | ARCH §17 tip A · INDEX · link REQ-05 | Done |

**Order:** t01 → t02 → t03 → t04 → t05

## Out of scope (backlog verbatim)

Invent CDN · invent gateway proxy · NF-17 chrome · invent OP PASS · multipart redesign · invent HTTP-09 without policy B · `#/board` as Done claim

## DoD (backlog verbatim)

Posted/reloaded comment attachment with `published_url` paints on Live next/feed under locked policy **A**; CT-30 upload/map held; no invent OP PASS.

## @mockup handoff

- Continuity: Arch [§17](../../../../backlog-stories/component-thread/ARCHITECTURE.md) · CT-22 preview Present · CT-30 map Present · HTTP-07/08 Done
- Path A: [ui-mockup-spec](./ui-mockup-spec.md) · **NO** `STORY-UX-MOCKUP-BRIEF` · no UX gen
- Shots: [visual-checklists](./visual-checklists-live-attach-preview-consumable.md) · [screenshots/full-cycle](./screenshots/full-cycle/README.md)
