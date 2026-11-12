# UI mockup spec — SPA-NF-12-T02 (Path A · M149 search)

**Status:** accepted for handoff · Path A · P1.3 (`2026-10-11T15:05:17Z`)  
**Package:** `pkg-000114`  
**ui_anchor:** true  
**Arch:** AD-VP-03 · AD-VP-06 · AD-VP-04

## Path A SSOT (no STORY-UX-MOCKUP-BRIEF)

| Artboard | Role |
|----------|------|
| [M149](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) | Board search control · `BOARD-SEARCH-NO-RESULTS` live-capable after enable |

PNG: [`../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png`](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.png)

## Path A must-states

| State | Contract | Evidence |
|-------|----------|----------|
| Search control live | Active toolbar search (not hide-only) | live `#/next/feed` |
| Query non-empty | HTTP `search=` on `GET /node/issues` | network |
| Empty/whitespace | No search param | network |
| No results | Query retained · clear/reset · honest empty | live |
| Narrow 390 | Control usable | live |

## Forbidden narrowing
Invent search endpoint/param · classic board invent · M155 · PASS without network `search`
