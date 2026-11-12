# STORY-SPA-THR-03-reactions-v1-picker — reactions.v1 strip + picker

## Meta (pipeline)

- **Key:** `STORY-SPA-THR-03-reactions-v1-picker`
- **Parent Epic:** [`../../EPIC-SPA-14-threads-feed-ux.md`](../../EPIC-SPA-14-threads-feed-ux.md)
- **Epic:** EPIC-SPA-14 Threads Feed UX · **Wave B**
- **Status:** Done
- **orientation:** ui_first
- **ui_scope:** `visual`
- **source:** [`../../../../backlog-stories/threads-feed/STORY-SPA-THR-03-reactions-v1-picker.md`](../../../../backlog-stories/threads-feed/STORY-SPA-THR-03-reactions-v1-picker.md)
- **decision_ref:** backlog + [M145](../../../../../UX/mockups/threads-feed/mockup-145-reactions-v1-strip-picker-state-sheet-spec.md) + [arch 03](../../../../../architecture/threads-feed-ux/03-reactions-attachments-escalation.md) + reactions.v1 catalog + [ADMIN-04](../../../../backlog-stories/threads-feed/ADMIN-THR-04-api-requirements.md)
- **mockup SSOT:** `docs/UX/mockups/threads-feed/mockup-145-…`
- **Depends on:** M145 · reactions.v1 · THR-01/02 host · icon catalog
- **Parent REQ:** [17](../../../../../requirements/17-issue-thread-feed-ux-and-reactions.md) §2, §4.2, AC-SPA-THR-02
- **Scaffolded:** `2026-09-22T21:13:34Z`
- **Package:** `pkg-000079`

```text
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-145-reactions-v1-strip-picker-state-sheet-spec.md
@mockup: spa-app/docs/UX/mockups/threads-feed/mockup-145-reactions-v1-strip-picker-state-sheet-spec.png
```

## Артборд (SSOT дизайна)

| Мокап | Состояние / фокус | Спека | PNG |
|-------|-------------------|-------|-----|
| **M145** THR-R | Strip · picker 3 layers · enabled-only · desktop/mobile · keyboard · agree⊥disagree | [mockup-145-…-spec.md](../../../../../UX/mockups/threads-feed/mockup-145-reactions-v1-strip-picker-state-sheet-spec.md) | [mockup-145-…-spec.png](../../../../../UX/mockups/threads-feed/mockup-145-reactions-v1-strip-picker-state-sheet-spec.png) |

Implement **THR-R-A…G** per M145; catalog authority = reactions.v1 (M145 §2). **Do not invent reaction ids.**

## Зачем простыми словами

Компактный summary strip и picker с тремя labelled groups (Emotional / Epistemic / Moderation), без Facebook Like-only и без смешения семантики слоёв.

## Текущее состояние (verified · As-of-Done · P3+P6)

### As-of-Done
- `ReactionControls` + `reactionsV1Catalog` on disk — reactions.v1 ids only
- Strip + picker · 3 labelled layers · enabled-only · moderation omitted on thread-root
- agree ⟂ disagree + capacity 3 · L10N `threadsFeed.reactions.*` · `ic-react` + emoji aids
- React write HTTP: **Unknown / Open** — chrome + fail-soft; **no invent HTTP**
- Screenshots story-root 01–06 · THR-R-D mapped to 01/02 desktop button path (T08)
- Gate PASS · vitest catalog/exclusivity · `pkg-000079`

### Historical
- Pre-P3: Host BoardIssuePost + IssueThreadBlock + CommentTree (THR-01/02); catalog SSOT reactions.v1; React Open

## Функциональные требования (FR)

### Catalog & layers

- **FR-THR-03.1** Only `reactions.v1` ids; do not invent ids or Like-default
- **FR-THR-03.2** Three labelled layers: Emotional · Epistemic · Moderation
- **FR-THR-03.3** Enabled-only entries (disabled omitted/unavailable)

### Strip vs picker

- **FR-THR-03.4** THR-R-A compact summary strip
- **FR-THR-03.5** THR-R-B full picker labelled groups

### Scope / exclusion / a11y

- **FR-THR-03.6** Moderation on comments only; not selectable on thread root
- **FR-THR-03.7** agree ⟂ disagree mutual exclusion
- **FR-THR-03.8** Multi-select capacity ≤ node max (default 3 presentation)
- **FR-THR-03.9–03.11** Desktop button path · mobile button path · keyboard focus
- **FR-THR-03.12** No voice-weight / sanctions / private report
- **FR-THR-03.13** React write Open — no invent HTTP

## Вне scope

Invent reaction ids · Facebook packs · voice-weight · THR-04/05 · invent HTTP

## §Иконки / §L10N

See backlog STORY-SPA-THR-03 verbatim tables (chrome `ic-react`; marks = emoji aids Not ic-*).

## Субтаски

| Task | Slug | Title | Status |
|------|------|-------|--------|
| **T01** | `task-spa-thr-03-t01-reaction-summary-strip` | Compact reaction summary strip | Done |
| **T02** | `task-spa-thr-03-t02-picker-three-layers` | Picker three layers enabled-only | Done |
| **T03** | `task-spa-thr-03-t03-agree-disagree-exclusive` | agree ⟂ disagree | Done |
| **T04** | `task-spa-thr-03-t04-emoji-aids-chrome-icons` | Emoji aids + ic-react | Done |
| **T05** | `task-spa-thr-03-t05-l10n-reactions-keys` | threadsFeed.reactions.* | Done |
| **T06** | `task-spa-thr-03-t06-vitest-reactions-catalog` | Vitest catalog + exclusivity | Done |
| **T07** | `task-spa-thr-03-t07-story-gate-thr-03` | Story gate THR-03 | Done |
| **T08** | `task-spa-thr-03-t08-as-of-done-pipeline-d-map-verified-ssot` | Pipeline As-of-Done + D map (F1+F3) | Done |
| **T09** | `task-spa-thr-03-t09-as-of-done-index-verified-ssot` | INDEX As-of-Done (F2) | Done |

## Acceptance Criteria

- [x] All seven states THR-R-A…G present and match M145
- [x] Three labelled layers; enabled-only; moderation not selectable on root
- [x] agree ⟂ disagree unambiguous
- [x] Desktop + mobile button + keyboard path
- [x] No invent catalog ids
- [x] No invent social HTTP
- [x] Links: M145 · reactions.v1 catalog · REQ-17
- [x] Gap F1–F3 CLOSED (`spa_thr_03_audit_2026_09_22`)