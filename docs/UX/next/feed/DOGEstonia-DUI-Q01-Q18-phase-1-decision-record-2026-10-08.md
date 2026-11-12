# DOGEstonia — Data-to-UI decisions DUI-Q01–Q18 (Phase 1)

**Status:** locked for Phase 1 tech-arch · product/UX process answer 2026-10-08  
**Recorded in repo:** 2026-10-08T14:39:11Z  
**Source:** UX process reply to [prompt-ux-process-feed-dui-decisions-lock-2026-10-08.md](../../analysis/prompt-ux-process-feed-dui-decisions-lock-2026-10-08.md)  
**Parent contract:** [DOGEstonia-data-to-ui-contract-v1.0.md](DOGEstonia-data-to-ui-contract-v1.0.md) §31–§32  
**Index:** [INDEX.md](INDEX.md)  
**Method:** decisions recorded as stated; **no** invented gateway/threads fields ([analysis.mdc](../../../../.cursor/rules/analysis.mdc))

**Standing rules:**
- M149–M160 written acceptance for handoff remains; mockup ≠ API evidence.
- Confirmed slice (§29 of Data-to-UI) unchanged and Phase-1 architectable now.
- Public-release gates below are **not** invent for FE: Gateway DRAFT exclusion; Gateway/Privacy pin safety; Threads/Identity verify discriminator.

---

## Cluster 1 — P0 core states

### DUI-Q01

| Field | Value |
|-------|-------|
| Decision ID | `DUI-Q01` |
| Selected behavior | Public board/detail: request with explicit `status=PUBLISHED` **and** Gateway guarantee that anonymous list/get never returns DRAFT. Client may discard unexpected DRAFT as defense-in-depth; **not** a substitute for Gateway. Public-release gate. |
| Owner | Product + Gateway |
| Date | 2026-10-08 |
| Contract change | Client query always PUBLISHED; Gateway anonymous exposure rule required before public release |
| Affected states | M149 feed/query; public Issue get |
| Migration | Fixtures must not rely on DRAFT in anonymous public paths |

### DUI-Q02

| Field | Value |
|-------|-------|
| Decision ID | `DUI-Q02` |
| Selected behavior | **Not in Phase 1.** No `schema_card` overlay. Civic Issue shown without schema region. |
| Owner | Product + Gateway/schema runtime |
| Date | 2026-10-08 |
| Contract change | Frontend-only: omit SSR-C overlay until API wave |
| Affected states | M150 D–G |
| Migration | Keep future-contract labels in fixtures; no production adapter |

### DUI-Q03

| Field | Value |
|-------|-------|
| Decision ID | `DUI-Q03` |
| Selected behavior | **Not in Phase 1.** Do not render Issue media from `image_txid`/`image_hash` alone. Collapse absent media naturally. |
| Owner | Gateway + media/security |
| Date | 2026-10-08 |
| Contract change | Frontend-only omit media until public URL/metadata contract |
| Affected states | M150 B; M158/M159/M160 illustrative media |
| Migration | Demo images stay DEMO_ONLY |

### DUI-Q04

| Field | Value |
|-------|-------|
| Decision ID | `DUI-Q04` |
| Selected behavior | Comments show real `body` + tree structure only — **no** invented author, avatar, or timestamp. |
| Owner | Threads + Identity + Privacy |
| Date | 2026-10-08 |
| Contract change | Frontend-only omit author/time rows until API fields exist |
| Affected states | M152–M153 |
| Migration | Fixtures: body+parent/depth only |

### DUI-Q05

| Field | Value |
|-------|-------|
| Decision ID | `DUI-Q05` |
| Selected behavior | **Not in Phase 1.** No attachment display on thread read. |
| Owner | Threads + media/security |
| Date | 2026-10-08 |
| Contract change | Frontend-only omit attachment previews |
| Affected states | M153 |
| Migration | No read-side attachment adapter |

### DUI-Q06

| Field | Value |
|-------|-------|
| Decision ID | `DUI-Q06` |
| Selected behavior | Text-only composer; **no** pre-submit Attach UX in Phase 1. |
| Owner | Product + Threads |
| Date | 2026-10-08 |
| Contract change | Frontend-only text create path |
| Affected states | M153, M159 |
| Migration | Composer fixtures without attach |

### DUI-Q07

| Field | Value |
|-------|-------|
| Decision ID | `DUI-Q07` |
| Selected behavior | Any generic Threads `403` = **unknown denial** — do **not** auto-navigate to `/verify`. Auto verify handoff only after a stable discriminator for `identity_verified=false` vs Identity outage vs other denials. Phase 1: preserve draft + return context; after return, submit requires a **separate user action**. |
| Owner | Threads + Identity + Product |
| Date | 2026-10-08 |
| Contract change | Frontend-only honest denial until discriminator exists; then wire handoff |
| Affected states | M157, M154 verify path |
| Migration | Draft persistence on; no blind `/verify` redirect |

