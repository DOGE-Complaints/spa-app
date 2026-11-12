# SPA-CT-19-T03 — D/E copy · honesty · Remove accent

**Status:** Done  
**Story:** [`../STORY-SPA-CT-19-attachment-ref-token-paint.md`](../STORY-SPA-CT-19-attachment-ref-token-paint.md)  
**Decision Ref:** [`../../../../../backlog-stories/component-thread/STORY-SPA-CT-19-attachment-ref-token-paint.md`](../../../../../backlog-stories/component-thread/STORY-SPA-CT-19-attachment-ref-token-paint.md)  
**ui_scope:** `thread-mount` / `feed-lab` · **mixed**  
**ui_anchor:** true  
**Skill declared:** `react-expert`  
**Scaffolded:** `2026-10-20T12:32:12Z`  
**Package:** `pkg-000177`  
**@mockup:** [`../../../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md`](../../../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md) · C–E · [M153b §7](../../../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) Remove

## Purpose

FR-CT-19.3–19.5: D generic reject + allow-family helper · E safety sentence when known · honesty local-intent · Remove chrome `#B54708`.

## Constraints

- Copy from M153a v1.1 · paint accents from M153b §7  
- Safety sentence only when safety decision known — no invent denial cause  
- No invent MIME/HTTP · no invent OP PASS · Partial=**BLOCK**

## AC / DoD

- [x] D/E copy Match M153a  
- [x] Remove accent Match §7  
- [x] Honesty present where required  
- [x] Visual Done not claimed without OP eye

## Where to change

`src/features/thread-mount/composer/AttachmentRef.jsx` · CSS · ThreadComposer chip slot as needed

## Verification

```bash
python3 docs/methodology/Zeya888-builder-queue/cli/builder_resolve_queue.py --project spa --verify
cd spa-app && npm test -- --run src/features/thread-mount
```
