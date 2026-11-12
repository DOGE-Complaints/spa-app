# STORY-SPA-REQ11-01 — Demo verify: board + threads on profile SPA URL

## Meta (pipeline)

- **Key:** `STORY-SPA-REQ11-01-board-threads-demo-verify`
- **Parent Epic:** [`../../EPIC-SPA-17-req11-demo-life-sim-board-threads-verify.md`](../../EPIC-SPA-17-req11-demo-life-sim-board-threads-verify.md)
- **Package:** `pkg-000089`
- **Status:** **BLOCKED** · P3 `2026-09-29T13:42:10Z` · T01–T04 Done (docs) · gate **BLOCKED** · siblings wipe+replay incomplete
- **Тип:** verify-only / operator runbook (no product chrome)
- **ui_scope:** `none`
- **source:** [`../../../../backlog-stories/req11-demo-life-sim-board-threads-verify/STORY-SPA-REQ11-01-board-threads-demo-verify.md`](../../../../backlog-stories/req11-demo-life-sim-board-threads-verify/STORY-SPA-REQ11-01-board-threads-demo-verify.md)
- **decision_ref:** backlog STORY-SPA-REQ11-01 + [`20-req11-demo-life-sim-board-threads-verify.md`](../../../../../requirements/20-req11-demo-life-sim-board-threads-verify.md) + REQ11 §3.6, §5 spa, §6.3 X-11-01, §7.1 S1–S3, §8 Wave E
- **Parent REQ:** [`20-req11-demo-life-sim-board-threads-verify.md`](../../../../../requirements/20-req11-demo-life-sim-board-threads-verify.md)
- **Siblings:** gateway 55 · threads 04 · spa 17 shell (consumer) · REQ-19 Done orthogonal
- **Skill declared:** `javascript-pro`  
  Path: `.cursor/skills/sources/jeffallan-claude-skills/skills/javascript-pro/SKILL.md`  
  Soft: `code-documenter`
- **Blocked-on:** gateway 55 + threads 04 wipe+replay on named profile (parent D1) — Evidence Pass blocked until siblings Done
- **Operator locks:** **1A** `#/board` · `#/issue/:id` · **2A** Pass = anonymous
- **Scaffolded:** `2026-09-29T13:22:04Z`
- **Gate:** [acceptance-verification-spa-req11-01.md](task-spa-req11-01-t05-story-gate/acceptance-verification-spa-req11-01.md) · **BLOCKED** `2026-09-29T13:42:10Z`

---

## Зачем простыми словами

После seed на профиле оператор открывает существующий SPA URL и видит «живую» доску и треды с реакциями — без нового UI и без логина демо-жителей.

---

## Scope

1. Runbook notes: canonical routes `#/board` and `#/issue/:id` (lock 1A); document which **profile SPA origin** to open (`local` vs Uus Veerenni — from sibling profile ops).
2. X-11-01 checklist after wipe+replay: non-empty board; sample issues → comments + reaction summaries visible.
3. Optional lightweight smoke notes (Evidence) — **not** CI / screenshot pack as Pass.
4. Default Pass: **no SPA code change** if existing shell shows board+threads; gap → follow-up story only (no invent APIs).
5. Verify as **anonymous** (lock 2A / K1).

## Out of scope

- New FE features / product chrome / ADMIN / mockups
- Invent gateway or threads endpoints
- CI gate / screenshot pack as Pass (S3)
- Identity login as fixture residents (K1)
- Requiring operator login for Pass (own login = orthogonal REQ10 only)
- REQ8 clustering; REQ10 selected honesty rework
- Implementing gateway fixtures / threads seed (siblings)

---

## Verified current state

| Fact | Path |
|------|------|
| HashRouter | `src/main.jsx:17–19` |
| Board route `/board`; home → board | `src/App.jsx:24–25` |
| Issue route `/issue/:id` | `src/App.jsx:27` |
| Canonical hash URLs | `#/board` · `#/issue/{id}` · `returnTo` defaults `#/board` (`LiveIssueThreadMount.jsx`, `IssueThreadBlock.jsx`) |
| Board lists issues via gateway | `GatewayIssueRepository.js` → `{VITE_GATEWAY_BASE_URL}/node/issues` |
| Board / issue mount live threads | `BoardPage.jsx` · `IssuePage.jsx` · `LiveIssueThreadMount` |
| Tree Closed path (no invent) | `ThreadsSocialClient.js` → `/threads/issues/{id}` |
| Demo content until sibling replay | Empty after wipe (parent D1) — runtime Unknown until replay |
| Profile SPA **origin** (host) | Unknown here — sibling GW profile table |

---

## Target / AC

- [ ] **AC-SPA-REQ1101-01 (S1 / X-11-01):** after wipe+replay on named profile, `{SPA_ORIGIN}/#/board` shows lived-in issue cards (not empty)
- [ ] **AC-SPA-REQ1101-02 (S2):** sample `{SPA_ORIGIN}/#/issue/{id}` (and/or board-mounted thread) shows comments + reaction summaries
- [ ] **AC-SPA-REQ1101-03 (S3):** Pass does **not** require CI gate / screenshot pack
- [ ] **AC-SPA-REQ1101-04 (K1 / lock 2A):** Pass does **not** require logging in (anonymous sufficient; no fixture-resident login)
- [ ] **AC-SPA-REQ1101-05:** no new spa HTTP / product chrome for Pass; gap → follow-up only

---

## Точки в коде (read-only for verify)

- `src/App.jsx` · `src/main.jsx`
- `src/pages/BoardPage.jsx` · `src/pages/IssuePage.jsx`
- `src/components/threads/LiveIssueThreadMount.jsx`
- `src/repositories/GatewayIssueRepository.js`
- `src/repositories/ThreadsSocialClient.js`

## Dependencies

- Parent §3.6 / §6.3 / §7 S1–S3; gateway 55 + threads 04 must land before Pass; shell 17 context only.

## Субтаски

| Task | Folder | Status |
|------|--------|--------|
| T01 | [task-spa-req11-01-t01-runbook-routes-and-profile-origin](task-spa-req11-01-t01-runbook-routes-and-profile-origin/README.md) | Done · docs |
| T02 | [task-spa-req11-01-t02-board-x1101-nonempty-checklist](task-spa-req11-01-t02-board-x1101-nonempty-checklist/README.md) | Done · checklist · Evidence BLOCKED |
| T03 | [task-spa-req11-01-t03-issue-thread-reactions-checklist](task-spa-req11-01-t03-issue-thread-reactions-checklist/README.md) | Done · checklist · Evidence BLOCKED |
| T04 | [task-spa-req11-01-t04-pass-constraints-anonymous-no-invent](task-spa-req11-01-t04-pass-constraints-anonymous-no-invent/README.md) | Done · constraints |
| T05 | [task-spa-req11-01-t05-story-gate](task-spa-req11-01-t05-story-gate/README.md) | Done · gate **BLOCKED** |
| T06 | [task-spa-req11-01-t06-audit-f2-refresh-sibling-blocker-ssot](task-spa-req11-01-t06-audit-f2-refresh-sibling-blocker-ssot/README.md) | Done · P6 · F2 CLOSED · `spa_req11_01_audit_2026_09_29` |
| T07 | [task-spa-req11-01-t07-audit-f5-refresh-threads02-sibling-ssot](task-spa-req11-01-t07-audit-f5-refresh-threads02-sibling-ssot/README.md) | Done · P6 · F5 CLOSED · `spa_req11_01_audit_2026_09_29` |
