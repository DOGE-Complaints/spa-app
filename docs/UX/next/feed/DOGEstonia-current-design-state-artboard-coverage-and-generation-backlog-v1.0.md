# DOGEstonia — Current Design State-Artboard Coverage & Generation Backlog v1.0

**Status:** implementation handoff · coverage register  
**Date:** 2026-10-08T12:23:48Z  
**Scope:** feed redesign artboards M149–M160 under [`artboards/`](artboards/)  
**Authority role:** named SSOT cited by state-sheet specs as *Current Design State-Artboard Coverage & Generation Backlog v1.0*  
**Parent index:** [INDEX.md](INDEX.md)  
**Method:** inventory from files on disk only — does **not** invent new artboard IDs or API fields ([analysis.mdc](../../../../.cursor/rules/analysis.mdc))

---

## 1) Purpose

1. Map each approved current-design state sheet (M149–M160) to colocated spec + PNG.  
2. Record handoff acceptance status.  
3. Point residual visual/consistency work to the UX remediation doc (not to silent invent).  
4. Preserve queue notes where numeric ID ≠ generation order (M156 after M159 request).

---

## 2) Coverage register

| ID | Spec filename | PNG colocated | Latest written rev (from Status) | Handoff status | Primary pack deps |
|----|---------------|---------------|----------------------------------|----------------|-------------------|
| M149 | `mockup-m149-board-shell-feed-query-states-state-sheet-spec-v1.0` | yes | rev 1 | **accepted** | Layout, USI, Component, Interaction, Data-to-UI |
| M150 | `mockup-m150-issue-post-content-schema-overlay-state-sheet-spec-v1.0` | yes | rev 3 | **accepted** | Component, USI, Data-to-UI (`DUI-Q02`/`Q03`) |
| M151 | `mockup-m151-board-list-map-toggle-ssr-m-state-sheet-spec-v1.0` | yes | rev 2 | **accepted** | Layout, Mobile, Data-to-UI |
| M152 | `mockup-m152-current-board-issue-post-thread-block-states-state-sheet-spec-v1.0` | yes | rev 4 | **accepted** | USI, Component, Interaction |
| M153 | `mockup-m153-current-comment-tree-composer-attachments-state-sheet-spec-v1.0` | yes | rev 2 | **accepted** | Interaction, Data-to-UI |
| M154 | `mockup-m154-current-reactions-v1-strip-picker-state-sheet-spec-v1.0` | yes | rev 2 | **accepted** | Interaction, Data-to-UI (`DUI-Q09`), Icons |
| M155 | `mockup-m155-reaction-people-surfaces-state-sheet-spec-v1.0` | yes | rev 3 | **accepted** | Data-to-UI (`DUI-Q08`/`Q17`) — shipping gated |
| M156 | `mockup-m156-current-collaboration-invitation-stub-state-sheet-spec-v1.0` | yes | rev 1 | **accepted** | Stub / `DUI-Q18` |
| M157 | `mockup-m157-current-verify-before-write-state-sheet-spec-v1.0` | yes | rev 2 | **accepted** | Interaction, Data-to-UI (`DUI-Q07`) |
| M158 | `mockup-m158-current-issue-modal-sheet-detail-parity-state-sheet-spec-v1.0` | yes | rev 2 | **accepted** | Layout, Component, Mobile |
| M159 | `mockup-m159-current-mobile-responsive-critical-states-state-sheet-spec-v1.0` | yes | rev 3 | **accepted** | Mobile pack |
| M160 | `mockup-m160-current-theme-localization-interaction-stress-state-sheet-spec-v1.0` | yes | rev 1 | **accepted** | Tokens, A11y |

**Colocation rule:** deliverable PNG lives next to the `.md` under `artboards/`. Historical `generated_images/exec-*.png` names inside specs are provenance labels, not required runtime paths.

---

## 3) Generation / queue notes (verified from sheets)

- Sequence intent: M149 → … → M160 for coverage of board → post → map → thread → reactions → people → invitation stub → verify → mount parity → mobile → theme/L10n.  
- **M156** may be prepared out of numeric order (sheet queue note: after M159 request without treating M159 as blocking).  
- Written rules override generated pixels (all sheets).  

Residual generation / polish items: see [`ux-process-feed-artboard-remediation-2026-10-08.md`](../../analysis/ux-process-feed-artboard-remediation-2026-10-08.md) — **not** blockers for written-spec handoff acceptance recorded 2026-10-08.

---

## 4) Explicit non-goals of this backlog file

- Does not close `DUI-Q*` product/API decisions.  
- Does not redesign cabinet.  
- Does not authorize shipping DEMO_ONLY / BLOCKED_BY_DATA_CONTRACT assets from Asset Manifest.  
- Does not invent M161+.
