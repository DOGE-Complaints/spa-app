# STORY-SPA-CT-25 — Composer AttachmentRef: preview + filename

## Meta

- **Key:** `STORY-SPA-CT-25-composer-attach-chip-preview-filename`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Layers:** **L1** FR/AC · **L1.5** [ARCHITECTURE §14.1](ARCHITECTURE.md) · **L2** technical subtasks
- **Status:** P5 APPLY · gate **BLOCK** · TASKED=0 · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-25-composer-attach-chip-preview-filename/STORY-SPA-CT-25-composer-attach-chip-preview-filename.md) · `pkg-000183` · Await P8 · `2026-10-20T19:34:15Z`
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4
- **Depends on:** CT-17 · CT-19 · CT-22 (node preview Present · composer gap)
- **Blocks:** OP eye composer chip after image / .md pick
- **Interview:** [INTERVIEW-CT-25-plus…](INTERVIEW-CT-25-plus-attach-density-share-residual-2026-10-20.md) MT1 · MT2
- **Artboard tip:** [M153c written](../../../UX/next/feed/artboards/DOGEstonia-M153c-composer-attachment-filename-chip-spec-v1.0.md) · [PNG](../../../UX/next/feed/artboards/DOGEstonia-M153c-composer-attachment-filename-chip-spec-v1.0.png)
- **Intake:** [analysis-m153c-m153d-generation-intake-2026-10-20.md](../../../analysis/analysis-m153c-m153d-generation-intake-2026-10-20.md) PASS
- **Code home:** `AttachmentRef.jsx` · `AttachmentRef.css` · `threadMountConfig.js` (fileName already on intent)

## Зачем

Manual test: image Ready chip shows “Selected image” + ▣ — no thumb, no filename. Intent already stores `fileName`. CT-22 covers **posted** node; this story covers **composer** chip. M153c landed.

## L1 — FR

- **FR-CT-25.1** Ready image chip: local thumbnail **exactly 48 × 48 CSS px** (object URL) **or** clear image-type icon (▣ alone insufficient).  
- **FR-CT-25.2** Ready non-image (PDF / Office / `.md`): recognizable type cue (`MD` / `PDF` / `Word`) + filename.  
- **FR-CT-25.3** Show **`File.name` / `intent.fileName`** on Ready (and Denied when known) — family label never substitutes.  
- **FR-CT-25.4** Keep M153b §7 / M153c §7 Ready/Denied paint + `Ready to post` + `Local intent · not published` + Remove.  
- **FR-CT-25.5** Filename: one line · **middle ellipsis** preserving beginning + extension · family secondary line **above** filename · full name on focus/hover/SR.  
- **FR-CT-25.6** Vitest: fileName visible · image thumb/icon Present · revoke objectURL if used on chip.

## Вне scope

Node preview rewrite (CT-22) · density borderless (CT-26) · Share · invent MIME · invent upload HTTP · invent mobile tap-to-open full-name modal

## L1 — Acceptance Criteria

- [x] Image Ready chip: 48×48 thumb or clear icon  
- [x] Filename visible on Ready chips (not family-only)  
- [x] Non-image Ready: type cue + filename  
- [x] Honesty / Remove intact · §7 tokens  
- [x] Narrow: middle ellipsis · extension kept  
- [x] Artboard M153c linked · intake PASS  
- [x] Vitest  
- [ ] OP eye gate (Absent = BLOCK)

## L2 — Technical subtasks

> Skill: `react-expert` · Arch [§14.1](ARCHITECTURE.md) · P3 Done · Await P4/P5

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-25-t01-filename` | Done | Render `intent.fileName` · family above · middle ellipsis | AttachmentRef.jsx | 25.3 · 25.5 |
| `task-spa-ct-25-t02-image-preview` | Done | 48×48 thumb objectURL or image icon | AttachmentRef.jsx · CSS | 25.1 |
| `task-spa-ct-25-t03-type-icons` | Done | Non-image type cues + filename | AttachmentRef | 25.2 |
| `task-spa-ct-25-t04-vitest` | Done | fileName · preview markers · revoke | `__tests__` | 25.6 |

### Order

`t01` → `t02` → `t03` → `t04`

## DoD

Composer chips show filename and usable image/type preview per M153c.
