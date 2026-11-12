# Interview SSOT — CT-28+ `#/next/feed` ThreadMount + ReactionsMount cutover

- **Дата:** 2026-10-20 (вечер)  
- **Тип:** product interview после lab CT-25…27 Present · OP ask: comments+reactions → real feed/dashboard (backend) · media stub doge  
- **Пакет tip:** [INDEX.md](INDEX.md) · sibling [component-reactions](../component-reactions/INDEX.md)  
- **Слои:** **L1** FR/AC · **L1.5** ARCHITECTURE · **L2** tech subtasks  
- **Prior code check:** [analysis-ct25-ct27-code-present…](../../../analysis/analysis-ct25-ct27-code-present-vs-intake-2026-10-20.md)  
- **Gap note:** [analysis-next-feed-thread-reactions-cutover…](../../../analysis/analysis-next-feed-thread-reactions-cutover-2026-10-20.md)

## Решения оператора

| # | Тема | Решение |
|---|------|---------|
| N1 | Host | `#/next/feed*` (list · modal · sheet · `issue/:id`) · M158 parity · «дашборд» = board/list plane **внутри** next/feed |
| N2 | Thread chrome | Cutover → `thread-mount` presentation · Live bind **existing** `ThreadsSocialClient` (не invent endpoints) |
| N3 | Reactions chrome | Cutover → `reactions-mount` · LiveAdapter Present · strip + comment targets |
| N4 | Media | Единый stub **`/assets/dogefeed.png`** на civic card list+detail · **supersede** M150 `no-media` до image-gen |
| N5 | Attach publish | Не invent upload/bind HTTP · local intent / fail-closed honesty как lab |
| N6 | People Live | Fail-closed until API (CR prior DUI) |
| N7 | Classic OOS | `#/board` · Early Signal continuum · old `ReactionControls` ≠ Done this wave |
| N8 | UX gen | **Нет** новых generative prompts · reuse M152–M154 / M153c/d · media = existing stub asset |

## Факты из кода (не обсуждаемо)

1. Lab: `ThreadMount` + FixtureAdapter · `FeedLabReactionsMount` · `#/lab/feed`.  
2. Next: `FeedThreadMount` → `LiveIssueThreadMount` + **`FeedDiscussionBlock`** · reactions = **`FeedReactionsStrip` / ReactionChrome**.  
3. `thread-mount` `createLiveAdapter()` = fail-closed stub (`live-adapter-unwired`).  
4. `reactions-mount` LiveAdapter = thin `ThreadsSocialClient.react` (lab toggle).  
5. `FeedCivicPost` `data-civic-variant="no-media"` · lab media = `/assets/dogefeed.png`.  
6. CT-25…27 Present on lab · Await OP eye · не блокер cutover docs.

## Story allocation

| Gap | Story | Package |
|-----|-------|---------|
| ThreadMount Live on `#/next/feed` · retire FeedDiscussionBlock Done | **CT-28** | component-thread |
| ReactionsMount Live on `#/next/feed` · retire FeedReactionsStrip Done | **CR-23** | component-reactions |
| Civic media stub dogefeed everywhere on next/feed | **CT-29** | component-thread |

**Order:** CT-28 → CR-23 → CT-29 (CT-29 parallelizable with CT-28). **No gen.** Runtime Apply = отдельный go-ahead.

## Explicit non-goals

Invent OP PASS · invent threads/people HTTP · image-gen API · Instagram upload · `#/board` retire · Early Signal · attach bind as Done
