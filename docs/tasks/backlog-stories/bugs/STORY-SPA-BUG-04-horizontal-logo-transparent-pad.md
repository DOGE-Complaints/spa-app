# STORY-SPA-BUG-04 — Horizontal logo transparent pad

> **Структура:** [BUG-STORY-SCHEMA.md](BUG-STORY-SCHEMA.md) · related closed: [BUG-02](STORY-SPA-BUG-02-logo-background-mismatch.md)

## Meta (bug card)

| Field | Value |
|-------|-------|
| **Key** | `STORY-SPA-BUG-04-horizontal-logo-transparent-pad` |
| **Type** | Visual consistency · horizontal brand mark |
| **Severity** | Low visual · optional polish (not P0) |
| **Status** | Todo · draft |
| **Wave** | Demo polish follow-up |
| **Route** | Public `Header` brand (`/#/board`, etc.) |
| **Surface** | Horizontal logo `DOGEstonia-logo-horizontal.png` |
| **Epic** | Prefer [EPIC-SPA-09](../../epics/EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md) or EPIC-SPA-11 on activate |
| **Pipeline** | _(none — draft from PH-10 P5)_ |
| **Package** | [bugs/](INDEX.md) |
| **Source** | [audit-STORY-SPA-PH-10-execution-2026-08-07.md](../../../analysis/audit-STORY-SPA-PH-10-execution-2026-08-07.md) §F4 · PH-10 Product lean / Notes |
| **Related Done** | [BUG-02](STORY-SPA-BUG-02-logo-background-mismatch.md) (circular RGBA) · [PH-10](../public-home/STORY-SPA-PH-10-header-horizontal-logo-favicon.md) |

## Symptom (простыми словами)

Horizontal logo wired as-is (RGB, dark pad ~`#030d20`). На `--color-bg-secondary` strip может читаться как прямоугольник. PH-10 **осознанно** не делал transparent re-export (accepted lean).

## Expected vs Actual (draft)

| | |
|--|--|
| **Expected (this story)** | Horizontal mark без видимого outer pad на header strip (transparent re-export or measured surface match) |
| **Actual (post-PH-10)** | RGB 2172×724 inbound wired; pad accepted non-blocker of PH-10 DoD |

## Scope (draft)

- Measure pad vs strip (BUG-02 playbook pattern).
- Transparent re-export of `DOGEstonia-logo-horizontal.png` **or** documented surface decision.
- Public Header consumers only; do not reopen circular big PNG unless needed.

## Вне scope

- PH-10 tab favicon / text-name removal (Done).
- EmptyState glyph ([PH-11](../public-home/STORY-SPA-PH-11-empty-state-favicon-glyph.md)).
- Landing logo.

## Next (process)

1. Optional PA.3 refine → P1.3 when activated.  
2. Do **not** activate pkg from this draft alone.
