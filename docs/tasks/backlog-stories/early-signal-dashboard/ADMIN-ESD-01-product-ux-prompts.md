# ADMIN-ESD-01 — Product UX prompts (слой 4.1)

## Meta

- **Key:** `ADMIN-ESD-01-product-ux-prompts`
- **Status:** Done (2026-08-11)
- **Depends on:** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) locked
- **Blocks:** ADMIN-ESD-02
- **Skill:** product + UX briefing (не FE coding)

## Цель

Подготовить **промпты для UX-диалога** (артборды + state sheet A–E и discovery blocks) — по образцу [`public-home/ADMIN-PH-01`](../public-home/ADMIN-PH-01-product-ux-prompts.md).

## Вход

- [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- [REQ-15](../../../requirements/15-early-signal-pre-cluster-public-dashboard.md) §4–5, parent §§9, 15–20, 22–23, 31, 34–35
- Verified: `BoardPage` empty path; no Early Signal UI today

## Обязательные артборды (минимум)

| ID (черновик) | Поверхность | Обязательные states |
|---------------|-------------|---------------------|
| ESD-D | Discovery composition on `/board` (zero Issues) | A–E modes · loading · zero Issues discovery · (опц.) load error |
| ESD-P | Network Pulse block | metrics available · metrics omitted / copy-only · narrow |
| ESD-E | Emerging Signals | provisional cards · weaken/disappear · empty section |
| ESD-C | Coverage: Picture Forming + What's Missing + Help Complete | default · CTA → GPT · mobile wrap |
| ESD-I | Continuum with Issues ≥1 | Issue feed + residual discovery chrome · Issues-only regression |

Constraints in prompts: dark civic-tech; **no** Offers; **no** fake completeness / unlock counters; Topic ≠ Issue; Level 2 ≠ Level 3; host `/board` only.

## Deliverable

Создать **`UX-PROMPTS.md`** в этой папке:

1. Global constraints (from brief + REQ AC-03/06/08)
2. Per-artboard prompt (EN, paste-ready) + state matrix A–E mapping
3. Copy placeholders EN for five blocks; prohibited-pattern checklist
4. Out of scope from brief
5. Mapping: artboard ID → future ES-0N story

**Done:** [`UX-PROMPTS.md`](UX-PROMPTS.md)

## Acceptance

- [x] `UX-PROMPTS.md` covers ESD-D/P/E/C/I
- [x] Each prompt requires state sheet (not one happy path)
- [x] States A–E documented without hard Story-count thresholds
- [x] Submit/Help = existing GPT entry (not in-app compose)
- [x] INDEX: ADMIN-ESD-01 → Done; ADMIN-ESD-02 → Todo

## Как выполнять

В чате: «Выполни ADMIN-ESD-01 по `early-signal-dashboard/ADMIN-ESD-01-…`» — агент пишет только `UX-PROMPTS.md` + обновляет INDEX status.
