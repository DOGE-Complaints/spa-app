# Interview SSOT — CT-21+ thread density · preview budget · attach-in-node · Share

- **Дата:** 2026-10-20  
- **Тип:** product interview (analysis.mdc · no invent)  
- **Пакет:** [INDEX.md](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)  
- **Триггер:** OP eye после CT-16…20 — yyy без картинки · лишние рамки/пустота · collapsed не тот · Share no-op  
- **Слои доставки стори:** **L1** FR/AC · **L1.5** ARCHITECTURE locks · **L2** technical subtasks (Await Apply)

## Решения оператора

| # | Тема | Решение |
|---|------|---------|
| A1 | Default на карточке ленты | **Сразу expanded** (без collapsed summary / без обязательного View discussion) |
| A2–A3 | «Первые 3» | Бюджет **узлов** (root + children вместе); knob как `maxDepth` / `maxAttachments` |
| A4 | UX для truncate / show more | Нужен **gen prompt** (как residual) |
| B5 | Preview аттача в узле | **Локальный** preview, если нет published URL |
| B6 | Типы preview + allow-list | **Все** allow-list семьи + добавить **`.md`** |
| C1 | Лишние рамки | Убрать всё, чего **нет на артбордах**; ориентир M152/M153/M153b |
| C2 | `Discussion · Issue {id}` | **Полностью убрать** |
| C3 | Плотность | **Строго артборд** (не «ещё плотнее invent») |
| D4 | Share UI | Не хватает SSOT → **UX prompt** на sheet |
| D5 | Сети в sheet | Telegram · Instagram · X · WhatsApp · Facebook · SVGs Present `public/icons/next-feed/share/` (incl. facebook) |
| D6 | Что шерим | **Canonical public Issue URL** (M152 written §6/§13) · lab: honest stub/feedback если URL Absent |
| E7 | Default budget | **`DEFAULT_PREVIEW_NODE_BUDGET = 3`** (имя финалит L1.5) |

> Зафиксировано оператором в чате 2026-10-20. D6 не назван явно в ответе D — locked from M152 written Share claim.

---

## Факты из кода (не обсуждаемо)

1. CT-16…20 structure **Present** в `thread-mount` / feed-lab (dual-append host owner · native file input · M153b CSS · CT-20 stands).  
2. `CommentNode` рендерит только `body` — **нет** attachment preview в опубликованном узле.  
3. FeedLab post пишет `{ id, parentId, depth, body }` — attachments **не** персистятся в comment.  
4. Share на strip: `onZone('share')` без ветки в `FeedPostCard` / `FeedIssueDetailBody` → **no-op**.  
5. Heading `Discussion · Issue {id}` — `IssueThreadBlock.jsx`.  
6. Collapsed preview сейчас `bodies.slice(0, 2)`.  
7. Knobs: `DEFAULT_MAX_DEPTH = 3` · `DEFAULT_MAX_ATTACHMENTS` · `VISUAL_INDENT_CAP` в `threadMountConfig.js`.  
8. M153b §3 **разрешает** 1px bubble border `#E7E4DC` — это не «лишняя» рамка; лишние — host/section wrappers вне артборда.

---

## Story allocation

| Gap | Story |
|-----|-------|
| Default expanded · preview node budget · no heading · show more | **CT-21** |
| Posted comment attachments + `.md` family · local preview | **CT-22** |
| Remove extra frames / density vs artboards | **CT-23** |
| Share sheet TG/IG/X/WA/FB · Issue URL | **CT-24** |

**Order:** CT-21 → CT-22 → CT-23 → CT-24 (Share parallelizable after prompt gen).

---

## Explicit non-goals

- Invent exact MIME table beyond family + `.md` extension lock  
- Invent Instagram API capabilities (sheet entry Present · platform open/copy honest)  
- Reaction summary HOLD redesign  
- `#/next/feed` production cutover  
- Invent OP PASS