### DUI-Q08

| Field | Value |
|-------|-------|
| Decision ID | `DUI-Q08` |
| Selected behavior | Ship **aggregates** only. Do **not** build reactor people lists from counts. |
| Owner | Product + Threads + Identity/Privacy |
| Date | 2026-10-08 |
| Contract change | Frontend-only aggregate strip; people APIs OOS Phase 1 |
| Affected states | M154–M155 |
| Migration | No people fixtures as production |

### DUI-Q09

| Field | Value |
|-------|-------|
| Decision ID | `DUI-Q09` |
| Selected behavior | Locally shipped approved `reactions.v1` catalog (pinned client catalog). |
| Owner | Product + Threads + Localization |
| Date | 2026-10-08 |
| Contract change | Frontend catalog SSOT for Phase 1 (existing spa catalog path); API catalog later optional |
| Affected states | M154 |
| Migration | Align picker with local catalog; PNG icons not regression goldens |

### DUI-Q10

| Field | Value |
|-------|-------|
| Decision ID | `DUI-Q10` |
| Selected behavior | Do **not** claim time-sort or comment pagination. Render tree as returned. |
| Owner | Product + Threads |
| Date | 2026-10-08 |
| Contract change | Frontend-only no sort/pagination UI claims |
| Affected states | M152–M153 |
| Migration | Fixtures unordered-as-API |

---

## Cluster 2 — P1 dashboard / scale

### DUI-Q11

| Field | Value |
|-------|-------|
| Decision ID | `DUI-Q11` |
| Selected behavior | Lazy-load thread trees with **bounded concurrency** for visible/expanded Issues. Until tree responds, do not present preview/counts as confirmed. |
| Owner | Architecture + Threads + Gateway |
| Date | 2026-10-08 |
| Contract change | Frontend architecture: per-Issue lazy fetch + concurrency limit; anonymous/actor cache separation |
| Affected states | M149 social strip |
| Migration | No fake aggregate on list without tree |

### DUI-Q12

| Field | Value |
|-------|-------|
| Decision ID | `DUI-Q12` |
| Selected behavior | Remove **active** text search from production toolbar until server semantics exist. Keep confirmed structural filters. |
| Owner | Product + Gateway |
| Date | 2026-10-08 |
| Contract change | Frontend-only hide/disable live search |
| Affected states | M149 C2 / search control |
| Migration | Future-contract search UI may remain labelled non-live |

#### Amendment 2026-10-11 (AD-VP-06) — next-feed FE enable path

| Field | Value |
|-------|-------|
| Trigger | Gateway [REQ-56](../../../../doge-complaints-gateway/docs/requirements/56-issues-server-text-search.md) **Ready** — param **`search`** on `GET /node/issues` |
| Operator | Lock 2026-10-11 — include FE enable in next-feed visual-parity wave (**NF-12**) |
| Behavior now | **May** enable active text search on `#/next/feed*` toolbar; wire HTTP `search`; empty/no-results honesty; compose with structural filters |
| Still forbidden | Invent alternate search endpoint/param; treat demo-only search as Done without live BE |
| Arch | [`02 §2a`](../../architecture/feed-visual-redesign-phase-1/02-features-feed-composition.md) · tracker [`ARCH-DELTA-visual-parity-wave-2026-10-11.md`](../../tasks/backlog-stories/next-feed/ARCH-DELTA-visual-parity-wave-2026-10-11.md) |
| Historical row | 2026-10-08 hide-until-server remains the original decision; this amendment records condition met + enable authorization |

### DUI-Q13

| Field | Value |
|-------|-------|
| Decision ID | `DUI-Q13` |
| Selected behavior | Treat `issues[]` length as **received set size**, never global total. |
| Owner | Product + Gateway |
| Date | 2026-10-08 |
| Contract change | Frontend copy: received-count only |
| Affected states | M149 / M151 “N of M” |
| Migration | i18n strings without fake totals |

### DUI-Q14

| Field | Value |
|-------|-------|
| Decision ID | `DUI-Q14` |
| Selected behavior | Map pins only from finite public coordinate pairs. Do not invent `geo.label`, streets, or precision UI. **Public-release gate:** Gateway + Privacy must affirm public projection coordinates are safe for pins before release. |
| Owner | Product + Gateway + Privacy |
| Date | 2026-10-08 |
| Contract change | Frontend eligible-pin rule; release gate external |
| Affected states | M151 |
| Migration | Schematic street labels stay demo |

### DUI-Q15

| Field | Value |
|-------|-------|
| Decision ID | `DUI-Q15` |
| Selected behavior | Left rail: only available own-Story **metrics/status/date**; Profile / My stories = navigation only (not cabinet redesign). |
| Owner | Product + Gateway |
| Date | 2026-10-08 |
| Contract change | Frontend-only metrics strip; no invented titles/issue links |
| Affected states | M149 ProfileRail |
| Migration | No fake story cards |

