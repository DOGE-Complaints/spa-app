# ADMIN-THR-01 — Product UX prompts

## Meta

- **Key:** `ADMIN-THR-01-product-ux-prompts`
- **Status:** Done (2026-09-22)
- **Depends on:** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) locked
- **Blocks:** ADMIN-THR-02
- **Skill:** product + UX briefing (не FE coding)

## Цель

Подготовить paste-ready промпты для **outside-IDE UX chat** (артборды + state sheets) для threads feed shell.

## Вход

- [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · [REQ-17](../../../requirements/17-issue-thread-feed-ux-and-reactions.md)
- [threads-feed-ux arch](../../../architecture/threads-feed-ux/00-overview.md)
- Context (не rewrite): [mockup-132](../../../UX/mockups/home/mockup-132-public-board-home-feed-state-sheet-spec.md) §19 — artboard OOS comments; product = feed slot
- Code host: `BoardPage.jsx` IssueCard map; `IssuePage`; `/verify`

## Обязательные артборды (минимум, ID черновые)

| ID (draft) | Поверхность | States |
|------------|-------------|--------|
| THR-P | BoardIssuePost (card + thread chrome) | loading · empty thread · populated · error/unavailable · narrow |
| THR-T | Comment tree + composer | nested · max-depth · reply · attach allowed/denied · soft fail |
| THR-R | reactions.v1 strip + picker | 3 layers · enabled-only · hover/long-press/keyboard |
| THR-E | Escalation stub | idle · activated feedback · soon/disabled |
| THR-V | Verify gate CTA on write | unverified → CTA · return after verify (no method in result) |
| THR-I | Issue page mount | same thread block; civic detail coexistence |

## Deliverable

[`UX-PROMPTS.md`](UX-PROMPTS.md) — EN paste-ready prompts + state matrices + OOS + story mapping.

## Acceptance

- [x] `UX-PROMPTS.md` covers THR-P/T/R/E/V/I with state sheets
- [x] Explicit OOS: REQ8, invent routes, Facebook marks, rate/near-dup
- [x] Mapping artboard → THR-01…05
- [x] INDEX: ADMIN-THR-01 → Done; ADMIN-THR-02 → Todo

## Expected projected content

`UX-PROMPTS.md` with EN paste-ready prompts + state matrix + OOS + story mapping. No mockup-NN assigned here.

## TODO (layer execution)

- [x] Operator: «Выполни ADMIN-THR-01…»
- [x] Write `UX-PROMPTS.md` only + INDEX status
- [x] Do not generate PNG; do not invent ic-*

## Как выполнять

В чате Cursor: «Выполни ADMIN-THR-01 по `threads-feed/ADMIN-THR-01-…`» — агент пишет только `UX-PROMPTS.md` + обновляет INDEX status.
