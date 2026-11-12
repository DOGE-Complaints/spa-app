# STORY-SPA-NS-01 — Next routes + shell host

## Meta
- **Key:** `STORY-SPA-NS-01-next-routes-shell-host`
- **Package:** [next-shell](INDEX.md) · [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · `pkg-000097-20261009-epic-spa-19-ns-01-next-routes-shell-host.yaml`
- **Epic:** [EPIC-SPA-19-next-shell](../../epics/EPIC-SPA-19-next-shell/EPIC-SPA-19-next-shell.md)
- **Pipeline:** [pipeline](../../epics/EPIC-SPA-19-next-shell/stories/STORY-SPA-NS-01-next-routes-shell-host/STORY-SPA-NS-01-next-routes-shell-host.md)
- **Status:** Done · P3 `2026-10-09T15:09:58Z`
- **Depends on:** [ADMIN-NS-02 register](NS-shell-mockup-intake-register.md); [api-requirements](STORY-SPA-NS-api-requirements.md) §3.1
- **Brief:** [UX-PROMPTS.md](UX-PROMPTS.md) · Surface _(routes)_ · UX ready M149
- **Skill declared:** `react-expert`  
  Path: `.cursor/skills/sources/jeffallan-claude-skills/skills/react-expert/SKILL.md`
- **ui_scope:** `shell`

## Зачем
Зарегистрировать `#/next/feed` (+ `#/next/feed/issue/:id` host) под единым `AppShellLayout` с честным placeholder/WIP контентом. Без feed product body.

## Текущее состояние (verified)

### Historical (pre-P3)
- [`App.jsx`](../../../../src/App.jsx): `/board`, `/issue/:id`; `/` → `/board`; **нет** `#/next/*`.
- Chrome owner: [`AppShellLayout.jsx`](../../../../src/layout/AppShellLayout.jsx).

### As-of-Done (P3 · `2026-10-09T15:09:58Z`)
- `#/next/feed` + `#/next/feed/issue/:id` under `AppShellLayout` · [`NextFeedHostPage.jsx`](../../../../src/pages/NextFeedHostPage.jsx) WIP
- `nextShell.wip.*` en/et/ru · [`nextShellDictionary.js`](../../../../src/i18n/nextShellDictionary.js)
- Public path policy includes `/next/feed*` · `/` and `*` still → `/board` (NS-06)

## UX SSOT
- Spec: [arch 01 §2](../../../architecture/feed-visual-redesign-phase-1/01-routes-shell-coexistence.md) · as-is [`App.jsx`](../../../../src/App.jsx)
- Register: [NS-shell-mockup-intake-register.md](NS-shell-mockup-intake-register.md) row _(routes)_ → NS-01

## Icons
| UI slot | Logical ID | Runtime URL |
|---------|------------|-------------|
| — | — | Host only; chrome icons → NS-02/03/04 |

## Logo
- N/A · header owns (NS-02) · reuse `/assets/DOGEstonia-logo-horizontal.png`

## Функциональные требования (FR)
- **FR-NS-01.1** Routes: `/next/feed`, `/next/feed/issue/:id` under `AppShellLayout` (HashRouter → `#/next/feed*`).
- **FR-NS-01.2** Main content: honest WIP/placeholder (i18n); **not** BoardFeed cards / filters product.
- **FR-NS-01.3** Brand/home target for shell chrome = feed route (wired in NS-02; host must exist).
- **FR-NS-01.L10N** `nextShell.wip.*` for placeholder copy.

## Routes / API
- SPA router only. [api-req §3.1](STORY-SPA-NS-api-requirements.md) — ✅ none HTTP.

## Вне scope
- Feed list/cards, toolbar product UX, map, threads, reactions → [next-feed](../next-feed/INDEX.md).
- `/` flip (NS-06). Classic apply (NS-05).

## Тексты и переводы (en / et / ru)

### `nextShell.wip.*`

| key | en | et | ru |
|-----|----|----|----|
| `nextShell.wip.title` | Feed coming soon | Voog peagi | Лента скоро |
| `nextShell.wip.body` | Shell is ready. Feed content ships in a later package. | Ümbris on valmis. Voosisu tuleb hiljem. | Оболочка готова. Контент ленты — в следующем пакете. |

## Acceptance Criteria
- [x] `#/next/feed` and `#/next/feed/issue/:id` render inside AppShellLayout
- [x] Placeholder uses `t()`; no fake feed cards claiming production
- [x] Links UX register + api-req; feed body OOS explicit
- [x] No new HTTP endpoints
