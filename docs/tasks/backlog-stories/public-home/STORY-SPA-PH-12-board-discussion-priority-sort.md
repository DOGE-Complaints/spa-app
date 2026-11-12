# STORY-SPA-PH-12 — Board discussion priority sort

## Meta
- **Key:** `STORY-SPA-PH-12-board-discussion-priority-sort`
- **Epic:** [EPIC-SPA-09](../../epics/EPIC-SPA-09-public-shell-home/EPIC-SPA-09-public-shell-home.md) (public board / home package)
- **Pipeline:** [STORY-SPA-PH-12 pipeline](../../epics/EPIC-SPA-09-public-shell-home/stories/STORY-SPA-PH-12-board-discussion-priority-sort/STORY-SPA-PH-12-board-discussion-priority-sort.md)
- **Package:** [`pkg-000091`](../../spa-active-packages/pkg-000091-20261003-epic-spa-09-ph-12-board-discussion-priority-sort.yaml) · [public-home/](README.md)
- **Status:** **Done** · P3 `pkg-000091` (2026-10-03T15:40:28Z)
- **Severity:** 🔴 HIGH (demo feed relevance)
- **Surface:** `/#/board` List feed (same board home as [PH-04](STORY-SPA-PH-04-board-feed-home.md))
- **Depends on:** [PH-04 Board Feed Home](STORY-SPA-PH-04-board-feed-home.md) Done; [THR-07](../threads-feed/STORY-SPA-THR-07-threads-client-knobs-tree-wire.md) tree wire Done
- **Source:** Operator ask 2026-10-03 — issues with non-empty discussion first on board
- **Related:** [analysis-life-sim-local-load-discussions-and-map-2026-10-03.md](../../../../../doge-complaints-gateway/docs/analysis/analysis-life-sim-local-load-discussions-and-map-2026-10-03.md) (discussions Present on local load)
- **Skill declared (future P3):** `javascript-pro`  
  Path: `.cursor/skills/sources/jeffallan-claude-skills/skills/javascript-pro/SKILL.md`  
  Soft: `react-expert` @ `.cursor/skills/sources/jeffallan-claude-skills/skills/react-expert/SKILL.md`
- **Method:** [`.cursor/rules/analysis.mdc`](../../../../.cursor/rules/analysis.mdc)
- **Tech arch (in-story):** §Техническая архитектура ниже · enriched `2026-10-03T14:48:25Z`

## Зачем простыми словами

На ленте board сначала должны быть видны issues, у которых уже есть непустое обсуждение. «Молчаливые» issues — ниже. Наличие discussion — сигнал приоритета при сортировке ленты.

## Функциональные требования (FR)

- **FR-PH-12.1** На `/#/board` в режиме **List** порядок issues учитывает **наличие непустого discussion** как повышающий фактор.
- **FR-PH-12.2** Issue с ≥1 comment в discussion выше issue без comments (при том же наборе активных фильтров).
- **FR-PH-12.3** Активные SEARCH-фильтры сохраняются; приоритет discussion применяется к **уже отфильтрованному** результату.
- **FR-PH-12.4** Требование относится к **list feed**. Режим Map не обязан менять визуальный порядок пинов.
- **FR-PH-12.5** Новый chrome-текст / L10N-индикатор «с обсуждением» **не** входит в эту story (отдельный запрос, если понадобится).

## Acceptance criteria (AC)

| ID | Criterion |
|----|-----------|
| **AC-PH-12-01** | На board с миксом issues (с comments / без) в List сверху идут issues с непустым discussion. |
| **AC-PH-12-02** | Issue без comments не оказывается выше issue с comments только из‑за даты или иного вторичного ключа. Среди равных по discussion вторичный порядок допустим и стабилен. |
| **AC-PH-12-03** | При активных фильтрах среди видимых результатов действует тот же приоритет discussion. |
| **AC-PH-12-04** | Пустой board / loading / load error — без регрессии относительно PH-04. |

