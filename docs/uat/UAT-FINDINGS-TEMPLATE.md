# UAT Findings Template — QA / UX / CPO

**Status:** persistent · выходной артефакт UAT  
**Партнёр:** [UAT-MVP-BRIEF.md](./UAT-MVP-BRIEF.md)  
**Правило:** одна неудовлетворённость = одна строка (или три строки с разными Lens на одно Observation). Dissatisfaction ≠ только bug.

---

## 1. Мета сессии

| Поле | Значение |
|------|----------|
| Дата (UTC) | |
| `{SPA_ORIGIN}` | |
| Кто ревьюил | |
| GPT URL настроен? | yes / no / unknown |
| Draft handoff (Tier A/B)? | none / Tier A / Tier B |
| Visual addendum приложен? | yes / no · путь: |
| Версия brief | UAT-MVP-BRIEF (as attached) |

---

## 2. Сводка checklist

Кратко: сколько Pass / Fail / Blocked / N/A. Детали — в копии brief или здесь списком ID.

| Bucket | Count | IDs (пример) |
|--------|-------|----------------|
| Pass | | |
| Fail | | |
| Blocked | | |
| N/A | | |

---

## 3. Findings (таблица)

| ID | Surface | Lens | Severity | Observation | Expected (FE-xx или strategy) | Recommendation | Owner guess |
|----|---------|------|----------|-------------|-------------------------------|----------------|-------------|
| F-001 | Board | QA | P2 | … | FE-PH-04 | Fix-before-launch | Eng |
| F-002 | AppShell | UX | — | Левая колонка отвлекает от public home | Strategy: chrome future | Post-MVP hide for guest | Design |
| F-003 | Submit | CPO | — | … | Loop увидеть→GPT→SPA | Ship with note | CPO |

### Lens

| Lens | Пишите сюда |
|------|-------------|
| **QA** | Ломается ли FE-xx? Repro-шаги в Observation. Severity обязателен. |
| **UX** | Понятность, доверие, friction, «бесит». Severity опционален (или UX-1…3). |
| **CPO** | Ship / fix-before-launch / post-MVP / won't fix. Стратегия MVP. |

### Severity (QA)

| Level | Meaning |
|-------|---------|
| **P0** | Блокер основного loop (не войти / не открыть board / краш handoff) |
| **P1** | Сильный ущерб MVP-сценарию, есть workaround |
| **P2** | Частичный дефект / edge |
| **P3** | Косметика functional / nit (не visual-only — visual в §5) |

### Surface (примеры)

`Board` · `Header` · `Footer` · `How it works` · `Login` · `Profile/Cabinet` · `Civic/Verify` · `Submit/GPT` · `Handoff` · `Issue` · `Locale` · `AppShell/Sidebar` · `Other`

---

## 4. Итоговые корзины (обязательно)

### Ship blockers

Список F-ID, без которых нельзя показывать как MVP ready:

1. …
2. …

### Post-MVP backlog

Осознанный долг (вкл. sidebar taste, stub-карточки кабинета, если они ожидаемы):

1. …
2. …

### Visual-only (ждёт addendum)

Не смешивать с FE Fail, пока нет visual-критериев:

1. …
2. …

---

## 5. Подписи линз

Если по линзе findings нет — всё равно подписать:

| Lens | Result |
|------|--------|
| QA | findings above / **none** (подпись: ) |
| UX | findings above / **none** (подпись: ) |
| CPO | findings above / **none** (подпись: ) |

---

## 6. Заготовка пустых строк

| ID | Surface | Lens | Severity | Observation | Expected | Recommendation | Owner guess |
|----|---------|------|----------|-------------|----------|----------------|-------------|
| F-001 | | | | | | | |
| F-002 | | | | | | | |
| F-003 | | | | | | | |
| F-004 | | | | | | | |
| F-005 | | | | | | | |
| F-006 | | | | | | | |
| F-007 | | | | | | | |
| F-008 | | | | | | | |
| F-009 | | | | | | | |
| F-010 | | | | | | | |
