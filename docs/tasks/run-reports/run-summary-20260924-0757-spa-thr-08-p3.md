# Run summary — SPA-THR-08 P3

**Date:** 2026-09-24T07:57:18Z  
**Package:** pkg-000084  
**Story:** STORY-SPA-THR-08-comment-write-wire  
**Phase:** P3 Execute (clean · ui_scope none)  
**Result:** Product AC Done · T01–T07 Done · gate PASS

## Facts

- Closed `comment_create` / `comment_reply` → `POST /threads/issues/{issue_id}/comments` + Bearer (`getThreadsAccessToken`)
- Soft-fail §8: 401/403→verify · 200 DOMAIN_ERROR depth→max_depth · 422→post_fail
- Board/Issue pass Me `profile` into `LiveIssueThreadMount` → composer; success refreshes tree
- vitest **632 passed** | 2 skipped
- No invent paths · no `/threads/by-issue` · no THR-09 · no git push

## STOP

STOP before P4 (OP → Validator).