---

## Техническая архитектура (verified → target)

### Historical (pre-T01–T03 · intake)

| Fact | Evidence (then) |
|------|-----------------|
| List order = gateway response; клиент **не** сортировал | `setIssues(list)`; `filteredIssues` только SEARCH |
| Issue pass-through **без** discussion/comment_count | `passThroughPublicIssue` |
| Discussion после paint карточки | `LiveIssueThreadMount` → `getThreadTree` |
| Batch «all trees» HTTP | **Absent** — no invent |
| Gap | Сигнал «есть discussion» недоступен в момент первого `setIssues` без prefetch |

### As-of-Done (P3 · `2026-10-03T15:40:28Z` · P6 SSOT `2026-10-03T15:59:58Z`)

| Fact | Evidence |
|------|----------|
| List discussion-priority sort Present | `sortIssuesByDiscussionPriority` · `BoardPage.jsx` `listIssues` L152–154 · `data-discussion-sort` L393 |
| Prefetch Closed trees for filtered ids | `prefetchDiscussionFlags.js` · `useBoardDiscussionFlags` · `ensureThreadsKnobsCached` + `getThreadTree` |
| Definition `populated` = ≥1 comment | `mapThreadTreeToBlock.js` · `isDiscussionPopulatedStatus` |
| SEARCH then sort | `filteredIssues` → flags → `listIssues` (Map still `filteredIssues` L381 — FR-PH-12.4) |
| sort-before-stable-list | skeleton while `showListPendingSort` L187 / L395 |
| Fail-soft | tree/knobs fail → no boost; gateway load-error unchanged |
| No invent HTTP / no badge | Closed per-issue tree only · FR-PH-12.5 |
| Issues с gateway (unchanged) | `issueService.getIssues` → `GET …/node/issues` |

### Target decision (spa-owned, no invent API) — **delivered**

| Theme | Decision |
|-------|----------|
| Where sort runs | **SPA List only** — after SEARCH filter, before `filteredIssues.map` render |
| What counts as discussion | `mapThreadTreeToBlock(…).status === 'populated'` (≥1 comment). `empty` / `unavailable` / missing flag → **no boost** |
| How signal is obtained | Prefetch Closed `getThreadTree` per **filtered** issue id via existing `ThreadsSocialClient` + `ensureThreadsKnobsCached` (same stack as THR-07). **No** new HTTP path |
| Secondary key (ties) | Stable: original index in gateway `issues[]` after filter (preserve relative order among equals) |
| Map | Do **not** reorder pin GeoJSON for this story (feed Map from same array is OK; pin layout OOS) |
| Loading UX | Prefer **sort-before-stable-list**: while discussion flags for current filter-key are pending, keep List in PH-04 loading skeleton **or** show cards with `data-discussion-sort="pending"` then one reorder when flags settle — pick one in T02; **must** meet AC-PH-12-01 without permanent wrong order |
| Fail-soft | Tree fail / unavailable → treat as no-discussion; board issues from gateway still render (PH-04 regression guard) |
| Scale note | Life-sim local ~dozen issues: parallel/limited concurrency OK. Large N → follow-up list enrichment (gateway/threads) — **not** this story |

### Data flow (target)

```text
getIssues(filters) → issues[]
       ↓
search filter → candidate[]
       ↓
prefetch trees (Closed GET /threads/issues/{id}) → flags: id → boolean hasDiscussion
       ↓
sortIssuesByDiscussionPriority(candidate, flags) → listOrdered[]
       ↓
boardView === 'list' ? map listOrdered : Map uses filteredIssues (unordered OK)
```

### Ownership

| Layer | Owner |
|-------|--------|
| Pure sort + flag helper | new small module under `spa-app/src/` (e.g. `board/sortIssuesByDiscussionPriority.js` or `router/`) |
| Prefetch orchestration | `BoardPage.jsx` (or tiny hook `useBoardDiscussionFlags`) |
| Tree HTTP / mapper | reuse `ThreadsSocialClient` · `mapThreadTreeToBlock` · `threadsKnobsCache` — no fork |
| Gateway issue contract | unchanged |

