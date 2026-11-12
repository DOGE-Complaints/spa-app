# STORY-SPA-NS-03 — ProfileRail + shelter nav

## Meta
- **Key:** `STORY-SPA-NS-03-profile-rail-shelter-nav`
- **Package:** [next-shell](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · Builder `pkg-000099`
- **Epic:** [EPIC-SPA-19-next-shell](../../epics/EPIC-SPA-19-next-shell/EPIC-SPA-19-next-shell.md)
- **Pipeline:** [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-03-profile-rail-shelter-nav/STORY-SPA-NS-03-profile-rail-shelter-nav.md)
- **Status:** Done · P3 (`2026-10-09T16:09:26Z`) · gate PASS · UX ready M149 ProfileRail
- **Depends on:** NS-01 host; NS-02 icons; [icon catalog](STORY-SPA-NS-icon-assets.md); [api-requirements §2.1](STORY-SPA-NS-api-requirements.md)
- **Brief:** [UX-PROMPTS.md](UX-PROMPTS.md) · NS-R · UX ready M149 (no mockup brief)

## Зачем
Левый rail: own-story metrics/status + nav Profile / My stories (DUI-Q15). Без redesign кабинета и без fake story cards.

## Текущее состояние (verified)
- Public sidebar: [`Sidebar.jsx`](../../../../src/components/AppShell/Sidebar.jsx); `PUBLIC_SHELL_SHOW_SIDEBAR` often off (classic shelter).
- `ProfileRail` on `#/next/feed*` via [`AppShellLayout.jsx`](../../../../src/layout/AppShellLayout.jsx) · [`ProfileRail.jsx`](../../../../src/components/AppShell/ProfileRail.jsx).
- `GET /story-activity` ✅ gateway/CAB; SPA HTTP **not wired** — honest empty [`useStoryActivityRail.js`](../../../../src/hooks/useStoryActivityRail.js) — [api-req §2.1](STORY-SPA-NS-api-requirements.md).

## UX SSOT
- Spec: [M149](../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) · [Component §10 `ProfileRail`](../../../UX/next/feed/DOGEstonia-component-and-variants-specification-v1.0.md) · [DUI-Q15](../../../UX/next/feed/DOGEstonia-DUI-Q01-Q18-phase-1-decision-record-2026-10-08.md)
- Register: [NS-shell-mockup-intake-register.md](NS-shell-mockup-intake-register.md) row NS-R → NS-03

## Icons
| UI slot | Logical ID | Runtime URL |
|---------|------------|-------------|
| Board / feed nav | `board` | `/icons/next-shell/navigation/board.svg` |
| Profile | `profile` | `/icons/next-shell/navigation/profile.svg` |
| My stories | `my-stories` | `/icons/next-shell/navigation/my-stories.svg` |
| Location (chrome) | `location` | `/icons/next-shell/actions/location.svg` |
| Verified badge | `verified` | `/icons/next-shell/status/verified.svg` |
| Expand / select | `chevron-down` | `/icons/next-shell/actions/chevron-down.svg` |

## Logo
- N/A · header owns (NS-02)

## Функциональные требования (FR)
- **FR-NS-03.1** ProfileRail: metrics/status/date for own stories per Q15; Profile + My stories = **navigation only**.
- **FR-NS-03.2** Data: bind `GET /story-activity` when wiring; until then honest empty/demo — no invent fields beyond CAB/DUI.
- **FR-NS-03.3** Shelter-list intact for classic later (NS-05); nav targets existing `/profile` (and my-stories route if present) without cabinet redesign.
- **FR-NS-03.L10N** `nextShell.rail.*` + reuse `appShell.*` / cabinet labels where already exist.

## Routes / API
- [api-req §2.1](STORY-SPA-NS-api-requirements.md): `GET /story-activity` ✅ BE · ⚠️ SPA FE · **no new endpoint**.

## Вне scope
- Cabinet/Profile product redesign; fake issue cards in rail.
- Feed body / threads → next-feed.

## Тексты и переводы (en / et / ru)

### `nextShell.rail.*`

| key | en | et | ru |
|-----|----|----|----|
| `nextShell.rail.profile` | Profile | Profiil | Профиль |
| `nextShell.rail.myStories` | My stories | Minu lood | Мои истории |
| `nextShell.rail.board` | Board | Tahvel | Доска |
| `nextShell.rail.metricsSubmitted` | Submitted | Esitatud | Отправлено |
| `nextShell.rail.metricsPublished` | Published | Avaldatud | Опубликовано |
| `nextShell.rail.metricsUnderReview` | Under review | Ülevaatamisel | На проверке |
| `nextShell.rail.empty` | No stories yet | Lugusid pole veel | Пока нет историй |

## Acceptance Criteria
- [x] Rail shows metrics/status + nav only (Q15); no cabinet redesign
- [x] Icons use `/icons/next-shell/…` from catalog
- [x] API = cite CAB `/story-activity` or honest empty; no invented gateway fields
- [x] Feed body OOS explicit

## Verified As-of-Done
- P3 `2026-10-09T16:09:26Z` · `pkg-000099` · [gate](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-03-profile-rail-shelter-nav/task-spa-ns-03-t01-profilerail-shell/acceptance-verification-spa-ns-03.md) PASS  
- Live: ProfileRail on `#/next/feed*` · honest empty · next-shell icons · classic `#/board` shelter intact · Backend UP smoke
