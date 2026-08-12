# Bug story schema (spa-app)

> **Канон:** структура полей для `STORY-SPA-BUG-NN-*` после triage.  
> **Образцы:** API — [BUG-01](STORY-SPA-BUG-01-story-submission-unavailable.md) · visual — [BUG-02](STORY-SPA-BUG-02-logo-background-mismatch.md)  
> **Inbox (до triage):** [bug-report-template.md](../../../../docs/methodology/Zeya888-builder-queue/workflow/bug-report-template.md) · [bug-intake-workflow.md](../../../../docs/methodology/Zeya888-builder-queue/workflow/bug-intake-workflow.md)  
> **Правило:** verified facts ≠ hypotheses; diagnosis before fix (`analysis.mdc`).

## Обязательные секции (порядок)

| # | Section | Назначение |
|---|---------|------------|
| 1 | **Meta (bug card)** | Таблица: Key, Type, Severity P0\|P1\|P2, Status, Route, Repro, Env, Epic, Pipeline, Source, Related |
| 2 | **Symptom** | 2–5 предложений простым языком + impact на value loop |
| 3 | **Expected vs Actual** | Короткая таблица |
| 4 | **Repro steps** | Нумерованный список; testid/route где известны |
| 5 | **Verified facts** | Только paths/коды/UAT, подтверждённые диском или сессией |
| 6 | **What this is NOT** | Отсечённые наивные гипотезы (чтобы не чинить вслепую) |
| 7 | **Diagnostic playbook** | Как получить evidence; schema capture; pin rules |
| 8 | **Hypothesis matrix** | Ранжированные Hn + Confirm/Reject (явно «до evidence») |
| 9 | **FR / AC** | Problem-level; AC включают evidence + pin + fix + regression |
| 10 | **Nested tasks** | Минимум: reproduce → pin → fix → regression → gate |
| 11 | **Вне scope / Швы / Next** | Стандарт Builder Queue |

## Опционально

- Evidence YAML — API: [BUG-01](STORY-SPA-BUG-01-story-submission-unavailable.md); visual: [BUG-02](STORY-SPA-BUG-02-logo-background-mismatch.md)  
- Link на prior analysis, если симптом пересекается  
- Screenshots → `bugs/attachments/BUG-…/` + ссылка в Meta

## Evidence capture

### A. API / network (BUG-01-style)

```yaml
bug_key: STORY-SPA-BUG-NN-…
uat_id: ""
captured_at_utc: ""
env:
  spa_origin: ""
  related_service_base_observed: ""   # host from Network, not secret dump
repro:
  route: "/#/…"
  steps_ok: true
observed_requests:
  - name: primary_failing_call
    method: GET|POST|…
    path: "/…"
    status: null                   # 0 = network/CORS/opaque
    response_body_sanitized: ""
    cors_failed: false
ui:
  testid_or_copy: ""
pin_candidate: spa|gateway|identity|env|network|unknown
```

### B. Visual / asset (BUG-02-style)

```yaml
bug_key: STORY-SPA-BUG-NN-…
captured_at_utc: ""
env:
  spa_origin: ""
asset:
  path: ""
  mode: ""                         # e.g. RGB | RGBA
  has_alpha: null
  corner_hex_samples: []
surfaces:
  - slot: ""
    selector: ""
    token: ""
    resolved_hex: ""
    contrast_vs_asset_pad: visible|none
decision_lean: ""
pin_layer: asset|css_surface|both
viewport_checks:
  desktop: pending|pass|fail
  narrow: pending|pass|fail
```

## Task shape (минимум)

| Order | Role |
|-------|------|
| T01 | Reproduce + evidence capture |
| T02 | Root-cause pin (layer) |
| T03 | Fix **pinned** layer only |
| T04 | Regression / no double-effect |
| T05 | Story gate FR/AC |

Visual-only bugs могут сжать T01–T02 в один task, но **не** пропускать pin для cross-service P0.
