# STORY-SPA-BUG-02 — Logo background color mismatch

> **Структура:** [BUG-STORY-SCHEMA.md](BUG-STORY-SCHEMA.md) · образец API-бага: [BUG-01](STORY-SPA-BUG-01-story-submission-unavailable.md)

## Meta (bug card)

| Field | Value |
|-------|-------|
| **Key** | `STORY-SPA-BUG-02-logo-background-mismatch` |
| **Type** | Visual consistency · brand mark |
| **Severity** | Major visual · **fix-before-demo** (не P0 functional) |
| **Status** | **Done** — P3 · **P7 WAVE COMPLETE** 2026-08-07T18:03:17Z · [audit](../../../analysis/audit-STORY-SPA-BUG-02-execution-2026-08-07.md) · [reaudit](../../../analysis/reaudit-STORY-SPA-BUG-02-gap-closure-2026-08-07.md) · `run_mode` **retired** |
| **Wave** | Demo polish |
| **UAT ID** | (inbound bug report 2026-08-06; отдельного FE-HANDOFF id нет) |
| **Route** | Public shell: `/#/board`, `/#/how-it-works`, и др. с `Header` / `PublicFooter` |
| **Surface** | Header brand mark · footer brand · default AppShell logo |
| **Repro** | Always (визуально на любом публичном shell с PNG logo) |
| **Env (UAT)** | Live / local SPA — достаточно CSS + asset (не зависит от gateway) |
| **Epic** | [EPIC-SPA-11](../../epics/EPIC-SPA-11-uat-inbound-2026-08/EPIC-SPA-11-uat-inbound-2026-08.md) |
| **Pipeline** | [pipeline](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-02-logo-background-mismatch/STORY-SPA-BUG-02-logo-background-mismatch.md) |
| **Package** | [bugs/](INDEX.md) |
| **Source inbound** | [DOGEstonia-Bug-Logo-Background-Color-Mismatch.md](../inbound/DOGEstonia-Bug-Logo-Background-Color-Mismatch.md) |
| **Related Done** | [G9](../design-foundation/STORY-SPA-G9-brand-color-palette-tokens.md) (`--doge-bg` / surfaces) · PH public header/footer |
| **decision_ref** | UAT inbound 2026-08-06 |

## Symptom (простыми словами)

Знак DOGEstonia в header/footer выглядит как **вставленный прямоугольник**: внутри PNG свой тёмный фон, а полоса header / sidebar / footer — другой оттенок. Функционально ничего не ломается, но на демо бренд сразу читается как «недоэкспортированный asset».

## Expected vs Actual

| | |
|--|--|
| **Expected** | Logo без видимой прямоугольной подложки: либо **прозрачный** asset на утверждённой surface, либо поверхность под **opaque** logo пиксельно совпадает с фоном asset |
| **Actual (intake / pre-fix)** | Opaque **RGB** PNG на `--color-bg-secondary` (`#111C2B`); видна граница «картинки» |
| **As-of-Done (current)** | Primary PNG **RGBA**, углы **alpha 0**; outer pad снят; tokens Night/surface unchanged · [evidence T02](../../../analysis/evidence-STORY-SPA-BUG-02-fix-t02-2026-08-07T115311Z.md) · **P4 residual:** footer viewport proof → T07 |
| **Product rule (inbound)** | `#0B1320` = Night UI; prefer transparent asset + formal surface system |

## Repro steps

1. Открыть `/#/board` (или другую public page с `Header`).  
2. Найти brand: `data-testid="public-header-brand"` → `img.header-brand-logo`.  
3. Сравнить цвет углов logo bitmap с фоном `.header-strip` / `.public-header` родителя.  
4. То же в footer: `data-testid="public-footer-brand"` → `.public-footer__logo`.  
5. (Опционально) сузить viewport — проверить mobile menu strip (`Header.css` mobile panel тоже `--color-bg-secondary`).

## Verified facts (code + asset — не гипотезы)

