# AUDIT — threads-feed package vs REQ-17

| Field | Value |
|-------|--------|
| **Date** | 2026-09-22 |
| **Scope** | Package docs readiness (ADMIN 6/6 + THR-01…06 Todo) vs [REQ-17](../../../requirements/17-issue-thread-feed-ux-and-reactions.md) |
| **Method** | analysis.mdc — Read/Grep/ls only; no invent; distinguish docs readiness ≠ FE Done |
| **Package** | [INDEX.md](INDEX.md) |
| **Verdict** | **ADMIN intake COMPLETE / docs P1.3-ready** · **FE NOT implemented** · AC coverage **PASS** · docs gaps G5/G6 **Remediated** · G1–G4/G7 **Accepted residual** |

---

## 1) Executive summary

Пакет `threads-feed` закрыл admin queue **6/6** (prompts → mockups → icons → API needs → L10N → tech sketch). Product stories **THR-01…06** в статусе **Todo** с FR / §Артборд / §Иконки / §L10N / ## Субтаски.

Соответствие **функциональному shell** REQ-17 (goal, scope/OOS, AC-SPA-THR-01…07) на уровне **документов и декомпозиции** — **да**. Реализация в `spa-app/src` — **нет** (baseline REQ §3 подтверждён: grep comment/thread/reaction в `src` → 0).

Готовность к **operator P1.3** (materialize epic / execute) — **да, docs-ready**, с блокерами исполнения social HTTP (sibling Open) и FE cutover `identity_verified`.

---

## 2) Artifact inventory (verified on disk)

| Artifact | Status | Path / note |
|----------|--------|-------------|
| PRODUCT-BRIEF | locked | [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) |
| INDEX ADMIN 6/6 | Done | [INDEX.md](INDEX.md) |
| ADMIN-THR-01…06 | Done | package root |
| UX-PROMPTS | Done | [UX-PROMPTS.md](UX-PROMPTS.md) |
| THR-01…06 stories | Todo | FR + L10N + Субтаски |
| Icon catalog + 6 PNG | ON DISK | [STORY-SPA-THR-icon-assets.md](STORY-SPA-THR-icon-assets.md) · `public/icons/threads-feed/ic-*.png` |
| Mockups M143–M148 | spec+PNG | `docs/UX/mockups/threads-feed/` |
| Tech-arch | on disk | `docs/architecture/threads-feed-ux/00`…`04` |
| Interview | on disk | `docs/analysis/zeya888.req-target-tech-arch-interview-17-…-2026-09-22.md` |
| `STORY-SPA-THR-api-requirements.md` | **absent** | deferred ADMIN-04 (social Open) — **correct** |
| `threadsFeedDictionary.js` | **absent** | deferred P1.3 — **correct** |
| Epic folders `EPIC-SPA-*-threads*` | **absent** | ADMIN-06 lock — **correct** |
| FE thread UI in `spa-app/src` | **absent** | REQ §3 still true |

---

## 3) REQ-17 Acceptance Criteria map

