# EPIC-SPA-08 — Design Foundation (spa-app)

> **ID:** `EPIC-SPA-08` · **Статус:** Done (G4–G11; G10 Wave 6 gate 2026-08-02T20:34:22Z · `pkg-000044`)
> **Тип:** Cross-cutting / L0 Foundations
> **source:** [`../../backlog-stories/design-foundation/INDEX.md`](../../backlog-stories/design-foundation/INDEX.md)
> **Источник:** [`spa-app-doc-code-gap-report.md`](../../../analysis/spa-app-doc-code-gap-report.md) §G4 / G7 / G8; brand palette [DOGEstonia_Color_Palette_v1.0_RU.md](../../backlog-stories/design-foundation/DOGEstonia_Color_Palette_v1.0_RU.md) (G9); G11 leftovers [reaudit](../../../analysis/reaudit-STORY-SPA-G9-gap-closure-2026-08-02.md) F3–F8; G10 DS-BTN [STORY-SPA-G10](../../backlog-stories/design-foundation/STORY-SPA-G10-button-system-ds-btn.md)
> **Scaffolded:** 2026-07-28T16:01:20Z
> **G9 scaffolded:** 2026-08-02T08:45:25Z
> **G9 gate:** 2026-08-02T08:59:09Z
> **G11 scaffolded:** 2026-08-02T12:25:03Z
> **G11 gate:** 2026-08-02T12:55:51Z
> **G10 scaffolded:** 2026-08-02T20:13:25Z

---

## Назначение

Закрыть doc-gap фундамент дизайна SPA: CSS design tokens (G4), self-hosted fonts (G7), AppShell refactor (G8), brand color palette cutover на G4 consumer API (G9), brand token adoption / glue (G11), shared Button system DS-BTN (G10). SSOT токенов consumer — [`docs/UX/design-system.md`](../../../UX/design-system.md) §2; brand hex SSOT — Color Palette v1.0 (`--doge-*`); buttons SSOT — [design-system-buttons-spec.md](../../../UX/design-system-buttons-spec.md).

## Состав

| Story | Тема | Wave | Status |
|-------|------|------|--------|
| [G4 pipeline](stories/STORY-SPA-G4-design-tokens-foundation/STORY-SPA-G4-design-tokens-foundation.md) · [backlog](../../backlog-stories/design-foundation/STORY-SPA-G4-design-tokens-foundation.md) | Design tokens `tokens.css` | 1 | Done · `pkg-000038` |
| [G7 pipeline](stories/STORY-SPA-G7-self-hosted-fonts/STORY-SPA-G7-self-hosted-fonts.md) · [backlog](../../backlog-stories/design-foundation/STORY-SPA-G7-self-hosted-fonts.md) | Self-hosted fonts | 2 | ✅ Done · `pkg-000039` (2026-07-28T21:57:46Z) |
| [G8 pipeline](stories/STORY-SPA-G8-app-shell-refactor/STORY-SPA-G8-app-shell-refactor.md) · [backlog](../../backlog-stories/design-foundation/STORY-SPA-G8-app-shell-refactor.md) | App shell refactor | 3 | ✅ Done · `pkg-000040` (2026-07-29T08:27:15Z) |
| [G9 pipeline](stories/STORY-SPA-G9-brand-color-palette-tokens/STORY-SPA-G9-brand-color-palette-tokens.md) · [backlog](../../backlog-stories/design-foundation/STORY-SPA-G9-brand-color-palette-tokens.md) | Brand palette → G4 tokens | 4 | ✅ Done · `pkg-000042` (2026-08-02T08:59:09Z) |
| [G11 pipeline](stories/STORY-SPA-G11-brand-token-adoption-glue/STORY-SPA-G11-brand-token-adoption-glue.md) · [backlog](../../backlog-stories/design-foundation/STORY-SPA-G11-brand-token-adoption-glue.md) | Brand token adoption / glue | 5 | ✅ Done · `pkg-000043` (2026-08-02T12:55:51Z) |
| [G10 pipeline](stories/STORY-SPA-G10-button-system-ds-btn/STORY-SPA-G10-button-system-ds-btn.md) · [backlog](../../backlog-stories/design-foundation/STORY-SPA-G10-button-system-ds-btn.md) | Button system DS-BTN | 6 | ✅ Done · `pkg-000044` (gate 2026-08-02T20:34:22Z) |

## Порядок волн

1. **G4** — `src/styles/tokens.css` + миграция hex → `var(--…)` (закрыта).
2. **G7** — `@font-face` + файлы (использует `--font-family-*` из G4).
3. **G8** — Header/Sidebar → AppShell components.
4. **G9** — `--doge-*` brand primitives + rebind `--color-*`; CTA contrast; docs (закрыта).
5. **G11** — token→CSS glue + G9 leftovers F3–F8 (docs Wave 0 + CTA hover/ink/soft + StatusBadge + rgba packs).
6. **G10** — DS-BTN (`Button` / `IconButton` / `ButtonGroup` / `MenuAction`) + migration Waves 2–4 + visual/story gate.

## Вне scope эпика

- Light theme / `prefers-color-scheme` (G9 cutover = утверждённый dark brand hex, не light theme).
- Product features вне L0 foundations; public-home layout (EPIC-SPA-09) — кроме Wave 3 G10 chrome coordination.
- Spacing / typography beyond G4/G7; лого/маскот asset recolor.
- `SplitButton`; Storybook (unless already in repo); re-drawing M134 PNG / inventing mockup-134.md (per G10 Вне scope).
