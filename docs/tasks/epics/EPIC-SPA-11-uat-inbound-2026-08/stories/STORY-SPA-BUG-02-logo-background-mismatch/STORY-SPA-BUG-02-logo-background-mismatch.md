# STORY-SPA-BUG-02-logo-background-mismatch — Logo background color mismatch

## Meta (pipeline)

- **Key:** `STORY-SPA-BUG-02-logo-background-mismatch`
- **Parent Epic:** [`../../EPIC-SPA-11-uat-inbound-2026-08.md`](../../EPIC-SPA-11-uat-inbound-2026-08.md)
- **Epic:** EPIC-SPA-11 UAT inbound 2026-08 · **Wave:** Demo polish · **Order:** 4
- **Пакет:** `bugs/` · active `pkg-000054-20260807-epic-spa-11-bug-02-logo-background.yaml`
- **Status:** Done — P3 gate PASS · `pkg-000054` · **P7 WAVE COMPLETE** 2026-08-07T18:03:17Z · `run_mode=spa_bug_02_audit_2026_08_07` **retired** · [reaudit](../../../../analysis/reaudit-STORY-SPA-BUG-02-gap-closure-2026-08-07.md)
- **Severity:** Major visual · **fix-before-demo** (не P0 functional)
- **UAT ID:** (inbound bug report 2026-08-06; отдельного FE-HANDOFF id нет)
- **source:** [`../../../../backlog-stories/bugs/STORY-SPA-BUG-02-logo-background-mismatch.md`](../../../../backlog-stories/bugs/STORY-SPA-BUG-02-logo-background-mismatch.md)
- **decision_ref:** UAT inbound 2026-08-06 · [`../../../../backlog-stories/inbound/DOGEstonia-Bug-Logo-Background-Color-Mismatch.md`](../../../../backlog-stories/inbound/DOGEstonia-Bug-Logo-Background-Color-Mismatch.md)
- **Related Done:** [G9](../../../../backlog-stories/design-foundation/STORY-SPA-G9-brand-color-palette-tokens.md) (`--doge-bg` / surfaces) · PH public header/footer
- **ui_scope:** `none` (T01/T03–T05) · T02 `chrome` (asset/CSS; no artboard → UX brief skip)
- **Scaffolded:** 2026-08-07T11:41:33Z (P1.3 deepen) · tech decomp prior 2026-08-06
- **Hard rule:** **T01 measure → T02 fix** (visual: T01≈pin).

## Symptom (простыми словами)

Знак DOGEstonia в header/footer выглядит как **вставленный прямоугольник**: внутри PNG свой тёмный фон, а полоса header / sidebar / footer — другой оттенок. Функционально ничего не ломается, но на демо бренд сразу читается как «недоэкспортированный asset».

## Expected vs Actual

| | |
|--|--|
| **Expected** | Logo без видимой прямоугольной подложки: либо **прозрачный** asset на утверждённой surface, либо поверхность под **opaque** logo пиксельно совпадает с фоном asset |
| **Actual** | Opaque PNG на `--color-bg-secondary` (`#111C2B`); видна граница «картинки» |
| **Product rule (inbound)** | `#0B1320` = Night UI; prefer transparent asset + formal surface system |

## Verified facts (code + asset — не гипотезы)

| Fact | Evidence |
|------|----------|
| Primary asset (post-fix) | `public/assets/DOGEstonia-logo-big.png` — **RGBA**, corners alpha 0 · backup `…opaque-rgb-backup.png` |
| Pre-fix measure | RGB pad ~`#01091C`–`#030A1E` · [`evidence-…114942Z`](../../../../analysis/evidence-STORY-SPA-BUG-02-measure-2026-08-07T114942Z.md) |
| Night / surface tokens | `--doge-bg: #0B1320` · `--doge-surface-1: #111C2B` **unchanged** |
| Logo consumers | Header · PublicFooter · AppShell — same `/assets/DOGEstonia-logo-big.png` |
| Fallback SVG | pad rect removed |

## Функциональные требования

