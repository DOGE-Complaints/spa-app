# SPA-SSR-02-T03 — L10N cardField resolver

**Status:** Done  
**Story:** [`../STORY-SPA-SSR-02-schema-card-overlay.md`](../STORY-SPA-SSR-02-schema-card-overlay.md)  
**Decision Ref:** FR-SSR-02.4 / FR-SSR-02.8 / FR-SSR-02.L10N · ADMIN-SSR-05  
**ui_scope:** `none`  
**Skill declared:** `javascript-pro`  
**Done:** 2026-09-02T20:06:33Z  
**Gate:** [acceptance-verification-spa-ssr-02-t03.md](./acceptance-verification-spa-ssr-02-t03.md)

## Purpose
Resolver: `schemaRuntime.cardField.<dotted-path>` 1:1; chrome; MVP three paths; missing → dotted-path + DEV warn.

## Code Facts
- [`schemaRuntimeDictionary.js`](../../../../../../../src/i18n/schemaRuntimeDictionary.js) merged in [`dictionaries.js`](../../../../../../../src/i18n/dictionaries.js)

## AC / DoD
- [x] (P0) MVP keys en/et/ru
- [x] (P0) Fallback FR-SSR-02.8
- [x] (P0) No invent keys absent from runtime `schema_card`
