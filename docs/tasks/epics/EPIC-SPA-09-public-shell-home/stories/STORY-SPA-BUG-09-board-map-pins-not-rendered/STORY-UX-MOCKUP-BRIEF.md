# STORY-UX-MOCKUP-BRIEF — STORY-SPA-BUG-09-board-map-pins-not-rendered

> **Назначение:** вход для **отдельного UX-диалога** (до/параллельно P3 visual). Агент-UX пишет mockup spec; оператор переносит пути в P3 `@mockup:`.  
> **Создано в:** P1.3 APPLY `2026-10-03T15:08:51Z`  
> **Не invent PNG paths** в этом brief как SSOT assets — только целевые states/selectors.

---

## Meta

| Поле | Значение |
|------|----------|
| **Story key** | `STORY-SPA-BUG-09-board-map-pins-not-rendered` |
| **Parent epic** | `EPIC-SPA-09-public-shell-home` |
| **Pkg** | `pkg-000090-20261003-epic-spa-09-bug-09-board-map-pins.yaml` |
| **Pipeline story** | `…/STORY-SPA-BUG-09-board-map-pins-not-rendered.md` |
| **Backlog source** | `backlog-stories/bugs/STORY-SPA-BUG-09-board-map-pins-not-rendered.md` |
| **ui_scope** | `visual` |
| **ui_complexity** | `standard` |
| **UI routes** | `/#/board` → Map view |
| **Viewport** | `1536×1024` (desktop канон) |
| **Anchor task** | `task-spa-bug-09-t03-fix-loadimage-boot` — `ui_anchor: true` |

## 1) Роль и задача

Ты **UX/UI специалист** для spa-app. **Не писать product code.** Подготовить **target / delta mockup specs** для board Map pin+cluster visibility states после H1 fix.

**Принципы (analysis.mdc):**
- Опирайся на backlog Verified facts + pipeline AC.
- Нет §Артборд на disk — **создай** mockup-*-spec.md в UX-чате; не выдумывай готовые PNG path как уже существующие.
- Фокус: Map view with pins/clusters Present vs basemap-only broken; empty-pins state; List↔Map chrome unchanged (PH-04).

## 2) Контекст (from story)

- **Broken:** basemap + Tallinn labels; List has issues; pin-capable geo Present; markers Absent.
- **Fixed target:** ≥1 pin or cluster visible when pin-capable issues exist.
- **Empty-pins:** only when zero pin-capable issues (`data-testid="board-map-empty-pins"`).
- **Out:** life-sim H2 pin-stack at Tallinn centroid (document, not fail AC).

## 3) States to specify

| State | Intent |
|-------|--------|
| Map · pins Present | ≥1 unclustered pin and/or cluster on basemap |
| Map · empty-pins | empty UI when no pin-capable issues |
| Map · basemap-only (bug) | historical broken — optional repro note, not Pass |
| List mode | PH-04 feed unchanged |

## 4) Selectors / evidence hooks (known)

- `data-testid="board-map-empty-pins"` (empty path)
- MapLibre source id target: `ssr03-issue-pins` (code fact)
- Pin asset: `/icons/semantic-schema-runtime/ic-map-pin.png`

## 5) Next

Отдельный UX-чат по этому brief → mockup-*-spec.md → затем P2/P3 с `@mockup:` на T03. Do not invent HTTP. Do not git push.
