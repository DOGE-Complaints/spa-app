# STORY-SPA-THR-05-verify-write-gate — Verify-before-write (M147)

## Meta (pipeline)

- **Key:** `STORY-SPA-THR-05-verify-write-gate`
- **Parent Epic:** [`../../EPIC-SPA-14-threads-feed-ux.md`](../../EPIC-SPA-14-threads-feed-ux.md)
- **Epic:** EPIC-SPA-14 Threads Feed UX · **Wave B**
- **Status:** Done
- **orientation:** ui_first
- **ui_scope:** `mixed`
- **source:** [`../../../../backlog-stories/threads-feed/STORY-SPA-THR-05-verify-write-gate.md`](../../../../backlog-stories/threads-feed/STORY-SPA-THR-05-verify-write-gate.md)
- **decision_ref:** backlog + [M147](../../../../../UX/mockups/threads-feed/mockup-147-verify-before-write-gate-state-sheet-spec.md) + [arch 04](../../../../../architecture/threads-feed-ux/04-verify-and-fail-soft.md) + identity TECH-ARCH `identity_verified`
- **mockup SSOT:** `docs/UX/mockups/threads-feed/mockup-147-…`
- **Depends on:** M147 · M144 composer host · `/verify` route · THR-01/02 Done
- **Parent REQ:** [17](../../../../../requirements/17-issue-thread-feed-ux-and-reactions.md) §2, §4.3, AC-SPA-THR-05
- **Scaffolded:** `2026-09-22T21:53:24Z`
- **Completed:** `2026-09-22T21:56:59Z`
- **Package:** `pkg-000081`

```text
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-147-verify-before-write-gate-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-147-verify-before-write-gate-state-sheet-spec.png
```

## Артборд (SSOT дизайна)

| Мокап | Состояние / фокус | Спека | PNG |
|-------|-------------------|-------|-----|
| **M147** THR-V | Unverified gate · `/verify` handoff · opaque Verified · optional civic line | [mockup-147-…-spec.md](../../../../../UX/mockups/threads-feed/mockup-147-verify-before-write-gate-state-sheet-spec.md) | [mockup-147-…-spec.png](../../../../../UX/mockups/threads-feed/mockup-147-verify-before-write-gate-state-sheet-spec.png) |

## Текущее состояние (verified · As-of-Done · P3)

### As-of-Done
- `isIdentityVerifiedForWrite` + `VerifyWriteGate` + CommentComposer intercept
- Gate on **`identity_verified`** only (phone alone insufficient)
- Handoff `#/verify?returnTo=` · opaque **Verified** · optional civic line (no invent pack keys)
- L10N `threadsFeed.verify.*` · screenshots 01–04 · vitest · gate PASS · `pkg-000081`

### Historical
- Pre-P3: SPA FE `identity_verified` 0 matches; VerifyPage still phone-centric (as-is)

## Субтаски

| Task | Slug | Title | Status |
|------|------|-------|--------|
| **T01** | `task-spa-thr-05-t01-write-gate-identity-verified` | Block write when identity_verified false | Done |
| **T02** | `task-spa-thr-05-t02-verify-returnto-handoff` | Navigate `/verify` + returnTo | Done |
| **T03** | `task-spa-thr-05-t03-opaque-verified-chrome` | Opaque Verified chrome | Done |
| **T04** | `task-spa-thr-05-t04-l10n-verify-keys` | threadsFeed.verify.* | Done |
| **T05** | `task-spa-thr-05-t05-vitest-gate-opaque` | Vitest gate + opaque | Done |
| **T06** | `task-spa-thr-05-t06-story-gate-thr-05` | Story gate THR-05 | Done |

## Acceptance Criteria

- [x] THR-V-A…D match M147
- [x] Gate uses `identity_verified`; handoff `/verify`; opaque Verified
- [x] No invent pack JSON keys
- [x] Links: M147 · TECH-ARCH · REQ-17 · arch 04
