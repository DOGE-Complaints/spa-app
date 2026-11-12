# ADMIN-ESD-05 — Backlog stories + L10N + icon refs (слой 4.4)

## Meta

- **Key:** `ADMIN-ESD-05-backlog-stories-l10n`
- **Status:** Done (2026-08-16)
- **Depends on:** mockups SSOT, icon catalog, api-requirements
- **Blocks:** ADMIN-ESD-06
- **Skill:** backlog authoring (образец public-home / cabinet stories)

## Цель

Создать продуктовые backlog-стори ES-01…05 с Meta / AC / L10N / mockup+icon+api links / out of scope.

## Целевые файлы

| Key | Filename | Surface | Status |
|-----|----------|---------|--------|
| ES-01 | [STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md](STORY-SPA-ES-01-board-pre-cluster-discovery-shell.md) | Discovery root zero Issues | Todo |
| ES-02 | [STORY-SPA-ES-02-network-pulse-block.md](STORY-SPA-ES-02-network-pulse-block.md) | Network Pulse honest/omit | Todo |
| ES-03 | [STORY-SPA-ES-03-emerging-signals-provisional.md](STORY-SPA-ES-03-emerging-signals-provisional.md) | Emerging Signals L2 | Todo |
| ES-04 | [STORY-SPA-ES-04-coverage-gaps-contribution.md](STORY-SPA-ES-04-coverage-gaps-contribution.md) | Forming + Missing + Help CTAs | Todo |
| ES-05 | [STORY-SPA-ES-05-issues-continuum-regression.md](STORY-SPA-ES-05-issues-continuum-regression.md) | Continuum + Issue feed regression | Todo |

## L10N conventions (locked this run)

- **Namespace:** `earlySignal.*` (не `publicHome.earlySignal.*`)
- Reuse: `publicHome.board.*` only where continuum shared (ES-05 feed chrome)
- Forbidden: patterns from REQ §22 / §23 (AC-SPA-ES-03)
- DoD: keys listed en/et/ru in each story; discovery `data-testid="board-early-signal-discovery"` in ES-01 AC
- Pulse/Emerging: FE bind-or-omit per [STORY-SPA-ES-api-requirements.md](STORY-SPA-ES-api-requirements.md) (not shell-forever omit)

## Acceptance

- [x] 5 story files exist with L10N tables
- [x] Each links mockup + icons + api-req
- [x] ES-01 AC maps AC-SPA-ES-01; ES-05 maps AC-05/07
- [x] INDEX admin-05 Done; ES stories Todo

## Как выполнять

«Выполни ADMIN-ESD-05: создай ES-01…05 по мокапам/icons/api».
