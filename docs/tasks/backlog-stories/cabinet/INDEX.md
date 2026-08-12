# User Cabinet (EPIC-SPA-07) — backlog package

Roadmap: [UserprofileRoadmap.md](UserprofileRoadmap.md) · Epic: [EPIC-SPA-07](../../epics/EPIC-SPA-07-user-cabinet/EPIC-SPA-07-user-cabinet.md)

| Wave | Story | Mockups | MVP scope | Субтаски | Иконки (каталог #) | Status |
|------|-------|---------|-----------|----------|--------------------|--------|
| 1 | [CAB-01 — Shell assembly](STORY-SPA-CAB-01-profile-cabinet-shell-assembly.md) | M21, M99 (+M22 loading png) | ✅ MVP (identity live) | T01–T07 | reuse assets (logo/flags); опц. `ic-nav-profile` | ✅ Done (`pkg-000030`, gate 2026-07-25) |
| 2 | [CAB-02 — Account summary](STORY-SPA-CAB-02-account-summary-block.md) | M24, M25, M26 ⚠️(M26 без png) | ✅ MVP (extend `/me`) | T01–T08 | #1–#4 `ic-field-*` | ✅ Done (`pkg-000029`, gate 2026-07-12) |
| 2 | [CAB-03 — Civic status](STORY-SPA-CAB-03-civic-status-in-cabinet.md) | M28 (epic-04) | ✅ MVP (identity live) | T01–T06 | #5–#9 `ic-civic-*` (замена unicode) | ✅ Done (`pkg-000033`, gate 2026-07-25) |
| 3 | [CAB-04 — Story activity](STORY-SPA-CAB-04-story-activity-card.md) | M45 ⚠️(png `.md.png`), M23 | ✅ MVP **UI-first** (GW ready; SPA HTTP later) | T01–T10 | #10–#15 + reuse shield/cloud/retry | ✅ Done (`pkg-000034`, gate 2026-07-26) |
| 3 | [CAB-05 — Wallet](STORY-SPA-CAB-05-wallet-status-card.md) | M50 | 🚫 **POST-MVP** (в MVP = stub «coming soon») | T01–T09 | #16–#18 `ic-wallet-*` (задел post-MVP) | Done (`pkg-000035`) |
| 3 | [CAB-06 — Contribution](STORY-SPA-CAB-06-contribution-layer.md) | M53, M23 | ✅ MVP **UI stub** (GW-CAB-03 Deferred) | T01–T09 | #19–#21 `ic-contrib-*` + reuse cloud/retry | ✅ Done (`pkg-000036`, gate 2026-07-28) |
| 4 | [CAB-07 — Page states](STORY-SPA-CAB-07-cabinet-page-states.md) | M23, M22 ⚠️(error без png; #22 png=loading) | ✅ MVP (identity live `/me`) | T01–T08 → pipeline T01–T06 | reuse warning/retry + composite empty CAB-02…06 | ✅ Done — [pipeline](../../epics/EPIC-SPA-07-user-cabinet/stories/STORY-SPA-CAB-07-cabinet-page-states/STORY-SPA-CAB-07-cabinet-page-states.md) (`pkg-000037`, gate 2026-07-28T14:05:08Z) |

> **Иконки:** каждая стори имеет секции **## Субтаски** + **## Иконки (из каталога)** с точными именами файлов и путями `/icons/user-cabinet/ic-*.png` (файлы кладутся в `public/icons/user-cabinet/`). SSOT промптов — [STORY-SPA-CAB-icon-assets.md](STORY-SPA-CAB-icon-assets.md); parity имён стори↔каталог: 100%.
>
> **MVP scope (2026-07-25):** identity `/me` — **go** (CAB-01/02/03/07 live; CAB-02 Done). Gateway `story-activity` + `drafts/current` — **backend ready**, SPA wiring **отложен** (CAB-04 UI + Coming soon). Contribution API — **Deferred** GW-CAB-03 (CAB-06 UI stub). Wallet — POST-MVP stub. SSOT: [STORY-SPA-CAB-api-requirements.md](STORY-SPA-CAB-api-requirements.md) §4–§6.

> **Мокапы (аудит ссылок 2026-07-25):** каждая стори в секции **## Артборд** теперь линкует **и `.md`-спеку, и `.png`-картинку** (реальные имена файлов, dir `docs/UX/mockups/user profile/`; M28 — в `epic-04/`). Открытые gap'ы ассетов (не блокируют вёрстку, но png стоит доложить):
> - **M26** (account missing-email) — `.png` отсутствует.
> - **M22** — коллизия номера: `…load-error-spec.md` (error-панель) **без картинки**; единственный `mockup-22-*.png` — это **loading-skeleton** (без своей спеки, отдан CAB-01 loading FR).
> - **M45** — картинка с двойным расширением `…state-sheet-spec.md.png` (ссылка рабочая; переименование опционально).
> - **M24** — две картинки (`…complete-spec.png` + `…-1.png`), оба залинкованы как основной/вариант.

## Assets

| Artifact | Role |
|----------|------|
| [STORY-SPA-CAB-icon-assets.md](STORY-SPA-CAB-icon-assets.md) | Icon catalog (21 generate + reuse) |
| [STORY-SPA-CAB-api-requirements.md](STORY-SPA-CAB-api-requirements.md) | API-требования по бекендам (identity/gateway), сверено с api-reference |
| [STORY-SPA-CAB-01-profile-from-me.md](STORY-SPA-CAB-01-profile-from-me.md) | **Superseded** → CAB-01 shell |

**Progress:** 7/7 stories Done (100%) — CAB-01 ✅ (`pkg-000030`); CAB-02 ✅ (`pkg-000029`); CAB-03 ✅ (`pkg-000033`); CAB-04 ✅ (`pkg-000034`, 2026-07-26); CAB-05 ✅ (`pkg-000035`, gate 2026-07-26; post-audit T07–T09 closed 2026-07-26T20:35:05Z); CAB-06 ✅ (`pkg-000036`, gate 2026-07-28T09:28:43Z); CAB-07 ✅ (`pkg-000037`, gate 2026-07-28T14:05:08Z)
