# Evidence — T03 issue thread + reactions checklist

**When:** 2026-09-29T13:42:10Z  
**Task:** SPA-REQ11-01-T03  
**Result:** Checklist ready · runtime Evidence **BLOCKED**

## Checklist (post wipe+replay — operator)

1. From non-empty board, open sample `{SPA_ORIGIN}/#/issue/{id}` **and/or** expand board-mounted thread.
2. Expect comments visible + reaction summaries (counts strip) — AC-SPA-REQ1101-02.
3. Anonymous session only (lock 2A).
4. Record: issue id · comments present Y/N · reaction summaries Y/N · timestamp.

## Code Facts (shell ready — no invent)

| Claim | Path |
|-------|------|
| Issue route + mount | `IssuePage.jsx` · `LiveIssueThreadMount` ~L203 |
| Board-mounted thread | `BoardPage.jsx` · `LiveIssueThreadMount` ~L382 |
| Tree Closed | `ThreadsSocialClient.js` `CLOSED_SOCIAL_PATHS.tree_read` → `/threads/issues/{id}` |

## Live Evidence this P3

| Check | Result |
|-------|--------|
| Sibling seed/replay Done | **No** (threads REQ11-02…04 Todo; GW55 Todo) |
| Sample issue comments/reactions observed | **Not run** |
| AC-SPA-REQ1101-02 | **BLOCKED** |

No invent HTTP / no product chrome.
