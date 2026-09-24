# Clients and write gates

Parent: [`00-overview.md`](./00-overview.md) · REQ [`17`](../../requirements/17-issue-thread-feed-ux-and-reactions.md)

## Split (operator Q2 = C)

| Concern | Client | Notes |
|---------|--------|-------|
| Issues list / detail | Gateway (as-is) | Do not invent Issues paths |
| Thread social read/write | Threads (when Closed) | Closed: knobs, tree_read, comment create/reply (THR-07/08) · react/attach → THR-09 |
| Verified boolean | Identity `GET /me` | Wire key **`identity_verified`** (sibling REQ 21 / TECH-ARCH) |
| Pack type + integration name (CTA copy) | Gateway / pack projection | Exact keys Open (sibling REQ 52) |
| Shell knobs | Via threads knobs GET + spa cache (THR-07) | Spa does not load pack.json |

## As-is verified

| Fact | Evidence |
|------|----------|
| Issues list | `src/repositories/GatewayIssueRepository.js` — `GET {base}/node/issues` |
| Issue detail | same file — `GET {base}/node/issues/:id` |
| Me | `src/auth/identityService.js` — `GET /me` |
| Threads write gate | `isIdentityVerifiedForWrite` / `meIdentityVerified.js` — **`identity_verified`** |
| Me composer consumer | `CommentComposer` → `canWriteThreadsWithMe` (THR-06) · Board/Issue pass `profile` (THR-08) |
| Social client — Closed reads | `ThreadsSocialClient.js` — `knobs` + `tree_read` Closed (THR-07) |
| Social client — Closed comment write | `ThreadsSocialClient.js` — `comment_create` / `comment_reply` Closed · `POST /threads/issues/{issue_id}/comments` + Bearer (THR-08) |
| Social client — still Open | `react` / `attach_ref` → **Unavailable** until THR-09 (no invent URLs) |
| Legacy flag still in UI | `phone_verified` on cabinet/VerifyPage — **not** sole threads write gate |

## Write gate (logical)

```text
before comment | react | attach-ref
  → read identity_verified from Me (meIdentityVerified / verifyWriteGate)
  → if false/unavailable → do not write; hand off to /verify (see 04)
  → if true → call threads social op when Closed; else Unavailable (Open)
  → comment create/reply: Closed (THR-08) · Bearer from session (`threadsAccessToken`)
  → react / attach-ref: still Open → Unavailable (THR-09)
```

## Contracts

- **Do not invent** HTTP paths or JSON fields in spa docs beyond Closed sibling facts.
- **Closed (wire):** `GET /threads/knobs` · `GET /threads/issues/{issue_id}` · `POST /threads/issues/{issue_id}/comments` (create/reply; `parent_id` null|set) — cite `ThreadsSocialClient.js` / THR-07 / THR-08.
- **Still Open:** react + attach-ref remain **Open → Unavailable** until THR-09 names them (api-req §5/§6).
- Superseded: `/threads/by-issue/**` — do not use.

## Not in this doc

Concrete TypeScript interfaces; invented `/threads/*` routes; STORY task lists.
