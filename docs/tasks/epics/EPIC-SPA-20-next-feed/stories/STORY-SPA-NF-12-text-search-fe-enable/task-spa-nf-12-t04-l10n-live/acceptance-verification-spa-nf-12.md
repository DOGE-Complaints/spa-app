# Acceptance verification — STORY-SPA-NF-12 (pkg-000114)

**Date:** `2026-10-11T15:10:00Z`  
**Result:** **PASS**  
**builder_project:** spa · Path A M149 search · AD-VP-03 · AD-VP-06 · AD-VP-04 · REQ-56  
**Runtime:** preview `:4173` · fixture intercept (gateway may be DOWN) · vitest nf12 + nf01/boardQuery OK · board-shell smoke attempted

## AC checklist

| AC | Verdict | Evidence |
|----|---------|----------|
| Live toolbar search enabled | **PASS** | `FeedToolbar` SearchInput · hide lifted · full-cycle `01` |
| Network `search` when non-empty | **PASS** | intercept `…/node/issues?status=PUBLISHED&search=pet` · `buildIssuesQuery` · full-cycle `02` |
| Empty/no-results + compose | **PASS** | search empty copy · full-cycle `03` · whitespace omits param |
| Cites AD-VP-03/06 · REQ-56 | **PASS** | param name `search` only · no invent endpoint |
| Vitest + live smoke | **PASS** | `FeedSearch.nf12` · dictionary/boardQuery updates · screenshots |

## Tasks

| Task | Status |
|------|--------|
| T01 buildIssuesQuery + serialize | Done |
| T02 toolbar enable | Done |
| T03 empty/filter edges | Done |
| T04 L10N + live | Done |

## Screenshots pack

Story-root [`screenshots/`](../screenshots/) · full-cycle `01`…`04` Present · distinct md5.

## Out of scope confirmed

Invent search endpoint/param · comments search · FTS · M155 · shell invent · no git push this gate.
