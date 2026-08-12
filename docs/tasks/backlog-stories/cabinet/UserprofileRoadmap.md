# User Profile Roadmap

**Updated:** 2026-07-25  
**Overall:** `[█████░░░░░░░░░░░░░░░] 5/12 (42%)`  
**Last validated:** 2026-07-25 (docs readiness: identity go; FE stubs for GW)  
**Active story:** CAB-01 (next implementation)

| Phase | Runner | Done | Total | Gate |
|-------|--------|------|-------|------|
| A Backlog+Docs | `[██████████] 4/4` | 4 | 4 | EPIC + 7 stories + cross-links |
| B Shell | `[░░░░░░░░░░] 0/1` | 0 | 1 | `/profile` assembled grid M99 |
| C Blocks | `[██░░░░░░░░] 1/5` | 1 | 5 | CAB-02 Done; remaining cards + stubs |
| D Integration | `[░░░░░░░░░░] 0/1` | 0 | 1 | M23 empty + M22 error composite |
| E Post-MVP | `deferred` | — | — | wallet live API · contribution API · story submit |

**SSOT:** этот файл — operational progress tracker для EPIC-SPA-07 User Cabinet. Обновлять **только** после прохождения Validation Gate story.  
**Эпик:** [EPIC-SPA-07-user-cabinet](../../epics/EPIC-SPA-07-user-cabinet/EPIC-SPA-07-user-cabinet.md) · **Пакет:** [cabinet/](.) · **API readiness:** [STORY-SPA-CAB-api-requirements.md](STORY-SPA-CAB-api-requirements.md)

**Маршрут:** `/profile` = User Cabinet (M21/M99). `/dashboard` не трогаем.

**Post-MVP / deferred (2026-07-25):** live wallet API; live contribution receipts/records (GW-CAB-03); story submit из кабинета (M110 / Submit CTAs). В MVP FE: wallet + contribution = **UI stub + Coming soon**; CAB-04 = UI без gateway HTTP (backend story-activity уже есть — wiring later).

---

## Протокол актуализации бегунка

1. Все AC story отмечены `[x]`.
2. Automated gate пройден (см. Validation Gate в файле story).
3. Story Status → `🟢 Done`; строка ниже → `🟢 validated`, дата в `Validated`.
4. Пересчитать runners: `filled = round(done/total * 10)` символов `█`, остальное `░`.
5. Sync [cabinet/INDEX.md](INDEX.md).

**Правило:** `🟡 in_progress` не двигает runner. Только `🟢 validated` увеличивает Done.

---

## Stories (порядок выполнения)

Порядок FE: **shell → identity blocks → UI stubs (04/05/06) → composite states**.

| # | Key | Phase | Wave | Status | Depends | Mockup/Ref | Validation | Validated |
|---|-----|-------|------|--------|---------|------------|------------|-----------|
| 1 | EPIC-SPA-07 + cabinet docs | A | — | 🟢 validated | — | epic + INDEX | epic file exists | 2026-07-08 |
| 2 | STORY files CAB-01..07 | A | — | 🟢 validated | #1 | M21–M26, M45, M50, M53, M99 | 7 story md files | 2026-07-08 |
| 3 | Refactor legacy CAB-01 → CAB-02 scope | A | — | 🟢 validated | #2 | [STORY-SPA-CAB-01-profile-from-me](STORY-SPA-CAB-01-profile-from-me.md) | old file superseded | 2026-07-08 |
| 4 | Cross-links M-4 + bullrun | A | — | 🟢 validated | #1 | [mvp-integration-plan](../../../../docs/analysis/mvp-integration-plan-2026-07-02.md) | links resolve | 2026-07-08 |
| 5 | [CAB-01](STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) Shell & Assembly | B | 1 | ⬜ backlog | #2 | M21, M99 | `/profile` grid + protected | — |
| 6 | [CAB-02](STORY-SPA-CAB-02-account-summary-block.md) Account Summary | C | 2 | 🟢 Done | CAB-01 slot | M24–M26 | `pkg-000029` gate PASS | 2026-07-12 |
| 7 | [CAB-03](STORY-SPA-CAB-03-civic-status-in-cabinet.md) Civic Status | C | 2 | ⬜ backlog | CAB-01, ID-03 | M28 reuse | CivicStatusCard + `/verify` | — |
| 8 | [CAB-04](STORY-SPA-CAB-04-story-activity-card.md) Story Activity | C | 3 | ⬜ backlog | CAB-01, CAB-03 | M45, M23 | UI stub, no GW HTTP | — |
| 9 | [CAB-05](STORY-SPA-CAB-05-wallet-status-card.md) Wallet Status | C | 3 | ⬜ backlog | CAB-01 | M50 | stub + Coming soon | — |
| 10 | [CAB-06](STORY-SPA-CAB-06-contribution-layer.md) Contribution Layer | C | 3 | ⬜ backlog | CAB-01 | M53 | UI stub + Coming soon | — |
| 11 | [CAB-07](STORY-SPA-CAB-07-cabinet-page-states.md) New User & Load Error | D | 4 | ⬜ backlog | CAB-02..06 | M23, M22 | composite + `/me` error | — |

**Critical path:** CAB-01 → CAB-03 → {CAB-04, CAB-05, CAB-06 stubs} → CAB-07. CAB-02 Done.

---

## Post-MVP registry (Phase E)

| Key | Mockup / API | Причина defer |
|-----|--------------|----------------|
| CAB-P01 | M110 | In-cabinet compose; GPT handoff = ID-12 |
| CAB-P02 | M45 Submit First Story | Создание истории не из кабинета |
| CAB-P03 | M53 A1 Submit Story | То же |
| Wallet live | M50 B/C + API | web3 / wallet service |
| Contribution live | GW-CAB-03 | нет TxReceipt data-source |

---

## Sprint map

| Sprint | Items | Exit |
|--------|-------|------|
| S0 | Roadmap, EPIC, INDEX, stories | backlog visible |
| S1 | CAB-01 | `/profile` shell M99 |
| S2 | CAB-03 (+ CAB-02 Done) | Civic on cabinet |
| S3 | CAB-04/05/06 | UI stubs + Coming soon |
| S4 | CAB-07 | M23 + M22 gate |
| S5+ | wiring CAB-04 GW · contribution · wallet | post readiness |

---

## Reuse (не дублировать)

| Asset | Story | Примечание |
|-------|-------|------------|
| `CivicStatusCard` | ID-03 Done | CAB-03 = placement + icons |
| Phone verify | ID-04 | CTA → `/verify` |
| Session overlay | ID-02 Done | protected `/profile` |
| AccountSummary | CAB-02 Done | slot already mounted |
| Draft resume route | ID-12 | follow-up when CAB-04 wires GW |
