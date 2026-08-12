# SPA-BUG-01-T03 — Fix on pinned layer only

**Status:** Done — P3 PASS 2026-08-07T10:51:56Z (ops via GW-DRAFT-07; SPA FE unchanged) · **P4 verified (HTTP)** · **P6 T06** Code Facts As-of-Done (F1)  
**Story:** [`../STORY-SPA-BUG-01-story-submission-unavailable.md`](../STORY-SPA-BUG-01-story-submission-unavailable.md)  
**Decision Ref:** [`../../../../../../backlog-stories/bugs/STORY-SPA-BUG-01-story-submission-unavailable.md`](../../../../../../backlog-stories/bugs/STORY-SPA-BUG-01-story-submission-unavailable.md) FR-BUG-01.3  
**Depends on:** SPA-BUG-01-T02  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-06T19:21:54Z  
**Package:** `pkg-000053`

## Purpose
Исправить **только** слой, pinned в T02 (SPA success/normalize/navigate **или** gateway/intake/ops **или** CORS/env). Новый verified draft публикуется; success-state; story ровно 1× на заявленной поверхности.

## Risk
Слепой FE-fix маскирует 503 intake; force FE-only when pin=gateway.

## Code Facts (As-of-Done — P6 T06)

- T02 pin (historical): [`pin-STORY-SPA-BUG-01-root-cause-2026-08-06.md`](../../../../../../analysis/pin-STORY-SPA-BUG-01-root-cause-2026-08-06.md) — **gateway schema**, missing `story_labels`.
- **Pre-fix (historical):** `/ready` had `checks.schema=false` → intake **503** `story_intake_rejected_db_not_ready` (evidence `…201810Z`).
- **Current (post–GW-DRAFT-07):** hosted `story_labels` applied + gateway redeploy; live `/ready` `db.ready=true`, `checks.schema=true` (re-verified 2026-08-07T11:15Z P6); submit evidence [`…104447Z`](../../../../../../analysis/evidence-STORY-SPA-BUG-01-submit-http-2026-08-07T104447Z.md) POST **202**.
- Hosted `stories.story_id` is **text** — table applied with text FK (bootstrap), not UUID-only migration file.
- Note: `get_api_dependencies` lru_cache still requires **redeploy** after DDL if schema ever drifts again.

## AC / DoD
- [x] (P0) Fix limited to T02 primary layer → FR-BUG-01.3 · backlog AC #3.
- [x] (P0) New draft publishes on first attempt (or ops fix + retest documented).
- [x] (P0) No secrets committed; Where-to-change list filled at execute from pin.

## Where to change
- Supabase Public Node (`lvfrdtglpksmaywqlohj`): create `public.story_labels` + RLS `service_role` (SQL from bootstrap / corrected GW-TAX-01)
- Railway: redeploy `doge-complaints-gateway` after migration
- Optional repo: note that hosted applied migration uses text FK (do not silently rewrite already-applied UUID file if ever applied elsewhere)
- **Not** SPA FE for primary pin

## Out of scope
Unrelated UX rewrite; GPT OpenAPI without pin; PH/HL polish; FE-only if pin≠SPA.

## Verification
```bash
curl -sS https://dogestonia-tallinn.up.railway.app/ready | python3 -m json.tool
# expect db.ready true, checks.schema true
# then live submit capture → POST 202 + story_id
```