| Fact | Evidence |
|------|----------|
| **Current** primary asset | `public/assets/DOGEstonia-logo-big.png` — **982×954**, **`mode RGBA`**, corners alpha **0** (Pillow P6 re-verify 2026-08-07T17:54:24Z) |
| **Historical** pre-fix measure | RGB, no alpha; pad углы ≈ **rgb(1–3, 9–10, 28–30)** → ~`#02091D` · [evidence T01](../../../analysis/evidence-STORY-SPA-BUG-02-measure-2026-08-07T114942Z.md) |
| Opaque RGB backup | `DOGEstonia-logo-big.opaque-rgb-backup.png` (pre-fix copy) |
| Night token | [`tokens.css`](../../../../src/styles/tokens.css): `--doge-bg: #0B1320` → `--color-bg-primary` **unchanged** |
| Surface token | `--doge-surface-1: #111C2B` → `--color-bg-secondary` **unchanged** |
| Header strip bg | [`index.css`](../../../../src/index.css) `.header-strip { background: var(--color-bg-secondary) }` |
| Sidebar bg | `.board-sidebar { background: var(--color-bg-secondary) }` |
| Page/main ground | `:root` / body → `--color-bg-primary` (+ radial к secondary) — ближе к Night, чем strip |
| Logo consumers | [`Header.jsx`](../../../../src/components/AppShell/Header.jsx) · [`PublicFooter.jsx`](../../../../src/components/PublicFooter/PublicFooter.jsx) · default slot [`AppShell.jsx`](../../../../src/components/AppShell/AppShell.jsx) — same `/assets/DOGEstonia-logo-big.png` |
| Fallback SVG | `DOGEstonia-logo-fallback.svg` — **pad `<rect>` removed** (P3 T02); only onError |
| Logo CSS | `.header-brand-logo` height 44px; footer logo 28×28 `object-fit: contain` — **bg CSS на img нет** |
| Header strip-through (P4) | Outer crop samples `rgb(17,28,43)` = `#111C2B` · [audit](../../../analysis/audit-STORY-SPA-BUG-02-execution-2026-08-07.md) |
| Inbound claim nuance | Inbound писал «фон logo = `#0B1320`»; **pre-fix measure** давал ~`#02091D`. Product rule: Night `#0B1320` + transparent prefer |

### Что это **не** (отсечённые наивные гипотезы)

| Hypothesis | Почему слабая |
|------------|----------------|
| «Забыли CSS `background` на img» | Pre-fix подложка была в **bitmap** RGB; CSS img transparent |
| «Сломан только footer» | Тот же PNG в Header + AppShell default |
| «Нужно перекрасить весь product в `#0B1320` strip» | Product rule: prefer **transparent asset**; full palette redesign — out of scope |
| «Fallback SVG — корень бага» | Primary path = PNG; SVG только onError |
| «Gateway / env» | Чистый FE asset + tokens |

## Diagnostic playbook (visual measure — до fix)

Цель T01: **таблица hex** «asset pad vs parent surface» + решение lean (transparent vs recolor surface).

### A. Asset lab (обязательно)

```bash
# Из spa-app — пример; зафиксировать в evidence note
python3 - <<'PY'
from PIL import Image
im = Image.open('public/assets/DOGEstonia-logo-big.png')
print(im.mode, im.size)
for p in [(0,0),(im.width-1,0),(0,im.height-1),(10,10)]:
    print(p, im.getpixel(p))
PY
```

Записать: `mode`, есть ли alpha, sample углов → hex.

### B. Surface CSS (обязательно)

| Slot | Selector / token | Resolved hex (G9) |
|------|------------------|-------------------|
| Header strip | `.header-strip` → `--color-bg-secondary` | `#111C2B` |
| Sidebar | `.board-sidebar` → same | `#111C2B` |
| Main / page | `--color-bg-primary` / `--doge-bg` | `#0B1320` |
| Footer | inherits shell; border-top only — parent strip/page | measure in DevTools |
| Mobile nav panel | `.public-header` mobile block → `--color-bg-secondary` | `#111C2B` |

