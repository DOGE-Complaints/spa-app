# SPA-HL-08-T03 — Cross-link UAT + bullrun

**Story:** [`../STORY-SPA-HL-08-dual-gpt-operator-clarity.md`](../STORY-SPA-HL-08-dual-gpt-operator-clarity.md)  
**Backlog:** [`../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-08-dual-gpt-operator-clarity.md`](../../../../../backlog-stories/hardening-cto-audit-2026-08/STORY-SPA-HL-08-dual-gpt-operator-clarity.md)  
**Depends on:** T02  
**ui_scope:** `none`  
**Skill declared:** `code-documenter`  
**Status:** Todo

## Purpose
UAT brief / package README / bullrun pointer на SSOT.

## Risk
SSOT orphan.

## Code Facts (re-verify at execute)
- T02 SSOT
- UAT-MVP-BRIEF.md
- bullrun-launch-index.md

## AC / DoD
- [ ] Links present
- [ ] Operator can find without src/

## Where to change
- `docs/uat/UAT-MVP-BRIEF.md`
- `docs/tasks/bullrun-launch-index.md`
- `backlog README`

## Out of scope
- Code

## Verification
```bash
rg -n "dual GPT|oauth_request_id|draft_id" docs/uat docs/spa-url-page-map.md
```
