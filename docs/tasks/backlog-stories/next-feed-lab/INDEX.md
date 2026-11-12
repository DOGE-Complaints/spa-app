# next-feed-lab — INDEX

> **Пакет:** [PRODUCT-BRIEF.md](PRODUCT-BRIEF.md) · **Visual DoD:** [VISUAL-DoD.md](VISUAL-DoD.md)  
> **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) · isolated feed visual debug  
> **Sibling:** [next-feed-vl](../next-feed-vl/INDEX.md) · [next-feed](../next-feed/INDEX.md) — **Related only; do not reopen**  
> **Gap SSOT:** [analysis-next-feed-ds-component-implementation-gaps-2026-10-12.md](../../../analysis/analysis-next-feed-ds-component-implementation-gaps-2026-10-12.md)  
> **Greenfield approach:** [analysis-next-feed-lab-greenfield-deprecate-approach-2026-10-13.md](../../../analysis/analysis-next-feed-lab-greenfield-deprecate-approach-2026-10-13.md)  
> **Process:** [analysis-next-feed-artboard-visual-process-options-2026-10-13.md](../../../analysis/analysis-next-feed-artboard-visual-process-options-2026-10-13.md)  
> **DS SSOT:** [DOGEstonia-next-feed-component-design-system-v1.0.md](../../../UX/next/feed/DOGEstonia-next-feed-component-design-system-v1.0.md)  
> **Interview:** [zeya888.feed-lab-interview-next-feed-lab-2026-10-13.md](../../../analysis/zeya888.feed-lab-interview-next-feed-lab-2026-10-13.md)  
> **UX artboards:** [feed INDEX](../../../UX/next/feed/INDEX.md) · M149 · M150 · M152–M154 · M158  
> **Route:** `#/lab/feed` · port target `#/next/feed`  
> **Process lock:** lab-first · **greenfield LAB-06…10** (scoped `*Deprecated` + clean post plane) · Partial=**BLOCK** · then **LAB-05** port  
> **Mode:** LAB-10 P3 structure Done · gate **BLOCK** (`pkg-000136`) · OP eye Absent · Partial=BLOCK · LAB-07/08/09 Blocked OP eye  
> **Deprecated exports (LAB-06):** `FeedLabIssueCardDeprecated` · `LabReactionChromeDeprecated` · `FeedLabDiscussionDeprecated` · `FeedLabDetailOverlayDeprecated` (+ paired `*Deprecated.css`) · barrel archaeology · `#/lab/feed` **greenfield only** after LAB-10 cutover (`data-lab-plane="greenfield"`)  
> **Next:** Await OP **P4** · tip residual · LAB-05 after LAB-10 visual PASS  

## Product stories

### Wave A — foundation (Present)

| Key | File | Status | Focus |
|-----|------|--------|-------|
| LAB-01 | [STORY-SPA-NF-LAB-01…](STORY-SPA-NF-LAB-01-lab-route-blank-page.md) | **Done** | Route + blank |
| LAB-02 | [STORY-SPA-NF-LAB-02…](STORY-SPA-NF-LAB-02-fixtures-five-cards-media-stub.md) | **Done** | Fixtures + media stub |

### Wave B — shallow compose (Deprecated residual · not visual SSOT)

| Key | File | Status | Focus |
|-----|------|--------|-------|
| LAB-03 | [STORY-SPA-NF-LAB-03…](STORY-SPA-NF-LAB-03-atom-compose-post-reactions-thread.md) | **Blocked** / superseded for visual SSOT by LAB-10 | Shallow atom compose |
| LAB-04 | [STORY-SPA-NF-LAB-04…](STORY-SPA-NF-LAB-04-modal-detail-from-text-media.md) | **Blocked** / superseded for visual SSOT by LAB-10 | Shallow modal |

### Wave C — greenfield (Todo · постановка 2026-10-13)

