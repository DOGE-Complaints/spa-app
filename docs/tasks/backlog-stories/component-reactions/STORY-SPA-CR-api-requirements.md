# STORY-SPA-CR — API requirements (reuse map · Closed social)

> **Package:** [component-reactions](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> **Admin:** [ADMIN-CR-04-api-requirements.md](ADMIN-CR-04-api-requirements.md) · **Done** 2026-10-14T09:33:02Z  
> **Method:** analysis.mdc — verify code/docs only; **reuse** Closed plane; **no** second HTTP client (REQ-22 FR-22.15)  
> **Closed path SSOT (do not fork):** [STORY-SPA-NF-api-requirements.md](../next-feed/STORY-SPA-NF-api-requirements.md) **§2 THREADS**  
> **Parent:** [REQ-24](../../../requirements/24-reactions-mount-lab.md) L6 lab fixtures · L8 M155 OOS  

## Meta

| Role | Path |
|------|------|
| Client | [`ThreadsSocialClient.js`](../../../../src/repositories/ThreadsSocialClient.js) · `CLOSED_SOCIAL_PATHS` L26–38 |
| Knobs cache | [`threadsKnobsCache.js`](../../../../src/repositories/threadsKnobsCache.js) |
| Tree map | [`mapThreadTreeToBlock.js`](../../../../src/repositories/mapThreadTreeToBlock.js) |
| Catalog | [`reactionsV1Catalog.js`](../../../../src/components/threads/reactionsV1Catalog.js) |
| UI `onReact` seam | [`ReactionChrome.jsx`](../../../../src/features/feed/reactions/ReactionChrome.jsx) L29 / L100–130 · live wire [`LiveIssueThreadMount.jsx`](../../../../src/components/threads/LiveIssueThreadMount.jsx) L125–141 |
| Sibling honesty | [REQ-19](../../../requirements/19-req10-threads-reaction-reload-honesty.md) |

**Verified:** 2026-10-14T09:33:02Z — paths above Present; this doc is a **reuse map**, not a new endpoint inventory.

---

## UX inventory (ADMIN-CR-04 Вход)

| Artboard / spec | Role for API |
|-----------------|--------------|
| `…/artboards/mockup-m154-….md` + `.png` | Aggregate / selection / write UX — consumes knobs, marks, `selected`, react PUT |
| `…/artboards/mockup-m155-….md` + `.png` | People surfaces — **blocked** (`DUI-Q08` / `Q17`); no reactor list API |
| `…/artboards/mockup-m160-….md` + `.png` | Theme/l10n stress — **no** new API |

---

## Adapter split (locked)

```
ReactionsMount (greenfield UI — later)
  → FixtureAdapter (lab default, REQ-24 L6)
  → LiveThreadsReactionAdapter (thin, optional later, fail-closed)
       → ThreadsSocialClient + threadsKnobsCache + reactionsV1Catalog
```

- UI owns presentation + local pending/rollback UX.  
- HTTP only inside `ThreadsSocialClient` (or fixture that **simulates** the same `onReact` result shape).  
- **Forbidden:** new `*SocialClient`, invent `/threads/*` paths, people/Connect HTTP.

---

## §Reuse map (Closed)

Legend: ✅ reuse Present · ⚠️ lab/wiring note · ❌ OOS / forbidden

| Need | Method / path | Code | Lab (REQ-24 L6) | Status |
|------|---------------|------|-----------------|--------|
| Knobs | `GET /threads/knobs` | `getKnobs` L524–528 · cache L8/L26–29 (`max_reactions_per_actor`, `reactions_enable`) | Fixture max=3; fail-closed if live absent | ✅ |
| Tree + aggregates | `GET /threads/issues/{issue_id}` | `getThreadTree` L407–414 · map `summary_marks` / `aggregate_count` L49/L63 | Fixture marks/count/`selected[]` | ✅ |
| Reaction write | `PUT /threads/issues/{issue_id}/reactions` | `react` L454–478 · body `target_kind`, `comment_id`, `reaction_id`, `op` | FixtureAdapter local state OK for lab AC | ✅ |
| Catalog ids/layers | local `reactions.v1` | `reactionsV1Catalog.js` · `DUI-Q09` | Local ship | ✅ |
| `onReact` contract | — | Chrome: `{ reactionId, op, target, commentId }` → `{ status: 'ok'\|'fail', data?, failKind? }` L108–130 · Live L125–141 | Same shape for Fixture + Live | ✅ |
| People / Connect | — | — | — | ❌ M155 · NF-api §2.2 |
| New reaction client | — | — | — | ❌ FR-22.15 |
| `/threads/by-issue` | — | client guards | — | ❌ forbidden (NF-api §2) |
| Verify discriminator | — | Live uses `canWriteThreadsWithMe` → `failKind: 'verify'` L127–128 | Lab may **stub** writeCapability; no invent auto-`/verify` (DUI-Q07 / REQ-22 FR-22.8) | ⚠️ stub only |

**Endpoint list authority:** keep pointing at [NF-api §2](../next-feed/STORY-SPA-NF-api-requirements.md) — do not duplicate as competing SSOT.

---

## Per planned product story (names only — ADMIN-05 later)

| Key | Consumes | Lab default | Live later |
|-----|----------|-------------|------------|
| CR-01 mount strip | aggregate props, knobs enable/capacity, catalog | Fixture marks/count/empty/loading/error | tree_read + knobs |
| CR-02 picker | catalog layers, capacity, XOR, `onReact` | FixtureAdapter mutate + rollback | `client.react` |
| CR-03 `#/lab/reactions` | FixtureAdapter + two hosts | **Required** | optional fail-closed |
| CR-04 l10n/theme stress | no API | fixtures only | — |
| CR-icon | — | — | — |
| CR-api | this doc | — | — |

---

## MVP mode (this package)

1. **Lab fixtures first** — no mandatory live HTTP for AC (REQ-24 L6).  
2. When LiveAdapter is introduced: reuse only Closed ops above; fail-closed if knobs/client unavailable.  
3. **No people API**; aggregate activate = no-op or «M155 later» stub.  
4. Authenticated `selected[]` honesty when live → follow REQ-19; do not reinvent.  
5. Gaps for FE = **adapter wiring only** — not Proposal endpoints for knobs/tree/react (already Closed).

---

## Handoff

- Next admin: [ADMIN-CR-05-backlog-stories-l10n.md](ADMIN-CR-05-backlog-stories-l10n.md) — cite this reuse map + icon catalog.  
- Do not claim REQ-22 Phase 1 Done.