---

## Техническое решение (implement outline)

1. **Helper** `sortIssuesByDiscussionPriority(issues, hasDiscussionById)`  
   - Primary: `hasDiscussion === true` first.  
   - Secondary: stable original index.  
   - Missing/false/`unavailable` → not boosted.

2. **Flags loader** for current `filteredIssues` ids:  
   - `ensureThreadsKnobsCached` once; then bounded concurrent `getThreadTree` + `mapThreadTreeToBlock`.  
   - Cache flags by `issueId` for session (optional Map) to avoid re-fetch on search-only toggles when id set unchanged.  
   - Invalidate / refetch when `serverFilterKey` changes issue set.

3. **BoardPage**  
   - Derive `listIssues = sort(…)` for List branch only (`boardView === 'list'`).  
   - Keep PH-04 states: empty / filtered-empty / error / loading driven by gateway path; discussion prefetch must not turn gateway success into load-error.  
   - Map branch: no required reorder (FR-PH-12.4).

4. **Tests**  
   - Unit: sort helper (mix / all empty / all populated / stable ties).  
   - Board/hook: mocked client trees → List order discussion-first under search filter.

5. **Do not** add badge/L10N (FR-PH-12.5); do not invent `/threads/by-issue` or gateway `comment_count`.

---

## Субтаски

| Task | Slug | Title |
|------|------|-------|
| **T01** | `task-spa-ph-12-t01-discussion-definition-and-helper` | Зафиксировать definition `populated` = ≥1 comment; pure `sortIssuesByDiscussionPriority` + unit tests (AC-PH-12-01/02) |
| **T02** | `task-spa-ph-12-t02-prefetch-discussion-flags` | Prefetch Closed trees for filtered ids (knobs cache + `getThreadTree`); map → flags; concurrency + fail-soft unavailable |
| **T03** | `task-spa-ph-12-t03-board-list-wire` | Wire List feed on `BoardPage` to sorted order after filter; Map order unchanged; loading UX per §Target decision |
| **T04** | `task-spa-ph-12-t04-filter-regression` | Vitest/integration: active search/filters keep discussion priority among visible (AC-PH-12-03) |
| **T05** | `task-spa-ph-12-t05-ph04-states` | Confirm empty / loading / load-error unchanged vs PH-04 (AC-PH-12-04) |
| **T06** | `task-spa-ph-12-t06-story-gate` | Story gate FR/AC PH-12 |

## Точки в коде (targets)

- `src/pages/BoardPage.jsx` (`filteredIssues` → list render ~L140–143, ~L378+)
- NEW helper module (sort + optional flag types)
- Optional hook: `useBoardDiscussionFlags` (same folder as board helpers)
- Reuse: `src/repositories/ThreadsSocialClient.js` · `mapThreadTreeToBlock.js` · `threadsKnobsCache.js`
- Tests: colocated `__tests__` for helper + BoardPage/hook

## Вне scope

- Ranking по «качеству» или длине текста comments.
- Модерация / скрытие comments.
- Изменение gateway clustering или issue creation.
- Изменение Map pin layout / geo.
- Новый явный UI-бейдж «есть обсуждение» (отдельная story).
- Отдельная api-req / gateway `comment_count` на `GET /node/issues` — follow-up if N-scale hurts (not Pass blocker for demo-sized boards).
- Invent batch threads list HTTP.

## Risks / follow-up

| Risk | Mitigation |
|------|------------|
| N+1 tree GETs on large boards | Bounded concurrency + flag cache; scale → future list-contract story |
| Flicker reorder | Sort-before-stable-list (T03); avoid endless pending |
| Unavailable threads | No boost; still show gateway cards |

## Next (process)

1. Optional refine → P1.3 when activated.  
2. Do **not** activate pkg from this draft alone.
