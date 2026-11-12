# STORY-SPA-CT — API / knobs / adapter requirements (docs)

## Meta

- **Key:** `STORY-SPA-CT-api-requirements`
- **Package:** [component-thread](INDEX.md)
- **Status:** Todo · docs handoff
- **Parent:** REQ-22 · Data-to-UI / DUI-Q open items cited in M153/M157
- **Arch:** [ARCHITECTURE.md](ARCHITECTURE.md) §4

## Зачем

Зафиксировать reuse map и конфиг-контракты без дублирования NF-api как новой правды.

## Contracts

| Concern | Source / rule |
|---------|----------------|
| Thread read shape | Existing threads tree: `comment_id`, `parent_id`, `depth`, `body`, reaction aggregates, `selected[]` — no invent fields |
| Knobs | `max_depth` · `media_allowed_types` via existing knobs path when Live |
| Package config | `DEFAULT_MAX_DEPTH` · `DEFAULT_MAX_ATTACHMENTS` · `VISUAL_INDENT_CAP` |
| Write | post comment / reply via ThreadsSocialClient when Live · FixtureAdapter in lab |
| Attachments | Local intent until bind/upload contract · DUI-Q05/Q06/Q24 open |
| Verify | Opaque verified outcome · existing `/verify` · bare 403 ≠ unverified proof (M157) |
| Reactions | REQ-24 / CR-api · not owned here |

## FR

- **FR-CT-api.1** Docs name reuse paths · forbid second HTTP client.  
- **FR-CT-api.2** Lab FixtureAdapter is default for `#/lab/feed` thread.  
- **FR-CT-api.3** LiveAdapter fail-closed for missing capabilities.  
- **FR-CT-api.4** Open DUI-Q items remain annotated · no silent invent.

## Technical subtasks

| ID | Status | Purpose | Where |
|----|--------|---------|-------|
| `task-spa-ct-api-t01-reuse-map` | Todo | Write adapter interface table in this file + ARCH cross-links | this doc · ARCHITECTURE |
| `task-spa-ct-api-t02-fixture-contract` | Todo | Document fixture snapshot fields for A–E / tree / gate | FixtureAdapter JSDoc on apply |

## DoD

Implementers know what to reuse and what not to invent.
