# SPA-ID-08-T05 — GPT bridge UI shell M120 (draft banner + success)

**Story:** [`../STORY-SPA-ID-08-gpt-verification-entry.md`](../STORY-SPA-ID-08-gpt-verification-entry.md)  
**Decision Ref:** [mockup-120-gpt-story-authorization-flow-state-sheet-spec.md](../../../../../../UX/mockups/epic-04/mockup-120-gpt-story-authorization-flow-state-sheet-spec.md); FR-08.1, FR-08.2, FR-08.5, FR-08.7; [`STORY-UX-MOCKUP-BRIEF.md`](../STORY-UX-MOCKUP-BRIEF.md)  
**Depends on:** T02, T03, T04  
**ui_scope:** `visual`  
**Skill declared:** react-expert  
**Scaffolded:** 2026-07-02T10:51:50Z

## Purpose
**Visual anchor M120:** implement persistent `GptDraftBanner` («Story Draft · Status: Saved», source Custom GPT) on all GPT-bridge screens; M120 G success panel («Verified civic participant», «Return to ChatGPT», Open Profile); M120 H already-verified («You're ready»); wire resolving copy (M120 B) if not fully in T03. Mirror ID-06 «nothing lost» draft signal for GPT context.

## Risk
Missing persistent draft banner breaks core product promise (AC #5). English literals or exposed secrets violate FR-08.7 / AC #7.

## Code Facts (re-verify at execute)
- grep `GptDraftBanner|gpt-bridge` in [`spa-app/src/`](../../../../../../../../src/) → **0** at scaffold.
- ID-06 draft saved pattern: [`storyGateFlowState.js`](../../../../../../../../src/auth/storyGateFlowState.js), M122 panels (reference only).
- T02 `gptBridge.draft.*`, `gptBridge.success.*`, `gptBridge.alreadyVerified.*` keys (scaffold target).
- M120 spec: states A–H on artboard [`mockup-120-*.md`](../../../../../../UX/mockups/epic-04/mockup-120-gpt-story-authorization-flow-state-sheet-spec.md).

## AC / DoD
- [ ] (P0) Persistent draft banner on login, verify, resolving, success states (AC #5, FR-08.1).
- [ ] (P0) M120 G: success title/message + «Return to ChatGPT» CTA + Open Profile link (AC #2, FR-08.5).
- [ ] (P0) M120 H: already-verified screen before/alongside 302 (AC #4, FR-08.5).
- [ ] (P0) M120 B resolving: calm progress + Custom GPT context + draft preserved (FR-08.2).
- [ ] (P0) All strings via `t('gptBridge.*')`; no hardcoded English (AC #7).
- [ ] (P0) Privacy: no password/phone/OTP/token display (FR-08.7, AC #6).
- [ ] (P1) `data-testid` selectors per STORY-UX-MOCKUP-BRIEF for T06 puppeteer.
- [ ] (P1) Pre-implement baseline PNG + post-implement screenshot in this task folder (spa UI pipeline).

## Where to change
- New: `spa-app/src/components/GptBridge/GptDraftBanner.jsx`
- New: `spa-app/src/components/GptBridge/GptBridgeSuccessPanel.jsx`
- New: `spa-app/src/components/GptBridge/GptBridgeAlreadyVerifiedPanel.jsx`
- New: `spa-app/src/components/GptBridge/GptBridge.css`
- Wire into `LoginPage.jsx`, `VerifyPage.jsx` (GPT mode)
- This folder: `ui-baseline-pre-implement.png`, `ui-baseline-post-implement.png`

## Out of scope
- OAuth API client (T01). Phone OTP internals (ID-04). Gateway story submit. New mockup spec file (M120 exists).

## Verification
```bash
cd spa-app && npm run test:run -- src/components/GptBridge/__tests__/
cd spa-app && npm run dev
# visual: /#/login?oauth_request_id=… and /#/verify?context=custom_gpt — compare M120 PNG
```