| Key | File | Status | Focus | Artboards |
|-----|------|--------|-------|-----------|
| LAB-06 | [STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md](STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md) · [pipeline](../../epics/EPIC-SPA-22-next-feed-lab/stories/STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane/STORY-SPA-NF-LAB-06-deprecate-lab-shallow-plane.md) | **Done** · P3 `pkg-000132` · gate PASS | Rename **lab-owned** → `*Deprecated` (not shared VL) | — (NOT visual PASS) |
| LAB-07 | [STORY-SPA-NF-LAB-07-greenfield-post-card-chrome.md](STORY-SPA-NF-LAB-07-greenfield-post-card-chrome.md) · [pipeline](../../epics/EPIC-SPA-22-next-feed-lab/stories/STORY-SPA-NF-LAB-07-greenfield-post-card-chrome/STORY-SPA-NF-LAB-07-greenfield-post-card-chrome.md) | **Blocked** · P3 structure Done · OP eye Absent | Greenfield post card + strip | M150 · M149 rhythm |
| LAB-08 | [STORY-SPA-NF-LAB-08-greenfield-reactions-plane.md](STORY-SPA-NF-LAB-08-greenfield-reactions-plane.md) · [pipeline](../../epics/EPIC-SPA-22-next-feed-lab/stories/STORY-SPA-NF-LAB-08-greenfield-reactions-plane/STORY-SPA-NF-LAB-08-greenfield-reactions-plane.md) | **Blocked** · P3 structure Done · OP eye Absent | Greenfield reactions | M154 |
| LAB-09 | [STORY-SPA-NF-LAB-09-greenfield-discussion-plane.md](STORY-SPA-NF-LAB-09-greenfield-discussion-plane.md) · [pipeline](../../epics/EPIC-SPA-22-next-feed-lab/stories/STORY-SPA-NF-LAB-09-greenfield-discussion-plane/STORY-SPA-NF-LAB-09-greenfield-discussion-plane.md) | **Blocked** · P3 structure Done · OP eye Absent · **depth residual → [component-thread](../component-thread/INDEX.md) CT-01…08** | Greenfield discussion tip | M152 · M153 |
| LAB-10 | [STORY-SPA-NF-LAB-10-greenfield-overlay-cutover-gates.md](STORY-SPA-NF-LAB-10-greenfield-overlay-cutover-gates.md) · [pipeline](../../epics/EPIC-SPA-22-next-feed-lab/stories/STORY-SPA-NF-LAB-10-greenfield-overlay-cutover-gates/STORY-SPA-NF-LAB-10-greenfield-overlay-cutover-gates.md) | **Blocked** · P3 structure Done · OP eye Absent | Overlay + cutover + gates | M158 + full gate pack |

### Wave D — port

| Key | File | Status | Focus |
|-----|------|--------|-------|
| LAB-05 | [STORY-SPA-NF-LAB-05…](STORY-SPA-NF-LAB-05-port-lab-proven-to-next-feed.md) | Todo | Port **after LAB-10** PASS · not Deprecated |

**Tip order (active):** `06 → 07 → 08 → 09 → 10 → 05`  
**OOS:** invent API/SVG · `#/board` mutate · M155 · schema · reopen NF/VL · global VL `*Deprecated` rename · PASS by export-exists · invent OP PASS  

## Hard DoD (summary)

See **[VISUAL-DoD.md](VISUAL-DoD.md)**. Greenfield Done = checklist + screenshot + OP; Partial = **BLOCK**.

## Risk lock (OP approach)

Full rename of shared VL → `*Deprecated` = **conflicts** product. Scoped rule: deprecate **lab-owned** only; greenfield under `features/feed-lab/post/`. Details: [approach analysis](../../../analysis/analysis-next-feed-lab-greenfield-deprecate-approach-2026-10-13.md).

## Fixture identity / media

`DOGEstonia-UusVeerenni-001`…`005` · `/assets/dogefeed.png` · 1600×900  

## Cross-links

- Parent backlog: [../INDEX.md](../INDEX.md)  
- Pipeline epic: [EPIC-SPA-22-next-feed-lab](../../epics/EPIC-SPA-22-next-feed-lab/EPIC-SPA-22-next-feed-lab.md)  
