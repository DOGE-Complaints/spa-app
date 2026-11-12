# SPA-SSR-01-T01 — Issue typedef: schema_card + geo

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-01-issue-public-shape-consume.md`](../STORY-SPA-SSR-01-issue-public-shape-consume.md)  
**Decision Ref:** [`../../../../../../backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-01-issue-public-shape-consume.md`](../../../../../../backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-01-issue-public-shape-consume.md) · FR-SSR-01.1 / FR-SSR-01.2  
**Depends on:** api-req §2  
**ui_scope:** `none`  
**Skill declared:** `typescript-pro` / `javascript-pro`  
**Scaffolded:** 2026-09-02  
**Done:** 2026-09-02T19:36:26Z

## Purpose
Extend domain `Issue` (or adjacent DTO) with optional `schema_card` (flat dotted-path map) and public `geo` keys incl. optional `detail_level`.

## Risk
Inventing `admin_*` on Issue wire; nesting `schema_card`; requiring fields that gateway omits.

## Code Facts (As-of-Done)
- [`types.js`](../../../../../../../src/domain/types.js) — `IssueSchemaCard` / `IssueGeo` typedefs + optional `schema_card` / `geo` on `Issue`; `isOptionalIssueGeo` rejects `admin_*` / `street` / `house`
- Public shape: [api-req §2](../../../../../../backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-api-requirements.md)

## AC / DoD
- [x] (P0) Optional `schema_card` + `geo` documented with public key names
- [x] (P0) No `admin_district` etc. on Issue typedef
- [x] (P0) Pin eligibility note: lat+lon only (`detail_level` metadata)

## Where to change
- `spa-app/src/domain/types.js` (and adjacent DTO if any)

## Out of scope
UI · repository · map · L10N · new HTTP · `structured_payload`

## Verification
```bash
rg -n 'schema_card|detail_level|admin_district' spa-app/src/domain/types.js || true
```
