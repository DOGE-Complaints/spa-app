# 17. Issue thread feed UX and reactions picker (shell)

Parent: docs/requirements backlog/REQ7-DOGEstonia-Threads-Entity-Social-Governance.md §0, §5.4–5.5, §8–§9, T-REQ7-03, T-REQ7-08, T-REQ7-09, D13, D20, D23–D26, D30–D32, AC-REQ7-08, AC-REQ7-10, AC-REQ7-12, AC-REQ7-13  
Parent-id: doge-threads-entity-social-governance  
Siblings: doge-threads/docs/requirements/01-entity-thread-core.md (contract: TBD-question — spa renders feed, reactions, attachments; parent does not name the client API); doge-complaints-gateway/docs/requirements/52-issue-thread-context-and-node-verification.md (contract: TBD-question — feed already reads Issues; thread block on the post; verification flow shown here; pack policy + shell knobs on gateway); doge-identity-service/docs/requirements/21-verification-boolean-and-audit.md (contract: before write, spa needs the user’s **verified boolean**; how the configured integration UI is opened is unnamed)  
Status: Draft — awaiting PA.2 (shell scope 2026-09-21; Part A locks applied)  
Related algorithms parent: docs/requirements backlog/REQ8-DOGEstonia-Threads-Metrics-Voice-Governance.md (cabinet / votes / hold-shadow — not this child’s AC)  
Architecture: [threads-feed-ux/00-overview.md](../architecture/threads-feed-ux/00-overview.md)  
Interview: [zeya888.req-target-tech-arch-interview-17-issue-thread-feed-ux-and-reactions-2026-09-22.md](../analysis/zeya888.req-target-tech-arch-interview-17-issue-thread-feed-ux-and-reactions-2026-09-22.md)  
Backlog package: [threads-feed/](../tasks/backlog-stories/threads-feed/INDEX.md)  

Дата: 2026-09-21  
Проект: spa-app  
Фокус: shell — Facebook-like feed + дерево + picker + вложения + escalation stub. Кабинетные метрики / голоса / hold-shadow → **REQ8**. **Без** новых endpoint

---

## 1) Goal

Показать на публичном дашборде ленту в лейауте Facebook: карточка Issue на месте поста, под ней дерево комментариев, picker `reactions.v1`, вложения и мягкая заглушка сотрудничества. Отличия от Facebook — палитра DOGEstonia, дизайн-система, логотип и живая графика. Не копировать товарные знаки Facebook. Отдельную страницу Issue не удалять. **Кабинет не менять** (метрики = REQ8).

## 2) Scope / Out of scope

### In scope (shell)

- Public dashboard feed (D30): Issue in the post slot; nested comments under that post up to node max depth (D13).
- Reaction picker in three labelled layers (D25). Rules of parent §8 for marks: multi-select ≤ node max (Topic-guarded default 3), public disagree, `agree`⊥`disagree`, moderation not on thread root. Ids from `reactions.v1`. Voice-weight display/math not required.
- Attachment affordance (D20). Transport Open. Honour platform legal media floor (parent §9): UI must not offer a node control that disables CSAM / catastrophic-media protection.
- Escalation stub as invitation, not org API (parent §5.5, D2 priority 3).
- Verification flow before write; pack type + integration name on gateway; boolean from identity.

### Out of scope (this child / shell)

- Cabinet raw metrics / Story block / choosing cabinet screen — **REQ8**; leave cabinet as-is.
- Participant vote chrome (D10) — **REQ8**.
- Hold/shadow honesty UX — **REQ8** (after drift pipeline).
- Rate-limit / near-dup warning UX — not shell (parent D32).
- Thread storage, sanction algorithms, pack file editing.
- Rewriting mockup-132 artboard file. Operator 2026-09-19/21: comments belong on the dashboard feed post slot; artboard §19 is not a product ban.
- Facebook trademarks/assets; Landing; inventing routes.

## 3) Verified current state

| Fact | Path |
|------|------|
| Comments listed out of scope of the public board **artboard** | `docs/UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.md:1486-1513` |
| No comment/thread strings in spa source | grep `spa-app/src/**/*.{js,jsx,ts,tsx}` for comment/thread: no matches (2026-09-19) |

Target host (tech-arch): `BoardIssuePost` wraps as-is `IssueCard` + `IssueThreadBlock` on `/board` and `/issue/:id` — see [threads-feed-ux](../architecture/threads-feed-ux/00-overview.md).

## 4) Target behavior

1. Public dashboard: Issues as posts; comment tree under each post (D30).
2. Picker offers only enabled `reactions.v1` ids, grouped by §8 layers.
3. Unverified user is sent through the node’s verification flow; method not shown in the check result.
4. Photos can be attached in the composer; bytes location Open. Composer/upload UI does not expose a “disable legal media floor” control.
5. Escalation stub is soft chrome.
6. No new cabinet metrics work in this Draft. No rate-limit / near-dup spam UX (D32).

## 5) Acceptance criteria

1. AC-SPA-THR-01: Draft does not mandate a new HTTP path.
2. AC-SPA-THR-02: Feed duties cover post slot, comment tree, `reactions.v1` picker rules, attachments, escalation stub (T-REQ7-03 shell, D30, §8, §5.5). Facebook assets not required. Separate Issue page not deleted. **Votes and hold/shadow honesty are not required.**
3. AC-SPA-THR-03: This Draft does **not** assign cabinet metrics duties (parent §0 / D31 → [REQ8](../../../docs/requirements%20backlog/REQ8-DOGEstonia-Threads-Metrics-Voice-Governance.md)).
4. AC-SPA-THR-04: mockup-132 §19 remains the artboard’s exclusion list; product placement is the dashboard feed (D30).
5. AC-SPA-THR-05: Verification UI follows pack type + integration name; write uses verified boolean; method not displayed in that result.
6. AC-SPA-THR-06: Attachment UX honours the platform legal media floor (parent §9 / AC-REQ7-13): a node cannot disable CSAM or equivalent catastrophic-media protection via spa controls.
7. AC-SPA-THR-07: This Draft does **not** require rate-limit or near-duplicate warning UX (parent D32).

## 6) Open questions

- Client operations for list/create comment and react (unnamed).
- Verification presentation — **closed in tech-arch interview:** existing `/verify` + returnTo (not inline).
- Vote-vs-reaction control — **REQ8** (not shell).

## 7) Dependencies

- Parent §0 / D31.
- threads 01 for stored thread state.
- gateway 52 for Issue identity and pack policy.
- identity 21 for the boolean.
- **REQ8** [`docs/requirements backlog/REQ8-DOGEstonia-Threads-Metrics-Voice-Governance.md`](../../../docs/requirements%20backlog/REQ8-DOGEstonia-Threads-Metrics-Voice-Governance.md) for cabinet metrics, votes, hold/shadow.
