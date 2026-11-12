# STORY-SPA-REQ11-01 — Demo verify: board + threads on profile SPA URL

## Meta
- **Key:** `STORY-SPA-REQ11-01-board-threads-demo-verify`
- **Пакет:** [`req11-demo-life-sim-board-threads-verify/`](./INDEX.md)
- **Status:** **BLOCKED** · P3 `pkg-000089` (2026-09-29T13:42:10Z) · [pipeline](../../epics/EPIC-SPA-17-req11-demo-life-sim-board-threads-verify/stories/STORY-SPA-REQ11-01-board-threads-demo-verify/STORY-SPA-REQ11-01-board-threads-demo-verify.md) · gate BLOCKED · siblings wipe+replay incomplete
- **Тип:** verify-only / operator runbook (no product chrome)
- **Parent REQ:** [`20-req11-demo-life-sim-board-threads-verify.md`](../../../requirements/20-req11-demo-life-sim-board-threads-verify.md)
- **Parent product:** REQ11 §3.6, §5 spa, §6.3 X-11-01, §7.1 S1–S3, §8 Wave E
- **Siblings:**
  - gateway [`55-req11-demo-life-sim-fixtures-and-replay`](../../../../../doge-complaints-gateway/docs/requirements/55-req11-demo-life-sim-fixtures-and-replay.md)
  - threads [`04-req11-demo-life-sim-threads-reactions-seed`](../../../../../doge-threads/docs/requirements/04-req11-demo-life-sim-threads-reactions-seed.md)
  - Related shell: spa `17-issue-thread-feed-ux-and-reactions.md` (consumer; not reopen)
  - Orthogonal Done: REQ-19 H1+H5 (`19-req10-…`)
- **Skill declared (future P3):** `javascript-pro`  
  Path: `.cursor/skills/sources/jeffallan-claude-skills/skills/javascript-pro/SKILL.md`  
  Soft: `code-documenter` @ `.cursor/skills/sources/jeffallan-claude-skills/skills/code-documenter/SKILL.md`
- **Зависит от:** sibling gateway 55 + threads 04 replay complete on named profile
- **Blocked-on:** content empty until wipe+replay (parent D1)
- **Method:** [`.cursor/rules/analysis.mdc`](../../../../.cursor/rules/analysis.mdc)
- **Operator locks:**
  - **1A** — runbook paths `#/board` · `#/issue/:id` (SPA origin from profile)
  - **2A** — Pass = **anonymous**; own login not in DoD

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
| Canonical hash URLs | `#/board` · `#/issue/{id}` · `returnTo` defaults `#/board` (`LiveIssueThreadMount.jsx:31`, `IssueThreadBlock.jsx:27`) |
| Board lists issues via gateway | `GatewayIssueRepository.js:85–88` → `{VITE_GATEWAY_BASE_URL}/node/issues` |
| Board / issue mount live threads | `BoardPage.jsx:382+` · `IssuePage.jsx:203+` · `LiveIssueThreadMount` |
| Tree Closed path (no invent) | `ThreadsSocialClient.js:29` → `/threads/issues/{id}` |
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
