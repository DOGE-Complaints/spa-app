# Reactions, attachments, escalation

Parent: [`00-overview.md`](./00-overview.md) · REQ [`17`](../../requirements/17-issue-thread-feed-ux-and-reactions.md)

## reactions.v1 (operator Q6 = A)

- **Summary strip** — aggregates from threads when present.
- **Picker** — full **enabled** catalog ids, three labelled layers (parent §8 / D25); open via gesture/button (hover / long-press / explicit control) with keyboard a11y.
- Spa does **not** invent reaction ids or like-only subset.
- Toggle/replace semantics — threads rules; spa chrome only.
- Voice-weight display/math — **OOS** (REQ8).

## Attachments + legal media floor (operator Q5 = A)

- Composer shows attach only within floor / capabilities from threads.
- UI sends **refs/ids**, not spa-owned upload policy.
- **No** control that disables CSAM / catastrophic-media protection (AC-SPA-THR-06).
- Soft fail with visible message — no silent drop.
- Blob byte transport SSOT — **Open**.

## Escalation stub (operator Q7 = A)

### As-of-Done (THR-04 · `pkg-000080`)

| Fact | Evidence |
|------|----------|
| Component | `src/components/threads/InviteOrganizationStub.jsx` (+ CSS) |
| Mount | `IssueThreadBlock` action row |
| L10N | `threadsFeed.escalate.*` in `threadsFeedDictionary.js` |
| Harness | `inviteOrganizationHarness.js` · `window.__THR04_FORCE_SCENE__` |
| States | THR-E-A Idle · THR-E-B Activated informational feedback · THR-E-C Soon/disabled |
| HTTP | **Open** — presentation stub only; **no invent escalate HTTP**; **no false success** |

### Historical (pre-P3)

- Visible affordance on post/thread chrome.
- Click → toast/modal «не подключено» **or** named Open handoff route if one appears later.
- **Not** silent no-op; **not** invent escalate HTTP this wave (REQ §5.5 / D2 p3 invitation).

## Not in this doc

Icon asset filenames; mockup PNG; escalate admin workflows.
