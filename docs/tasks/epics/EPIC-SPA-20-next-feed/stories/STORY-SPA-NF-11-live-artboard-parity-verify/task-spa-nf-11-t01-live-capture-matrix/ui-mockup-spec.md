# UI mockup spec — SPA-NF-11-T01 (Path A · AD-VP-04 verify gate)

**Status:** accepted for handoff · Path A · P1.3 (`2026-10-11T15:03:20Z`)  
**Package:** `pkg-000113`  
**ui_anchor:** true  
**Arch:** AD-VP-04 (live↔artboard mandatory)

## Path A SSOT (no STORY-UX-MOCKUP-BRIEF)

| Artboard | Role |
|----------|------|
| [M149](../../../../../../UX/next/feed/artboards/mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0.md) | Board/feed query + light populated |
| [M150](../../../../../../UX/next/feed/artboards/mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0.md) | Civic 4-zone post |
| [M152](../../../../../../UX/next/feed/artboards/mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0.md) | Discussion collapsed |
| [M153](../../../../../../UX/next/feed/artboards/mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0.md) | Expand + oval composer |
| [M154](../../../../../../UX/next/feed/artboards/mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0.md) | Reactions strip/picker |
| [M158](../../../../../../UX/next/feed/artboards/mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0.md) | Modal/sheet/route parity |
| [M159](../../../../../../UX/next/feed/artboards/mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0.md) | Narrow 390 critical |
| [M160](../../../../../../UX/next/feed/artboards/mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0.md) | Theme L/D stress (sample) |

PNG peers Present beside each md. M155 OOS.

## Path A must-states

| State | Contract | Evidence |
|-------|----------|----------|
| F1 Discussion collapsed | vs M152 | live crop |
| F2 Civic 4-zone | vs M150 | live crop |
| F3 Reactions chrome | vs M154 | live crop |
| F4 No duplicate DISCUSSION | vs M152/M150 | live |
| F5 Oval composer expand | vs M153 | live |
| F6 Light cards | vs M149/M160 L | live |
| F7 Modal/sheet/route | vs M158 | live smoke |
| Search | Toolbar wired | **NR** until NF-12 · document |
| Narrow 390/320 | vs M159 | live |

## Forbidden narrowing
Story-root-only Done · PASS without live↔artboard · invent fixtures to fake Match · M155 · shell invent
