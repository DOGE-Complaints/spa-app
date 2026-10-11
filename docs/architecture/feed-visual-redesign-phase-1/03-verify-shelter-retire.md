# 03 — Verify surfaces, shelter-list, risks, retire

Parent: [`00-overview.md`](00-overview.md) · REQ [`22`](../../requirements/22-feed-visual-redesign-phase-1.md) · locks Q6, Q7, Q8 · operator risks notes

**Focus rule:** Tests **will** break when shell/theme/feed land — that is expected. **Mandatory:** repair and **extend** coverage for the new shell + theme + `#/next/feed*`. Documented here so it cannot drop out of focus.

---

## 1) Verify surfaces (lock Q6-B)

| Surface | Role | When |
|---------|------|------|
| **Vitest** (unit/component) | Shell slots, `features/feed` states, theme/`data-theme`, fail-soft, write-gate, reactions stub behaviors | From first next/feed code |
| **Browser smoke** (puppeteer or team analogue) | Next **shell** + critical feed states (load/empty/error; Issue open; narrow width sample) | Required — not “Vitest-only Done” |
| **Route smoke** | `#/next/feed`, `#/next/feed/issue/:id`; after Q8 flip: `/` → feed | With route registration |
| **Live↔artboard (visual waves)** | Side-by-side vs written M149–M160 state-sheets on live `#/next/feed*` (local-five up) | **Required for visual Done** (NF-07…12) — story-root/demo packs alone ≠ visual PASS (AD-VP-04 · 2026-10-11) |
| **Classic baselines** | Update shell/board smoke when D2.3 applies new shell to classic | At D2.3 — do not leave stale classic chrome goldens |
| **Retire gate** | Shelter paths either covered in next, explicitly OOS-residual, or deleted with checklist | Before removing classic board/issue |

Production entry (Vite build / preview) must exercise hash routes including `#/next/feed*` when present — not src-unit alone as sole gate.

**Why AD-VP-04:** parity audit 2026-10-10 — Path A packs scored PASS while live UI mismatched artboards (H3/H6). Tracker: [`ARCH-DELTA-visual-parity-wave-2026-10-11.md`](../../tasks/backlog-stories/next-feed/ARCH-DELTA-visual-parity-wave-2026-10-11.md).

Packaging seam: **N/A**.

---

## 2) Shelter-list (lock Q7-B)

**Seed from as-is** [`App.jsx`](../../../src/App.jsx) (sync to [`spa-url-page-map.md`](../../spa-url-page-map.md) on implement):

| Path | Shelter purpose (Phase 1) |
|------|---------------------------|
| `#/board` | Peek classic feed data / residual content |
| `#/issue/:id` | Classic Issue detail |
| `#/dashboard` | My stories / activity chrome (no redesign) |
| `#/profile` | Profile entry (no redesign) |
| `#/how-it-works` | Existing marketing/help |
| `#/verify` | Verify flow host |
| `#/story/submit` (+ compose redirect) | Submit story |
| `#/login` | Auth (outside AppShell layout) |

Phase 1 **must not** silently drop these entries from nav while next/feed is WIP. Redesign of cabinet/profile surfaces remains **OOS**.

---

## 3) Default entry (lock Q8-C)

| Phase | `/` and `*` |
|-------|-------------|
| Before next shell+`/next/feed` exist | Keep as-is → `/board` |
| After working next shell + feed route | → `/next/feed` |
| Classic | Remain linked via shelter-list / explicit nav |

WIP feed must use honest empty/loading/error states — not claim Product Story Done.

---

## 4) Risks & «соломка»

| Risk | Soft landing |
|------|----------------|
| False Done: new shell on classic + old cards | AC claim URLs = `#/next/feed*`; hybrid classic documented as temporary |
| Dual content planes drift | One data plane; feed owns new UI; board residual only |
| Theme/shell test break | Q6-B: fix + extend; explicit in REQ risks |
| Catch-all eats `/next/*` | Register next routes **above** `*` |
| Early `/` flip to empty feed | Honest WIP states; shelter board still reachable |
| Retire too early (profile broken) | Shelter-list + retire checklist |
| Scope creep cabinet | AC-10 / OOS |
| PNG as API | DUI + AC-02/03 |
| Link breakage | Accepted as non-veto in greenfield; still update map + smoke |

Operator context: near-zero external traffic; showing classic only in family/private — **does not** remove verify obligation.

---

## 5) Retire classic (target)

Classic board/issue (and eventually other shelter rows as next absorbs them) are **removed** when:

1. `#/next/feed*` meets Phase 1 AC for feed/Issue/thread claim matrix, **and**
2. Verify surfaces Q6-B green on next, **and**
3. Each shelter-list row is either superseded by a next path, explicitly kept as non-feed residual, or waived in a later operator decision.

This is **not** REQ-21 L7 in-place cutover onto `#/board`.

---

## 6) Not in this doc

NEW STORY keys; inventing e2e framework choice beyond “browser smoke required”; deleting classic in this documentation turn.
