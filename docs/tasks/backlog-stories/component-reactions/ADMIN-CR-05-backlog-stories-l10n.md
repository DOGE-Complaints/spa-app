# ADMIN-CR-05 — Backlog stories + L10N + icon refs

## Meta

- **Key:** `ADMIN-CR-05-backlog-stories-l10n`
- **Status:** Done (2026-10-14T09:47:42Z)
- **Depends on:** ADMIN-CR-03 Done-as-docs; ADMIN-CR-04 Done-as-docs; UX inventory
- **Blocks:** ADMIN-CR-06
- **Skill:** backlog authoring (образец `ADMIN-PH-05`)
- **Референс L10N:** localization package · M154 §9 · M160 Panel C

## Цель

Создать продуктовые STORY-SPA-CR-* с Meta/AC/L10N/mockup/icon/api refs. **Файлы стори — только при выполнении этого ADMIN**, не при materialize пакета.

## Вход — UX files

Same as ADMIN-CR-03 Вход (full table). Paths this layer needs repeatedly:

- `spa-app/docs/UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md` (+ `.png`) — CR-01 / CR-02 / CR-03 AC  
- `spa-app/docs/UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md` (+ `.png`) — CR-04 AC  
- `spa-app/docs/UX/next/feed/artboards/mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0.md` (+ `.png`) — explicit OOS section in each story  

Also: PRODUCT-BRIEF data-plane reuse lock · CR-api reuse map.

## Deliverables (created)

| Key | File | Surface |
|-----|------|---------|
| CR-01 | [`STORY-SPA-CR-01-reactions-mount-strip.md`](STORY-SPA-CR-01-reactions-mount-strip.md) | Strip states + mount props; root vs comment; PostActionStrip slot; `onReact` seam |
| CR-02 | [`STORY-SPA-CR-02-reaction-picker.md`](STORY-SPA-CR-02-reaction-picker.md) | Desktop popover + mobile sheet; capacity; XOR; save-error rollback |
| CR-03 | [`STORY-SPA-CR-03-lab-reactions-page.md`](STORY-SPA-CR-03-lab-reactions-page.md) | `#/lab/reactions` + two fixture hosts + FixtureAdapter |
| CR-04 | [`STORY-SPA-CR-04-reactions-l10n-theme-stress.md`](STORY-SPA-CR-04-reactions-l10n-theme-stress.md) | ET/RU/EN + light/dark + 320/200% on lab reactions |
| CR-icon | [`STORY-SPA-CR-icon-assets.md`](STORY-SPA-CR-icon-assets.md) | From ADMIN-03 (**Done**) |
| CR-api | [`STORY-SPA-CR-api-requirements.md`](STORY-SPA-CR-api-requirements.md) | From ADMIN-04 (**Done**) |

**Not created (OOS):** story for new HTTP client / people lists / `#/next/feed` cutover.

Updated: package INDEX · root [`../INDEX.md`](../INDEX.md) · [`spa-mvp-dashboard.md`](../../spa-mvp-dashboard.md) — ADMIN **3/4** · tip **ADMIN-CR-06** · product CR-01…04 **Todo**.

## L10N plan (executed)

| Namespace | Contents |
|-----------|----------|
| Reuse Present | `threadsFeed.reactions.*` (react, close, chooseUpTo, layers, ids, unavailable, XOR helper) — verified in `threadsFeedDictionary.js` |
| Draft `reactions.*` | Gaps only: strip retry, picker saveError, lab chrome (`reactions.lab.*`) |
| Rules | ids never user copy; Hopeful/Amusing omitted as selectable; M155 OOS in each story |

## Acceptance

- [x] CR-01…04 files exist with L10N tables + M154/M160 links + icon/api refs  
- [x] Each story states M155 OOS  
- [x] CR-01/03 state data-plane reuse (no second client; FixtureAdapter / optional LiveAdapter)  
- [x] CR-03 AC includes shell route `#/lab/reactions` and two hosts  
- [x] No DS amend (slot inside PostActionStrip)  
- [x] INDEX ADMIN-CR-05 Done; product rows Todo  

## Как выполнять

«Выполни ADMIN-CR-05: создай CR-01…04 (+ link icon/api) по M154/M160; L10N et/ru/en; OOS M155; onReact + ThreadsSocialClient reuse in AC».
