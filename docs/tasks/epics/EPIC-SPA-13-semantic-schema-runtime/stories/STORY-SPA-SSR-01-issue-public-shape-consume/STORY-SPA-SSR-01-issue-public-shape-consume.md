# STORY-SPA-SSR-01-issue-public-shape-consume — Issue public shape consume

## Meta (pipeline)

- **Key:** `STORY-SPA-SSR-01-issue-public-shape-consume`
- **Parent Epic:** [`../../EPIC-SPA-13-semantic-schema-runtime.md`](../../EPIC-SPA-13-semantic-schema-runtime.md)
- **Epic:** EPIC-SPA-13 Semantic Schema Runtime · **Wave 0**
- **Status:** Done
- **Severity:** Medium
- **orientation:** tech_first
- **source:** [`../../../../backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-01-issue-public-shape-consume.md`](../../../../backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-01-issue-public-shape-consume.md)
- **decision_ref:** backlog + [api-req](../../../../backlog-stories/semantic-schema-runtime/STORY-SPA-SSR-api-requirements.md) §2 / §5 + [ADMIN-SSR-06](../../../../backlog-stories/semantic-schema-runtime/ADMIN-SSR-06-tech-decomposition.md)
- **ui_scope:** `none`
- **Depends on:** REQ-16 · gateway REQ-51 public Issue wire
- **P3 Done:** 2026-09-02T19:37:42Z · [`pkg-000074`](../../../../spa-active-packages/pkg-000074-20260902-epic-spa-13-ssr-01-issue-public-shape.yaml) · gate [acceptance-verification-spa-ssr-01.md](./task-spa-ssr-01-t04-story-gate-ssr-01/acceptance-verification-spa-ssr-01.md)

## Зачем

Typedefs + repository pass-through for optional `schema_card` + `geo` so SSR-02/03 do not silently drop gateway fields. **No UI.**

## Субтаски (pipeline)

| Таск | Folder | Суть |
|------|--------|------|
| **T01** | [task-spa-ssr-01-t01-issue-typedef-schema-card-geo](./task-spa-ssr-01-t01-issue-typedef-schema-card-geo/README.md) | Extend `Issue` typedef |
| **T02** | [task-spa-ssr-01-t02-repository-passthrough](./task-spa-ssr-01-t02-repository-passthrough/README.md) | Preserve sidecar keys |
| **T03** | [task-spa-ssr-01-t03-vitest-fixture-parse](./task-spa-ssr-01-t03-vitest-fixture-parse/README.md) | Fixture parse test |
| **T04** | [task-spa-ssr-01-t04-story-gate-ssr-01](./task-spa-ssr-01-t04-story-gate-ssr-01/README.md) | Story gate |
| **T05** | [task-spa-ssr-01-t05-as-of-done-backlog-verified-ssot](./task-spa-ssr-01-t05-as-of-done-backlog-verified-ssot/README.md) | P6 F1 As-of-Done backlog verified |
| **T06** | [task-spa-ssr-01-t06-package-index-ssr-01-done](./task-spa-ssr-01-t06-package-index-ssr-01-done/README.md) | P6 F2 package INDEX Done |
| **T07** | [task-spa-ssr-01-t07-epic-bullrun-wave0-phrasing](./task-spa-ssr-01-t07-epic-bullrun-wave0-phrasing/README.md) | P6 F3 epic + bullrun phrasing |

## Вне scope

Overlay UI · map · L10N population · invent HTTP · `structured_payload` · pack.json browser
