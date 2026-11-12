# ADMIN-NS-01 — Product UX implement brief (existing artboards)

## Meta

- **Key:** `ADMIN-NS-01-product-ux-prompts`
- **Status:** Done (2026-10-09) — [UX-PROMPTS.md](UX-PROMPTS.md)
- **Depends on:** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) locked
- **Blocks:** ADMIN-NS-02
- **Skill:** product + UX briefing (не FE coding; **не** image / artboard gen)
- **Pattern:** [ADMIN-PH-01](../public-home/ADMIN-PH-01-product-ux-prompts.md) (structure only)

## Цель

Подготовить **`UX-PROMPTS.md`**: implementer brief — какие **уже принятые** artboards/§ читать для shell, state matrix, OOS.  

**Запрещено:** генерировать PNG, писать новые `*-spec.md` в `artboards/`, «улучшать» пиксели.

## Вход

- [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md)
- [mockup-m149-…](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) — chrome §§4–5, panel E
- [Layout](../../../UX/next/feed/DOGEstonia-dashboard-layout-spec-v1.0.md) · [Mobile](../../../UX/next/feed/DOGEstonia-mobile-responsive-design-pack-v1.0.md)
- [feed INDEX](../../../UX/next/feed/INDEX.md) authority order
- Arch [01-routes-shell](../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md) D2.1 / D2.3
- As-is: `AppShellLayout.jsx`, `Header.jsx`

## Матрица (ссылки на существующее — не создание)

| ID | Surface | Read existing | States to call out |
|----|---------|---------------|-------------------|
| NS-H | PublicHeader | M149 §4 PublicHeader; Component pack PublicHeader | guest/auth · locale · theme · narrow |
| NS-R | ProfileRail | M149 · DUI-Q15 | metrics/nav only |
| NS-G | Grid + right slot | Layout · DUI-Q16 | empty/omit right module |
| NS-M | Mobile shell | M149 E · Mobile pack · M159 chrome-only | compact bar / bottom nav chrome |
| NS-X | Classic + new shell | Arch 01 D2.3 | honesty: new chrome ≠ feed Done |

BoardFeed / M150–M158 body → **OOS** (next feed package).

## Deliverable

Создать **`UX-PROMPTS.md`** в этой папке:

1. Global constraints (home `#/next/feed`; classic shelter; no artboard gen; logo reuse)
2. Per-ID: «read these paths/§» + state checklist
3. Explicit OOS (feed content, invent API, new icons masters)
4. Mapping: ID → future NS-0N

## Acceptance

- [x] `UX-PROMPTS.md` covers NS-H/R/G/M/X
- [x] No new artboard/spec/PNG created under `docs/UX/next/feed/`
- [x] Every surface cites concrete existing path
- [x] Feed content OOS explicit
- [x] INDEX: ADMIN-NS-01 → Done; ADMIN-NS-02 → Todo

## Как выполнять

В чате: «Выполни ADMIN-NS-01 по `next-shell/ADMIN-NS-01-…`» — агент пишет только `UX-PROMPTS.md` + обновляет INDEX status.
