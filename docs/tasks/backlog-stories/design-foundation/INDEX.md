# Design foundation — backlog package

EPIC mirrors: `EPIC-SPA-01` (G2), cross-cutting G4/G7/G8/G9/G10/G11; **G10** button system DS-BTN (**Done** · `pkg-000044`); **G11** brand token adoption / glue (**Done** · `pkg-000043`).

| Order | Story | Gap | Status | Depends |
|-------|-------|-----|--------|---------|
| 1 | [G2 — Labels i18n](STORY-SPA-G2-labels-i18n-dictionary.md) | G2 | Done (pkg-000002) | — |
| 2 | [G4 — Design tokens](STORY-SPA-G4-design-tokens-foundation.md) · [pipeline](../../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G4-design-tokens-foundation/STORY-SPA-G4-design-tokens-foundation.md) | G4 | Done — pkg-000038 (2026-07-28T16:20:38Z); EPIC-SPA-08 | — |
| 3 | [G7 — Self-hosted fonts](STORY-SPA-G7-self-hosted-fonts.md) · [pipeline](../../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G7-self-hosted-fonts/STORY-SPA-G7-self-hosted-fonts.md) | G7 | Done — pkg-000039 (2026-07-28T21:57:46Z); EPIC-SPA-08 | G4 Done |
| 4 | [G8 — App shell refactor](STORY-SPA-G8-app-shell-refactor.md) · [pipeline](../../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G8-app-shell-refactor/STORY-SPA-G8-app-shell-refactor.md) | G8 | Done — pkg-000040 (2026-07-29T08:27:15Z); post-audit closed `run_mode=spa_g8_audit_2026_07_29` → [T07](../../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G8-app-shell-refactor/task-spa-g8-t07-deduplicate-language-selector/README.md), gate 2026-07-29T09:39:05Z; EPIC-SPA-08 | G2, G3 stable |
| 5 | [G9 — Brand color palette → G4 tokens](STORY-SPA-G9-brand-color-palette-tokens.md) · [pipeline](../../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G9-brand-color-palette-tokens/STORY-SPA-G9-brand-color-palette-tokens.md) | G9 | Done — pkg-000042 (gate 2026-08-02T08:59:09Z); EPIC-SPA-08 Wave 4; leftovers → [G11](STORY-SPA-G11-brand-token-adoption-glue.md) | G4 Done; SSOT [DOGEstonia_Color_Palette_v1.0_RU.md](DOGEstonia_Color_Palette_v1.0_RU.md) |
| 6 | [G10 — Button system (DS-BTN)](STORY-SPA-G10-button-system-ds-btn.md) · [pipeline](../../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G10-button-system-ds-btn/STORY-SPA-G10-button-system-ds-btn.md) | G10 | ✅ Done — pkg-000044 (gate 2026-08-02T20:34:22Z); EPIC-SPA-08 Wave 6 | G9 Done; SSOT [design-system-buttons-spec.md](../../../UX/design-system-buttons-spec.md) · [guide](../../../runtime-docs/button-system-developer-guide.md) |
| 7 | [G11 — Brand token adoption / glue](STORY-SPA-G11-brand-token-adoption-glue.md) · [pipeline](../../epics/EPIC-SPA-08-design-foundation/stories/STORY-SPA-G11-brand-token-adoption-glue/STORY-SPA-G11-brand-token-adoption-glue.md) | G11 | ✅ Done — pkg-000043 (gate 2026-08-02T12:55:51Z); EPIC-SPA-08 Wave 5 | G9 Done; [reaudit F3–F8](../../../analysis/reaudit-STORY-SPA-G9-gap-closure-2026-08-02.md) addressed |

**Progress:** 7/7 Done
