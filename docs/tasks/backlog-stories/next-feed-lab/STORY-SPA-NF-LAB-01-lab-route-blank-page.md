# STORY-SPA-NF-LAB-01 — Lab route + blank page

## Meta
- **Key:** `STORY-SPA-NF-LAB-01-lab-route-blank-page`
- **Package:** [next-feed-lab](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · [VISUAL-DoD.md](VISUAL-DoD.md)
- **Status:** Done · P3 (`2026-10-13T11:17:12Z`) · pipeline [EPIC-SPA-22](../../epics/EPIC-SPA-22-next-feed-lab/stories/STORY-SPA-NF-LAB-01-lab-route-blank-page/STORY-SPA-NF-LAB-01-lab-route-blank-page.md) · `pkg-000127` · gate PASS · **not** visual package PASS
- **Depends on:** — (first tip)
- **Runtime prerequisite (later):** local-five · open `#/lab/feed`
- **Code boundary:** new lab page route **inside** `AppShellLayout`; **no** gateway/threads fetch; **no** `NextFeedHostPage` / toolbar / map; **no** classic CSS / product hosts
- **ui_scope:** `feed-lab`
- **Process:** A+C+F — this tip = clean room only (no artboard mood yet)

## Зачем
Нужна пустая страница для визуальной отладки ленты без шума product feed-host и без бекенда — иначе снова красим старые витрины (VL failure mode).

## Artboards
- N/A for blank canvas (foundation for M149+ cards in LAB-02/03)
- Visual mood gates start at LAB-03 — see [VISUAL-DoD.md](VISUAL-DoD.md) §4

## Past failures this tip prevents
- Debugging visual on `#/next/feed` under toolbar/map/API noise (process B risk)
- Treating host page as lab canvas

## Функциональные требования (FR)
- **FR-LAB-01.1** Hash route `#/lab/feed` registered in `App.jsx` **inside** shell layout (interview Q1 B · Q7 A).
- **FR-LAB-01.2** Page renders a dedicated lab canvas (e.g. `FeedLabPage`) with minimal chrome — **not** `FeedToolbar` / `FeedListArea` / `NextFeedHostPage` product host.
- **FR-LAB-01.3** Page performs **zero** gateway/threads HTTP on mount.
- **FR-LAB-01.4** `#/next/feed` and `#/board` unchanged (no port, no shelter touch — LAB-05 later).
- **FR-LAB-01.5** Lab page module does **not** import ban-list hosts/CSS ([VISUAL-DoD.md](VISUAL-DoD.md) §3).

## Acceptance Criteria
- [ ] `#/lab/feed` opens blank lab canvas under shell
- [ ] No network calls to issues/threads from lab page mount
- [ ] Product routes not regressed
- [ ] Lab entry module import ban: no `BoardIssuePost`, `FeedCivicPost`, `FeedDiscussionBlock`, `ReactionControls.css`
- [ ] **Not claimable as visual Done** — blank foundation only (Partial visual N/A; do not mark package visual PASS)

## Вне scope
Shell redesign · product feed mutate · fixtures (LAB-02) · atom cards (LAB-03) · visual artboard PASS · port (LAB-05)

## Technical subtasks (постановка)

### t01 — Route
- Add `<Route path="/lab/feed" element={<FeedLabPage />} />` under shell in `App.jsx` (alongside next/feed).
- **Out:** route outside shell (rejected Q1).

### t02 — Blank page module
- Target: `pages/FeedLabPage.jsx` (or `features/feed-lab/`) — empty canvas placeholder until LAB-02/03.
- **name ≠ create** until implement wave.
