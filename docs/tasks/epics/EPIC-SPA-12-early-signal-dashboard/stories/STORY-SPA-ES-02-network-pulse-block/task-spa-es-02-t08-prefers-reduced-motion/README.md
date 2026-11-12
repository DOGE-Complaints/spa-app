# SPA-ES-02-T08 — prefers-reduced-motion density dots (F2)

**Status:** Done — P6 PASS 2026-08-17T11:22:43Z · F2 CLOSED  
**Story:** [`../STORY-SPA-ES-02-network-pulse-block.md`](../STORY-SPA-ES-02-network-pulse-block.md)  
**Decision Ref:** [audit-STORY-SPA-ES-02-execution-2026-08-17.md](../../../../../../analysis/audit-STORY-SPA-ES-02-execution-2026-08-17.md) §F2 · M137 §26  
**Depends on:** SPA-ES-02-T02 Done (ui_anchor)  
**ui_scope:** `visual`  
**ui_anchor:** `false`  
**extends ui-mockup:** [`../task-spa-es-02-t02-pulse-omit-bound-ui/ui-mockup-spec.md`](../task-spa-es-02-t02-pulse-omit-bound-ui/ui-mockup-spec.md)  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-17T11:19:36Z  
**Gate Date:** 2026-08-17T11:22:43Z  
**Package:** `pkg-000067` **unchanged** · wave `spa_es_02_audit_2026_08_17`

```text
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/early-discovery-dashboard/mockup-137-network-pulse-block-state-sheet-spec.png
```

## Purpose
CSS: respect `prefers-reduced-motion` on `.network-pulse-density` dots. M137 §26 forbids heartbeat / attention-demanding loop; requires reduced-motion; component must remain understandable when static. Keep viz decorative (`aria-hidden`).

## Risk
Reopening omit/bound AC; fabricating KPI; wiring Contributors; mixing ES-03…05; new screenshot pack unless CSS proof is insufficient.

## Code Facts (re-verify at execute)
- Default loop kept: [`NetworkPulseBlock.css`](../../../../../../../src/components/earlySignal/NetworkPulseBlock.css) L31 `animation: network-pulse-dot 2.4s ease-in-out infinite`.
- Reduced-motion: same file L65–69 `@media (prefers-reduced-motion: reduce)` → `animation: none`.
- Dots decorative: [`NetworkPulseBlock.jsx`](../../../../../../../src/components/earlySignal/NetworkPulseBlock.jsx) L57 `aria-hidden="true"`.
- Bind still drops contributors: [`bindNetworkPulse.js`](../../../../../../../src/domain/bindNetworkPulse.js) L44.

## Gap
Audit F2 Low — density CSS loop without `prefers-reduced-motion` vs M137 §26.

## AC / DoD
- [x] (P0) `NetworkPulseBlock.css` respects `prefers-reduced-motion: reduce` (no infinite `network-pulse-dot` loop under that media).
- [x] (P0) Density viz remains decorative; omit/bound copy unchanged.
- [x] (P0) Do not change bind map; do not wire Contributors/Voices.
- [x] (P0) Do not mix ES-03…05; do not rewrite `pkg-000067`.

## Where to change
- [`../../../../../../../src/components/earlySignal/NetworkPulseBlock.css`](../../../../../../../src/components/earlySignal/NetworkPulseBlock.css)

## Out of scope
Pipeline SSOT (T07); M137 PNG hygiene (F3 WAIVED); invent AC; ES-03…05; git push.

## Verification
```bash
rg -n "prefers-reduced-motion|network-pulse-dot" spa-app/src/components/earlySignal/NetworkPulseBlock.css
```
