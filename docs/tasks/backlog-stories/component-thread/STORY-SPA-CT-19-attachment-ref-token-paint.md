# STORY-SPA-CT-19 — AttachmentRef Ready/Denied paint (M153b §7 · M153a C–E)

## Meta

- **Key:** `STORY-SPA-CT-19-attachment-ref-token-paint`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Status:** P6 T05 Done · gate BLOCK · F2 CLOSED · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-19-attachment-ref-token-paint/STORY-SPA-CT-19-attachment-ref-token-paint.md) · `pkg-000177` · `run_mode=spa_ct19_p5_gap`
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4
- **Depends on:** CT-05 · CT-17 · soft CT-18
- **Blocks:** OP eye attach chip paint
- **UX mirror:** [OP-UX M153a/b gaps 10-20](OP-UX-MIRROR-m153a-m153b-thread-gaps-2026-10-20.md)
- **Analysis:** [intake](../../../analysis/analysis-m153a-m153b-generation-intake-gaps-2026-10-20.md) · [rev3.1 PASS](../../../analysis/analysis-m153a-rev3.1-artboard-validation-2026-10-20.md)
- **Artboard tip:** [M153b §7](../../../UX/next/feed/artboards/DOGEstonia-M153b-depth-2-thread-token-callouts-spec-v1.0.md) · copy/panels [M153a v1.1 C–E](../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md)
- **Code home:** `AttachmentRef` · composer chip CSS

## Зачем

M153a raster (rev2) used green/red chip chrome; operator lock + M153b §7 reject that. Rev3.1 artboard PASS aligns Denied to warm `#F7F6F2` + `#B54708` border/title. This story implements **paint + copy** for Ready/Denied chips after CT-17 delivers picker origin. Precedence: **M153b written §7** > M153a raster.

## FR

- **FR-CT-19.1** Ready chip: status/title `Ready to post` · tokens per M153b §7 · **no** green Ready badge.  
- **FR-CT-19.2** Denied chip: fill `#F7F6F2` · border 1px `#B54708` · title `#B54708` 600 · **no** pink/red wash.  
- **FR-CT-19.3** Denied copy: D generic reject + allow-family helper · E safety sentence when safety decision known (M153a).  
- **FR-CT-19.4** Remove control chrome `#B54708` · local-only.  
- **FR-CT-19.5** Honesty line: local intent · never published (when sheet requires).  
- **FR-CT-19.6** Type cues for Ready alternatives without inventing new icon packages.

## Вне scope

Picker behavior (CT-17) · invent MIME · invent publish/upload claims · dual-append · HOLD reactions · A–D bubble/spine (CT-18)

## Acceptance Criteria

- [ ] Ready label `Ready to post` · no green wash  
- [ ] Denied fill/border/title Match M153b §7  
- [ ] D/E copy Match M153a  
- [ ] Remove accent Match §7  
- [ ] Honesty present where required  
- [ ] Chip computedStyle audit vs §7 PASS  
- [ ] OP eye gate (Absent = BLOCK)

## Technical subtasks

> Skill: `react-expert` · Arch [§12](ARCHITECTURE.md) · Await Apply / P1.3

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-19-t01-ready-tokens` | Done | Apply Ready chip tokens + `Ready to post` | AttachmentRef CSS | 19.1 · 19.6 |
| `task-spa-ct-19-t02-denied-tokens` | Done | Apply Denied fill/border/title · no wash | AttachmentRef CSS | 19.2 |
| `task-spa-ct-19-t03-copy-honesty` | Done | D/E copy + honesty + Remove accent | AttachmentRef · composer | 19.3–19.5 |
| `task-spa-ct-19-t04-style-audit` | Done | computedStyle / visual assert vs M153b §7 | tests / puppeteer | 19.1–19.5 |
| `task-spa-ct-19-t05-screenshots-root-readme` | Done | Audit F2 story-root screenshots README indexer | docs screenshots/ | P5 F2 |

### Constraints

- Paint SSOT = M153b §7  
- No invent green/red status palette  
- No invent HTTP claims on Ready

### Order

`t01` → `t02` → `t03` → `t04`

## DoD

Ready/Denied chips match M153b §7 tokens and M153a C–E copy without green/red wash.
