# Implementation plan — DASH-G1-T01

## Change

Replace hardcoded `/demo-tallinn/issues` with `/tallinn/issues` in `createGatewayIssueRepository`:

1. `getIssues` — line 51
2. `getIssue` — line 59

## Out of scope

No gateway changes; no new env for path prefix.

## Rollback

Revert two URL template strings in `GatewayIssueRepository.js`.
