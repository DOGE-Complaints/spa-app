# threads-feed — INDEX

> **Пакет:** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)  
> **REQ:** [17-issue-thread-feed-ux-and-reactions.md](../../../requirements/17-issue-thread-feed-ux-and-reactions.md)  
> **Architecture:** [threads-feed-ux](../../../architecture/threads-feed-ux/00-overview.md)  
> **Mockups:** [threads-feed/ M143–M148](../../../UX/mockups/threads-feed/README.md)  
> **Icons:** [STORY-SPA-THR-icon-assets.md](STORY-SPA-THR-icon-assets.md)  
> **Режим:** ADMIN **6/6 Done** · chrome THR-01…06 **Done** · wire THR-07…09 **Done** (`pkg-000083`…`085`) · threads HTTP-06 **Closed**

> **REQ-17:** Draft — awaiting PA.2 — package does **not** close PA.2  
> **Audit:** [AUDIT-REQ-17-package-readiness-2026-09-22.md](AUDIT-REQ-17-package-readiness-2026-09-22.md)  
> **API SSOT:** [STORY-SPA-THR-api-requirements.md](STORY-SPA-THR-api-requirements.md) ↔ [threads api-reference](../../../../../doge-threads/docs/runtime-docs/api-reference/API_REFERENCE.md)

## Admin queue

| Key | File | Status | Next |
|-----|------|--------|------|
| ADMIN-THR-01 | [ADMIN-THR-01-product-ux-prompts.md](ADMIN-THR-01-product-ux-prompts.md) | **Done** | [UX-PROMPTS.md](UX-PROMPTS.md) |
| ADMIN-THR-02 | [ADMIN-THR-02-ux-mockup-intake.md](ADMIN-THR-02-ux-mockup-intake.md) | **Done** | [threads-feed/ M143–M148](../../../UX/mockups/threads-feed/README.md) |
| ADMIN-THR-03 | [ADMIN-THR-03-icon-assets-catalog.md](ADMIN-THR-03-icon-assets-catalog.md) | **Done** | [STORY-SPA-THR-icon-assets.md](STORY-SPA-THR-icon-assets.md) |
| ADMIN-THR-04 | [ADMIN-THR-04-api-requirements.md](ADMIN-THR-04-api-requirements.md) | **Done** | needs Closed · spa wire THR-07…09 |
| ADMIN-THR-05 | [ADMIN-THR-05-backlog-stories-l10n.md](ADMIN-THR-05-backlog-stories-l10n.md) | **Done** | §L10N en/et/ru on THR-01…05 |
| ADMIN-THR-06 | [ADMIN-THR-06-tech-decomposition.md](ADMIN-THR-06-tech-decomposition.md) | **Done** | ADR + wave · chrome Done |

**Execute order (wire):** THR-07 → THR-08 → THR-09

## Product stories

| Key | File | orientation | Status | Blocked-on |
|-----|------|-------------|--------|------------|
| THR-01 | [STORY-SPA-THR-01-board-issue-post-mounts.md](STORY-SPA-THR-01-board-issue-post-mounts.md) | ui_first | **Done** | P3 `pkg-000077` |
| THR-02 | [STORY-SPA-THR-02-comment-tree-composer-attachments.md](STORY-SPA-THR-02-comment-tree-composer-attachments.md) | ui_first | **Done** | P3 `pkg-000078` |
| THR-03 | [STORY-SPA-THR-03-reactions-v1-picker.md](STORY-SPA-THR-03-reactions-v1-picker.md) | ui_first | **Done** | P3 `pkg-000079` |
| THR-04 | [STORY-SPA-THR-04-escalation-stub.md](STORY-SPA-THR-04-escalation-stub.md) | ui_first | **Done** | P3 `pkg-000080` |
| THR-05 | [STORY-SPA-THR-05-verify-write-gate.md](STORY-SPA-THR-05-verify-write-gate.md) | ui_first | **Done** | P8 `pkg-000081` |
| THR-06 | [STORY-SPA-THR-06-social-identity-clients-fail-soft.md](STORY-SPA-THR-06-social-identity-clients-fail-soft.md) | tech_first | **Done** | P6 `pkg-000082` · seam Unavailable |
| THR-07 | [STORY-SPA-THR-07-threads-client-knobs-tree-wire.md](STORY-SPA-THR-07-threads-client-knobs-tree-wire.md) | tech_first | **Done** | P3 `pkg-000083` · [pipeline](../../epics/EPIC-SPA-14-threads-feed-ux/stories/STORY-SPA-THR-07-threads-client-knobs-tree-wire/STORY-SPA-THR-07-threads-client-knobs-tree-wire.md) |
| THR-08 | [STORY-SPA-THR-08-comment-write-wire.md](STORY-SPA-THR-08-comment-write-wire.md) | tech_first | **Done** | P3 `pkg-000084` · [pipeline](../../epics/EPIC-SPA-14-threads-feed-ux/stories/STORY-SPA-THR-08-comment-write-wire/STORY-SPA-THR-08-comment-write-wire.md) |
| THR-09 | [STORY-SPA-THR-09-reactions-attach-wire.md](STORY-SPA-THR-09-reactions-attach-wire.md) | tech_first | **Done** | P3 `pkg-000085` · [pipeline](../../epics/EPIC-SPA-14-threads-feed-ux/stories/STORY-SPA-THR-09-reactions-attach-wire/STORY-SPA-THR-09-reactions-attach-wire.md) |

