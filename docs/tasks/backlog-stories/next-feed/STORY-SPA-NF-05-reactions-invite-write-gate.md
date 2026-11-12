# STORY-SPA-NF-05 — Reactions + invite stub + write gate

## Meta
- **Key:** `STORY-SPA-NF-05-reactions-invite-write-gate`
- **Package:** [next-feed](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- **Epic:** [EPIC-SPA-20-next-feed](../../epics/EPIC-SPA-20-next-feed/EPIC-SPA-20-next-feed.md)
- **Pipeline:** [pipeline](../../epics/EPIC-SPA-20-next-feed/stories/STORY-SPA-NF-05-reactions-invite-write-gate/STORY-SPA-NF-05-reactions-invite-write-gate.md)
- **Status:** Done · P3 (`2026-10-10T19:27:30Z`) · **`pkg-000107`**
- **Depends on:** NF-04 thread surface; [register](NF-feed-mockup-intake-register.md) NF-R; [icon catalog](STORY-SPA-NF-icon-assets.md); [api-requirements §2.2–§3](STORY-SPA-NF-api-requirements.md)
- **Code home:** `features/feed/` (+ reuse threads reactions / verify helpers)
- **ui_scope:** `feed`

## Зачем
Reactions.v1 strip/picker; collaboration invite **stub** honesty; verify-before-write via `identity_verified` on `GET /me`. No people/Connect (M155).

## UX SSOT
- Spec: [M154](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md) · [M156](../../../UX/next/feed/artboards/mockup-m156-current-collaboration-invitation-stub-state-sheet-spec-v1.0.md) · [M157](../../../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.md)
- PNG: [M154](../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.png) · [M156](../../../UX/next/feed/artboards/mockup-m156-current-collaboration-invitation-stub-state-sheet-spec-v1.0.png) · [M157](../../../UX/next/feed/artboards/mockup-m157-current-verify-before-write-state-sheet-spec-v1.0.png)
- Register: [NF-feed-mockup-intake-register.md](NF-feed-mockup-intake-register.md) row NF-R → NF-05
- States: aggregates / picker; invite stub; verify-before-write (403 draft honesty)
- **OOS artboard:** M155 people — no story key

## Icons (from STORY-SPA-NF-icon-assets.md)
| UI slot | Logical ID | Runtime URL |
|---------|------------|-------------|
| Open picker | `react` | `/icons/next-feed/actions/react.svg` |
| Acknowledge | `acknowledge` | `/icons/next-feed/reactions/acknowledge.svg` |
| Support | `support` | `/icons/next-feed/reactions/support.svg` |
| Agree | `agree` | `/icons/next-feed/reactions/agree.svg` |
| Disagree | `disagree` | `/icons/next-feed/reactions/disagree.svg` |
| Off-topic (comment only) | `off-topic` | `/icons/next-feed/reactions/off-topic.svg` |
| Invite stub | `collaboration-invite` | `/icons/next-feed/actions/collaboration-invite.svg` |
| Verified (gate chrome) | `verified` | `/icons/next-shell/status/verified.svg` (reuse) |
| Close picker | `close` | `/icons/next-shell/actions/close.svg` (reuse) |

## API
- [api-req §2.2](STORY-SPA-NF-api-requirements.md): `PUT …/reactions` ✅ + local [`reactionsV1Catalog`](../../../../src/components/threads/reactionsV1Catalog.js)
- Invite: ❌ no send HTTP — stub only (DUI-Q18) · [`InviteOrganizationStub`](../../../../src/components/threads/InviteOrganizationStub.jsx)
- Gate: [api-req §3](STORY-SPA-NF-api-requirements.md) `identity_verified` on `GET /me` ✅ · no auto `/verify` (DUI-Q07)
- People/Connect: ❌ OOS

## Функциональные требования (FR)
- **FR-NF-05.1** Reactions strip + picker; catalog ids only; aggregates/selected/disabled honesty.
- **FR-NF-05.2** Invite control = informational stub; no false success / no invent escalate HTTP.
- **FR-NF-05.3** Writes gated on `identity_verified`; preserve draft on honest denial; no auto verify redirect until discriminator.
- **FR-NF-05.4** No people list / Connect UI (M155).
- **FR-NF-05.L10N** reuse `threadsFeed.reactions.*` / `threadsFeed.escalate.*`; draft `nextFeed.gate.*` if needed.

## Вне scope
- M155 people surfaces; real invite send/persist; invent reaction ids; shell chrome

## Тексты и переводы (en / et / ru)

### Reuse
- `threadsFeed.post.action.react` · `threadsFeed.reactions.*` · `threadsFeed.escalate.inviteOrganization` / stub feedback keys in [`threadsFeedDictionary.js`](../../../../src/i18n/threadsFeedDictionary.js)

### Draft `nextFeed.gate.*`

| key | en | et | ru |
|-----|----|----|----|
| `nextFeed.gate.verifyRequired` | Verify your identity to post | Postitamiseks kinnita identiteet | Подтвердите личность, чтобы писать |
| `nextFeed.gate.deniedGeneric` | Could not complete this action | Toimingut ei õnnestunud lõpule viia | Не удалось выполнить действие |
| `nextFeed.gate.draftPreserved` | Your draft was kept | Mustand säilitati | Черновик сохранён |

## Acceptance Criteria
- [x] Reactions + stub + write-gate match M154/M156/M157; no M155
- [x] PUT reactions + catalog; invite = no HTTP; gate = `/me` `identity_verified`
- [x] Icons from next-feed reactions/actions (+ shell verified/close)
- [x] L10N reuse + draft; no invent API
