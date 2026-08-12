# ADMIN-ESD-05 — Backlog stories + L10N + icon refs (слой 4.4)

## Meta

- **Key:** `ADMIN-ESD-05-backlog-stories-l10n`
- **Status:** Todo
- **Depends on:** mockups SSOT, icon catalog, api-requirements
- **Blocks:** ADMIN-ESD-06
- **Skill:** backlog authoring (образец public-home / cabinet stories)

## Цель

Создать продуктовые backlog-стори ES-01…05 с Meta / AC / L10N / mockup+icon+api links / out of scope.

## Целевые файлы (создаются **при выполнении** этого слоя — не сейчас)

| Key | Suggested filename | Surface |
|-----|-------------------|---------|
| ES-01 | `STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md` | Discovery root zero Issues |
| ES-02 | `STORY-SPA-ES-02-network-pulse-block.md` | Network Pulse honest/omit |
| ES-03 | `STORY-SPA-ES-03-emerging-signals-provisional.md` | Emerging Signals L2 |
| ES-04 | `STORY-SPA-ES-04-coverage-gaps-contribution.md` | Forming + Missing + Help CTAs |
| ES-05 | `STORY-SPA-ES-05-issues-continuum-regression.md` | Continuum + Issue feed regression |

Также обновить: package INDEX Stories Todo · root [`../INDEX.md`](../INDEX.md) · [`spa-mvp-dashboard.md`](../../spa-mvp-dashboard.md) counts **после** появления стори.

## L10N conventions

- Namespace draft: `earlySignal.*` (или `publicHome.earlySignal.*` — выбрать одно в layer run)
- Reuse: `publicHome.board.*` only where continuum shared; do not overwrite PH empty as sole message without discovery
- Forbidden: patterns from REQ §22 / §23 (AC-SPA-ES-03)
- DoD: keys listed en/et/ru; discovery `data-testid` in ES-01 AC

## Acceptance

- [ ] 5 story files exist with L10N tables
- [ ] Each links mockup + icons + api-req
- [ ] ES-01 AC maps AC-SPA-ES-01; ES-05 maps AC-05/07
- [ ] INDEX admin-05 Done; ES stories Todo

## Как выполнять

«Выполни ADMIN-ESD-05: создай ES-01…05 по мокапам/icons/api».
