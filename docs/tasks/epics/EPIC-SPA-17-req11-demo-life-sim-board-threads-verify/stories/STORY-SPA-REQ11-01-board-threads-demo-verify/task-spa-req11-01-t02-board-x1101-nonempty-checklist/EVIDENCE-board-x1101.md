# Evidence — T02 X-11-01 board non-empty checklist

**When:** 2026-09-29T13:42:10Z  
**Task:** SPA-REQ11-01-T02  
**Result:** Checklist ready · runtime Evidence **BLOCKED**

## Checklist (post wipe+replay — operator)

1. Confirm named profile (`local` or Uus Veerenni) wipe+replay Done (GW55 + threads04).
2. Open `{SPA_ORIGIN}/#/board` **anonymous** (no login).
3. Expect lived-in issue cards — **not** empty board (AC-SPA-REQ1101-01 / X-11-01).
4. Record: profile name · SPA_ORIGIN · approx card count · timestamp.

## Code Facts (shell ready — no invent)

| Claim | Path |
|-------|------|
| Board page | `spa-app/src/pages/BoardPage.jsx` (+ `LiveIssueThreadMount` ~L382) |
| Issues fetch | `GatewayIssueRepository.js:88` → `{VITE_GATEWAY_BASE_URL}/node/issues` |

## Live Evidence this P3

| Check | Result |
|-------|--------|
| Sibling wipe+replay Done | **No** — GW-REQ11-01…04 Todo · THREADS-REQ11-02…04 Todo (01 Done only) |
| Board non-empty observed | **Not run** — would invent Pass |
| AC-SPA-REQ1101-01 | **BLOCKED** |

No SPA product code change (default Pass path).
