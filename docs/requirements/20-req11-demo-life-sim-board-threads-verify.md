# 20. REQ11 — demo life sim: board + threads verify (no product chrome)

Parent: docs/requirements backlog/REQ11-DOGEstonia-Uus-Veerenni-Demo-Life-Simulation.md §3.6, §5 spa, §6.3 X-11-01, §7.1 S1–S3, §8 Wave E  
Parent-id: dogestonia-uus-veerenni-demo-life-simulation  
Siblings:  
- doge-complaints-gateway/docs/requirements/55-req11-demo-life-sim-fixtures-and-replay.md (contract: board filled via existing issues read — e.g. `/node/issues` per gateway status analysis; profile SPA URL)  
- doge-threads/docs/requirements/04-req11-demo-life-sim-threads-reactions-seed.md (contract: existing tree + reaction summaries on issue page — no new spa HTTP)  
Status: Draft · backlog materialized (REQ11-01 Todo · Blocked) — awaiting PA.2 / P1.3 go-ahead  
Justification: parent brief R4-7; spa REQ7 shell `17-issue-thread-feed-ux-and-reactions.md` (consumer only)  
Дата: 2026-09-29 · materialized: 2026-09-29T11:39:39Z · backlog: 2026-09-29T12:03:26Z  
Backlog: [req11-demo-life-sim-board-threads-verify/INDEX.md](../tasks/backlog-stories/req11-demo-life-sim-board-threads-verify/INDEX.md) · [REQ11-01](../tasks/backlog-stories/req11-demo-life-sim-board-threads-verify/STORY-SPA-REQ11-01-board-threads-demo-verify.md)  
Operator locks: **1A** `#/board` · `#/issue/:id` · **2A** anonymous Pass (own login orthogonal REQ10)  
Related: docs/requirements/17-issue-thread-feed-ux-and-reactions.md (REQ7 shell — not reopened)  

---

## 1) Goal

Подтвердить Pass REQ11 на **URL профиля**: живая доска с карточками и на representative issues — треды с комментами/реакциями. **Без** новой product chrome и без логина демо-жителей.

## 2) Scope / Out of scope

**In:** X-11-01 verify checklist against existing board + issue thread UI; document which profile SPA URL to open; optional lightweight smoke notes.  

**Out:** New FE features; inventing gateway/threads endpoints; CI gate / screenshot pack as Pass (S3); Identity login for fixtures (K1); REQ8.

## 3) Verified current state

| Fact | Evidence |
|------|----------|
| Board consumes gateway issues; threads feed shell exists | Related spa `12-…` / `17-…`; parent success = existing shell |
| REQ10 spa selected honesty | `19-req10-threads-reaction-reload-honesty.md` Done (H1+H5 spa) — orthogonal |
| Demo life content on board today | Empty after wipe until gateway+threads replay (parent D1) |
| Exact hash route string for “board” | **Locked 1A:** `#/board` · `#/issue/:id` (`main.jsx` HashRouter · `App.jsx` routes); SPA **origin** from profile |

## 4) Target behavior

1. After sibling replay on a named profile, operator opens SPA URL → non-empty board.  
2. Open sample issues → comments + reactions visible.  
3. No CI/screenshot requirement for Pass.  
4. No SPA code change required if existing shell already shows board+threads (verify-only Pass). If gap found, file follow-up — do not invent APIs here.

## 5) Acceptance criteria

- [ ] S1: profile SPA URL shows lived-in issue cards after wipe+replay  
- [ ] S2: sample issues show threads with comments and reactions  
- [ ] S3: Pass does not require CI gate / screenshot pack  
- [ ] K1: demo does not require logging in as fixture residents  

## 6) Open questions

1. ~~Canonical SPA path/hash~~ — **Locked 1A:** `#/board` · `#/issue/:id`; origin = profile (`local` / Uus Veerenni).
2. ~~Anonymous vs logged-in~~ — **Locked 2A:** Pass = anonymous; own login not required (REQ10 selected optional/orthogonal).

## 7) Dependencies

Parent §3.6, §6.3, §7 S1–S3; siblings gateway `55-…` + threads `04-…` must complete before verify Pass; shell `17-…` context only.
