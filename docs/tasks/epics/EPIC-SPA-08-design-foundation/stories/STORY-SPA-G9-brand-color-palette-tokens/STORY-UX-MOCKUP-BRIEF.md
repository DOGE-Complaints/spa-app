# STORY-UX-MOCKUP-BRIEF — STORY-SPA-G9-brand-color-palette-tokens

> **Назначение:** visual SSOT для P3 mixed/visual gate без Figma-артборда. Brand SSOT = утверждённая Color Palette v1.0 (не отдельный UX-цикл перерисовки layout).
> **Создано в:** P1.3 materialize (2026-08-02T08:45:25Z)
> **Не путать с:** `ui-mockup-spec.md` в task-folder (UI-1, после baseline в P3).

---

## Meta

| Поле | Значение |
|------|----------|
| **Story key** | `STORY-SPA-G9-brand-color-palette-tokens` |
| **Parent epic** | `spa-app/docs/tasks/epics/EPIC-SPA-08-design-foundation/EPIC-SPA-08-design-foundation.md` |
| **Pkg** | `pkg-000042-20260802-epic-spa-08-g9-brand-color-palette-tokens.yaml` |
| **Pipeline story** | `…/STORY-SPA-G9-brand-color-palette-tokens/STORY-SPA-G9-brand-color-palette-tokens.md` |
| **Backlog source** | `spa-app/docs/tasks/backlog-stories/design-foundation/STORY-SPA-G9-brand-color-palette-tokens.md` |
| **Brand SSOT** | [DOGEstonia_Color_Palette_v1.0_RU.md](../../../../backlog-stories/design-foundation/DOGEstonia_Color_Palette_v1.0_RU.md) §2–§6 |
| **ui_scope** | `mixed` |
| **ui_complexity** | `standard` (token cutover; layout unchanged) |
| **UI surfaces** | board, filters, login, cabinet |
| **Viewport** | `1536×1024` (desktop канон) |
| **Anchor task (pkg)** | `task-spa-g9-t05-visual-gate-brand-surfaces/README.md` — `ui_anchor: true` |

---

## 1) Visual target (утверждено)

| Сигнал | Hex / token | Ожидание на surfaces |
|--------|-------------|----------------------|
| Canvas | `#0B1320` / `--doge-bg` → `--color-bg-primary` | Night-blue фон (не charcoal `#141417`) |
| Accent | `#F5A623` / `--doge-accent` → `--color-accent-primary` | Signal Orange (не yellow `#f5c518`) |
| CTA text on accent | `--doge-bg` `#0B1320` или `--doge-ink` `#111111` | Не белый / `--color-text-primary` на orange |
| Surfaces | `#111C2B` / `#172538` | secondary / elevated |
| Borders | `#2B3A4D` | quieter than G4 light borders |

**Gate rule (D-G9-5):** brand parity с палитрой v1.0 — **не** pixel-match к G4 yellow/charcoal.

## 2) Вне scope brief

- Light theme; лого/маскот recolor; public-home layout (EPIC-SPA-09); spacing/typography.

## 3) Handoff P3

- Нет `@mockup:` Figma — baseline = текущий SPA layout + Color Palette v1.0.
- T05: pre/post screenshots board / login / cabinet / filters; story-root `screenshots/` при close.
