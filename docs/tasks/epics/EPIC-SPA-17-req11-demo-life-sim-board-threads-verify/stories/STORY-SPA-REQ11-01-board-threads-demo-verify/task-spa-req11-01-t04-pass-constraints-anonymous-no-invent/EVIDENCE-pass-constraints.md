# Evidence — T04 Pass constraints (anonymous · no invent · optional smoke)

**When:** 2026-09-29T13:42:10Z  
**Task:** SPA-REQ11-01-T04  
**Result:** Done (constraints documented) · product AC runtime still **BLOCKED** on siblings

## Pass constraints (locks / AC)

| Constraint | AC | Notes |
|------------|-----|-------|
| No CI gate / screenshot pack required for Pass | AC-SPA-REQ1101-03 (S3) | Optional smoke notes only |
| Anonymous sufficient; no fixture-resident login | AC-SPA-REQ1101-04 (K1 / 2A) | Own login = orthogonal REQ10 |
| No new spa HTTP / product chrome for Pass | AC-SPA-REQ1101-05 | Gap → follow-up story only |
| Default Pass = no SPA `src/` change if shell shows board+threads | Scope 4 | This P3: **no product code** |

## Optional smoke notes (Evidence-only · not Pass)

After siblings Done: open `#/board` + one `#/issue/{id}` anonymous; note SPA_ORIGIN + timestamp. Do **not** attach CI/screenshot pack as Pass.

## Closed paths (no invent)

| Claim | Path |
|-------|------|
| Tree Closed | `ThreadsSocialClient.js` `CLOSED_SOCIAL_PATHS.tree_read` → `/threads/issues/{id}` |
| Board issues | `GatewayIssueRepository.js` → `/node/issues` |

## This P3

AC-03…05 constraints **documented**. Runtime Pass for AC-01/02 **BLOCKED** until wipe+replay.
