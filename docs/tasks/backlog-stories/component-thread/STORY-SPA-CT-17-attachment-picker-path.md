# STORY-SPA-CT-17 — M153a attachment picker path

## Meta

- **Key:** `STORY-SPA-CT-17-attachment-picker-path`
- **Package:** [component-thread](INDEX.md) · [BRIEF](PRODUCT-BRIEF.md)
- **Status:** P6 T06 Done · gate BLOCK · [pipeline](../../epics/EPIC-SPA-24-component-thread/stories/STORY-SPA-CT-17-attachment-picker-path/STORY-SPA-CT-17-attachment-picker-path.md) · `pkg-000175` · `run_mode=spa_ct17_p5_gap`
- **Parent:** [REQ-22](../../../requirements/22-feed-visual-redesign-phase-1.md) FR-22.4
- **Depends on:** CT-05 · CT-11 · CT-16
- **Blocks:** CT-19 · CT-20 · OP eye attach residual
- **UX mirror:** [OP-UX M153a/b gaps 10-20](OP-UX-MIRROR-m153a-m153b-thread-gaps-2026-10-20.md)
- **Analysis:** [puppeteer gaps](../../../analysis/analysis-lab-feed-thread-puppeteer-gaps-2026-10-20.md) · [intake](../../../analysis/analysis-m153a-m153b-generation-intake-gaps-2026-10-20.md) · [rev3.1 PASS](../../../analysis/analysis-m153a-rev3.1-artboard-validation-2026-10-20.md)
- **Artboard tip:** [M153a v1.1](../../../UX/next/feed/artboards/DOGEstonia-M153a-attachment-picker-residual-state-sheet-spec-v1.1.md) (rev3.1) · v1.0 superseded
- **Code home:** `ThreadComposer.jsx` · `AttachmentRef` · `FeedLabThreadMount.jsx`

## Зачем

Lab audit: Attach yields a **synthetic** Ready chip · **no** `<input type=file>` · OP picker lock not met. M153a documents empty→native picker→Ready/Denied with family allow-list. Product ship still blocked by §18 TBD (MIME, max policy, denied-submit) — this story covers the **local residual path**, not inventing those gates.

## FR

- **FR-CT-17.1** Clean composer first paint: **zero** attachment chips (M153a panel A).  
- **FR-CT-17.2** Attach activates OS/native file picker only · no custom in-app file manager UI.  
- **FR-CT-17.3** Cancel/dismiss picker: draft and selection unchanged.  
- **FR-CT-17.4** Allowed families (operator lock): images · PDF · Microsoft Office (Word/Excel/PowerPoint). Exact MIME/extensions remain **TBD** — config hook only; **no invent** concrete MIME list.  
- **FR-CT-17.5** After real selection: local Ready or Denied `AttachmentRef` chip (origin = picker). Remove is local-only.  
- **FR-CT-17.6** When `attachmentsAvailable=false`: omit Attach · do not seed Denied (panel F).  
- **FR-CT-17.7** Chip = local pending intent only · never claim uploaded / bound / published URL (even when label is `Ready to post`).  
- **FR-CT-17.8** Reuse Present `attach.svg` / `send.svg` catalog paths when glyphs shown.  
- **FR-CT-17.9** Denied-submit / attachment-only / multi-select max: **fail-closed or ask OP** until §18 resolved — do not invent policy.

## Вне scope

Invent exact MIME/extensions · invent upload/bind HTTP · custom file manager · invent denied-submit product policy · chip **paint** tokens (CT-19) · dual-append (CT-16) · HOLD reactions · `#/next/feed`

## Acceptance Criteria

- [ ] A: zero chips before Attach  
- [ ] Attach opens native picker (`input[type=file]` or platform equivalent)  
- [ ] Cancel leaves draft/selection unchanged  
- [ ] No synthetic Ready without picker selection  
- [ ] F: Attach omitted when attachments unavailable  
- [ ] Family allow-list documented; exact MIME TBD not invented  
- [ ] Honesty: local intent · not published  
- [ ] §18 items remain explicit blockers for product ship  
- [ ] OP eye gate (Absent = BLOCK)

## Technical subtasks

> Skill: `react-expert` · Arch [§12](ARCHITECTURE.md) · Await Apply / P1.3

| ID | Status | Purpose | Where | FR |
|----|--------|---------|-------|-----|
| `task-spa-ct-17-t01-native-picker` | Await | Wire Attach → native file input; remove synthetic seed path | ThreadComposer · FeedLab | 17.1–17.3 |
| `task-spa-ct-17-t02-family-hook` | Await | Family allow-list hook (images/PDF/Office) · MIME TBD placeholder | config / composer | 17.4 |
| `task-spa-ct-17-t03-ready-denied-from-pick` | Await | Map selection → local Ready/Denied AttachmentRef + Remove | AttachmentRef · composer | 17.5 · 17.7 |
| `task-spa-ct-17-t04-attach-off` | Await | Omit Attach when unavailable · no fake Denied | composer props | 17.6 |
| `task-spa-ct-17-t05-vitest-picker` | Await | Assert zero chips · picker present · no synthetic-only Ready | `__tests__` | 17.1–17.6 |

### Constraints

- No invent MIME strings · no invent HTTP upload  
- §18 gates stay open until OP  
- Paint vs M153b §7 → CT-19

### Order

`t01` → `t02` → `t03` → `t04` → `t05`

## DoD

Lab attach path matches M153a A–F interaction without inventing §18 product contracts.
