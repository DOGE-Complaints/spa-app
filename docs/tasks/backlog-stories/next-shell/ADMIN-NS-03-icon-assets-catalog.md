# ADMIN-NS-03 — Icon index + runtime promote (`public/icons/<context>/`)

## Meta

- **Key:** `ADMIN-NS-03-icon-assets-catalog`
- **Status:** Done
- **Depends on:** [ADMIN-NS-02](ADMIN-NS-02-ux-mockup-intake.md)
- **Blocks:** ADMIN-NS-05 (stories must cite runtime URLs)
- **Skill:** asset catalog / promote — **не** рисовать иконки
- **SSOT masters:** [dogestonia-icon-system-v1.0/](../../../UX/next/feed/dogestonia-icon-system-v1.0/) · [manifest](../../../UX/next/feed/dogestonia-icon-system-v1.0/DOGEstonia-icon-manifest-v1.0.md) · [token map](../../../UX/next/feed/dogestonia-icon-system-v1.0/DOGEstonia-icon-token-map-v1.0.md) · [Asset Manifest](../../../UX/next/feed/DOGEstonia-asset-manifest-v1.0.md)
- **Master index:** [`../icons/ICON-GENERATION-INDEX.md`](../icons/ICON-GENERATION-INDEX.md) — Status = **Promote/index Done** (not generate)
- **Deliverable:** [`STORY-SPA-NS-icon-assets.md`](STORY-SPA-NS-icon-assets.md)

## Цель

1. **Индекс** shell Logical ID → master SVG (docs) → **runtime** under `spa-app/public/icons/`.  
2. **Контекст использования** = поддиректория: для этого пакета **`next-shell`**, внутри — группы из icon-system (`navigation/`, `actions/`, `status/`, …).  
3. **Logo:** reuse текущий header asset — не из icon-system.

**Запрещено:** генерировать новые SVG/PNG masters; invent PH `ic-*.png` naming для feed icons.

## Locked runtime grammar (operator 2026-10-09)

| Role | Path |
|------|------|
| Master (immutable docs) | `spa-app/docs/UX/next/feed/dogestonia-icon-system-v1.0/icons/<group>/<name>.svg` |
| Runtime (Vite public) | `spa-app/public/icons/next-shell/<group>/<name>.svg` |
| URL in app | `/icons/next-shell/<group>/<name>.svg` |
| Header logo | **Reuse** `/assets/DOGEstonia-logo-horizontal.png` · fallback `/assets/DOGEstonia-logo-fallback.svg` |

Existing peers under `public/icons/`: `public-home`, `threads-feed`, `user-cabinet`, … — **do not** dump next-shell glyphs into those folders.

## Shell subset (must appear in deliverable)

| Logical ID | Master (rel. icon-system) | Runtime URL | Stories | Manifest status |
|------------|---------------------------|-------------|---------|-----------------|
| `board` | `icons/navigation/board.svg` | `/icons/next-shell/navigation/board.svg` | NS-02/03/04 | approved |
| `profile` | `icons/navigation/profile.svg` | `/icons/next-shell/navigation/profile.svg` | NS-03/04 | approved |
| `my-stories` | `icons/navigation/my-stories.svg` | `/icons/next-shell/navigation/my-stories.svg` | NS-03 | proposed master |
| `search` | `icons/navigation/search.svg` | `/icons/next-shell/navigation/search.svg` | NS-02 (affordance; live search OOS) | approved |
| `menu` | `icons/navigation/menu.svg` | `/icons/next-shell/navigation/menu.svg` | NS-02/04 | proposed |
| `theme-light` | `icons/navigation/theme-light.svg` | `/icons/next-shell/navigation/theme-light.svg` | NS-02 | proposed |
| `theme-dark` | `icons/navigation/theme-dark.svg` | `/icons/next-shell/navigation/theme-dark.svg` | NS-02 | proposed |
| `notifications` | `icons/navigation/notifications.svg` | `/icons/next-shell/navigation/notifications.svg` | NS-02 | proposed |
| `account` | `icons/navigation/account.svg` | `/icons/next-shell/navigation/account.svg` | NS-02 | proposed |
| `back` | `icons/navigation/back.svg` | `/icons/next-shell/navigation/back.svg` | NS-04 | proposed |
| `close` | `icons/actions/close.svg` | `/icons/next-shell/actions/close.svg` | NS-04 | proposed |
| `location` | `icons/actions/location.svg` | `/icons/next-shell/actions/location.svg` | NS-03 | proposed |
| `chevron-down` | `icons/actions/chevron-down.svg` | `/icons/next-shell/actions/chevron-down.svg` | NS-03 as needed | proposed |
| `verified` | `icons/status/verified.svg` | `/icons/next-shell/status/verified.svg` | NS-03 | proposed |
| **logo** | — | `/assets/DOGEstonia-logo-horizontal.png` | NS-02 | **reuse as-is** |

**Deferred to feed package:** `reactions/*`, `map-pin`, `react`/`comment`/`share`/`send`/`attach`, `list-view`/`map-view`/`filter`, etc.

## Deliverable

[`STORY-SPA-NS-icon-assets.md`](STORY-SPA-NS-icon-assets.md):

1. Meta + links to icon-system + Asset Manifest  
2. Full shell subset table (master path + runtime URL + story keys)  
3. §Promote checklist: copy masters → `public/icons/next-shell/**` (files appear in implement / NS story / ADMIN-06 task — **name ≠ create** empty tree unless operator asks in that wave)  
4. §Logo reuse  
5. §Token map (`currentColor` + theme)  
6. §Out of scope glyphs  
7. Optional ICON-GENERATION-INDEX row: **Promote/index Done**

## Acceptance

- [x] Every shell story icon has master + runtime URL under `/icons/next-shell/…`
- [x] No NEW SVG authored; context dir = `next-shell`
- [x] Logo = reuse current `/assets/DOGEstonia-logo-*`
- [x] Feed-only icons explicitly deferred
- [x] INDEX: ADMIN-NS-03 → Done

## Как выполнять

«Выполни ADMIN-NS-03 — индекс icon-system → `public/icons/next-shell/<group>/`; logo reuse; без генерации».