| AC | REQ meaning | Package coverage | Result |
|----|-------------|------------------|--------|
| **AC-SPA-THR-01** | Draft does not mandate a new HTTP path | ADMIN-04 needs table: social **Unknown/Open**; escalate **N/A**; bans in ADMIN-06 / every story; no invented `/threads/*` in package docs | **PASS** (docs) |
| **AC-SPA-THR-02** | Feed: post slot, tree, reactions.v1, attachments, escalation stub; keep Issue page; no FB assets; votes/hold not required | THR-01 mounts · THR-02 tree/attach · THR-03 picker · THR-04 stub · M143–M148 · OOS REQ8 explicit | **PASS** (docs) |
| **AC-SPA-THR-03** | No cabinet metrics duties (→ REQ8) | PRODUCT-BRIEF OOS REQ8; THR stories OOS cabinet; no cabinet stories in package | **PASS** (intent) · *minor:* AC id rarely cited by number outside BRIEF |
| **AC-SPA-THR-04** | M132 §19 artboard exclusion remains; product placement = dashboard feed (D30) | BRIEF + THR-01 FR «do not rewrite M132»; mockups README; primary `/board` | **PASS** |
| **AC-SPA-THR-05** | Verify: pack type + integration name; write uses verified boolean; method not in result | THR-05 FR + M147; wire `identity_verified`; `/verify` + returnTo (interview closed); method-opaque Verified | **PASS** (docs) · *Open:* pack JSON keys Unknown (gateway 52); *FE gap:* spa still gates on `phone_verified` |
| **AC-SPA-THR-06** | Attachment UX honours legal media floor; no disable-floor control | THR-02 FR-THR-02.6 + M144; ADMIN-06 D5 | **PASS** (docs) |
| **AC-SPA-THR-07** | No rate-limit / near-dup warning UX | BRIEF + THR-02 Out of scope cites AC-SPA-THR-07 | **PASS** |

### Target behavior §4 (REQ)

| # | Behavior | Story / artifact |
|---|----------|------------------|
| 1 | Issues as posts; comment tree | THR-01 + THR-02 · M143/M144 |
| 2 | Enabled `reactions.v1` · §8 layers | THR-03 · M145 · catalog labels in §L10N |
| 3 | Unverified → verification; method not in check result | THR-05 · M147 |
| 4 | Attach in composer; no disable-floor | THR-02 · AC-06 |
| 5 | Escalation soft chrome | THR-04 · M146 |
| 6 | No cabinet / no rate-limit UX | BRIEF + story OOS |

---

## 4) Scope / OOS fidelity

| In scope (REQ §2) | Covered? |
|-------------------|----------|
| Public dashboard feed post slot (D30) | THR-01 / M143 |
| Nested comments to max depth (D13) | THR-02 / M144 |
| Reaction picker 3 layers (D25); multi-select ≤ max; agree⊥disagree; moderation not on root | THR-03 FR |
| Attachment + legal floor (D20 / §9) | THR-02 |
| Escalation stub invitation (§5.5) | THR-04 |
| Verification before write; boolean from identity | THR-05 / THR-06 |

| Out of scope | Package respects? |
|--------------|-------------------|
| Cabinet / votes / hold-shadow (REQ8) | Yes — OOS everywhere checked |
| Rate-limit / near-dup (D32) | Yes — AC-07 |
| Thread storage / sanctions / pack editing | Yes — not in stories |
| Rewrite M132 | Yes — explicit ban |
| Facebook trademarks / Landing / invent routes | Yes |
| Voice-weight math | Yes — THR-03 OOS |

---

## 5) Open questions (REQ §6) vs package

| Open Q | Package disposition |
|--------|---------------------|
| Client ops list/create comment + react (unnamed) | ADMIN-04 **Unknown/Open**; THR-06 Unavailable until Closed; **no invent** |
| Verification presentation | **Closed** in arch/interview: `/verify` + returnTo — THR-05 |
| Vote-vs-reaction | **REQ8** — OOS |

---

## 6) Completeness by ADMIN layer

| Layer | Done? | Accuracy note |
|-------|-------|---------------|
| 01 UX prompts | Yes | UX-PROMPTS + BRIEF |
| 02 Mockup intake | Yes | M143–M148 spec+PNG; THR FR from specs |
| 03 Icons | Yes | 6 NEW ON DISK; reactions Not ic-*; stories §Иконки Runtime+Disk |
| 04 API needs | Yes partial Open | Correct deferral of full api-req STORY |
| 05 L10N | Yes | en/et/ru tables; reaction labels from Emotional catalog |
| 06 Tech decomp | Yes | ADR D1–D10; waves; ## Субтаски slugs; **no** epic folders |

---

## 7) Gaps / residual risks

