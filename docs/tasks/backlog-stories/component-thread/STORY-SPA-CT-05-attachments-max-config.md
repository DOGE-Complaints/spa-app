# STORY-SPA-CT-05 — AttachmentRef · maxAttachments config (M153 D/E)

## Meta

- **Key:** `STORY-SPA-CT-05-attachments-max-config`
- **Package:** [component-thread](INDEX.md)
- **Status:** P3 structure Done · gate **BLOCK** · tip · `pkg-000163` · `2026-10-18T13:39:15Z` · Await P4
- **Depends on:** CT-04
- **UX mirror:** §4.2 T-D/T-E/T-maxA
- **Arch:** §4.2 `DEFAULT_MAX_ATTACHMENTS` · AttachmentRef

## Зачем

Вложения как local intent; лимит на композер/ноду — **конфигурируемая константа/параметр**, не хардкод в JSX.

## FR

- **FR-CT-05.1** `maxAttachments` from `threadMountConfig` / prop / knobs (single named constant default).  
- **FR-CT-05.2** Pending intents count cannot exceed `maxAttachments`.  
- **FR-CT-05.3** D: ready chip · Remove · draft intact · not claimed published.  
- **FR-CT-05.4** E: denied copy · draft intact · item not styled ready.  
- **FR-CT-05.5** If attachments unavailable: omit/disable Attach · honest copy.  
- **FR-CT-05.6** No invent upload/bind as persistent success · partial-success honesty when text ok / bind fails (fixture).

## Вне scope

Real media upload API · gallery · safety bypass · classifier UI

## Acceptance Criteria

- [ ] Changing `maxAttachments` changes clamp without JSX magic  
- [ ] D/E fixtures  
- [ ] Vitest clamp  
- [ ] OP eye  

## Technical subtasks

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-05-t01-max-attachments-config` | Todo | `DEFAULT_MAX_ATTACHMENTS` + resolve from props/knobs | `config/threadMountConfig.js` | 05.1–05.2 |
| `task-spa-ct-05-t02-attachment-ref` | Todo | Chip D/E UI · Remove | `composer/AttachmentRef.jsx` | 05.3–05.4 |
| `task-spa-ct-05-t03-composer-wire` | Todo | Attach control respects max + mediaAllowedTypes | ThreadComposer | 05.2 · 05.5–05.6 |
| `task-spa-ct-05-t04-vitest-clamp` | Todo | Intent count ≤ maxAttachments | tests | AC |

### Constraints

- Never `files.length > 1` without named config  
- No claim published media from local chip  

## DoD

Attachments are configurable and honest about local-intent-only in lab.