### DUI-Q16

| Field | Value |
|-------|-------|
| Decision ID | `DUI-Q16` |
| Selected behavior | **No** production right-rail module without a data owner. Do not fill from invented content. |
| Owner | Product |
| Date | 2026-10-08 |
| Contract change | Frontend omit / empty / hide production rail content |
| Affected states | M149 right rail |
| Migration | Fixture copy remains non-production |

---

## Cluster 3 — people / Connect / escalation

### DUI-Q17

| Field | Value |
|-------|-------|
| Decision ID | `DUI-Q17` |
| Selected behavior | People rows and Connect **blocked together** until reactor data + privacy + relationship API exist. Aggregates still ship (Q08). M155 remains target visual contract, not Phase 1 production. |
| Owner | Product + Identity/relationships |
| Date | 2026-10-08 |
| Contract change | Frontend block people/Connect entry points as production |
| Affected states | M155, M159 E2/E3 |
| Migration | No Connect mutation |

### DUI-Q18

| Field | Value |
|-------|-------|
| Decision ID | `DUI-Q18` |
| Selected behavior | M156 ships as **local working stub** inside Discussion: click explains org connect unavailable; invitation **not sent and not persisted**. Real recipients/application/outcome wait separate contract. |
| Owner | Product |
| Date | 2026-10-08 |
| Contract change | Frontend-only informational stub (Interaction & Behavior M156 rules) |
| Affected states | M156 |
| Migration | No invite API client |

---

## Compact registry

| ID | Phase 1 selected behavior |
|----|---------------------------|
| DUI-Q01 | PUBLISHED in request + Gateway anti-DRAFT guarantee |
| DUI-Q02 | No schema overlay |
| DUI-Q03 | No media render from txid/hash |
| DUI-Q04 | Comment body/tree only — no author/avatar/time |
| DUI-Q05 | No attachment read display |
| DUI-Q06 | Text composer only |
| DUI-Q07 | Generic 403 ≠ verify; auto-handoff waits discriminator |
| DUI-Q08 | Aggregates yes; reactor lists no |
| DUI-Q09 | Local pinned `reactions.v1` catalog |
| DUI-Q10 | No claimed comment sort/pagination |
| DUI-Q11 | Lazy bounded tree fetches for visible/expanded |
| DUI-Q12 | No active text search until server Ready; **amendment 2026-10-11:** next-feed may enable (NF-12) |
| DUI-Q13 | Received-array count only |
| DUI-Q14 | Eligible public pins only; Gateway/Privacy gate |
| DUI-Q15 | Own-story metrics + nav only |
| DUI-Q16 | No production right-rail module |
| DUI-Q17 | People + Connect blocked together |
| DUI-Q18 | Local invitation stub — no send/persist |

---

## Artboard Phase 1 claim matrix

| Artboard | Production-claimable now | Demo-only / stub / gated |
|----------|--------------------------|---------------------------|
| M149 | Shell, feed, filters, load/error | Active search; invented right-rail |
| M150 | Civic Issue without media; natural collapse | Schema overlay; images |
| M151 | List/map, eligible pins, partial map, errors | Illustrative streets/labels; pin **release** waits Q14 gate |
| M152 | Empty/populated text Discussion, load/error | Author, time, attachments, sort |
| M153 | Tree, text reply, draft, send errors | Attach, media, tombstones, author rows |
| M154 | Aggregates, picker, selected, limits, errors | Exact PNG icons as goldens; people; verify redirect until Q07 |
| M155 | Entry only via confirmed aggregate | All people lists, distribution tabs, Connect |
| M156 | Local informational stub | Real invite send |
| M157 | Draft preserve + honest generic denial | Auto verify until Q07 |
| M158 | One Issue/thread across modal/sheet/route | Illustrative media; unconfirmed social fields |
| M159 | Responsive mounts, text composer, eligible map | People sheets, Attach, unconfirmed labels |
| M160 | Theme/focus/reflow targets | Test translations/media; PNG ≠ regression golden |

---

## Ready for tech-arch

- [x] Confirmed slice unchanged (civic list/card/detail, filters, eligible map, knobs, text tree/replies, aggregates, `selected[]`, fail-soft civic vs social).
- [x] Phase 1 may design now: Issue/thread adapters, lazy load, anon/actor caches, local reaction catalog, text composer, draft preserve, responsive mounts, local stub.
- [ ] Public-release gates: Gateway DRAFT exclusion; Gateway/Privacy pin safety; verify auto-handoff waits Threads/Identity discriminator (else honest denial + draft).
- [ ] Outside active production adapters until API wave: schema, media, comment authors/times, user attachments, people/Connect, server search, sort/pagination, right rail, real org invite.