- **FR-BUG-02.1** Measure note (schema выше): asset mode/alpha/corners + header/footer surface hex.  
- **FR-BUG-02.2** Нет видимой прямоугольной подложки logo на public header **и** footer (desktop + narrow).  
- **FR-BUG-02.3** Выполнено product rule: transparent asset **или** пиксельный match surface↔pad; **prefer** transparent + surfaces documented.  
- **FR-BUG-02.4** `#0B1320` остаётся Night token (`--doge-bg`); не плодить третий «почти night» hex в CSS без записи в tokens/palette doc.  
- **FR-BUG-02.5** Все consumer paths (`Header`, `PublicFooter`, AppShell default) на новый/исправленный asset (или согласованный fallback).  
- **FR-BUG-02.6** Красные placeholder-иконки **вне** gate (inbound AC).

## Acceptance Criteria

- [x] Measure / evidence note существует (`asset.has_alpha`, corner hex, strip hex).  
- [x] `decision_lean` зафиксирован и согласован с product rule.  
- [x] Нет видимой подложки на public header + footer (desktop + narrow). · **P4:** header **PASS**; footer **PARTIAL**.  
- [x] Primary logo path не RGB-pad на secondary strip (transparent **или** verified match).  
- [x] Consumers обновлены единообразно; fallback не хуже primary на тех же surfaces (или задокументирован).  
- [x] Placeholder icons не блокируют Done.

## Вне scope

- Placeholder icon generation / замена красных icons  
- Полный redesign palette / PH-08 composition  
- Landing-site logo (другой app) без отдельного ticket  
- Утверждение «strip = `#0B1320` everywhere» без product sign-off  

## Nested tasks

| Order | Task folder | Status | FR / AC |
|-------|-------------|--------|---------|
| 01 | [`task-spa-bug-02-t01-measure-surfaces-vs-asset`](./task-spa-bug-02-t01-measure-surfaces-vs-asset/README.md) | Done · P4 verified | FR-BUG-02.1 · AC measure + `decision_lean` |
| 02 | [`task-spa-bug-02-t02-transparent-asset-or-surface`](./task-spa-bug-02-t02-transparent-asset-or-surface/README.md) | Done · P4 verified · F1 | FR-BUG-02.3–02.5 · AC pad + consumers |
| 03 | [`task-spa-bug-02-t03-public-routes-logo-pass`](./task-spa-bug-02-t03-public-routes-logo-pass/README.md) | Done · P6 footer via T07 | FR-BUG-02.2 · FR-BUG-02.5 |
| 04 | [`task-spa-bug-02-t04-desktop-narrow-verify`](./task-spa-bug-02-t04-desktop-narrow-verify/README.md) | Done · P6 footer via T07 | FR-BUG-02.2 |
| 05 | [`task-spa-bug-02-t05-story-gate-bug-02`](./task-spa-bug-02-t05-story-gate-bug-02/README.md) | Done · gate amended P6 T07 | all AC · FR-02.2 PASS |
| 06 | [`task-spa-bug-02-t06-as-of-done-doc-hygiene`](./task-spa-bug-02-t06-as-of-done-doc-hygiene/README.md) | Done · P6 · F1+F4 | F1+F4 · `run_mode=spa_bug_02_audit_2026_08_07` |
| 07 | [`task-spa-bug-02-t07-footer-viewport-evidence-gate`](./task-spa-bug-02-t07-footer-viewport-evidence-gate/README.md) | Done · P6 · F2+F3 | F2+F3 · footer crops + gate |

## Notes

- Gate: [`task-spa-bug-02-t05-story-gate-bug-02/acceptance-verification-spa-bug-02.md`](./task-spa-bug-02-t05-story-gate-bug-02/acceptance-verification-spa-bug-02.md)
- Screenshots: [`screenshots/`](./screenshots/)
- **P4:** [audit-STORY-SPA-BUG-02-execution-2026-08-07](../../../../analysis/audit-STORY-SPA-BUG-02-execution-2026-08-07.md) — Ready-with-blockers (footer evidence F2/F3).
- **P5:** scaffold T06→T07 · `run_mode=spa_bug_02_audit_2026_08_07` · pkg `000054` unchanged · 2026-08-07T17:44:38Z.
- **P6 CLOSED** 2026-08-07T17:57:43Z · F1–F4 CLOSED · Ready P7.
- PH-08 and PH-09 must not be merged: composition ≠ sidebar display mode.