DevTools: eyedropper **рядом с** logo (не на glyph) vs угол bitmap.

### C. Evidence capture schema (BUG-02 T01)

```yaml
# Visual measure — docs/analysis/ или run-reports/
bug_key: STORY-SPA-BUG-02
captured_at_utc: "YYYY-MM-DDThh:mm:ssZ"
env:
  spa_origin: "http://127.0.0.1:…"   # or railway
asset:
  path: "public/assets/DOGEstonia-logo-big.png"
  mode: "RGB"              # fill after re-verify
  has_alpha: false
  corner_hex_samples: ["#…", "#…"]
  claimed_night_token: "#0B1320"
surfaces:
  - slot: header_strip
    selector: ".header-strip"
    token: "--color-bg-secondary"
    resolved_hex: "#111C2B"
    contrast_vs_asset_pad: visible|none   # human or delta
  - slot: public_footer
    selector: ".public-footer"
    resolved_hex: ""
    contrast_vs_asset_pad: ""
  - slot: board_sidebar
    selector: ".board-sidebar"
    resolved_hex: "#111C2B"
    note: "logo not in sidebar; surface ref for shell system"
viewport_checks:
  desktop: pending
  narrow: pending
decision_lean: transparent_asset | surface_match_0B1320 | hybrid
pin_layer: asset|css_surface|both
screenshots: []   # optional bugs/attachments/BUG-02/
```

### D. Pin rules (T01→T02)

| Observation | Pin | Prefer fix |
|-------------|-----|------------|
| `mode=RGB`, no alpha; strip = `#111C2B`; pad ≠ strip | **asset** (+ optional surface doc) | Replace/export **RGBA** transparent logo; keep shell surfaces |
| Alpha OK but wrong CSS box behind img | **css** | Remove accidental bg / padding fill |
| Strip forced to `#0B1320` only under logo, rest secondary | **css hybrid** | Possible but fragile; product prefers transparent |
| Only fallback SVG wrong | **fallback asset** | Out of primary path unless onError used in UAT |

**Запрет:** не «перекрашивать всё в один hex» без measure note; не закрывать story при оставшемся RGB pad на secondary strip.

## Hypothesis matrix (до / уточнение evidence)

| # | Hypothesis | Prior (после file measure) | Confirm if… | Reject if… |
|---|------------|----------------------------|-------------|------------|
| H1 | Opaque PNG pad ≠ `--color-bg-secondary` strip | **Very high** | RGB + visible delta vs `#111C2B` | Alpha + no pad |
| H2 | Inbound «pad = `#0B1320`» неточен; pad ≈ `#02091D` | High | Corner samples ≠ 11,19,32 | Corners exact `#0B1320` |
| H3 | Recolor strip to `#0B1320` alone достаточен | Medium–Low | Strip `#0B1320` + pad exact match | Pad ≠ `#0B1320` (текущие samples) → останется лёгкий прямоугольник |
| H4 | Transparent PNG/SVG на secondary — устойчивый fix | High (product prefer) | Alpha + no rectangle on strip/footer | Soft edges / wrong crop |
| H5 | Нужен full palette redesign | Low | Measure shows systemic token chaos beyond logo | G9 tokens coherent; only asset seam |

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
- [x] Нет видимой подложки на public header + footer (desktop + narrow). · **P6 T07:** footer crops PASS ([evidence-…175743Z](../../../analysis/evidence-STORY-SPA-BUG-02-footer-2026-08-07T175743Z.md)).  
- [x] Primary logo path не RGB-pad на secondary strip (transparent **или** verified match).  
- [x] Consumers обновлены единообразно; fallback не хуже primary на тех же surfaces (или задокументирован).  
- [x] Placeholder icons не блокируют Done.

## Nested tasks / pipeline

