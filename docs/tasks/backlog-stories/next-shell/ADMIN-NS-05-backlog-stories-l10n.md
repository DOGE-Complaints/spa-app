# ADMIN-NS-05 — Backlog stories + L10N (слой 4.4)

## Meta

- **Key:** `ADMIN-NS-05-backlog-stories-l10n`
- **Status:** Done
- **Depends on:** mockup intake (02), icon catalog (03), api-requirements (04)
- **Blocks:** ADMIN-NS-06
- **Skill:** backlog authoring (образец [ADMIN-PH-05](../public-home/ADMIN-PH-05-backlog-stories-l10n.md))

## Цель

Создать продуктовые backlog-стори **STORY-SPA-NS-01…06** с:

- Meta / scope / AC / documentation touchpoints  
- §«Тексты и переводы» (en/et/ru)  
- **UX SSOT** — path к существующим artboards/packs (из ADMIN-NS-02 register)  
- **Icons** — Logical ID + **runtime URL** из `STORY-SPA-NS-icon-assets.md`  
- **Logo** — reuse `/assets/DOGEstonia-logo-horizontal.png`  
- Явный out of scope (feed body)

Файлы стори появляются **только при выполнении этого ADMIN**.

## Целевые файлы

| Key | Suggested filename | Surface |
|-----|-------------------|---------|
| NS-01 | `STORY-SPA-NS-01-next-routes-shell-host.md` | `#/next/feed*` routes + shell host + placeholder |
| NS-02 | `STORY-SPA-NS-02-public-header-next-chrome.md` | Header: home→feed, locale, theme, account + icons/logo |
| NS-03 | `STORY-SPA-NS-03-profile-rail-shelter-nav.md` | ProfileRail + shelter-list (Q15) |
| NS-04 | `STORY-SPA-NS-04-shell-grid-mobile-chrome.md` | Grid, empty right slot (Q16), mobile shell |
| NS-05 | `STORY-SPA-NS-05-classic-shell-apply.md` | D2.3 same shell on classic |
| NS-06 | `STORY-SPA-NS-06-default-entry-shell-verify.md` | `/` flip + Vitest + browser-smoke shell + page-map + icon 404 check |

Также обновить:

- [INDEX.md](INDEX.md) — NS rows Todo  
- [`../INDEX.md`](../INDEX.md) — секция Next Shell  
- [`../../spa-mvp-dashboard.md`](../../spa-mvp-dashboard.md) — story counts **после** появления стори

## Required sections in each STORY

```markdown
## UX SSOT
- Spec: docs/UX/next/feed/artboards/… §…
- Register: NS-shell-mockup-intake-register.md row …

## Icons (from STORY-SPA-NS-icon-assets.md)
| UI slot | Logical ID | Runtime URL |
|---------|------------|-------------|
| … | account | /icons/next-shell/navigation/account.svg |

## Logo
- Reuse /assets/DOGEstonia-logo-horizontal.png (no new asset)
```

## L10N conventions

- Prefer reuse `appShell.*`, `publicHome.*`
- New namespace draft: `nextShell.*` (home=feed, shelter labels, WIP placeholder)
- en/et/ru tables per story; no marketing fluff

## Acceptance

- [x] 6 story files with L10N + UX path + icon runtime URLs + logo reuse
- [x] Each AC scoped shell-only; feed body OOS
- [x] Runtime icons under `/icons/next-shell/…` (not docs/ path)
- [x] INDEX admin-05 Done; NS stories Todo

## Как выполнять

«Выполни ADMIN-NS-05: создай NS-01…06 по intake/icons/api».