L10N namespace: `threadsFeed.*`  
Epic folders — EPIC-SPA-14 REUSE · THR-01…09 **Done** (`pkg-000077`…`085`)  
testid: `board-issue-post`, `issue-thread-block`, `reaction-controls`, `invite-organization-stub`, `verify-write-gate`

## AC-SPA-THR map (REQ-17 §5)

| AC | Package lock |
|----|--------------|
| AC-SPA-THR-01 | [api-req](STORY-SPA-THR-api-requirements.md) · Closed threads paths · spa wire THR-07…09 |
| AC-SPA-THR-02 | THR-01…04 shell · keep `/issue/:id` |
| AC-SPA-THR-03 | No cabinet metrics → REQ8 |
| AC-SPA-THR-04 | `/board` primary |
| AC-SPA-THR-05 | THR-05 · `identity_verified` |
| AC-SPA-THR-06 | THR-02 / THR-09 attach floor |
| AC-SPA-THR-07 | No rate-limit / near-dup UX |

## Open execute blockers (honest)

| Blocker | Status | Consumer |
|---------|--------|----------|
| Threads public social HTTP | **Closed** (HTTP-06) | api-reference |
| Spa `ThreadsSocialClient` knobs/tree | **Closed** (THR-07) | comment/react/attach **Closed** (THR-08/09) |
| Spa comment / react / attach wire | **Closed** (THR-08/09) | Bearer writes |
| Pack type + integration JSON keys | **Unknown / Open** | THR-05 V-D — civic line only |
| SPA gate helpers `identity_verified` | **Closed** (THR-05/06) | page `profile` prop **wired** (THR-08) |

## Cross-links

- Tech-arch spa: [threads-feed-ux](../../../architecture/threads-feed-ux/00-overview.md)
- Threads HTTP arch: [public-social-http](../../../../../doge-threads/docs/architecture/public-social-http/00-overview.md) · [handoff](../../../../../doge-threads/docs/architecture/public-social-http/04-spa-consumer-handoff.md)
- Threads package: [02-public-social-http](../../../../../doge-threads/docs/tasks/backlog-stories/02-public-social-http/INDEX.md)
- Runtime API: [API_REFERENCE](../../../../../doge-threads/docs/runtime-docs/api-reference/API_REFERENCE.md)
- FE API needs: [ADMIN-THR-04](ADMIN-THR-04-api-requirements.md) · [STORY-SPA-THR-api-requirements.md](STORY-SPA-THR-api-requirements.md)
- Mockups SSOT: [M143–M148](../../../UX/mockups/threads-feed/README.md)
- Icon catalog: [STORY-SPA-THR-icon-assets.md](STORY-SPA-THR-icon-assets.md)
- **Audit vs REQ-17:** [AUDIT-REQ-17…](AUDIT-REQ-17-package-readiness-2026-09-22.md)
- Board host: PH-04
