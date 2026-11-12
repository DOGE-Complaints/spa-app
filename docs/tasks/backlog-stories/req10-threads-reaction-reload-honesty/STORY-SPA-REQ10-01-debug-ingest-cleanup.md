# STORY-SPA-REQ10-01 — Remove Cursor debug ingest (spa H1)

## Meta
- **Key:** `STORY-SPA-REQ10-01-debug-ingest-cleanup`
- **Пакет:** [`req10-threads-reaction-reload-honesty/`](./INDEX.md)
- **Status:** Done · P3 `2026-09-28T18:05:35Z` · [pipeline](../../epics/EPIC-SPA-16-req10-threads-reaction-reload-honesty/stories/STORY-SPA-REQ10-01-debug-ingest-cleanup/STORY-SPA-REQ10-01-debug-ingest-cleanup.md) · gate PASS
- **Тип:** cleanup / production hygiene
- **Parent REQ:** [`19-req10-threads-reaction-reload-honesty.md`](../../../requirements/19-req10-threads-reaction-reload-honesty.md)
- **Parent product:** REQ10 §3.1, §7.1 H1 (spa)
- **Siblings:** threads [`03-req10-tree-marks-read-and-contract`](../../../../../doge-threads/docs/requirements/03-req10-tree-marks-read-and-contract.md) (server H1 — parallel); gateway [`54-req10-lifecycle-status-normalize`](../../../../../doge-complaints-gateway/docs/requirements/54-req10-lifecycle-status-normalize.md) — none for this story
- **Skill declared (future P3):** `javascript-pro`  
  Path: `.cursor/skills/sources/jeffallan-claude-skills/skills/javascript-pro/SKILL.md`
- **Зависит от:** —
- **Method:** [`.cursor/rules/analysis.mdc`](../../../../.cursor/rules/analysis.mdc)
- **Operator locks:** independent of H5 Option A; may ship before REQ10-02

---

## Зачем простыми словами

В production spa не должно оставаться вызовов Cursor debug ingest (`127.0.0.1:7840/ingest/…`).

---

## Scope

1. Удалить все `fetch('http://127.0.0.1:7840/ingest/…')` (и эквиваленты) из `spa-app/src`.
2. Подтвердить `rg 7840/ingest spa-app/src` → **0**.
3. Не менять Closed HTTP paths / reaction UX / mapper contracts.

## Out of scope

- H5 `selected` reload (→ REQ10-02)
- Threads server debug I/O (sibling `03` / REQ10-01 threads)
- H9 puppeteer stretch
- Invent new endpoints
- Gateway lifecycle (REQ-54)

---

## Verified current state

**As-of-Done / Current** (P3 `2026-09-28T18:05:35Z`):

| Fact | Path |
|------|------|
| `rg '7840/ingest' spa-app/src` | **0** |
| Mount / client ingest removed | `LiveIssueThreadMount.jsx` · `ThreadsSocialClient.js` |
| Closed client vitest | `ThreadsSocialClient.test.js` **25/25** |

**Historical (pre-REQ10-01):**

| Fact | Path |
|------|------|
| Ingest в mount | `src/components/threads/LiveIssueThreadMount.jsx:64`, `:84` |
| Ingest в client (create / GET / Bearer write) | `src/repositories/ThreadsSocialClient.js:270`, `:285`, `:297`, `:346`, `:352`, `:372`, `:381`, `:386` |
| Hits in `spa-app/src` | **2 files / 10 matches** (grep at plan time) |

---

## Target / AC

- [x] **AC-SPA-REQ1001-01 (H1):** `rg '7840/ingest' spa-app/src` → 0
- [x] **AC-SPA-REQ1001-02:** no new invented threads HTTP path as side-effect of cleanup
- [x] **AC-SPA-REQ1001-03:** knobs/tree/react Closed behavior unchanged except removal of ingest side-effects

---

## Точки в коде

- `src/repositories/ThreadsSocialClient.js`
- `src/components/threads/LiveIssueThreadMount.jsx`

## Dependencies

- Parent REQ10 H1 spa; related REQ-17 shell not reopened.
