# 23. REQ13 — Issue poster on board surfaces (List + detail)

Parent: [docs/requirements backlog/REQ13-DOGEstonia-Issue-Sense-Brief-And-Civic-Poster.md](../../../docs/requirements%20backlog/REQ13-DOGEstonia-Issue-Sense-Brief-And-Civic-Poster.md) §1–2, §4.4–4.5, §5–8 (L6–L8, L12), AC-03–04, AC-06  
Parent-id: REQ13-issue-sense-brief-civic-poster  
Siblings:
- [gateway 57](../../../doge-complaints-gateway/docs/requirements/57-req13-issue-sense-brief-poster-projection.md) (contract: public Issue read exposes poster HTTPS URL + generation status — field names TBD)
- [doge-ai-bridge REQ-09](../../../doge-ai-bridge/docs/requirements/REQ-09-REQ13-SENSE-BRIEF-AND-CIVIC-POSTER-WORKER.md) (no direct SPA↔worker; SPA reads gateway only)  
Status: Draft — awaiting PA.2  
Дата: 2026-10-13

---

## 1) Goal

Показать **civic poster** Issue на board surfaces:

1. **List** (`IssueCard` / board list) — poster visible in the card;
2. **Detail** (`IssuePage`) — poster as primary media when ready;

с честным pending/fail UX (не «сломанная картинка» без статуса). Primary surface = **board** (`#/board`, `#/issue/:id`); next/feed — Open / later unless product expands.

## 2) Scope / Out of scope

**In scope**

- Consume public Issue fields for poster URL + status from gateway list/detail APIs already used by board.
- Render poster on IssueCard (list) and IssuePage (detail).
- Pending / failed / ready states (copy/UI TBD; no fake image).
- Prefer HTTPS image URL over legacy Arweave `image_txid` when both Present (policy: poster wins for MVP civic art).

**Out of scope**

- Calling aibridge from browser.
- Generating images in SPA.
- Changing clustering / map / threads.
- Inventing gateway field names before sibling 57 PA.2 lock.
- Mandatory next/feed redesign (REQ-22) unless explicitly expanded.

## 3) Verified current state

| Fact | Path |
|------|------|
| Detail can show `issue.image_txid` via Arweave gateway | [`IssuePage.jsx`](../../src/pages/IssuePage.jsx) ~L188–198 |
| List `IssueCard` | [`IssueCard.jsx`](../../src/components/IssueCard.jsx) — **no** verified poster/`image_txid` render in card tests for media hero |
| Board list data | issues read from gateway (`VITE_GATEWAY_*` / node issues) |

**Unknown:** public field name for HTTPS poster URL and generation status enum.

## 4) Target behavior

1. When poster URL Present and status ready → List card shows image; Detail shows image as primary media.
2. When pending → placeholder/status (no broken `<img>`).
3. When failed → non-blocking fail affordance; title/summary still readable.
4. When only legacy `image_txid` and no poster → keep current Arweave behavior (no regression) until poster exists.
5. Do not invent URLs client-side.

## 5) Acceptance criteria

| ID | Criterion |
|----|-----------|
| **AC-23-01** | List card shows poster when public URL ready |
| **AC-23-02** | Detail shows poster when public URL ready |
| **AC-23-03** | Pending/fail states do not render broken image without status |
| **AC-23-04** | No SPA→aibridge calls for this feature |
| **AC-23-05** | Legacy `image_txid` path still works when poster Absent |

## 6) Open questions

1. Exact gateway JSON fields for URL/status/version.
2. Include `#/next/feed*` in same wave or board-only.
3. Aspect ratio / crop rules for List vs Detail.
4. i18n strings for pending/fail.

## 7) Dependencies

- Parent REQ13 L6–L8, L12.
- Sibling gateway 57 (wire must land before SPA can Done).
- Sibling aibridge REQ-09 (indirect).
- Orthogonal: REQ-22 feed visual redesign; REQ-17/21 modularity.
