# SPA-SEC-01-T05 — Rotation decision + SEC-04 sync

**Story:** [`../STORY-SPA-SEC-01-remove-service-role-from-frontend.md`](../STORY-SPA-SEC-01-remove-service-role-from-frontend.md)  
**Decision Ref:** [`../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-01-remove-service-role-from-frontend.md`](../../../../../../backlog-stories/security-hardening/STORY-SPA-SEC-01-remove-service-role-from-frontend.md); [SEC-04](../../../../../../../doge-identity-service/docs/tasks/backlog-stories/security-hardening/STORY-IDS-SEC-04-service-role-isolation.md)  
**Depends on:** T04 (bundle evidence)  
**ui_scope:** `none`  
**Skill declared:** `react-expert`

## Purpose
Зафиксировать decision record: был ли prod/staging bundle с `VITE_SUPABASE_SERVICE_ROLE`? Если да — ротация в Supabase Dashboard + sync identity `SUPABASE_SERVICE_ROLE` (SEC-04). **No identity code changes in this spa wave.**

## Risk
Leaked key remains valid until rotated.

## Code Facts (re-verify at execute)
- Local `.env` had service_role at story intake (split-doc §6.1).
- `.env` gitignored — exposure via local builds / manual deploy only unless operator confirms prod deploy.

## AC / DoD
- [ ] `rotation-decision-sec01.md` (or gate section) records: deploy history, rotate yes/no, SEC-04 sync status (story AC #4).
- [ ] If rotation required: operator confirms Supabase Dashboard + identity env updated (handoff to SEC-04 wave, no spa code).

## Where to change
- This task folder: `rotation-decision-sec01.md` (create at execute)

## Out of scope
- Identity SEC-04 implementation in `doge-identity-service` repo (separate wave).
- SPA-SEC-02 credential boundary ADR.

## Verification
- Decision artifact exists and links to SEC-04 backlog.
- Operator sign-off on rotation outcome.