- **Pipeline story:** [`STORY-SPA-BUG-02-logo-background-mismatch`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-02-logo-background-mismatch/STORY-SPA-BUG-02-logo-background-mismatch.md)
- **Epic:** [`EPIC-SPA-11`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/EPIC-SPA-11-uat-inbound-2026-08.md)

| Task | Path | Status |
|------|------|--------|
| T01 | [`task-spa-bug-02-t01-measure-surfaces-vs-asset`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-02-logo-background-mismatch/task-spa-bug-02-t01-measure-surfaces-vs-asset/README.md) | Done · P4 verified |
| T02 | [`task-spa-bug-02-t02-transparent-asset-or-surface`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-02-logo-background-mismatch/task-spa-bug-02-t02-transparent-asset-or-surface/README.md) | Done · P4 verified · F1 |
| T03 | [`task-spa-bug-02-t03-public-routes-logo-pass`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-02-logo-background-mismatch/task-spa-bug-02-t03-public-routes-logo-pass/README.md) | Done · P6 footer via T07 |
| T04 | [`task-spa-bug-02-t04-desktop-narrow-verify`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-02-logo-background-mismatch/task-spa-bug-02-t04-desktop-narrow-verify/README.md) | Done · P6 footer via T07 |
| T05 | [`task-spa-bug-02-t05-story-gate-bug-02`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-02-logo-background-mismatch/task-spa-bug-02-t05-story-gate-bug-02/README.md) | Done · gate amended P6 T07 |
| T06 | [`task-spa-bug-02-t06-as-of-done-doc-hygiene`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-02-logo-background-mismatch/task-spa-bug-02-t06-as-of-done-doc-hygiene/README.md) | Done · P6 · **P7 verified** · F1+F4 |
| T07 | [`task-spa-bug-02-t07-footer-viewport-evidence-gate`](../../epics/EPIC-SPA-11-uat-inbound-2026-08/stories/STORY-SPA-BUG-02-logo-background-mismatch/task-spa-bug-02-t07-footer-viewport-evidence-gate/README.md) | Done · P6 · **P7 verified** · F2+F3 |

> **P3 WAVE COMPLETE** 2026-08-07T11:54:23Z · transparent RGBA logo · [`pkg-000054`](../../spa-active-packages/pkg-000054-20260807-epic-spa-11-bug-02-logo-background.yaml).  
> **P4 hard audit** 2026-08-07T12:09:22Z · [audit](../../../analysis/audit-STORY-SPA-BUG-02-execution-2026-08-07.md) · Ready-with-blockers (footer evidence).  
> **P5 scaffold** 2026-08-07T17:44:38Z · `run_mode=spa_bug_02_audit_2026_08_07` · T06→T07 · pkg unchanged.  
> **P6 CLOSED** 2026-08-07T17:57:43Z · F1–F4 CLOSED.  
> **P7 WAVE COMPLETE** 2026-08-07T18:03:17Z · [reaudit](../../../analysis/reaudit-STORY-SPA-BUG-02-gap-closure-2026-08-07.md) · claim: правки по actionable gap-листу выполнены · `run_mode` **retired**.

## Вне scope

- Placeholder icon generation / замена красных icons  
- Полный redesign palette / PH-08 composition  
- Landing-site logo (другой app) без отдельного ticket  
- Утверждение «strip = `#0B1320` everywhere» без product sign-off  

## Швы (указатели)

`DOGEstonia-logo-big.png` · `Header.jsx` / `Header.css` · `PublicFooter` · `AppShell` default logo · `index.css` `.header-strip` · `tokens.css` `--doge-bg` / `--doge-surface-1` · G9 palette doc

## Next (process)

1. ~~Activate BUG-02 wave~~ → **P3 WAVE COMPLETE**.  
2. ~~P5 scaffold~~ → ~~P6 T06/T07~~ → ~~P7~~ **WAVE COMPLETE** · `run_mode` retired.  
3. Operator pick next: PH-09 / PH-08 / BUG-03 / HL.  
4. Commits (по явной команде): feat assets → docs.
