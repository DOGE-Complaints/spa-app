# UI baseline — STORY-SPA-ID-08 T05 (M120 anchor)

**Viewport:** 1536×1024  
**SSOT mockup:** [`mockup-120-gpt-story-authorization-flow-state-sheet-spec.md`](../../../../../../UX/mockups/epic-04/mockup-120-gpt-story-authorization-flow-state-sheet-spec.md) (Path A — operator accepted)  
**ui-mockup-spec:** [`ui-mockup-spec.md`](../ui-mockup-spec.md)  
**Capture script:** `npm run test:ui:gpt-bridge-m120` (`PHASE=pre-implement|post-implement`)

## States

| State | Route | Selector |
|-------|-------|----------|
| B resolving | `/#/login?oauth_request_id=…&dev_gpt_phase=resolving` | `gpt-bridge-resolving` |
| C login | `/#/login?oauth_request_id=…&dev_gpt_phase=login_required` | `gpt-bridge-login-context` |
| G success | `/#/login?…&dev_gpt_phase=success` | `gpt-bridge-success` |
| H already verified | `/#/verify?context=custom_gpt&dev_gpt_phase=already_verified` | `gpt-bridge-already-verified` |

## retroactive_closure

UI-0 pre-implement captures were taken in the same P3 execute wave after Path A mockup acceptance (M120 existing on disk). Pre-implement folder documents greenfield absence of `gptBridge` components before T05 wiring.

**Scaffolded UTC:** 2026-07-02T11:12:00Z
