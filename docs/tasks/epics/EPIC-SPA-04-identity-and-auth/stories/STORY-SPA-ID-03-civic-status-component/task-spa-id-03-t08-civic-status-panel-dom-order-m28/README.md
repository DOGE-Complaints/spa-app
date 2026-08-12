## Task workspace — `task-spa-id-03-t08-civic-status-panel-dom-order-m28`

- Story: [`../STORY-SPA-ID-03-civic-status-component.md`](../STORY-SPA-ID-03-civic-status-component.md)
- Decision Ref: [`../../../../../../analysis/audit-STORY-SPA-ID-03-execution-2026-06-28.md`](../../../../../../analysis/audit-STORY-SPA-ID-03-execution-2026-06-28.md) §3 F1
- **Depends on:** SPA-ID-03-T02, T03, T04 Done
- **activation:** `run_mode=spa_id_03_audit_2026_06_28`
- **ui_scope:** `none`

---
**Приоритет:** P1  
**Сложность:** S  
**Статус:** Done  
**Wave:** `run_mode=spa_id_03_audit_2026_06_28` (post-audit; **не** pkg-000017)  
**Skill declared:** react-expert  
**Scaffolded:** 2026-06-28T10:16:16Z  
---

## Task: fix — CivicStatusPanel DOM order (action before metadata, M28 §4)

### Цель
Выровнять DOM-порядок `CivicStatusPanel` с M28 §4: primary action (4) перед secondary metadata (5). Закрыть audit F1.

### Почему это важно (риск)
В State A secondary metadata («Verification takes less than one minute») рендерится **перед** primary CTA («Verify Account»), что расходится с артбордом M28 и приоритетом чтения trust-компонента.

### Факты из кода (Code Facts / SSOT)
1. `CivicStatusPanel` — `metadata` до `actions` ([`CivicStatusCard.jsx:59-65`](../../../../../../../../src/components/CivicStatus/CivicStatusCard.jsx#L59)).
2. M28 §4 priority: icon → title → description → **primary action** → **secondary metadata** — [`mockup-28-civic-status-state-sheet-spec.md`](../../../../../../UX/mockups/epic-04/mockup-28-civic-status-state-sheet-spec.md) §4.
3. State A secondary info — «Verification takes less than one minute» ([`CivicStatusCard.jsx:207`](../../../../../../../../src/components/CivicStatus/CivicStatusCard.jsx#L207)).
4. Audit F1 — [audit-STORY-SPA-ID-03-execution-2026-06-28.md](../../../../../../analysis/audit-STORY-SPA-ID-03-execution-2026-06-28.md) §3 F1.

### Gap / Проблема
Post-audit: DOM order metadata → actions инвертирован относительно M28 §4; косметическая иерархия, не логика состояний.

### AC/DoD
- [x] (P0) В `CivicStatusPanel` primary/secondary actions рендерятся **до** secondary metadata (или CSS `order` с тем же visual result).
- [x] (P0) State A: «Verify Account» после description; metadata («Verification takes less than one minute») после actions.
- [x] (P0) Vitest: assertion DOM order в [`CivicStatusCard.test.jsx`](../../../../../../../../src/components/CivicStatus/__tests__/CivicStatusCard.test.jsx) для state A.
- [x] (P1) `npm run test:run` green; без регрессий.

### Где менять код
- [`src/components/CivicStatus/CivicStatusCard.jsx`](../../../../../../../../src/components/CivicStatus/CivicStatusCard.jsx) — `CivicStatusPanel`
- [`src/components/CivicStatus/__tests__/CivicStatusCard.test.jsx`](../../../../../../../../src/components/CivicStatus/__tests__/CivicStatusCard.test.jsx)

### Out of scope
- F2 (B/C/E ahead-of-consumers — waived). ID-04 flow wiring. Новый pkg / смена [`spa-active-package.current.yaml`](../../../../../../spa-active-package.current.yaml). Порядок wallet-блока в state D (info, не action).

### Проверка
```bash
cd spa-app
npm run test:run -- src/components/CivicStatus/__tests__/CivicStatusCard.test.jsx
npm run test:run
```
