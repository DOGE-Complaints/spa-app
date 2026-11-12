# Evidence — T01 runbook routes + profile SPA origin

**When:** 2026-09-29T13:42:10Z  
**Task:** SPA-REQ11-01-T01  
**Result:** Done (runbook docs) · live demo content **BLOCKED** on sibling wipe+replay

## Canonical routes (lock 1A) — verified on disk

| URL | Code fact |
|-----|-----------|
| `{SPA_ORIGIN}/#/board` | `HashRouter` `spa-app/src/main.jsx:17–19` · route `/board` `App.jsx:25` · home `/` → `/board` `App.jsx:24` |
| `{SPA_ORIGIN}/#/issue/{id}` | route `/issue/:id` `App.jsx:27` |
| Default `returnTo` | `#/board` — `LiveIssueThreadMount.jsx:31` · `IssueThreadBlock.jsx:27` |

## Profile SPA origin

| Profile | Origin (operator open) | Status |
|---------|------------------------|--------|
| `local` | Candidate: spa **5173** → `http://localhost:5173` (sibling `STORY-GW-REQ11-02` Meta · `local-five-serve-and-health.sh`) | GW-REQ11-02 **Todo** — confirm after Done |
| Uus Veerenni deploy | **Unknown** on spa disk — awaits sibling profile table | GW-REQ11-02 **Todo** |

Do **not** invent deploy host. After wipe+replay, open `{SPA_ORIGIN}/#/board` anonymous (lock 2A).

## Sibling block (live Grep 2026-09-29T13:42:10Z)

| Sibling | Status |
|---------|--------|
| STORY-GW-REQ11-01…04 | **Todo** |
| STORY-THREADS-REQ11-01 | **Done** |
| STORY-THREADS-REQ11-02…04 | **Todo** |

Wipe+replay not complete → board/issue Evidence deferred (T02/T03).
