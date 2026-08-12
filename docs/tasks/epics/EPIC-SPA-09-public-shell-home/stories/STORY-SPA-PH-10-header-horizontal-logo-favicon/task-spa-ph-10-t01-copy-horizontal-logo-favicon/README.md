# SPA-PH-10-T01 — Copy inbound horizontal logo + favicon

**Status:** Done — P3 PASS 2026-08-07T20:50:39Z  
**Story:** [`../STORY-SPA-PH-10-header-horizontal-logo-favicon.md`](../STORY-SPA-PH-10-header-horizontal-logo-favicon.md)  
**Decision Ref:** backlog FR-PH-10.1 · FR-PH-10.4 · Product lean (wire as-is)  
**Depends on:** —  
**ui_scope:** `none`  
**Skill declared:** `react-expert`  
**Scaffolded:** 2026-08-07T20:45:13Z  
**Package:** `pkg-000056`

## Purpose
Скопировать inbound PNG as-is в `public/` так, чтобы T02/T03 могли ссылаться на стабильные пути без re-export / transparent pad.

## Risk
Execute без файлов на диске → 404 logo/favicon; или accidental re-encode ломает product lean.

## Code Facts (closed)
1. Inbound horizontal: [`inbound/DOGEstonia-logo-horizontal.png`](../../../../../../backlog-stories/inbound/DOGEstonia-logo-horizontal.png) — RGB **2172×724**.
2. Inbound favicon: [`inbound/favicon.png`](../../../../../../backlog-stories/inbound/favicon.png) — RGBA **1024×1024**.
3. Targets on disk (byte-identical `cmp`): `public/assets/DOGEstonia-logo-horizontal.png`, `public/favicon.png`.
4. Circular left alone: `public/assets/DOGEstonia-logo-big.png`.
5. `public/favicon.svg` unchanged (not wired).

## Gap
Closed — assets under `public/` for Header / `index.html`.

## AC / DoD
- [x] (P0) `public/assets/DOGEstonia-logo-horizontal.png` exists (copy from inbound) → FR-PH-10.1.
- [x] (P0) `public/favicon.png` exists (copy from inbound) → FR-PH-10.4.
- [x] (P0) No transparent re-export / palette rewrite (Product lean) — `cmp` identical.
- [x] (P0) No secrets in asset paths / filenames.

## Where to change
- `spa-app/public/assets/DOGEstonia-logo-horizontal.png` (created)
- `spa-app/public/favicon.png` (created)

## Out of scope
Header.jsx / CSS (T02); `index.html` link (T03); tests (T04); transparent pad follow-up.

## Verification
```bash
file spa-app/public/assets/DOGEstonia-logo-horizontal.png spa-app/public/favicon.png
cmp -s spa-app/docs/tasks/backlog-stories/inbound/DOGEstonia-logo-horizontal.png spa-app/public/assets/DOGEstonia-logo-horizontal.png
cmp -s spa-app/docs/tasks/backlog-stories/inbound/favicon.png spa-app/public/favicon.png
```
