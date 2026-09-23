# Clients and write gates

Parent: [`00-overview.md`](./00-overview.md) · REQ [`17`](../../requirements/17-issue-thread-feed-ux-and-reactions.md)

## Split (operator Q2 = C)

| Concern | Client | Notes |
|---------|--------|-------|
| Issues list / detail | Gateway (as-is) | Do not invent Issues paths |
| Thread social read/write | Threads (when Closed) | Paths unnamed — AC-SPA-THR-01 |
| Verified boolean | Identity `GET /me` | Wire key **`identity_verified`** (sibling REQ 21 / TECH-ARCH) |
| Pack type + integration name (CTA copy) | Gateway / pack projection | Exact keys Open (sibling REQ 52) |
| Shell knobs | Via threads payload (sibling lock: knobs in ThreadContext pull) | Spa does not load pack.json |

## As-is verified

| Fact | Evidence |
|------|----------|
| Issues list | `src/repositories/GatewayIssueRepository.js` — `GET {base}/node/issues` |
| Issue detail | same file — `GET {base}/node/issues/:id` |
| Me | `src/auth/identityService.js` — `GET /me` |
| Threads write gate | `isIdentityVerifiedForWrite` / `meIdentityVerified.js` — **`identity_verified`** |
| Me composer consumer | `CommentComposer` → `canWriteThreadsWithMe` (THR-06) |
| Social client seam | `ThreadsSocialClient.js` — Open ops → **Unavailable** (no invent URLs) |
| Legacy flag still in UI | `phone_verified` on cabinet/VerifyPage — **not** sole threads write gate |

## Write gate (logical)

```text
before comment | react | attach-ref
  → read identity_verified from Me (meIdentityVerified / verifyWriteGate)
  → if false/unavailable → do not write; hand off to /verify (see 04)
  → if true → call threads social op when Closed; else Unavailable (Open)
```

## Contracts

- **Do not invent** HTTP paths or JSON fields in spa docs beyond Closed sibling facts.
- Client ops for list/create comment and react remain **Open** until a wire wave names them (REQ §6).

## Not in this doc

Concrete TypeScript interfaces; invented `/threads/*` routes; STORY task lists.