> **Remediation pass:** 2026-09-22 (docs-only). See BRIEF/INDEX AC map · THR-05 V-D lock · ADMIN-04 consumer locks.

| ID | Severity | Finding | Status after remediation |
|----|----------|---------|--------------------------|
| G1 | Expected | Social HTTP unnamed | **Accepted residual** — documented in INDEX Open blockers + THR-02/03/06 + ADMIN-04; Unavailable until sibling Closed |
| G2 | FE gap | `identity_verified` not in spa src | **Docs remediated** — BRIEF/THR-05/06 explicit FE gap; **code cutover still P1.3** |
| G3 | Expected | No `threadsFeedDictionary.js` | **Accepted residual** — named ≠ present (INDEX + THR-01 T05) |
| G4 | Expected | No epic task folders | **Accepted residual** — ADMIN-06 slugs only |
| G5 | Minor docs | AC-SPA-THR-03 sparsely cited | **Remediated** — BRIEF/INDEX AC map; story OOS cite AC-03 |
| G6 | Open | Pack type + integration keys Unknown | **Remediated (docs lock)** — THR-05 FR-05.6 omit-or-civic-line; ADMIN-04 consumer lock |
| G7 | Process | REQ-17 Draft / PA.2 | **Accepted residual** — INDEX/BRIEF: package does not close PA.2 |

---

## 8) Code baseline re-check (2026-09-22)

| Fact | Evidence |
|------|----------|
| Issues list/detail | `GatewayIssueRepository.js` → `GET {base}/node/issues` (+ `/:id`) |
| Me fetch | `identityService.js` → `GET /me` |
| `identity_verified` in spa src | **0** matches |
| comment/thread/reaction in spa src | **0** matches |
| Routes `/board`, `/issue/:id`, `/verify` | `App.jsx` (as cited in arch/BRIEF) |

Consistent with REQ §3 and ADMIN-04 §SPA today.

---

## 9) Overall readiness scorecard

| Dimension | Score | Meaning |
|-----------|-------|---------|
| REQ AC → story mapping | **Pass** | All seven AC reflected in package locks/stories |
| Scope/OOS hygiene | **Pass** | No REQ8 / invent-HTTP creep found |
| Mockup SSOT | **Pass** | M143–M148 complete |
| Icons | **Pass** | Catalog + PNG |
| L10N tables | **Pass** | Docs-only; runtime deferred |
| API honesty | **Pass** | Open marked Open |
| Tech sketch / subtasks | **Pass** | ADMIN-06 + story tables |
| FE implementation | **Not started** | Expected |
| Safe to start P1.3 docs materialize | **Yes** (operator go-ahead) | Wave B ui_first can shell with fail-soft; social write blocked until Closed |
| Safe to claim REQ-17 Done / PA.2 closed | **No** | REQ Draft; FE absent; siblings Open |

---

## 10) Recommendation

1. Treat package as **admin-complete backlog** for REQ-17 shell (docs gaps G5/G6 closed; G1–G4/G7 accepted residual).
2. Do **not** invent social endpoints or pack JSON keys — progressive fail-soft + THR-05 V-D omit/civic-line.
3. At operator P1.3: materialize epic from ADMIN-06 slugs; bootstrap `threadsFeedDictionary.js`; cut over write gate to `identity_verified` (closes G2 in code).
4. REQ-17 PA.2 remains product authority — package must not claim REQ Done.

---

## Traceability

- REQ: [17-issue-thread-feed-ux-and-reactions.md](../../../requirements/17-issue-thread-feed-ux-and-reactions.md)
- Arch: [threads-feed-ux/00-overview.md](../../../architecture/threads-feed-ux/00-overview.md)
- Package: [INDEX.md](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · [ADMIN-THR-04](ADMIN-THR-04-api-requirements.md) · [ADMIN-THR-06](ADMIN-THR-06-tech-decomposition.md)
- Remediation: docs pass 2026-09-22 (this file §7)
